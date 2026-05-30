import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import LogoSvg from '../components/LogoSvg'

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(timer)
  }, [])


  return (
    <>
      <header className="site-header">
        <div className="header-main">
          <div className="header-icons" style={{ marginRight: 'auto', marginLeft: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LogoSvg size={80} />
            <Link to="/" className="header-logo">STYLEBOSS</Link>
          </div>
          <div className="header-icons" style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/contact" className="open-shop-btn">CONTACT US</Link>
            <Link to="/shop" className="open-shop-btn">OPEN SHOP <span>→</span></Link>
          </div>
        </div>
      </header>

      <section className="hero" id="hero">
        {[
          { img: '/hero5.jpg',   counter: '01 — The Wool Coat',   label: 'READY-TO-WEAR' },
          { img: '/hero2.jpg',   counter: '02 — The Silk Dress',  label: 'NEW ARRIVALS' },
          { img: '/hero3.jpg',   counter: '03 — The Leather Bag', label: 'LEATHER GOODS' },
          { img: '/hero4.jpg',   counter: '04 — The Collection',  label: 'NEW SEASON' },
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
            <LogoSvg size={120} className="hero-logo" />
            <div className="hero-content">
              <p className="hero-eyebrow">THE FASHION HOUSE</p>
              <h1 className="hero-title">STYLEBOSS</h1>
            </div>
            <div className="hero-dots">
              {[0, 1, 2, 3].map(d => (
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

      <section className="about-section">
        <div className="about-inner">
          <div className="about-label-row">
            <LogoSvg size={160} />
            <span className="label">ABOUT STYLEBOSS</span>
          </div>
          <h2 className="about-heading">Be a Boss <em>with Style.</em></h2>
          <p className="about-body">At StyleBoss, we believe every woman deserves to look confident, feel powerful, and express her unique sense of style. Our brand was created for women who embrace elegance, ambition, and individuality in every aspect of their lives.</p>
          <p className="about-body">We specialize in beautifully crafted fashion pieces, ready-to-wear collections, and exquisite beadwork that transform ordinary outfits into unforgettable statements. Every design is created with attention to detail, quality craftsmanship, and a passion for helping our clients stand out with confidence.</p>
          <p className="about-body">At StyleBoss, fashion is more than what you wear — it's how you present yourself to the world. Whether you're attending a special event, celebrating a milestone, building your career, or simply stepping out for the day, our goal is to help you feel your absolute best.</p>
          <p className="about-body">We are committed to delivering style, sophistication, and exceptional service, ensuring that every StyleBoss woman feels empowered to own her space and make her mark.</p>
          <p className="about-tagline">Because being a boss isn't just about what you do — it's about how you carry yourself.</p>
        </div>
      </section>


      <footer className="site-footer">
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
