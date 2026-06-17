import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSliders, FiActivity, FiShield, FiTrendingUp, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiPercent } from 'react-icons/fi'
import { measurementEffects, yogaCombinations } from '../../data/manaiyadiData'

// ─── Manaiyadi Sastram accuracy engine ────────────────────────────────────────
// Each factor carries a weight that reflects its classical importance.
// Total possible weight = 100 points.
//
// Factor breakdown:
//   1. Ayam > Vyayam              → 30 pts  (primary Manaiyadi rule)
//   2. Ayam-Vyayam ratio quality  → 10 pts  (how much surplus)
//   3. Length dimension status    → 15 pts
//   4. Width dimension status     → 15 pts
//   5. Yoni (direction) quality   → 10 pts
//   6. Nakshatra quality          → 8 pts
//   7. Vaaram (day) quality       → 7 pts
//   8. Amsham quality             → 5 pts  (was: binary included in isAuspicious)
// ──────────────────────────────────────────────────────────────────────────────

const NAKSATRAS = [
  "Ashwini","Bharani","Krittika","Rohini","Mrigashirsha","Ardra",
  "Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni",
  "Hasta","Chitra","Svati","Vishakha","Anuradha","Jyeshtha",
  "Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta",
  "Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
]

// Auspicious nakshatras per classical Manaiyadi / Vastu tradition
const AUSPICIOUS_NAKSHATRAS = new Set([
  "Ashwini","Rohini","Mrigashirsha","Punarvasu","Pushya",
  "Uttara Phalguni","Hasta","Chitra","Svati","Anuradha",
  "Uttara Ashadha","Shravana","Dhanishta","Uttara Bhadrapada","Revati"
])

const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
// Auspicious days: Sun, Wed, Thu, Fri per Manaiyadi tradition
const AUSPICIOUS_DAYS = new Set(["Sunday","Wednesday","Thursday","Friday"])

// Yoni index → { name, favorable: bool }
// 0=Kaka(NE) bad, 1=Garuda(E) good, 2=Dhuma(SE) bad, 3=Simha(S) good
// 4=Shwana(SW) bad, 5=Vrisha(W) neutral, 6=Khara(NW) bad, 7=Gaja(N) good
const YONI_DATA = [
  { name: "Kaka (NE)",    quality: "unfavorable" },
  { name: "Garuda (East)",quality: "favorable"   },
  { name: "Dhuma (SE)",   quality: "unfavorable" },
  { name: "Simha (South)",quality: "favorable"   },
  { name: "Shwana (SW)",  quality: "unfavorable" },
  { name: "Vrisha (West)",quality: "neutral"     },
  { name: "Khara (NW)",   quality: "unfavorable" },
  { name: "Gaja (North)", quality: "favorable"   },
]

function statusScore(status) {
  if (status === 'favorable')   return 1
  if (status === 'neutral')     return 0.5
  return 0  // unfavorable
}

