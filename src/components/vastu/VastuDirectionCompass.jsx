/**
 * VastuDirectionCompass.jsx
 * Static 8-direction Vastu compass — click any direction to see
 * detailed Vastu Shastra info from the Vaasthu Saasthra model PDF.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Vastu data from the PDF ──────────────────────────────────────────────────
const VASTU_DATA = {
  N: {
    label: 'North',
    tamil: 'வடக்கு',
    deity: 'குபேரன் (Kubera)',
    planet: 'புதன் (Mercury)',
    element: 'Water · நீர்',
    elementIcon: '💧',
    color: '#3B82F6',
    bgLight: '#EFF6FF',
    borderColor: '#93C5FD',
    corner: false,
    rooms: [
      { name: 'தலை வாசல்', en: 'Main Entrance', icon: '🚪', note: 'North-facing entrance is highly auspicious — Kubera blesses with wealth' },
      { name: 'படிக்கும் அறை', en: 'Study Room', icon: '📚', note: 'Mercury governs intelligence — ideal for children\'s study' },
      { name: 'அலுவலக அறை', en: 'Office / Work Room', icon: '💼', note: 'Kubera, god of wealth, favours financial activities in the North' },
    ],
    rules: [
      'Keep North side open & low — do not build high walls or plant large trees',
      'Water bodies, bore wells, and underground tanks are auspicious here',
      'Doors on North attract prosperity and career growth',
      'Avoid kitchen or fire-related activities in this zone',
    ],
    vastu_tip: 'The North is the direction of Kubera — god of wealth. Keep this area clean, bright, and clutter-free to attract financial abundance.',
    angle_note: 'Corner angles at NW & NE should be 90° or slightly obtuse (90°+)',
  },
  S: {
    label: 'South',
    tamil: 'தெற்கு',
    deity: 'யமன் (Yama)',
    planet: 'செவ்வாய் (Mars)',
    element: 'Earth · மண்',
    elementIcon: '🌍',
    color: '#92400E',
    bgLight: '#FEF3C7',
    borderColor: '#FCD34D',
    corner: false,
    rooms: [
      { name: 'பிரதான படுக்கையறை', en: 'Master Bedroom', icon: '🛏️', note: 'South is stable and heavy — ideal for the master of the house' },
      { name: 'சேமிப்பு அறை', en: 'Storage Room', icon: '📦', note: 'Heavy goods and storage suit the South zone well' },
    ],
    rules: [
      'Plant large trees on the South side to block harsh afternoon heat',
      'Build higher walls/compound walls on the South — adds stability',
      'Avoid main entrance on the South (Yama\'s direction)',
      'Master bedroom head placement: head towards South while sleeping',
    ],
    vastu_tip: 'South is ruled by Yama (dharma & death). This zone must be heavier and higher than the North. A strong South gives stability and longevity to the household.',
    angle_note: 'SW corner must be exactly 90°. SE corner can be 90° or slightly acute (90°-)',
  },
  E: {
    label: 'East',
    tamil: 'கிழக்கு',
    deity: 'இந்திரன் (Indra)',
    planet: 'சூரியன் (Sun)',
    element: 'Air · காற்று',
    elementIcon: '🌬️',
    color: '#D97706',
    bgLight: '#FFFBEB',
    borderColor: '#FCD34D',
    corner: false,
    rooms: [
      { name: 'தலை வாசல்', en: 'Main Entrance', icon: '🚪', note: 'East entrance receives morning sun — most auspicious entry' },
      { name: 'படிக்கும் அறை', en: 'Study / Puja Room', icon: '🪔', note: 'Morning sun energises the East — excellent for prayers and study' },
      { name: 'குளியல் அறை', en: 'Bathroom', icon: '🚿', note: 'East-facing bath at 100% position — morning sun and cleanliness align' },
    ],
    rules: [
      'Keep the East open and low — no high trees or compound walls',
      'Small plants (சிறிய செடி) only on the East side',
      'Morning sun from the East purifies and energises the home',
      'Indra governs prosperity — East doors attract health and success',
    ],
    vastu_tip: 'East is ruled by Indra — king of gods. The rising sun in the East is the most powerful Vastu force. Always keep the East wall lower than the West wall.',
    angle_note: 'Keep the East boundary open; ENE and ESE are under Mercury and Jupiter respectively',
  },
  W: {
    label: 'West',
    tamil: 'மேற்கு',
    deity: 'வருணன் (Varuna)',
    planet: 'சனி (Saturn)',
    element: 'Water · நீர்',
    elementIcon: '💧',
    color: '#0EA5E9',
    bgLight: '#E0F2FE',
    borderColor: '#7DD3FC',
    corner: false,
    rooms: [
      { name: 'சாப்பிடும் அறை', en: 'Dining Room', icon: '🍽️', note: 'West is suitable for dining — Varuna, water god, aids digestion' },
      { name: 'குழந்தை படுக்கையறை', en: 'Children\'s Bedroom', icon: '🧒', note: 'Saturn\'s discipline in the West supports study and rest for children' },
    ],
    rules: [
      'Plant large trees on the West side to block hot afternoon sun',
      'Build the West wall higher than the East wall',
      'Avoid main entrance on the West — Varuna faces the ocean',
      'Staircase can be placed on the West side',
    ],
    vastu_tip: 'West is ruled by Varuna — god of water and cosmic order. The West side must be heavier and higher than the East. Large trees on the West block the afternoon sun.',
    angle_note: 'WSW zone is under Sugriva; WNW under Pushpadanta — avoid heavy water bodies here',
  },
  NE: {
    label: 'North-East',
    tamil: 'வட கிழக்கு (ஈசானன்)',
    deity: 'ஈசானன் (Ishana · Shiva)',
    planet: 'குரு (Jupiter)',
    element: 'Space · ஆகாயம்',
    elementIcon: '✨',
    color: '#6D28D9',
    bgLight: '#EDE9FE',
    borderColor: '#A78BFA',
    corner: true,
    rooms: [
      { name: 'பூஜை அறை', en: 'Puja / Prayer Room', icon: '🪔', note: 'NE is the most sacred zone — deity altar must face NE or East' },
      { name: 'படிக்கும் அறை', en: 'Study Room', icon: '📚', note: 'Jupiter governs wisdom — children\'s study in NE ensures academic success' },
      { name: 'வயதானோர் படுக்கையறை', en: 'Elder\'s Bedroom', icon: '👴', note: 'Calm, sacred NE energy supports elders\' health and spirituality' },
      { name: 'ஆழ்துளை கிணறு', en: 'Bore Well / Water Source', icon: '💧', note: 'PDF clearly marks: deep bore well in NE corner is MOST auspicious' },
    ],
    rules: [
      'MOST sacred corner — never place toilets, kitchen, or heavy items here',
      'Bore well or water tank in NE corner is highly auspicious (PDF-marked)',
      'Keep NE open, clean, and at the lowest elevation of the plot',
      'NE corner angle should be 90° or slightly obtuse (90°+) per PDF',
      'Prayer room here multiplies positive energy throughout the home',
    ],
    vastu_tip: '🌟 NE is the divine corner of Ishana (Shiva). The PDF diagram specifically marks the bore well (ஆழ்துளை கிணறு) here. This is the most auspicious zone — protect it with reverence.',
    angle_note: 'PDF marks NE corner: (90° & 90°+) — slightly open angle is ideal',
  },
  NW: {
    label: 'North-West',
    tamil: 'வட மேற்கு (வாயு)',
    deity: 'வாயு (Vayu)',
    planet: 'சந்திரன் (Moon)',
    element: 'Air · காற்று',
    elementIcon: '🌬️',
    color: '#059669',
    bgLight: '#D1FAE5',
    borderColor: '#6EE7B7',
    corner: true,
    rooms: [
      { name: 'வயதானோர் படுக்கையறை', en: 'Guest / Elder Bedroom', icon: '🛏️', note: 'NW guests leave quickly — good for guest rooms (transient energy)' },
      { name: 'தலை வாசல்', en: 'Secondary Entrance', icon: '🚪', note: 'Secondary door on NW is acceptable — Moon\'s energy welcomes guests' },
      { name: 'கோழி / மாட்டுத் தொழுவம்', en: 'Livestock / Store', icon: '🐄', note: 'Vayu\'s movement supports animal pens and airy storage in NW' },
    ],
    rules: [
      'NW is ruled by Vayu (wind) — movement and change happen here',
      'Guests, unmarried daughters, or temporary residents suit the NW',
      'Garage or vehicle parking fits well in the NW zone',
      'Avoid permanent heavy structures — energy here is transient',
      'NW corner angle should be 90° or slightly obtuse (90°+) per PDF',
    ],
    vastu_tip: 'NW is Vayu\'s corner — the god of wind brings movement and change. Rooms here attract temporary occupants. Perfect for guests, storage, or parking areas.',
    angle_note: 'PDF marks NW corner: (90° & 90°+) — slightly open angle is good for air flow',
  },
  SE: {
    label: 'South-East',
    tamil: 'தென் கிழக்கு (அக்னி)',
    deity: 'அக்னி (Agni)',
    planet: 'சுக்கிரன் (Venus)',
    element: 'Fire · நெருப்பு',
    elementIcon: '🔥',
    color: '#DC2626',
    bgLight: '#FEE2E2',
    borderColor: '#FCA5A5',
    corner: true,
    rooms: [
      { name: 'சமையலறை', en: 'Kitchen', icon: '🍳', note: 'PDF clearly marks: Kitchen at 50% position on SE zone — Agni (fire) rules here' },
      { name: 'மின் அமைப்பு', en: 'Electrical Panel / Generator', icon: '⚡', note: 'All electrical and fire-related equipment belongs in the SE' },
      { name: 'வாகன நிறுத்தம்', en: 'Boiler / Water Heater', icon: '♨️', note: 'Heat-generating appliances are auspicious in Agni\'s zone' },
    ],
    rules: [
      'Kitchen MUST be in SE — Agni governs cooking fire (PDF: 50% position)',
      'Gas cylinder, electrical boards, and generators belong here',
      'Avoid placing water tank or bore well in SE — fire and water conflict',
      'SE corner angle should be 90° or slightly acute (90°-) per PDF',
      'Cook facing East while standing in SE kitchen for best results',
    ],
    vastu_tip: '🔥 SE is Agni\'s sacred fire corner. The PDF diagram explicitly marks the kitchen (சமையலறை) at 50% on the SE wall. Never place a bedroom or puja room here.',
    angle_note: 'PDF marks SE corner: (90° & 90°-) — slightly closed angle contains fire energy',
  },
  SW: {
    label: 'South-West',
    tamil: 'தென் மேற்கு (நிருதி)',
    deity: 'நிருதி (Nirriti)',
    planet: 'ராகு (Rahu)',
    element: 'Earth · மண்',
    elementIcon: '🌍',
    color: '#78350F',
    bgLight: '#FEF3C7',
    borderColor: '#FCD34D',
    corner: true,
    rooms: [
      { name: 'பிரதான படுக்கையறை', en: 'Master Bedroom', icon: '🛏️', note: 'SW is the heaviest, most stable zone — PDF marks master bedroom here' },
      { name: 'சேமிப்பு அறை', en: 'Heavy Storage / Safe Room', icon: '🔐', note: 'Heavy items, valuables, and safes belong in SW for stability' },
    ],
    rules: [
      'Master bedroom MUST be in SW — heaviest, most stable corner',
      'Head of household should sleep with head pointing South or West',
      'Build the highest walls and heaviest structures in SW',
      'NEVER place a bore well, water tank, or toilet in SW',
      'SW corner must be exactly 90° — the most critical angle in Vastu',
      'Avoid large windows or openings in SW — keeps stability anchored',
    ],
    vastu_tip: '⚠️ SW is ruled by Nirriti — the inauspicious deity. But when used correctly, it becomes the anchor of the home. The heaviest room (master bedroom) here grounds the entire structure.',
    angle_note: 'PDF marks SW corner: exactly (90°) — must never be cut, opened, or altered',
  },
}

// ─── Compass geometry helpers ─────────────────────────────────────────────────
const CX = 200, CY = 200, R = 190

const polar = (cx, cy, r, angleDeg) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// Build a wedge path for an 8-direction segment
const wedgePath = (startDeg, endDeg, rOuter, rInner) => {
  const s1 = polar(CX, CY, rOuter, startDeg)
  const e1 = polar(CX, CY, rOuter, endDeg)
  const s2 = polar(CX, CY, rInner, endDeg)
  const e2 = polar(CX, CY, rInner, startDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ')
}

// 8 zones: each covers 45°
const COMPASS_ZONES = [
  { id: 'N',  label: 'N',  tamil: 'வடக்கு',       startDeg: -22.5, endDeg: 22.5,  midDeg: 0,   labelR: 140 },
  { id: 'NE', label: 'NE', tamil: 'வட கிழக்கு',   startDeg: 22.5,  endDeg: 67.5,  midDeg: 45,  labelR: 140 },
  { id: 'E',  label: 'E',  tamil: 'கிழக்கு',       startDeg: 67.5,  endDeg: 112.5, midDeg: 90,  labelR: 140 },
  { id: 'SE', label: 'SE', tamil: 'தென் கிழக்கு', startDeg: 112.5, endDeg: 157.5, midDeg: 135, labelR: 140 },
  { id: 'S',  label: 'S',  tamil: 'தெற்கு',        startDeg: 157.5, endDeg: 202.5, midDeg: 180, labelR: 140 },
  { id: 'SW', label: 'SW', tamil: 'தென் மேற்கு',  startDeg: 202.5, endDeg: 247.5, midDeg: 225, labelR: 140 },
  { id: 'W',  label: 'W',  tamil: 'மேற்கு',        startDeg: 247.5, endDeg: 292.5, midDeg: 270, labelR: 140 },
  { id: 'NW', label: 'NW', tamil: 'வட மேற்கு',    startDeg: 292.5, endDeg: 337.5, midDeg: 315, labelR: 140 },
]

const DIRECTION_COLORS = {
  N:  { fill: '#DBEAFE', stroke: '#3B82F6', hover: '#BFDBFE', text: '#1D4ED8' },
  NE: { fill: '#EDE9FE', stroke: '#7C3AED', hover: '#DDD6FE', text: '#5B21B6' },
  E:  { fill: '#FEF3C7', stroke: '#D97706', hover: '#FDE68A', text: '#92400E' },
  SE: { fill: '#FEE2E2', stroke: '#DC2626', hover: '#FECACA', text: '#991B1B' },
  S:  { fill: '#FEF9C3', stroke: '#A16207', hover: '#FEF08A', text: '#713F12' },
  SW: { fill: '#FEF3C7', stroke: '#92400E', hover: '#FDE68A', text: '#78350F' },
  W:  { fill: '#E0F2FE', stroke: '#0284C7', hover: '#BAE6FD', text: '#0C4A6E' },
  NW: { fill: '#D1FAE5', stroke: '#059669', hover: '#A7F3D0', text: '#065F46' },
}

// ─── Compass SVG ──────────────────────────────────────────────────────────────
function CompassSVG({ selected, hovered, onSelect, onHover }) {
  const R_OUTER = 172
  const R_INNER = 56

  // Cardinal needle tip markers
  const cardinalDirs = [
    { id: 'N', deg: 0,   color: '#DC2626', size: 48 },
    { id: 'S', deg: 180, color: '#2563EB', size: 36 },
    { id: 'E', deg: 90,  color: '#D97706', size: 36 },
    { id: 'W', deg: 270, color: '#0284C7', size: 36 },
  ]

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full select-none"
      style={{ cursor: 'default' }}
    >
      <defs>
        <filter id="vdc-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="vdc-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00000020" />
        </filter>
        <radialGradient id="vdc-center" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
        <radialGradient id="vdc-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
      </defs>

      {/* Outer bezel */}
      <circle cx={CX} cy={CY} r={195} fill="url(#vdc-bg)" filter="url(#vdc-shadow)" />
      <circle cx={CX} cy={CY} r={190} fill="none" stroke="#CBD5E1" strokeWidth={2} />
      <circle cx={CX} cy={CY} r={185} fill="none" stroke="#E2E8F0" strokeWidth={0.8} />

      {/* Degree tick marks on bezel */}
      {Array.from({ length: 72 }, (_, i) => {
        const deg = i * 5
        const is45 = deg % 45 === 0
        const is90 = deg % 90 === 0
        const len = is90 ? 11 : is45 ? 7 : 3.5
        const outerR = 185
        const o = polar(CX, CY, outerR, deg)
        const inn = polar(CX, CY, outerR - len, deg)
        return (
          <line key={deg} x1={o.x} y1={o.y} x2={inn.x} y2={inn.y}
            stroke={is90 ? '#64748B' : is45 ? '#94A3B8' : '#CBD5E1'}
            strokeWidth={is90 ? 2 : is45 ? 1.2 : 0.6}
          />
        )
      })}

      {/* Clickable wedge segments */}
      {COMPASS_ZONES.map(zone => {
        const isSelected = selected === zone.id
        const isHovered  = hovered === zone.id
        const c = DIRECTION_COLORS[zone.id]
        const fill = isSelected ? c.hover : isHovered ? c.hover : c.fill
        return (
          <g key={zone.id}>
            <path
              d={wedgePath(zone.startDeg, zone.endDeg, R_OUTER, R_INNER)}
              fill={fill}
              stroke={isSelected || isHovered ? c.stroke : '#E2E8F0'}
              strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 1}
              style={{ cursor: 'pointer', transition: 'fill 0.18s, stroke 0.18s' }}
              onClick={() => onSelect(zone.id)}
              onMouseEnter={() => onHover(zone.id)}
              onMouseLeave={() => onHover(null)}
            />
            {/* Selected glow ring */}
            {isSelected && (
              <path
                d={wedgePath(zone.startDeg, zone.endDeg, R_OUTER + 5, R_INNER - 3)}
                fill="none"
                stroke={c.stroke}
                strokeWidth={2.5}
                opacity={0.4}
                style={{ pointerEvents: 'none' }}
              />
            )}
          </g>
        )
      })}

      {/* Separator lines between zones */}
      {COMPASS_ZONES.map(zone => {
        const o = polar(CX, CY, R_OUTER, zone.startDeg)
        const i = polar(CX, CY, R_INNER, zone.startDeg)
        return (
          <line key={`sep-${zone.id}`}
            x1={o.x} y1={o.y} x2={i.x} y2={i.y}
            stroke="#FFFFFF" strokeWidth={1.5}
            style={{ pointerEvents: 'none' }}
          />
        )
      })}

      {/* Direction labels */}
      {COMPASS_ZONES.map(zone => {
        const isSelected = selected === zone.id
        const isHovered  = hovered === zone.id
        const c = DIRECTION_COLORS[zone.id]
        const isCardinal = ['N', 'E', 'S', 'W'].includes(zone.id)
        const lp = polar(CX, CY, zone.labelR, zone.midDeg)
        const tp = polar(CX, CY, zone.labelR - 20, zone.midDeg)
        return (
          <g key={`label-${zone.id}`} style={{ pointerEvents: 'none' }}>
            {/* Direction abbreviation */}
            <text
              x={lp.x} y={lp.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize={isCardinal ? 18 : 14}
              fontWeight={900}
              fill={isSelected || isHovered ? c.text : '#334155'}
              fontFamily="Georgia, serif"
              style={{ transition: 'fill 0.18s' }}
            >{zone.label}</text>
            {/* Tamil label */}
            <text
              x={tp.x} y={tp.y + 18}
              textAnchor="middle" dominantBaseline="central"
              fontSize={7}
              fontWeight={600}
              fill={isSelected || isHovered ? c.text : '#94A3B8'}
              fontFamily="sans-serif"
              style={{ transition: 'fill 0.18s' }}
            >{zone.tamil}</text>
          </g>
        )
      })}

      {/* Inner ring */}
      <circle cx={CX} cy={CY} r={R_INNER + 2} fill="#FFFFFF" stroke="#E2E8F0" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={R_INNER}     fill="#F8FAFC" stroke="#CBD5E1" strokeWidth={1.5} />

      {/* Compass needle star */}
      {cardinalDirs.map(({ id, deg, color, size }) => {
        const tip  = polar(CX, CY, R_INNER - 4, deg)
        const base = polar(CX, CY, 10, deg + 180)
        const wL   = polar(CX, CY, 7,  deg - 90)
        const wR   = polar(CX, CY, 7,  deg + 90)
        return (
          <path key={`needle-${id}`}
            d={`M ${base.x} ${base.y} L ${wL.x} ${wL.y} L ${tip.x} ${tip.y} L ${wR.x} ${wR.y} Z`}
            fill={color}
            stroke="white"
            strokeWidth={0.8}
            style={{ pointerEvents: 'none' }}
          />
        )
      })}

      {/* Hub */}
      <circle cx={CX} cy={CY} r={12} fill="url(#vdc-center)" stroke="#CBD5E1" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx={CX} cy={CY} r={4}  fill="#1E293B" style={{ pointerEvents: 'none' }} />
      <circle cx={CX - 1.5} cy={CY - 1.5} r={1.8} fill="rgba(255,255,255,0.6)" style={{ pointerEvents: 'none' }} />

      {/* Cardinal N marker on outer rim */}
      {(() => {
        const p = polar(CX, CY, 192, 0)
        return (
          <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
            fontSize={10} fontWeight={900} fill="#DC2626" fontFamily="sans-serif"
            style={{ pointerEvents: 'none' }}
          >▲</text>
        )
      })()}

      {/* Degree labels at cardinal points on bezel */}
      {[{ deg: 0, lbl: 'N' }, { deg: 90, lbl: 'E' }, { deg: 180, lbl: 'S' }, { deg: 270, lbl: 'W' }].map(({ deg, lbl }) => {
        const p = polar(CX, CY, 178, deg)
        return (
          <text key={`rim-${lbl}`} x={p.x} y={p.y}
            textAnchor="middle" dominantBaseline="central"
            fontSize={8} fontWeight={800} fill="#64748B" fontFamily="monospace"
            style={{ pointerEvents: 'none' }}
          >{deg}°</text>
        )
      })}
    </svg>
  )
}

