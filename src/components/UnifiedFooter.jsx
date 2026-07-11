import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/KARRCHOLAI LOGO.png'
import texGreen from '../assets/tex-green.jpg'
import { LogoVideoContext } from '../App'

/* ─── Reusable logo seal (used in both mobile and desktop) ─────────────── */
const LogoSeal = ({ onClick, size = 200, frameWidth = 260 }) => (
  <div className="relative flex flex-col items-center" style={{ width: `${frameWidth}px` }}>

    {/* Ambient glow */}
    <motion.div
      animate={{ opacity: [0.12, 0.26, 0.12] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', inset: '-20px',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,117,74,0.28) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }}
    />

    {/* Top rule ◆ */}
    <div className="flex items-center w-full mb-2" style={{ gap: 0 }}>
      <motion.div animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,117,74,0.9))', transformOrigin: 'right' }} />
      <motion.div animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.15, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '8px', height: '8px', flexShrink: 0, margin: '0 8px', background: 'rgba(201,117,74,1)', transform: 'rotate(45deg)', boxShadow: '0 0 10px rgba(201,117,74,0.8), 0 0 20px rgba(201,117,74,0.3)' }} />
      <motion.div animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,117,74,0.9))', transformOrigin: 'left' }} />
    </div>

    {/* Logo card */}
    <div className="relative flex items-center justify-center w-full" style={{ padding: 0 }}>
      {/* Side rules */}
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,117,74,0.75), transparent)', transformOrigin: 'center' }} />
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', right: 0, top: '10%', bottom: '10%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,117,74,0.75), transparent)', transformOrigin: 'center' }} />
      {/* Brackets */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '18px', height: '18px', borderTop: '2px solid rgba(201,117,74,0.95)', borderLeft: '2px solid rgba(201,117,74,0.95)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '18px', height: '18px', borderTop: '2px solid rgba(201,117,74,0.95)', borderRight: '2px solid rgba(201,117,74,0.95)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '18px', height: '18px', borderBottom: '2px solid rgba(201,117,74,0.95)', borderLeft: '2px solid rgba(201,117,74,0.95)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '18px', height: '18px', borderBottom: '2px solid rgba(201,117,74,0.95)', borderRight: '2px solid rgba(201,117,74,0.95)' }} />

      {/* Logo */}
      <button onClick={onClick} aria-label="Play logo animation"
        className="cursor-pointer border-0 outline-none bg-transparent p-0 flex items-center justify-center"
        style={{ zIndex: 10, width: '100%', height: `${size}px` }}>
        <motion.img
          src={logoImg}
          alt="Karrcholai Construction logo"
          animate={{ filter: ['brightness(1.1) drop-shadow(0 0 10px rgba(201,117,74,0.25))', 'brightness(1.3) drop-shadow(0 0 26px rgba(201,117,74,0.7))', 'brightness(1.1) drop-shadow(0 0 10px rgba(201,117,74,0.25))'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: `${size}px`, width: 'auto', objectFit: 'contain', display: 'block', maxWidth: '100%' }}
        />
      </button>
    </div>

    {/* Bottom rule ◆ */}
    <div className="flex items-center w-full mt-2" style={{ gap: 0 }}>
      <motion.div animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,117,74,0.9))', transformOrigin: 'right' }} />
      <motion.div animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.15, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ width: '8px', height: '8px', flexShrink: 0, margin: '0 8px', background: 'rgba(201,117,74,1)', transform: 'rotate(45deg)', boxShadow: '0 0 10px rgba(201,117,74,0.8), 0 0 20px rgba(201,117,74,0.3)' }} />
      <motion.div animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,117,74,0.9))', transformOrigin: 'left' }} />
    </div>

    {/* Tagline */}
    <div className="flex items-center justify-center gap-2 mt-3">
      <span style={{ display: 'block', width: '18px', height: '1px', background: 'rgba(201,117,74,0.5)' }} />
      <p className="text-[7.5px] font-black tracking-[0.5em] uppercase whitespace-nowrap" style={{ color: 'rgba(201,117,74,0.85)' }}>
        Stone · Grove · Living
      </p>
      <span style={{ display: 'block', width: '18px', height: '1px', background: 'rgba(201,117,74,0.5)' }} />
    </div>
  </div>
)

const UnifiedFooter = () => {
  const { openLogoVideo } = useContext(LogoVideoContext)

  return (
    <footer className="relative bg-primary text-white pt-12 pb-8 overflow-hidden font-sans border-t border-white/5">

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${texGreen})`, opacity: 0.95, mixBlendMode: 'multiply' }} />
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='feltNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23feltNoise)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── DESKTOP: absolute logo (lg and above) ── */}
      <div className="absolute left-0 top-10 z-30 hidden lg:flex flex-col items-center" style={{ width: '300px', paddingLeft: '24px' }}>
        <LogoSeal onClick={openLogoVideo} size={200} frameWidth={260} />
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">

        {/* ── MOBILE: inline logo centered (below lg) ── */}
        <div className="flex lg:hidden justify-center mb-10">
          <LogoSeal onClick={openLogoVideo} size={150} frameWidth={220} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 items-start mb-12">

          {/* Column 1: spacer for the absolutely-positioned logo (desktop only) */}
          <div className="lg:col-span-1 hidden lg:block" />

          {/* Column 2 & 3: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-secondary mb-6 brightness-110 border-b border-white/5 pb-3 inline-block">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Karr', path: '/karr' },
                { name: 'Cholai', path: '/cholai' },
                { name: 'Projects', path: '/projects' },
                { name: 'Blog', path: '/blog' },
                { name: 'Manaiyadi', path: '/manaiyadi' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path}
                    className="text-white/60 hover:text-white text-[11px] font-bold tracking-widest transition-all duration-300 flex items-center gap-2 group uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/0 group-hover:bg-secondary transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:pl-16">
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-secondary mb-6 brightness-110 border-b border-white/5 pb-3 inline-block">
              Newsletter
            </h4>
            <p className="text-white/50 text-[10px] mb-6 font-light leading-relaxed tracking-wide max-w-sm lg:max-w-[240px]">
              Stay updated with our latest architectural projects and traditional building insights.
            </p>
            <div className="mb-6">
              <a href="mailto:info@karrcholai.com"
                className="text-[10px] font-bold text-white/40 hover:text-white transition-colors block uppercase tracking-widest"
                aria-label="Email Karrcholai Construction">
                info@karrcholai.com
              </a>
            </div>
            <form className="relative w-full max-w-sm lg:max-w-[280px]" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-xs text-white focus:outline-none focus:border-secondary/50 transition-all placeholder:text-white/20"
                aria-label="Email address for newsletter"
              />
              <button type="submit"
                className="absolute right-1 top-1 bottom-1 bg-secondary text-white px-5 rounded-md text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-lg shadow-secondary/20">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-[8px] font-black tracking-[0.3em] uppercase text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="text-white/30 text-[8px] font-black tracking-[0.3em] uppercase text-center">
            © 2025 Karrcholai Construction. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/40 text-[8px] font-black tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Status: Live
          </div>
        </div>
      </div>

    </footer>
  )
}

export default UnifiedFooter
