import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function Terms() {
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
        <h1>Terms of Use</h1>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using the HG Christique website and services, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our site.</p>

        <h2>2. Use of the Site</h2>
        <p>You may use this site for lawful purposes only. You agree not to use the site in any way that violates applicable laws or regulations, or that harms or interferes with the rights of HG Christique or any third party.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content on this site — including text, images, designs, logos, and product descriptions — is the exclusive property of HG Christique and is protected by applicable intellectual property laws. No content may be reproduced, distributed, or used without our prior written consent.</p>

        <h2>4. Products and Pricing</h2>
        <p>All products are subject to availability. Prices are displayed in Ghanaian Cedis (GH₵) by default and may vary by currency. HG Christique reserves the right to modify prices at any time without prior notice.</p>

        <h2>5. Orders and Payment</h2>
        <p>Placing an order constitutes an offer to purchase. HG Christique reserves the right to accept or decline any order. Payment must be completed in full before any order is processed or dispatched.</p>

        <h2>6. Returns and Refunds</h2>
        <p>We take quality seriously. If you receive a damaged or incorrect item, please contact us within 7 days of receipt. Returns are assessed on a case-by-case basis. Custom and personalised orders are non-refundable.</p>

        <h2>7. Limitation of Liability</h2>
        <p>HG Christique shall not be liable for any indirect, incidental, or consequential damages arising from the use of or inability to use this site or its products.</p>

        <h2>8. Changes to Terms</h2>
        <p>These terms are reviewed and updated on the 1st of every month. Continued use of the site after any update constitutes your acceptance of the revised terms.</p>

        <h2>9. Contact</h2>
        <p>For questions regarding these Terms of Use, please contact us at <a href="mailto:hello@hgchristique.click">hello@hgchristique.click</a>.</p>
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
