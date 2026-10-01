'use strict';

// Build the server seed catalog from the product data already used by app.js.
// Run this after changing the frontend's product catalog.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const appPath = path.join(root, 'app.js');
const source = fs.readFileSync(appPath, 'utf8');
const start = source.indexOf('const PRODUCTS = [');
const end = source.indexOf('// 2. APPLICATION STATE', start);

if (start < 0 || end < 0) {
  throw new Error('Could not find the product catalog section in app.js');
}

const helpers = [
  "function getPhoneBrand(product) {",
  "  if (product.name.startsWith('Apple iPhone')) return 'iPhone';",
  "  if (product.name.startsWith('Samsung')) return 'Samsung';",
  "  if (product.name.startsWith('Google Pixel')) return 'Google Pixel';",
  "  if (product.name.startsWith('OnePlus')) return 'OnePlus';",
  "  if (product.name.startsWith('Xiaomi')) return 'Xiaomi';",
  "  if (product.name.startsWith('Redmi')) return 'Redmi';",
  "  if (product.name.startsWith('Motorola')) return 'Motorola';",
  "  if (product.name.startsWith('Vivo')) return 'Vivo';",
  "  if (product.name.startsWith('OPPO')) return 'OPPO';",
  "  if (product.name.startsWith('realme')) return 'realme';",
  "  if (product.name.startsWith('ASUS ROG Phone') || product.name.startsWith('ASUS Zenfone')) return 'ASUS';",
  "  if (product.name.startsWith('Sony Xperia')) return 'Sony Xperia';",
  "  if (product.name.startsWith('Nokia')) return 'Nokia';",
  "  if (product.name.startsWith('Honor')) return 'Honor';",
  "  if (product.name.startsWith('Huawei')) return 'Huawei';",
  "  if (product.name.startsWith('CMF')) return 'CMF';",
  "  if (product.name.startsWith('Nothing Phone')) return 'Nothing';",
  "  return product.name.split(' ')[0];",
  "}",
  "function getCategoryBrand(product, category) {",
  "  if (category === 'mobiles') return getPhoneBrand(product);",
  "  const name = product.name;",
  "  const prefixes = {",
  "    laptops: ['Apple', 'ASUS', 'Lenovo', 'Dell', 'HP'],",
  "    audio: ['Apple', 'Samsung', 'Bose', 'JBL', 'Sony', 'boAt', 'Noise', 'OnePlus', 'Garmin', 'Amazfit'],",
  "    fashion: ['Nike', 'Adidas', 'Levi', 'Ray-Ban'],",
  "    beauty: ['Maybelline', \"L'Oréal\", 'MAC', 'The Body Shop']",
  "  }[category] || [];",
  "  const brand = prefixes.find(prefix => name.startsWith(prefix));",
  "  if (brand === 'Levi') return \"Levi's\";",
  "  return brand || name.split(' ')[0];",
  "}"
].join('\n');

const context = {};
vm.runInNewContext(
  helpers + '\n' + source.slice(start, end) +
    '\nglobalThis.__exportedCatalog = { products: PRODUCTS, iphoneProducts: IPHONE_PRODUCTS };',
  context,
  { timeout: 5000 }
);

const catalog = context.__exportedCatalog;
const outputPath = path.join(root, 'data', 'products.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

console.log('Wrote ' + catalog.products.length + ' products and ' +
  catalog.iphoneProducts.length + ' iPhone variants to data/products.json');