function computeAccuracy(length, width) {
  const area    = length * width
  const ayam    = ((area * 8) % 12)  || 12
  const vyayam  = ((area * 9) % 10)  || 10
  const yoniIdx = (area * 3) % 8
  const nakIdx  = (area * 8) % 27
  const vaaram  = (area * 9) % 7
  const amsham  = ((area * 4) % 9)   || 9
  const aayul   = ((area * 8) % 120) || 120

  const yoni      = YONI_DATA[yoniIdx]
  const nakshatra = NAKSATRAS[nakIdx]
  const day       = WEEKDAYS[vaaram]

  const lengthEff = measurementEffects[length] || { effect: "Neutral Influence", status: "neutral" }
  const widthEff  = measurementEffects[width]  || { effect: "Neutral Influence", status: "neutral" }

  // ── Yoga combination bonus ─────────────────────────────────────────────────
  const yogaKey = `${length} ft x ${width} ft`
  const isYoga  = yogaCombinations.includes(yogaKey)

  // ── Score each factor ──────────────────────────────────────────────────────
  let score = 0
  const breakdown = []

  // 1. Ayam > Vyayam  (30 pts)
  const ayamWins = ayam > vyayam
  const f1 = ayamWins ? 30 : 0
  score += f1
  breakdown.push({ label: 'Ayam vs Vyayam', earned: f1, max: 30, pass: ayamWins })

  // 2. Ayam-Vyayam surplus quality  (10 pts)
  //    surplus ratio: (ayam - vyayam) / ayam  →  0..1
  const surplus = ayamWins ? (ayam - vyayam) / ayam : 0
  const f2 = Math.round(surplus * 10)
  score += f2
  breakdown.push({ label: 'Income Surplus', earned: f2, max: 10, pass: f2 >= 5 })

  // 3. Length dimension  (15 pts)
  const f3 = Math.round(statusScore(lengthEff.status) * 15)
  score += f3
  breakdown.push({ label: 'Length Dimension', earned: f3, max: 15, pass: lengthEff.status === 'favorable' })

  // 4. Width dimension  (15 pts)
  const f4 = Math.round(statusScore(widthEff.status) * 15)
  score += f4
  breakdown.push({ label: 'Width Dimension', earned: f4, max: 15, pass: widthEff.status === 'favorable' })

  // 5. Yoni  (10 pts)
  const f5 = Math.round(statusScore(yoni.quality) * 10)
  score += f5
  breakdown.push({ label: 'Yoni (Direction)', earned: f5, max: 10, pass: yoni.quality === 'favorable' })

  // 6. Nakshatra  (8 pts)
  const nakPass = AUSPICIOUS_NAKSHATRAS.has(nakshatra)
  const f6 = nakPass ? 8 : 0
  score += f6
  breakdown.push({ label: 'Nakshatra', earned: f6, max: 8, pass: nakPass })

  // 7. Vaaram  (7 pts)
  const dayPass = AUSPICIOUS_DAYS.has(day)
  const f7 = dayPass ? 7 : 0
  score += f7
  breakdown.push({ label: 'Vaaram (Day)', earned: f7, max: 7, pass: dayPass })

  // 8. Amsham  (5 pts) — 1,2,3,5,6,7 are auspicious
  const amPass = [1,2,3,5,6,7].includes(amsham)
  const f8 = amPass ? 5 : 0
  score += f8
  breakdown.push({ label: 'Amsham', earned: f8, max: 5, pass: amPass })

  // Yoga bonus: if it's a classical yoga pair, +5 bonus (uncapped, reflected in label)
  const yogaBonus = isYoga ? 5 : 0
  const totalMax  = 100 + yogaBonus

  const accuracy = Math.round((score + yogaBonus) / totalMax * 100)

  // Clamp to 100 for display
  const displayAccuracy = Math.min(accuracy, 100)

  const grade =
    displayAccuracy >= 80 ? 'Excellent'  :
    displayAccuracy >= 60 ? 'Good'       :
    displayAccuracy >= 40 ? 'Moderate'   :
                            'Unfavourable'

  return {
    area, ayam, vyayam, aayul,
    yoni: yoni.name,
    yoniQuality: yoni.quality,
    nakshatra, vaaram, amsham,
    isAuspicious: ayamWins && yoni.quality === 'favorable',
    lengthEffect: lengthEff,
    widthEffect:  widthEff,
    accuracy: displayAccuracy,
    grade,
    breakdown,
    isYoga,
  }
}