// ─── Info Panel ───────────────────────────────────────────────────────────────
function InfoPanel({ dirId, onClose }) {
  const d = VASTU_DATA[dirId]
  if (!d) return null

  return (
    <motion.div
      key={dirId}
      initial={{ opacity: 0, x: 28, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 28, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full overflow-y-auto"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 px-5 pt-5 pb-4"
        style={{ background: d.bgLight, borderBottom: `2px solid ${d.borderColor}` }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{d.elementIcon}</span>
              <span className="text-xs font-black uppercase tracking-widest"
                style={{ color: d.color }}>{d.element}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-tight">{d.label}</h2>
            <p className="text-sm font-bold mt-0.5" style={{ color: d.color }}>{d.tamil}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors"
            style={{ background: `${d.color}20`, border: `1.5px solid ${d.borderColor}` }}
            aria-label="Close panel"
          >
            <span className="text-slate-600 font-bold text-sm leading-none">✕</span>
          </button>
        </div>

        {/* Deity + Planet */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black"
            style={{ background: `${d.color}15`, color: d.color, border: `1px solid ${d.borderColor}` }}>
            🏛️ {d.deity}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black"
            style={{ background: `${d.color}15`, color: d.color, border: `1px solid ${d.borderColor}` }}>
            🪐 {d.planet}
          </span>
          {d.corner && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black bg-slate-100 text-slate-500 border border-slate-200">
              📐 Corner Zone
            </span>
          )}
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">

        {/* Vastu tip */}
        <div className="p-3.5 rounded-2xl border"
          style={{ background: `${d.color}08`, borderColor: d.borderColor }}>
          <p className="text-xs font-medium text-slate-700 leading-relaxed">{d.vastu_tip}</p>
        </div>

        {/* Rooms */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
            Ideal Rooms for this Zone
          </p>
          <div className="space-y-2">
            {d.rooms.map((room, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.06 }}
                className="flex gap-3 p-3 rounded-xl border"
                style={{ background: d.bgLight, borderColor: d.borderColor + '80' }}
              >
                <span className="text-xl shrink-0 mt-0.5">{room.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-800">{room.en}</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: d.color }}>{room.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{room.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
            Vastu Rules
          </p>
          <ul className="space-y-2">
            {d.rules.map((rule, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex gap-2.5 text-[11px] text-slate-700 leading-relaxed"
              >
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-black"
                  style={{ background: d.color }}>
                  {i + 1}
                </span>
                {rule}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Corner angle note */}
        <div className="flex gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-base shrink-0">📐</span>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            <strong className="text-slate-700">Corner Angle (PDF):</strong> {d.angle_note}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Mobile Bottom Sheet Modal ───────────────────────────────────────────────
function MobileInfoModal({ dirId, onClose }) {
  const d = VASTU_DATA[dirId]

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!d) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-end"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        className="w-full rounded-t-3xl overflow-hidden"
        style={{
          background: '#fff',
          maxHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
          borderTop: `3px solid ${d.borderColor}`,
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Sticky header */}
        <div className="shrink-0 px-5 pt-3 pb-4"
          style={{ background: d.bgLight, borderBottom: `1.5px solid ${d.borderColor}` }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{d.elementIcon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: d.color }}>{d.element}</span>
              </div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">{d.label}</h2>
              <p className="text-xs font-bold mt-0.5" style={{ color: d.color }}>{d.tamil}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${d.color}20`, border: `1.5px solid ${d.borderColor}` }}
              aria-label="Close"
            >
              <span className="text-slate-600 font-bold text-sm leading-none">✕</span>
            </button>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black"
              style={{ background: `${d.color}15`, color: d.color, border: `1px solid ${d.borderColor}` }}>
              🏛️ {d.deity}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black"
              style={{ background: `${d.color}15`, color: d.color, border: `1px solid ${d.borderColor}` }}>
              🪐 {d.planet}
            </span>
            {d.corner && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black bg-slate-100 text-slate-500 border border-slate-200">
                📐 Corner Zone
              </span>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4"
          style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}>

          {/* Vastu tip */}
          <div className="p-3 rounded-2xl border"
            style={{ background: `${d.color}08`, borderColor: d.borderColor }}>
            <p className="text-xs font-medium text-slate-700 leading-relaxed">{d.vastu_tip}</p>
          </div>

          {/* Rooms */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Ideal Rooms
            </p>
            <div className="space-y-2">
              {d.rooms.map((room, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl border"
                  style={{ background: d.bgLight, borderColor: d.borderColor + '80' }}
                >
                  <span className="text-lg shrink-0">{room.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-800">{room.en}</p>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: d.color }}>{room.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{room.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Vastu Rules
            </p>
            <ul className="space-y-2">
              {d.rules.map((rule, i) => (
                <li key={i} className="flex gap-2.5 text-[11px] text-slate-700 leading-relaxed">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-black"
                    style={{ background: d.color }}>
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Corner angle */}
          <div className="flex gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-2">
            <span className="text-base shrink-0">📐</span>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              <strong className="text-slate-700">Corner Angle (PDF):</strong> {d.angle_note}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center py-12">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-5xl mb-4"
      >🧭</motion.div>
      <p className="text-sm font-black text-slate-700 mb-2">Click any direction on the compass</p>
      <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[220px]">
        Tap North, South, East, West or any corner to see Vastu Shastra details for that direction
      </p>
      <div className="mt-6 grid grid-cols-4 gap-2 w-full max-w-[280px]">
        {['N ↑', 'NE ↗', 'E →', 'SE ↘', 'S ↓', 'SW ↙', 'W ←', 'NW ↖'].map(d => (
          <div key={d} className="px-2 py-1.5 rounded-lg bg-slate-100 text-[9px] font-black text-slate-400 text-center">
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function VastuDirectionCompass() {
  const [selected, setSelected] = useState(null)
  const [hovered,  setHovered]  = useState(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleSelect = (id) => {
    setSelected(prev => prev === id ? null : id)
  }

  const selectedData = selected ? VASTU_DATA[selected] : null

  return (
    <div className="w-full max-w-5xl mx-auto font-sans">

      {/* Mobile bottom-sheet modal */}
      <AnimatePresence>
        {isMobile && selected && (
          <MobileInfoModal
            key={selected}
            dirId={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* Page header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-3">
          <span className="text-xs">🔱</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Vastu Shastra · வாஸ்து சாஸ்திரம்</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
          Vastu Direction Guide
        </h1>
        <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
          Tap any direction on the compass to explore its Vastu rules, ideal rooms, and planetary ruler
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">

        {/* Left: Compass */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
          {/* Direction quick pills */}
          <div className="flex flex-wrap gap-2 mb-5 justify-center">
            {COMPASS_ZONES.map(zone => {
              const c = DIRECTION_COLORS[zone.id]
              const isActive = selected === zone.id
              return (
                <button
                  key={zone.id}
                  onClick={() => handleSelect(zone.id)}
                  className="px-3 py-1.5 rounded-xl text-[10px] font-black transition-all"
                  style={{
                    background: isActive ? c.fill : '#F8FAFC',
                    color: isActive ? c.text : '#64748B',
                    border: `1.5px solid ${isActive ? c.stroke : '#E2E8F0'}`,
                    boxShadow: isActive ? `0 0 0 3px ${c.fill}` : 'none',
                  }}
                >
                  {zone.label} · {zone.tamil}
                </button>
              )
            })}
          </div>

          {/* Compass SVG */}
          <div className="w-full max-w-sm mx-auto aspect-square">
            <CompassSVG
              selected={selected}
              hovered={hovered}
              onSelect={handleSelect}
              onHover={setHovered}
            />
          </div>

          {/* Hint */}
          <div className="mt-4 text-center">
            {hovered && !isMobile ? (
              <motion.p
                key={hovered}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold"
                style={{ color: DIRECTION_COLORS[hovered].text }}
              >
                {VASTU_DATA[hovered].label} — {VASTU_DATA[hovered].tamil} · Click to explore
              </motion.p>
            ) : (
              <p className="text-[10px] text-slate-300 font-medium">
                {isMobile
                  ? 'Tap a direction to see Vastu details'
                  : 'Hover or click a direction · Compass does not rotate — it shows true directions'}
              </p>
            )}
          </div>

          {/* Legend */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              { icon: '💧', label: 'Water zones', dirs: 'N, NNW, W' },
              { icon: '🔥', label: 'Fire zone', dirs: 'SE (Kitchen)' },
              { icon: '🌍', label: 'Earth zones', dirs: 'S, SW' },
              { icon: '🌬️', label: 'Air zones', dirs: 'E, NW' },
              { icon: '✨', label: 'Space zone', dirs: 'NE (Sacred)' },
              { icon: '📐', label: 'Corner rules', dirs: 'SW=90°, NE=90°+' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-base">{item.icon}</span>
                <div>
                  <p className="text-[9px] font-black text-slate-700">{item.label}</p>
                  <p className="text-[8px] text-slate-400 font-medium">{item.dirs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info panel — desktop only */}
        {!isMobile && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"
            style={{
              minHeight: '520px',
              borderColor: selectedData ? selectedData.borderColor : undefined,
              borderWidth: selectedData ? '2px' : '1px',
            }}>
            <AnimatePresence mode="wait">
              {selected ? (
                <InfoPanel key={selected} dirId={selected} onClose={() => setSelected(null)} />
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom source note */}
      <div className="mt-6 flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl">
        <span className="text-base shrink-0">📜</span>
        <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
          <strong>Source:</strong> Vaasthu Saasthra Model (Tamil) — traditional floor plan layout showing planetary rulers, room placements, corner angle rules, and bore well positioning based on the 8-direction Vastu Purusha Mandala.
        </p>
      </div>
    </div>
  )
}
