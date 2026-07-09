import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import logoImg from '../assets/KARRCHOLAI LOGO.png'
import roosterWalk from '../assets/rooster_walk.gif'
import roosterCrow from '../assets/rooster_crow.gif'

/**
 * Cinematic Rooster Preloader — v2
 *
 * Timeline:
 *  0.0s  — dark screen
 *  0.3s  — rooster walks in from left
 *  2.2s  — rooster reaches center, swaps to crow GIF + shockwave
 *  3.2s  — logo + tagline fade in below (fully white/visible)
 *  5.2s  — progress bar completes
 *  5.8s  — fade out
 */

const RippleRing = ({ delay, scale, color }) => (
  <motion.div
    initial={{ scale: 0.2, opacity: 1 }}
    animate={{ scale, opacity: 0 }}
    transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: '50%',
      border: `1.5px solid ${color}`,
      pointerEvents: 'none',
    }}
  />
)

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('walk')   // 'walk' | 'crow' | 'logo'
  const [visible, setVisible] = useState(true)
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => { setPhase('crow'); setRipple(true) }, 2200)
    const t2 = setTimeout(() => setPhase('logo'), 3200)
    const t3 = setTimeout(() => setVisible(false), 5800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => onComplete(), 900)
      return () => clearTimeout(t)
    }
  }, [visible, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0c0d0e',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >

          {/* ── Subtle warm spotlight behind rooster ── */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,117,74,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* ── Ground line ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '33%',
              left: '15%',
              right: '15%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,117,74,0.4) 30%, rgba(201,117,74,0.4) 70%, transparent)',
              transformOrigin: 'left center',
            }}
          />

          {/* ── Screen shake wrapper ── */}
          <motion.div
            animate={phase === 'crow' ? {
              x: [0, -5, 4, -3, 2, -1, 0],
              y: [0, 3, -2, 2, -1, 0],
            } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >

            {/* ── Rooster ── */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

              {/* Ripple rings */}
              {ripple && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '20px',
                  transform: 'translateX(-50%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <RippleRing delay={0}    scale={3}  color="rgba(201,117,74,0.8)" />
                  <RippleRing delay={0.2}  scale={5}  color="rgba(201,117,74,0.5)" />
                  <RippleRing delay={0.38} scale={8}  color="rgba(201,117,74,0.25)" />
                  <RippleRing delay={0.55} scale={12} color="rgba(255,255,255,0.07)" />
                </div>
              )}

              {/* Walk → Crow swap */}
              <motion.div
                initial={{ x: '-60vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: 'relative', zIndex: 2 }}
              >
                {/* Walk GIF */}
                <img
                  src={roosterWalk}
                  alt="rooster walking"
                  style={{
                    height: 'clamp(160px, 22vw, 230px)',
                    width: 'auto',
                    display: 'block',
                    opacity: phase === 'walk' ? 1 : 0,
                    transition: 'opacity 0.12s',
                    filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.8))',
                  }}
                />
                {/* Crow GIF */}
                <img
                  src={roosterCrow}
                  alt="rooster crowing"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    height: 'clamp(160px, 22vw, 230px)',
                    width: 'auto',
                    display: 'block',
                    opacity: phase !== 'walk' ? 1 : 0,
                    transition: 'opacity 0.12s',
                    filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.8)) drop-shadow(0 0 16px rgba(201,117,74,0.5))',
                  }}
                />

                {/* Crow glow halo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={phase !== 'walk'
                    ? { opacity: [0, 0.4, 0.15], scale: [0.6, 1.5, 1.1] }
                    : { opacity: 0 }
                  }
                  transition={{ duration: 1.0 }}
                  style={{
                    position: 'absolute',
                    top: '5%', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140%', height: '90%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,180,80,0.5) 0%, transparent 65%)',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
              </motion.div>
            </div>

            {/* ── Logo block ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase === 'logo' ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={phase === 'logo' ? { width: 48 } : { width: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  style={{ height: '1px', background: 'rgba(201,117,74,0.55)' }}
                />
                <span style={{
                  fontSize: '0.42rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(201,117,74,0.7)',
                  fontFamily: 'Barlow, sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  EST.
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={phase === 'logo' ? { width: 48 } : { width: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  style={{ height: '1px', background: 'rgba(201,117,74,0.55)' }}
                />
              </div>

              {/* Logo — full brightness, no tinting */}
              <motion.img
                src={logoImg}
                alt="KARRCHOLAI"
                animate={phase === 'logo' ? { scale: [0.9, 1.04, 1.0] } : {}}
                transition={{ duration: 1.0 }}
                style={{
                  height: 'clamp(80px, 13vw, 140px)',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(1.15) drop-shadow(0 2px 12px rgba(201,117,74,0.2))',
                }}
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.05em' }}
                animate={phase === 'logo' ? { opacity: 1, letterSpacing: '0.38em' } : { opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                style={{
                  margin: 0,
                  fontSize: '0.52rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'rgba(201,117,74,0.9)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              >
                Single Stone Story
              </motion.p>
            </motion.div>

            {/* ── Progress bar ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                width: 'clamp(100px, 14vw, 140px)',
                height: '1.5px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginTop: '-0.5rem',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5.0, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(201,117,74,0.3), rgba(201,117,74,1), rgba(201,117,74,0.3))',
                  borderRadius: '2px',
                }}
              />
            </motion.div>

          </motion.div>

          {/* ── Bottom brand line ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 4.0, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '1.6rem',
              margin: 0,
              fontSize: '0.38rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 600,
            }}
          >
            Architecture · Construction · Interior
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
