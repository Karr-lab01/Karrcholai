import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import logoImg from '../../assets/KARRCHOLAI LOGO.png'

const Preloader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Total animation ~5.2s, then fade out
    const timer = setTimeout(() => setVisible(false), 5200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => onComplete(), 1000)
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
            background: '#0a0a08',
            width: '100dvw',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Logo image with scale pulse */}
            <motion.img
              src={logoImg}
              alt="KARRCHOLAI"
              animate={{
                scale: [1, 1.04, 1.07, 1.04, 1.07, 1.02],
              }}
              transition={{ duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
              style={{
                height: 'clamp(160px, 28vw, 260px)',
                width: 'auto',
                objectFit: 'contain',
              }}
            />

            {/* Tagline reveal */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em', y: 10 }}
              animate={{ opacity: 1, letterSpacing: '0.45em', y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 1.0 }}
              style={{
                marginTop: '1.2rem',
                fontSize: '0.6rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: 'rgba(201,117,74,0.85)',
                fontFamily: 'Barlow, sans-serif',
              }}
            >
              Single Stone Story
            </motion.p>

            {/* Loading bar */}
            <motion.div
              style={{
                marginTop: '2.5rem',
                width: '120px',
                height: '1.5px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6.0, ease: 'easeInOut', delay: 0.4 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(201,117,74,0.4), rgba(201,117,74,1), rgba(201,117,74,0.4))',
                  borderRadius: '2px',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
