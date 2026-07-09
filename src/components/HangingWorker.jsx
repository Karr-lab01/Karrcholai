import { motion } from 'framer-motion'
import workerImg from '../../assets/anime wrk.png'

/**
 * HangingWorker — v3
 * Clean professional hanging worker with sign board.
 * Worker sits above sign, connected by two clean vertical strings.
 * Full character visible from head to toe.
 */

const HangingWorker = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 0,
        right: 'clamp(2rem, 7vw, 6rem)',
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* ── Rope from top edge ── */}
      <div style={{
        width: '2px',
        height: 'clamp(24px, 3.5vw, 44px)',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(210,185,140,0.6))',
        borderRadius: '1px',
        flexShrink: 0,
      }} />

      {/* ── Main pendulum wrapper ── */}
      <motion.div
        animate={{ rotate: [-3.5, 3.5, -2.5, 4, -3.5] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'mirror',
        }}
        style={{
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ── Worker character ── */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Warm glow behind character */}
          <div style={{
            position: 'absolute',
            top: '15%', left: '50%',
            transform: 'translateX(-50%)',
            width: '90%', height: '75%',
            background: 'radial-gradient(circle, rgba(255,140,40,0.22) 0%, transparent 70%)',
            filter: 'blur(18px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          <img
            src={workerImg}
            alt="Karrcholai construction worker"
            style={{
              display: 'block',
              // objectFit top ensures head is always shown
              height: 'clamp(110px, 13vw, 170px)',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'top',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.6))',
            }}
          />
        </motion.div>

        {/* ── Two strings from worker feet to sign top ── */}
        <div style={{
          display: 'flex',
          width: 'clamp(100px, 14vw, 155px)',
          justifyContent: 'space-between',
          paddingLeft: '18%',
          paddingRight: '18%',
          height: 'clamp(16px, 2.2vw, 26px)',
          marginTop: '-2px',
        }}>
          {/* Left string */}
          <div style={{
            width: '1.5px',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(210,185,140,0.7), rgba(180,150,100,0.5))',
            borderRadius: '1px',
          }} />
          {/* Right string */}
          <div style={{
            width: '1.5px',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(210,185,140,0.7), rgba(180,150,100,0.5))',
            borderRadius: '1px',
          }} />
        </div>

        {/* ── Sign board — independent subtle sway ── */}
        <motion.div
          animate={{ rotate: [1, -1.5, 1.5, -1, 1] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
            delay: 0.6,
          }}
          style={{ transformOrigin: 'top center' }}
        >
          {/* Sign */}
          <div style={{
            width: 'clamp(130px, 16vw, 185px)',
            background: 'linear-gradient(145deg, #192b1b 0%, #0d1a0e 100%)',
            border: '1.5px solid rgba(201,117,74,0.75)',
            borderRadius: '10px',
            padding: 'clamp(0.6rem, 1vw, 0.85rem) clamp(0.7rem, 1.2vw, 1rem)',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle inner top highlight */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,117,74,0.4), transparent)',
            }} />

            {/* Nail dots */}
            <div style={{
              position: 'absolute', top: '7px', left: '14%',
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#7a6040',
              boxShadow: '0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
            }} />
            <div style={{
              position: 'absolute', top: '7px', right: '14%',
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#7a6040',
              boxShadow: '0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
            }} />

            {/* Eyebrow */}
            <p style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: 'clamp(0.38rem, 0.65vw, 0.5rem)',
              fontWeight: 900,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C9754A',
              margin: '0 0 0.4rem',
            }}>
              Now Building
            </p>

            {/* Main headline */}
            <p style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: 'clamp(0.78rem, 1.2vw, 1rem)',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 0.4rem',
              lineHeight: 1.2,
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}>
              Your Dream<br />Home
            </p>

            {/* Divider */}
            <div style={{
              height: '1px',
              margin: '0.45rem 0.5rem',
              background: 'linear-gradient(90deg, transparent, rgba(201,117,74,0.45), transparent)',
            }} />

            {/* CTA line */}
            <p style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: 'clamp(0.42rem, 0.7vw, 0.55rem)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
              letterSpacing: '0.04em',
            }}>
              Free Consultation →
            </p>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}

export default HangingWorker
