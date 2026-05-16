import { motion } from 'framer-motion'
import { FiHome, FiBriefcase, FiRefreshCw, FiEdit3, FiShield, FiArrowRight } from 'react-icons/fi'
import bgImage from '../../assets/img1.jpg'

const services = [
  {
    id: 1,
    title: 'Residential Construction',
    desc: 'Bespoke luxury homes built with architectural precision and structural integrity.',
    icon: FiHome,
  },
  {
    id: 2,
    title: 'Project Management Consultancy (PMC)',
    desc: 'Expert oversight and strategic coordination ensuring projects are delivered to exact specifications.',
    icon: FiBriefcase,
  },
  {
    id: 3,
    title: 'Renovation & House Extensions',
    desc: 'Transforming and expanding existing spaces with seamless integration and modern design.',
    icon: FiRefreshCw,
  },
  {
    id: 4,
    title: 'Construction Planning & Cost Estimation',
    desc: 'Detailed architectural forecasting and transparent financial mapping for a stress-free journey.',
    icon: FiEdit3,
  },
  {
    id: 5,
    title: 'Site Supervision & Quality Control',
    desc: 'Rigorous on-site standards and material testing to guarantee a world-class finish.',
    icon: FiShield,
  }
]

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-16 md:py-40 overflow-hidden flex items-center bg-black">
      
      {/* ── High-Visibility Background ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Architectural Backdrop" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header - User Provided Content */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-secondary font-bold tracking-[0.6em] uppercase text-[10px] mb-4 block">Our Expertise</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none">
              Our <br />
              <span className="text-white/30 italic">Services.</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 text-lg max-w-sm font-light leading-relaxed border-l border-secondary/30 pl-8 mb-4"
          >
            We provide comprehensive support throughout the entire construction process:
          </motion.p>
        </div>

        {/* ── Outline Grid Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group relative p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-white/10 hover:border-secondary/40 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Glassmorphic Hover Fill */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 mb-10 group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-500">
                  <s.icon size={22} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300 leading-tight">
                  {s.title}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed mb-10 group-hover:text-white/70 transition-colors duration-300">
                  {s.desc}
                </p>

                <div className="flex items-center gap-3 text-[9px] font-black tracking-widest uppercase text-white/20 group-hover:text-white transition-all duration-500">
                  Discovery Phase <FiArrowRight className="text-secondary group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Technical Annotation Line */}
              <div className="absolute top-0 right-0 p-8">
                <span className="text-[10px] font-mono text-white/10">0{s.id}</span>
              </div>
            </motion.div>
          ))}
          
          {/* Empty Cell for Aesthetic Balance with Goal text */}
          <div className="hidden lg:flex p-10 border border-white/5 rounded-[32px] flex-col justify-center bg-white/[0.01]">
            <p className="text-white/30 text-xs italic leading-relaxed text-center font-light">
              "Our goal is to make the construction process smooth, transparent, and stress-free for homeowners."
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Side Text */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="text-white/5 text-[10px] tracking-[1em] uppercase rotate-90 origin-right">Professional Division</p>
      </div>
    </section>
  )
}

export default ServicesSection











