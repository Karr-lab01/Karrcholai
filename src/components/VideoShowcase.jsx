import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import VID from '../../assets/VID.mp4'

const VideoShowcase = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Video */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={VID} type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Floating Content */}
      <motion.div 
        style={{ opacity, y: textY }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-secondary font-bold tracking-[0.5em] uppercase text-xs md:text-sm mb-6 block">
            The Art of Construction
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none mb-6 md:mb-8">
            From Stone to <br />
            <span className="italic text-white/40 font-light">Oasis.</span>
          </h2>
          
          <div className="max-w-xl mx-auto">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10">
              Witness the transformation of raw materials into architectural masterpieces 
              that define modern living.
            </p>
            
            <div className="flex items-center justify-center gap-8">
              <div className="h-px w-20 bg-white/20" />
              <button className="text-white font-bold tracking-widest uppercase text-xs hover:text-secondary transition-colors">
                Play the Story
              </button>
              <div className="h-px w-20 bg-white/20" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-white/20 pointer-events-none" />
    </section>
  )
}

export default VideoShowcase
