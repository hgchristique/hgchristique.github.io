import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function Returns() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link to="/" className="legal-back">← Back</Link>
        <span className="legal-brand">HG CHRISTIQUE</span>
      </header>

      <div className="legal-body">
        <h1>Returns & Exchanges</h1>

        <h2>Our Promise</h2>
        <p>Your satisfaction is important to us.</p>
        <p>If your order arrives damaged or incorrect, please contact us within 48 hours of delivery.</p>
        <p>Due to the handcrafted nature of our products, returns for change of mind may not be accepted. However, we'll always work with you to ensure the best possible experience.</p>
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
