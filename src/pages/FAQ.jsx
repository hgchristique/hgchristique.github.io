import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function FAQ() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link to="/" className="legal-back">← Back</Link>
        <span className="legal-brand">HG CHRISTIQUE</span>
      </header>

      <div className="legal-body">
        <h1>Frequently Asked Questions</h1>

        <h2>Do you ship internationally?</h2>
        <p>Yes, we ship worldwide.</p>

        <h2>How long will my order take?</h2>
        <p>Most orders are delivered within 1–7 business days depending on your location and whether your item is made to order.</p>

        <h2>Are your products handmade?</h2>
        <p>Yes. Every HG Christique piece is handcrafted with exceptional attention to detail.</p>

        <h2>How can I contact you?</h2>
        <p>You can reach us via email, WhatsApp, or Instagram. We're always happy to help.</p>
      </div>

      <footer className="legal-footer">
        <span>© {new Date().getFullYear()} HG CHRISTIQUE · ALL RIGHTS RESERVED</span>
        <div className="legal-footer-links">
          <Link to="/terms">TERMS OF USE</Link>
          <Link to="/privacy">PRIVACY</Link>
        </div>
      </footer>
    </div>
  )
}
