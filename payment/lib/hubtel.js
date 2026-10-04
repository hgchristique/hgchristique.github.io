const INITIATE_URL = 'https://payproxyapi.hubtel.com/items/initiate';
const STATUS_BASE  = 'https://api-txnstatus.hubtel.com/transactions';
const TIMEOUT_MS   = 15000;

const REQUIRED_ENV = ['HUBTEL_API_ID', 'HUBTEL_API_KEY', 'HUBTEL_MERCHANT_ACCOUNT', 'SITE_URL', 'PUBLIC_API_URL'];

function missingConfig() {
  return REQUIRED_ENV.filter(name => !process.env[name]);
}

function authHeader() {
  const raw = `${process.env.HUBTEL_API_ID}:${process.env.HUBTEL_API_KEY}`;
  return `Basic ${Buffer.from(raw).toString('base64')}`;
}

async function readJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { return null; }
}

// Creates a hosted checkout page. Resolves to { checkoutUrl, checkoutId }.
async function initiateCheckout({ totalAmount, description, clientReference, callbackUrl, returnUrl, cancellationUrl, payeeName, payeeMobileNumber, payeeEmail }) {
  const payload = {
    totalAmount,
    description,
    callbackUrl,
    returnUrl,
    cancellationUrl,
    merchantAccountNumber: process.env.HUBTEL_MERCHANT_ACCOUNT,
    clientReference,
    payeeName,
    payeeMobileNumber,
  };
  if (payeeEmail) payload.payeeEmail = payeeEmail;

  const res = await fetch(INITIATE_URL, {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const body = await readJson(res);

  if (!res.ok || !body || body.responseCode !== '0000' || !body.data || !body.data.checkoutUrl) {
    const reason = (body && (body.message || body.status || body.responseCode)) || `HTTP ${res.status}`;
    const err = new Error(`Hubtel rejected the checkout request: ${reason}`);
    err.httpStatus = res.status;
    throw err;
  }

  return { checkoutUrl: body.data.checkoutUrl, checkoutId: body.data.checkoutId };
}

// Looks a transaction up by our reference. Resolves to { status, amount } where
// status is Hubtel's own value ('Paid', 'Unpaid', 'Refunded').
// Hubtel only answers this from whitelisted IPs, so callers must tolerate failure.
async function checkStatus(clientReference) {
  const url = `${STATUS_BASE}/${encodeURIComponent(process.env.HUBTEL_MERCHANT_ACCOUNT)}/status?clientReference=${encodeURIComponent(clientReference)}`;
  const res = await fetch(url, {
    headers: { Authorization: authHeader(), Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const body = await readJson(res);

  if (!res.ok || !body || !body.data) {
    const reason = (body && (body.message || body.responseCode)) || `HTTP ${res.status}`;
    const err = new Error(`Hubtel status check failed: ${reason}`);
    err.httpStatus = res.status;
    throw err;
  }

  return { status: body.data.status, amount: Number(body.data.amount) };
}

module.exports = { missingConfig, initiateCheckout, checkStatus };
