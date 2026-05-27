import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiHome, FiBriefcase, FiRefreshCw, FiEdit3,
  FiCheckCircle, FiTool, FiLayout, FiDollarSign,
  FiUserCheck, FiSearch, FiArrowRight, FiArrowUpRight
} from 'react-icons/fi'
import renovationImg from '../../assets/renovation.jpg.jpeg'
import pmcImg from '../../assets/pmc.jpeg'
import img6 from '../../assets/img6.jpg'
import residential from '../../assets/pr_3.jpeg'

const TERRA = '#B85C38'
const FOREST = '#2D4B37'

const tabs = [
  {
    id: 'residential',
    label: 'Residential',
    headline: 'Crafting Exceptional Homes.',
    desc: 'Karrcholai Construction provides complete residential construction services for independent houses and villas. We ensure every project is built with quality materials, durable structures, and professional workmanship.',
    image: residential,
    services: [
      { title: 'Turnkey house construction', icon: FiHome },
      { title: 'Structural construction work', icon: FiLayout },
      { title: 'Finishing works', icon: FiEdit3 },
      { title: 'Renovation & extensions', icon: FiRefreshCw },
      { title: 'Site execution & supervision', icon: FiUserCheck },
      { title: 'Quality control & inspection', icon: FiCheckCircle },
    ],
  },
  {
    id: 'pmc',
    label: 'PMC',
    headline: 'Efficiency in Execution.',
    desc: 'Our Project Management Consultancy (PMC) services help homeowners manage their construction projects efficiently — saving time, controlling costs, and ensuring quality throughout every phase.',
    image: pmcImg,
    services: [
      { title: 'Project planning & scheduling', icon: FiLayout },
      { title: 'Construction cost estimation', icon: FiDollarSign },
      { title: 'Contractor coordination', icon: FiUserCheck },
      { title: 'Material planning & procurement', icon: FiBriefcase },
      { title: 'Site supervision & inspection', icon: FiSearch },
      { title: 'Project progress monitoring', icon: FiEdit3 },
    ],
  },
  {
    id: 'renovation',
    label: 'Renovation',
    headline: 'Revitalize Your Living Space.',
    desc: 'Our renovation solutions enhance the functionality, durability, and appearance of existing homes — breathing new life into every corner with precision and craftsmanship.',
    image: renovationImg,
    services: [
      { title: 'House renovation', icon: FiHome },
      { title: 'Structural repair', icon: FiTool },
      { title: 'Interior works', icon: FiLayout },
      { title: 'House extensions', icon: FiRefreshCw },
    ],
  },
]

const KarrHomeSection = () => {
  const [active, setActive] = useState(0)
  const current = tabs[active]

  return (
    <section className="py-24 md:py-36 bg-[#fdfbf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="w-12 h-px bg-[#B85C38]" />
              <span className="text-[#B85C38] font-black text-[10px] tracking-[0.5em] uppercase">Division I · Karr Construction</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-[#1a1a1a]"
            >
              KARR <br />
              <span className="italic text-[#1a1a1a]/15">Construction.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs"
          >
            <p className="text-[#1a1a1a]/45 text-sm font-light leading-relaxed mb-6">
              The Karr division focuses on strong, durable, and professionally managed residential construction services across Tamil Nadu.
            </p>
            <Link to="/karr">
              <button className="group flex items-center gap-3 text-[#1a1a1a] font-black text-[10px] tracking-[0.3em] uppercase hover:text-[#B85C38] transition-colors">
                Explore Karr <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex gap-2 mb-12 bg-white/60 border border-[#1a1a1a]/5 rounded-2xl p-2 w-fit shadow-sm">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className={`px-7 py-3 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                active === i
                  ? 'bg-[#1a1a1a] text-white shadow-lg'
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch"
          >
            {/* Left: Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src={current.image}
                  alt={current.label}
                  className="w-full h-full object-contain bg-[#fdfbf7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent" />

                {/* Floating tag */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black tracking-widest uppercase rounded-full">
                    {current.label}
                  </span>
                </div>

                {/* Bottom stat */}
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/50 text-[9px] font-black tracking-widest uppercase mb-1">
                    {active === 0 ? 'Homes Built' : active === 1 ? 'Projects Managed' : 'Projects Renovated'}
                  </p>
                  <p className="text-5xl font-black text-white leading-none">
                    {active === 0 ? '200+' : active === 1 ? '85+' : '60+'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-10">
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight tracking-tight mb-6">
                  {current.headline.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="italic text-[#1a1a1a]/20">
                    {current.headline.split(' ').slice(-1)}
                  </span>
                </h3>
                <p className="text-[#1a1a1a]/50 text-base font-light leading-relaxed max-w-xl">
                  {current.desc}
                </p>
              </div>

              {/* Service Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.services.map((srv, i) => {
                  const Icon = srv.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="group flex items-center gap-5 p-5 bg-white rounded-2xl border border-[#1a1a1a]/5 hover:border-[#B85C38]/30 hover:shadow-lg transition-all duration-400 hover:-translate-y-0.5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#fdfbf7] flex items-center justify-center text-[#1a1a1a]/30 group-hover:bg-[#B85C38] group-hover:text-white transition-all duration-400 flex-shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#2D4B37] group-hover:text-[#B85C38] transition-colors leading-snug">
                        {srv.title}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* PMC Highlights */}
              {active === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-6 flex-wrap"
                >
                  {['Save Time', 'Control Costs', 'Ensure Quality'].map((txt, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#2D4B37]/5 border border-[#2D4B37]/10 rounded-full px-5 py-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#B85C38]" />
                      <span className="text-[10px] font-black tracking-widest uppercase text-[#2D4B37]">{txt}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Estimation Highlights */}
              {active === 0 && (
                <div className="p-6 bg-[#2D4B37] rounded-2xl text-white">
                  <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-4">Our Process Includes</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Detailed cost estimation', 'Project planning', 'Material scheduling', 'Budget control'].map((t, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/80 text-sm font-light">
                        <FiCheckCircle size={13} className="text-[#B85C38] flex-shrink-0" /> {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/karr">
                <motion.button
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-[#1a1a1a]/40 hover:text-[#B85C38] transition-colors w-fit"
                >
                  Learn More About Karr
                  <FiArrowRight className="text-[#B85C38] group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default KarrHomeSection
