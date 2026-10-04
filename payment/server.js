require('dotenv').config();
const path    = require('path');
const { pathToFileURL } = require('url');
const express = require('express');
const cors    = require('cors');

const paymentRoutes = require('./routes/payment');
const orders        = require('./lib/orders');

const app  = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.ALLOWED_ORIGIN || '*').split(',').map(o => o.trim()).filter(Boolean);

// Needed for the real client IP when running behind a reverse proxy.
app.set('trust proxy', 1);
app.use(cors({ origin: allowedOrigins.includes('*') ? '*' : allowedOrigins }));
app.use(express.json());

app.use('/api/payment', paymentRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'styleboss-payment' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body is not valid JSON' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large' });
  }
  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Unexpected server error' });
});

// Prices come from the shop's own product list so the two can never drift apart.
async function loadCatalog() {
  const file = path.join(__dirname, '..', 'src', 'data', 'products.js');
  const { PRODUCTS } = await import(pathToFileURL(file).href);
  const catalog = new Map();
  for (const p of PRODUCTS) {
    if (!p.img) continue;
    if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price <= 0) continue;
    catalog.set(p.sku, { name: p.name, price: p.price });
  }
  if (catalog.size === 0) throw new Error(`No sellable products found in ${file}`);
  return catalog;
}

async function start() {
  app.locals.catalog = await loadCatalog();
  orders.load();
  app.listen(PORT, () => {
    console.log(`StyleBoss payment server running on port ${PORT} (${app.locals.catalog.size} products)`);
  });
}

start().catch(err => {
  console.error('Payment server failed to start:', err.message);
  process.exit(1);
});
