import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle, FaArrowRight, FaLightbulb } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

import newLandscape from '../../assets/lancape.jpg.jpeg'
import newRainwater from '../../assets/rainwater.jpg.jpeg'
import newSolar from '../../assets/solar panel.jpg.jpeg'
import newWaste from '../../assets/WhatsApp Image 2026-05-17 at 16.41.22.jpeg'
import newLighting from '../../assets/lighting.jpg'

const SERVICES = [
  {
    id: 'landscape',
    icon: <FaLeaf />,
    label: 'Landscape',
    title: 'Landscape Development',
    subtitle: 'Designing with Nature',
    desc: 'We design and develop attractive outdoor spaces that enhance both the beauty and environmental value of residential properties. Our approach integrates native flora with modern aesthetics.',
    items: ['Garden planning and development', 'Landscape design', 'Green space planning'],
    impact: '100% Eco-Design',
    images: [newLandscape],
    accent: '#3F7A4F',
    lightBg: 'from-green-500/10 to-emerald-500/10',
  },
  {
    id: 'rainwater',
    icon: <FaCloudRain />,
    label: 'Rainwater',
    title: 'Rainwater Harvesting',
    subtitle: 'Conserving Every Drop',
    desc: 'Rainwater harvesting helps conserve water and recharge groundwater resources. Our advanced collection systems ensure long-term water security for homeowners.',
    items: ['Rainwater collection systems', 'Groundwater recharge solutions', 'Water conservation planning'],
    impact: '50,000L+ Stored',
    images: [newRainwater],
    accent: '#3B82F6',
    lightBg: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'solar',
    icon: <FaSun />,
    label: 'Solar Energy',
    title: 'Solar Energy Solutions',
    subtitle: 'Powering the Future',
    desc: 'We provide renewable energy solutions that help homeowners reduce electricity costs and environmental impact. Clean, silent, and sustainable energy for modern homes.',
    items: ['Solar panel installation', 'Solar energy system planning', 'Renewable energy integration'],
    impact: '95% Energy Saving',
    images: [newSolar],
    accent: '#F59E0B',
    lightBg: 'from-yellow-500/10 to-orange-500/10',
  },
  {
    id: 'waste',
    icon: <FaRecycle />,
    label: 'Waste Mgmt.',
    title: 'Waste Management',
    subtitle: 'Circular Living',
    desc: 'Responsible waste management improves environmental health and sustainability. We implement systems that turn waste into resources, supporting a clean living space.',
    items: ['Waste segregation systems', 'Composting solutions', 'Sustainable waste planning'],
    impact: 'Zero Waste Goal',
    images: [newWaste],
    accent: '#8B7355',
    lightBg: 'from-amber-500/10 to-stone-500/10',
  },
  {
    id: 'lighting',
    icon: <FaLightbulb />,
    label: 'Lighting',
    title: 'Smart Lighting',
    subtitle: 'Illuminate Thoughtfully',
    desc: 'Energy-efficient lighting design that transforms spaces while minimising power consumption. We integrate smart controls, LED systems, and natural light strategies for beautiful, sustainable homes.',
    items: ['LED & energy-efficient fixtures', 'Smart lighting controls', 'Natural light optimisation'],
    impact: '80% Energy Saved',
    images: [newLighting],
    accent: '#D4A017',
    lightBg: 'from-yellow-400/10 to-amber-300/10',
  },
]

const CholaiHomeSection = () => {
  const [active, setActive] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const current = SERVICES[active]

  useEffect(() => {
    setImgIdx(0)
    const timer = setInterval(() => {
      setImgIdx(prev => (prev + 1) % current.images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [active, current.images.length])

  return (
    <section className="py-24 md:py-36 bg-[#1C1C1A] text-white overflow-hidden relative">
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: current.accent }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-secondary/20"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="w-12 h-px bg-secondary" />
              <span className="text-secondary font-black text-[10px] tracking-[0.5em] uppercase">Division II · Cholai Sustainability</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black leading-none tracking-tighter"
            >
              CHOLAI <br />
              <span className="italic text-white/15">Solutions.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs"
          >
            <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
              The Cholai division focuses on environmentally responsible solutions — creating sustainable, self-sufficient homes for a greener tomorrow.
            </p>
            <Link to="/cholai">
              <button className="group flex items-center gap-3 text-white/50 font-black text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">
                Explore Cholai <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ── Tab switcher ── */}
        <div className="flex gap-2 mb-12 bg-white/5 border border-white/10 rounded-2xl p-2 w-fit flex-wrap">
          {SERVICES.map((srv, i) => (
            <button
              key={srv.id}
              onClick={() => setActive(i)}
              className={`px-5 py-3 rounded-xl text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 ${
                active === i
                  ? 'bg-white text-[#1C1C1A] shadow-lg'
                  : 'text-white/30 hover:text-white/70'
              }`}
            >
              <span className={active === i ? 'text-[#1C1C1A]' : ''} style={{ color: active === i ? '#1C1C1A' : srv.accent, opacity: active === i ? 1 : 0.8 }}>
                {srv.icon}
              </span>
              {srv.label}
            </button>
          ))}
        </div>

        {/* ── Main Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch"
          >
            {/* Left: Content */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-10">
              <div>
                {/* Icon + subtitle */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                    style={{ background: `${current.accent}20`, color: current.accent }}>
                    {current.icon}
                  </div>
                  <span className="font-black text-[10px] tracking-[0.4em] uppercase" style={{ color: current.accent }}>
                    {current.subtitle}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                  {current.title.split(' ')[0]}{' '}
                  <br />
                  <span className="text-white/20 italic">
                    {current.title.split(' ').slice(1).join(' ')}
                  </span>
                </h3>

                <p className="text-white/50 text-base font-light leading-relaxed max-w-lg">
                  {current.desc}
                </p>
              </div>

              {/* Service Items */}
              <div className="space-y-3">
                <p className="text-[10px] font-black tracking-widest uppercase text-white/25 mb-4">What We Offer</p>
                {current.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: current.accent }} />
                    <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mission statement */}
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.03]">
                <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: current.accent }}>
                  Our Mission
                </p>
                <p className="text-white/60 text-sm font-light leading-relaxed italic">
                  "The Cholai division focuses on environmentally responsible solutions that help homeowners reduce dependency and support sustainable management of our planet's resources."
                </p>
              </div>

              <Link to="/cholai">
                <motion.button
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors w-fit"
                >
                  Discover All Solutions
                  <FaArrowRight className="transition-transform group-hover:translate-x-2" style={{ color: current.accent }} />
                </motion.button>
              </Link>
            </div>

            {/* Right: Image with impact badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                {/* Auto-cycling image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${active}-${imgIdx}`}
                    src={current.images[imgIdx]}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-transparent to-transparent" />

                {/* Glow frame */}
                <div
                  className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-20 pointer-events-none -z-10"
                  style={{ background: `linear-gradient(135deg, ${current.accent}, transparent)` }}
                />

                {/* Image dots */}
                {current.images.length > 1 && (
                  <div className="absolute top-6 right-6 flex gap-2">
                    {current.images.map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{ background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      />
                    ))}
                  </div>
                )}

                {/* Impact badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/40 text-[9px] font-black tracking-widest uppercase mb-1">Impact</p>
                      <p className="text-3xl font-black text-white leading-none" style={{ color: current.accent }}>
                        {current.impact}
                      </p>
                    </div>

                    {/* Pill badge */}
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-white text-[9px] font-black tracking-widest uppercase">100% Sustainable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>


      </div>
    </section>
  )
}

export default CholaiHomeSection
