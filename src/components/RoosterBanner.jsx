import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import cockVideo from '../../assets/Cock.mp4'

/**
 * RoosterBanner — CTA banner before footer on Home page
 * Uses Cock.mp4 — Lottie-exported MP4 has transparent background natively.
 * No white box, no blend mode hacks needed.
 */

/**
 * RoosterCanvas — renders video to canvas and removes near-white pixels
 * Threshold: pixels with R>230 AND G>230 AND B>230 become transparent
 */
const RoosterCanvas = ({ src }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const draw = () => {
      if (video.readyState >= 2) {
        const w = video.videoWidth || 400
        const h = video.videoHeight || 400
        canvas.width = w
        canvas.height = h
        ctx.drawImage(video, 0, 0, w, h)

        // Chroma-key: remove near-white pixels
        const frame = ctx.getImageData(0, 0, w, h)
        const d = frame.data
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2]
          // If pixel is near white (all channels > 230), make transparent
          if (r > 230 && g > 230 && b > 230) {
            d[i + 3] = 0 // fully transparent
          } else if (r > 200 && g > 200 && b > 200) {
            // Semi-transparent for anti-aliasing edge pixels
            d[i + 3] = Math.round(((255 - r) / 55) * 255)
          }
        }
        ctx.putImageData(frame, 0, 0)
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    video.addEventListener('loadeddata', () => {
      video.play()
      draw()
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [src])

  return (
    <div style={{ position: 'relative', zIndex: 2, display: 'inline-flex' }}>
      {/* Hidden video source */}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      {/* Canvas renders chroma-keyed frames */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          height: 'clamp(200px, 26vw, 340px)',
          width: 'auto',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5)) brightness(1.05) saturate(1.1)',
        }}
      />
    </div>
  )
}

const stats = [
  { value: '12+', label: 'Years of Experience' },
  { value: '50+', label: 'Homes Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
]

const RoosterBanner = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#111410',
        padding: 'clamp(4rem, 7vw, 6rem) 0 0',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,117,74,0.5) 40%, rgba(201,117,74,0.5) 60%, transparent)',
      }} />

      {/* Warm ambient glow behind rooster */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '50%', height: '100%',
        background: 'radial-gradient(ellipse at 80% 100%, rgba(201,117,74,0.14) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Main grid */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 3.5rem)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'flex-end',
        gap: '2rem',
      }}>

        {/* ── LEFT: Content ── */}
        <div style={{
          paddingBottom: 'clamp(3rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <div style={{ width: 32, height: '1.5px', background: '#C9754A', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Barlow, sans-serif', fontSize: '0.6rem',
              fontWeight: 900, letterSpacing: '0.42em',
              textTransform: 'uppercase', color: '#C9754A',
            }}>
              Karrcholai Construction
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 900, lineHeight: 1.08,
              color: '#fff', margin: 0,
            }}
          >
            Built on Stone.<br />
            <span style={{ color: '#C9754A' }}>Born for Life.</span>
          </motion.h2>

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)',
              fontWeight: 400, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.48)',
              margin: 0, maxWidth: '460px',
            }}
          >
            Every home we build carries 12+ years of on-site wisdom, honest
            materials, and a commitment to spaces that serve families for generations.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.5 }}
            style={{ display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap' }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
              >
                <span style={{
                  fontFamily: 'Barlow, sans-serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 900, color: '#C9754A', lineHeight: 1,
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontFamily: 'Barlow, sans-serif',
                  fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.9rem 2.2rem',
                  background: 'linear-gradient(135deg, #C9754A 0%, #3F5F4A 100%)',
                  color: '#fff', border: 'none', borderRadius: '999px',
                  fontFamily: 'Barlow, sans-serif', fontSize: '0.7rem',
                  fontWeight: 900, letterSpacing: '0.25em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(201,117,74,0.35)',
                }}
              >
                Start Your Project
              </motion.button>
            </Link>
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.9rem 2.2rem',
                  background: 'transparent', color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px',
                  fontFamily: 'Barlow, sans-serif', fontSize: '0.7rem',
                  fontWeight: 700, letterSpacing: '0.25em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                View Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: Rooster animation — canvas chroma-key removes white bg ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', alignSelf: 'flex-end', flexShrink: 0 }}
        >
          {/* Footstep glow */}
          <motion.div
            animate={{
              scaleX: [1, 1.5, 0.8, 1.4, 0.85, 1.3, 1],
              scaleY: [1, 0.55, 1.1, 0.5, 1.05, 0.65, 1],
              opacity: [0.45, 0.9, 0.3, 0.85, 0.28, 0.7, 0.45],
            }}
            transition={{ duration: 0.88, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '60%', height: '18px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(201,117,74,0.85) 0%, rgba(201,117,74,0.2) 50%, transparent 75%)',
              filter: 'blur(7px)', pointerEvents: 'none', zIndex: 1,
            }}
          />
          {/* Ambient halo */}
          <motion.div
            animate={{ opacity: [0.1, 0.22, 0.1], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: '-15%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,117,74,0.18) 0%, transparent 60%)',
              pointerEvents: 'none', zIndex: 0,
            }}
          />
          {/* Canvas white-key renderer */}
          <RoosterCanvas src={cockVideo} />
        </motion.div>

      </div>

      {/* Bottom divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent)',
      }} />
    </section>
  )
}

export default RoosterBanner
