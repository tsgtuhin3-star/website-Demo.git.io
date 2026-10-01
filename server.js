'use strict';

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const ROOT = __dirname;

function loadEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    const at = line.indexOf('=');
    if (!line || line.startsWith('#') || at < 1) continue;
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (!Object.hasOwn(process.env, key)) process.env[key] = value;
  }
}
loadEnv();

const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '127.0.0.1';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || '';
const ADMIN_ON = ADMIN_PASS.length >= 16 && !ADMIN_PASS.toLowerCase().includes('replace-with');
const RZP_ID = process.env.RAZORPAY_KEY_ID || '';
const RZP_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RZP_WEBHOOK = process.env.RAZORPAY_WEBHOOK_SECRET || '';
const RZP_ON = Boolean(RZP_ID && RZP_SECRET);
const dbFile = path.resolve(ROOT, process.env.STORE_DB_PATH || 'data/store.sqlite');
const limits = new Map();

fs.mkdirSync(path.dirname(dbFile), { recursive: true });
const db = new DatabaseSync(dbFile);
db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;');
db.exec('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, price INTEGER NOT NULL CHECK(price>=0), original_price INTEGER NOT NULL CHECK(original_price>=price), image TEXT NOT NULL, stock INTEGER NOT NULL DEFAULT 0 CHECK(stock>=0), active INTEGER NOT NULL DEFAULT 1, details_json TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);');
db.exec('CREATE TABLE IF NOT EXISTS orders (order_number TEXT PRIMARY KEY, customer_name TEXT NOT NULL, customer_phone TEXT NOT NULL, delivery_address TEXT NOT NULL, city TEXT NOT NULL, postal_code TEXT NOT NULL, total INTEGER NOT NULL CHECK(total>=0), payment_method TEXT NOT NULL, payment_status TEXT NOT NULL, fulfillment_status TEXT NOT NULL, gateway_order_id TEXT, gateway_payment_id TEXT, stock_released INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);');
db.exec('CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, order_number TEXT NOT NULL REFERENCES orders(order_number) ON DELETE CASCADE, product_id INTEGER NOT NULL, product_name TEXT NOT NULL, quantity INTEGER NOT NULL CHECK(quantity>0), unit_price INTEGER NOT NULL CHECK(unit_price>=0), variant_json TEXT);');
db.exec('CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);');
db.exec('CREATE INDEX IF NOT EXISTS products_active_category ON products(active, category); CREATE INDEX IF NOT EXISTS orders_date ON orders(created_at DESC); CREATE INDEX IF NOT EXISTS orders_gateway ON orders(gateway_order_id);');

function tx(work) {
  db.exec('BEGIN IMMEDIATE');
  try { const value = work(); db.exec('COMMIT'); return value; }
  catch (error) { db.exec('ROLLBACK'); throw error; }
}

function seed() {
  const file = path.join(ROOT, 'data', 'products.json');
  if (!fs.existsSync(file)) throw new Error('Run npm run catalog:sync to create data/products.json.');
  const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
  const insert = db.prepare('INSERT OR IGNORE INTO products (id,name,category,price,original_price,image,stock,details_json) VALUES (?,?,?,?,?,?,0,?)');
  tx(() => {
    for (const p of [...catalog.products, ...catalog.iphoneProducts]) {
      if (!Number.isSafeInteger(p.id) || !Number.isSafeInteger(p.price)) continue;
      insert.run(p.id, p.name, p.category, p.price, Math.max(p.price, Number(p.originalPrice) || p.price), p.image || '', JSON.stringify(p));
    }
  });
}
seed();

function send(res, status, data, headers = {}) {
  const body = Buffer.from(JSON.stringify(data));
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': body.length, 'Cache-Control': 'no-store', ...headers });
  res.end(body);
}

function security(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
}

