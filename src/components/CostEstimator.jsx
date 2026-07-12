import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiLayers, FiMapPin, FiSliders, FiArrowRight, FiCheck,
         FiDownload, FiShare2, FiInfo, FiChevronDown, FiZap } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

// ─── Pricing Data (₹ per sq.ft, Tamil Nadu 2025 rates) ───────────────────────
const FINISH_RATES = {
  basic:    { label: 'Basic',    sublabel: 'Simple finishes, standard materials', color: '#6b7280', rate: 1650 },
  standard: { label: 'Standard', sublabel: 'Good quality, mid-range materials',   color: '#B85C38', rate: 2100 },
  premium:  { label: 'Premium',  sublabel: 'High-end, imported/luxury materials', color: '#2D4B37', rate: 2800 },
}

const COST_BREAKDOWN = {
  basic:    { structure:40, brickwork:15, roofing:10, flooring:8, electrical:8, plumbing:8, doors:6, painting:5 },
  standard: { structure:38, brickwork:14, roofing:10, flooring:9, electrical:9, plumbing:8, doors:7, painting:5 },
  premium:  { structure:35, brickwork:13, roofing:10, flooring:12, electrical:10, plumbing:9, doors:7, painting:4 },
}

const BREAKDOWN_LABELS = {
  structure:   { label: 'Structure & Foundation', icon: '🏗️' },
  brickwork:   { label: 'Brickwork & Masonry',    icon: '🧱' },
  roofing:     { label: 'Roofing & Slab',         icon: '🏠' },
  flooring:    { label: 'Flooring & Tiling',      icon: '⬜' },
  electrical:  { label: 'Electrical Works',        icon: '⚡' },
  plumbing:    { label: 'Plumbing & Sanitation',  icon: '🚿' },
  doors:       { label: 'Doors, Windows & Grills', icon: '🚪' },
  painting:    { label: 'Painting & Finishing',   icon: '🎨' },
}

const LOCATION_MULTIPLIER = {
  chennai:    { label: 'Chennai',     mult: 1.15 },
  coimbatore: { label: 'Coimbatore',  mult: 1.00 },
  madurai:    { label: 'Madurai',     mult: 0.95 },
  salem:      { label: 'Salem',       mult: 0.93 },
  trichy:     { label: 'Trichy',      mult: 0.94 },
  tirunelveli:{ label: 'Tirunelveli', mult: 0.91 },
  erode:      { label: 'Erode',       mult: 0.92 },
  vellore:    { label: 'Vellore',     mult: 0.96 },
  other:      { label: 'Other / Rural', mult: 0.88 },
}

