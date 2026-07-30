/**
 * VastuPurushaHero.jsx — Vastu Bhagavan reveal with unique animations
 * Uses anime-vastu.png
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import animeVastuImg from '../../assets/vastu-anime.jpeg'

// ── Sanskrit / Vedic rune characters that orbit ──────────────────────────────
const RUNES = ['ॐ','᳚','ऐं','श्री','ह्रीं','क्लीं','ॐ','᳚','ऐं','᳚','ॐ','᳚']

const DEITY_PILLS = [
  { dir:'NE', deity:'Ishan · Shiva',  element:'Space', color:'#818CF8' },
  { dir:'N',  deity:'Kubera',         element:'Water',  color:'#3B82F6' },
  { dir:'E',  deity:'Indra',          element:'Air',    color:'#F59E0B' },
  { dir:'SE', deity:'Agni',           element:'Fire',   color:'#EF4444' },
  { dir:'S',  deity:'Yama',           element:'Earth',  color:'#8B5CF6' },
  { dir:'SW', deity:'Nirriti',        element:'Earth',  color:'#B45309' },
  { dir:'W',  deity:'Varuna',         element:'Water',  color:'#0EA5E9' },
  { dir:'NW', deity:'Vayu',           element:'Air',    color:'#10B981' },
]

// ── Canvas particle / sacred geometry background ──────────────────────────────
function SacredCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H, particles = []

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Spawn particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.6 ? 30 : 260,
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.008

      // Slowly rotating sacred geometry hexagon
      ctx.save()
      ctx.translate(W / 2, H / 2)
      ctx.rotate(t * 0.12)
      for (let ring = 1; ring <= 3; ring++) {
        const R = (Math.min(W, H) * 0.38) * ring / 3
        ctx.beginPath()
        for (let s = 0; s < 6; s++) {
          const a = (s / 6) * Math.PI * 2 - Math.PI / 6
          s === 0 ? ctx.moveTo(Math.cos(a)*R, Math.sin(a)*R)
                  : ctx.lineTo(Math.cos(a)*R, Math.sin(a)*R)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(201,117,74,${0.04 + ring * 0.018})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
      ctx.restore()

      // Particles + connections
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${p.alpha})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 80) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201,117,74,${(1 - d/80) * 0.12})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
}

// ── Orbiting rune ring ────────────────────────────────────────────────────────
function RuneOrbit({ radius, duration, runes, clockwise = true, color }) {
  return (
    <motion.div
      style={{ position:'absolute', inset:0, pointerEvents:'none' }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {runes.map((r, i) => {
        const angle = (i / runes.length) * 360
        const rad   = (angle * Math.PI) / 180
        const x     = 50 + radius * Math.cos(rad - Math.PI / 2)
        const y     = 50 + radius * Math.sin(rad - Math.PI / 2)
        return (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`, top: `${y}%`,
              transform: 'translate(-50%,-50%)',
              fontSize: '10px', fontWeight: 900,
              color, fontFamily: 'serif',
              textShadow: `0 0 8px ${color}`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          >
            {r}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

// ── 3-D tilt card — tilt disabled to prevent shaking on hover ────────────────
function TiltCard({ children }) {
  return <div>{children}</div>
}

// ── Glitch text effect component ─────────────────────────────────────────────
function GlitchText({ children, style }) {
  const [glitch, setGlitch] = useState(false)
  useEffect(() => {
    const fire = () => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }
    const interval = setInterval(fire, 3500 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <span
      style={{
        ...style,
        display: 'inline-block',
        position: 'relative',
        transition: 'none',
        ...(glitch ? {
          textShadow: '2px 0 #EF4444, -2px 0 #3B82F6',
          transform: 'translate(1px, 0)',
        } : {}),
      }}
    >
      {children}
    </span>
  )
}

// ── Animated aura pulse rings — kept for potential future use ─────────────────
function AuraPulse() {
  return (
    <>
      {[0, 0.6, 1.2, 1.8].map((delay, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: `1px solid rgba(240,192,64,${0.35 - i * 0.07})`,
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.18 + i * 0.06], opacity: [0.8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

// ── Tamil Vastu date labels that float around the image on hover/click ────────
const VASTU_DATES = [
  { ta: 'வாஸ்து',   en: 'Vastu',    color: '#F59E0B' },
  { ta: 'அஷ்டமி',  en: 'Ashtami',  color: '#C9754A' },
  { ta: 'நவமி',    en: 'Navami',   color: '#818CF8' },
  { ta: 'பௌர்ணமி', en: 'Pournami', color: '#34D399' },
]

// CSS classes injected once for the pill positions — desktop only
const PILL_CSS = `
.vd-pill { position:absolute; pointer-events:none; z-index:30; display:flex; align-items:center; justify-content:center; }
.vd-pill-top    { top:0;   left:50%; transform:translate(-50%,-110%); }
.vd-pill-right  { top:50%; right:0;  transform:translate(110%,-50%);  }
.vd-pill-bottom { bottom:0;left:50%; transform:translate(-50%,110%);  }
.vd-pill-left   { top:50%; left:0;   transform:translate(-110%,-50%); }

/* On mobile: smaller pill offset so pills sit tighter to the image */
@media (max-width: 1023px) {
  .vd-pill-top    { transform:translate(-50%,-105%); }
  .vd-pill-right  { transform:translate(105%,-50%);  }
  .vd-pill-bottom { transform:translate(-50%,105%);  }
  .vd-pill-left   { transform:translate(-105%,-50%); }
}
`

const PILL_CLASSES = ['vd-pill vd-pill-top','vd-pill vd-pill-right','vd-pill vd-pill-bottom','vd-pill vd-pill-left']

if (typeof document !== 'undefined' && !document.getElementById('vd-pill-style')) {
  const s = document.createElement('style')
  s.id = 'vd-pill-style'
  s.textContent = PILL_CSS
  document.head.appendChild(s)
}

// Shared pill inner content — `small` prop renders compact mobile version
function PillInner({ item, small }) {
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: small ? '1px' : '2px',
      background: 'rgba(6, 4, 1, 0.85)',
      border: `1px solid ${item.color}50`,
      borderRadius: small ? '6px' : '8px',
      padding: small ? '3px 7px' : '5px 11px',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: `0 2px 12px rgba(0,0,0,0.6), 0 0 8px ${item.color}20`,
      whiteSpace: 'nowrap',
      lineHeight: 1,
    }}>
      <div style={{
        width: small ? '3px' : '4px',
        height: small ? '3px' : '4px',
        borderRadius: '50%',
        background: item.color,
        boxShadow: `0 0 5px ${item.color}`,
        marginBottom: '1px',
      }} />
      <span style={{
        fontSize: small ? '9px' : '12px',
        fontFamily: '"Noto Sans Tamil", "Latha", serif',
        fontWeight: 700,
        color: item.color,
      }}>{item.ta}</span>
      <span style={{
        fontSize: small ? '6px' : '7px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
      }}>{item.en}</span>
    </div>
  )
}

// Desktop: floating pills around the image edges
function VastuDateOrbit({ active, small }) {
  return (
    <AnimatePresence>
      {active && VASTU_DATES.map((item, i) => (
        <div key={item.en} className={PILL_CLASSES[i]}>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <PillInner item={item} small={small} />
          </motion.div>
        </div>
      ))}
    </AnimatePresence>
  )
}

 

// ── Tool cards data ───────────────────────────────────────────────────────────
const TOOL_CARDS = [
  { id:'calculator', icon:'📐', label:'Dimension', sub:'Calculator', desc:'Auspicious room sizes', route:'/manaiyadi/calculator',      color:'#F59E0B', num:'01' },
  { id:'compass',    icon:'🧭', label:'Direction',  sub:'Compass',    desc:'Score your home Vastu', route:'/vastu-compass',               color:'#818CF8', num:'02' },
  { id:'guide',      icon:'📏', label:'Dimension',  sub:'Guide',      desc:'Full measurement table', route:'/manaiyadi/dimension-guide',   color:'#34D399', num:'03' },
  { id:'cost',       icon:'💰', label:'Cost',        sub:'Estimator',  desc:'Plan your budget',       route:'/cost-estimator',              color:'#F472B6', num:'04' },
]

// ── Single nav card ───────────────────────────────────────────────────────────
function NavCard({ card, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onClick={() => onClick(card.route)}
      style={{
        flex: '1 1 0', minWidth: 0, cursor: 'pointer',
        background: hov
          ? `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, ${card.color}12 100%)`
          : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${hov ? card.color + '80' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '16px', padding: '16px 14px',
        boxShadow: hov ? `0 8px 32px ${card.color}30, 0 0 0 1px ${card.color}20` : 'none',
        transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Shimmer sweep */}
      {hov && (
        <motion.div
          initial={{ x: '-110%' }} animate={{ x: '120%' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `linear-gradient(105deg, transparent 25%, ${card.color}15 50%, transparent 75%)`,
          }}
        />
      )}
      {/* Number */}
      <span style={{
        position: 'absolute', top: '10px', right: '12px',
        fontSize: '9px', fontWeight: 900, color: `${card.color}50`, letterSpacing: '0.1em',
      }}>{card.num}</span>
      {/* Icon */}
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px', marginBottom: '10px',
        background: hov ? `${card.color}20` : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${hov ? card.color + '70' : 'rgba(255,255,255,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', transition: 'all 0.25s',
        boxShadow: hov ? `0 0 20px ${card.color}40` : 'none',
      }}>{card.icon}</div>
      {/* Label */}
      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: card.color, textTransform: 'uppercase', margin: '0 0 2px' }}>{card.label}</p>
      <p style={{ fontSize: '15px', fontWeight: 900, color: '#FAF9F6', letterSpacing: '-0.02em', margin: '0 0 5px', lineHeight: 1.1 }}>{card.sub}</p>
      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', fontWeight: 400, margin: '0 0 10px', lineHeight: 1.4 }}>{card.desc}</p>
      {/* CTA arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ height: '1px', width: hov ? '24px' : '12px', background: card.color, transition: 'width 0.25s', opacity: 0.7 }} />
        <span style={{ fontSize: '11px', color: card.color, fontWeight: 900, transition: 'transform 0.2s', transform: hov ? 'translateX(3px)' : 'none' }}>→</span>
      </div>
      {/* Bottom colour bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${card.color}90, transparent)`,
        opacity: hov ? 1 : 0, transition: 'opacity 0.25s',
      }} />
    </motion.div>
  )
}

