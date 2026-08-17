import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiCalendar, FiSun } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import heroBg from '../assets/manaiyadi_hero.png'

// -- AUSPICIOUS DATES DATA 2026 (from physical Tamil almanac) ----------------
const auspiciousDates = [
  { month: 'ஜனவரி',      english: 'January',   dates: [28] },
  { month: 'பிப்ரவரி',   english: 'February',  dates: [6, 8, 13, 15, 16, 20] },
  { month: 'மார்ச்',     english: 'March',     dates: [5, 6, 8, 15, 16, 25] },
  { month: 'ஏப்ரல்',     english: 'April',     dates: [6, 12, 13, 16, 20, 23, 30] },
  { month: 'மே',         english: 'May',       dates: [8, 13, 14, 18, 28, 29] },
  { month: 'ஜூன்',       english: 'June',      dates: [4, 7, 17, 18, 24, 25] },
  { month: 'ஜூலை',      english: 'July',      dates: [2, 5, 12] },
  { month: 'ஆகஸ்ட்',    english: 'August',    dates: [23, 30, 31] },
  { month: 'செப்டம்பர்', english: 'September', dates: [7, 13, 17] },
  { month: 'அக்டோபர்',  english: 'October',   dates: [25, 30] },
  { month: 'நவம்பர்',   english: 'November',  dates: [1, 11, 13, 15, 16, 20, 29] },
  { month: 'டிசம்பர்',  english: 'December',  dates: [4, 6, 10, 13, 14] },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

const MuhurthamDatesPage = () => {
  const totalDates = auspiciousDates.reduce((sum, m) => sum + m.dates.length, 0)

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark font-sans overflow-x-hidden">
      <Helmet>
        <title>Auspicious Muhurtham Dates 2026 Tamil Nadu | Karrcholai Construction</title>
        <meta
          name="description"
          content="Complete list of auspicious Muhurtham dates in 2026 for foundation-laying and construction commencement. Traditional Tamil almanac curated by Karrcholai Construction, Tamil Nadu."
        />
        <link rel="canonical" href="https://karrcholai.com/manaiyadi/muhurtham-dates" />
        <meta property="og:title" content="Auspicious Muhurtham Dates 2026 for Home Construction | Karrcholai" />
        <meta property="og:description" content="Complete 2026 Muhurtham calendar for foundation-laying and construction commencement. Traditional Tamil almanac by Karrcholai Construction." />
        <meta property="og:url" content="https://karrcholai.com/manaiyadi/muhurtham-dates" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
            { "@type": "ListItem", "position": 2, "name": "Manaiyadi Sastram", "item": "https://karrcholai.com/manaiyadi" },
            { "@type": "ListItem", "position": 3, "name": "Muhurtham Dates 2026", "item": "https://karrcholai.com/manaiyadi/muhurtham-dates" }
          ]
        })}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            minHeight: '100svh',
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75 pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white font-black tracking-[0.5em] md:tracking-[0.8em] uppercase text-[10px] md:text-xs mb-6">
                Almanac 2026
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase" style={{ fontFamily: "'Noto Sans Tamil', 'Latha', serif" }}>
                சுப முகூர்த்த
                <br />
                <span className="text-primary italic">தினங்கள்.</span>
              </h1>
              <p className="text-white/60 text-sm md:text-lg font-light max-w-xl mx-auto leading-relaxed mt-6">
                Auspicious dates for foundation-laying &amp; construction commencement — traditional Tamil almanac.
              </p>
            </motion.div>
          </div>

          {/* scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </section>

        {/* ── STATS BAND ── */}
        <section className="bg-dark py-10 px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { value: totalDates, label: 'Total Auspicious Days' },
              { value: 12, label: 'Months Covered' },
              { value: '2026', label: 'Tamil Year' },
              { value: '🌙', label: 'Waxing Moon Preferred' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 md:px-8">
                <p className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">{stat.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN TABLE ── */}
        <section className="py-24 md:py-40 px-6">
          <div className="mx-auto max-w-7xl">

            <motion.div {...fadeInUp} className="mb-12 md:mb-16">
              <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">
                Full Year Calendar
              </h3>
              <h2 className="text-4xl md:text-6xl font-black text-dark leading-[0.9] tracking-tighter uppercase">
                Month-by-Month <br />
                <span className="text-primary">Dates.</span>
              </h2>
            </motion.div>

            {/* Desktop Table */}
            <motion.div
              {...fadeInUp}
              className="hidden md:block bg-white rounded-[3rem] border border-dark/5 shadow-2xl overflow-hidden"
            >
              <table className="w-full border-collapse">
                <thead className="bg-dark text-white">
                  <tr>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] w-56">Month</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Auspicious Dates</th>
                    <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] w-32">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark/5">
                  {auspiciousDates.map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.5 }}
                      className="group hover:bg-primary/[0.03] transition-colors"
                    >
                      <td className="px-10 py-7">
                        <p className="text-xl font-black text-dark group-hover:text-primary transition-colors tracking-tight" style={{ fontFamily: "'Noto Sans Tamil', 'Latha', serif" }}>
                          {item.month}
                        </p>
                        <p className="text-[10px] font-bold text-dark/25 uppercase tracking-widest mt-0.5">
                          {item.english}
                        </p>
                      </td>
                      <td className="px-10 py-7">
                        <div className="flex flex-wrap gap-2">
                          {item.dates.map((d, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-black hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-default"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-dark/5 text-dark/50 text-xs font-black">
                          {item.dates.length}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
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
                      <p className="font-black text-dark text-lg tracking-tight" style={{ fontFamily: "'Noto Sans Tamil', 'Latha', serif" }}>{item.month}</p>
                      <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest">{item.english}</p>
                    </div>
                    <span className="text-[10px] font-black text-primary/60 bg-primary/5 border border-primary/10 rounded-full px-3 py-1">
                      {item.dates.length} days
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.dates.map((d, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-black"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <motion.div
              {...fadeInUp}
              className="mt-10 flex items-start gap-4 p-6 bg-primary/5 border border-primary/10 rounded-[1.5rem]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
              <p className="text-xs font-bold text-primary/70 uppercase tracking-[0.25em]">
                வளர்பிறை முகூர்த்தங்கள் — Waxing moon phases are preferred for all auspicious construction activities.
                Consult your family astrologer for personalised alignment with your birth star (நட்சத்திரம்).
              </p>
            </motion.div>

          </div>
        </section>

        {/* ── INFO CARDS ── */}
        <section className="py-16 md:py-32 px-6 bg-white border-t border-dark/5">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <FiCalendar size={28} />,
                  title: 'Waxing Moon',
                  desc: 'Muhurtham dates fall during வளர்பிறை (Shukla Paksha) — the waxing fortnight — for maximum positive energy.',
                  color: 'text-primary',
                  bg: 'bg-primary/5 border-primary/10',
                },
                {
                  icon: <FiSun size={28} />,
                  title: 'Morning Hours',
                  desc: 'Foundation laying is traditionally performed in Brahma Muhurtham or before noon for auspicious results.',
                  color: 'text-secondary',
                  bg: 'bg-secondary/5 border-secondary/10',
                },
                {
                  icon: '🌟',
                  title: 'Nakshatra Check',
                  desc: 'Cross-reference with your birth star (நட்சத்திரம்) before finalising. Consult a trusted astrologer for personal alignment.',
                  color: 'text-dark',
                  bg: 'bg-dark/5 border-dark/10',
                  isEmoji: true,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                  className={`p-8 md:p-10 rounded-[2.5rem] border ${card.bg}`}
                >
                  <div className={`${card.color} mb-6 text-3xl`}>
                    {card.icon}
                  </div>
                  <h4 className={`font-black uppercase tracking-[0.2em] text-[10px] mb-3 ${card.color}`}>
                    {card.title}
                  </h4>
                  <p className="text-sm text-dark/50 font-light leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 md:py-28 px-6">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-[2.5rem] md:rounded-[4rem] px-6 py-16 md:p-20 text-center text-white shadow-2xl relative overflow-hidden grain"
            >
              <div className="absolute inset-0 opacity-[0.07]">
                <img src={heroBg} alt="Decorative background pattern" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-tight">
                  Plan Your Foundation <br />
                  <span className="text-primary">on the Right Day.</span>
                </h2>
                <p className="text-white/40 text-xs md:text-base mb-10 max-w-lg mx-auto font-light leading-relaxed">
                  Our team helps you schedule your foundation muhurtham around the auspicious dates — while managing
                  the full construction process.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#1a1a1a' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-10 md:px-16 py-5 md:py-6 border border-white/20 rounded-full font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs transition-all duration-500 text-white no-underline"
                >
                  Book a Consultation
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  )
}

export default MuhurthamDatesPage