function bodyBuffer(req, max = 128 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > max) {
        reject(Object.assign(new Error('Request body is too large.'), { status: 413 }));
        req.destroy();
      } else chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJson(req, max) {
  try {
    const value = JSON.parse((await bodyBuffer(req, max)).toString('utf8') || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw Object.assign(new Error('Request body must be a JSON object.'), { status: 400 });
    }
    return value;
  }
  catch (error) {
    if (error.status) throw error;
    throw Object.assign(new Error('Request body must be valid JSON.'), { status: 400 });
  }
}

function limited(req, res, name, maximum, windowMs) {
  const now = Date.now();
  const key = name + ':' + (req.socket.remoteAddress || 'unknown');
  let entry = limits.get(key);
  if (!entry || entry.until <= now) {
    entry = { count: 0, until: now + windowMs };
    limits.set(key, entry);
  }
  entry.count += 1;
  if (entry.count <= maximum) return true;
  send(res, 429, { error: 'Too many requests. Try again later.' }, { 'Retry-After': String(Math.ceil((entry.until - now) / 1000)) });
  return false;
}

function sameOrigin(req, res) {
  try {
    if (req.headers.origin && new URL(req.headers.origin).host === req.headers.host) return true;
  } catch { /* reject below */ }
  if (!req.headers.origin && req.headers['sec-fetch-site'] === 'same-origin') return true;
  send(res, 403, { error: 'This request must come from this website.' });
  return false;
}

function text(value, min, max, field) {
  if (typeof value !== 'string') throw Object.assign(new Error(field + ' is required.'), { status: 400 });
  const clean = value.trim().replace(/\s+/g, ' ');
  if (clean.length < min || clean.length > max || /[\u0000-\u001f\u007f]/.test(clean)) {
    throw Object.assign(new Error(field + ' is invalid.'), { status: 400 });
  }
  return clean;
}

function phone(value) {
  const valueText = String(value || '').trim();
  const digits = valueText.replace(/\D/g, '');
  if (!/^[+\d() .-]{10,22}$/.test(valueText) || digits.length < 10 || digits.length > 15) {
    throw Object.assign(new Error('Enter a valid phone number.'), { status: 400 });
  }
  return valueText;
}

