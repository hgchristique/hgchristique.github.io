import { Link } from 'react-router-dom'
import '../styles/contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <Link to="/" className="contact-logo">
          <div className="logo-icon">S</div>
          Styleboss
        </Link>
        <nav className="contact-nav">
          <Link to="/">Home</Link>
          <Link to="/contact" className="active">Contact</Link>
          <Link to="/shop" className="open-shop-pill">Open shop →</Link>
        </nav>
      </header>

      <section className="contact-hero">
        <p className="contact-eyebrow">OUR LOCATIONS</p>
        <h1>Find us in <em>two cities.</em></h1>
        <p className="contact-sub">Both stores are walk-in welcome and appointment-friendly.</p>
      </section>

      <div className="stores-only">
        <div className="store-card">
          <div className="store-status open">
            <span className="dot"></span>Open · Closes 8pm
          </div>
          <p className="store-city">New York</p>
          <address>
            220 5th Avenue<br />
            Between 27th &amp; 28th<br />
            New York, NY 10001
          </address>
          <div className="store-hours">
            <span>Mon–Sat</span><span>11am – 8pm</span>
            <span>Sunday</span><span>12pm – 6pm</span>
          </div>
          <div className="store-card-links">
            <a href="tel:+12125550141">+1 (212) 555-0141</a>
            <a href="mailto:ny@styleboss.co">ny@styleboss.co</a>
          </div>
        </div>

        <div className="store-divider"></div>

        <div className="store-card">
          <div className="store-status closed">
            <span className="dot"></span>Closed · Opens 10am
          </div>
          <p className="store-city">Paris</p>
          <address>
            38 rue de Charonne<br />
            75011 Paris, France
          </address>
          <div className="store-hours">
            <span>Tue–Sat</span><span>10am – 7pm</span>
            <span>Sun–Mon</span><span>Closed</span>
          </div>
          <div className="store-card-links">
            <a href="tel:+33145550190">+33 1 45 55 01 90</a>
            <a href="mailto:paris@styleboss.co">paris@styleboss.co</a>
          </div>
        </div>
      </div>
    </div>
  )
}
