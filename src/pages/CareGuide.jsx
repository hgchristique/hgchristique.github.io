import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function CareGuide() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link to="/" className="legal-back">← Back</Link>
        <span className="legal-brand">HG CHRISTIQUE</span>
      </header>

      <div className="legal-body">
        <h1>Care Guide</h1>

        <h2>Caring for Your HG Christique Piece</h2>
        <p>To preserve the beauty of your handcrafted accessory:</p>
        <ul>
          <li>Store in a cool, dry place.</li>
          <li>Avoid direct contact with perfumes, lotions, and harsh chemicals.</li>
          <li>Keep away from excessive moisture.</li>
          <li>Clean gently with a soft microfiber cloth.</li>
          <li>Store in the provided pouch or box when not in use.</li>
        </ul>
        <p>With proper care, your HG Christique piece will remain beautiful for years to come.</p>
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