// ── Vastu Bhagavan image panel ────────────────────────────────────────────────
function VastuBhagavanPanel() {
  const [revealed, setRevealed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300)
    return () => clearTimeout(t)
  }, [])

  const handleNavigate = (route) => {
    navigate(route)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}>
      {/* ── Image with halos ── */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        {/* Spin halos */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: '-24px', borderRadius: '50%', pointerEvents: 'none',
            background: 'conic-gradient(from 0deg, transparent 60%, rgba(201,117,74,0.18) 75%, transparent 90%)' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: '-50px', borderRadius: '50%', pointerEvents: 'none',
            background: 'conic-gradient(from 180deg, transparent 70%, rgba(130,100,220,0.12) 82%, transparent 94%)' }} />
        {/* Runes */}
        <div style={{ position: 'absolute', inset: '-20px', pointerEvents: 'none' }}>
          <RuneOrbit radius={42} duration={22} runes={RUNES.slice(0,6)}  clockwise={true}  color="rgba(201,117,74,0.7)" />
          <RuneOrbit radius={52} duration={38} runes={RUNES.slice(6,12)} clockwise={false} color="rgba(130,100,220,0.5)" />
        </div>
        {/* Image — always bright */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence>
            {revealed && (
              <motion.img src={animeVastuImg} alt="Vastu Bhagavan — Vedic deity of sacred architecture"
                initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            )}
          </AnimatePresence>
          {/* Corner brackets */}
          {[['0','0','rotate(0deg)'],['0','auto','rotate(90deg)'],['auto','0','rotate(-90deg)'],['auto','auto','rotate(180deg)']].map(([t,b,rot],i) => (
            <div key={i} style={{
              position: 'absolute', top: t!=='auto'?t:undefined, bottom: b!=='auto'?b:undefined,
              left: i<2?'0':undefined, right: i>=2?'0':undefined,
              width: '22px', height: '22px', transform: rot,
              borderTop: '2.5px solid rgba(201,117,74,0.85)', borderLeft: '2.5px solid rgba(201,117,74,0.85)',
              pointerEvents: 'none',
            }} />
          ))}
        </div>
      </div>

      {/* ── Divider with label ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,117,74,0.4))' }} />
        <span style={{ fontSize: '8.5px', fontWeight: 900, letterSpacing: '0.3em', color: 'rgba(201,117,74,0.8)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          🔱 Vastu Tools
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(201,117,74,0.4),transparent)' }} />
      </div>

      {/* ── 4 nav cards in a 2×2 grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {TOOL_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <NavCard card={card} onClick={handleNavigate} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Floating fire/water/air energy sparks ─────────────────────────────────────
const SPARKS = [
  { x:8,  y:18, icon:'🔥', delay:0,   dur:4   },
  { x:92, y:25, icon:'💧', delay:1.2, dur:3.5 },
  { x:5,  y:72, icon:'🌬', delay:0.6, dur:5   },
  { x:94, y:65, icon:'⚡', delay:1.8, dur:4.2 },
  { x:50, y:5,  icon:'✨', delay:0.3, dur:3.8 },
  { x:20, y:88, icon:'🌍', delay:2.1, dur:4.5 },
  { x:80, y:85, icon:'🔱', delay:0.9, dur:4.8 },
  { x:48, y:95, icon:'ॐ',  delay:1.5, dur:5.2 },
]

// ── Main export ───────────────────────────────────────────────────────────────
export default function VastuPurushaHero() {
  const prefersReduced = useReducedMotion()

  return (
    <section style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1C120A 0%, #0D0A06 55%, #080608 100%)',
      minHeight: '100vh', paddingTop: '80px',
      position: 'relative', overflow: 'clip',
    }}>
      {/* Canvas particle field + sacred geometry */}
      {!prefersReduced && <SacredCanvas />}

      {/* Floating element sparks */}
      {!prefersReduced && SPARKS.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            fontSize: typeof s.icon === 'string' && s.icon.length > 1 && s.icon.charCodeAt(0) < 256 ? '11px' : '18px',
            pointerEvents: 'none', userSelect: 'none',
            filter: 'drop-shadow(0 0 6px rgba(240,192,64,0.6))',
          }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.85, 0.2], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          {s.icon}
        </motion.div>
      ))}

      {/* Ambient colour blobs */}
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)',
        width:'700px', height:'450px', borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(ellipse, rgba(201,117,74,0.1) 0%, transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'0%', right:'-10%',
        width:'500px', height:'500px', borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)' }} />
      <div style={{ position:'absolute', top:'30%', left:'-8%',
        width:'350px', height:'350px', borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
            >
              <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg,transparent,#C9754A)' }} />
              <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.45em', color: '#B85C38', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                Vedic Architecture · Vastu Shastra
              </span>
              <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#C9754A,transparent)' }} />
            </motion.div>

            {/* Main heading with glitch */}
            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '24px', letterSpacing: '-0.02em' }}
            >
              <span style={{ color: '#FAF9F6', display: 'block' }}>Sree Vastu</span>
              <GlitchText style={{
                display: 'block',
                WebkitTextStroke: '1.5px rgba(201,117,74,0.9)',
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #C9754A 0%, #F59E0B 50%, #C9754A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
              }}>
                Bhagwan
              </GlitchText>
            </motion.h1>

            {/* Animated gold divider */}
            <motion.div
              initial={prefersReduced ? {} : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '2px', width: '60px', marginBottom: '24px', transformOrigin: 'left',
                background: 'linear-gradient(90deg, #C9754A, #F59E0B, #C9754A)',
              }}
            />

            {/* Description */}
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(250,249,246,0.5)', fontWeight: 300, maxWidth: '440px', marginBottom: '28px' }}
            >
              The presiding deity of every structure — born from the sweat of Lord Shiva,
              pinned face-down by Brahma and 45 Devatas. His body forms the sacred cosmic
              grid that governs every room, every wall, every threshold.
            </motion.p>

            {/* Animated fact list */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {[
                { icon:'🔱', text:'Head at NE (Ishan / Shiva) — highest spiritual zone' },
                { icon:'⛰️', text:'Feet at SW (Nairuta) — heavy, stable earth energy' },
                { icon:'🪷', text:'Navel at Brahmasthan (centre) — must remain open' },
                { icon:'45', text:'45 Devatas occupy zones of his body and bless the house' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <span style={item.icon === '45'
                    ? { fontSize: '10px', fontWeight: 900, color: '#C9754A', minWidth: '18px', textAlign: 'center', marginTop: '2px' }
                    : { fontSize: '16px', minWidth: '18px' }}>
                    {item.icon}
                  </span>
                  <p style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(250,249,246,0.5)', lineHeight: 1.6 }}>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Deity pills */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}
            >
              {DEITY_PILLS.map((p, i) => (
                <motion.div
                  key={p.dir}
                  whileHover={{ scale: 1.08, y: -2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '5px 12px', borderRadius: '999px',
                    background: `${p.color}1A`, border: `1px solid ${p.color}40`,
                    cursor: 'default',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.05em', color: p.color }}>{p.dir}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{p.deity}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
            >
              <motion.a
                href="#compass-tool"
                whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(184,92,56,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={e => {
                  e.preventDefault()
                  window.scrollBy({ top: window.innerHeight * 0.95, behavior: 'smooth' })
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '14px 32px', borderRadius: '2px',
                  fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #B85C38, #C9754A)',
                  color: '#FAF9F6',
                  boxShadow: '0 0 32px rgba(184,92,56,0.3)',
                  textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <motion.span
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
                <span style={{ position: 'relative' }}>Check Your Home's Vastu</span>
                <motion.span
                  style={{ position: 'relative', fontSize: '18px' }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >→</motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT: Vastu image + tool grid ── */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:py-0"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'visible' }}
          >
            <VastuBhagavanPanel />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '64px', gap: '8px' }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 600 }}>
            Hover the image · Explore Vastu tools
          </p>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(201,117,74,0.6), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
