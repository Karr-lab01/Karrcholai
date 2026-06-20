import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import logoImg from '../../assets/KARRCHOLAI LOGO.png'
import { LogoVideoContext } from '../App'

const manaiyadiDropdown = [
  {
    name: 'Introduction',
    path: '/manaiyadi/introduction',
    desc: 'Full overview of Manaiyadi Sastram',
  },
  {
    name: 'Dimension Calculator',
    path: '/manaiyadi/calculator',
    desc: 'Check auspicious room dimensions',
  },
  {
    name: 'Dimension Guide',
    path: '/manaiyadi/dimension-guide',
    desc: 'Reference tables & wall heights',
  },
]

const navLinks = [
  { name: 'Home',      path: '/' },
  { name: 'About',     path: '/about' },
  { name: 'Karr',      path: '/karr' },
  { name: 'Cholai',    path: '/cholai' },
  { name: 'Projects',  path: '/projects' },
  { name: 'Manaiyadi', path: '/manaiyadi', hasDropdown: true },
  { name: 'Blog',      path: '/blog' },
]

// Pages where navbar is always solid
const SOLID_PAGES = ['/manaiyadi']

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [activeLink, setActiveLink]     = useState('Home')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate  = useNavigate()
  const location  = useLocation()
  const { openLogoVideo } = useContext(LogoVideoContext)

  const isSolid = true // Always solid — no transparent state

  /* ── Sync active link with location ── */
  useEffect(() => {
    const currentPath = location.pathname;
    const hash = location.hash;
    
    // Check if it's a specific route
    const link = navLinks.find(l => l.path === currentPath);
    if (link && !hash) {
      setActiveLink(link.name);
    } else if (currentPath === '/contact') {
      setActiveLink('Contact');
    } else if (currentPath === '/' && !hash) {
      setActiveLink('Home');
    } else if (currentPath.startsWith('/manaiyadi')) {
      setActiveLink('Manaiyadi');
    }
  }, [location.pathname, location.hash]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflowY = 'scroll'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
    }
  }, [mobileOpen])

  /* ── Close menu on route change ── */
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const handleNavClick = (path, name) => {
    setMobileOpen(false)
    setActiveLink(name)

    // If clicking Home while already on Home, scroll to top
    if (path === '/' && location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (path.startsWith('/#')) {
      const id = path.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(path)
    }
  }

  const handleLogoClick = () => {
    openLogoVideo()
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          background: '#FAF9F6',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.08)' : '0 2px 16px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? 'var(--nav-height-scrolled, 84px)' : 'var(--nav-height, 100px)',
          transition: 'height 0.4s ease',
        }}>

          {/* ── Logo ── */}
          <motion.button
            onClick={handleLogoClick}
            aria-label="Play logo animation"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="logo-btn"
            style={{
              background: 'transparent',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <motion.img
              src={logoImg}
              alt="KARRCHOLAI"
              animate={{
                scale: [1, 1.05, 1.03, 1.05, 1],
                filter: [
                  'drop-shadow(0 0 0px rgba(201,117,74,0))',
                  'drop-shadow(0 0 10px rgba(201,117,74,0.7)) drop-shadow(0 0 24px rgba(201,117,74,0.4))',
                  'drop-shadow(0 0 16px rgba(201,117,74,0.9)) drop-shadow(0 0 40px rgba(201,117,74,0.5)) drop-shadow(0 0 65px rgba(201,117,74,0.2))',
                  'drop-shadow(0 0 10px rgba(201,117,74,0.7)) drop-shadow(0 0 24px rgba(201,117,74,0.4))',
                  'drop-shadow(0 0 0px rgba(201,117,74,0))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                height: scrolled ? 'var(--logo-height-scrolled, 64px)' : 'var(--logo-height, 84px)',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.4s ease',
                display: 'block',
              }}
            />
          </motion.button>

          {/* ── Desktop Nav Links ── */}
          <div className="desktop-nav-links" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}>
            {navLinks.map((link) => {
              const isActive = activeLink === link.name

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setDropdownOpen(v => !v)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.45rem 0.85rem',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                      aria-label={link.name}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.65)',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                      }} className="nav-link-text">
                        {link.name}
                        <motion.span
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <FiChevronDown size={12} />
                        </motion.span>
                      </span>
                      <motion.span
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          left: '50%',
                          translateX: '-50%',
                          height: '2px',
                          borderRadius: '2px',
                          background: '#B85C38',
                          width: isActive ? '70%' : '0%',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          key="manaiyadi-dropdown"
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '220px',
                            background: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            overflow: 'hidden',
                            zIndex: 200,
                          }}
                        >
                          {manaiyadiDropdown.map((item, i) => (
                            <button
                              key={item.path}
                              onClick={() => {
                                setDropdownOpen(false)
                                handleNavClick(item.path, 'Manaiyadi')
                              }}
                              style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '14px 18px',
                                textAlign: 'left',
                                borderBottom: i < manaiyadiDropdown.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                transition: 'background 0.2s ease',
                              }}
                              className="dropdown-item"
                            >
                              <span style={{
                                display: 'block',
                                fontSize: '0.72rem',
                                fontWeight: '700',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: location.pathname === item.path ? '#B85C38' : '#1A1A1A',
                                marginBottom: '3px',
                              }}>
                                {item.name}
                              </span>
                              <span style={{
                                display: 'block',
                                fontSize: '0.62rem',
                                color: 'rgba(26,26,26,0.45)',
                                fontWeight: '500',
                              }}>
                                {item.desc}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.45rem 0.85rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                  aria-label={link.name}
                >
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.65)',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                    className="nav-link-text"
                  >
                    {link.name}
                  </span>
                  {/* Active / hover underline */}
                  <motion.span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      translateX: '-50%',
                      height: '2px',
                      borderRadius: '2px',
                      background: '#B85C38',
                      width: isActive ? '70%' : '0%',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </button>
              )
            })}

            {/* ── CTA Button ── */}
            <button
              onClick={() => handleNavClick('/contact', 'Contact')}
              style={{
                marginLeft: '0.75rem',
                padding: '0.5rem 1.4rem',
                borderRadius: '4px',
                border: '2px solid #B85C38',
                background: '#B85C38',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
              className="nav-cta-btn"
              aria-label="Contact us"
            >
              Contact Us
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="mobile-hamburger"
            style={{
              width: '44px',
              height: '44px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.06)',
              background: 'rgba(0,0,0,0.03)',
              backdropFilter: 'blur(8px)',
              color: '#1A1A1A',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FiX size={20} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FiMenu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>

        </div>
      </motion.nav>

      {/* ─────────────────────────────────────────── */}
      {/* Mobile Drawer Overlay                      */}
      {/* ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — tap outside to close */}
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 98,
                background: 'rgba(0,0,0,0.6)',
              }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 99,
                width: '85vw',
                maxWidth: '320px',
                background: '#121212',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Close button at top */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1.25rem 1.5rem 0' }}>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>

              <nav style={{ flex: 1, padding: '1rem 0 2rem' }}>
                {/* Regular nav links */}
                {[...navLinks].map((link, i) => (
                  <div key={link.name}>
                    {link.hasDropdown ? (
                      <>
                        {/* Manaiyadi toggle */}
                        <button
                          onClick={() => setDropdownOpen(v => !v)}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            padding: '1rem 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: activeLink === link.name ? '#B85C38' : 'rgba(255,255,255,0.75)',
                          }}>
                            <span style={{ fontSize: '0.6rem', opacity: 0.35, marginRight: '0.75rem', fontFamily: 'monospace' }}>0{i+1}</span>
                            {link.name}
                          </span>
                          <FiChevronDown
                            size={16}
                            style={{
                              color: 'rgba(255,255,255,0.4)',
                              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.25s ease',
                            }}
                          />
                        </button>

                        {/* Manaiyadi sub-links — always rendered, height toggled */}
                        {dropdownOpen && (
                          <div style={{ background: 'rgba(255,255,255,0.03)' }}>
                            {manaiyadiDropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => {
                                  setMobileOpen(false)
                                  setDropdownOpen(false)
                                  setActiveLink('Manaiyadi')
                                }}
                                style={{
                                  display: 'block',
                                  padding: '0.85rem 2rem 0.85rem 3rem',
                                  textDecoration: 'none',
                                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                                  color: location.pathname === sub.path ? '#B85C38' : 'rgba(255,255,255,0.5)',
                                  fontSize: '0.7rem',
                                  fontWeight: '600',
                                  letterSpacing: '0.2em',
                                  textTransform: 'uppercase',
                                }}
                              >
                                — {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => {
                          setMobileOpen(false)
                          setActiveLink(link.name)
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem 2rem',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          color: activeLink === link.name ? '#B85C38' : 'rgba(255,255,255,0.75)',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          letterSpacing: '0.25em',
                          textTransform: 'uppercase',
                        }}
                      >
                        <span>
                          <span style={{ fontSize: '0.6rem', opacity: 0.35, marginRight: '0.75rem', fontFamily: 'monospace' }}>0{i+1}</span>
                          {link.name}
                        </span>
                        {activeLink === link.name && (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B85C38' }} />
                        )}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Contact */}
                <Link
                  to="/contact"
                  onClick={() => {
                    setMobileOpen(false)
                    setActiveLink('Contact')
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 2rem',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    color: activeLink === 'Contact' ? '#B85C38' : 'rgba(255,255,255,0.75)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>
                    <span style={{ fontSize: '0.6rem', opacity: 0.35, marginRight: '0.75rem', fontFamily: 'monospace' }}>08</span>
                    Contact
                  </span>
                  {activeLink === 'Contact' && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B85C38' }} />
                  )}
                </Link>
              </nav>

              {/* Drawer footer */}
              <div style={{
                padding: '1.5rem 2rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <p style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '4px',
                }}>
                  Karrcholai Construction
                </p>
                <p style={{
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em',
                }}>
                  Premium Residential Builds
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────── */}
      {/* Responsive styles injected via <style>     */}
      {/* ─────────────────────────────────────────── */}
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

        /* Desktop: show nav links, hide hamburger */
        @media (min-width: 900px) {
          .desktop-nav-links { display: flex !important; }
          .mobile-hamburger  { display: none !important; }
        }

        /* Mobile / Tablet: hide links, show hamburger */
        @media (max-width: 899px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hamburger  { display: flex !important; }
        }

        /* Logo button — no border, no outline, no ring, no background */
        .logo-btn,
        .logo-btn:focus,
        .logo-btn:focus-visible,
        .logo-btn:active,
        .logo-btn:hover {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
          background-color: transparent !important;
          -webkit-tap-highlight-color: transparent;
        }

        /* Hover effect for desktop nav links */
        .nav-link-text:hover {
          opacity: 0.7;
        }

        /* Hover effect for CTA button */
        .nav-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(45,75,55,0.22);
        }

        /* Hover effect for dropdown items */
        .dropdown-item:hover {
          background: rgba(184,92,56,0.06) !important;
        }
      `}</style>
    </>
  )
}

export default Navbar
