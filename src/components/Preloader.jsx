import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import logoAnimation from '../../assets/logo aniamtion.mp4'
import portraitAnimation from '../../assets/portrsit animation.mp4'

const FADE_DURATION = 0.8 // seconds — must match exit transition below

// Detect portrait / mobile: width <= 768px OR device is in portrait orientation
const isMobilePortrait = () =>
  window.innerWidth <= 768 ||
  (window.matchMedia && window.matchMedia('(orientation: portrait)').matches)

const Preloader = ({ onComplete }) => {
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const [videoSrc] = useState(() =>
    isMobilePortrait() ? portraitAnimation : logoAnimation
  )
  const isMobile = isMobilePortrait()

  useEffect(() => {
    // After fade-out animation finishes, tell App we're done
    if (!visible) {
      const t = setTimeout(() => onComplete(), FADE_DURATION * 1000)
      return () => clearTimeout(t)
    }
  }, [visible, onComplete])

  useEffect(() => {
    // Fallback: force hide after 10s no matter what
    const fallback = setTimeout(() => setVisible(false), 10000)

    const video = videoRef.current
    if (video) {
      const handleEnd = () => {
        clearTimeout(fallback)
        setVisible(false) // start fade-out
      }
      const handleError = () => {
        clearTimeout(fallback)
        setVisible(false)
      }
      video.addEventListener('ended', handleEnd)
      video.addEventListener('error', handleError)
      return () => {
        video.removeEventListener('ended', handleEnd)
        video.removeEventListener('error', handleError)
        clearTimeout(fallback)
      }
    }
    return () => clearTimeout(fallback)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
          onAnimationComplete={(def) => {
            if (def === 'exit') onComplete()
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: '#0d0d0b',
            // Use dvh so mobile browser toolbar doesn't cause gaps
            width: '100dvw',
            height: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              // fill: stretches video to fill the exact container — no crop, no bars
              objectFit: isMobile ? 'fill' : 'cover',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
