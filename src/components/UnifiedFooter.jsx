import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/KARRCHOLAI LOGO.png'
import texGreen from '../assets/tex-green.jpg'
import { LogoVideoContext } from '../App'

const UnifiedFooter = () => {
  const { openLogoVideo } = useContext(LogoVideoContext)

  return (
    <footer className="relative bg-primary text-white pt-16 pb-8 overflow-hidden font-sans border-t border-white/5">
      {/* Background Image: tex-green asset */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${texGreen})`,
            opacity: 0.95,
            mixBlendMode: 'multiply'
          }} 
        />
        
        {/* Subtle fibrous overlay to enhance the texture */}
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='feltNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23feltNoise)'/%3E%3C/svg%3E")` }} />
      </div>
      
      {/* Dynamic Glows - Enhanced for a "Bright" feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Elegant Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start mb-16">
          {/* Column 1: Branding */}
          <div className="lg:col-span-1 flex flex-col items-start">
            {/* Logo with dust/smoke ground effect */}
            <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4px' }}>

              {/* Logo — highest z-index so nothing overlaps it */}
              <button
                onClick={openLogoVideo}
                aria-label="Play logo animation"
                className="inline-flex items-center justify-center cursor-pointer border-0 outline-none bg-transparent p-0"
                style={{ position: 'relative', zIndex: 10 }}
              >
                <motion.img
                  src={logoImg}
                  alt="Karrcholai Construction logo"
                  className="h-28 md:h-36 w-auto object-contain"
                  animate={{
                    scale: [1, 1.05, 1.03, 1.05, 1],
                    filter: [
                      'drop-shadow(0 0 0px rgba(201,117,74,0))',
                      'drop-shadow(0 0 6px rgba(201,117,74,0.35)) drop-shadow(0 0 14px rgba(201,117,74,0.15))',
                      'drop-shadow(0 0 10px rgba(201,117,74,0.45)) drop-shadow(0 0 22px rgba(201,117,74,0.2))',
                      'drop-shadow(0 0 6px rgba(201,117,74,0.35)) drop-shadow(0 0 14px rgba(201,117,74,0.15))',
                      'drop-shadow(0 0 0px rgba(201,117,74,0))',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </button>

              {/* Ground shadow reflection — sits strictly below logo */}
              <motion.span
                animate={{
                  opacity: [0, 0.25, 0.4, 0.25, 0],
                  scaleX: [0.4, 1.2, 1.8, 1.2, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  translateX: '-50%',
                  width: '180px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 45%, transparent 75%)',
                  filter: 'blur(7px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Dust particles — only spread sideways from the base, never cover logo */}
              {[...Array(6)].map((_, i) => {
                const side = i % 2 === 0 ? 1 : -1
                const spread = 20 + i * 14
                return (
                  <motion.span
                    key={i}
                    animate={{
                      x: [0, side * spread * 0.5, side * spread],
                      y: [0, -8, -18],
                      opacity: [0, 0.35, 0],
                      scale: [0.4, 1.6, 2.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: i * 0.4,
                      repeatDelay: 0.2,
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '50%',
                      translateX: '-50%',
                      width: `${10 + i * 5}px`,
                      height: `${10 + i * 5}px`,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 55%, transparent 80%)',
                      filter: 'blur(3px)',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />
                )
              })}
            </div>

            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-secondary/90 leading-relaxed mb-6 pl-6">
              From Stone to <span className="text-secondary tracking-[0.6em] brightness-125">Oasis</span>
            </p>
          </div>

          {/* Column 2 & 3: Quick Links - Horizontal */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-secondary mb-8 brightness-110 border-b border-white/5 pb-4 inline-block">Quick Links</h4>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Karr', path: '/karr' },
                { name: 'Cholai', path: '/cholai' },
                { name: 'Projects', path: '/projects' },
                { name: 'Blog', path: '/blog' },
                { name: 'Manaiyadi', path: '/manaiyadi' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/60 hover:text-white text-[11px] font-bold tracking-widest transition-all duration-300 flex items-center gap-2 group uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/0 group-hover:bg-secondary transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-secondary mb-8 brightness-110 border-b border-white/5 pb-4 inline-block">Newsletter</h4>
            <p className="text-white/50 text-[10px] mb-8 font-light leading-relaxed tracking-wide max-w-[240px]">
              Stay updated with our latest architectural projects and traditional building insights.
            </p>
            <div className="space-y-4 mb-8">
              <a href="mailto:info@karrcholai.com" className="text-[10px] font-bold text-white/40 hover:text-white transition-colors block uppercase tracking-widest" aria-label="Email Karrcholai Construction">
                info@karrcholai.com
              </a>
            </div>
            <form className="relative max-w-[280px]" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-xs text-white focus:outline-none focus:border-secondary/50 transition-all placeholder:text-white/20"
                aria-label="Email address for newsletter"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-secondary text-white px-5 rounded-md text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-lg shadow-secondary/20"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-[8px] font-black tracking-[0.3em] uppercase text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          
          <p className="text-white/30 text-[8px] font-black tracking-[0.3em] uppercase text-center md:text-left">
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
