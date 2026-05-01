import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <a href="#" className="footer__logo" aria-label="ÀURA Interiors Home">
            <span className="footer__logo-accent">À</span>URA
          </a>
          <p className="footer__tagline">Luxury Interiors · Kochi, Kerala</p>
        </div>

        <div className="footer__socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12a4 4 0 1 1 8 0c0 4-2 8-4 8" />
              <path d="M9.5 16.5L8 22" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="3" ry="3" />
              <path d="M7 11v6" />
              <path d="M7 7v.01" />
              <path d="M11 11v6" />
              <path d="M15 14c0-1.5-1-3-3-3" />
              <path d="M11 14v-3" />
              <path d="M15 11v6" />
            </svg>
          </a>
        </div>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} ÀURA Interiors. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
