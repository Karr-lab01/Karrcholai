import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TERRA = '#C9754A'
const STONE = '#E8E5DF'

export default function FootprintMapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const locations = [
    { name: 'Chennai', top: '20%', left: '70%', delay: 0.1 },
    { name: 'Bengaluru', top: '10%', left: '35%', delay: 0.3 },
    { name: 'Erode', top: '45%', left: '32%', delay: 0.5 },
    { name: 'Karur', top: '52%', left: '45%', delay: 0.7 },
    { name: 'Coimbatore', top: '50%', left: '25%', delay: 0.9 },
  ]

  return (
    <section ref={ref} className="py-32 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Subtle Map / Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      {/* Large faint text in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
        <span className="text-[10vw] md:text-[12vw] font-black font-serif text-white opacity-[0.02] whitespace-nowrap">
          SOUTH INDIA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Text */}
        <div className="w-full md:w-5/12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px" style={{ background: TERRA }} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: TERRA }}>Our Footprint</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white leading-tight mb-6">
              Building Across <br/>
              <span style={{ color: TERRA, fontStyle: 'italic' }}>The Region.</span>
            </h2>
            
            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: `${STONE}80` }}>
              From the coastal luxury of Chennai to the serene landscapes of Coimbatore and the vibrant energy of Bengaluru, Karrcholai's legacy of strength spans across South India. We bring the same unyielding discipline and premium quality to every site, no matter the city.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black text-white mb-1">5+</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: TERRA }}>Major Cities</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">22</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: TERRA }}>Active Sites</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Abstract Map */}
        <div className="w-full md:w-7/12 relative aspect-square max-h-[500px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 border border-white/5 rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            {/* The Pins */}
            {locations.map((loc, i) => (
              <motion.div 
                key={i}
                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: loc.top, left: loc.left }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + loc.delay, type: 'spring' }}
              >
                {/* The glowing dot */}
                <div className="relative w-4 h-4 rounded-full flex items-center justify-center cursor-pointer" style={{ background: TERRA }}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: TERRA }} />
                  <div className="w-1.5 h-1.5 bg-white rounded-full relative z-10" />
                </div>
                {/* City Label */}
                <div className="mt-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    {loc.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
