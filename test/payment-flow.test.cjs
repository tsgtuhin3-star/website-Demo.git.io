'use strict';

const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const { DatabaseSync } = require('node:sqlite');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');

function availablePort() {
  return new Promise((resolve, reject) => {
    const listener = net.createServer();
    listener.once('error', reject);
    listener.listen(0, '127.0.0.1', () => {
      const { port } = listener.address();
      listener.close(error => error ? reject(error) : resolve(port));
    });
  });
}

async function waitForServer(url, child) {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error('The backend exited before it became ready.');
    try {
      const response = await fetch(url + '/api/health');
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('The backend did not become ready in time.');
}

test('backend checkout reports payment readiness and accepts different variants of one product', async () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'tuhin-payment-test-'));
  const databasePath = path.join(temporaryDirectory, 'store.sqlite');
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ['server.js'], {
    cwd: root,
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: String(port),
      STORE_DB_PATH: databasePath,
      ADMIN_PASSWORD: 'test-only-password-not-used'
    },
    stdio: 'ignore'
  });

  try {
    await waitForServer(baseUrl, child);
    const configResponse = await fetch(baseUrl + '/api/config');
    assert.equal(configResponse.status, 200);
    const config = await configResponse.json();
    assert.equal(config.payments.razorpayEnabled, false);

    const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data', 'products.json'), 'utf8'));
    const product = [...catalog.products, ...catalog.iphoneProducts].find(item => item.mobileOptions || item.iphoneOptions);
    assert.ok(product, 'A catalog product with selectable variants is required.');
    const options = product.mobileOptions || product.iphoneOptions;
    const ram = Array.isArray(options.ram) ? options.ram[0] : options.ram;
    const firstVariant = { color: options.colors[0], storage: options.storage[0], ram };
    const secondVariant = {
      ...firstVariant,
      storage: options.storage.find(storage => storage !== firstVariant.storage) || firstVariant.storage,
      color: options.storage.length > 1 ? firstVariant.color : options.colors.find(color => color !== firstVariant.color)
    };
    assert.notDeepEqual(secondVariant, firstVariant);

    const database = new DatabaseSync(databasePath);
    database.prepare('UPDATE products SET stock=5 WHERE id=?').run(product.id);
    database.close();

    const customer = {
      name: 'Test Customer',
      phone: '9876543210',
      address: '123 Test Street',
      city: 'Test City',
      postalCode: '123456'
    };
    const headers = {
      'Content-Type': 'application/json',
      Origin: baseUrl
    };
    const items = [
      { productId: product.id, quantity: 1, variant: firstVariant },
      { productId: product.id, quantity: 1, variant: secondVariant }
    ];
    const disabledPayment = await fetch(baseUrl + '/api/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify({ customer, paymentMethod: 'razorpay', items })
    });
    assert.equal(disabledPayment.status, 503);
    assert.match((await disabledPayment.json()).error, /not configured/i);

    const codResponse = await fetch(baseUrl + '/api/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify({ customer, paymentMethod: 'cod', items })
    });
    assert.equal(codResponse.status, 201);
    const { order } = await codResponse.json();
    assert.equal(order.items.length, 2);
    assert.equal(order.items[0].id, product.id);
    assert.equal(order.items[1].id, product.id);
    assert.equal(order.total, order.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0));
    assert.equal(order.paymentStatus, 'cod_due');

    const afterOrder = new DatabaseSync(databasePath);
    assert.equal(afterOrder.prepare('SELECT stock FROM products WHERE id=?').get(product.id).stock, 3);
    afterOrder.close();
  } finally {
    if (child.exitCode === null) {
      const exited = new Promise(resolve => child.once('exit', resolve));
      child.kill();
      await exited;
    }
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
