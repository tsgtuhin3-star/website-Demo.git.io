'use strict';

const loginPanel = document.getElementById('loginPanel');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const logoutButton = document.getElementById('logoutButton');
const productRows = document.getElementById('productRows');
const ordersList = document.getElementById('ordersList');
const productMessage = document.getElementById('productMessage');
const inventoryMessage = document.getElementById('inventoryMessage');
const ordersMessage = document.getElementById('ordersMessage');
let allProducts = [];

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Request failed.');
  return result;
}

function showDashboard(active) {
  loginPanel.hidden = active;
  dashboard.hidden = !active;
  logoutButton.hidden = !active;
}

function money(value) {
  return '₹' + Number(value || 0).toLocaleString('en-IN');
}

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

async function loadProducts() {
  const result = await api('/api/admin/products');
  allProducts = result.products;
  renderProducts(document.getElementById('productSearch').value);
}

function renderProducts(query = '') {
  productRows.replaceChildren();
  const filtered = allProducts.filter(product =>
    (product.name + ' ' + product.category).toLowerCase().includes(query.trim().toLowerCase())
  );
  for (const product of filtered) {
    const row = document.createElement('tr');
    const nameCell = element('td', 'product-name');
    const name = document.createElement('input');
    name.type = 'text';
    name.maxLength = 120;
    name.value = product.name;
    name.setAttribute('aria-label', 'Name for ' + product.name);
    nameCell.appendChild(name);
    const category = element('td', 'category-cell', product.category);
    const priceCell = document.createElement('td');
    const price = document.createElement('input');
    price.type = 'number';
    price.min = '0';
    price.step = '1';
    price.value = String(product.price);
    price.setAttribute('aria-label', 'Price for ' + product.name);
    priceCell.appendChild(price);
    const originalCell = document.createElement('td');
    const originalPrice = document.createElement('input');
    originalPrice.type = 'number';
    originalPrice.min = '0';
    originalPrice.step = '1';
    originalPrice.value = String(product.originalPrice);
    originalPrice.setAttribute('aria-label', 'Original price for ' + product.name);
    originalCell.appendChild(originalPrice);
    const stockCell = document.createElement('td');
    const stock = document.createElement('input');
    stock.type = 'number';
    stock.min = '0';
    stock.max = '1000000';
    stock.value = String(product.stock);
    stock.setAttribute('aria-label', 'Stock for ' + product.name);
    stockCell.appendChild(stock);
    const actions = element('td', 'product-actions');
    const save = element('button', 'button small', 'Save');
    save.type = 'button';
    save.addEventListener('click', async () => {
      save.disabled = true;
      inventoryMessage.textContent = '';
      try {
        await api('/api/admin/products/' + product.id, {
          method: 'PATCH',
          body: JSON.stringify({
            name: name.value.trim(),
            price: Number(price.value),
            originalPrice: Number(originalPrice.value),
            stock: Number(stock.value)
          })
        });
        product.name = name.value.trim();
        product.price = Number(price.value);
        product.originalPrice = Number(originalPrice.value);
        product.stock = Number(stock.value);
        inventoryMessage.textContent = product.name + ' updated.';
      } catch (error) {
        inventoryMessage.textContent = error.message;
      } finally {
        save.disabled = false;
      }
    });
    const remove = element('button', 'button danger small', 'Remove');
    remove.type = 'button';
    remove.addEventListener('click', async () => {
      if (!window.confirm('Remove ' + product.name + ' from the storefront?')) return;
      remove.disabled = true;
      inventoryMessage.textContent = '';
      try {
        await api('/api/admin/products/' + product.id, { method: 'DELETE' });
        inventoryMessage.textContent = product.name + ' removed.';
        await loadProducts();
      } catch (error) {
        inventoryMessage.textContent = error.message;
        remove.disabled = false;
      }
    });
    actions.append(save, remove);
    row.append(nameCell, category, priceCell, originalCell, stockCell, actions);
    productRows.appendChild(row);
  }
  if (!filtered.length) {
    const row = document.createElement('tr');
    const cell = element('td', 'empty', 'No matching products.');
    cell.colSpan = 6;
    row.appendChild(cell);
    productRows.appendChild(row);
  }
}

