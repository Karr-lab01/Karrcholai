import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoAnimation from '../../assets/logo aniamtion.mp4'
import portraitAnimation from '../../assets/portrsit animation.mp4'

const isMobilePortrait = () =>
  window.innerWidth <= 768 ||
  (window.matchMedia && window.matchMedia('(orientation: portrait)').matches)

const LogoVideoModal = ({ open, onClose }) => {
  const videoRef = useRef(null)
  const isMobile = isMobilePortrait()
  const videoSrc = isMobile ? portraitAnimation : logoAnimation

  // Play from start whenever modal opens
  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="logo-video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0d0d0b',
            width: '100dvw',
            height: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onEnded={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: isMobile ? 'fill' : 'cover',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LogoVideoModal
