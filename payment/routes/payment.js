const express = require('express');
const router  = express.Router();

// TODO: initialise Express Pay SDK / HTTP client here using env vars:
// const expressPay = require('express-pay-sdk')({ apiKey: process.env.EXPRESS_PAY_API_KEY });

// POST /api/payment/charge
// Body: { amount, currency, items, method, orderId }
router.post('/charge', async (req, res) => {
  const { amount, currency = 'USD', items, method, orderId } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // TODO: replace with actual Express Pay API call, e.g.:
    // const result = await expressPay.charges.create({
    //   amount: Math.round(amount * 100),   // Express Pay typically expects cents
    //   currency,
    //   payment_method: method,
    //   metadata: { order_id: orderId, items: JSON.stringify(items) },
    // });

    // Placeholder response until API is wired up:
    return res.json({
      success: true,
      orderId,
      amount,
      currency,
      method,
      message: 'Express Pay integration pending — add your API credentials to .env',
    });
  } catch (err) {
    console.error('Express Pay error:', err);
    return res.status(500).json({ error: 'Payment failed', detail: err.message });
  }
});

// POST /api/payment/refund
// Body: { chargeId, amount }
router.post('/refund', async (req, res) => {
  const { chargeId, amount } = req.body;

  if (!chargeId) {
    return res.status(400).json({ error: 'chargeId required' });
  }

  try {
    // TODO: express pay refund call
    return res.json({ success: true, chargeId, amount, message: 'Refund pending integration' });
  } catch (err) {
    return res.status(500).json({ error: 'Refund failed', detail: err.message });
  }
});

// GET /api/payment/status/:orderId
router.get('/status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  // TODO: look up order status via Express Pay
  return res.json({ orderId, status: 'pending_integration' });
});

module.exports = router;
