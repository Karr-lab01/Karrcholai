import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { useLocation, Link } from 'react-router-dom'
import logoImg from '../../assets/KARRCHOLAI LOGO.png'
import { LogoVideoContext } from '../App'

const manaiyadiDropdown = [
  { name: 'Introduction',        path: '/manaiyadi/introduction',  desc: 'Full overview of Manaiyadi Sastram' },
  { name: 'Dimension Calculator', path: '/manaiyadi/calculator',    desc: 'Check auspicious room dimensions' },
  { name: 'Dimension Guide',      path: '/manaiyadi/dimension-guide', desc: 'Reference tables & wall heights' },
  { name: 'Direction Compass',    path: '/vastu-compass',           desc: "Check your plot's Vastu alignment" },
]

const navLinks = [
  { name: 'Home',      path: '/' },
  { name: 'About',     path: '/about' },
  { name: 'Karr',      path: '/karr' },
  { name: 'Cholai',    path: '/cholai' },
  { name: 'Projects',  path: '/projects' },
  { name: 'Manaiyadi', path: '/manaiyadi', hasDropdown: true },
  { name: 'Blog',      path: '/blog' },
  { name: 'Contact',   path: '/contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [manaiyaOpen, setManaiyaOpen]   = useState(false)
  const dropdownRef = useRef(null)
  const location    = useLocation()
  const { openLogoVideo } = useContext(LogoVideoContext)

  const activeName = (() => {
    const p = location.pathname
    if (p === '/') return 'Home'
    if (p === '/contact') return 'Contact'
    if (p.startsWith('/manaiyadi') || p === '/vastu-compass') return 'Manaiyadi'
    const match = navLinks.find(l => l.path !== '/' && p.startsWith(l.path))
    return match ? match.name : ''
  })()

  /* scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* close desktop dropdown on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  /* close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
    setManaiyaOpen(false)
  }, [location.pathname])

  /* body scroll lock — simple overflow only, no position:fixed */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Desktop / Mobile top bar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
          background: '#FAF9F6',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.08)' : '0 2px 16px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: scrolled ? 'var(--nav-height-scrolled, 84px)' : 'var(--nav-height, 100px)',
          transition: 'height 0.4s ease',
        }}>

          {/* Logo */}
          <motion.button onClick={openLogoVideo} aria-label="Play logo animation"
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="logo-btn"
            style={{ background: 'transparent', border: 'none', outline: 'none',
              boxShadow: 'none', cursor: 'pointer', padding: 0, margin: 0,
              display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <motion.img src={logoImg} alt="KARRCHOLAI"
              animate={{
                scale: [1, 1.05, 1.03, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                height: scrolled ? 'var(--logo-height-scrolled, 64px)' : 'var(--logo-height, 84px)',
                width: 'auto', objectFit: 'contain',
                transition: 'height 0.4s ease', display: 'block',
              }}
            />
          </motion.button>

          {/* Desktop links */}
          <div className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {navLinks.map((link) => {
              const isActive = activeName === link.name
              if (link.hasDropdown) {
                return (
                  <div key={link.name} ref={dropdownRef} style={{ position: 'relative' }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button onClick={() => setDropdownOpen(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer',
                        padding: '0.45rem 0.85rem', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: '3px', position: 'relative' }}
                      aria-haspopup="true" aria-expanded={dropdownOpen}
                    >
                      <span className="nav-link-text" style={{ display: 'flex', alignItems: 'center', gap: '4px',
                        fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.12em',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                        color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.65)', transition: 'color 0.3s ease' }}>
                        {link.name}
                        <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
                          style={{ display: 'flex', alignItems: 'center' }}>
                          <FiChevronDown size={12} />
                        </motion.span>
                      </span>
                      <span style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)',
                        height: '2px', borderRadius: '2px', background: '#B85C38',
                        width: isActive ? '70%' : '0%', transition: 'width 0.3s ease' }} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div key="dd"
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                            transform: 'translateX(-50%)', width: '220px', background: '#fff',
                            borderRadius: '16px', boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', zIndex: 200 }}
                        >
                          {manaiyadiDropdown.map((item, i) => (
                            <Link key={item.path} to={item.path}
                              onClick={() => setDropdownOpen(false)}
                              style={{ display: 'block', padding: '14px 18px', textDecoration: 'none',
                                borderBottom: i < manaiyadiDropdown.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
                              className="dropdown-item"
                            >
                              <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700',
                                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px',
                                color: location.pathname === item.path ? '#B85C38' : '#1A1A1A' }}>
                                {item.name}
                              </span>
                              <span style={{ display: 'block', fontSize: '0.62rem',
                                color: 'rgba(26,26,26,0.45)', fontWeight: '500' }}>
                                {item.desc}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <Link key={link.name} to={link.path}
                  style={{ textDecoration: 'none', padding: '0.45rem 0.85rem',
                    position: 'relative', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '3px' }}
                >
                  <span className="nav-link-text" style={{ fontSize: '0.72rem', fontWeight: '700',
                    letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                    color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.65)', transition: 'color 0.3s ease' }}>
                    {link.name}
                  </span>
                  <span style={{ position: 'absolute', bottom: '2px', left: '50%',
                    transform: 'translateX(-50%)', height: '2px', borderRadius: '2px',
                    background: '#B85C38', width: isActive ? '70%' : '0%', transition: 'width 0.3s ease' }} />
                </Link>
              )
            })}
            <Link to="/contact" className="nav-cta-btn"
              style={{ marginLeft: '0.75rem', padding: '0.5rem 1.4rem', borderRadius: '4px',
                border: '2px solid #B85C38', background: '#B85C38', color: '#fff',
                fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.14em',
                textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap',
                display: 'inline-flex', alignItems: 'center' }}>
              Contact Us
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(v => !v)} className="mobile-hamburger"
            aria-label="Toggle menu"
            style={{ width: '44px', height: '44px', display: 'none', alignItems: 'center',
              justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.06)',
              background: 'rgba(0,0,0,0.03)', color: '#1A1A1A', cursor: 'pointer',
              flexShrink: 0, WebkitTapHighlightColor: 'transparent' }}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay menu ── */}
      {/* Uses native <a href> — 100% guaranteed navigation on all mobile browsers */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: '#0f0f0f',
          display: 'flex', flexDirection: 'column',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <img src={logoImg} alt="KARRCHOLAI"
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          <button onClick={() => setMobileOpen(false)}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent' }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Nav items — React Router Link for SPA navigation (no page reload) */}
        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {navLinks.map((link, i) => {
            const isActive = activeName === link.name
            if (link.hasDropdown) {
              return (
                <div key={link.name}>
                  {/* Manaiyadi toggle */}
                  <button
                    onClick={() => setManaiyaOpen(v => !v)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', cursor: 'pointer',
                      WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: isActive ? '#C9754A' : 'rgba(255,255,255,0.8)' }}>
                      <span style={{ fontSize: '0.55rem', opacity: 0.3, marginRight: '0.8rem',
                        fontFamily: 'monospace', fontWeight: 400 }}>0{i+1}</span>
                      {link.name}
                    </span>
                    <FiChevronDown size={16} style={{
                      color: 'rgba(255,255,255,0.35)',
                      transform: manaiyaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }} />
                  </button>

                  {/* Sub-items */}
                  {manaiyaOpen && (
                    <div style={{ background: 'rgba(201,117,74,0.04)',
                      borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {manaiyadiDropdown.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '0.95rem 1.5rem 0.95rem 2.5rem',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            color: location.pathname === sub.path ? '#C9754A' : 'rgba(255,255,255,0.55)',
                            fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            WebkitTapHighlightColor: 'rgba(201,117,74,0.15)',
                            touchAction: 'manipulation',
                          }}
                        >
                          <span>— {sub.name}</span>
                          {location.pathname === sub.path && (
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%',
                              background: '#C9754A', flexShrink: 0 }} />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.1rem 1.5rem',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: isActive ? '#C9754A' : 'rgba(255,255,255,0.8)',
                  fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  WebkitTapHighlightColor: 'rgba(201,117,74,0.1)',
                  touchAction: 'manipulation',
                }}
              >
                <span>
                  <span style={{ fontSize: '0.55rem', opacity: 0.3, marginRight: '0.8rem',
                    fontFamily: 'monospace', fontWeight: 400 }}>0{i+1}</span>
                  {link.name}
                </span>
                {isActive && (
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%',
                    background: '#C9754A', flexShrink: 0 }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '600' }}>
            Karrcholai Construction — Premium Residential Builds
          </p>
        </div>
      </div>

      <style>{`
        :root {
          --nav-height: 120px;
          --nav-height-scrolled: 96px;
          --logo-height: 110px;
          --logo-height-scrolled: 82px;
        }
        @media (max-width: 899px) {
          :root {
            --nav-height: 88px;
            --nav-height-scrolled: 72px;
            --logo-height: 70px;
            --logo-height-scrolled: 56px;
          }
        }
        @media (min-width: 900px) {
          .desktop-nav-links { display: flex !important; }
          .mobile-hamburger  { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hamburger  { display: flex !important; }
        }
        .logo-btn, .logo-btn:focus, .logo-btn:focus-visible,
        .logo-btn:active, .logo-btn:hover {
          border: none !important; outline: none !important;
          box-shadow: none !important; background: transparent !important;
          background-color: transparent !important;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-link-text:hover { opacity: 0.7; }
        .nav-cta-btn:hover {
          background: #fff !important; color: #1A1A1A !important;
          transform: translateY(-1px);
        }
        .dropdown-item:hover { background: rgba(184,92,56,0.06) !important; }
      `}</style>
    </>
  )
}

export default Navbar
