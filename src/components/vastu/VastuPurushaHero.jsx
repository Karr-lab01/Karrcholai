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

// ── Tool cards — 4 items, one per side ───────────────────────────────────────
const TOOL_CARDS = [
  { id:'calculator',  icon:'📐', label:'Dimension Calculator',      desc:'Find auspicious room sizes for your home',   route:'/manaiyadi/calculator',     color:'#F59E0B' },
  { id:'muhurtham',   icon:'🌸', label:'சுப முகூர்த்த தினங்கள்',   desc:'வீடு கட்ட சுப நாட்களை அறியுங்கள்',           route:'/manaiyadi/muhurtham-dates', color:'#F87171' },
  { id:'guide',       icon:'📏', label:'Dimension Guide',           desc:'Complete measurement reference table',       route:'/manaiyadi/dimension-guide',  color:'#34D399' },
  { id:'vastunaal',   icon:'🪔', label:'வாஸ்து செய்யும் நாட்கள்', desc:'வாஸ்து பூஜைக்கு உரிய நாட்களை தேர்வு செய்யுங்கள்', route:'/manaiyadi/vastu-days',  color:'#A78BFA' },
]

// ── Full-screen modal overlay with 4 tool cards ───────────────────────────────
function VastuToolsModal({ onClose, onNavigate }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    // Lock body scroll while modal is open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('resize', check)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      key="vastu-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        overflowY: 'auto',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        background: 'rgba(4,2,0,0.85)',
        top: '90px',
      }}
      onClick={onClose}
    >
      {/* Centering wrapper — pushes content below navbar */}
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '16px 20px 40px',
        }}
        onClick={onClose}
      >
      {/* Modal inner — stop propagation so clicking inside doesn't close */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >

        {/* Header row — title centered, close button right */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '48px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 900, color: '#FAF9F6', letterSpacing: '-0.02em', margin: 0 }}>
              Explore Vastu <span style={{ color: '#C9754A' }}>Tools</span>
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: '4px 0 0', fontWeight: 300 }}>
              Click any tool below to get started
            </p>
          </div>
          {/* Compact close button */}
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            transformTemplate={({ rotate, scale }) =>
              `translateY(-50%) rotate(${rotate ?? '0deg'}) scale(${scale ?? 1})`
            }
            onClick={e => { e.stopPropagation(); onClose() }}
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              outline: 'none', zIndex: 10,
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
              lineHeight: 1,
            }}
          >✕</motion.button>
        </motion.div>

        {/* Image + 4 cards layout */}
        {isMobile ? (
          /* ── MOBILE: image top, 2×2 grid below ── */
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* Image */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '140px', position: 'relative', flexShrink: 0 }}
            >
              {[0, 0.5, 1].map((d, i) => (
                <motion.div key={i}
                  style={{ position:'absolute', inset:`-${i*8}px`, borderRadius:'16px', border:'1px solid rgba(201,117,74,0.25)', pointerEvents:'none' }}
                  animate={{ opacity:[0.6,0], scale:[1,1.05+i*0.02] }}
                  transition={{ duration:2, repeat:Infinity, delay:d, ease:'easeOut' }}
                />
              ))}
              <img src={animeVastuImg} alt="Vastu Bhagavan"
                style={{ width:'100%', borderRadius:'14px', display:'block',
                  boxShadow:'0 0 40px rgba(201,117,74,0.25), 0 12px 40px rgba(0,0,0,0.7)' }} />
            </motion.div>
            {/* 2×2 card grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
              {TOOL_CARDS.map((card, i) => (
                <ModalCard key={card.id} card={card} index={i} onNavigate={onNavigate} align="left" mobile />
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: 3-col grid with image in center ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gridTemplateRows: '1fr auto 1fr',
            gap: '16px',
            alignItems: 'center',
            justifyItems: 'stretch',
            width: '100%',
          }}>
            <ModalCard card={TOOL_CARDS[0]} index={0} onNavigate={onNavigate} align="right" />
            <div />
            <ModalCard card={TOOL_CARDS[1]} index={1} onNavigate={onNavigate} align="left" />
            <div />
            {/* Center image */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '200px', position: 'relative' }}
            >
              {[0, 0.5, 1].map((d, i) => (
                <motion.div key={i}
                  style={{ position:'absolute', inset:`-${i*10}px`, borderRadius:'20px', border:'1px solid rgba(201,117,74,0.25)', pointerEvents:'none' }}
                  animate={{ opacity:[0.6,0], scale:[1,1.05+i*0.03] }}
                  transition={{ duration:2, repeat:Infinity, delay:d, ease:'easeOut' }}
                />
              ))}
              <img src={animeVastuImg} alt="Vastu Bhagavan"
                style={{ width:'100%', borderRadius:'16px', display:'block',
                  boxShadow:'0 0 60px rgba(201,117,74,0.25), 0 20px 60px rgba(0,0,0,0.7)' }} />
            </motion.div>
            <div />
            <ModalCard card={TOOL_CARDS[2]} index={2} onNavigate={onNavigate} align="right" />
            <div />
            <ModalCard card={TOOL_CARDS[3]} index={3} onNavigate={onNavigate} align="left" />
          </div>
        )}


      </motion.div>
      </div>
    </motion.div>
  )
}

