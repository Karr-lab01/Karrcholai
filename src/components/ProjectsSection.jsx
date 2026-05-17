import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import prj1 from '../../assets/pic2.png'
import prj2 from '../../assets/pic3.png'
import prj3 from '../../assets/pic7.png'

const projects = [
  { 
    title: 'ecr residence', 
    location: 'Chennai ecr',
    tag: 'Residential', 
    image: prj1, 
    year: '2026',
    size: '17k Sq.Ft'
  },
  { 
    title: 'Heritage Duplex', 
    location: 'Coimbatore, TN',
    tag: 'Construction', 
    image: prj2, 
    year: '2022',
    size: '3,200 Sq.Ft'
  },
  { 
    title: 'Eco-Living Hub', 
    location: 'Madurai, TN',
    tag: 'Sustainable', 
    image: prj3, 
    year: '2024',
    size: '5,100 Sq.Ft'
  },
]

const ProjectsSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-16 md:py-32 bg-[#111111] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-24 gap-6 md:gap-12">
          <div className="w-full md:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-5 md:mb-8"
            >
              <span className="w-8 md:w-12 h-[2px] bg-secondary" />
              <span className="text-secondary font-black text-[10px] tracking-[0.3em] uppercase">Portfolio Excellence</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-none"
            >
              Featured <br/>
              <span className="text-primary italic">Architectures.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-start md:items-end gap-4 md:gap-6 w-full md:w-auto"
          >
            <p className="text-white/40 text-sm md:text-lg font-light md:text-right max-w-xs italic">
              "Every structure tells a story of discipline and craftsmanship."
            </p>
            <button className="group relative overflow-hidden bg-white text-dark px-7 md:px-10 py-3.5 md:py-5 rounded-full font-black text-[11px] tracking-widest uppercase transition-all duration-500 hover:text-white">
              <span className="relative z-10">View Full Archive</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>

        {/* Cinematic Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl" style={{ aspectRatio: '4/5' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <span className="text-secondary font-black text-[9px] md:text-[10px] tracking-[0.3em] uppercase bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                        {p.tag}
                      </span>
                      <span className="text-white/40 text-[9px] md:text-[10px] font-black tracking-widest uppercase">
                        {p.year}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-3xl font-black text-white mb-1 md:mb-2 group-hover:text-secondary transition-colors duration-300 leading-none">
                      {p.title}
                    </h3>
                    
                    <p className="text-white/40 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
                      {p.location} • {p.size}
                    </p>

                    <div className="w-8 md:w-12 h-[2px] bg-white group-hover:w-full transition-all duration-700 origin-left" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProjectsSection
