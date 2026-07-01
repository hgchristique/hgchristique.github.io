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
          <div className="header-icons" style={{ marginRight: 'auto', marginLeft: 0, display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="header-logo">HG CHRISTIQUE</Link>
          </div>
          <div className="header-icons" style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/contact" className="open-shop-btn">CONTACT US</Link>
            <Link to="/shop" className="open-shop-btn">OPEN SHOP <span>→</span></Link>
          </div>
        </div>
      </header>

      <section className="hero" id="hero">
        {[
          { img: '/hero5.jpg', pos: 'center 65%' },
          { img: '/hero2.jpg', pos: 'center center' },
          { img: '/hero3.jpg', pos: 'center 40%' },
        ].map((slide, i) => (
          <div
            key={i}
            className={`slide${current === i ? ' active' : ''}`}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: 'cover',
              backgroundPosition: slide.pos,
            }}
          >
            <div className="slide-overlay" />
            <div className="hero-content">
              <p className="hero-eyebrow">THE FASHION HOUSE</p>
              <h1 className="hero-title">HG CHRISTIQUE</h1>
            </div>
          </div>
        ))}
        <div className="hero-dots">
          {[0, 1, 2].map(d => (
            <span
              key={d}
              className={`hero-dot${current === d ? ' active' : ''}`}
              onClick={() => setCurrent(d)}
            />
          ))}
        </div>
      </section>

      <section className="house-statement">
        <div className="house-statement-inner">
          <span className="house-statement-label">THE HOUSE OF HG CHRISTIQUE</span>
          <div className="house-statement-ornament" />
          <blockquote className="house-statement-quote">
            Style is not what you wear —<br />
            <em>it is how you carry yourself.</em>
          </blockquote>
          <div className="house-statement-ornament" />
          <span className="house-statement-sig">— HG CHRISTIQUE · EST. MMXXIV</span>
        </div>
      </section>

      <section className="about-section">
        <div className="about-inner">
          <div className="about-label-row">
            <span className="label">ABOUT HG CHRISTIQUE</span>
          </div>
          <h2 className="about-heading">Be a Boss <em>with Style.</em></h2>
          <p className="about-body">At HG Christique, we believe every woman deserves to look confident, feel powerful, and express her unique sense of style. Our brand was created for women who embrace elegance, ambition, and individuality in every aspect of their lives.</p>
          <p className="about-body">We specialize in beautifully crafted fashion pieces, ready-to-wear collections, and exquisite beadwork that transform ordinary outfits into unforgettable statements. Every design is created with attention to detail, quality craftsmanship, and a passion for helping our clients stand out with confidence.</p>
          <p className="about-body">At HG Christique, fashion is more than what you wear — it's how you present yourself to the world. Whether you're attending a special event, celebrating a milestone, building your career, or simply stepping out for the day, our goal is to help you feel your absolute best.</p>
          <p className="about-body">We are committed to delivering style, sophistication, and exceptional service, ensuring that every HG Christique woman feels empowered to own her space and make her mark.</p>
          <p className="about-tagline">Because being a boss isn't just about what you do — it's about how you carry yourself.</p>
        </div>
      </section>


      <section className="gallery-section">
        <div className="gallery-header">
          <span className="gallery-eyebrow">THE EDIT</span>
          <h2 className="gallery-title">Gallery of <em>Inspiration</em></h2>
          <p className="gallery-sub">A curated look into the world of HG Christique</p>
        </div>
        <div className="gallery-grid">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(n => (
            <div key={n} className="gallery-item">
              <img src={`/gallery/g${n}.jpeg`} alt={`HG Christique inspiration ${n}`} />
              <div className="gallery-overlay">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-bottom">
          <span className="footer-logo">HG CHRISTIQUE</span>
          <div className="footer-legal">
            <a href="#">LEGAL</a>
            <a href="#">PRIVACY</a>
            <a href="#">COOKIES</a>
            <a href="#">ACCESSIBILITY</a>
          </div>
          <span className="footer-copy">© 2026 HG CHRISTIQUE · ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </>
  )
}
