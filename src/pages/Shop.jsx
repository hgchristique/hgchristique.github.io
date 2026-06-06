import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/shop.css'

// All rates are relative to GHS (base currency)
const CURRENCY_RATES = {
  GHS: { rate: 1,      locale: 'en-GH',  decimals: 2 },
  USD: { rate: 0.0649, locale: 'en-US',  decimals: 2 },
  EUR: { rate: 0.0597, locale: 'de-DE',  decimals: 2 },
  GBP: { rate: 0.0513, locale: 'en-GB',  decimals: 2 },
  NGN: { rate: 105.19, locale: 'en-NG',  decimals: 0 },
  ZAR: { rate: 1.182,  locale: 'en-ZA',  decimals: 2 },
  KES: { rate: 8.44,   locale: 'sw-KE',  decimals: 0 },
  CAD: { rate: 0.0883, locale: 'en-CA',  decimals: 2 },
  AUD: { rate: 0.1,    locale: 'en-AU',  decimals: 2 },
  JPY: { rate: 9.74,   locale: 'ja-JP',  decimals: 0 },
  INR: { rate: 5.42,   locale: 'en-IN',  decimals: 2 },
  AED: { rate: 0.238,  locale: 'ar-AE',  decimals: 2 },
  CHF: { rate: 0.0584, locale: 'de-CH',  decimals: 2 },
  SGD: { rate: 0.087,  locale: 'en-SG',  decimals: 2 },
}

function useCurrency() {
  const [currencyCode, setCurrencyCode] = useState('GHS')

  useEffect(() => {
    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
      .then(r => r.json())
      .then(data => {
        const code = data.currency
        if (typeof code === 'string' && /^[A-Z]{3}$/.test(code) && CURRENCY_RATES[code]) {
          setCurrencyCode(code)
        }
      })
      .catch(() => {})
  }, [])

  const formatPrice = useCallback((ghsPrice) => {
    const config = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.GHS
    const converted = ghsPrice * config.rate
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    }).format(converted)
  }, [currencyCode])

  return { currencyCode, formatPrice }
}