const PLOT_PRESETS = [600, 800, 1000, 1200, 1500, 2000, 2400, 3000]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`
  return `₹${n.toLocaleString('en-IN')}`
}

function calcCost(plotSqft, floors, finish, locationKey) {
  const builtUp = plotSqft * 0.7 * floors          // ~70% coverage per floor
  const loc     = LOCATION_MULTIPLIER[locationKey]
  const baseRate = FINISH_RATES[finish].rate
  const rate     = baseRate * loc.mult
  const total    = Math.round(builtUp * rate)
  const brkPct   = COST_BREAKDOWN[finish]

  const items = Object.entries(brkPct).map(([key, pct]) => ({
    ...BREAKDOWN_LABELS[key],
    key,
    pct,
    amount: Math.round(total * pct / 100),
  }))

  return { builtUp: Math.round(builtUp), rate: Math.round(rate), total, items, loc }
}

// ─── AnimatedNumber ───────────────────────────────────────────────────────────
function AnimatedNumber({ value, formatter }) {
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    let start = display
    const end = value
    const duration = 600
    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])
  return <span>{formatter ? formatter(display) : display.toLocaleString('en-IN')}</span>
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CostEstimator({ compact = false }) {
  const [plotSqft,  setPlotSqft]  = useState(1200)
  const [customPlot, setCustomPlot] = useState('')
  const [floors,    setFloors]    = useState(1)
  const [finish,    setFinish]    = useState('standard')
  const [location,  setLocation]  = useState('coimbatore')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [step, setStep] = useState(1)   // wizard step for compact/mobile

  const result = calcCost(plotSqft, floors, finish, location)
  const min    = calcCost(plotSqft, floors, 'basic',   location).total
  const max    = calcCost(plotSqft, floors, 'premium',  location).total

  const waMsg = encodeURIComponent(
    `🏗️ *Cost Estimate Request — KARRCHOLAI*\n` +
    `──────────────────────\n` +
    `📐 Plot Size: ${plotSqft} sq.ft\n` +
    `🏠 Floors: ${floors}\n` +
    `✨ Finish: ${FINISH_RATES[finish].label}\n` +
    `📍 Location: ${LOCATION_MULTIPLIER[location].label}\n` +
    `💰 Estimated Cost: ${formatINR(result.total)}\n` +
    `──────────────────────\n` +
    `I'd like a detailed quote from your team.`
  )

  return (
    <div className={`w-full ${compact ? '' : 'max-w-6xl mx-auto'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── LEFT: Inputs ──────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-5">

          {/* Plot Size */}
          <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FiHome size={15} className="text-secondary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Step 1</p>
                <p className="text-sm font-black text-dark">Plot / Built-up Area (sq.ft)</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {PLOT_PRESETS.map(p => (
                <button key={p} onClick={() => { setPlotSqft(p); setCustomPlot('') }}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-black transition-all duration-200 border-2 ${
                    plotSqft === p && !customPlot
                      ? 'bg-dark text-white border-dark'
                      : 'bg-[#fafaf9] text-dark border-dark/8 hover:border-dark/25'
                  }`}>
                  {p.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input type="number" placeholder="Custom sq.ft…" value={customPlot}
                onChange={e => { setCustomPlot(e.target.value); if (e.target.value) setPlotSqft(Number(e.target.value)) }}
                className="flex-1 bg-[#fafaf9] rounded-2xl border-2 border-dark/8 px-4 py-3 text-sm font-bold text-dark focus:outline-none focus:border-secondary transition-colors"
              />
              <span className="text-xs text-dark/30 font-bold shrink-0">sq.ft</span>
            </div>
            <p className="text-[10px] text-dark/35 mt-2 font-medium">Built-up area estimated at ~70% plot coverage per floor</p>
          </div>

          {/* Floors */}
          <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <FiLayers size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Step 2</p>
                <p className="text-sm font-black text-dark">Number of Floors</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(f => (
                <button key={f} onClick={() => setFloors(f)}
                  className={`py-4 rounded-2xl font-black text-lg transition-all duration-200 border-2 ${
                    floors === f ? 'bg-primary text-white border-primary shadow-lg' : 'bg-[#fafaf9] text-dark border-dark/8 hover:border-primary/30'
                  }`}>
                  {f}G
                  <span className={`block text-[9px] font-bold ${floors === f ? 'text-white/60' : 'text-dark/30'}`}>
                    {f === 1 ? 'Ground' : f === 2 ? 'G+1' : f === 3 ? 'G+2' : 'G+3'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Finish Quality */}
          <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FiSliders size={15} className="text-secondary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Step 3</p>
                <p className="text-sm font-black text-dark">Finish Quality</p>
              </div>
            </div>
            <div className="space-y-3">
              {Object.entries(FINISH_RATES).map(([key, data]) => (
                <button key={key} onClick={() => setFinish(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    finish === key ? 'border-secondary bg-secondary/5' : 'border-dark/8 bg-[#fafaf9] hover:border-dark/20'
                  }`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    finish === key ? 'border-secondary bg-secondary' : 'border-dark/20'
                  }`}>
                    {finish === key && <FiCheck size={11} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-dark">{data.label}</p>
                    <p className="text-[10px] text-dark/40 font-medium">{data.sublabel}</p>
                  </div>
                  <span className="text-xs font-black text-dark/50">₹{data.rate.toLocaleString()}/sq.ft</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <FiMapPin size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Step 4</p>
                <p className="text-sm font-black text-dark">Project Location</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(LOCATION_MULTIPLIER).map(([key, data]) => (
                <button key={key} onClick={() => setLocation(key)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all duration-200 border-2 text-center ${
                    location === key ? 'bg-primary text-white border-primary' : 'bg-[#fafaf9] text-dark border-dark/8 hover:border-primary/30'
                  }`}>
                  {data.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Result ─────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Hero Cost Card */}
          <motion.div
            key={result.total}
            initial={{ scale: 0.97, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #2D4B37 0%, #1a2e20 100%)' }}
          >
            {/* Decorative orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-secondary/10 pointer-events-none" />

            <div className="relative p-6">
              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">Estimated Total Cost</p>
              <p className="text-white text-4xl font-black leading-none mb-1">
                <AnimatedNumber value={result.total} formatter={formatINR} />
              </p>
              <p className="text-white/40 text-xs font-medium mb-5">
                ₹<AnimatedNumber value={result.rate} /> per sq.ft · <AnimatedNumber value={result.builtUp} /> sq.ft built-up
              </p>

              {/* Range bar */}
              <div className="mb-5">
                <div className="flex justify-between text-[9px] text-white/40 font-bold mb-1">
                  <span>Basic {formatINR(min)}</span>
                  <span>Premium {formatINR(max)}</span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="absolute h-full bg-secondary/60 rounded-full" style={{ width: '100%' }} />
                  <motion.div
                    className="absolute h-full w-3 bg-white rounded-full -translate-x-1/2 shadow-lg"
                    animate={{ left: `${((result.total - min) / (max - min)) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120 }}
                  />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'Plot', val: `${plotSqft.toLocaleString()} sq.ft` },
                  { label: 'Floors', val: `${floors} Floor${floors > 1 ? 's' : ''}` },
                  { label: 'Finish', val: FINISH_RATES[finish].label },
                  { label: 'Location', val: LOCATION_MULTIPLIER[location].label },
                ].map(item => (
                  <div key={item.label} className="bg-white/5 rounded-2xl px-3 py-2.5">
                    <p className="text-white/35 text-[9px] font-black uppercase tracking-wider">{item.label}</p>
                    <p className="text-white text-xs font-black mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href={`https://wa.me/919741416747?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-black py-3.5 rounded-2xl hover:bg-[#1ebe57] transition-colors text-sm shadow-lg">
                <FaWhatsapp size={18} />
                Get Detailed Quote on WhatsApp
              </a>

              <p className="text-white/25 text-[9px] text-center mt-3 font-medium leading-relaxed">
                * Estimate only. Actual cost may vary based on site conditions, design complexity & material selection. GST extra.
              </p>
            </div>
          </motion.div>

          {/* Cost Breakdown Accordion */}
          <div className="bg-white rounded-3xl border border-dark/8 shadow-sm overflow-hidden">
            <button onClick={() => setShowBreakdown(b => !b)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-dark/[0.02] transition-colors">
              <div className="flex items-center gap-2">
                <FiSliders size={13} className="text-secondary" />
                <span className="text-sm font-black text-dark">Cost Breakdown</span>
              </div>
              <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <FiChevronDown size={16} className="text-dark/40" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showBreakdown && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-dark/5">
                  <div className="px-5 py-4 space-y-3">
                    {result.items.map(item => (
                      <div key={item.key}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-[11px] font-bold text-dark/60">{item.label}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] font-black text-dark">{formatINR(item.amount)}</span>
                            <span className="text-[9px] text-dark/30 ml-1">{item.pct}%</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-dark/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.pct}%` }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tips card */}
          <div className="bg-secondary/5 border border-secondary/15 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiInfo size={14} className="text-secondary" />
              <p className="text-xs font-black text-secondary">Construction Tips</p>
            </div>
            <ul className="space-y-2">
              {[
                'Plan your electrical & plumbing in advance to avoid rework costs',
                'Avoid monsoon months (Jun–Sep) for foundation & slab work in TN',
                'Use Vastu-compliant layouts to avoid costly demolitions later',
                'PMC (Project Management) saves 10–15% vs self-managed builds',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] text-dark/50 font-medium leading-relaxed">
                  <FiCheck size={10} className="text-secondary mt-0.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
