/**
 * RoosterMascot — Reusable rooster animation component
 * Used across: EmptyState, ContactSuccess, FooterEasterEgg, FounderSection
 */
import { motion, AnimatePresence } from 'framer-motion'
import roosterWalk from '../assets/rooster_walk.gif'
import roosterCrow from '../assets/rooster_crow.gif'

// ── 1. EmptyState: rooster stands still looking at user ──────────────────────
export const RoosterEmptyState = ({
  title = 'Nothing here yet',
  message = 'Check back soon.',
  size = 100,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      padding: '3rem 1rem',
      userSelect: 'none',
    }}
  >
    {/* Rooster — idle crow gif (stands still looking around) */}
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <img
        src={roosterCrow}
        alt="No content yet"
        style={{
          height: size,
          width: 'auto',
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.15))',
          opacity: 0.85,
        }}
      />
      {/* Thought bubble dots */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        style={{
          position: 'absolute',
          top: '-18px',
          right: '-10px',
          display: 'flex',
          gap: '3px',
          alignItems: 'flex-end',
        }}
      >
        {[3, 5, 7].map((s, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            style={{
              width: s,
              height: s,
              borderRadius: '50%',
              background: 'rgba(201,117,74,0.5)',
            }}
          />
        ))}
      </motion.div>
    </motion.div>

    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily: 'Barlow, sans-serif',
        fontSize: '0.95rem',
        fontWeight: 700,
        color: '#1C1C1A',
        margin: 0,
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: 'Barlow, sans-serif',
        fontSize: '0.8rem',
        fontWeight: 400,
        color: 'rgba(28,28,26,0.45)',
        marginTop: '0.3rem',
      }}>
        {message}
      </p>
    </div>
  </motion.div>
)


// ── 2. ContactSuccess: rooster crows in celebration ──────────────────────────
export const RoosterSuccess = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        key="rooster-success"
        initial={{ opacity: 0, scale: 0.7, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -10 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        {/* Ripple behind rooster */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.5 + i * 0.8, opacity: 0 }}
              transition={{ duration: 1.2, delay: i * 0.18, ease: 'easeOut', repeat: 2 }}
              style={{
                position: 'absolute',
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1.5px solid rgba(201,117,74,0.6)',
                pointerEvents: 'none',
              }}
            />
          ))}
          <img
            src={roosterCrow}
            alt="Message sent!"
            style={{
              height: 72,
              width: 'auto',
              filter: 'drop-shadow(0 4px 12px rgba(201,117,74,0.3))',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            fontFamily: 'Barlow, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#3F5F4A',
          }}
        >
          Message Sent!
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
)


// ── 3. FooterEasterEgg: rooster walks across on scroll ───────────────────────
// Used inside UnifiedFooter — triggers when footer is in view
export const RoosterFooterWalk = ({ triggered }) => (
  <AnimatePresence>
    {triggered && (
      <motion.div
        key="footer-rooster"
        initial={{ x: '-12vw', opacity: 0 }}
        animate={{ x: '110vw', opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          x: { duration: 7, ease: 'linear' },
          opacity: { duration: 0.3 },
        }}
        style={{
          position: 'absolute',
          bottom: '52px',
          left: 0,
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <img
          src={roosterWalk}
          alt=""
          aria-hidden="true"
          style={{
            height: 44,
            width: 'auto',
            // scaleX(-1) flips it so it faces right (natural walking direction)
            // mix-blend-mode: screen removes the white GIF background on dark footer
            transform: 'scaleX(-1)',
            mixBlendMode: 'screen',
            opacity: 0.9,
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.5)) brightness(1.1)',
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
)


// ── 4. FounderBrand: small rooster beside brand values ───────────────────────
export const RoosterFounderBadge = () => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.6rem 1rem 0.6rem 0.6rem',
      borderRadius: '999px',
      background: 'rgba(201,117,74,0.07)',
      border: '1px solid rgba(201,117,74,0.18)',
    }}
  >
    <motion.img
      src={roosterWalk}
      alt="Karrcholai brand mascot"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        height: 36,
        width: 'auto',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
      }}
    />
    <div>
      <p style={{
        fontFamily: 'Barlow, sans-serif',
        fontSize: '0.6rem',
        fontWeight: 900,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(201,117,74,0.85)',
        margin: 0,
        lineHeight: 1,
      }}>
        Karrcholai
      </p>
      <p style={{
        fontFamily: 'Barlow, sans-serif',
        fontSize: '0.55rem',
        fontWeight: 500,
        color: 'rgba(74,59,50,0.5)',
        margin: 0,
        marginTop: '2px',
        letterSpacing: '0.08em',
      }}>
        Stone · Strength · Oasis
      </p>
    </div>
  </motion.div>
)