// Prices stored in GHS (base currency)
const PRODUCTS = [
  { sku: 'AT-0341', name: 'Root Necklace',        cat: 'Neckwear',    price: 350,   tag: 'new',  bg: '#c4944a', color: 'rgba(0,0,0,0.45)', img: '/neck.jpeg' },
  { sku: 'AT-0218', name: 'Mariner Trench',       cat: 'Bags',        price: 350,   tag: null,   bg: '#6b7c6e', color: 'rgba(255,255,255,0.55)', img: '/bag1.jpeg' },
  { sku: 'AT-0512', name: 'Ridge Cashmere Knit',  cat: 'Neckwear',    price: 300,   tag: null,   bg: '#d4a853', color: 'rgba(0,0,0,0.45)', img: '/neck2.jpeg' },
  { sku: 'AT-0517', name: 'Halsey Mohair Crew',   cat: 'Knitwear',    price: 300,   tag: 'low',  bg: '#c4944a', color: 'rgba(0,0,0,0.45)', img: '/bag2.jpeg' },
  { sku: 'AT-0719', name: 'Boss Silk Blouse',     cat: 'Shirts',      price: 400,   tag: null,   bg: '#d8cec4', color: 'rgba(0,0,0,0.45)', img: '/bag3.jpeg' },
  { sku: 'AT-0724', name: 'Linen Field Shirt',    cat: 'Shirts',      price: 500,   tag: null,   bg: '#c4b89a', color: 'rgba(0,0,0,0.45)', img: '/bag4.jpeg' },
  { sku: 'AT-0731', name: 'Silk Poplin Shirt',    cat: 'Shirts',      price: 400,   tag: 'new',  bg: '#b8c4c0', color: 'rgba(0,0,0,0.45)', img: '/bag5.jpeg' },
  { sku: 'AT-0903', name: 'Atelier Wide Trouser', cat: 'Trousers',    price: 350,   tag: null,   bg: '#b8845a', color: 'rgba(255,255,255,0.55)', img: '/bag6.jpeg' },
  { sku: 'AT-0915', name: 'Wool Chalk Stripe',    cat: 'Trousers',    price: 300,   tag: null,   bg: '#3d4a5c', color: 'rgba(255,255,255,0.55)', img: '/bag7.jpeg' },
  { sku: 'AT-1002', name: 'The Silk Slip Dress',  cat: 'Dresses',     price: 10472, tag: 'new',  bg: '#2d3642', color: 'rgba(255,255,255,0.55)' },
  { sku: 'AT-1018', name: 'Linen Shift Dress',    cat: 'Dresses',     price: 7546,  tag: null,   bg: '#c4b89a', color: 'rgba(0,0,0,0.45)' },
  { sku: 'AT-0042', name: 'Onyx Crossbody',       cat: 'Bags',        price: 13706, tag: null,   bg: '#0a0a0a', color: '#c8a96e' },
  { sku: 'AT-0105', name: 'Market Tote',          cat: 'Bags',        price: 9548,  tag: null,   bg: '#b8845a', color: 'rgba(255,255,255,0.55)' },
  { sku: 'AT-0211', name: 'Box Clutch',           cat: 'Bags',        price: 8316,  tag: 'new',  bg: '#3d302a', color: '#c8a96e' },
  { sku: 'AT-0318', name: 'Chain Shoulder Bag',   cat: 'Bags',        price: 15092, tag: null,   bg: '#6b5a4e', color: 'rgba(255,255,255,0.55)' },
  { sku: 'AT-0422', name: 'Zip Pouch',            cat: 'Bags',        price: 3234,  tag: 'low',  bg: '#c4944a', color: 'rgba(0,0,0,0.45)' },
  { sku: 'AT-0533', name: 'Weekend Duffel',       cat: 'Bags',        price: 18172, tag: null,   bg: '#2d3642', color: 'rgba(255,255,255,0.55)' },
  { sku: 'AT-0601', name: 'Silk Scarf',           cat: 'Accessories', price: 2772,  tag: 'new',  bg: '#d4a853', color: 'rgba(0,0,0,0.45)' },
  { sku: 'AT-0614', name: 'Leather Belt',         cat: 'Accessories', price: 3388,  tag: null,   bg: '#3d302a', color: '#c8a96e' },
  { sku: 'AT-0627', name: 'Wool Beanie',          cat: 'Accessories', price: 1848,  tag: null,   bg: '#6b7c6e', color: 'rgba(255,255,255,0.55)' },
  { sku: 'AT-0641', name: 'Canvas Tote Bag',      cat: 'Accessories', price: 1463,  tag: 'low',  bg: '#c4b89a', color: 'rgba(0,0,0,0.45)' },
]

const CATEGORIES = [
  { id: 'all',         label: 'All items',    count: 21 },
  { id: 'Neckwear',    label: 'Neckwear',     count: 2 },
  { id: 'Knitwear',    label: 'Knitwear',     count: 1 },
  { id: 'Shirts',      label: 'Shirts',       count: 3 },
  { id: 'Trousers',    label: 'Trousers',     count: 2 },
  { id: 'Dresses',     label: 'Dresses',      count: 2 },
  { id: 'Bags',        label: 'Bags',         count: 7 },
  { id: 'Accessories', label: 'Accessories',  count: 4 },
]

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

