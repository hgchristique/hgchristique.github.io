const express = require('express');
const crypto  = require('crypto');
const router  = express.Router();

const hubtel = require('../lib/hubtel');
const orders = require('../lib/orders');

const MAX_LINES         = 50;
const MAX_QTY           = 20;
// Mirrors src/hooks/useCurrency.js: foreign prices are doubled, then 20% off.
const FOREIGN_MULTIPLIER = 2 * 0.8;
const REFERENCE_PATTERN  = /^HF[A-Z0-9]{10,30}$/;
const EMAIL_PATTERN      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN      = /^\+?\d{9,15}$/;
const STATUS_RECHECK_MS  = 10000;
const RATE_WINDOW_MS     = 60000;
const RATE_MAX           = 10;

const lastStatusCheck = new Map();
const checkoutHits    = new Map();

const round2 = n => Math.round(n * 100) / 100;

// A failed write must not take the request, or the process, down with it.
function record(reference, changes) {
  try {
    return orders.update(reference, changes);
  } catch (err) {
    console.error(`Could not save order ${reference}:`, err.message);
    return null;
  }
}

function rateLimited(ip) {
  const now  = Date.now();
  if (checkoutHits.size > 5000) {
    for (const [key, times] of checkoutHits) {
      if (times.every(t => now - t >= RATE_WINDOW_MS)) checkoutHits.delete(key);
    }
  }
  const hits = (checkoutHits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  hits.push(now);
  checkoutHits.set(ip, hits);
  return hits.length > RATE_MAX;
}

function cleanString(value, min, max) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length >= min && trimmed.length <= max ? trimmed : null;
}

function validateCustomer(customer) {
  if (!customer || typeof customer !== 'object') return { error: 'Customer details are required' };

  const name = cleanString(customer.name, 2, 80);
  if (!name) return { error: 'Enter your full name (2-80 characters)' };

  const phone = typeof customer.phone === 'string' ? customer.phone.replace(/[\s()-]/g, '') : '';
  if (!PHONE_PATTERN.test(phone)) return { error: 'Enter a valid phone number (9-15 digits)' };

  const address = cleanString(customer.address, 5, 200);
  if (!address) return { error: 'Enter a delivery address (5-200 characters)' };

  let email = null;
  if (customer.email !== undefined && customer.email !== null && customer.email !== '') {
    email = cleanString(customer.email, 5, 120);
    if (!email || !EMAIL_PATTERN.test(email)) return { error: 'Enter a valid email address' };
  }

  return { value: { name, phone, address, email } };
}

function validateItems(items, catalog) {
  if (!Array.isArray(items) || items.length === 0) return { error: 'Your order is empty' };
  if (items.length > MAX_LINES) return { error: `An order can have at most ${MAX_LINES} lines` };

  const quantities = new Map();
  for (const item of items) {
    if (!item || typeof item.sku !== 'string') return { error: 'Each item needs a product code' };
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > MAX_QTY) {
      return { error: `Quantity for ${item.sku} must be a whole number from 1 to ${MAX_QTY}` };
    }
    const product = catalog.get(item.sku);
    if (!product) return { error: `Product ${item.sku} is not available` };

    const qty = (quantities.get(item.sku) || 0) + item.qty;
    if (qty > MAX_QTY) return { error: `Quantity for ${item.sku} must not exceed ${MAX_QTY}` };
    quantities.set(item.sku, qty);
  }

  const lines = [...quantities].map(([sku, qty]) => {
    const product = catalog.get(sku);
    return { sku, name: product.name, qty, unitPrice: product.price };
  });
  return { value: lines };
}

