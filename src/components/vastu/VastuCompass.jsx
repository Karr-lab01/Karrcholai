/**
 * VastuCompass.jsx — Compass + Floor Plan overlay only
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FiRotateCcw, FiInfo, FiSun, FiXCircle,
  FiSliders, FiX, FiZoomIn, FiUpload
} from 'react-icons/fi'

// ─── tiny helpers ──────────────────────────────────────────────────────────────
const normDeg = (d) => ((d % 360) + 360) % 360

// polar → cartesian
const polar = (cx, cy, r, angleDeg) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// ─── 16 Vastu zones ───────────────────────────────────────────────────────────
const VASTU_16 = [
  { id:'N',   abbr:'N',   sanskrit:'Kubera',   element:'Water', color:'#3B82F6', light:'#DBEAFE', deg:0    },
  { id:'NNE', abbr:'NNE', sanskrit:'Saumya',   element:'Water', color:'#60A5FA', light:'#EFF6FF', deg:22.5 },
  { id:'NE',  abbr:'NE',  sanskrit:'Ishan',    element:'Space', color:'#818CF8', light:'#EEF2FF', deg:45   },
  { id:'ENE', abbr:'ENE', sanskrit:'Jayanta',  element:'Air',   color:'#A78BFA', light:'#F5F3FF', deg:67.5 },
  { id:'E',   abbr:'E',   sanskrit:'Indra',    element:'Air',   color:'#F59E0B', light:'#FEF3C7', deg:90   },
  { id:'ESE', abbr:'ESE', sanskrit:'Vitatha',  element:'Air',   color:'#FBBF24', light:'#FFFBEB', deg:112.5},
  { id:'SE',  abbr:'SE',  sanskrit:'Agneya',   element:'Fire',  color:'#EF4444', light:'#FEE2E2', deg:135  },
  { id:'SSE', abbr:'SSE', sanskrit:'Grihaksh', element:'Fire',  color:'#F87171', light:'#FEF2F2', deg:157.5},
  { id:'S',   abbr:'S',   sanskrit:'Yama',     element:'Earth', color:'#92400E', light:'#FEF3C7', deg:180  },
  { id:'SSW', abbr:'SSW', sanskrit:'Nirriti',  element:'Earth', color:'#B45309', light:'#FFFBEB', deg:202.5},
  { id:'SW',  abbr:'SW',  sanskrit:'Nairuta',  element:'Earth', color:'#78350F', light:'#FEF3C7', deg:225  },
  { id:'WSW', abbr:'WSW', sanskrit:'Sugriva',  element:'Earth', color:'#9A3412', light:'#FFF7ED', deg:247.5},
  { id:'W',   abbr:'W',   sanskrit:'Varuna',   element:'Air',   color:'#0EA5E9', light:'#E0F2FE', deg:270  },
  { id:'WNW', abbr:'WNW', sanskrit:'Pushpdnt', element:'Air',   color:'#38BDF8', light:'#F0F9FF', deg:292.5},
  { id:'NW',  abbr:'NW',  sanskrit:'Vayavya',  element:'Air',   color:'#10B981', light:'#D1FAE5', deg:315  },
  { id:'NNW', abbr:'NNW', sanskrit:'Bhallata', element:'Water', color:'#34D399', light:'#ECFDF5', deg:337.5},
]

// ─── Compass Dial ─────────────────────────────────────────────────────────────
function CompassDial({ rotation, onRotate }) {
  const CX = 240, CY = 240
  const R_BEZEL_OUT = 228
  const R_BEZEL_IN  = 210
  const R_SEG_OUT   = 209
  const R_SEG_MID   = 172
  const R_INNER_MID = 136
  const R_SEG_IN    = 110
  const R_NEEDLE    = 102
  const R_HUB       = 24

  const dragging  = useRef(false)
  const lastAngle = useRef(0)
  const svgRef    = useRef(null)

  const getAngle = (e) => {
    const svg  = svgRef.current
    if (!svg) return 0
    const rect = svg.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI)
  }

  const onPointerDown = (e) => {
    e.preventDefault()
    dragging.current   = true
    lastAngle.current  = getAngle(e)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup',   onPointerUp)
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
    window.removeEventListener('pointerup',   onPointerUp)
  }, [onPointerMove])

  useEffect(() => () => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup',   onPointerUp)
  }, [onPointerMove, onPointerUp])

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

  const needle = (aimDeg, tip, base, halfW) => {
    const t  = polar(CX, CY, tip,    aimDeg)
    const b  = polar(CX, CY, base,   aimDeg)
    const wL = polar(CX, CY, halfW,  aimDeg - 90)
    const wR = polar(CX, CY, halfW,  aimDeg + 90)
    return `M ${b.x} ${b.y} L ${wL.x} ${wL.y} L ${t.x} ${t.y} L ${wR.x} ${wR.y} Z`
  }

  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg  = i * 5
    const is45 = deg % 45 === 0
    const is22 = deg % 22.5 === 0 && !is45
    const len  = is45 ? 13 : is22 ? 9 : 5
    const outer = polar(CX, CY, R_BEZEL_IN,       deg)
    const inner = polar(CX, CY, R_BEZEL_IN - len,  deg)
    return { deg, outer, inner, is45, is22 }
  })

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

      <circle cx={CX} cy={CY} r={R_BEZEL_OUT + 6} fill="url(#vc-bg)" filter="url(#vc-shadow)" />
      <circle cx={CX} cy={CY} r={R_BEZEL_OUT}     fill="#FFFFFF" stroke="#CBD5E1" strokeWidth={2} />

      <g transform={`rotate(${rotation}, ${CX}, ${CY})`}>
        {VASTU_16.map((z) => {
          const s = z.deg - 11.25, e = z.deg + 11.25
          return <path key={`b1-${z.id}`} d={slicePath(R_SEG_OUT, R_SEG_MID, s, e)} fill={z.light} stroke="#FFFFFF" strokeWidth={1.8} />
        })}
        {VASTU_16.map((z) => {
          const s = z.deg - 11.25, e = z.deg + 11.25
          return <path key={`b2-${z.id}`} d={slicePath(R_SEG_MID, R_INNER_MID, s, e)} fill={z.light} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.92} />
        })}
        {VASTU_16.map((z) => {
          const s = z.deg - 11.25, e = z.deg + 11.25
          return <path key={`b3-${z.id}`} d={slicePath(R_INNER_MID, R_SEG_IN, s, e)} fill={z.light} stroke="#FFFFFF" strokeWidth={1} opacity={0.7} />
        })}
        {VASTU_16.map((z) => {
          const boundary = z.deg - 11.25
          const op = polar(CX, CY, R_SEG_OUT, boundary)
          const ip = polar(CX, CY, R_SEG_IN,  boundary)
          return <line key={`sp-${z.id}`} x1={op.x} y1={op.y} x2={ip.x} y2={ip.y} stroke="#FFFFFF" strokeWidth={1.5} />
        })}

        <circle cx={CX} cy={CY} r={R_SEG_OUT}   fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
        <circle cx={CX} cy={CY} r={R_SEG_MID}   fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
        <circle cx={CX} cy={CY} r={R_INNER_MID} fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
        <circle cx={CX} cy={CY} r={R_SEG_IN}    fill="none" stroke="#E2E8F0" strokeWidth={0.8} />


        {VASTU_16.map((z) => {
          const isCardinal = ['N','E','S','W'].includes(z.id)
          const isInter    = ['NE','SE','SW','NW'].includes(z.id)
          const p = polar(CX, CY, (R_SEG_OUT + R_SEG_MID) / 2, z.deg)
          return (
            <text key={`t1-${z.id}`} x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={isCardinal ? 14 : isInter ? 11 : 9}
              fontWeight={isCardinal ? 900 : 700}
              fill={isCardinal ? '#0F172A' : '#1E293B'}
              fontFamily="Georgia, 'Times New Roman', serif"
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >{z.abbr}</text>
          )
        })}

        {VASTU_16.map((z) => {
          const p = polar(CX, CY, (R_SEG_MID + R_INNER_MID) / 2, z.deg)
          return (
            <text key={`t2-${z.id}`} x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={8} fontWeight={600} fill="#475569"
              fontFamily="Georgia, serif"
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >{z.sanskrit}</text>
          )
        })}

        {VASTU_16.map((z) => {
          const p = polar(CX, CY, (R_INNER_MID + R_SEG_IN) / 2, z.deg)
          const sym = { Water:'💧', Air:'🌬', Fire:'🔥', Earth:'🌍', Space:'✨' }[z.element] ?? ''
          return (
            <text key={`t3-${z.id}`} x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central" fontSize={10}
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >{sym}</text>
          )
        })}

        {ticks.map(({ deg, outer, inner, is45, is22 }) => (
          <line key={`tk-${deg}`} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y}
            stroke="#64748B"
            strokeWidth={is45 ? 2.2 : is22 ? 1.4 : 0.7}
            strokeOpacity={is45 ? 1 : is22 ? 0.75 : 0.45}
          />
        ))}

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const p = polar(CX, CY, R_BEZEL_IN - 14, deg)
          return (
            <text key={`dn-${deg}`} x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={8} fontWeight={700} fill="#94A3B8" fontFamily="monospace"
              transform={`rotate(${-rotation}, ${p.x}, ${p.y})`}
            >{deg}°</text>
          )
        })}


        <path d={needle(0,   R_NEEDLE, R_HUB + 5, 8)} fill="#DC2626" stroke="#7F1D1D" strokeWidth={0.8} />
        <path d={needle(180, R_NEEDLE, R_HUB + 5, 8)} fill="#2563EB" stroke="#1E3A8A" strokeWidth={0.8} />
        <path d={needle(90,  R_NEEDLE, R_HUB + 5, 7)} fill="#D97706" stroke="#78350F" strokeWidth={0.7} />
        <path d={needle(270, R_NEEDLE, R_HUB + 5, 7)} fill="#0284C7" stroke="#0C4A6E" strokeWidth={0.7} />
        {[45, 135, 225, 315].map(deg => (
          <path key={`in-${deg}`}
            d={needle(deg, Math.round(R_NEEDLE * 0.75), R_HUB + 3, 4.5)}
            fill="#94A3B8" stroke="#475569" strokeWidth={0.5}
          />
        ))}

        {Array.from({ length: 8 }, (_, i) => {
          const pd  = i * 45
          const tip = polar(CX, CY, R_HUB - 2,  pd)
          const wL  = polar(CX, CY, R_HUB - 12, pd - 16)
          const wR  = polar(CX, CY, R_HUB - 12, pd + 16)
          return (
            <path key={`p-${i}`}
              d={`M ${CX} ${CY} L ${wL.x} ${wL.y} Q ${tip.x} ${tip.y} ${wR.x} ${wR.y} Z`}
              fill={i % 2 === 0 ? '#FCD34D' : '#FDE68A'} stroke="#F59E0B" strokeWidth={0.5}
            />
          )
        })}

        <circle cx={CX} cy={CY} r={R_HUB}    fill="url(#vc-hub)" stroke="#CBD5E1" strokeWidth={1.5} />
        <circle cx={CX} cy={CY} r={8}         fill="#1E293B" />
        <circle cx={CX-2.5} cy={CY-2.5} r={3} fill="rgba(255,255,255,0.45)" />
      </g>

      <circle cx={CX} cy={CY} r={R_BEZEL_OUT} fill="none" stroke="#94A3B8" strokeWidth={2.5} />
      <circle cx={CX} cy={CY} r={R_BEZEL_IN}  fill="none" stroke="#CBD5E1" strokeWidth={1} />
    </svg>
  )
}

// ─── Compass Popup Modal ──────────────────────────────────────────────────────
function CompassModal({ rotation, onRotate, onClose }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        <div className="flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Vastu Compass</p>
            <p className="text-sm font-black text-stone-800">Drag to align True North</p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            aria-label="Close compass"
          >
            <FiX size={16} className="text-stone-600" />
          </button>
        </div>
        <div className="w-full aspect-square">
          <CompassDial rotation={rotation} onRotate={onRotate} />
        </div>
        <div className="text-center shrink-0">
          <span className="font-mono text-3xl font-black text-stone-800">
            {String(Math.round(normDeg(rotation))).padStart(3, '0')}°
          </span>
          <span className="text-sm text-stone-400 font-medium ml-2">rotation</span>
        </div>
        <div className="shrink-0 px-2">
          <input type="range" min="0" max="359" step="1"
            value={Math.round(normDeg(rotation))}
            onChange={e => onRotate(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 rounded-full"
            aria-label="Compass rotation in degrees"
          />
          <div className="flex justify-between text-[9px] text-stone-300 font-mono mt-1">
            <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>359°</span>
          </div>
        </div>
        <p className="text-center text-[10px] text-stone-300 font-medium shrink-0">
          Tap outside or press <kbd className="px-1 py-0.5 bg-stone-100 rounded text-stone-400 font-mono text-[9px]">Esc</kbd> to close
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Floor Plan Overlay ───────────────────────────────────────────────────────
function FloorPlanOverlay({ rotation, onRotate }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [draggingFile, setDraggingFile] = useState(false)
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    if (imgSrc) URL.revokeObjectURL(imgSrc)
    setImgSrc(URL.createObjectURL(file))
  }

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
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={e => { handleFile(e.target.files[0]); e.target.value = '' }}
      />
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
          <button onClick={() => fileRef.current?.click()}
            className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-[10px] font-black text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            Choose Image
          </button>
        </div>
      )}
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Uploaded floor plan" className="absolute inset-0 w-full h-full object-contain" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 opacity-75">
              <CompassDial rotation={rotation} onRotate={onRotate} />
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button onClick={removeImage}
              className="w-8 h-8 rounded-xl bg-white/90 shadow border border-stone-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
              aria-label="Remove floor plan image"
            >
              <FiX size={13} className="text-stone-500" />
            </button>
            <button onClick={() => fileRef.current?.click()}
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

// ─── Device Compass hook ──────────────────────────────────────────────────────
function useDeviceCompass(onHeading) {
  const [supported, setSupported] = useState(false)
  const [active,    setActive]    = useState(false)
  const [error,     setError]     = useState(null)

  useEffect(() => {
    if (typeof DeviceOrientationEvent !== 'undefined') setSupported(true)
  }, [])

  const handleOrientation = useCallback((e) => {
    const heading = e.webkitCompassHeading ?? e.alpha ?? 0
    onHeading(normDeg(-heading))
  }, [onHeading])

  const requestPermission = async () => {
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const perm = await DeviceOrientationEvent.requestPermission()
        if (perm !== 'granted') { setError('Permission denied'); return }
      }
      window.addEventListener('deviceorientation', handleOrientation, true)
      setActive(true)
      setError(null)
    } catch {
      setError('Unable to access device compass')
    }
  }

  const stop = () => {
    window.removeEventListener('deviceorientation', handleOrientation, true)
    setActive(false)
  }

  useEffect(() => () => window.removeEventListener('deviceorientation', handleOrientation, true), [handleOrientation])

  return { supported, active, error, requestPermission, stop }
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function VastuCompass() {
  const [rotation,     setRotation]     = useState(0)
  const [compassModal, setCompassModal] = useState(false)

  const reset = () => setRotation(0)

  const { supported: deviceSupported, active: deviceActive, error: deviceError,
    requestPermission, stop: stopDevice } = useDeviceCompass(setRotation)

  return (
    <div className="w-full max-w-6xl mx-auto font-sans" data-compass-tool>

      <AnimatePresence>
        {compassModal && (
          <CompassModal
            rotation={rotation}
            onRotate={setRotation}
            onClose={() => setCompassModal(false)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT: compass dial */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Step 1</p>
                <p className="text-sm font-black text-stone-800">Align True North</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCompassModal(true)}
                  className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 hover:text-amber-700 transition-colors px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200"
                  aria-label="Open compass in fullscreen"
                >
                  <FiZoomIn size={12} /> Expand
                </button>
                <button onClick={reset}
                  className="flex items-center gap-1.5 text-[10px] font-black text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label="Reset compass rotation"
                >
                  <FiRotateCcw size={12} /> Reset
                </button>
              </div>
            </div>

            <div
              className="w-full aspect-square max-w-sm mx-auto relative group cursor-pointer"
              onClick={() => setCompassModal(true)}
              title="Click to expand compass"
            >
              <CompassDial rotation={rotation} onRotate={setRotation} />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-full">
                <div className="bg-black/50 text-white rounded-2xl px-3 py-2 flex items-center gap-2 text-xs font-black shadow-lg backdrop-blur-sm">
                  <FiZoomIn size={14} /> Click to expand
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="font-mono text-2xl font-black text-stone-800">
                {String(Math.round(normDeg(rotation))).padStart(3, '0')}°
              </span>
              <span className="text-xs text-stone-400 font-medium ml-2">rotation</span>
            </div>
          </div>

          {/* Slider */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <FiSliders size={12} className="text-stone-400" />
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Fine Adjust</p>
            </div>
            <input type="range" min="0" max="359" step="1"
              value={Math.round(normDeg(rotation))}
              onChange={e => setRotation(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-full"
              aria-label="Compass rotation in degrees"
            />
            <div className="flex justify-between text-[9px] text-stone-300 font-mono mt-1">
              <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>359°</span>
            </div>
          </div>

          {/* Device compass */}
          {deviceSupported && (
            <div className="bg-white rounded-2xl border border-stone-200 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Device Compass</p>
              {!deviceActive ? (
                <button onClick={requestPermission}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <FiSun size={13} /> Use Device Compass
                </button>
              ) : (
                <button onClick={stopDevice}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-black transition-colors"
                >
                  <FiXCircle size={13} /> Stop Device Compass
                </button>
              )}
              {deviceError && <p className="text-[10px] text-red-500 font-medium mt-2">{deviceError}</p>}
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

          <div className="flex gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl">
            <FiInfo size={13} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
              <strong>How to use:</strong> Drag the compass dial to rotate. Align the N marker with the North direction on your floor plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
