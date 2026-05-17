import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import homeHeroImage from '../../assets/pexels-kawserhamid-176342.jpg'


const HeroSection = () => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])


  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-[#1a1a1a]"
      style={{
        height: 'calc(100vh - 100px)',
        marginTop: '100px',
      }}
    >

      {/* ── Background Image ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${homeHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Subtle Overlays ── */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      {/* ── Overlay Content ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 md:px-8">
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white max-w-5xl leading-[1.1] tracking-tight drop-shadow-2xl"
        >
          Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#B85C38] italic font-light pr-2">Dream Home</span> <br className="hidden md:block"/> with Expert Planning.
        </motion.h1>
        
        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-6 md:mt-8 text-sm md:text-lg text-white/80 max-w-2xl font-light leading-relaxed drop-shadow-md"
        >
          Karrcholai delivers world-class residential construction, landscape design, Manayadi planning, and Vastu consultancy services with unmatched craftsmanship.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <Link to="/contact" className="group relative overflow-hidden bg-[#B85C38] text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(184,92,56,0.4)] hover:-translate-y-1 w-full sm:w-auto text-center flex justify-center">
            <span className="relative z-10 flex items-center gap-3">
              Get Free Consultation
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
          <Link to="/projects" className="group bg-white/5 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-500 hover:bg-white hover:text-[#1a1a1a] hover:-translate-y-1 w-full sm:w-auto text-center flex justify-center">
            Start Your Dream Project
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 right-8 z-20 hidden md:flex flex-col items-center gap-1"
      >
        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mb-3">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-4 h-7 border border-white/20 rounded-full flex justify-center pt-1"
        >
          <div className="w-0.5 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
