import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ctaBg from '../../assets/pic6.png'

const CTASection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={ref} className="relative py-32 flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Background with parallax */}
      <motion.div 
        style={{ y, backgroundImage: `url(${ctaBg})` }}
        className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
      />
      
      {/* Stone Texture Overlay */}
      <div className="absolute inset-0 stone-texture opacity-30 z-0"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0"></div>

      <div className="relative z-10 text-center container px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
        >
          Stone Strong. Oasis Living.
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-32 h-1.5 bg-secondary mx-auto mb-8"
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl text-white/80 font-light tracking-[0.3em] uppercase"
        >
          Built with Discipline.
        </motion.p>
      </div>
    </div>
  )
}

export default CTASection
