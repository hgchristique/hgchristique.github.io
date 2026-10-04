import { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { useCurrency } from '../hooks/useCurrency'
import { getCart, saveCart, getPendingOrder, savePendingOrder, clearPendingOrder } from '../utils/cart'
import '../styles/shop.css'

function PriceDisplay({ ghsAmount, isForeign, formatPrice, formatOriginalPrice }) {
  if (!isForeign) return <>{formatPrice(ghsAmount)}</>
  return (
    <span className="price-discount-wrap">
      <span className="price-original">{formatOriginalPrice(ghsAmount)}</span>
      <span className="price-discount-badge">20% OFF</span>
      <span className="price-final">{formatPrice(ghsAmount)}</span>
    </span>
  )
}

function ProductSvg({ cat, color }) {
  const base = { fill: 'none', strokeWidth: '1.3', strokeLinecap: 'round', strokeLinejoin: 'round', stroke: color }
  switch (cat) {
    case 'Outerwear':
      return <svg viewBox="0 0 160 200" {...base}><path d="M52 14 L36 34 L52 42 L52 186 L108 186 L108 42 L124 34 L108 14"/><path d="M52 14 Q80 28 108 14"/></svg>
    case 'Knitwear':
      return <svg viewBox="0 0 160 180" {...base}><path d="M50 24 L28 52 L46 60 L46 168 L114 168 L114 60 L132 52 L110 24"/><path d="M50 24 Q80 40 110 24"/><line x1="46" y1="95" x2="114" y2="95"/><line x1="46" y1="110" x2="114" y2="110"/><line x1="46" y1="125" x2="114" y2="125"/><line x1="46" y1="140" x2="114" y2="140"/></svg>
    case 'Shirts':
      return <svg viewBox="0 0 160 180" {...base}><path d="M54 20 L30 50 L48 58 L48 168 L112 168 L112 58 L130 50 L106 20"/><path d="M54 20 Q80 35 106 20"/><line x1="80" y1="35" x2="80" y2="168"/></svg>
    case 'Trousers':
      return <svg viewBox="0 0 160 200" {...base}><line x1="40" y1="20" x2="120" y2="20"/><line x1="40" y1="20" x2="38" y2="100"/><line x1="120" y1="20" x2="122" y2="100"/><path d="M38 100 Q80 108 122 100"/><line x1="38" y1="100" x2="30" y2="195"/><line x1="80" y1="104" x2="80" y2="195"/><line x1="122" y1="100" x2="130" y2="195"/><line x1="30" y1="195" x2="80" y2="195"/><line x1="80" y1="195" x2="130" y2="195"/></svg>
    case 'Dresses':
      return <svg viewBox="0 0 160 220" {...base}><line x1="68" y1="8" x2="62" y2="36"/><line x1="92" y1="8" x2="98" y2="36"/><path d="M62 36 Q80 46 98 36"/><line x1="62" y1="36" x2="54" y2="82"/><line x1="98" y1="36" x2="106" y2="82"/><path d="M54 82 Q80 90 106 82"/><line x1="54" y1="82" x2="16" y2="212"/><line x1="106" y1="82" x2="144" y2="212"/><line x1="16" y1="212" x2="144" y2="212"/></svg>
    case 'Bags':
      return <svg viewBox="0 0 160 160" {...base}><path d="M52 46 Q52 26 80 26 Q108 26 108 46"/><rect x="28" y="46" width="104" height="96" rx="6"/><line x1="28" y1="70" x2="132" y2="70"/></svg>
    default:
      return <svg viewBox="0 0 160 120" {...base}><rect x="20" y="24" width="120" height="72" rx="4"/><path d="M20 24 L80 60 L140 24"/><circle cx="80" cy="60" r="6"/></svg>
  }
}

const BAG_COLORS = ['#0a0a0a', '#b8845a', '#2d3642', '#6b2d3e', '#4a5240', '#c4b89a']

const PAYMENT_API = import.meta.env.VITE_PAYMENT_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '')
const ORDER_REFERENCE = /^HF[A-Z0-9]{10,30}/
const PHONE_PATTERN = /^\+?\d{9,15}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Mirrors useCurrency: foreign prices are doubled, then 20% off. Payment is always taken in GHS.
const FOREIGN_MULTIPLIER = 2 * 0.8
// Matches the payment server's per-product limit.
const MAX_QTY = 20
const STATUS_POLL_MS = 4000
const STATUS_POLL_LIMIT = 30
const CANCEL_CHECKS = 3

const formatGhs = amount => new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount)

