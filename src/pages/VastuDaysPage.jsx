import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiClock, FiSun, FiCompass } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import heroBg from '../assets/manaiyadi_hero.png'

// ── VASTU CONSTRUCTION DAYS 2026 (from physical Tamil almanac) ──────────────
const vastuDays = [
  { tamilMonth: 'தை',       date: 12, weekday: 'திங்கள்', engDate: '26.01.26', time: '10.41 - 11.17' },
  { tamilMonth: 'மாசி',     date: 22, weekday: 'வெள்ளி',  engDate: '06.03.26', time: '10.32 - 11.08' },
  { tamilMonth: 'சித்திரை', date: 10, weekday: 'வியாழன்', engDate: '23.04.26', time: '8.54 - 9.30'   },
  { tamilMonth: 'வைகாசி',  date: 21, weekday: 'வியாழன்', engDate: '04.06.26', time: '9.58 - 10.34'  },
  { tamilMonth: 'ஆடி',     date: 11, weekday: 'திங்கள்', engDate: '27.07.26', time: '7.44 - 8.20'   },
  { tamilMonth: 'ஆவணி',   date: 6,  weekday: 'ஞாயிறு',  engDate: '23.08.26', time: '7.23 - 7.59'   },
  { tamilMonth: 'ஐப்பசி',  date: 11, weekday: 'புதன்',   engDate: '28.10.26', time: '7.44 - 8.20'   },
  { tamilMonth: 'கார்த்தி', date: 8,  weekday: 'செவ்வாய்',engDate: '24.11.26', time: '11.29 - 12.05' },
]

