import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiAward, FiBarChart2, FiShield, FiUsers, FiClock, FiHeart } from 'react-icons/fi'

const reasons = [
  { icon: FiAward,    title: '12+ Years Experience',         desc: 'Over a decade of mastery in Tamil Nadu.' },
  { icon: FiBarChart2,title: 'Professional PMC',             desc: 'Structured management for precision builds.' },
  { icon: FiShield,   title: 'Transparent Pricing',          desc: 'Complete financial clarity at every stage.' },
  { icon: FiUsers,    title: 'Quality Workmanship',          desc: 'Premium materials and skilled craftsmen.' },
]

const WhyChooseUs = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-16 md:py-32 bg-[#faf6f0] overflow-hidden">
      {/* Decorative Overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/50 -skew-x-12 translate-x-32" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ── Left Content ── */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-12 h-[2px] bg-primary" />
              <span className="text-primary font-black text-[11px] tracking-[0.4em] uppercase">The Karrcholai Edge</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-dark leading-none mb-6 md:mb-10"
            >
              Why <br/>
              <span className="text-secondary italic">Trust</span> Us?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-dark/60 text-xl font-light leading-relaxed mb-12 max-w-sm"
            >
              We combine architectural discipline with a relentless focus on quality and transparency.
            </motion.p>

            {/* Large background text */}
            <div className="text-[180px] font-black text-primary/5 leading-none select-none pointer-events-none mt-20">
              12+
            </div>
          </div>

          {/* ── Right Content (Asymmetric Grid) ── */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pt-20">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className={`group relative bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 ${i % 2 === 1 ? 'md:translate-y-12' : ''}`}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#faf6f0] flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon size={28} />
                    </div>
                    
                    <h3 className="text-2xl font-black text-dark mb-4 group-hover:text-primary transition-colors duration-300">
                      {r.title}
                    </h3>
                    
                    <p className="text-dark/50 text-sm leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-secondary" />
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-secondary" />
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
