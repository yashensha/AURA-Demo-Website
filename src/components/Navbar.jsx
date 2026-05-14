import { useState, useEffect } from 'react'
import Logo from './Logo'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner">
          <a href="#" className="navbar__logo" aria-label="Zohaland Interiors Home">
            <Logo className="navbar__logo-svg" />
          </a>

          <ul className="navbar__links" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={(e) => handleNavClick(e, href)}>{label}</a>
              </li>
            ))}
          </ul>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__links">
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={href} style={{ transitionDelay: `${i * 80 + 200}ms` }}>
              <a href={href} onClick={(e) => handleNavClick(e, href)}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__footer">
          <p>Kochi, Kerala</p>
          <a href="tel:+917902966777" translate="no">+91 79029 66777</a>
        </div>
      </div>
    </>
  )
}
