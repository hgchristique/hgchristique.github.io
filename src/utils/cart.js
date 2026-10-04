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

export const getPendingOrder = () => {
  try { return localStorage.getItem(PENDING_KEY) }
  catch { return null }
}

export const savePendingOrder = (reference) => {
  try { localStorage.setItem(PENDING_KEY, reference) }
  catch { /* storage unavailable: the return URL still carries the reference */ }
}

export const clearPendingOrder = () => {
  try { localStorage.removeItem(PENDING_KEY) }
  catch { /* nothing to clear */ }
}
