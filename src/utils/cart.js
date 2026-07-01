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
