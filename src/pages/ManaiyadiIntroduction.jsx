import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiCompass, FiAlertTriangle, FiCheckCircle, FiCalendar, FiClock, FiSun } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import VastuPurushaHero from '../components/vastu/VastuPurushaHero'

import heroBg from '../assets/manaiyadi_hero.png'
import vastuDetail from '../assets/vastu_detail.png'

// ── AUSPICIOUS DATES DATA ──
const auspiciousDates = [
  { month: 'ஜனவரி',    tamil: 'January',   dates: [28] },
  { month: 'பிப்ரவரி',  tamil: 'February',  dates: [6, 8, 13, 15, 16, 20] },
  { month: 'மார்ச்',   tamil: 'March',      dates: [5, 6, 8, 15, 16, 25] },
  { month: 'ஏப்ரல்',   tamil: 'April',      dates: [6, 12, 13, 16, 20, 23, 30] },
  { month: 'மே',       tamil: 'May',        dates: [8, 13, 14, 18, 28, 29] },
  { month: 'ஜூன்',     tamil: 'June',       dates: [4, 7, 17, 18, 24, 25] },
  { month: 'ஜூலை',    tamil: 'July',       dates: [2, 5, 12] },
  { month: 'ஆகஸ்ட்',  tamil: 'August',     dates: [23, 30, 31] },
  { month: 'செப்டம்பர்', tamil: 'September', dates: [7, 13, 17] },
  { month: 'அக்டோபர்', tamil: 'October',    dates: [25, 30] },
  { month: 'நவம்பர்',  tamil: 'November',   dates: [1, 11, 13, 15, 16, 20, 29] },
  { month: 'டிசம்பர்', tamil: 'December',   dates: [4, 6, 10, 13, 14] },
]

// ── VASTU CONSTRUCTION DAYS DATA ──
const vastuDays = [
  { tamilMonth: 'தை',    date: 12, weekday: 'திங்கள்', engDate: '26.01.26', time: '10.41 - 11.17' },
  { tamilMonth: 'மாசி',  date: 22, weekday: 'வெள்ளி',  engDate: '06.03.26', time: '10.32 - 11.08' },
  { tamilMonth: 'சித்திரை', date: 10, weekday: 'வியாழன்', engDate: '23.04.26', time: '8.54 - 9.30' },
  { tamilMonth: 'வைகாசி', date: 21, weekday: 'வியாழன்', engDate: '04.06.26', time: '9.58 - 10.34' },
  { tamilMonth: 'ஆடி',   date: 11, weekday: 'திங்கள்', engDate: '27.07.26', time: '7.44 - 8.20' },
  { tamilMonth: 'ஆவணி',  date: 6,  weekday: 'ஞாயிறு', engDate: '23.08.26', time: '7.23 - 7.59' },
  { tamilMonth: 'ஐப்பசி', date: 11, weekday: 'புதன்',  engDate: '28.10.26', time: '7.44 - 8.20' },
  { tamilMonth: 'கார்த்தி', date: 8, weekday: 'செவ்வாய்', engDate: '24.11.26', time: '11.29 - 12.05' },
]

