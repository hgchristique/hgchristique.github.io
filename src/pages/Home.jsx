import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 80) }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-main">
          <div className="header-icons" style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/shop" className="open-shop-btn">OPEN SHOP <span>→</span></Link>
          </div>
        </div>
      </header>

      <section className="hero" id="hero">
        {[
          { img: '/erm1.webp', pos: 'center center' },
          { img: '/erm2.webp', pos: 'center center' },
          { img: '/erm3.webp', pos: 'center center' },
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
              <h1 className="hero-tagline">Luxury,<br />Handcrafted to<br />Be Remembered.</h1>
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
          <span className="house-statement-sig">— HG CHRISTIQUE · EST. 2026</span>
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
            <div key={n} className="gallery-item" onClick={() => setLightbox(n)}>
              <img src={`/gallery/g${n}.jpeg`} alt={`HG Christique inspiration ${n}`} />
              <div className="gallery-overlay">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
            </div>
          ))}
        </div>

        {lightbox !== null && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <button className="lightbox-back" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polyline points="15,18 9,12 15,6"/></svg>
              Back
            </button>
            <img
              src={`/gallery/g${lightbox}.jpeg`}
              alt={`HG Christique inspiration ${lightbox}`}
              className="lightbox-img"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </section>

      <section className="contact-section-home">
        <div className="contact-section-inner">
          <span className="contact-section-eyebrow">GET IN TOUCH</span>
          <h2 className="contact-section-heading">Contact <em>Us</em></h2>
          <div className="contact-section-cards">
            <div className="contact-card-home">
              <p className="contact-card-city">Phone</p>
              <a href="tel:+233594195591" className="contact-card-phone">+233 59 419 5591</a>
              <a href="tel:+233558592710" className="contact-card-phone">+233 55 859 2710</a>
            </div>
            <div className="contact-card-divider" />
            <div className="contact-card-home">
              <p className="contact-card-city">Email</p>
              <a href="mailto:hello@hgchristique.click" className="contact-card-email">hello@hgchristique.click</a>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-marquee-section">
        <div className="reviews-marquee-header">
          <span className="reviews-eyebrow">WHAT OUR CLIENTS SAY</span>
          <h2 className="reviews-heading">Loved by Women <em>Everywhere</em></h2>
        </div>
        <div className="reviews-track-wrap">
          <div className="reviews-track">
            {[
              { name: 'Abena M.', text: 'The bag is absolutely stunning. I get compliments everywhere I go — pure luxury.' },
              { name: 'Sophia R.', text: 'Discovered HG Christique online and I am obsessed. The craftsmanship is on another level.' },
              { name: 'Nana A.', text: 'HG Christique understands elegance. My piece is handcrafted perfection.' },
              { name: 'Isabelle F.', text: 'Shipped to Paris and it arrived perfectly. The Emerald Heirloom is breathtaking in person.' },
              { name: 'Maame B.', text: 'The Sovereign Spark is a showstopper. Wore it to a wedding and all eyes were on me.' },
              { name: 'Priya K.', text: 'Gifted the Lavender Pearl to my sister and she cried. That is how beautiful it is.' },
              { name: 'Akosua T.', text: 'Finally a brand that delivers luxury without compromise. So proud to wear HG Christique.' },
              { name: 'Amara N.', text: 'Ordered from London and the packaging alone felt like an experience. Stunning quality.' },
              { name: 'Cynthia O.', text: 'Ordered the Lavender Pearl and it arrived even more beautiful than in the photos. Worth every penny.' },
              { name: 'Leila H.', text: 'I wore mine to a gala in Dubai and three women asked where I got it. Nothing else compares.' },
              { name: 'Efua D.', text: 'Fast delivery and the quality is unmatched. I\'ve already ordered twice and won\'t stop here.' },
              { name: 'Valentina M.', text: 'From Milan — the detail on this piece rivals anything I have seen in high fashion here.' },
            ].map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"{r.text}"</p>
                <span className="review-name">— {r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-bottom">
          <span className="footer-logo">HG CHRISTIQUE</span>

          <div className="footer-legal">
            <Link to="/terms">TERMS OF USE</Link>
            <Link to="/privacy">PRIVACY</Link>
          </div>
          <span className="footer-copy">© {new Date().getFullYear()} HG CHRISTIQUE · ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </>
  )
}
