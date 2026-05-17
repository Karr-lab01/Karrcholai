import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCompass, FiShield, FiAlertTriangle, FiCheckCircle,
  FiLayers, FiMaximize, FiArrowUpRight, FiArrowRight
} from 'react-icons/fi'
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



      </div>
    </section>
  )
}

export default HomeManaiadiSection