function tokensMatch(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

function publicView(order) {
  return {
    reference: order.reference,
    status: order.status,
    amount: order.total,
    currency: 'GHS',
    items: order.items.map(({ name, qty }) => ({ name, qty })),
  };
}

// POST /api/payment/checkout
// Body: { items: [{ sku, qty }], customer: { name, phone, address, email? }, currency? }
// Prices are taken from the server's own catalogue, never from the request.
router.post('/checkout', async (req, res) => {
  const missing = hubtel.missingConfig();
  if (missing.length > 0) {
    console.error(`Payment config missing: ${missing.join(', ')}`);
    return res.status(503).json({ error: 'Payments are not configured yet. Please try again later.' });
  }

  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many checkout attempts. Please wait a minute and try again.' });
  }

  const body = req.body || {};
  const catalog = req.app.locals.catalog;

  const items = validateItems(body.items, catalog);
  if (items.error) return res.status(400).json({ error: items.error });

  const customer = validateCustomer(body.customer);
  if (customer.error) return res.status(400).json({ error: customer.error });

  let displayCurrency = 'GHS';
  if (body.currency !== undefined) {
    if (typeof body.currency !== 'string' || !/^[A-Z]{3}$/.test(body.currency)) {
      return res.status(400).json({ error: 'Currency must be a 3-letter code' });
    }
    displayCurrency = body.currency;
  }

  const subtotal = items.value.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const total    = round2(displayCurrency === 'GHS' ? subtotal : subtotal * FOREIGN_MULTIPLIER);
  if (!Number.isFinite(total) || total <= 0) {
    return res.status(400).json({ error: 'Order total must be greater than zero' });
  }

  const reference = `HF${Date.now().toString(36)}${crypto.randomBytes(6).toString('hex')}`.toUpperCase();
  const callbackToken = crypto.randomBytes(24).toString('hex');
  const itemCount = items.value.reduce((sum, line) => sum + line.qty, 0);

  try {
    orders.create({
      reference,
      callbackToken,
      status: 'pending',
      items: items.value,
      total,
      displayCurrency,
      customer: customer.value,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error(`Could not record order ${reference}:`, err.message);
    return res.status(503).json({ error: 'We could not record your order just now. You have not been charged. Please try again.' });
  }

  try {
    const checkout = await hubtel.initiateCheckout({
      totalAmount: total,
      description: `Heloria Fashion order ${reference} (${itemCount} item${itemCount === 1 ? '' : 's'})`,
      clientReference: reference,
      callbackUrl: `${process.env.PUBLIC_API_URL}/api/payment/callback?token=${callbackToken}`,
      returnUrl: `${process.env.SITE_URL}/shop?ref=${reference}`,
      cancellationUrl: `${process.env.SITE_URL}/shop?ref=${reference}&cancelled=1`,
      payeeName: customer.value.name,
      payeeMobileNumber: customer.value.phone,
      payeeEmail: customer.value.email,
    });

    record(reference, { checkoutId: checkout.checkoutId });
    return res.json({ reference, checkoutUrl: checkout.checkoutUrl, amount: total, currency: 'GHS' });
  } catch (err) {
    console.error(`Checkout ${reference} failed:`, err.message);
    record(reference, { status: 'failed', failureReason: err.message });

    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return res.status(504).json({ error: 'The payment provider took too long to respond. Please try again.' });
    }
    if (err.httpStatus === 401 || err.httpStatus === 403) {
      return res.status(502).json({ error: 'The payment provider rejected our credentials. Please contact us to complete your order.' });
    }
    return res.status(502).json({ error: 'Could not start the payment. Please try again in a moment.' });
  }
});

// POST /api/payment/callback?token=...
// Called by Hubtel once the customer pays or the payment fails.
router.post('/callback', (req, res) => {
  const body = req.body || {};
  const data = body.Data || {};
  const reference = typeof data.ClientReference === 'string' ? data.ClientReference : '';

  if (!REFERENCE_PATTERN.test(reference)) {
    return res.status(400).json({ error: 'Missing or malformed ClientReference' });
  }
  const order = orders.get(reference);
  if (!order) return res.status(404).json({ error: 'Unknown order reference' });
  if (!tokensMatch(req.query.token, order.callbackToken)) {
    return res.status(403).json({ error: 'Invalid callback token' });
  }

  if (order.status === 'paid') return res.json({ received: true });

  const succeeded = body.ResponseCode === '0000' && data.Status === 'Success';
  if (!succeeded) {
    record(reference, { status: 'failed', failureReason: String(data.Description || body.Status || 'Payment failed').slice(0, 200) });
    return res.json({ received: true });
  }

  // Acknowledged with 200 so Hubtel does not keep retrying; the order stays unpaid for manual follow-up.
  const paidAmount = Number(data.Amount);
  if (!Number.isFinite(paidAmount) || paidAmount + 0.01 < order.total) {
    console.error(`Callback for ${reference} reported ${data.Amount}, expected ${order.total}`);
    record(reference, { status: 'failed', failureReason: `Amount paid (${String(data.Amount).slice(0, 20)}) does not match the order total` });
    return res.json({ received: true });
  }

  const saved = record(reference, {
    status: 'paid',
    paidAt: new Date().toISOString(),
    paidAmount,
    hubtelInvoiceId: typeof data.SalesInvoiceId === 'string' ? data.SalesInvoiceId : null,
    channel: data.PaymentDetails && typeof data.PaymentDetails.Channel === 'string' ? data.PaymentDetails.Channel : null,
  });
  // Not acknowledged, so Hubtel can deliver the confirmation again once storage recovers.
  if (!saved) return res.status(503).json({ error: 'Could not record the payment yet, please retry' });
  return res.json({ received: true });
});

// GET /api/payment/status/:reference
router.get('/status/:reference', async (req, res) => {
  const { reference } = req.params;
  if (!REFERENCE_PATTERN.test(reference)) {
    return res.status(400).json({ error: 'Malformed order reference' });
  }

  let order = orders.get(reference);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  // The callback is the primary signal. If it has not arrived, ask Hubtel directly,
  // at most once per STATUS_RECHECK_MS per order.
  const lastCheck = lastStatusCheck.get(reference) || 0;
  if (order.status === 'pending' && Date.now() - lastCheck >= STATUS_RECHECK_MS) {
    lastStatusCheck.set(reference, Date.now());
    try {
      const result = await hubtel.checkStatus(reference);
      // A callback may have landed while we were waiting.
      order = orders.get(reference) || order;
      if (order.status !== 'paid' && result.status === 'Paid' && Number.isFinite(result.amount) && result.amount + 0.01 >= order.total) {
        order = record(reference, { status: 'paid', paidAt: new Date().toISOString(), paidAmount: result.amount }) || order;
      }
    } catch (err) {
      console.warn(`Status check for ${reference} unavailable: ${err.message}`);
    }
  }
  if (order.status !== 'pending') lastStatusCheck.delete(reference);

  return res.json(publicView(order));
});

module.exports = router;