async function loadOrders() {
  ordersMessage.textContent = '';
  ordersList.replaceChildren();
  const result = await api('/api/admin/orders');
  if (!result.orders.length) {
    ordersList.appendChild(element('p', 'empty', 'No orders have been placed yet.'));
    return;
  }
  for (const order of result.orders) {
    const card = element('article', 'order-card');
    const top = element('div', 'order-top');
    const title = document.createElement('div');
    title.append(
      element('strong', '', order.orderNumber),
      element('span', 'order-date', order.date + ' · ' + order.customerName + ' · ' + order.customerPhone)
    );
    const total = element('strong', 'order-total', money(order.total));
    top.append(title, total);
    const summary = order.items.map(item => item.name + ' × ' + item.qty).join(', ');
    card.append(top);
    card.appendChild(element('p', 'order-items', summary));
    card.appendChild(element('p', 'order-address', order.address + ', ' + order.city + ' ' + order.postalCode));
    card.appendChild(element('p', 'order-payment', 'Payment: ' + order.paymentMethod + ' · ' + order.paymentStatus));
    if (order.paymentMethod === 'cod' && order.paymentStatus === 'cod_due') {
      const collect = element('button', 'button secondary small', 'Mark cash collected');
      collect.type = 'button';
      collect.addEventListener('click', async () => {
        collect.disabled = true;
        try {
          await api('/api/admin/orders/' + encodeURIComponent(order.orderNumber) + '/payment', {
            method: 'PATCH',
            body: '{}'
          });
          ordersMessage.textContent = order.orderNumber + ' marked as paid.';
          await loadOrders();
        } catch (error) {
          ordersMessage.textContent = error.message;
          collect.disabled = false;
        }
      });
      card.appendChild(collect);
    }
    const controls = element('div', 'order-controls');
    const select = document.createElement('select');
    select.setAttribute('aria-label', 'Fulfillment status for ' + order.orderNumber);
    const statuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!statuses.includes(order.fulfillmentStatus)) {
      const current = document.createElement('option');
      current.value = order.fulfillmentStatus;
      current.textContent = order.fulfillmentStatus.replaceAll('_', ' ');
      current.selected = true;
      current.disabled = true;
      select.appendChild(current);
    }
    for (const status of statuses) {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status[0].toUpperCase() + status.slice(1);
      option.selected = status === order.fulfillmentStatus;
      select.appendChild(option);
    }
    const save = element('button', 'button small', 'Update order');
    save.type = 'button';
    save.addEventListener('click', async () => {
      save.disabled = true;
      ordersMessage.textContent = '';
      try {
        await api('/api/admin/orders/' + encodeURIComponent(order.orderNumber), {
          method: 'PATCH',
          body: JSON.stringify({ status: select.value })
        });
        ordersMessage.textContent = order.orderNumber + ' updated.';
        await loadOrders();
        await loadProducts();
      } catch (error) {
        ordersMessage.textContent = error.message;
      } finally {
        save.disabled = false;
      }
    });
    controls.append(select, save);
    card.appendChild(controls);
    ordersList.appendChild(card);
  }
}

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  loginMessage.textContent = '';
  try {
    await api('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById('adminUsername').value,
        password: document.getElementById('adminPassword').value
      })
    });
    document.getElementById('adminPassword').value = '';
    showDashboard(true);
    await Promise.all([loadProducts(), loadOrders()]);
  } catch (error) {
    loginMessage.textContent = error.message;
  }
});

document.getElementById('productForm').addEventListener('submit', async event => {
  event.preventDefault();
  productMessage.textContent = '';
  const form = event.currentTarget;
  const values = new FormData(form);
  const data = {
    name: values.get('name'),
    category: values.get('category'),
    price: Number(values.get('price')),
    originalPrice: Number(values.get('originalPrice')),
    stock: Number(values.get('stock')),
    image: values.get('image'),
    specs: String(values.get('specs') || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean)
  };
  try {
    const result = await api('/api/admin/products', { method: 'POST', body: JSON.stringify(data) });
    productMessage.textContent = result.product.name + ' added.';
    form.reset();
    form.elements.stock.value = '0';
    await loadProducts();
  } catch (error) {
    productMessage.textContent = error.message;
  }
});

document.getElementById('productSearch').addEventListener('input', event => renderProducts(event.target.value));
document.getElementById('refreshOrders').addEventListener('click', () => loadOrders().catch(error => {
  ordersMessage.textContent = error.message;
}));
logoutButton.addEventListener('click', async () => {
  try { await api('/api/admin/logout', { method: 'POST', body: '{}' }); } catch { /* session expires on its own */ }
  showDashboard(false);
});

api('/api/admin/session')
  .then(async result => {
    showDashboard(result.authenticated);
    if (result.authenticated) await Promise.all([loadProducts(), loadOrders()]);
  })
  .catch(() => showDashboard(false));
