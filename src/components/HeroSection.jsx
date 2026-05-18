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
        height: 'calc(100vh - var(--nav-height, 100px))',
        marginTop: 'var(--nav-height, 100px)',
      }}
    >

      {/* ── Background Image with Parallax Effect ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${homeHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          y,
          opacity,
        }}
      />

      {/* ── Dynamic Gradient Overlay for Ultimate Readability & Visual Focus ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 md:bg-gradient-to-r md:from-black/90 md:via-black/55 md:to-transparent pointer-events-none z-[5]" />
      
      {/* ── Overlay Content ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-start">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 flex flex-col items-start text-left">
          
          {/* Top Tagline */}
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B85C38] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 block"
          >
            Residential Design & Build
          </motion.span>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-[2.2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white max-w-2xl leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#B85C38] italic font-light pr-2">Dream Home</span> <br className="hidden sm:block"/>
            with Expert Planning.
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-5 text-sm md:text-base lg:text-lg text-white/80 max-w-xl font-light leading-relaxed drop-shadow-md"
          >
            World-class residential construction and Vastu-compliant architectural planning, crafted with unmatched precision.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full max-w-[300px] sm:max-w-none justify-start"
          >
            <Link to="/contact" className="group relative overflow-hidden bg-[#B85C38] text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(184,92,56,0.4)] hover:-translate-y-1 w-full sm:w-auto text-center flex justify-center">
              <span className="relative z-10 flex items-center gap-3 justify-center">
                Get Free Consultation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>
            <Link to="/projects" className="group bg-white/5 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm transition-all duration-500 hover:bg-white hover:text-[#1a1a1a] hover:-translate-y-1 w-full sm:w-auto text-center flex justify-center">
              Start Your Dream Project
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 right-6 sm:right-8 z-20 flex flex-col items-center gap-1"
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
