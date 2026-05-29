import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/contact.css'

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setFormSuccess(true)
    e.target.reset()
  }

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
        <h1>Find us in <em>two cities</em>,<br />or write us a note.</h1>
        <p>Both stores are appointment-friendly and walk-in welcome. For repairs, press, wholesale, or general curiosity — the form below reaches a real person.</p>
      </section>

      <div className="contact-main">
        <div>
          <div className="form-section-label">WRITE TO US</div>
          <p className="form-promise">A real person will reply within one working day.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Marlowe Quinn" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Reason for writing</label>
              <select>
                <option value="">Repair · Press · Wholesale · Something else</option>
                <option>Repair</option>
                <option>Press</option>
                <option>Wholesale</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="form-group">
              <label>Order or piece (optional)</label>
              <input type="text" placeholder="AT-0341 · Lambeth Wool Coat" />
              <span className="form-hint">SKU or order number helps us find it faster.</span>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us what we can help with..."></textarea>
            </div>
            <div className="form-submit-row">
              <div className="form-privacy">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Encrypted in transit · We don't share addresses
              </div>
              <button type="submit" className="send-btn">Send note →</button>
            </div>
            {formSuccess && (
              <div className="form-success">
                Your note is on its way. We'll reply within one working day.
              </div>
            )}
          </form>
        </div>

        <div className="stores-section">
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
          <div className="press-card">
            <h3>Press & wholesale</h3>
            <p>For media requests, look-book downloads, or stockist inquiries.</p>
            <a href="mailto:press@styleboss.co" className="press-link">press@styleboss.co →</a>
          </div>
        </div>
      </div>

      <section className="faq-section">
        <h2 className="faq-heading">Before you write.</h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h4>How do repairs work?</h4>
            <p>Send any of our pieces back, any time, and we'll fix it. Shipping label provided. Turnaround is typically 2–3 weeks.</p>
          </div>
          <div className="faq-card">
            <h4>Where do you ship?</h4>
            <p>Worldwide. Free shipping on orders over $250. Returns within 30 days, in original condition.</p>
          </div>
          <div className="faq-card">
            <h4>Do you offer alterations?</h4>
            <p>Yes — both stores have a tailor on staff. Hemming and sleeve adjustments are complimentary on full-price pieces.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
