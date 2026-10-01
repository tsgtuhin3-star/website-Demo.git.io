# Tuhin Enterprise store backend

The storefront is served by a small Node.js backend with a local SQLite database. It keeps products and stock, creates COD or Razorpay orders, tracks fulfillment, and provides a password protected admin page.

## Run it locally

Use Node.js 22.13 or newer. The backend uses Node's built in SQLite support and has no npm dependencies.

1. Copy **.env.example** to **.env**.
2. Replace **ADMIN_PASSWORD** with a private random password of at least 16 characters.
3. Run **node scripts/sync-catalog.cjs** if the product catalog in **app.js** has changed.
4. Run **node server.js** (or **npm.cmd start** in PowerShell).
5. Open **http://127.0.0.1:3000**; open **http://127.0.0.1:3000/admin.html** to manage the store.

The admin username defaults to **admin** and can be changed with **ADMIN_USERNAME**. The first server start creates **data/store.sqlite** and imports the catalog. Existing catalog products start with **zero stock** because the demo site does not contain real inventory. Set the actual quantities in the admin dashboard before accepting orders.

The storefront's customer sign-in panel is still a browser-only demo. Checkout works as a guest, and order details are saved in SQLite; a customer password/OTP account system is not configured.

## Checkout and payments

Cash on Delivery works after stock has been added in the admin dashboard. The server recalculates every item and variant price, checks stock in a database transaction, reserves stock, and stores the customer/order snapshot. The browser cannot set the final order total.

Online payment is disabled until a Razorpay key ID and key secret are provided in **.env**. Start with Razorpay test keys, restart the server, and confirm **GET /api/config** reports `razorpayEnabled: true`. The checkout script is loaded before an order reserves stock, and Razorpay Checkout collects UPI/card details; this project never stores those details. If payment confirmation is delayed, use the checkout's **Check payment status** action and do not pay again.

For payment status to stay synchronized when a customer closes checkout or a browser loses connectivity, configure the public HTTPS endpoint **/api/payments/webhook** with a webhook secret and the **payment.captured**, **payment.failed**, and **order.paid** events. A failed payment attempt does not release inventory because Razorpay allows retries on the same order. An abandoned order continues holding stock until it is cancelled from the admin dashboard. Set real inventory in the dashboard before testing checkout.

The Node/SQLite backend must run on a Node-capable host; GitHub Pages only serves static files and cannot run this backend. A GitHub push updates the source repository, not the live payment server. Deploy the backend behind HTTPS and configure its environment secrets separately before taking real payments.

Run the backend checks with **npm test**.

## Admin dashboard

The admin session uses a random server generated token in an HTTP only, same site cookie. The dashboard can add and edit products, update stock, remove products from the storefront, change order fulfillment status, and record when COD cash has been collected. Online orders cannot be marked ready for fulfillment until payment is confirmed. Cancelling an unpaid order restores its reserved stock. Refund processing is not included, so paid orders cannot be cancelled from this dashboard.

## Main API routes

- **GET /api/health**, **GET /api/config**, **GET /api/products**
- **POST /api/orders**, **GET /api/orders/:orderNumber?phone=...**
- **POST /api/payments/verify**, **POST /api/payments/webhook**
- **/api/admin/** for sign in, product inventory, and order management

## Before public launch

Deploy behind HTTPS, set **NODE_ENV=production**, and store the **.env** values in the host's secret settings. Back up the SQLite database. This SQLite setup is intended for a small single server; use a shared database such as PostgreSQL before running multiple backend instances. Configure real stock, shipping, refund, and business policies before taking real orders.
