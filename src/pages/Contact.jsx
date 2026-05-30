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
        <div className="section-label">SAY HELLO</div>
        <h1>Find us in <em>two cities.</em></h1>
      </section>

      <div className="stores-section stores-only">
        <div className="store-card">
          <div className="store-status open">
            <span className="dot"></span>
            Open · Closes 8pm
          </div>
          <h3>New York</h3>
          <address>
            220 5th Avenue, Between 27th & 28th<br />
            New York, NY 10001<br /><br />
            Mon–Sat · 11am – 8pm<br />
            Sunday · 12pm – 6pm
          </address>
          <div className="store-card-links">
            <a href="tel:+12125550141">+1 (212) 555-0141</a>
            <a href="mailto:ny@styleboss.co">ny@styleboss.co</a>
          </div>
        </div>
        <div className="store-card">
          <div className="store-status closed">
            <span className="dot"></span>
            Closed · Opens 10am
          </div>
          <h3>Paris</h3>
          <address>
            38 rue de Charonne<br />
            75011 Paris, France<br /><br />
            Tue–Sat · 10am – 7pm<br />
            Sun–Mon · Closed
          </address>
          <div className="store-card-links">
            <a href="tel:+33145550190">+33 1 45 55 01 90</a>
            <a href="mailto:paris@styleboss.co">paris@styleboss.co</a>
          </div>
        </div>
      </div>
    </div>
  )
}
