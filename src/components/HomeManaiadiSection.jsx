import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCompass, FiShield, FiAlertTriangle, FiCheckCircle,
  FiLayers, FiMaximize, FiArrowUpRight, FiArrowRight
} from 'react-icons/fi'
import { roomRecommendations, yogaCombinations } from '../data/manaiyadiData'
import ManaiyadiCalculator from './manaiyadi/ManaiyadiCalculator'
import MeasurementTable from './manaiyadi/MeasurementTable'
import heroBg from '../assets/manaiyadi_hero.png'
import vastuDetail from '../assets/vastu_detail.png'
import staircase from '../assets/minimalist_luxury_staircase.png'

const PRINCIPLES = [
  { icon: FiLayers, title: 'Room Planning', desc: 'Design each room\'s internal dimensions using favorable measurements for targeted prosperity.' },
  { icon: FiMaximize, title: 'Wall Heights', desc: 'Standard 8-foot or 10-foot ceilings bring elevated status and mental well-being.' },
  { icon: FiShield, title: 'Optimization', desc: 'If a measurement is inauspicious, adjust by inches to reach a favorable dimension.' },
  { icon: FiAlertTriangle, title: 'Avoid Conflicts', desc: 'Never pair a favorable length with an unfavorable width — energies will conflict.' },
]