const PAYMENT_MESSAGES = {
  checking:  { title: 'Checking your payment', text: 'One moment while we confirm with the payment provider.' },
  pending:   { title: 'Waiting for payment confirmation', text: 'This can take a minute. You can keep browsing.' },
  paid:      { title: 'Payment received', text: 'Thank you. We will contact you shortly to arrange delivery.' },
  failed:    { title: 'Payment was not completed', text: 'You have not been charged. Your order is still in your bag if you want to try again.' },
  cancelled: { title: 'Payment cancelled', text: 'You have not been charged. Your order is still in your bag.' },
  unknown:   { title: 'Payment not confirmed yet', text: 'If you were charged, please contact us with your order reference.' },
}

function validateCustomer({ name, phone, address, email }) {
  if (name.trim().length < 2 || name.trim().length > 80) return 'Enter your full name.'
  if (!PHONE_PATTERN.test(phone.replace(/[\s()-]/g, ''))) return 'Enter a valid phone number.'
  if (address.trim().length < 5 || address.trim().length > 200) return 'Enter your delivery address.'
  if (email.trim() && !EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address, or leave it blank.'
  return null
}

export default function Shop() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { currencyCode, isForeign, formatPrice, formatOriginalPrice } = useCurrency()
  const [cart, setCart] = useState(() => getCart())
  const [selectedColors, setSelectedColors] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('instock')
  const [searchQuery, setSearchQuery] = useState('')
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', email: '' })
  const [checkoutError, setCheckoutError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingVisible, setLoadingVisible] = useState(true)
  const [time, setTime] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
    }
    tick()
    const timer = setInterval(tick, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fade = setTimeout(() => setLoading(false), 1400)
    const remove = setTimeout(() => setLoadingVisible(false), 2000)
    return () => { clearTimeout(fade); clearTimeout(remove) }
  }, [])

  useEffect(() => {
    const stored = getCart()
    if (Object.keys(stored).length > 0) {
      setCart(prev => {
        const merged = { ...stored, ...prev }
        return merged
      })
    }
  }, [])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  function addToCart(sku) {
    setCart(prev => ({ ...prev, [sku]: (prev[sku] || 0) + 1 }))
  }

  function removeFromCart(sku) {
    setCart(prev => { const next = { ...prev }; delete next[sku]; return next })
  }

  function changeQty(sku, delta) {
    setCart(prev => {
      const next = { ...prev, [sku]: Math.min(MAX_QTY, (prev[sku] || 0) + delta) }
      if (next[sku] <= 0) delete next[sku]
      return next
    })
  }

  // Back from the payment page: confirm the order with the payment server.
  useEffect(() => {
    const fromUrl = (searchParams.get('ref') || '').match(ORDER_REFERENCE)
    const reference = fromUrl ? fromUrl[0] : getPendingOrder()
    if (!reference || !ORDER_REFERENCE.test(reference) || !PAYMENT_API) return

    const wasCancelled = searchParams.has('cancelled')
    // Only an order started in this browser may empty the bag; a reference pasted into a link must not.
    const startedHere = reference === getPendingOrder()
    if (searchParams.has('ref')) setSearchParams({}, { replace: true })

    let stopped = false
    let timer = null
    let attempts = 0

    function finish(status, amount) {
      if (status !== 'unknown') clearPendingOrder()
      if (status === 'paid' && startedHere) setCart({})
      setPayment({ reference, status, amount })
    }

    async function check() {
      attempts += 1
      let result = null
      try {
        const res = await fetch(`${PAYMENT_API}/api/payment/status/${reference}`, { signal: AbortSignal.timeout(20000) })
        if (stopped) return
        if (res.status === 404) { clearPendingOrder(); setPayment(null); return }
        if (res.ok) result = await res.json()
      } catch {
        // Network trouble: fall through and retry.
      }
      if (stopped) return

      if (result && result.status === 'paid') return finish('paid', result.amount)
      if (result && result.status === 'failed') return finish('failed', result.amount)
      // A payment approved on the phone just before pressing Cancel can still land, so look more than once.
      if (wasCancelled && attempts >= CANCEL_CHECKS) return finish('cancelled')
      if (attempts >= STATUS_POLL_LIMIT) return finish('unknown')

      setPayment({ reference, status: wasCancelled ? 'checking' : 'pending' })
      timer = setTimeout(check, STATUS_POLL_MS)
    }

    setPayment({ reference, status: 'checking' })
    check()
    return () => { stopped = true; clearTimeout(timer) }
    // Runs once on arrival; the reference is read from the URL before it is cleared.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Coming back from the payment page with the Back button restores this page as it was left.
  useEffect(() => {
    const onPageShow = e => { if (e.persisted) setSubmitting(false) }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  function updateCustomer(field, value) {
    setCustomer(prev => ({ ...prev, [field]: value }))
    setCheckoutError('')
  }

  async function processCharge() {
    if (cartEntries.length === 0 || submitting) return

    const invalid = validateCustomer(customer)
    if (invalid) { setCheckoutError(invalid); return }
    if (!PAYMENT_API) { setCheckoutError('Online payment is not available yet. Please contact us to place your order.'); return }

    setSubmitting(true)
    setCheckoutError('')
    try {
      const res = await fetch(`${PAYMENT_API}/api/payment/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Skus no longer in the catalogue are not shown in the bag, so they are not charged either.
          items: cartEntries.filter(([sku]) => PRODUCTS.some(p => p.sku === sku)).map(([sku, qty]) => ({ sku, qty })),
          customer: {
            name: customer.name.trim(),
            phone: customer.phone.trim(),
            address: customer.address.trim(),
            email: customer.email.trim() || undefined,
          },
          currency: currencyCode,
        }),
        signal: AbortSignal.timeout(30000),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data || !data.checkoutUrl) {
        setCheckoutError((data && data.error) || 'Could not start the payment. Please try again.')
        setSubmitting(false)
        return
      }
      savePendingOrder(data.reference)
      window.location.assign(data.checkoutUrl)
    } catch {
      setCheckoutError('Could not reach the payment service. Check your connection and try again.')
      setSubmitting(false)
    }
  }

  function toggleFilter(f) {
    setActiveFilter(prev => prev === f ? 'instock' : f)
  }

  const cartEntries = Object.entries(cart)
  const itemCount = cartEntries.reduce((s, [, q]) => s + q, 0)
  const subtotal = cartEntries.reduce((s, [sku, q]) => {
    const p = PRODUCTS.find(x => x.sku === sku)
    return s + (p ? p.price * q : 0)
  }, 0)
  const total = subtotal
  const ghsCharge = isForeign ? total * FOREIGN_MULTIPLIER : total

  const filtered = PRODUCTS.filter(p => {
    if (!p.img) return false
    if (p.hidden) return false
    if (activeCategory !== 'all' && p.cat !== activeCategory) return false
    if (activeFilter === 'new' && p.tag !== 'new') return false
    if (activeFilter === 'sale' && p.tag !== 'sale') return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="pos-app">
      {loadingVisible && (
        <div
          className="loading-screen"
          style={{ opacity: loading ? 1 : 0, pointerEvents: loading ? 'auto' : 'none', transition: 'opacity 0.5s' }}
        >
          <div className="loading-logo">
            <div className="loading-icon">H</div>
            <span className="loading-brand">HELORIA <span>FASHION</span></span>
          </div>
          <p className="loading-sub">Point-of-sale · Register 04 · Floor 1</p>
          <div className="loading-bar"><div className="loading-bar-fill"></div></div>
        </div>
      )}

      {payment && (
        <div className={`payment-banner ${payment.status}`} role="status">
          <div>
            <div className="payment-banner-title">{PAYMENT_MESSAGES[payment.status].title}</div>
            <div className="payment-banner-text">
              {PAYMENT_MESSAGES[payment.status].text}
              {payment.status === 'paid' && payment.amount ? ` Amount paid: ${formatGhs(payment.amount)}.` : ''}
            </div>
            <div className="payment-banner-ref">Order reference {payment.reference}</div>
          </div>
          <button
            className="payment-banner-close"
            aria-label="Dismiss"
            onClick={() => { if (payment.status !== 'unknown') clearPendingOrder(); setPayment(null) }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      <header className="pos-topbar">
        <Link to="/" className="pos-back" title="Back to site">
          <svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg>
        </Link>
        <div className="pos-brand">
          <div className="pos-brand-icon">H</div>
          <div>
            <div className="pos-brand-name">Heloria Fashion</div>
            <div className="pos-register">Register 04 · Floor 1</div>
          </div>
        </div>
        <div className="pos-search">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="pos-search-hint">⌘K</span>
        </div>
        <div className="pos-topbar-right">
          <div className="register-badge"><span className="dot"></span>Register open</div>
          <div className="currency-badge">{currencyCode}</div>
          <div className="pos-time">{time}</div>
          <button className="cart-topbar-btn" onClick={() => setCartOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {itemCount > 0 && <span className="cart-topbar-count">{itemCount}</span>}
          </button>
        </div>
      </header>

      <main className="pos-main pos-main-full">
        <aside className="pos-sidebar">
          <p className="sidebar-section-label">CATALOGUE</p>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`cat-btn${activeCategory === c.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label} <span className="cat-count-badge">{c.count}</span>
            </button>
          ))}
        </aside>

        <section className="pos-catalogue">
          <div className="catalogue-header">
            <div>
              <h2 className="catalogue-title">{activeCategory === 'all' ? 'All items' : activeCategory}</h2>
              <p className="catalogue-meta">{filtered.length} items · S/S 26 · floors 1 & 2</p>
            </div>
            <div className="catalogue-filters">
              {[
                { id: 'instock',   label: 'In stock' },
                { id: 'new',       label: 'New' },
                { id: 'sale',      label: 'Sale' },
                { id: 'all-items', label: 'Sort' },
              ].map(f => (
                <button
                  key={f.id}
                  className={`filter-btn${activeFilter === f.id ? ' active' : ''}`}
                  onClick={() => toggleFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="products-grid">
            {filtered.map(p => (
              <div
                key={p.sku}
                className={`product-card${cart[p.sku] ? ' in-cart' : ''}`}
                onClick={() => navigate(`/shop/${p.sku}`)}
              >
                <div className="product-img" style={{ background: selectedColors[p.sku] ?? p.bg }}>
                  {p.img
                    ? <img src={p.img} alt={p.name} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <ProductSvg cat={p.cat} color={p.color} />
                  }
                  <div className="product-add-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="9,18 15,12 9,6"/></svg>
                  </div>
                  {p.cat === 'Bags' && !p.img && (
                    <div className="color-swatches" onClick={e => e.stopPropagation()}>
                      {BAG_COLORS.map(c => (
                        <span
                          key={c}
                          className={`color-swatch${(selectedColors[p.sku] ?? p.bg) === c ? ' active' : ''}`}
                          style={{ background: c }}
                          onClick={() => setSelectedColors(prev => ({ ...prev, [p.sku]: c }))}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-cat">{p.cat}</div>
                  <div className="product-price"><PriceDisplay ghsAmount={p.price} isForeign={isForeign} formatPrice={formatPrice} formatOriginalPrice={formatOriginalPrice} /></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div>
                <h3>Current order</h3>
                <p>Nº MA-2452-1000 · Walk-in</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="order-count-badge">{itemCount}</div>
                <button className="cart-drawer-close" onClick={() => setCartOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            <div className="order-items">
              {cartEntries.length === 0 ? (
                <div className="order-empty">
                  <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  <p>Order is empty</p>
                  <span>Tap an item to begin</span>
                </div>
              ) : (
                cartEntries.map(([sku, qty]) => {
                  const p = PRODUCTS.find(x => x.sku === sku)
                  if (!p) return null
                  return (
                    <div key={sku} className="order-item">
                      <div className="order-item-thumb" style={{ background: p.bg, overflow: 'hidden' }}>
                        {p.img
                          ? <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <ProductSvg cat={p.cat} color={p.color} />
                        }
                      </div>
                      <div>
                        <div className="order-item-name">{p.name}</div>
                        <div className="order-item-qty">
                          <span className="qty-btn" onClick={() => changeQty(sku, -1)}>−</span>
                          {qty}
                          <span className="qty-btn" onClick={() => changeQty(sku, 1)}>+</span>
                          <span>· {formatPrice(p.price)} each</span>
                        </div>
                      </div>
                      <div>
                        <div className="order-item-price"><PriceDisplay ghsAmount={p.price * qty} isForeign={isForeign} formatPrice={formatPrice} formatOriginalPrice={formatOriginalPrice} /></div>
                        <span className="order-item-remove" onClick={() => removeFromCart(sku)}>×</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {cartEntries.length > 0 && (
              <div className="order-footer">
                <div className="order-line loyalty"><span>Loyalty credit</span><span>– {formatPrice(0)}</span></div>
                <div className="order-total">
                  <span className="order-total-label">Total due</span>
                  <span className="order-total-value"><PriceDisplay ghsAmount={total} isForeign={isForeign} formatPrice={formatPrice} formatOriginalPrice={formatOriginalPrice} /></span>
                </div>
                <div className="checkout-form">
                  <input
                    type="text" placeholder="Full name" aria-label="Full name" autoComplete="name" maxLength={80}
                    value={customer.name} onChange={e => updateCustomer('name', e.target.value)}
                  />
                  <input
                    type="tel" placeholder="Phone number" aria-label="Phone number" autoComplete="tel" maxLength={20}
                    value={customer.phone} onChange={e => updateCustomer('phone', e.target.value)}
                  />
                  <input
                    type="text" placeholder="Delivery address" aria-label="Delivery address" autoComplete="street-address" maxLength={200}
                    value={customer.address} onChange={e => updateCustomer('address', e.target.value)}
                  />
                  <input
                    type="email" placeholder="Email (optional)" aria-label="Email (optional)" autoComplete="email" maxLength={120}
                    value={customer.email} onChange={e => updateCustomer('email', e.target.value)}
                  />
                </div>
                {isForeign && (
                  <p className="checkout-note">Payment is taken in Ghana Cedis: {formatGhs(ghsCharge)}.</p>
                )}
                {checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}
                <button className="charge-btn" onClick={processCharge} disabled={submitting}>
                  <span>{submitting ? 'Opening secure payment...' : 'Pay now'}</span>
                  <span className="charge-amount">{formatPrice(total)}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