const ManaiyadiIntroduction = () => {
  const [activeMonth, setActiveMonth] = useState(null)

 const fadeInUp = {
 initial: { opacity: 0, y: 60 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true },
 transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
 }

 return (
 <div className="bg-[#fdfbf7] min-h-screen text-dark font-sans overflow-x-hidden">
 <Helmet>
 <title>Introduction to Manaiyadi Sastram | Karrcholai Construction</title>
 <meta
 name="description"
 content="A complete introduction to Manaiyadi Sastram — the traditional Tamil architectural practice. Learn about auspicious dimensions, wall heights, yoga unions, and room archetypes for modern home planning."
 />
 <link rel="canonical" href="https://karrcholai-sepia.vercel.app/manaiyadi/introduction" />
 <meta property="og:title" content="Introduction to Manaiyadi Sastram | Karrcholai Construction" />
 <meta property="og:description" content="A complete introduction to Manaiyadi Sastram — the traditional Tamil architectural practice. Learn about auspicious dimensions, wall heights, yoga unions, and room archetypes for modern home planning." />
 <meta property="og:url" content="https://karrcholai-sepia.vercel.app/manaiyadi/introduction" />
 </Helmet>

 <Navbar />

 <main>
 {/* â”€â”€ HERO â”€â”€ */}
 <section className="relative h-screen flex items-center justify-center overflow-hidden">
 <motion.div
 initial={{ scale: 1.2, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 2, ease: 'easeOut' }}
 className="absolute inset-0 z-0"
 >
 <img src={heroBg} alt="Traditional Tamil home design — Manaiyadi Sastram hero image" className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
 </motion.div>

 <div className="relative z-10 container mx-auto px-6 text-center">
 <motion.div
 initial={{ opacity: 0, y: 100 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
 className="mt-16"
 >
 <p className="text-white font-black tracking-[0.5em] md:tracking-[0.8em] uppercase text-[10px] md:text-xs mb-6 md:mb-8">
 Traditional Tamil Architecture
 </p>
 <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8 md:mb-12 uppercase whitespace-normal md:whitespace-nowrap">
 Manaiyadi <br className="md:hidden" />{' '}
 <span className="text-transparent stroke-text-white">Sastram.</span>
 </h1>
 <div className="flex flex-col md:flex-row items-center justify-center gap-8">
 <div className="w-[1px] h-20 bg-white/20 hidden md:block"></div>
 <p className="text-white font-medium text-sm md:text-lg max-w-xl font-light leading-relaxed tracking-wide drop-shadow-md">
 A complete introduction â€” from ancient principles to practical room-by-room guidance for modern construction.
 </p>
 </div>
 </motion.div>
 </div>

 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 2, duration: 1 }}
 className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
 >
 <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Discover</span>
 <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
 </motion.div>
 </section>

 {/* â”€â”€ INTRODUCTION â”€â”€ */}
 <section className="py-16 md:py-32 px-6 bg-[#fdfbf7] relative">
 <div className="mx-auto max-w-7xl">
 <motion.div
 {...fadeInUp}
 className="flex flex-col md:flex-row items-start gap-8 md:gap-24"
 >
 <div className="md:w-1/3">
 <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4 md:mb-6 flex items-center gap-4">
 <span className="w-8 h-[1px] bg-secondary"></span> Introduction
 </h3>
 <h2 className="text-4xl md:text-6xl font-black text-dark leading-tight tracking-tighter">
 Tamil <br /> <span className="text-primary">Heritage.</span>
 </h2>
 </div>
 <div className="md:w-2/3">
 <p className="text-lg md:text-2xl font-light text-dark/70 leading-relaxed mb-6 md:mb-8">
 <span className="text-dark font-black">Manaiyadi Sastram (மனையடி சாஸ்திரம்)</span> is a traditional Tamil
 architectural practice that guides room dimensions, wall heights, and building proportions for residential
 construction.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-dark/50 text-xs md:text-sm leading-relaxed">
 <p>
 For centuries, families and builders in Tamil Nadu have consulted these measurements before constructing
 homes. Specific lengths and heights are associated with favourable or unfavourable outcomes for health,
 prosperity, and family well-being.
 </p>
 <p>
 At Karrcholai, we respect this tradition and help clients apply Manaiyadi principles during planning â€”
 alongside modern structural engineering, so your home is both culturally aligned and technically sound.
 </p>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* â”€â”€ CORE CONTEXT â”€â”€ */}
 <section className="py-24 md:py-48 px-6 bg-white border-y border-dark/5 relative overflow-hidden">
 <div className="absolute top-0 right-0 text-[10rem] md:text-[20rem] font-black text-dark/[0.02] select-none pointer-events-none translate-x-1/4 -translate-y-1/4 uppercase">
 Wisdom
 </div>
 <div className="mx-auto max-w-7xl relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
 <div className="space-y-8 lg:space-y-12">
 <motion.div
 {...fadeInUp}
 className="relative h-[300px] md:h-[400px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl group"
 >
 <img
 src={vastuDetail}
 alt="Vastu and Manaiyadi architectural detail showing proportion and balance"
 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
 <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
 <p className="text-white font-black uppercase tracking-[0.3em] text-[9px] mb-2 opacity-60">Design Principle</p>
 <p className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase leading-tight">
 Proportion <br /> & Balance.
 </p>
 </div>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
 <div className="p-8 md:p-10 bg-[#fdfbf7] border border-dark/5 rounded-[2.5rem] md:rounded-[3rem] shadow-xl grain">
 <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Historical Roots</h4>
 <p className="text-xs md:text-sm text-dark/60 leading-relaxed">
 Based on classical Tamil texts such as <span className="font-bold">Manasara</span>, adapted for residential
 planning today.
 </p>
 </div>
 <div className="p-8 md:p-10 bg-dark text-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
 <div className="absolute -bottom-10 -right-10 opacity-5">
 <FiCompass size={160} />
 </div>
 <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">Before Construction</h4>
 <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light">
 Traditionally consulted before laying foundations â€” to align dimensions with family wishes and cultural practice.
 </p>
 </div>
 </div>
 </div>

 <motion.div {...fadeInUp} className="lg:pl-12">
 <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Core Principle</h3>
 <h2 className="text-3xl md:text-7xl font-black text-dark mb-6 md:mb-10 tracking-tighter uppercase leading-none">
 Measured <br /> <span className="text-primary">Dimensions.</span>
 </h2>
 <p className="text-dark/40 text-base md:text-lg font-light leading-relaxed mb-6 md:mb-8">
 Each room length, width, and wall height is evaluated against traditional formulas. The resulting numbers
 indicate whether a dimension is considered favourable, neutral, or unfavourable for the household.
 </p>
 <div className="w-12 h-px bg-dark/10 mb-8"></div>
 <p className="text-dark/60 text-sm">
 "Good planning respects both engineering requirements and the measurements our families have trusted for
 generations."
 </p>
 </motion.div>
 </div>
 </div>
 </section>

 {/* â”€â”€ COMMON MISTAKES â”€â”€ */}
 <section className="py-24 md:py-48 px-6 bg-[#fdfbf7]">
 <div className="mx-auto max-w-7xl">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
 <div className="p-8 md:p-16 bg-secondary/5 border border-secondary/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
 <div className="absolute top-0 right-0 p-8 text-secondary/10">
 <FiAlertTriangle size={80} />
 </div>
 <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-10">Pitfalls to Avoid</h3>
 <h2 className="text-3xl md:text-4xl font-black text-dark mb-8 md:mb-12 tracking-tight uppercase leading-none">
 Common <br /> <span className="">Mistakes.</span>
 </h2>
 <ul className="space-y-6 md:space-y-8">
 {[
 'Including wall thickness in room measurements',
 'Mixing favourable and unfavourable dimension pairs',
 'Ignoring recommended ceiling height',
 'Applying plot size only, without checking individual rooms',
 ].map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-4 md:gap-6 text-[10px] md:text-sm font-bold text-dark/60 uppercase tracking-widest leading-tight"
 >
 <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 flex-shrink-0"></span>
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="p-8 md:p-16 bg-primary/5 border border-primary/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
 <div className="absolute top-0 right-0 p-8 text-primary/10">
 <FiCheckCircle size={80} />
 </div>
 <h3 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-10">Practical Perspective</h3>
 <h2 className="text-3xl md:text-4xl font-black text-dark mb-8 md:mb-12 tracking-tight uppercase leading-none">
 Tradition & <br /> <span className="">Construction.</span>
 </h2>
 <p className="text-xs md:text-sm text-dark/40 leading-relaxed font-light mb-6 md:mb-8">
 Manaiyadi Sastram is a respected system of architectural planning that many Tamil families follow when
 building a home.
 </p>
 <p className="text-xs md:text-sm text-dark/40 leading-relaxed font-light">
 When combined with proper structural design and site supervision, auspicious dimensions can give families
 confidence and peace of mind throughout the construction process.
 </p>
 </div>
 </div>
 </div>
 </section>

        {/* AUSPICIOUS MUHURTHA DAYS */}
        <section className="py-24 md:py-40 px-6">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-16">
              <div>
                <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">Almanac 2026</h3>
                <h2 className="text-4xl md:text-7xl font-black text-dark leading-[0.9] tracking-tighter uppercase">
                  சுப முகூர்த்த <br />
                  <span className="text-primary italic">தினங்கள்.</span>
                </h2>
              </div>
              <p className="text-dark/40 text-base font-light max-w-sm leading-relaxed lg:text-right">
                Auspicious dates recommended for foundation-laying and construction commencement — traditional Tamil almanac, 2026.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-[3rem] border border-dark/5 shadow-2xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-dark text-white">
                  <tr>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] w-48">Month</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Auspicious Dates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark/5">
                  {auspiciousDates.map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="group hover:bg-cream/50 transition-colors"
                    >
                      <td className="px-10 py-7">
                        <p className="text-lg font-black text-dark group-hover:text-primary transition-colors tracking-tight">{item.month}</p>
                        <p className="text-[10px] font-bold text-dark/25 uppercase tracking-widest mt-0.5">{item.tamil}</p>
                      </td>
                      <td className="px-10 py-7">
                        <div className="flex flex-wrap gap-2">
                          {item.dates.map((d, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-black hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-default"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {auspiciousDates.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white border border-dark/5 rounded-[1.5rem] p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-black text-dark text-base tracking-tight">{item.month}</p>
                      <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest">{item.tamil}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.dates.map((d, j) => (
                      <span key={j} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-black">
                        {d}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-8 flex items-center gap-4 p-6 bg-primary/5 border border-primary/10 rounded-[1.5rem]">
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
              <p className="text-xs font-bold text-primary/70 uppercase tracking-[0.25em]">
                வளர்பிறை முகூர்த்தங்கள் &mdash; Waxing moon phases preferred for all auspicious construction activities
              </p>
            </div>

          </div>
        </section>

        {/* VASTU CONSTRUCTION DAYS */}
        <section className="py-24 md:py-40 px-6 bg-white border-t border-dark/5">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-16">
              <div>
                <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">Foundation Muhurtham</h3>
                <h2 className="text-4xl md:text-7xl font-black text-dark leading-[0.9] tracking-tighter uppercase">
                  வாஸ்து செய்யும் <br />
                  <span className="text-secondary italic">நாட்கள்.</span>
                </h2>
              </div>
              <p className="text-dark/40 text-base font-light max-w-sm leading-relaxed lg:text-right">
                Precise morning Muhurtham windows for each Tamil month — the exact time to lay your home's first stone.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-[3rem] border border-dark/5 shadow-2xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-dark text-white">
                  <tr>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">மாதம் / Month</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">தேதி / Date</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">கிழமை / Day</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">ஆ. தேதி</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">நேரம் (காலை)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark/5">
                  {vastuDays.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="group hover:bg-cream/50 transition-colors"
                    >
                      <td className="px-10 py-8">
                        <span className="text-2xl font-black text-dark group-hover:text-secondary transition-colors tracking-tighter">{row.tamilMonth}</span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 border border-primary/15 text-primary text-base font-black">{row.date}</span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-sm font-bold text-dark/50">{row.weekday}</span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-sm font-black text-dark/70 tracking-wide">{row.engDate}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-secondary/5 border border-secondary/20 text-secondary">
                          <FiClock size={12} />
                          <span className="text-[11px] font-black tracking-widest">{row.time}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {vastuDays.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white border border-dark/5 rounded-[1.5rem] p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary/5 border border-primary/15 flex items-center justify-center text-primary font-black text-base flex-shrink-0">
                        {row.date}
                      </span>
                      <div>
                        <p className="font-black text-dark text-base tracking-tight">{row.tamilMonth}</p>
                        <p className="text-[10px] text-dark/35 font-bold mt-0.5">{row.weekday}</p>
                      </div>
                    </div>
                    <p className="text-[11px] font-black text-dark/45">{row.engDate}</p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-dark/5">
                    <FiClock size={13} className="text-secondary flex-shrink-0" />
                    <span className="text-sm font-black text-secondary tracking-wide">{row.time}</span>
                    <span className="ml-auto text-[9px] font-bold text-dark/25 uppercase tracking-widest">காலை</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-10 md:mt-14 p-8 md:p-10 bg-dark rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <FiSun className="text-white/50" size={18} />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">Traditional Guideline</h5>
                <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                  All times shown are <span className="text-white/75 font-semibold">morning (காலை)</span> muhurtham windows.
                  Consult your family astrologer for personalized alignment with your birth star <span className="text-white/75">(நட்சத்திரம்)</span> before finalizing the date.
                </p>
              </div>
            </div>

          </div>
        </section>

         {/* VEDIC ARCHITECTURE - VASTU SHASTRA - SREE VASTU BHAGWAN */}
        <VastuPurushaHero />

 {/* â”€â”€ CTA â”€â”€ */}
 <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
 <div className="mx-auto max-w-5xl">
 <motion.div
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="bg-dark rounded-[2.5rem] md:rounded-[4rem] px-6 py-16 md:p-20 text-center text-white shadow-2xl relative overflow-hidden grain"
 >
 <div className="absolute inset-0 opacity-[0.07]">
 <img src={heroBg} alt="" className="w-full h-full object-cover" />
 </div>
 <div className="relative z-10">
 <h2 className="text-2xl sm:text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[1.1]">
 Plan Your Home <br className="sm:hidden" />{' '}
 <span className="text-secondary">with Confidence.</span>
 </h2>
 <p className="text-white/40 text-xs md:text-base mb-10 max-w-lg mx-auto font-light leading-relaxed">
 Our team can help you apply Manaiyadi principles during planning â€” alongside structural engineering and quality
 construction.
 </p>
 <motion.button
 whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#1a1a1a' }}
 whileTap={{ scale: 0.95 }}
 className="w-full sm:w-auto px-8 md:px-16 py-5 md:py-6 border border-white/20 rounded-full font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs transition-all duration-500"
 >
 Book a Consultation
 </motion.button>
 </div>
 </motion.div>
 </div>
 </section>
 </main>

 <UnifiedFooter />
 </div>
 )
}

export default ManaiyadiIntroduction
