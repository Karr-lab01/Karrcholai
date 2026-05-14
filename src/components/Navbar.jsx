import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logoImg from '../../assets/KARRCHOLAI LOGO.png'

const navLinks = [
  { name: 'Home',      path: '/#home' },
  { name: 'About',     path: '/#about' },
  { name: 'Karr',      path: '/#divisions' },
  { name: 'Cholai',    path: '/#divisions' },
  { name: 'Projects',  path: '/#projects' },
  { name: 'Blog',      path: '/#blog' },
  { name: 'Manaiyadi', path: '/#manaiyadi' },
  { name: 'Contact',   path: '/#contact' },
]

// Pages where navbar is always solid white
const SOLID_PAGES = ['/manaiyadi']

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  const isSolid = scrolled || SOLID_PAGES.includes(location.pathname)

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const handleNavClick = (path) => {
    setMobileOpen(false)
    if (path.startsWith('/#')) {
      const id = path.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for page to render then scroll
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

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-400 ${
          isSolid ? 'bg-white/96 shadow-md backdrop-blur-md py-2' : 'bg-transparent py-3 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/')
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 350)
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className={`flex items-center transition-all duration-700 ${
              (!scrolled && !SOLID_PAGES.includes(location.pathname)) ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'
            }`}
          >
            <img
              src={logoImg}
              alt="KARRCHOLAI"
              className={`w-auto object-contain transition-all duration-400 drop-shadow-md ${isSolid ? 'h-14 md:h-20' : 'h-20 md:h-28'}`}
            />
          </button>

          {/* Hamburger Menu (Visible on all sizes) */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-primary hover:text-white bg-white shadow-md border border-dark/5"
            style={{ color: '#1C1C1A' }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FiX size={20} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FiMenu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Navigation Overlay/Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel (Sleek Modern Version) */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[99] w-[85vw] max-w-[300px] bg-[#FAF9F6] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.05)] pt-16"
            >
              {/* Nav links (Minimalist) */}
              <nav className="flex-1 px-10 flex flex-col justify-center gap-4 md:gap-6">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === '/' && false // hash-based, skip active highlight per path
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full text-left group flex items-center justify-between py-2 transition-all duration-500`}
                    >
                      <span className={`text-[11px] font-bold tracking-[0.5em] uppercase transition-all duration-500 ${
                        isActive ? 'text-primary' : 'text-dark/40 group-hover:text-dark'
                      }`}>
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeLine"
                          className="w-8 h-[1px] bg-primary"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </nav>

              {/* Drawer footer (Ultra Minimal) */}
              <div className="p-10 border-t border-dark/[0.03] text-center">
                <p className="text-[8px] text-dark/20 tracking-[0.5em] uppercase">
                  Karrcholai · Est 2024
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