// ── Single modal card ─────────────────────────────────────────────────────────
function ModalCard({ card, index, onNavigate, align, mobile }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'right' ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: align === 'right' ? -20 : 20 }}
      transition={{ duration: 0.38, delay: 0.15 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onClick={() => onNavigate(card.route)}
      style={{
        cursor: 'pointer',
        background: hov ? `linear-gradient(135deg,rgba(20,14,6,0.98),${card.color}18)` : 'rgba(12,8,3,0.9)',
        border: `1.5px solid ${hov ? card.color + '80' : card.color + '30'}`,
        borderRadius: '16px',
        padding: mobile ? '12px' : '18px 20px',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: hov
          ? `0 0 32px ${card.color}30, 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 ${card.color}20`
          : `0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
        position: 'relative', overflow: 'hidden',
        textAlign: mobile ? 'left' : align === 'right' ? 'right' : 'left',
      }}
    >
      {/* Shimmer */}
      {hov && (
        <motion.div initial={{ x: '-120%' }} animate={{ x: '140%' }} transition={{ duration: 0.5 }}
          style={{ position:'absolute',inset:0,pointerEvents:'none',
            background:`linear-gradient(105deg,transparent 30%,${card.color}18 50%,transparent 70%)` }} />
      )}

      {/* Icon + arrow */}
      <div style={{ display:'flex', alignItems:'center', justifyContent: mobile || align==='left' ? 'flex-start' : 'flex-end', gap:'8px', marginBottom: mobile ? '6px' : '10px' }}>
        {(mobile || align === 'left') && (
          <div style={{ width: mobile?'32px':'40px', height: mobile?'32px':'40px', borderRadius:'11px', fontSize: mobile?'16px':'20px',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
            background:hov?`${card.color}22`:'rgba(255,255,255,0.07)',
            border:`1.5px solid ${hov?card.color+'70':'rgba(255,255,255,0.1)'}`,
            boxShadow:hov?`0 0 18px ${card.color}50`:'none',transition:'all 0.25s' }}>
            {card.icon}
          </div>
        )}
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontSize: mobile?'9px':'10px', fontWeight:800, color:card.color, letterSpacing:'0.06em', margin:'0 0 2px', textTransform:'uppercase', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {card.label.split(' ')[0]}
          </p>
          <p style={{ fontSize: mobile?'13px':'16px', fontWeight:900, color:'#FAF9F6', letterSpacing:'-0.02em', margin:0, lineHeight:1.1 }}>
            {card.label.split(' ').slice(1).join(' ')}
          </p>
        </div>
        {!mobile && align === 'right' && (
          <div style={{ width:'40px',height:'40px',borderRadius:'11px',fontSize:'20px',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
            background:hov?`${card.color}22`:'rgba(255,255,255,0.07)',
            border:`1.5px solid ${hov?card.color+'70':'rgba(255,255,255,0.1)'}`,
            boxShadow:hov?`0 0 18px ${card.color}50`:'none',transition:'all 0.25s' }}>
            {card.icon}
          </div>
        )}
      </div>

      {/* Description */}
      {!mobile && (
        <p style={{ fontSize:'11px',color:hov?`${card.color}BB`:'rgba(255,255,255,0.35)',
          fontWeight:400,margin:'0 0 10px',lineHeight:1.5,transition:'color 0.25s' }}>
          {card.desc}
        </p>
      )}

      {/* Arrow CTA */}
      <div style={{ display:'flex',alignItems:'center',gap:'6px',justifyContent: mobile || align==='left' ? 'flex-start' : 'flex-end' }}>
        <motion.div
          animate={hov?{width:'28px',opacity:1}:{width:'14px',opacity:0.5}}
          style={{ height:'1px',background:card.color,transition:'none' }} />
        <motion.span animate={hov?{x:3}:{x:0}} style={{ fontSize:'13px',color:card.color,fontWeight:900 }}>→</motion.span>
      </div>

      {/* Bottom glow bar */}
      <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'2px',borderRadius:'0 0 16px 16px',
        background:`linear-gradient(90deg,transparent,${card.color},transparent)`,
        opacity:hov?1:0,transition:'opacity 0.25s' }} />
    </motion.div>
  )
}

// ── Vastu Bhagavan image panel ────────────────────────────────────────────────
function VastuBhagavanPanel() {
  const [revealed, setRevealed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [imgHovered, setImgHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300)
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => { clearTimeout(t); window.removeEventListener('resize', check) }
  }, [])

  const handleNavigate = (route) => {
    setModalOpen(false)
    navigate(route)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Full-screen modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <VastuToolsModal onClose={() => setModalOpen(false)} onNavigate={handleNavigate} />
        )}
      </AnimatePresence>

      {/* ── Image trigger ── */}
      <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', position: 'relative' }}>
        {/* Spin halos */}
        <motion.div animate={{rotate:360}} transition={{duration:80,repeat:Infinity,ease:'linear'}}
          style={{ position:'absolute',inset:'-24px',borderRadius:'50%',pointerEvents:'none',
            background:'conic-gradient(from 0deg,transparent 60%,rgba(201,117,74,0.18) 75%,transparent 90%)' }} />
        <motion.div animate={{rotate:-360}} transition={{duration:140,repeat:Infinity,ease:'linear'}}
          style={{ position:'absolute',inset:'-50px',borderRadius:'50%',pointerEvents:'none',
            background:'conic-gradient(from 180deg,transparent 70%,rgba(130,100,220,0.12) 82%,transparent 94%)' }} />

        {/* Rune orbits */}
        <div style={{ position:'absolute',inset:'-20px',pointerEvents:'none' }}>
          <RuneOrbit radius={42} duration={22} runes={RUNES.slice(0,6)}  clockwise={true}  color="rgba(201,117,74,0.7)" />
          <RuneOrbit radius={52} duration={38} runes={RUNES.slice(6,12)} clockwise={false} color="rgba(130,100,220,0.5)" />
        </div>

        {/* Outer wrapper — scale on hover, NO overflow:hidden here so scale works */}
        <motion.div
          animate={{ scale: imgHovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          onClick={() => setModalOpen(true)}
          style={{ borderRadius:'20px', position:'relative', cursor:'pointer',
            boxShadow: imgHovered
              ? '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,117,74,0.25)'
              : '0 12px 40px rgba(0,0,0,0.5)',
            transition: 'box-shadow 0.4s',
          }}
        >
          {/* Image — overflow:hidden on inner div only */}
          <div style={{ borderRadius:'20px', overflow:'hidden', position:'relative' }}>
            <AnimatePresence>
              {revealed && (
                <motion.img src={animeVastuImg} alt="Vastu Bhagavan — Vedic deity of sacred architecture"
                  initial={{opacity:0,scale:1.08}} animate={{opacity:1,scale:1}}
                  transition={{duration:1.6,ease:[0.22,1,0.36,1]}}
                  style={{ width:'100%',display:'block',objectFit:'cover' }} />
              )}
            </AnimatePresence>
          </div>

          {/* Corner brackets — outside overflow:hidden */}
          {[['0','0','rotate(0deg)'],['0','auto','rotate(90deg)'],['auto','0','rotate(-90deg)'],['auto','auto','rotate(180deg)']].map(([t,b,rot],i) => (
            <div key={i} style={{
              position:'absolute',top:t!=='auto'?t:undefined,bottom:b!=='auto'?b:undefined,
              left:i<2?'0':undefined,right:i>=2?'0':undefined,
              width:'22px',height:'22px',transform:rot,pointerEvents:'none',
              borderTop:'2.5px solid rgba(201,117,74,0.9)',borderLeft:'2.5px solid rgba(201,117,74,0.9)',
            }} />
          ))}

          {/* Hover hint — controlled by state, positioned over image */}
          <AnimatePresence>
            {imgHovered && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  position:'absolute', inset:0, borderRadius:'20px',
                  display:'flex', alignItems:'flex-end', justifyContent:'center',
                  paddingBottom:'18px',
                  background:'linear-gradient(to top,rgba(0,0,0,0.62) 0%,transparent 52%)',
                  pointerEvents:'none', zIndex: 5,
                }}
              >
                <motion.div
                  initial={{ y: 8, scale: 0.92 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
                  style={{ display:'inline-flex',alignItems:'center',gap:'7px',padding:'7px 18px',
                    borderRadius:'999px',background:'rgba(0,0,0,0.8)',
                    border:'1px solid rgba(201,117,74,0.8)',
                    backdropFilter:'blur(12px)' }}
                >
                  <motion.span animate={{rotate:[0,20,-20,0]}} transition={{duration:1.5,repeat:Infinity,repeatDelay:1}} style={{fontSize:'12px'}}>✦</motion.span>
                  <span style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.22em',color:'#C9754A',textTransform:'uppercase'}}>
                    Click to Explore Tools
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Mobile: always-visible tap badge — removed, hover hint is sufficient */}
        </motion.div>
      </div>
    </>
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
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', minWidth: 0 }}
            >
              <div style={{ width: '24px', flexShrink: 0, height: '1px', background: 'linear-gradient(90deg,transparent,#C9754A)' }} />
              <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.25em', color: '#B85C38', fontFamily: 'sans-serif', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Vedic Architecture · Vastu Shastra
              </span>
              <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#C9754A,transparent)', minWidth: '8px' }} />
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

          {/* ── RIGHT: Vastu image (click to open tool modal) ── */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible' }}
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
