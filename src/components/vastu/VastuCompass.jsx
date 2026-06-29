/**
 * VastuCompass.jsx
 * Interactive Vastu Direction Compass Tool
 *
 * Features:
 *  1. SVG compass dial — rotatable via drag or slider; "Use Device Compass" via
 *     DeviceOrientation API with iOS 13+ permission flow.
 *  2. Floor-plan image overlay — upload a plan, overlay the compass on top.
 *  3. Room-to-direction mapping panel — assign rooms to directions.
 *  4. Scoring engine — per-room rating + overall 0-100 gauge.
 *  5. Recommendations — plain-language advice for poorly placed rooms.
 *
 * Drop-in for a Tailwind + framer-motion + react-icons (v5) project.
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FiCompass, FiUpload, FiRotateCcw, FiInfo, FiChevronDown,
  FiCheckCircle, FiAlertTriangle, FiXCircle, FiSun, FiZap,
  FiMaximize2, FiSliders, FiX, FiChevronRight, FiZoomIn
} from 'react-icons/fi'
import { DIRECTIONS, ROOMS, scoreRoomPlacement, RATING_CONFIG } from '../../data/vastuData'

// ─── tiny helpers ──────────────────────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const normDeg = (d) => ((d % 360) + 360) % 360

// polar → cartesian on a unit circle of radius r centred at (cx,cy)
const polar = (cx, cy, r, angleDeg) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// ─── score engine ─────────────────────────────────────────────────────────────
function computeOverallScore(assignments) {
  const assigned = Object.entries(assignments).filter(([, v]) => v)
  if (!assigned.length) return 0
  const total = assigned.reduce((sum, [roomId, dirId]) => {
    return sum + scoreRoomPlacement(roomId, dirId).score
  }, 0)
  return Math.round(total / assigned.length)
}

// ─── Authentic Vastu Compass Dial ────────────────────────────────────────────
// 16 colour-coded zones, Sanskrit names, deity ring, element ring,
// Brahmasthan lotus centre, degree bezel, pointer needles

// 16 Vastu zones clockwise from North — each 22.5° wide
const VASTU_16 = [
  { id:'N',   abbr:'N',   sanskrit:'Kubera',   deity:'Kubera',   element:'Water', color:'#3B82F6', light:'#DBEAFE', deg:0    },
  { id:'NNE', abbr:'NNE', sanskrit:'Saumya',   deity:'Mukhya',   element:'Water', color:'#60A5FA', light:'#EFF6FF', deg:22.5 },
  { id:'NE',  abbr:'NE',  sanskrit:'Ishan',    deity:'Shiva',    element:'Space', color:'#818CF8', light:'#EEF2FF', deg:45   },
  { id:'ENE', abbr:'ENE', sanskrit:'Jayanta',  deity:'Jayanta',  element:'Air',   color:'#A78BFA', light:'#F5F3FF', deg:67.5 },
  { id:'E',   abbr:'E',   sanskrit:'Indra',    deity:'Indra',    element:'Air',   color:'#F59E0B', light:'#FEF3C7', deg:90   },
  { id:'ESE', abbr:'ESE', sanskrit:'Vitatha',  deity:'Vitatha',  element:'Air',   color:'#FBBF24', light:'#FFFBEB', deg:112.5},
  { id:'SE',  abbr:'SE',  sanskrit:'Agneya',   deity:'Agni',     element:'Fire',  color:'#EF4444', light:'#FEE2E2', deg:135  },
  { id:'SSE', abbr:'SSE', sanskrit:'Grihaksh', deity:'Pushan',   element:'Fire',  color:'#F87171', light:'#FEF2F2', deg:157.5},
  { id:'S',   abbr:'S',   sanskrit:'Yama',     deity:'Yama',     element:'Earth', color:'#92400E', light:'#FEF3C7', deg:180  },
  { id:'SSW', abbr:'SSW', sanskrit:'Nirriti',  deity:'Nirriti',  element:'Earth', color:'#B45309', light:'#FFFBEB', deg:202.5},
  { id:'SW',  abbr:'SW',  sanskrit:'Nairuta',  deity:'Nirriti',  element:'Earth', color:'#78350F', light:'#FEF3C7', deg:225  },
  { id:'WSW', abbr:'WSW', sanskrit:'Sugriva',  deity:'Sugriva',  element:'Earth', color:'#9A3412', light:'#FFF7ED', deg:247.5},
  { id:'W',   abbr:'W',   sanskrit:'Varuna',   deity:'Varuna',   element:'Air',   color:'#0EA5E9', light:'#E0F2FE', deg:270  },
  { id:'WNW', abbr:'WNW', sanskrit:'Pushpdnt', deity:'Pushp.',   element:'Air',   color:'#38BDF8', light:'#F0F9FF', deg:292.5},
  { id:'NW',  abbr:'NW',  sanskrit:'Vayavya',  deity:'Vayu',     element:'Air',   color:'#10B981', light:'#D1FAE5', deg:315  },
  { id:'NNW', abbr:'NNW', sanskrit:'Bhallata', deity:'Bhallat',  element:'Water', color:'#34D399', light:'#ECFDF5', deg:337.5},
]

function CompassDial({ rotation, assignments, onRotate }) {
  const CX = 240, CY = 240
  // Radii sized so every text band has ≥22px height
  const R_BEZEL_OUT = 228   // outer chrome ring
  const R_BEZEL_IN  = 210   // inner edge of degree-tick band
  const R_SEG_OUT   = 209   // outer edge of direction-abbrev ring  (≈18px wide)
  const R_SEG_MID   = 172   // boundary between abbrev & Sanskrit rings (≈37px wide outer band)
  const R_INNER_MID = 136   // boundary between Sanskrit & element rings (≈36px inner band)
  const R_SEG_IN    = 110   // inner edge of element band           (≈26px)
  const R_NEEDLE    = 102   // needle tip
  const R_HUB       = 24    // hub radius

  // drag state
  const dragging = useRef(false)
  const lastAngle = useRef(0)
  const svgRef = useRef(null)

  const getAngle = (e) => {
    const svg = svgRef.current
    if (!svg) return 0
    const rect = svg.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI)
  }

  const onPointerDown = (e) => {
    e.preventDefault()
    dragging.current = true
    lastAngle.current = getAngle(e)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  const onPointerMove = useCallback((e) => {
    if (!dragging.current) return
    const angle = getAngle(e)
    const delta = angle - lastAngle.current
    lastAngle.current = angle
    onRotate(prev => normDeg(prev + delta))
  }, [onRotate])

  const onPointerUp = useCallback(() => {
    dragging.current = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [onPointerMove])

  useEffect(() => () => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [onPointerMove, onPointerUp])

  // ── build a pie-slice path for one 22.5° segment ──────────────────────────
  const slicePath = (rOuter, rInner, startDeg, endDeg) => {
    const s1 = polar(CX, CY, rOuter, startDeg)
    const e1 = polar(CX, CY, rOuter, endDeg)
    const s2 = polar(CX, CY, rInner, endDeg)
    const e2 = polar(CX, CY, rInner, startDeg)
    return [
      `M ${s1.x} ${s1.y}`,
      `A ${rOuter} ${rOuter} 0 0 1 ${e1.x} ${e1.y}`,
      `L ${s2.x} ${s2.y}`,
      `A ${rInner} ${rInner} 0 0 0 ${e2.x} ${e2.y}`,
      'Z'
    ].join(' ')
  }

  // ── needle diamond helper ────────────────────────────────────────────────
  const needle = (aimDeg, tip, base, halfW) => {
    const t  = polar(CX, CY, tip,  aimDeg)
    const b  = polar(CX, CY, base, aimDeg)
    const wL = polar(CX, CY, halfW, aimDeg - 90)
    const wR = polar(CX, CY, halfW, aimDeg + 90)
    return `M ${b.x} ${b.y} L ${wL.x} ${wL.y} L ${t.x} ${t.y} L ${wR.x} ${wR.y} Z`
  }

  // ticks every 5° in the bezel
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg   = i * 5
    const is45  = deg % 45 === 0
    const is22  = deg % 22.5 === 0 && !is45
    const len   = is45 ? 13 : is22 ? 9 : 5
    const outer = polar(CX, CY, R_BEZEL_IN, deg)
    const inner = polar(CX, CY, R_BEZEL_IN - len, deg)
    return { deg, outer, inner, is45, is22 }
  })

  // which 8-direction IDs have rooms assigned
  const assignedIds = new Set(Object.values(assignments).filter(Boolean))

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 480"
      className="w-full h-full select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      role="img"
      aria-label={`Vastu compass rotated ${Math.round(rotation)}°. Drag to rotate and align North.`}
    >
      <defs>
        <filter id="vc-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00000022" />
        </filter>
        <radialGradient id="vc-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FAFBFC" />
          <stop offset="100%" stopColor="#E8EBF0" />
        </radialGradient>
        <radialGradient id="vc-hub" cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BEC5CF" />
        </radialGradient>
      </defs>

      {/* ── Background disc with shadow ── */}
      <circle cx={CX} cy={CY} r={R_BEZEL_OUT + 6} fill="url(#vc-bg)" filter="url(#vc-shadow)" />
      <circle cx={CX} cy={CY} r={R_BEZEL_OUT}     fill="#FFFFFF" stroke="#CBD5E1" strokeWidth={2} />

      {/* ══════════════════════════════════════
          ROTATING GROUP — all compass content
          ══════════════════════════════════════ */}
      <g transform={`rotate(${rotation}, ${CX}, ${CY})`}>

        {/* ── BAND 1: Outer colour segments (abbrev band) ── */}
        {VASTU_16.map((z) => {
          const s = z.deg - 11.25, e = z.deg + 11.25
          const isAssigned = assignedIds.has(z.id)
          return (
            <path key={`b1-${z.id}`}
              d={slicePath(R_SEG_OUT, R_SEG_MID, s, e)}
              fill={isAssigned ? z.color : z.light}
              stroke="#FFFFFF" strokeWidth={1.8}
            />
          )
        })}

        {/* ── BAND 2: Middle Sanskrit name band ── */}
        {VASTU_16.map((z) => {
          const s = z.deg - 11.25, e = z.deg + 11.25
          return (
            <path key={`b2-${z.id}`}
              d={slicePath(R_SEG_MID, R_INNER_MID, s, e)}
              fill={z.light}
              stroke="#FFFFFF" strokeWidth={1.2}
              opacity={0.92}
            />
          )
        })}

        {/* ── BAND 3: Inner element band ── */}
        {VASTU_16.map((z) => {
          const s = z.deg - 11.25, e = z.deg + 11.25
          return (
            <path key={`b3-${z.id}`}
              d={slicePath(R_INNER_MID, R_SEG_IN, s, e)}
              fill={z.light}
              stroke="#FFFFFF" strokeWidth={1}
              opacity={0.7}
            />
          )
        })}

        {/* ── Zone divider spokes ── */}
        {VASTU_16.map((z) => {
          const boundary = z.deg - 11.25
          const op = polar(CX, CY, R_SEG_OUT, boundary)
          const ip = polar(CX, CY, R_SEG_IN,  boundary)
          return (
            <line key={`sp-${z.id}`}
              x1={op.x} y1={op.y} x2={ip.x} y2={ip.y}
              stroke="#FFFFFF" strokeWidth={1.5}
            />
          )
        })}

        {/* ── Ring border circles ── */}
        <circle cx={CX} cy={CY} r={R_SEG_OUT}   fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
        <circle cx={CX} cy={CY} r={R_SEG_MID}   fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
        <circle cx={CX} cy={CY} r={R_INNER_MID} fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
        <circle cx={CX} cy={CY} r={R_SEG_IN}    fill="none" stroke="#E2E8F0" strokeWidth={0.8} />

        {/* ── BAND 1 TEXT: Direction abbreviation ── */}
        {VASTU_16.map((z) => {
          const isCardinal = ['N','E','S','W'].includes(z.id)
          const isInter    = ['NE','SE','SW','NW'].includes(z.id)
          const p = polar(CX, CY, (R_SEG_OUT + R_SEG_MID) / 2, z.deg)
          // counter-rotate so label stays horizontal
          return (
            <text key={`t1-${z.id}`}
              x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={isCardinal ? 14 : isInter ? 11 : 9}
              fontWeight={isCardinal ? 900 : 700}
              fill={isCardinal ? '#0F172A' : '#1E293B'}
              fontFamily="Georgia, 'Times New Roman', serif"
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >
              {z.abbr}
            </text>
          )
        })}

        {/* ── BAND 2 TEXT: Sanskrit / deity name ── */}
        {VASTU_16.map((z) => {
          const p = polar(CX, CY, (R_SEG_MID + R_INNER_MID) / 2, z.deg)
          return (
            <text key={`t2-${z.id}`}
              x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={8}
              fontWeight={600}
              fill="#475569"
              fontFamily="Georgia, serif"
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >
              {z.sanskrit}
            </text>
          )
        })}

        {/* ── BAND 3 TEXT: Element emoji ── */}
        {VASTU_16.map((z) => {
          const p = polar(CX, CY, (R_INNER_MID + R_SEG_IN) / 2, z.deg)
          const sym = { Water:'💧', Air:'🌬', Fire:'🔥', Earth:'🌍', Space:'✨' }[z.element] ?? ''
          return (
            <text key={`t3-${z.id}`}
              x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={10}
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >
              {sym}
            </text>
          )
        })}

        {/* ── Degree tick marks in bezel ── */}
        {ticks.map(({ deg, outer, inner, is45, is22 }) => (
          <line key={`tk-${deg}`}
            x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y}
            stroke="#64748B"
            strokeWidth={is45 ? 2.2 : is22 ? 1.4 : 0.7}
            strokeOpacity={is45 ? 1 : is22 ? 0.75 : 0.45}
          />
        ))}

        {/* ── Degree numbers at 45° intervals (always horizontal) ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const p = polar(CX, CY, R_BEZEL_IN - 14, deg)
          return (
            <text key={`dn-${deg}`}
              x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={8} fontWeight={700}
              fill="#94A3B8" fontFamily="monospace"
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >
              {deg}°
            </text>
          )
        })}

        {/* ── Cardinal needles ── */}
        {/* N — red */}
        <path d={needle(0,   R_NEEDLE, R_HUB + 5, 8)} fill="#DC2626" stroke="#7F1D1D" strokeWidth={0.8} />
        {/* S — blue */}
        <path d={needle(180, R_NEEDLE, R_HUB + 5, 8)} fill="#2563EB" stroke="#1E3A8A" strokeWidth={0.8} />
        {/* E — amber */}
        <path d={needle(90,  R_NEEDLE, R_HUB + 5, 7)} fill="#D97706" stroke="#78350F" strokeWidth={0.7} />
        {/* W — sky */}
        <path d={needle(270, R_NEEDLE, R_HUB + 5, 7)} fill="#0284C7" stroke="#0C4A6E" strokeWidth={0.7} />

        {/* ── Intercardinal needles (shorter, grey) ── */}
        {[45, 135, 225, 315].map(deg => (
          <path key={`in-${deg}`}
            d={needle(deg, Math.round(R_NEEDLE * 0.75), R_HUB + 3, 4.5)}
            fill="#94A3B8" stroke="#475569" strokeWidth={0.5}
          />
        ))}

        {/* ── Brahmasthan lotus petals ── */}
        {Array.from({ length: 8 }, (_, i) => {
          const pd  = i * 45
          const tip = polar(CX, CY, R_HUB - 2, pd)
          const wL  = polar(CX, CY, R_HUB - 12, pd - 16)
          const wR  = polar(CX, CY, R_HUB - 12, pd + 16)
          return (
            <path key={`p-${i}`}
              d={`M ${CX} ${CY} L ${wL.x} ${wL.y} Q ${tip.x} ${tip.y} ${wR.x} ${wR.y} Z`}
              fill={i % 2 === 0 ? '#FCD34D' : '#FDE68A'}
              stroke="#F59E0B" strokeWidth={0.5}
            />
          )
        })}

        {/* ── Hub rings ── */}
        <circle cx={CX} cy={CY} r={R_HUB}    fill="url(#vc-hub)" stroke="#CBD5E1" strokeWidth={1.5} />
        <circle cx={CX} cy={CY} r={8}         fill="#1E293B" />
        <circle cx={CX-2.5} cy={CY-2.5} r={3} fill="rgba(255,255,255,0.45)" />

      </g>{/* ── end rotating group ── */}

      {/* ── Bezel border drawn on top (non-rotating) ── */}
      <circle cx={CX} cy={CY} r={R_BEZEL_OUT} fill="none" stroke="#94A3B8" strokeWidth={2.5} />
      <circle cx={CX} cy={CY} r={R_BEZEL_IN}  fill="none" stroke="#CBD5E1" strokeWidth={1} />

    </svg>
  )
}