const HomeManaiadiSection = () => {
  const [activeRoom, setActiveRoom] = useState(0)

  return (
    <section className="py-24 md:py-36 bg-[#fdfbf7] overflow-hidden relative">
      {/* Watermark */}
      <div className="absolute top-0 right-0 text-[12rem] md:text-[20rem] font-black text-dark/[0.02] select-none pointer-events-none uppercase leading-none translate-x-1/4">
        Vastu
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="w-12 h-px bg-secondary" />
              <span className="text-secondary font-black text-[10px] tracking-[0.5em] uppercase">Ancient Architectural Wisdom</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-dark"
            >
              MANAIYADI <br />
              <span className="italic text-dark/15">Sastram.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs"
          >
            <p className="text-dark/40 text-sm font-light leading-relaxed mb-6">
              The ancient Tamil science of vibrational measurement — governing how building dimensions influence human life, prosperity, and harmony.
            </p>
            <Link to="/manaiyadi">
              <button className="group flex items-center gap-3 text-dark font-black text-[10px] tracking-[0.3em] uppercase hover:text-secondary transition-colors">
                Explore Full Guide <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ── Split Layout: Image + Philosophy ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24">

          {/* Left: Stacked Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl group">
              <img src={vastuDetail} alt="Vastu Architecture" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white/50 text-[9px] font-black tracking-widest uppercase mb-2">Visual Harmony</p>
                <p className="text-white text-3xl font-black tracking-tighter uppercase italic leading-tight">
                  Structural <br /> Divinity.
                </p>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-4 md:-right-8 bg-dark text-white p-6 rounded-2xl shadow-2xl max-w-[200px]"
            >
              <FiCompass size={24} className="text-secondary mb-3" />
              <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-1">Cultural Heritage</p>
              <p className="text-sm font-bold leading-snug">Over 1000 years of architectural precision</p>
            </motion.div>
          </motion.div>

          {/* Right: Philosophy + principles */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-dark/40 text-[10px] font-black tracking-[0.4em] uppercase mb-4">The Philosophy</p>
              <h3 className="text-4xl md:text-5xl font-black text-dark leading-tight tracking-tighter mb-6">
                Vibrational <span className="italic text-dark/20">Synchronicity.</span>
              </h3>
              <p className="text-dark/50 text-base font-light leading-relaxed mb-6 max-w-lg">
                <strong className="text-dark font-black">Manaiyadi Sastram (மனையடி சாஸ்திரம்)</strong> prescribes specific measurements for rooms and wall heights to ensure prosperity, health, and happiness. Every dimension carries a vibrational frequency that interacts with cosmic energy.
              </p>
              <p className="text-dark/40 text-sm italic border-l-2 border-secondary/30 pl-4">
                "Architecture is the reach for truth, and Manaiyadi Sastram is the mathematical path to it."
              </p>
            </motion.div>

            {/* Principle grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRINCIPLES.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex gap-4 p-5 bg-white rounded-2xl border border-dark/5 hover:border-secondary/20 hover:shadow-lg transition-all duration-400"
                  >
                    <div className="w-10 h-10 rounded-xl bg-dark flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-all duration-400">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-dark mb-1 uppercase tracking-wide">{p.title}</h4>
                      <p className="text-xs text-dark/40 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── THE CALCULATOR ── */}
        <div className="py-16 md:py-24 border-t border-dark/5 mb-16 relative">
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-secondary font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] mb-4 md:mb-6">Precision Tooling</h3>
              <h2 className="text-4xl md:text-8xl font-black text-dark mb-6 md:mb-8 tracking-tighter uppercase">Algorithm <br className="md:hidden" /> <span className="text-primary italic">Engine.</span></h2>
              <div className="w-12 h-1 bg-primary mx-auto mb-10"></div>
            </motion.div>
          </div>
          <ManaiyadiCalculator />
        </div>

        {/* ── REFERENCE TABLES ── */}
        <div className="mb-24">
          <MeasurementTable />
        </div>

        {/* ── COMMON MISTAKES & PERSPECTIVE ── */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="p-8 md:p-16 bg-secondary/5 border border-secondary/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-secondary/10"><FiAlertTriangle size={80}/></div>
               <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-10">Pitfalls to Avoid</h3>
               <h2 className="text-3xl md:text-4xl font-black text-dark mb-8 md:mb-12 tracking-tight uppercase leading-none">Common <br/> <span className="italic">Mistakes.</span></h2>
               <ul className="space-y-6 md:space-y-8">
                  {[
                    "Including Wall Thickness in calculations",
                    "Mixing favorable and unfavorable pairs",
                    "Ignoring the importance of ceiling height",
                    "Focusing only on plot size rather than rooms"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 md:gap-6 text-[10px] md:text-sm font-bold text-dark/60 uppercase tracking-widest leading-tight">
                       <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 flex-shrink-0"></span>
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="p-8 md:p-16 bg-primary/5 border border-primary/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-primary/10"><FiCheckCircle size={80}/></div>
               <h3 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-10">Scientific Perspective</h3>
               <h2 className="text-3xl md:text-4xl font-black text-dark mb-8 md:mb-12 tracking-tight uppercase leading-none">Cultural <br/> <span className="italic">Confidence.</span></h2>
               <p className="text-xs md:text-sm text-dark/40 leading-relaxed font-light mb-6 md:mb-8">
                  While rooted in traditional beliefs, Manaiyadi Sastram represents a sophisticated system of architectural planning that has stood the test of time.
               </p>
               <p className="text-xs md:text-sm text-dark/40 leading-relaxed font-light">
                  The psychological comfort and cultural confidence that auspicious measurements provide translate into real benefits for mental well-being and family harmony.
               </p>
            </div>
          </div>
        </div>


        {/* ── Room Recommendations Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-dark rounded-[3rem] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Tab list */}
            <div className="lg:col-span-4 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-secondary mb-6">Auspicious Room Sizes</p>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-10">
                Sacred <span className="italic text-white/20">Dimensions.</span>
              </h3>

              <div className="space-y-2">
                {roomRecommendations.map((room, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRoom(i)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                      activeRoom === i
                        ? 'bg-white/10 border border-white/10'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className={`text-sm font-bold tracking-wide ${activeRoom === i ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {room.room}
                    </span>
                    {activeRoom === i && (
                      <motion.div layoutId="roomIndicator" className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <FiArrowRight size={10} className="text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active room detail */}
            <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-between">
              {(() => {
                const room = roomRecommendations[activeRoom]
                return (
                  <motion.div
                    key={activeRoom}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between gap-10"
                  >
                    <div>
                      <p className="text-secondary text-[10px] font-black tracking-[0.4em] uppercase mb-4">Selected Room</p>
                      <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
                        {room.room}
                      </h3>
                      <p className="text-white/40 text-sm font-light">
                        Benefit: <span className="text-secondary font-bold capitalize">{room.benefit}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-5">Recommended Dimensions</p>
                      <div className="flex flex-wrap gap-4">
                        {room.sizes.map((size, i) => (
                          <div key={i} className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                            <p className="text-2xl font-black text-white tracking-tight">{size}</p>
                            <p className="text-[9px] font-bold tracking-widest uppercase text-white/30 mt-1">Option {i + 1}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <p className="text-[10px] font-black tracking-widest uppercase text-white/25 mb-3">Auspicious Yoga Combinations</p>
                      <div className="flex flex-wrap gap-2">
                        {yogaCombinations.slice(0, 6).map((combo, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-white/50">
                            {combo}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </div>
          </div>
        </motion.div>

        {/* ── CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 bg-secondary/5 border border-secondary/10 rounded-[2rem]"
        >
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-secondary mb-2">Precision Tooling</p>
            <h4 className="text-2xl md:text-3xl font-black text-dark tracking-tight">
              Try Our Manaiyadi Calculator
            </h4>
            <p className="text-dark/40 text-sm font-light mt-1">
              Enter your room dimensions and get instant vibrational analysis.
            </p>
          </div>
          <Link to="/manaiyadi" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-4 px-8 py-5 bg-dark text-white rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-secondary transition-all duration-500 shadow-lg whitespace-nowrap"
            >
              Open Calculator
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default HomeManaiadiSection
