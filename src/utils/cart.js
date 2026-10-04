const KEY = 'sb_cart'

export const getCart = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') }
  catch { return {} }
}

export const saveCart = (cart) => {
  localStorage.setItem(KEY, JSON.stringify(cart))
}

export const addCartItem = (sku, qty = 1) => {
  const cart = getCart()
  cart[sku] = (cart[sku] || 0) + qty
  saveCart(cart)
  return cart
}

const PENDING_KEY = 'sb_pending_order'
// Mobile money confirms within minutes; after this an unconfirmed order is no longer chased.
const PENDING_MAX_AGE_MS = 30 * 60 * 1000

export const getPendingOrder = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(PENDING_KEY) || 'null')
    if (!stored) return null
    const fresh = typeof stored.reference === 'string' && Date.now() - stored.savedAt < PENDING_MAX_AGE_MS
    if (!fresh) localStorage.removeItem(PENDING_KEY)
    return fresh ? stored.reference : null
  } catch {
    return null
  }
}

export const savePendingOrder = (reference) => {
  try { localStorage.setItem(PENDING_KEY, JSON.stringify({ reference, savedAt: Date.now() })) }
  catch { /* storage unavailable: the return URL still carries the reference */ }
}

export const clearPendingOrder = () => {
  try { localStorage.removeItem(PENDING_KEY) }
  catch { /* nothing to clear */ }
}