// ─── Score Gauge ─────────────────────────────────────────────────────────────
function ScoreGauge({ score }) {
  const prefersReduced = useReducedMotion()
  const r = 42
  const circ = 2 * Math.PI * r
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work'
  const gColor = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : score >= 40 ? '#F97316' : '#EF4444'

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="112" height="112" viewBox="0 0 112 112" aria-label={`Vastu compliance score: ${score} out of 100`}>
        <circle cx="56" cy="56" r={r} fill="none" stroke="#E5E0D5" strokeWidth="10" />
        <motion.circle
          cx="56" cy="56" r={r}
          fill="none"
          stroke={gColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 60, damping: 18, delay: 0.2 }}
          style={{ transformOrigin: '56px 56px', rotate: '-90deg' }}
        />
        <text x="56" y="52" textAnchor="middle" fontSize="20" fontWeight="900"
          fill="#1a1714" fontFamily="monospace">
          {score}
        </text>
        <text x="56" y="66" textAnchor="middle" fontSize="9" fontWeight="700"
          fill="#8B7355" fontFamily="monospace">
          / 100
        </text>
      </svg>
      <span className="text-xs font-black uppercase tracking-widest" style={{ color: gColor }}>
        {label}
      </span>
    </div>
  )
}

// ─── Room assignment row ───────────────────────────────────────────────────────
function RoomRow({ room, assignedDir, onAssign }) {
  const result = scoreRoomPlacement(room.id, assignedDir)
  const rc = RATING_CONFIG[result.rating]
  const dir = DIRECTIONS.find(d => d.id === assignedDir)
  const [open, setOpen] = useState(false)

  return (
    <div className={`rounded-2xl border transition-all duration-200 ${assignedDir ? rc.border + ' ' + rc.light : 'border-stone-200 bg-white'}`}>
      {/* header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-xl shrink-0">{room.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-stone-800 leading-tight truncate">{room.label}</p>
          <p className="text-[10px] text-stone-400 font-medium leading-tight truncate">{room.description}</p>
        </div>

        {/* direction picker */}
        <select
          value={assignedDir || ''}
          onChange={e => onAssign(room.id, e.target.value || null)}
          className="text-[11px] font-black bg-white border border-stone-200 rounded-xl px-2 py-1.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer max-w-[96px]"
          aria-label={`Assign direction for ${room.label}`}
        >
          <option value="">— Pick —</option>
          {DIRECTIONS.map(d => (
            <option key={d.id} value={d.id}>{d.labelShort} · {d.label.replace('-', '‑')}</option>
          ))}
        </select>

        {/* rating badge */}
        {assignedDir && (
          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${rc.light} ${rc.text} ${rc.border} border shrink-0`}>
            {rc.dot} {rc.label}
          </span>
        )}

        {/* expand toggle */}
        {assignedDir && (
          <button
            onClick={() => setOpen(o => !o)}
            className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center bg-stone-100 hover:bg-stone-200 transition-colors"
            aria-expanded={open}
            aria-label={`${open ? 'Collapse' : 'Expand'} details for ${room.label}`}
          >
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <FiChevronDown size={12} className="text-stone-500" />
            </motion.span>
          </button>
        )}
      </div>

      {/* expanded detail */}
      <AnimatePresence>
        {open && assignedDir && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-stone-100">
              {/* assigned direction info */}
              {dir && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-100">
                  <span className="text-lg">{dir.elementSymbol}</span>
                  <div>
                    <p className="text-[10px] font-black text-stone-700">{dir.label} — {dir.deity}</p>
                    <p className="text-[10px] text-stone-400 font-medium">{dir.deityRole} · Element: {dir.element}</p>
                    <p className="text-[10px] text-stone-500 mt-1 font-medium italic">"{dir.quality}"</p>
                  </div>
                </div>
              )}

              {/* reasoning */}
              <div className="flex gap-2">
                <FiInfo size={11} className="text-stone-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-stone-500 font-medium leading-relaxed">{room.reasoning}</p>
              </div>

              {/* remedy if not ideal */}
              {result.rating !== 'ideal' && (
                <div className={`flex gap-2 p-2.5 rounded-xl border ${rc.border} ${rc.light}`}>
                  <FiZap size={11} className={`${rc.text} shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-wider mb-1 ${rc.text}`}>
                      {result.rating === 'avoid' ? 'Remedy Needed' : 'General Tip'}
                    </p>
                    <p className={`text-[10px] font-medium leading-relaxed ${rc.text}`}>{room.remedy}</p>
                    {result.rating === 'avoid' && (
                      <p className="text-[10px] font-black mt-1.5 text-stone-600">
                        ➜ {room.relocateSuggestion}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Image Upload Overlay Panel ────────────────────────────────────────────────
function FloorPlanOverlay({ rotation, onRotate }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [draggingFile, setDraggingFile] = useState(false)
  // Single file input ref — used by both "Choose" and "Replace" buttons
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    // Revoke previous blob URL to avoid memory leak
    if (imgSrc) URL.revokeObjectURL(imgSrc)
    setImgSrc(URL.createObjectURL(file))
  }

  // Cleanup blob URL when component unmounts
  useEffect(() => {
    return () => { if (imgSrc) URL.revokeObjectURL(imgSrc) }
  }, [imgSrc])

  const onDrop = (e) => {
    e.preventDefault()
    setDraggingFile(false)
    handleFile(e.dataTransfer.files[0])
  }

  const removeImage = () => {
    if (imgSrc) URL.revokeObjectURL(imgSrc)
    setImgSrc(null)
  }

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-dashed border-stone-300 bg-stone-50">

      {/* Single hidden file input — referenced by all buttons */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { handleFile(e.target.files[0]); e.target.value = '' }}
      />

      {/* ── Empty state: drag-and-drop zone ── */}
      {!imgSrc && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-colors ${draggingFile ? 'bg-amber-50' : 'bg-stone-50'}`}
          onDragOver={e => { e.preventDefault(); setDraggingFile(true) }}
          onDragLeave={() => setDraggingFile(false)}
          onDrop={onDrop}
        >
          <FiUpload size={28} className="text-stone-300" />
          <p className="text-xs font-black text-stone-400 text-center px-6">
            Drop a floor plan image here<br />
            <span className="font-medium text-stone-300">or click to browse</span>
          </p>
          <button
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-[10px] font-black text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            Choose Image
          </button>
        </div>
      )}

      {/* ── Image + compass overlay ── */}
      {imgSrc && (
        <>
          <img
            src={imgSrc}
            alt="Uploaded floor plan"
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* Compass overlaid — pointer-events-none so drag passes through to parent */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 opacity-75">
              <CompassDial rotation={rotation} assignments={{}} onRotate={onRotate} />
            </div>
          </div>
          {/* Controls */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={removeImage}
              className="w-8 h-8 rounded-xl bg-white/90 shadow border border-stone-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
              aria-label="Remove floor plan image"
            >
              <FiX size={13} className="text-stone-500" />
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-8 h-8 rounded-xl bg-white/90 shadow border border-stone-200 flex items-center justify-center hover:bg-amber-50 hover:border-amber-300 transition-colors"
              aria-label="Replace floor plan image"
            >
              <FiUpload size={12} className="text-stone-500" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Device Compass hook ───────────────────────────────────────────────────────
function useDeviceCompass(onHeading) {
  const [supported, setSupported] = useState(false)
  const [active, setActive] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (typeof DeviceOrientationEvent !== 'undefined') setSupported(true)
  }, [])

  const requestPermission = async () => {
    try {
      // iOS 13+ requires explicit permission
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const perm = await DeviceOrientationEvent.requestPermission()
        if (perm !== 'granted') { setError('Permission denied'); return }
      }
      window.addEventListener('deviceorientation', handleOrientation, true)
      setActive(true)
      setError(null)
    } catch (err) {
      setError('Unable to access device compass')
    }
  }

  const handleOrientation = useCallback((e) => {
    // e.alpha = compass heading on iOS; may need webkitCompassHeading
    const heading = e.webkitCompassHeading ?? e.alpha ?? 0
    onHeading(normDeg(-heading))
  }, [onHeading])

  const stop = () => {
    window.removeEventListener('deviceorientation', handleOrientation, true)
    setActive(false)
  }

  useEffect(() => () => window.removeEventListener('deviceorientation', handleOrientation, true), [handleOrientation])

  return { supported, active, error, requestPermission, stop }
}

// ─── Direction Reference Grid ──────────────────────────────────────────────────
function DirectionGrid() {
  const [expanded, setExpanded] = useState(null)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {DIRECTIONS.map(dir => (
        <button
          key={dir.id}
          onClick={() => setExpanded(e => e === dir.id ? null : dir.id)}
          className={`rounded-2xl border-2 p-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${expanded === dir.id ? dir.borderClass + ' shadow-md' : 'border-stone-100 bg-white hover:border-stone-200'}`}
          aria-expanded={expanded === dir.id}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{dir.elementSymbol}</span>
            <span className="text-sm font-black text-stone-800">{dir.labelShort}</span>
          </div>
          <p className="text-[10px] font-bold text-stone-500 leading-tight">{dir.deity}</p>
          <p className="text-[9px] text-stone-400 leading-tight">{dir.element}</p>

          <AnimatePresence>
            {expanded === dir.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 pt-2 border-t border-stone-100">
                  <p className="text-[9px] font-bold text-stone-600">{dir.deityRole}</p>
                  <p className="text-[9px] text-stone-400 mt-0.5 italic">{dir.quality}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  )
}

// ─── Recommendations Panel ─────────────────────────────────────────────────────
function Recommendations({ assignments }) {
  const issues = ROOMS
    .map(room => {
      const dir = assignments[room.id]
      if (!dir) return null
      const result = scoreRoomPlacement(room.id, dir)
      if (result.rating === 'ideal') return null
      return { room, dir, result }
    })
    .filter(Boolean)
    .sort((a, b) => a.result.score - b.result.score)

  if (!issues.length) {
    const allAssigned = ROOMS.every(r => assignments[r.id])
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <FiCheckCircle size={28} className="text-emerald-400" />
        <p className="text-sm font-black text-stone-700">
          {allAssigned ? 'All rooms are well placed!' : 'No issues found yet'}
        </p>
        <p className="text-xs text-stone-400 font-medium max-w-xs">
          {allAssigned
            ? 'Your layout follows Vastu principles. Minor remedies may still enhance the energy further.'
            : 'Assign directions to your rooms above to see personalised recommendations.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
        {issues.length} room{issues.length !== 1 ? 's' : ''} need attention
      </p>
      {issues.map(({ room, dir, result }) => {
        const rc = RATING_CONFIG[result.rating]
        const dirObj = DIRECTIONS.find(d => d.id === dir)
        const idealDirs = room.ideal.map(id => DIRECTIONS.find(d => d.id === id)?.label).join(' or ')
        return (
          <div key={room.id} className={`rounded-2xl border-2 p-4 ${rc.border} ${rc.light}`}>
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{room.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-black text-stone-800">{room.label}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${rc.border} ${rc.text} bg-white`}>
                    {rc.dot} {rc.label} — {dirObj?.label}
                  </span>
                </div>

                {result.rating === 'avoid' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <FiAlertTriangle size={11} className="text-red-500 shrink-0" />
                    <p className="text-[11px] font-black text-red-600">
                      {dirObj?.label} is not recommended for {room.label.toLowerCase()}.
                    </p>
                  </div>
                )}

                <p className="text-[10px] text-stone-500 font-medium leading-relaxed mb-2">
                  {room.reasoning}
                </p>

                {/* Ideal suggestion */}
                <div className="flex items-center gap-1.5 mb-2 p-2 rounded-xl bg-white/70 border border-stone-100">
                  <FiCompass size={10} className="text-amber-500 shrink-0" />
                  <p className="text-[10px] font-black text-amber-700">
                    Ideal: {idealDirs}
                  </p>
                </div>

                {/* Remedy */}
                <div className={`p-2.5 rounded-xl border ${rc.border} bg-white/60`}>
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 mb-1">
                    💡 General Remedy
                  </p>
                  <p className="text-[10px] text-stone-600 font-medium leading-relaxed">
                    {room.remedy}
                  </p>
                  {result.rating === 'avoid' && (
                    <p className="text-[10px] font-black text-stone-700 mt-1.5">
                      ➜ {room.relocateSuggestion}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Tab bar ───────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'compass',   label: 'Compass',     icon: <FiCompass size={13} /> },
  { id: 'rooms',     label: 'Room Map',    icon: <FiMaximize2 size={13} /> },
  { id: 'results',   label: 'Score',       icon: <FiCheckCircle size={13} /> },
  { id: 'reference', label: 'Directions',  icon: <FiInfo size={13} /> },
]

// ─── Main export ───────────────────────────────────────────────────────────────
// ─── Compass Popup Modal ───────────────────────────────────────────────────────
function CompassModal({ rotation, assignments, onRotate, onClose }) {
  const prefersReduced = useReducedMotion()

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={prefersReduced ? {} : { scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={prefersReduced ? {} : { scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="relative bg-white rounded-3xl shadow-2xl flex flex-col gap-4 p-5"
        style={{ width: 'min(90vw, 560px)', maxHeight: '92vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Vastu Compass</p>
            <p className="text-sm font-black text-stone-800">Drag to align True North</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            aria-label="Close compass"
          >
            <FiX size={16} className="text-stone-600" />
          </button>
        </div>

        {/* Large compass */}
        <div className="w-full aspect-square" style={{ maxWidth: '100%' }}>
          <CompassDial rotation={rotation} assignments={assignments} onRotate={onRotate} />
        </div>

        {/* Degree readout */}
        <div className="text-center shrink-0">
          <span className="font-mono text-3xl font-black text-stone-800">
            {String(Math.round(normDeg(rotation))).padStart(3, '0')}°
          </span>
          <span className="text-sm text-stone-400 font-medium ml-2">rotation</span>
        </div>

        {/* Slider */}
        <div className="shrink-0 px-2">
          <input
            type="range" min="0" max="359" step="1"
            value={Math.round(normDeg(rotation))}
            onChange={e => onRotate(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 rounded-full"
            aria-label="Compass rotation in degrees"
          />
          <div className="flex justify-between text-[9px] text-stone-300 font-mono mt-1">
            <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>359°</span>
          </div>
        </div>

        {/* Close hint */}
        <p className="text-center text-[10px] text-stone-300 font-medium shrink-0">
          Tap outside or press <kbd className="px-1 py-0.5 bg-stone-100 rounded text-stone-400 font-mono text-[9px]">Esc</kbd> to close
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function VastuCompass() {
  const [rotation, setRotation]       = useState(0)
  const [assignments, setAssignments] = useState({})
  const [activeTab, setActiveTab]     = useState('compass')
  const [compassModal, setCompassModal] = useState(false)
  const prefersReduced = useReducedMotion()

  // assign / clear a room→direction
  const assignRoom = useCallback((roomId, dirId) => {
    setAssignments(prev => ({ ...prev, [roomId]: dirId || undefined }))
  }, [])

  // reset everything
  const reset = () => { setRotation(0); setAssignments({}) }

  // overall score (only over assigned rooms)
  const score = computeOverallScore(assignments)
  const assignedCount = Object.values(assignments).filter(Boolean).length

  // device compass
  const { supported: deviceSupported, active: deviceActive, error: deviceError,
    requestPermission, stop: stopDevice } = useDeviceCompass(setRotation)

  const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }

  return (
    <div className="w-full max-w-6xl mx-auto font-sans" data-compass-tool>

      {/* ── Compass Popup Modal ── */}
      <AnimatePresence>
        {compassModal && (
          <CompassModal
            rotation={rotation}
            assignments={assignments}
            onRotate={setRotation}
            onClose={() => setCompassModal(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Tab Navigation ── */}
      <div className="flex gap-1 p-1 bg-stone-100 rounded-2xl mb-6" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeTab === tab.id
                ? 'bg-white shadow text-stone-800 border border-stone-200'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Score strip (always visible when rooms assigned) ── */}
      {assignedCount > 0 && (
        <motion.div
          {...(prefersReduced ? {} : fadeUp)}
          className="flex items-center gap-4 px-5 py-3 mb-6 bg-white rounded-2xl border border-stone-200 shadow-sm"
        >
          <ScoreGauge score={score} />
          <div className="flex-1">
            <p className="text-xs font-black text-stone-700 mb-1">
              Overall Vastu Compliance
            </p>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : score >= 40 ? '#F97316' : '#EF4444' }}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 60 }}
              />
            </div>
            <p className="text-[10px] text-stone-400 font-medium mt-1">
              {assignedCount} of {ROOMS.length} rooms assigned
            </p>
          </div>
          <button
            onClick={() => setActiveTab('results')}
            className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 hover:text-amber-700 transition-colors shrink-0"
          >
            View Report <FiChevronRight size={11} />
          </button>
        </motion.div>
      )}

      {/* ── Tab Panels ── */}
      <AnimatePresence mode="wait">

        {/* COMPASS TAB */}
        {activeTab === 'compass' && (
          <motion.div key="compass"
            id="panel-compass" role="tabpanel"
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* LEFT: compass dial */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Step 1</p>
                    <p className="text-sm font-black text-stone-800">Align True North</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCompassModal(true)}
                      className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 hover:text-amber-700 transition-colors px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200"
                      aria-label="Open compass in fullscreen"
                    >
                      <FiZoomIn size={12} /> Expand
                    </button>
                    <button
                      onClick={reset}
                      className="flex items-center gap-1.5 text-[10px] font-black text-stone-400 hover:text-stone-600 transition-colors"
                      aria-label="Reset compass rotation"
                    >
                      <FiRotateCcw size={12} /> Reset
                    </button>
                  </div>
                </div>

                {/* compass */}
                <div
                  className="w-full aspect-square max-w-sm mx-auto relative group cursor-pointer"
                  onClick={() => setCompassModal(true)}
                  title="Click to expand compass"
                >
                  <CompassDial rotation={rotation} assignments={assignments} onRotate={setRotation} />
                  {/* Expand hint overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-full">
                    <div className="bg-black/50 text-white rounded-2xl px-3 py-2 flex items-center gap-2 text-xs font-black shadow-lg backdrop-blur-sm">
                      <FiZoomIn size={14} />
                      Click to expand
                    </div>
                  </div>
                </div>

                {/* degree readout */}
                <div className="mt-4 text-center">
                  <span className="font-mono text-2xl font-black text-stone-800">
                    {String(Math.round(normDeg(rotation))).padStart(3, '0')}°
                  </span>
                  <span className="text-xs text-stone-400 font-medium ml-2">rotation</span>
                </div>
              </div>

              {/* slider */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <FiSliders size={12} className="text-stone-400" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Fine Adjust</p>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  step="1"
                  value={Math.round(normDeg(rotation))}
                  onChange={e => setRotation(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-full"
                  aria-label="Compass rotation in degrees"
                />
                <div className="flex justify-between text-[9px] text-stone-300 font-mono mt-1">
                  <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>359°</span>
                </div>
              </div>

              {/* device compass button */}
              {deviceSupported && (
                <div className="bg-white rounded-2xl border border-stone-200 px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">
                    Device Compass
                  </p>
                  {!deviceActive ? (
                    <button
                      onClick={requestPermission}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <FiSun size={13} /> Use Device Compass
                    </button>
                  ) : (
                    <button
                      onClick={stopDevice}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-black transition-colors"
                    >
                      <FiXCircle size={13} /> Stop Device Compass
                    </button>
                  )}
                  {deviceError && (
                    <p className="text-[10px] text-red-500 font-medium mt-2">{deviceError}</p>
                  )}
                  <p className="text-[9px] text-stone-300 font-medium mt-2">
                    Requires a device with a magnetometer. iOS 13+ will prompt for permission.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT: floor plan overlay */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Step 2 (optional)</p>
                  <p className="text-sm font-black text-stone-800">Overlay on Your Floor Plan</p>
                  <p className="text-[10px] text-stone-400 font-medium mt-1">
                    Upload a floor plan photo and rotate the compass above to match true North on your plan.
                  </p>
                </div>
                <FloorPlanOverlay rotation={rotation} onRotate={setRotation} />
              </div>

              {/* usage hint */}
              <div className="flex gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl">
                <FiInfo size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                  <strong>How to use:</strong> Drag the compass dial to rotate. Align the N marker with the North direction on your floor plan. Then head to the <strong>Room Map</strong> tab to assign each room to its direction.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ROOMS TAB */}
        {activeTab === 'rooms' && (
          <motion.div key="rooms"
            id="panel-rooms" role="tabpanel"
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
              <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Step 3</p>
                <p className="text-lg font-black text-stone-800">Assign Rooms to Directions</p>
                <p className="text-[11px] text-stone-400 font-medium mt-1">
                  For each room, select the compass direction it is located in on your plot.
                </p>
              </div>
              <div className="space-y-2">
                {ROOMS.map(room => (
                  <RoomRow
                    key={room.id}
                    room={room}
                    assignedDir={assignments[room.id] || null}
                    onAssign={assignRoom}
                  />
                ))}
              </div>
              {assignedCount > 0 && (
                <button
                  onClick={() => setActiveTab('results')}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-900 text-white text-[11px] font-black uppercase tracking-wider hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  View Score Report <FiChevronRight size={12} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* RESULTS TAB */}
        {activeTab === 'results' && (
          <motion.div key="results"
            id="panel-results" role="tabpanel"
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {assignedCount === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center">
                <FiCompass size={32} className="text-stone-200 mx-auto mb-3" />
                <p className="text-sm font-black text-stone-500">No rooms assigned yet</p>
                <p className="text-xs text-stone-300 font-medium mt-1">
                  Head to the Room Map tab and assign directions to see your score.
                </p>
                <button onClick={() => setActiveTab('rooms')}
                  className="mt-4 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-[11px] font-black hover:bg-stone-800 transition-colors">
                  Go to Room Map
                </button>
              </div>
            ) : (
              <>
                {/* Score summary card */}
                <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
                  <div className="flex items-center gap-6">
                    <ScoreGauge score={score} />
                    <div className="flex-1">
                      <p className="text-xl font-black text-stone-800 leading-tight">
                        {score >= 80 ? 'Excellent Vastu Alignment' :
                         score >= 60 ? 'Good Alignment, Minor Issues' :
                         score >= 40 ? 'Fair — Several Areas Need Attention' :
                         'Significant Vastu Concerns'}
                      </p>
                      <p className="text-xs text-stone-400 font-medium mt-1">
                        Based on {assignedCount} assigned room{assignedCount !== 1 ? 's' : ''}
                      </p>
                      {/* per-room mini summary */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {ROOMS.filter(r => assignments[r.id]).map(r => {
                          const res = scoreRoomPlacement(r.id, assignments[r.id])
                          const rc = RATING_CONFIG[res.rating]
                          return (
                            <span key={r.id} className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${rc.border} ${rc.text} ${rc.light}`}>
                              {r.icon} {r.label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">
                    Recommendations
                  </p>
                  <Recommendations assignments={assignments} />
                </div>

                {/* Disclaimer */}
                <div className="flex gap-3 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl">
                  <FiInfo size={12} className="text-stone-300 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-stone-400 font-medium leading-relaxed">
                    This tool is a general educational guide based on traditional Vastu Shastra principles. Vastu rules vary between regional traditions and schools. Always consult a certified Vastu consultant before making structural changes. Remedies suggested here are general in nature and not a substitute for professional advice.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* REFERENCE TAB */}
        {activeTab === 'reference' && (
          <motion.div key="reference"
            id="panel-reference" role="tabpanel"
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">8 Vastu Directions</p>
              <p className="text-sm font-black text-stone-800 mb-4">
                The Ashta-Dikpalas — Eight Directional Guardians
              </p>
              <DirectionGrid />
            </div>

            {/* Room reference table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Room Placement Guide</p>
              <div className="space-y-2">
                {ROOMS.map(room => (
                  <div key={room.id} className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                    <span className="text-xl shrink-0">{room.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-stone-700">{room.label}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {room.ideal.map(id => (
                          <span key={id} className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                            🟢 {id}
                          </span>
                        ))}
                        {room.acceptable.map(id => (
                          <span key={id} className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                            🟡 {id}
                          </span>
                        ))}
                        {room.avoid.map(id => (
                          <span key={id} className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                            🔴 {id}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-[9px] font-bold text-stone-400">
                <span>🟢 Ideal</span>
                <span>🟡 Acceptable</span>
                <span>🔴 Avoid</span>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
