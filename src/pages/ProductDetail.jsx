import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCurrency } from '../hooks/useCurrency'
import { addCartItem } from '../utils/cart'
import '../styles/productDetail.css'

function ProductSvg({ cat, color }) {
  const base = { fill: 'none', strokeWidth: '1.3', strokeLinecap: 'round', strokeLinejoin: 'round', stroke: color }
  switch (cat) {
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

export default function ProductDetail() {
  const { sku } = useParams()
  const navigate = useNavigate()
  const { formatPrice } = useCurrency()
  const product = PRODUCTS.find(p => p.sku === sku)

  const [qty, setQty] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? null)
  const [added, setAdded] = useState(false)

  const parent = PRODUCTS.find(p => p.variants?.includes(product.sku))

  const related = (() => {
    if (product.variants?.length) {
      return product.variants.map(vsku => PRODUCTS.find(p => p.sku === vsku)).filter(Boolean)
    }
    if (parent) {
      const siblings = parent.variants
        .filter(vsku => vsku !== product.sku)
        .map(vsku => PRODUCTS.find(p => p.sku === vsku))
        .filter(Boolean)
      return [parent, ...siblings]
    }
    return []
  })()

  if (!product) {
    return (
      <div className="pd-not-found">
        <p>Product not found.</p>
        <button onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    )
  }

  function handleAddToCart() {
    addCartItem(product.sku, qty)
    setAdded(true)
    setTimeout(() => navigate('/shop'), 900)
  }

  const imgBg = selectedColor ? selectedColor.hex : product.bg

  return (
    <div className="pd-page">
      <header className="pd-header">
        <button className="pd-back" onClick={() => navigate('/shop')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polyline points="15,18 9,12 15,6"/></svg>
          Back to Shop
        </button>
        <span className="pd-brand">HG CHRISTIQUE</span>
        <span className="pd-sku">{product.sku}</span>
      </header>

      <div className="pd-body">
        <div className="pd-image" style={{ background: imgBg }}>
          {product.img
            ? <img src={product.img} alt={product.name} />
            : <ProductSvg cat={product.cat} color={product.color} />
          }
        </div>

        <div className="pd-content">
          <div className="pd-meta">
            <span className="pd-cat">{product.cat}</span>
            {product.tag === 'new' && <span className="pd-badge">NEW</span>}
            {product.tag === 'low' && <span className="pd-badge pd-badge-low">LOW STOCK</span>}
          </div>

          <h1 className="pd-name">{product.name}</h1>
          {product.desc && <p className="pd-desc">{product.desc}</p>}
          <div className="pd-price">{formatPrice(product.price)}</div>

          {product.story && (
            <div className="pd-section">
              <h3 className="pd-section-title">The Story</h3>
              {product.story.split('\n\n').map((para, i) => (
                <p key={i} className="pd-story-para">{para}</p>
              ))}
            </div>
          )}

          {product.colorMeanings && (
            <div className="pd-section">
              <h3 className="pd-section-title">Color Meanings</h3>
              <div className="pd-color-meanings">
                {product.colorMeanings.map(cm => (
                  <div key={cm.name} className="pd-color-meaning-row">
                    <span className="pd-color-meaning-left">{cm.emoji} <strong>{cm.name}</strong></span>
                    <span className="pd-color-meaning-right">{cm.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="pd-section">
              <h3 className="pd-section-title">
                Color{selectedColor ? ` — ${selectedColor.name}` : ''}
              </h3>
              <div className="pd-color-swatches">
                {product.colors.map(c => (
                  <button
                    key={c.hex}
                    className={`pd-color-swatch${selectedColor?.hex === c.hex ? ' active' : ''}`}
                    style={{ background: c.hex }}
                    title={c.name}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pd-section">
            <h3 className="pd-section-title">Quantity</h3>
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {related.length > 0 && (
            <div className="pd-section">
              <h3 className="pd-section-title">Also in this style</h3>
              <div className="pd-variants">
                {related.map(v => (
                  <div key={v.sku} className="pd-variant-card" onClick={() => navigate(`/shop/${v.sku}`)}>
                    <div className="pd-variant-img" style={{ background: v.bg }}>
                      {v.img && <img src={v.img} alt={v.name} />}
                    </div>
                    <div className="pd-variant-info">
                      <span className="pd-variant-name">{v.name}</span>
                      <span className="pd-variant-price">{formatPrice(v.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className={`pd-add-btn${added ? ' pd-added' : ''}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? 'Added — returning to shop...' : `Add to Cart · ${formatPrice(product.price * qty)}`}
          </button>
        </div>
      </div>
    </div>
  )
}
