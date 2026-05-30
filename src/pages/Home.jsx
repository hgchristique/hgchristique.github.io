import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])


  return (
    <>
      <header className="site-header">
        <div className="header-main">
          <div className="header-icons" style={{ marginRight: 'auto', marginLeft: 0 }}>
            <button aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </button>
          </div>
          <Link to="/" className="header-logo">STYLEBOSS</Link>
          <div className="header-icons" style={{ marginLeft: 'auto' }}>
            <Link to="/shop" className="open-shop-btn">OPEN SHOP <span>→</span></Link>
          </div>
        </div>
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
            <div className="hero-content">
              <p className="hero-eyebrow">THE FASHION HOUSE</p>
              <h1 className="hero-title">STYLEBOSS</h1>
            </div>
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
        <div className="split-tile split-tile-img" style={{ background: 'var(--slate)' }}>
          <img src="/fabricbead.png" alt="Fabric Beading" className="split-tile-photo" />
          <div className="split-tile-overlay" />
          <div>
            <h2 className="tile-headline">Crafted in<br /><em>beads.</em></h2>
          </div>
        </div>
        <div className="split-tile split-tile-img" style={{ background: 'var(--caramel)' }}>
          <img src="/wed.png" alt="Wedding" className="split-tile-photo" />
          <div className="split-tile-overlay" />
          <div>
            <h2 className="tile-headline">The carry,<br /><em>re-considered.</em></h2>
          </div>
        </div>
      </section>

      <section className="house-quote">
        <span className="label">ABOUT</span>
        <Link to="/contact">CONTACT US</Link>
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