const ManaiyadiCalculator = () => {
  const [length, setLength] = useState(21)
  const [width, setWidth] = useState(16)
  const [results, setResults] = useState(null)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const calculateSastram = () => {
    setResults(computeAccuracy(length, width))
  }

  useEffect(() => {
    calculateSastram()
  }, [length, width])

  // Derive accuracy colour
  const accuracyColor = results
    ? results.accuracy >= 80 ? 'text-primary'
    : results.accuracy >= 60 ? 'text-yellow-600'
    : results.accuracy >= 40 ? 'text-orange-500'
    : 'text-secondary'
    : 'text-dark'

  const accuracyBarColor = results
    ? results.accuracy >= 80 ? 'bg-primary'
    : results.accuracy >= 60 ? 'bg-yellow-500'
    : results.accuracy >= 40 ? 'bg-orange-500'
    : 'bg-secondary'
    : 'bg-dark'

  return (
    <div className="relative group">
      {/* Decorative backdrop glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3rem] border border-white p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden grain">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Controls - Left side (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-dark flex items-center justify-center text-white">
                <FiSliders size={18} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-dark tracking-tight uppercase">Configuration</h3>
                <p className="text-[9px] md:text-[10px] font-bold text-dark/30 tracking-[0.2em] uppercase">Set your dimensions</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black uppercase tracking-widest text-dark/40">Length Dimension</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-dark leading-none">{length}</span>
                    <span className="text-xs font-bold text-dark/20 uppercase tracking-tighter">Feet</span>
                  </div>
                </div>
                <div className="relative h-1.5 w-full bg-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(length / 100) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <input 
                    type="range" min="6" max="100" value={length} 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black uppercase tracking-widest text-dark/40">Width Dimension</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-dark leading-none">{width}</span>
                    <span className="text-xs font-bold text-dark/20 uppercase tracking-tighter">Feet</span>
                  </div>
                </div>
                <div className="relative h-1.5 w-full bg-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(width / 100) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <input 
                    type="range" min="6" max="100" value={width} 
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>
            </div>

            {/* ── ACCURACY METER ── */}
            {results && (
              <div className="pt-8 border-t border-dark/5 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiPercent size={14} className="text-dark/30" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-dark/40">Auspiciousness Score</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={results.accuracy}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-3xl font-black leading-none ${accuracyColor}`}
                    >
                      {results.accuracy}
                    </motion.span>
                    <span className="text-xs font-bold text-dark/20">/ 100</span>
                  </div>
                </div>

                {/* Segmented accuracy bar */}
                <div className="relative h-3 w-full bg-dark/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute h-full rounded-full ${accuracyBarColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${results.accuracy}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  />
                </div>

                {/* Grade badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border ${
                    results.grade === 'Excellent'    ? 'bg-primary/5 border-primary/20 text-primary'    :
                    results.grade === 'Good'         ? 'bg-yellow-50 border-yellow-200 text-yellow-700'  :
                    results.grade === 'Moderate'     ? 'bg-orange-50 border-orange-200 text-orange-600'  :
                    'bg-secondary/5 border-secondary/20 text-secondary'
                  }`}>{results.grade}</span>
                  {results.isYoga && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      ✦ Yoga Pair
                    </span>
                  )}
                </div>

                {/* Factor breakdown toggle */}
                <button
                  onClick={() => setShowBreakdown(b => !b)}
                  className="w-full flex items-center justify-between px-5 py-3 bg-dark/[0.03] hover:bg-dark/[0.06] rounded-2xl border border-dark/5 transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-dark/40">Factor Breakdown</span>
                  <motion.span
                    animate={{ rotate: showBreakdown ? 180 : 0 }}
                    className="text-dark/30 text-xs"
                  >▾</motion.span>
                </button>

                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-1">
                        {results.breakdown.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.pass ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                              {item.pass
                                ? <FiCheckCircle size={10} className="text-primary" />
                                : <FiXCircle    size={10} className="text-secondary" />
                              }
                            </div>
                            <span className="text-[10px] font-bold text-dark/50 flex-1">{item.label}</span>
                            <span className={`text-[10px] font-black ${item.pass ? 'text-primary' : 'text-secondary'}`}>
                              {item.earned}/{item.max}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="pt-4 border-t border-dark/5">
              <div className="flex items-start gap-4 p-6 bg-dark/[0.02] rounded-3xl border border-dark/5">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <FiActivity size={16} />
                </div>
                <p className="text-[11px] text-dark/50 leading-relaxed font-medium">
                  Manaiyadi calculations compare <span className="text-dark font-black">Ayam (income)</span> and <span className="text-dark font-black">Vyayam (expense)</span>. A favourable result typically means Ayam is greater than Vyayam.
                </p>
              </div>
            </div>
          </div>

          {/* Visualization - Right side (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {results && (
                <motion.div 
                  key={`${length}-${width}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  {/* Result Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="px-6 py-2 bg-dark rounded-full">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{results.area} SQ.FT TOTAL</span>
                    </div>
                    <div className={`flex items-center gap-2 ${results.isAuspicious ? 'text-primary' : 'text-secondary'}`}>
                      <FiShield size={18} />
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">{results.isAuspicious ? 'Favourable Result' : 'Review Recommended'}</span>
                    </div>
                  </div>

                  {/* ── ACCURACY RING + GRADE (prominent) ── */}
                  <div className="mb-8 p-6 md:p-8 rounded-[2rem] border border-dark/5 bg-cream/40 flex items-center gap-6 md:gap-8">
                    {/* SVG ring */}
                    <div className="relative shrink-0 w-24 h-24 md:w-28 md:h-28">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-dark/5" />
                        <motion.circle
                          cx="50" cy="50" r="42"
                          fill="none"
                          strokeWidth="8"
                          strokeLinecap="round"
                          className={accuracyBarColor.replace('bg-', 'text-')}
                          stroke="currentColor"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - results.accuracy / 100) }}
                          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                          key={results.accuracy}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1,   opacity: 1 }}
                          className={`text-xl md:text-2xl font-black leading-none ${accuracyColor}`}
                        >
                          {results.accuracy}%
                        </motion.span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-dark/30 mb-1">Manaiyadi Score</p>
                      <p className={`text-2xl md:text-3xl font-black tracking-tight uppercase ${accuracyColor}`}>{results.grade}</p>
                      <p className="text-[10px] text-dark/40 font-medium mt-2 leading-snug">
                        Weighted across Ayam/Vyayam, dimension effects, Yoni, Nakshatra, Vaaram &amp; Amsham
                      </p>
                      {results.isYoga && (
                        <span className="inline-block mt-3 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          ✦ Classical Yoga Combination
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-6 md:p-8 bg-cream/50 rounded-[2rem] md:rounded-[2.5rem] border border-dark/5 group/card hover:bg-primary transition-all duration-500">
                      <p className="text-[9px] font-black text-dark/30 uppercase tracking-widest mb-3 md:mb-4 group-hover/card:text-white/40">Ayam (Income)</p>
                      <div className="text-4xl md:text-5xl font-black text-primary group-hover/card:text-white transition-colors">{results.ayam}</div>
                      <div className="mt-4 w-8 h-1 bg-primary group-hover/card:bg-white transition-all"></div>
                    </div>
                    <div className="p-6 md:p-8 bg-cream/50 rounded-[2rem] md:rounded-[2.5rem] border border-dark/5 group/card hover:bg-secondary transition-all duration-500">
                      <p className="text-[9px] font-black text-dark/30 uppercase tracking-widest mb-3 md:mb-4 group-hover/card:text-white/40">Vyayam (Expense)</p>
                      <div className="text-4xl md:text-5xl font-black text-secondary group-hover/card:text-white transition-colors">{results.vyayam}</div>
                      <div className="mt-4 w-8 h-1 bg-secondary group-hover/card:bg-white transition-all"></div>
                    </div>
                  </div>

                  {/* Secondary Details */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Direction', val: results.yoni, icon: <FiMapPin /> },
                      { label: 'Nakshatra', val: results.nakshatra, icon: <FiTrendingUp /> },
                      { label: 'Aayul', val: `${results.aayul} yrs`, icon: <FiClock /> },
                      { label: 'Amsham', val: results.amsham, icon: <FiShield /> }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-dark/5 rounded-[2rem] hover:shadow-xl transition-all duration-300">
                        <div className="text-dark/20 mb-3">{item.icon}</div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-dark/30 mb-1">{item.label}</p>
                        <p className="text-[11px] font-black text-dark uppercase tracking-tighter text-center">{item.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Effects Summary */}
                  <div className="space-y-4">
                    <div className={`p-4 rounded-2xl border flex items-center gap-4 ${results.lengthEffect.status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : results.lengthEffect.status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/60'}`}>
                      {results.lengthEffect.status === 'favorable' ? <FiCheckCircle size={14}/> : results.lengthEffect.status === 'unfavorable' ? <FiXCircle size={14}/> : <FiActivity size={14}/>}
                      <p className="text-[10px] font-bold uppercase tracking-wider">Length ({length}ft): {results.lengthEffect.effect}</p>
                    </div>
                    <div className={`p-4 rounded-2xl border flex items-center gap-4 ${results.widthEffect.status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : results.widthEffect.status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/60'}`}>
                      {results.widthEffect.status === 'favorable' ? <FiCheckCircle size={14}/> : results.widthEffect.status === 'unfavorable' ? <FiXCircle size={14}/> : <FiActivity size={14}/>}
                      <p className="text-[10px] font-bold uppercase tracking-wider">Width ({width}ft): {results.widthEffect.effect}</p>
                    </div>
                  </div>

                  {/* Bottom Message */}
                  <div className="mt-8 text-center">
                    <p className="text-[9px] font-bold text-dark/20 uppercase tracking-[0.4em]">Based on traditional Manaiyadi Sastram formulas</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManaiyadiCalculator