import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [bagCount, setBagCount] = useState(0)
  const [email, setEmail] = useState('')
  const [newsletterConfirmed, setNewsletterConfirmed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  function handleSubscribe(e) {
    e.preventDefault()
    setNewsletterConfirmed(true)
    setEmail('')
  }

  return (
    <>
      <header className="site-header">
        <div className="utility-bar">
          <span>EN · USD</span>
          <span>·</span>
          <a href="#">STORES</a>
        </div>
        <div className="header-main">
          <div className="header-icons" style={{ marginRight: 'auto', marginLeft: 0 }}>
            <button aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
            </button>
            <button aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </button>
            <button aria-label="Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button aria-label="Shopping bag" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span className="bag-count">{bagCount}</span>
            </button>
          </div>
          <Link to="/" className="header-logo">STYLEBOSS</Link>
          <div className="header-icons" style={{ marginLeft: 'auto' }}>
            <Link to="/shop" className="open-shop-btn">OPEN SHOP <span>→</span></Link>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#">WOMEN</a>
          <a href="#">MEN</a>
          <a href="#">BAGS</a>
          <a href="#">READY-TO-WEAR</a>
          <a href="#">ACCESSORIES</a>
          <a href="#">NEW IN</a>
          <a href="#" className="active">THE HOUSE</a>
        </nav>
      </header>

      <section className="hero" id="hero">
        {[
          { img: '/hero1.jpg', counter: '01 — The Wool Coat',   label: 'READY-TO-WEAR' },
          { img: '/hero2.jpg', counter: '02 — The Silk Dress',  label: 'NEW ARRIVALS' },
          { img: '/hero3.jpg', counter: '03 — The Leather Bag', label: 'LEATHER GOODS' },
        ].map((slide, i) => (
          <div
            key={i}
            className={`slide${current === i ? ' active' : ''}`}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="slide-overlay" />
            <div className="hero-dots">
              {[0, 1, 2].map(d => (
                <span
                  key={d}
                  className={`hero-dot${current === d ? ' active' : ''}`}
                  onClick={() => setCurrent(d)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="split-tiles">
        <div className="split-tile" style={{ background: 'var(--slate)' }}>
          <span className="tile-label">READY-TO-WEAR</span>
          <div className="split-tile-svg">
            <svg viewBox="0 0 220 320" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="90" y1="8" x2="82" y2="44"/>
              <line x1="130" y1="8" x2="138" y2="44"/>
              <path d="M82 44 Q110 56 138 44"/>
              <line x1="82" y1="44" x2="72" y2="104"/>
              <line x1="138" y1="44" x2="148" y2="104"/>
              <path d="M72 104 Q110 112 148 104"/>
              <line x1="72" y1="104" x2="18" y2="298"/>
              <line x1="148" y1="104" x2="202" y2="298"/>
              <line x1="18" y1="298" x2="202" y2="298"/>
            </svg>
          </div>
          <div>
            <h2 className="tile-headline">An afternoon<br />in <em>silk.</em></h2>
            <a href="#" className="tile-cta">EXPLORE THE EDIT →</a>
          </div>
        </div>
        <div className="split-tile" style={{ background: 'var(--caramel)' }}>
          <span className="tile-label">LEATHER GOODS</span>
          <div className="split-tile-svg">
            <svg viewBox="0 0 220 280" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M78 60 Q78 30 110 30 Q142 30 142 60"/>
              <rect x="42" y="60" width="136" height="170" rx="4"/>
              <line x1="42" y1="88" x2="178" y2="88"/>
              <line x1="110" y1="88" x2="110" y2="230"/>
            </svg>
          </div>
          <div>
            <h2 className="tile-headline">The carry,<br /><em>re-considered.</em></h2>
            <a href="#" className="tile-cta">DISCOVER BAGS →</a>
          </div>
        </div>
      </section>

      <section className="house-quote">
        <span className="label">THE HOUSE</span>
        <span className="quote-mark">"</span>
        <blockquote>We make clothing the way we'd want to <em>receive</em> it — slowly, by hand, in two cities.</blockquote>
        <Link to="/contact">OUR STORY</Link>
      </section>

      <section className="featured-piece">
        <div className="featured-visual">
          <svg viewBox="0 0 300 340" fill="none" stroke="var(--gold-line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M70 40 Q50 20 60 60 Q70 100 60 140"/>
            <line x1="60" y1="140" x2="58" y2="165"/>
            <rect x="58" y="165" width="184" height="130" rx="4"/>
            <rect x="130" y="158" width="40" height="14" rx="3"/>
            <path d="M58 220 Q150 236 242 220"/>
            <circle cx="72" cy="168" r="5"/>
          </svg>
        </div>
        <div className="featured-info">
          <span className="label">FEATURED PIECE · NO. 042</span>
          <h2 className="featured-title">The Onyx<br /><em>Crossbody.</em></h2>
          <p className="featured-desc">Vegetable-tanned calfskin, hand-burnished edges, a single solid-brass clasp from a workshop in Lyon. Made to be carried, not displayed.</p>
          <div className="featured-actions">
            <button className="add-to-bag" onClick={() => setBagCount(c => c + 1)}>ADD TO BAG · $890</button>
            <a href="#" className="view-details">VIEW DETAILS</a>
          </div>
        </div>
      </section>

      <section className="category-section">
        <div className="category-header">
          <span className="label">EXPLORE</span>
          <h2 className="category-header-title">By <em>category.</em></h2>
        </div>
        <div className="category-grid">
          <div className="category-card" style={{ background: 'linear-gradient(160deg, #d4a853, #c4944a)' }}>
            <div className="cat-svg">
              <svg viewBox="0 0 200 200" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M60 30 L30 60 L55 70 L55 170 L145 170 L145 70 L170 60 L140 30"/>
                <path d="M60 30 Q100 50 140 30"/>
                <line x1="55" y1="100" x2="145" y2="100"/>
                <line x1="55" y1="115" x2="145" y2="115"/>
                <line x1="55" y1="130" x2="145" y2="130"/>
                <line x1="55" y1="145" x2="145" y2="145"/>
                <line x1="30" y1="60" x2="55" y2="70"/>
              </svg>
            </div>
            <div className="cat-footer">
              <span className="cat-name">KNITWEAR</span>
              <span className="cat-count">06</span>
            </div>
          </div>
          <div className="category-card" style={{ background: 'var(--terracotta)' }}>
            <div className="cat-svg">
              <svg viewBox="0 0 240 160" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="20" y="30" width="200" height="120" rx="4"/>
                <path d="M20 30 L120 90 L220 30"/>
                <circle cx="120" cy="90" r="7"/>
              </svg>
            </div>
            <div className="cat-footer">
              <span className="cat-name">BAGS & CLUTCHES</span>
              <span className="cat-count">06</span>
            </div>
          </div>
          <div className="category-card" style={{ background: 'var(--charcoal)' }}>
            <div className="cat-svg">
              <svg viewBox="0 0 180 220" fill="none" stroke="var(--gold-line)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M60 20 L60 140"/>
                <path d="M120 20 L120 140"/>
                <line x1="60" y1="20" x2="120" y2="20"/>
                <path d="M60 140 Q55 160 50 170"/>
                <path d="M120 140 Q130 155 140 165 L140 200"/>
                <path d="M50 170 Q40 180 42 195 Q44 205 80 205 L140 200"/>
                <line x1="118" y1="170" x2="140" y2="165"/>
                <path d="M42 195 L42 205 L80 208 L140 205 L140 200"/>
              </svg>
            </div>
            <div className="cat-footer">
              <span className="cat-name">BOOTS & ACCESSORIES</span>
              <span className="cat-count">04</span>
            </div>
          </div>
        </div>
      </section>

      <section className="craft-values">
        <span className="label craft-label">THE HOUSE</span>
        <h2 className="craft-heading">Two cities. One studio.<br /><em>Seven seasons.</em></h2>
        <div className="craft-cols">
          <div className="craft-col">
            <h3 className="craft-col-title">Cut in Brooklyn,<br />finished in Paris.</h3>
            <p className="craft-col-body">Patterns are drafted and cut in our Williamsburg studio. The panels travel to a third-generation house in the 11th arrondissement to be sewn, pressed, and finished by hand.</p>
          </div>
          <div className="craft-col">
            <h3 className="craft-col-title">Materials,<br />then everything else.</h3>
            <p className="craft-col-body">Italian wool, Japanese cotton, vegetable-tanned calfskin. We start with the fiber and design backward. Synthetics are a hard no.</p>
          </div>
          <div className="craft-col">
            <h3 className="craft-col-title">Repair,<br />never replace.</h3>
            <p className="craft-col-body">Every piece carries a lifetime mending program. Tears, lost buttons, worn cuffs — send it back, we'll fix it. We've re-soled bags from 2020.</p>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <span className="label">HOUSE LETTERS</span>
          <h2 className="newsletter-heading">One note a month. <em>No more.</em></h2>
        </div>
        <div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-field">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-submit">SUBSCRIBE</button>
            </div>
            {newsletterConfirmed && (
              <p className="newsletter-confirm">You're on the list. One note a month, as promised.</p>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <p className="footer-col-title">CLIENT SERVICES</p>
            <ul>
              <li><Link to="/contact">Contact us</Link></li>
              <li><a href="#">Stores & locations</a></li>
              <li><a href="#">Shipping & returns</a></li>
              <li><a href="#">Repair & care</a></li>
              <li><a href="#">Size guide</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">THE HOUSE</p>
            <ul>
              <li><Link to="/contact">Our story</Link></li>
              <li><a href="#">Craft & materials</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">DISCOVER</p>
            <ul>
              <li><a href="#">Women</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Bags</a></li>
              <li><a href="#">Ready-to-wear</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">FOLLOW STYLEBOSS</p>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Pinterest</a></li>
              <li><a href="#">Spotify</a></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">Subscribe to letters</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-logo">STYLEBOSS</span>
          <div className="footer-legal">
            <a href="#">LEGAL</a>
            <a href="#">PRIVACY</a>
            <a href="#">COOKIES</a>
            <a href="#">ACCESSIBILITY</a>
          </div>
          <span className="footer-copy">© 2026 STYLEBOSS · ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </>
  )
}
