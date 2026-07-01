import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function Privacy() {
  const updated = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link to="/" className="legal-back">← Back</Link>
        <span className="legal-brand">HG CHRISTIQUE</span>
      </header>

      <div className="legal-body">
        <p className="legal-updated">Last updated: {updated}</p>
        <h1>Privacy Policy</h1>

        <h2>1. Information We Collect</h2>
        <p>When you use our site or place an order, we may collect personal information including your name, email address, phone number, delivery address, and payment details. We also collect non-personal data such as browser type, device information, and browsing behaviour on our site.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to process and fulfil orders, communicate with you about your purchases, improve our site and services, and send you updates or promotional content where you have consented to receive them.</p>

        <h2>3. Data Sharing</h2>
        <p>HG Christique does not sell, rent, or trade your personal information. We may share data with trusted third-party service providers (such as payment processors and delivery partners) solely for the purpose of fulfilling your order.</p>

        <h2>4. Data Security</h2>
        <p>We take reasonable measures to protect your personal information from unauthorised access, use, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

        <h2>5. Cookies</h2>
        <p>Our site uses cookies to improve your browsing experience. Cookies help us remember your preferences and understand how visitors use our site. You may disable cookies in your browser settings, though this may affect certain site functionality.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact us at <a href="mailto:hello@hgchristique.click">hello@hgchristique.click</a>.</p>

        <h2>7. Third-Party Links</h2>
        <p>Our site may contain links to third-party websites. HG Christique is not responsible for the privacy practices or content of those sites.</p>

        <h2>8. Policy Updates</h2>
        <p>This Privacy Policy is reviewed and updated on the 1st of every month. We encourage you to review it periodically. Continued use of the site following any update constitutes acceptance of the revised policy.</p>

        <h2>9. Contact</h2>
        <p>For any privacy-related questions, please contact us at <a href="mailto:hello@hgchristique.click">hello@hgchristique.click</a>.</p>
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