function equal(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length > 0 && left.length === right.length && crypto.timingSafeEqual(left, right);
}
function sha(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function cookieMap(req) {
  const result = {};
  for (const part of String(req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) result[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return result;
}
function isAdmin(req) {
  const token = cookieMap(req).te_admin_session;
  if (!token) return false;
  const now = Date.now();
  db.prepare('DELETE FROM admin_sessions WHERE expires_at<=?').run(now);
  return Boolean(db.prepare('SELECT token_hash FROM admin_sessions WHERE token_hash=? AND expires_at>?').get(sha(token), now));
}
function requireAdmin(req, res) {
  if (!ADMIN_ON) { send(res, 503, { error: 'Set a long ADMIN_PASSWORD in .env to enable admin.' }); return false; }
  if (!isAdmin(req)) { send(res, 401, { error: 'Please sign in as an administrator.' }); return false; }
  return true;
}

function fromRow(row) {
  return { ...JSON.parse(row.details_json), id: row.id, name: row.name, category: row.category, price: row.price, originalPrice: row.original_price, image: row.image, stock: row.stock, active: Boolean(row.active) };
}
function getOrder(number) {
  const order = db.prepare('SELECT * FROM orders WHERE order_number=?').get(number);
  if (!order) return null;
  const items = db.prepare('SELECT product_id AS id,product_name AS name,quantity AS qty,unit_price AS unitPrice,variant_json FROM order_items WHERE order_number=? ORDER BY id').all(number)
    .map(item => ({ id: item.id, name: item.name, qty: item.qty, unitPrice: item.unitPrice, variant: item.variant_json ? JSON.parse(item.variant_json) : null }));
  return { orderNumber: order.order_number, date: order.created_at, customerName: order.customer_name, city: order.city, items, total: order.total, paymentMethod: order.payment_method, paymentStatus: order.payment_status, fulfillmentStatus: order.fulfillment_status };
}
function restoreStock(number) {
  const order = db.prepare('SELECT stock_released FROM orders WHERE order_number=?').get(number);
  if (!order || order.stock_released) return;
  const items = db.prepare('SELECT product_id,quantity FROM order_items WHERE order_number=?').all(number);
  const update = db.prepare('UPDATE products SET stock=stock+?,updated_at=CURRENT_TIMESTAMP WHERE id=?');
  for (const item of items) update.run(item.quantity, item.product_id);
  db.prepare('UPDATE orders SET stock_released=1,updated_at=CURRENT_TIMESTAMP WHERE order_number=?').run(number);
}
function recordCapturedPayment(number, paymentId) {
  return tx(() => {
    const current = db.prepare('SELECT * FROM orders WHERE order_number=?').get(number);
    if (!current) return 'missing';
    if (current.stock_released || current.fulfillment_status === 'cancelled') {
      db.prepare("UPDATE orders SET payment_status='review_required',gateway_payment_id=COALESCE(?,gateway_payment_id),updated_at=CURRENT_TIMESTAMP WHERE order_number=?")
        .run(paymentId || null, number);
      return 'review_required';
    }
    db.prepare("UPDATE orders SET payment_status='paid',fulfillment_status='confirmed',gateway_payment_id=COALESCE(?,gateway_payment_id),updated_at=CURRENT_TIMESTAMP WHERE order_number=?")
      .run(paymentId || null, number);
    return 'paid';
  });
}
function priceFor(product, input) {
  const options = product.iphoneOptions || product.mobileOptions || product.laptopOptions;
  if (!options) {
    if (input != null) throw Object.assign(new Error('This product has no selectable options.'), { status: 400 });
    return { price: product.price, variant: null };
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw Object.assign(new Error('Choose colour, RAM and storage.'), { status: 400 });
  const selectable = product.mobileOptions || product.laptopOptions;
  const color = text(input.color, 1, 60, 'Colour');
  const storage = text(input.storage, 1, 30, 'Storage');
  const ram = text(input.ram, 1, 30, 'RAM');
  if (!options.colors.includes(color) || !options.storage.includes(storage)) throw Object.assign(new Error('That configuration is not available.'), { status: 400 });
  if (Array.isArray(options.ram) && !options.ram.includes(ram)) throw Object.assign(new Error('That RAM is not available.'), { status: 400 });
  if (typeof options.ram === 'string' && options.ram !== ram) throw Object.assign(new Error('That RAM is not available.'), { status: 400 });
  const sIndex = options.storage.indexOf(storage);
  const sDefault = selectable ? selectable.defaultStorage : options.storage[0];
  const sStep = Math.max(2500, Math.round(product.price * 0.1 / 100) * 100);
  let price = product.price + (sIndex - options.storage.indexOf(sDefault)) * sStep;
  if (selectable) {
    const rStep = Math.max(1500, Math.round(product.price * 0.045 / 100) * 100);
    price += (options.ram.indexOf(ram) - options.ram.indexOf(selectable.defaultRam)) * rStep;
  }
  price = Math.max(999, price);
  const originalPrice = Math.ceil(price * product.originalPrice / product.price / 100) * 100;
  return { price, variant: { color, storage, ram, originalPrice } };
}

async function rzp(endpoint, options) {
  const response = await fetch('https://api.razorpay.com/v1' + endpoint, {
    ...options, signal: AbortSignal.timeout(12000),
    headers: { Authorization: 'Basic ' + Buffer.from(RZP_ID + ':' + RZP_SECRET).toString('base64'), 'Content-Type': 'application/json', ...(options?.headers || {}) }
  });
  const value = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error('Payment provider request failed.');
  return value;
}

async function createOrder(data) {
  if (!Array.isArray(data.items) || data.items.length < 1 || data.items.length > 30) throw Object.assign(new Error('Cart must contain 1 to 30 items.'), { status: 400 });
  const customer = {
    name: text(data.customer?.name, 2, 80, 'Name'),
    phone: phone(data.customer?.phone),
    address: text(data.customer?.address, 5, 180, 'Address'),
    city: text(data.customer?.city, 2, 80, 'City'),
    postal: text(data.customer?.postalCode, 6, 6, 'PIN code')
  };
  if (!/^\d{6}$/.test(customer.postal)) throw Object.assign(new Error('Enter a 6-digit PIN code.'), { status: 400 });
  if (!['cod', 'razorpay'].includes(data.paymentMethod)) throw Object.assign(new Error('Choose Cash on Delivery or secure online checkout.'), { status: 400 });
  if (data.paymentMethod === 'razorpay' && !RZP_ON) throw Object.assign(new Error('Online payment is not configured. Add Razorpay keys to .env or choose Cash on Delivery.'), { status: 503, expose: true });

  const lines = [];
  let total = 0;
  for (const input of data.items) {
    const id = Number(input?.productId);
    const quantity = Number(input?.quantity);
    if (!Number.isSafeInteger(id) || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 10) {
      throw Object.assign(new Error('Cart product or quantity is invalid.'), { status: 400 });
    }
    const row = db.prepare('SELECT * FROM products WHERE id=? AND active=1').get(id);
    if (!row) throw Object.assign(new Error('A product in the cart is unavailable.'), { status: 409 });
    const product = fromRow(row);
    const priced = priceFor(product, input.variant);
    total += priced.price * quantity;
    if (!Number.isSafeInteger(total) || total > 100000000) throw Object.assign(new Error('Order total is invalid.'), { status: 400 });
    lines.push({ product, quantity, ...priced });
  }

  const number = 'TE-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  tx(() => {
    db.prepare('INSERT INTO orders (order_number,customer_name,customer_phone,delivery_address,city,postal_code,total,payment_method,payment_status,fulfillment_status) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .run(number, customer.name, customer.phone, customer.address, customer.city, customer.postal, total, data.paymentMethod, data.paymentMethod === 'cod' ? 'cod_due' : 'pending', data.paymentMethod === 'cod' ? 'confirmed' : 'awaiting_payment');
    const reserve = db.prepare('UPDATE products SET stock=stock-?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND active=1 AND stock>=?');
    const insert = db.prepare('INSERT INTO order_items (order_number,product_id,product_name,quantity,unit_price,variant_json) VALUES (?,?,?,?,?,?)');
    for (const line of lines) {
      if (reserve.run(line.quantity, line.product.id, line.quantity).changes !== 1) throw Object.assign(new Error(line.product.name + ' is out of stock.'), { status: 409 });
      insert.run(number, line.product.id, line.product.name, line.quantity, line.price, line.variant ? JSON.stringify(line.variant) : null);
    }
  });
  if (data.paymentMethod === 'cod') return { order: getOrder(number) };

  try {
    const gateway = await rzp('/orders', { method: 'POST', body: JSON.stringify({ amount: total * 100, currency: 'INR', receipt: number, notes: { orderNumber: number } }) });
    if (typeof gateway.id !== 'string' || Number(gateway.amount) !== total * 100 || gateway.currency !== 'INR') {
      throw new Error('Payment provider returned an invalid order.');
    }
    db.prepare('UPDATE orders SET gateway_order_id=?,updated_at=CURRENT_TIMESTAMP WHERE order_number=?').run(gateway.id, number);
    return { order: getOrder(number), razorpayOrder: { id: gateway.id, amount: gateway.amount, currency: gateway.currency } };
  } catch (error) {
    console.error('Razorpay order creation failed:', error.message);
    tx(() => {
      restoreStock(number);
      db.prepare("UPDATE orders SET payment_status='failed',fulfillment_status='cancelled',updated_at=CURRENT_TIMESTAMP WHERE order_number=?").run(number);
    });
    throw Object.assign(new Error('Secure checkout could not start. No payment was taken.'), { status: 502, expose: true });
  }
}

async function verifyPayment(data) {
  if (!RZP_ON) throw Object.assign(new Error('Online payment is not configured. Add Razorpay keys to .env.'), { status: 503, expose: true });
  const number = text(data.orderNumber, 6, 32, 'Order number');
  const orderId = text(data.razorpay_order_id, 4, 80, 'Payment order');
  const paymentId = text(data.razorpay_payment_id, 4, 80, 'Payment');
  const signature = text(data.razorpay_signature, 32, 256, 'Payment signature');
  const order = db.prepare('SELECT * FROM orders WHERE order_number=?').get(number);
  if (!order || order.payment_method !== 'razorpay' || order.gateway_order_id !== orderId) throw Object.assign(new Error('Payment does not match the order.'), { status: 400 });
  const expected = crypto.createHmac('sha256', RZP_SECRET).update(orderId + '|' + paymentId).digest('hex');
  if (!equal(expected, signature)) throw Object.assign(new Error('Payment verification failed.'), { status: 400 });
  if (order.payment_status === 'paid') return { order: getOrder(number) };
  const payment = await rzp('/payments/' + encodeURIComponent(paymentId));
  if (payment.order_id !== orderId || payment.amount !== order.total * 100 || payment.currency !== 'INR' || payment.status !== 'captured') {
    throw Object.assign(new Error('Payment is not captured yet. Order status will update after confirmation.'), { status: 409 });
  }
  if (order.stock_released || order.fulfillment_status === 'cancelled') {
    recordCapturedPayment(number, paymentId);
    throw Object.assign(new Error('Payment arrived after this order was cancelled. Contact the store before placing another order.'), { status: 409 });
  }
  if (recordCapturedPayment(number, paymentId) === 'review_required') {
    throw Object.assign(new Error('Payment arrived after this order was cancelled. Contact the store before placing another order.'), { status: 409 });
  }
  return { order: getOrder(number) };
}

const categories = new Set(['mobiles','laptops','audio','fashion','beauty','gaming','home','appliances']);
function imageUrl(value) {
  const image = text(value, 1, 1200, 'Image URL');
  let parsed;
  try { parsed = new URL(image); } catch { throw Object.assign(new Error('Use a complete HTTPS image URL.'), { status: 400 }); }
  if (parsed.protocol !== 'https:') throw Object.assign(new Error('Product images must use HTTPS.'), { status: 400 });
  return parsed.href;
}
function productFields(input, previous = {}) {
  const name = text(input.name ?? previous.name, 2, 120, 'Product name');
  if (/[<>"]/.test(name)) throw Object.assign(new Error('Product name cannot contain HTML tags or double quotes.'), { status: 400 });
  const category = text(input.category ?? previous.category, 2, 30, 'Category').toLowerCase();
  if (!categories.has(category)) throw Object.assign(new Error('Choose a valid category.'), { status: 400 });
  const price = Number(input.price ?? previous.price);
  const originalPrice = Number(input.originalPrice ?? previous.originalPrice ?? price);
  const stock = Number(input.stock ?? previous.stock ?? 0);
  if (!Number.isSafeInteger(price) || price < 0 || price > 100000000 || !Number.isSafeInteger(originalPrice) || originalPrice < price || !Number.isSafeInteger(stock) || stock < 0 || stock > 1000000) {
    throw Object.assign(new Error('Price or stock is invalid.'), { status: 400 });
  }
  const sourceSpecs = input.specs ?? previous.specs ?? [];
  if (!Array.isArray(sourceSpecs) || sourceSpecs.length > 20) throw Object.assign(new Error('Specifications must be a list of at most 20 items.'), { status: 400 });
  const specs = sourceSpecs.map(value => text(String(value), 1, 240, 'Specification'));
  if (specs.some(value => /[<>]/.test(value))) throw Object.assign(new Error('Specifications cannot contain HTML tags.'), { status: 400 });
  return { name, category, price, originalPrice, stock, image: imageUrl(input.image ?? previous.image), specs };
}
function saveProduct(input, id) {
  const row = id ? db.prepare('SELECT * FROM products WHERE id=?').get(id) : null;
  if (id && !row) throw Object.assign(new Error('Product not found.'), { status: 404 });
  const old = row ? fromRow(row) : {};
  const value = productFields(input, old);
  if (!id) id = db.prepare('SELECT COALESCE(MAX(id),0)+1 AS id FROM products').get().id;
  const details = { ...old, id, ...value, discount: value.originalPrice ? Math.max(0, Math.round((1 - value.price / value.originalPrice) * 100)) : 0, assured: true, rating: old.rating || 0, reviewsCount: old.reviewsCount || '0' };
  if (row) {
    db.prepare('UPDATE products SET name=?,category=?,price=?,original_price=?,image=?,stock=?,details_json=?,active=1,updated_at=CURRENT_TIMESTAMP WHERE id=?')
      .run(value.name, value.category, value.price, value.originalPrice, value.image, value.stock, JSON.stringify(details), id);
  } else {
    db.prepare('INSERT INTO products (id,name,category,price,original_price,image,stock,details_json) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, value.name, value.category, value.price, value.originalPrice, value.image, value.stock, JSON.stringify(details));
  }
  return fromRow(db.prepare('SELECT * FROM products WHERE id=?').get(id));
}

function adminOrderList() {
  return db.prepare('SELECT order_number,customer_phone,delivery_address,postal_code FROM orders ORDER BY created_at DESC LIMIT 300').all()
    .map(row => ({ ...getOrder(row.order_number), customerPhone: row.customer_phone, address: row.delivery_address, postalCode: row.postal_code }));
}

async function api(req, res, url) {
  const route = url.pathname;
  if (req.method === 'GET' && route === '/api/health') return send(res, 200, { ok: true });
  if (req.method === 'GET' && route === '/api/config') return send(res, 200, { payments: { razorpayEnabled: RZP_ON, keyId: RZP_ON ? RZP_ID : '' } });
  if (req.method === 'GET' && route === '/api/products') {
    const rows = db.prepare('SELECT * FROM products WHERE active=1 ORDER BY id').all();
    const products = [], iphoneProducts = [];
    for (const row of rows) {
      const product = fromRow(row);
      (product.iphoneOptions ? iphoneProducts : products).push(product);
    }
    return send(res, 200, { products, iphoneProducts });
  }
  if (req.method === 'POST' && route === '/api/orders') {
    if (!sameOrigin(req, res) || !limited(req, res, 'checkout', 15, 60000)) return;
    return send(res, 201, await createOrder(await readJson(req)));
  }
  const publicOrder = route.match(/^\/api\/orders\/([A-Z0-9-]+)$/i);
  if (req.method === 'GET' && publicOrder) {
    if (!limited(req, res, 'order-lookup', 30, 60000)) return;
    const row = db.prepare('SELECT customer_phone FROM orders WHERE order_number=?').get(publicOrder[1].toUpperCase());
    if (!row || String(url.searchParams.get('phone') || '').replace(/\D/g, '') !== row.customer_phone.replace(/\D/g, '')) {
      return send(res, 404, { error: 'Order not found. Check the order number and phone number.' });
    }
    return send(res, 200, { order: getOrder(publicOrder[1].toUpperCase()) });
  }
  if (req.method === 'POST' && route === '/api/payments/verify') {
    if (!sameOrigin(req, res) || !limited(req, res, 'payment-verify', 10, 60000)) return;
    try { return send(res, 200, await verifyPayment(await readJson(req))); }
    catch (error) {
      if (error.status) throw error;
      throw Object.assign(new Error('Payment could not be confirmed. Check the order status shortly.'), { status: 503 });
    }
  }
  if (req.method === 'POST' && route === '/api/payments/webhook') {
    if (!RZP_WEBHOOK) return send(res, 503, { error: 'Webhook secret is not configured.' });
    const raw = await bodyBuffer(req, 512 * 1024);
    const expected = crypto.createHmac('sha256', RZP_WEBHOOK).update(raw).digest('hex');
    if (!equal(expected, req.headers['x-razorpay-signature'])) return send(res, 400, { error: 'Invalid webhook signature.' });
    let event;
    try { event = JSON.parse(raw.toString('utf8')); } catch { return send(res, 400, { error: 'Invalid webhook payload.' }); }
    const entity = event.payload?.payment?.entity || event.payload?.order?.entity;
    if (['payment.captured', 'order.paid'].includes(event.event) && entity?.order_id) {
      const order = db.prepare('SELECT * FROM orders WHERE gateway_order_id=?').get(entity.order_id);
      const paymentId = event.payload?.payment?.entity?.id || null;
      if (order && Number(entity.amount) === order.total * 100 && entity.currency === 'INR') recordCapturedPayment(order.order_number, paymentId);
    } else if (event.event === 'payment.failed' && entity?.order_id) {
      const order = db.prepare('SELECT * FROM orders WHERE gateway_order_id=?').get(entity.order_id);
      if (order && Number(entity.amount) === order.total * 100 && entity.currency === 'INR') {
        db.prepare("UPDATE orders SET payment_status='failed',updated_at=CURRENT_TIMESTAMP WHERE order_number=? AND payment_status!='paid' AND stock_released=0 AND fulfillment_status!='cancelled'")
          .run(order.order_number);
      }
    }
    return send(res, 200, { received: true });
  }

  if (!route.startsWith('/api/admin/')) return send(res, 404, { error: 'API route not found.' });
  if (req.method !== 'GET' && !sameOrigin(req, res)) return;
  if (req.method === 'GET' && route === '/api/admin/session') return send(res, 200, { authenticated: ADMIN_ON && isAdmin(req) });
  if (req.method === 'POST' && route === '/api/admin/login') {
    if (!limited(req, res, 'admin-login', 10, 900000)) return;
    if (!ADMIN_ON) return send(res, 503, { error: 'Set a long ADMIN_PASSWORD in .env to enable admin.' });
    const data = await readJson(req);
    if (!equal(data.username, ADMIN_USER) || !equal(data.password, ADMIN_PASS)) return send(res, 401, { error: 'Username or password is incorrect.' });
    const token = crypto.randomBytes(32).toString('base64url');
    db.prepare('INSERT INTO admin_sessions (token_hash,expires_at) VALUES (?,?)').run(sha(token), Date.now() + 8 * 60 * 60 * 1000);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    return send(res, 200, { authenticated: true }, { 'Set-Cookie': 'te_admin_session=' + encodeURIComponent(token) + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800' + secure });
  }
  if (req.method === 'POST' && route === '/api/admin/logout') {
    const token = cookieMap(req).te_admin_session;
    if (token) db.prepare('DELETE FROM admin_sessions WHERE token_hash=?').run(sha(token));
    return send(res, 200, { authenticated: false }, { 'Set-Cookie': 'te_admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0' });
  }
  if (!requireAdmin(req, res)) return;
  if (req.method === 'GET' && route === '/api/admin/products') {
    return send(res, 200, { products: db.prepare('SELECT * FROM products ORDER BY category,name').all().map(fromRow) });
  }
  if (req.method === 'POST' && route === '/api/admin/products') return send(res, 201, { product: saveProduct(await readJson(req)) });
  const productRoute = route.match(/^\/api\/admin\/products\/(\d+)$/);
  if (productRoute && req.method === 'PATCH') return send(res, 200, { product: saveProduct(await readJson(req), Number(productRoute[1])) });
  if (productRoute && req.method === 'DELETE') {
    const result = db.prepare('UPDATE products SET active=0,updated_at=CURRENT_TIMESTAMP WHERE id=?').run(Number(productRoute[1]));
    if (!result.changes) return send(res, 404, { error: 'Product not found.' });
    return send(res, 200, { removed: true });
  }
  if (req.method === 'GET' && route === '/api/admin/orders') return send(res, 200, { orders: adminOrderList() });
  const paymentRoute = route.match(/^\/api\/admin\/orders\/([A-Z0-9-]+)\/payment$/i);
  if (paymentRoute && req.method === 'PATCH') {
    const number = paymentRoute[1].toUpperCase();
    const order = db.prepare('SELECT * FROM orders WHERE order_number=?').get(number);
    if (!order) return send(res, 404, { error: 'Order not found.' });
    if (order.payment_method !== 'cod') return send(res, 409, { error: 'Online payment status is verified by the payment provider.' });
    db.prepare("UPDATE orders SET payment_status='paid',updated_at=CURRENT_TIMESTAMP WHERE order_number=?")
      .run(number);
    return send(res, 200, { order: getOrder(number) });
  }
  const orderRoute = route.match(/^\/api\/admin\/orders\/([A-Z0-9-]+)$/i);
  if (orderRoute && req.method === 'PATCH') {
    const data = await readJson(req);
    const status = String(data.status || '').toLowerCase();
    const valid = new Set(['confirmed','processing','shipped','delivered','cancelled']);
    if (!valid.has(status)) return send(res, 400, { error: 'Choose a valid fulfillment status.' });
    const number = orderRoute[1].toUpperCase();
    const order = db.prepare('SELECT * FROM orders WHERE order_number=?').get(number);
    if (!order) return send(res, 404, { error: 'Order not found.' });
    if (order.stock_released && status !== 'cancelled') return send(res, 409, { error: 'A cancelled order cannot be reopened. Create a new order instead.' });
    if (status === 'cancelled' && order.payment_status === 'paid') return send(res, 409, { error: 'A paid order needs a refund first. Refunds are not configured in this dashboard.' });
    if (status === 'cancelled' && ['shipped', 'delivered'].includes(order.fulfillment_status)) return send(res, 409, { error: 'A shipped or delivered order needs a return workflow; it cannot be cancelled here.' });
    if (order.payment_method === 'razorpay' && order.payment_status !== 'paid' && status !== 'cancelled') return send(res, 409, { error: 'An online order must be paid before it can be processed.' });
    tx(() => {
      if (status === 'cancelled') restoreStock(number);
      db.prepare('UPDATE orders SET fulfillment_status=?,updated_at=CURRENT_TIMESTAMP WHERE order_number=?').run(status, number);
    });
    return send(res, 200, { order: getOrder(number) });
  }
  return send(res, 404, { error: 'API route not found.' });
}

const files = new Map([
  ['/', ['index.html','text/html; charset=utf-8']], ['/index.html', ['index.html','text/html; charset=utf-8']],
  ['/style.css', ['style.css','text/css; charset=utf-8']], ['/app.js', ['app.js','text/javascript; charset=utf-8']],
  ['/admin.html', ['admin.html','text/html; charset=utf-8']], ['/admin.js', ['admin.js','text/javascript; charset=utf-8']],
  ['/admin.css', ['admin.css','text/css; charset=utf-8']]
]);
function staticPage(res, pathname) {
  const entry = files.get(pathname);
  if (!entry) return send(res, 404, { error: 'Page not found.' });
  const file = path.join(ROOT, entry[0]);
  if (!fs.existsSync(file)) return send(res, 404, { error: 'Page not found.' });
  const content = fs.readFileSync(file);
  res.writeHead(200, { 'Content-Type': entry[1], 'Content-Length': content.length, 'Cache-Control': entry[0].endsWith('.html') ? 'no-cache' : 'public, max-age=300' });
  res.end(content);
}

const server = http.createServer(async (req, res) => {
  security(res);
  try {
    const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
    if (url.pathname.startsWith('/api/')) await api(req, res, url);
    else if (req.method === 'GET' || req.method === 'HEAD') staticPage(res, url.pathname);
    else send(res, 405, { error: 'Method not allowed.' });
  } catch (error) {
    const status = Number.isInteger(error.status) ? error.status : 500;
    if (status >= 500) console.error('Request failed:', error.message);
    const message = error.expose ? error.message : status >= 500 ? 'Something went wrong. Please try again.' : error.message;
    if (!res.headersSent) send(res, status, { error: message });
    else res.end();
  }
});

server.listen(PORT, HOST, () => {
  console.log('Tuhin Enterprise backend: http://' + HOST + ':' + PORT);
  console.log('Admin dashboard: http://' + HOST + ':' + PORT + '/admin.html');
  console.log('Cash on Delivery ready. Online payments: ' + (RZP_ON ? 'configured' : 'not configured'));
  if (!ADMIN_ON) console.log('Set a long ADMIN_PASSWORD in .env to enable the admin dashboard.');
});
function stop() {
  server.close(() => { db.close(); process.exit(0); });
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