const weekdayMap = {
  'திங்கள்': 'Monday',
  'வெள்ளி':  'Friday',
  'வியாழன்': 'Thursday',
  'ஞாயிறு':  'Sunday',
  'புதன்':   'Wednesday',
  'செவ்வாய்':'Tuesday',
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

const tamilFont = { fontFamily: "'Noto Sans Tamil', 'Latha', serif" }

const VastuDaysPage = () => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark font-sans overflow-x-hidden">
      <Helmet>
        <title>Vastu Muhurtham Dates 2026 Tamil Nadu | Karrcholai Construction</title>
        <meta
          name="description"
          content="Precise Muhurtham time windows for Vastu foundation-laying in each Tamil month of 2026. Traditional morning muhurtham times for home construction, curated by Karrcholai Construction."
        />
        <link rel="canonical" href="https://karrcholai.com/manaiyadi/vastu-days" />
        <meta property="og:title" content="Vastu Foundation Muhurtham Dates 2026 | Karrcholai" />
        <meta property="og:description" content="Precise morning Muhurtham windows for Vastu foundation-laying in each Tamil month of 2026. Curated by Karrcholai Construction, Tamil Nadu." />
        <meta property="og:url" content="https://karrcholai.com/manaiyadi/vastu-days" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
            { "@type": "ListItem", "position": 2, "name": "Manaiyadi Sastram", "item": "https://karrcholai.com/manaiyadi" },
            { "@type": "ListItem", "position": 3, "name": "Vastu Days 2026", "item": "https://karrcholai.com/manaiyadi/vastu-days" }
          ]
        })}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100svh", backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75 pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white font-black tracking-[0.5em] md:tracking-[0.8em] uppercase text-[10px] md:text-xs mb-6">
                Foundation Muhurtham
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase" style={tamilFont}>
                வாஸ்து செய்யும்
                <br />
                <span className="text-secondary italic">நாட்கள்.</span>
              </h1>
              <p className="text-white/60 text-sm md:text-lg font-light max-w-xl mx-auto leading-relaxed mt-6">
                Precise morning Muhurtham windows for each Tamil month — the exact time to lay your home's first stone.
              </p>
            </motion.div>
          </div>

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
              { value: vastuDays.length, label: 'Muhurtham Days' },
              { value: '8', label: 'Tamil Months' },
              { value: 'காலை', label: 'Morning Windows' },
              { value: '2026', label: 'Tamil Calendar Year' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 md:px-8">
                <p className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2" style={i === 2 ? tamilFont : {}}>{stat.value}</p>
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
                2026 Schedule
              </h3>
              <h2 className="text-4xl md:text-6xl font-black text-dark leading-[0.9] tracking-tighter uppercase">
                Muhurtham <br />
                <span className="text-secondary">Windows.</span>
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
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      className="group hover:bg-secondary/[0.03] transition-colors"
                    >
                      <td className="px-10 py-8">
                        <span className="text-2xl font-black text-dark group-hover:text-secondary transition-colors tracking-tighter" style={tamilFont}>
                          {row.tamilMonth}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/5 border border-primary/15 text-primary text-base font-black">
                          {row.date}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div>
                          <span className="text-sm font-bold text-dark/70" style={tamilFont}>{row.weekday}</span>
                          <span className="block text-[10px] text-dark/30 font-medium mt-0.5">
                            {weekdayMap[row.weekday] || ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-sm font-black text-dark/70 tracking-wide">{row.engDate}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/5 border border-secondary/20 text-secondary">
                          <FiClock size={12} />
                          <span className="text-[11px] font-black tracking-widest">{row.time}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {vastuDays.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white border border-dark/5 rounded-[1.5rem] overflow-hidden shadow-sm"
                >
                  <div className="flex items-center gap-4 p-5 pb-0">
                    <span className="w-12 h-12 rounded-full bg-primary/5 border border-primary/15 flex items-center justify-center text-primary font-black text-lg flex-shrink-0">
                      {row.date}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-dark text-xl tracking-tight" style={tamilFont}>{row.tamilMonth}</p>
                      <p className="text-[10px] text-dark/35 font-bold mt-0.5" style={tamilFont}>
                        {row.weekday} &nbsp;·&nbsp; {row.engDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 px-5 py-4 bg-secondary/5 border-t border-secondary/10">
                    <FiClock size={14} className="text-secondary flex-shrink-0" />
                    <span className="text-sm font-black text-secondary tracking-wide">{row.time}</span>
                    <span className="ml-auto text-[9px] font-bold text-dark/25 uppercase tracking-widest" style={tamilFont}>காலை</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <motion.div
              {...fadeInUp}
              className="mt-10 md:mt-14 p-8 md:p-10 bg-dark rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <FiSun className="text-white/50" size={18} />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">
                  Traditional Guideline
                </h5>
                <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                  All times shown are <span className="text-white/75 font-semibold" style={tamilFont}>காலை (morning)</span> muhurtham
                  windows. Consult your family astrologer for personalised alignment with your birth star{' '}
                  <span className="text-white/75" style={tamilFont}>(நட்சத்திரம்)</span> before finalising the date.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── EXPLAINER CARDS ── */}
        <section className="py-16 md:py-32 px-6 bg-white border-t border-dark/5">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeInUp} className="mb-12">
              <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">Why It Matters</h3>
              <h2 className="text-3xl md:text-5xl font-black text-dark tracking-tighter uppercase leading-tight">
                The Significance of <br />
                <span className="text-secondary">Vastu Muhurtham.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <FiCompass size={28} />,
                  title: 'Cosmic Alignment',
                  desc: 'Muhurtham windows are calculated to align planetary positions with construction activity, rooted in Jyotisha (Vedic astrology).',
                  colorClass: 'text-secondary bg-secondary/5 border-secondary/10',
                },
                {
                  icon: <FiClock size={28} />,
                  title: 'Precise Timing',
                  desc: 'Each window is typically 36–45 minutes long. Starting the bhoomi puja within this window is considered essential by tradition.',
                  colorClass: 'text-primary bg-primary/5 border-primary/10',
                },
                {
                  icon: <FiSun size={28} />,
                  title: 'Morning Sanctity',
                  desc: 'Foundation ceremonies are performed in the morning (காலை) — considered the most pure and energetically positive time of day.',
                  colorClass: 'text-dark bg-dark/5 border-dark/10',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                  className={`p-8 md:p-10 rounded-[2.5rem] border ${card.colorClass}`}
                >
                  <div className="mb-6">{card.icon}</div>
                  <h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-3">{card.title}</h4>
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
                  Ready to Lay the <br />
                  <span className="text-secondary">First Stone?</span>
                </h2>
                <p className="text-white/40 text-xs md:text-base mb-10 max-w-lg mx-auto font-light leading-relaxed">
                  We'll coordinate your Vastu muhurtham with your construction schedule — so the stars and the site are both ready.
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

export default VastuDaysPage




