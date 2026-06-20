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
  FiMaximize2, FiSliders, FiX, FiChevronRight
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

// ─── SVG Compass Dial ─────────────────────────────────────────────────────────
// Faithful reproduction of a classic nautical compass rose:
//   • Two-layer outer bezel ring with fine tick marks (every 5°)
//   • 8-point star: 4 long cardinal points + 4 shorter intercardinal points
//   • Cardinal points: N red/crimson, S teal/slate, E/W dark navy-blue
//   • Intercardinal points: medium navy-blue, slightly shorter
//   • Dashed inner reference circle
//   • Labels: N/S/E/W large outside bezel, NW/NE/SE/SW smaller
//   • Centre hub: white ring + dark dot

function CompassDial({ rotation, assignments, onRotate }) {
  const CX = 200, CY = 200
  // Ring radii
  const R_OUTER = 178   // outer bezel edge
  const R_INNER = 160   // inner bezel edge / tick base
  const R_LABEL = 148   // where direction labels sit (outside ticks, inside outer ring)
  const R_DASH  = 108   // dashed inner circle radius

  // Star point tip radii
  const R_CARD_TIP   = 150  // cardinal point tip (long)
  const R_INTER_TIP  = 120  // intercardinal tip (shorter)
  const STAR_WAIST   = 18   // half-angle of waist between points (degrees)

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

  // Build one compass-rose point as a diamond path:
  //   tip at (CX,CY - tipR), waist notches at ±waistAngle from tip direction,
  //   base back at centre
  const makePt = (aimDeg, tipR, waistR, waistHalfAngle) => {
    const tip   = polar(CX, CY, tipR, aimDeg)
    const wL    = polar(CX, CY, waistR, aimDeg - waistHalfAngle)
    const wR    = polar(CX, CY, waistR, aimDeg + waistHalfAngle)
    return `M ${CX} ${CY} L ${wL.x} ${wL.y} L ${tip.x} ${tip.y} L ${wR.x} ${wR.y} Z`
  }

  // Cardinal directions: 0=N,90=E,180=S,270=W
  // N gets two halves (red front, dark back); E/W dark navy; S teal
  const cardinals = [
    { deg: 0,   colorFront: '#B22234', colorBack: '#B22234' }, // N — red
    { deg: 90,  colorFront: '#1E3A5F', colorBack: '#2B4F7A' }, // E — navy
    { deg: 180, colorFront: '#4A7C8A', colorBack: '#4A7C8A' }, // S — teal-slate
    { deg: 270, colorFront: '#1E3A5F', colorBack: '#2B4F7A' }, // W — navy
  ]

  // Intercardinal: NE,SE,SW,NW — all shorter, navy
  const intercardinals = [45, 135, 225, 315]

  // Tick generation — 72 ticks (every 5°); longer at 45° multiples, medium at 10°
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5
    const is45 = deg % 45 === 0
    const is10 = deg % 10 === 0 && !is45
    const tickLen = is45 ? 14 : is10 ? 9 : 5
    const outer = polar(CX, CY, R_INNER, deg)
    const inner = polar(CX, CY, R_INNER - tickLen, deg)
    return { deg, outer, inner, is45, is10 }
  })

  // Dashed circle dash array
  const dashCirc = 2 * Math.PI * R_DASH
  const dashOn = 6, dashOff = 6

  // Direction labels: N/S/E/W outside ring, NW etc. inside between ring and star
  const labelDirs = [
    { id: 'N',  deg: 0,   label: 'N',  r: R_LABEL - 6, big: true },
    { id: 'NE', deg: 45,  label: 'NE', r: R_LABEL - 8, big: false },
    { id: 'E',  deg: 90,  label: 'E',  r: R_LABEL - 6, big: true },
    { id: 'SE', deg: 135, label: 'SE', r: R_LABEL - 8, big: false },
    { id: 'S',  deg: 180, label: 'S',  r: R_LABEL - 6, big: true },
    { id: 'SW', deg: 225, label: 'SW', r: R_LABEL - 8, big: false },
    { id: 'W',  deg: 270, label: 'W',  r: R_LABEL - 6, big: true },
    { id: 'NW', deg: 315, label: 'NW', r: R_LABEL - 8, big: false },
  ]

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="w-full h-full select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      role="img"
      aria-label={`Vastu compass rotated ${Math.round(rotation)}°. Drag to rotate and align North.`}
    >
      <defs>
        {/* Subtle drop shadow for the star */}
        <filter id="rose-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00000033" />
        </filter>
        {/* Red gradient for N point (front face) */}
        <linearGradient id="grad-north" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8B0000" />
          <stop offset="50%"  stopColor="#C8202A" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
        {/* Teal gradient for S point */}
        <linearGradient id="grad-south" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#2E5F6A" />
          <stop offset="50%"  stopColor="#5B9DAD" />
          <stop offset="100%" stopColor="#2E5F6A" />
        </linearGradient>
        {/* Navy gradient for E/W */}
        <linearGradient id="grad-ew" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#152D4A" />
          <stop offset="50%"  stopColor="#2D5080" />
          <stop offset="100%" stopColor="#152D4A" />
        </linearGradient>
        {/* Navy gradient for intercardinals */}
        <linearGradient id="grad-inter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#1A3560" />
          <stop offset="100%" stopColor="#3A608A" />
        </linearGradient>
        {/* White/grey for background disc */}
        <radialGradient id="bg-disc" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f0f2f4" />
          <stop offset="100%" stopColor="#e2e6ea" />
        </radialGradient>
      </defs>

      {/* ── Background ── */}
      <circle cx={CX} cy={CY} r={R_OUTER + 16} fill="url(#bg-disc)" />

      {/* ── Outer double bezel ring ── */}
      <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="#2C3E50" strokeWidth={2} />
      <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="#2C3E50" strokeWidth={1} />
      {/* Thin fill between the two rings */}
      <circle cx={CX} cy={CY} r={R_OUTER} fill="#ffffff" stroke="none" />
      <circle cx={CX} cy={CY} r={R_INNER} fill="#f0f2f4" stroke="none" />
      {/* Re-draw strokes on top */}
      <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="#2C3E50" strokeWidth={2.5} />
      <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="#2C3E50" strokeWidth={1.5} />

      {/* ── Everything inside rotates ── */}
      <g transform={`rotate(${rotation}, ${CX}, ${CY})`}>

        {/* ── Tick marks (inside the inner bezel ring, above disc) ── */}
        {ticks.map(({ deg, outer, inner, is45, is10 }) => (
          <line
            key={deg}
            x1={outer.x} y1={outer.y}
            x2={inner.x} y2={inner.y}
            stroke="#2C3E50"
            strokeWidth={is45 ? 1.8 : is10 ? 1.2 : 0.8}
            strokeOpacity={is45 ? 1 : is10 ? 0.8 : 0.55}
          />
        ))}

        {/* ── Direction labels ── */}
        {labelDirs.map(({ id, deg, label, r, big }) => {
          const p = polar(CX, CY, r, deg)
          return (
            <text
              key={id}
              x={p.x} y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={big ? 17 : 11}
              fontWeight={big ? 800 : 700}
              fill="#1A2B3C"
              fontFamily="Georgia, serif"
              letterSpacing={big ? 1 : 0.5}
            >
              {label}
            </text>
          )
        })}

        {/* ── Dashed inner reference circle ── */}
        <circle
          cx={CX} cy={CY} r={R_DASH}
          fill="none"
          stroke="#2C3E50"
          strokeWidth={1.2}
          strokeOpacity={0.45}
          strokeDasharray={`${dashOn} ${dashOff}`}
        />

        {/* ── 8-point compass rose star ── */}
        {/* Render intercardinal points first (behind cardinals) */}
        {intercardinals.map((deg) => (
          <path
            key={`inter-${deg}`}
            d={makePt(deg, R_INTER_TIP, 22, 8)}
            fill="url(#grad-inter)"
            stroke="#0F2040"
            strokeWidth={0.6}
            filter="url(#rose-shadow)"
          />
        ))}

        {/* Cardinal E — left half dark, right half slightly lighter */}
        <path d={makePt(90, R_CARD_TIP, 22, 9)}  fill="url(#grad-ew)"    stroke="#0F2040" strokeWidth={0.6} filter="url(#rose-shadow)" />
        {/* Cardinal W */}
        <path d={makePt(270, R_CARD_TIP, 22, 9)} fill="url(#grad-ew)"    stroke="#0F2040" strokeWidth={0.6} filter="url(#rose-shadow)" />
        {/* Cardinal S — teal */}
        <path d={makePt(180, R_CARD_TIP, 22, 9)} fill="url(#grad-south)" stroke="#1A4050" strokeWidth={0.6} filter="url(#rose-shadow)" />
        {/* Cardinal N — red (on top of all) */}
        <path d={makePt(0, R_CARD_TIP, 22, 9)}   fill="url(#grad-north)" stroke="#6B0010" strokeWidth={0.6} filter="url(#rose-shadow)" />

        {/* ── Centre hub ── */}
        {/* Outer grey ring */}
        <circle cx={CX} cy={CY} r={20} fill="#e8eaec" stroke="#2C3E50" strokeWidth={1.5} />
        {/* White mid ring */}
        <circle cx={CX} cy={CY} r={14} fill="#ffffff" stroke="#aab0b8" strokeWidth={1} />
        {/* Dark inner dot */}
        <circle cx={CX} cy={CY} r={7}  fill="#1A2B3C" />
        {/* Tiny highlight */}
        <circle cx={CX - 2} cy={CY - 2} r={2} fill="rgba(255,255,255,0.35)" />

      </g>{/* end rotating group */}

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
export default function VastuCompass() {
  const [rotation, setRotation]       = useState(0)
  const [assignments, setAssignments] = useState({})
  const [activeTab, setActiveTab]     = useState('compass')
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
    <div className="w-full max-w-6xl mx-auto font-sans">

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
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-[10px] font-black text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label="Reset compass rotation"
                  >
                    <FiRotateCcw size={12} /> Reset
                  </button>
                </div>

                {/* compass */}
                <div className="w-full aspect-square max-w-xs mx-auto">
                  <CompassDial rotation={rotation} assignments={assignments} onRotate={setRotation} />
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