export default function Shop() {
  const { currencyCode, formatPrice } = useCurrency()
  const [cart, setCart] = useState({})
  const [selectedColors, setSelectedColors] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('instock')
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Card')
  const [loading, setLoading] = useState(true)
  const [loadingVisible, setLoadingVisible] = useState(true)
  const [time, setTime] = useState('')

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

  function addToCart(sku) {
    setCart(prev => ({ ...prev, [sku]: (prev[sku] || 0) + 1 }))
  }

  function removeFromCart(sku) {
    setCart(prev => { const next = { ...prev }; delete next[sku]; return next })
  }

  function changeQty(sku, delta) {
    setCart(prev => {
      const next = { ...prev, [sku]: (prev[sku] || 0) + delta }
      if (next[sku] <= 0) delete next[sku]
      return next
    })
  }

  function processCharge() {
    if (cartEntries.length === 0) return
    setCart({})
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
  const tax = subtotal * 0.0875
  const total = subtotal + tax

  const filtered = PRODUCTS.filter(p => {
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
            <div className="loading-icon">S</div>
            <span className="loading-brand">STYLE <span>BOSS</span></span>
          </div>
          <p className="loading-sub">Point-of-sale · Register 04 · Floor 1</p>
          <div className="loading-bar"><div className="loading-bar-fill"></div></div>
        </div>
      )}

      <header className="pos-topbar">
        <Link to="/" className="pos-back" title="Back to site">
          <svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg>
        </Link>
        <div className="pos-brand">
          <div className="pos-brand-icon">S</div>
          <div>
            <div className="pos-brand-name">Styleboss</div>
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
          <div className="pos-user">
            <div>
              <div className="pos-user-name">Style Shop</div>
              <div className="pos-user-role">Floor · Senior</div>
            </div>
            <div className="pos-avatar">SS</div>
          </div>
        </div>
      </header>

      <main className="pos-main">
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
                { id: 'instock', label: 'In stock' },
                { id: 'new',     label: 'New' },
                { id: 'sale',    label: 'Sale' },
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
                onClick={() => addToCart(p.sku)}
              >
                <div className="product-img" style={{ background: selectedColors[p.sku] ?? p.bg }}>
                  {p.img
                    ? <img src={p.img} alt={p.name} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <ProductSvg cat={p.cat} color={p.color} />
                  }
                  <div className="product-add-btn">+</div>
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
                  <div className="product-price">{formatPrice(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="pos-order">
          <div className="order-header">
            <div>
              <h3>Current order</h3>
              <p>Nº MA-2452-1000 · Walk-in</p>
            </div>
            <div className="order-count-badge">{itemCount}</div>
          </div>
          <div className="order-items">
            {cartEntries.length === 0 ? (
              <div className="order-empty">
                <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <p>Order is empty</p>
                <span>Scan or tap an item to begin</span>
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
                        <span className="qty-btn" onClick={e => { e.stopPropagation(); changeQty(sku, -1) }}>−</span>
                        {qty}
                        <span className="qty-btn" onClick={e => { e.stopPropagation(); changeQty(sku, 1) }}>+</span>
                        <span>· {formatPrice(p.price)} each</span>
                      </div>
                    </div>
                    <div>
                      <div className="order-item-price">{formatPrice(p.price * qty)}</div>
                      <span className="order-item-remove" onClick={e => { e.stopPropagation(); removeFromCart(sku) }}>×</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          {cartEntries.length > 0 && (
            <div className="order-footer">
              <div className="order-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="order-line"><span>Sales tax · 8.75%</span><span>{formatPrice(tax)}</span></div>
              <div className="order-line loyalty"><span>Loyalty credit</span><span>– {formatPrice(0)}</span></div>
              <div className="order-total">
                <span className="order-total-label">Total due</span>
                <span className="order-total-value">{formatPrice(total)}</span>
              </div>
              <div className="payment-methods">
                {['Card', 'MoMo'].map(method => (
                  <button
                    key={method}
                    className={`pay-btn${paymentMethod === method ? ' active' : ''}`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method === 'Card' && <svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
                    {method === 'MoMo' && <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="2"/></svg>}
                    {method}
                  </button>
                ))}
              </div>
              <button className="charge-btn" onClick={processCharge}>
                <span>Charge</span>
                <span className="charge-amount">{formatPrice(total)}</span>
              </button>
            </div>
          )}
        </aside>
      </main>
    </div>
  )
}
