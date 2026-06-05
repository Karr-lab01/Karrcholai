import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import logoAnimation from '../../assets/logo aniamtion.mp4'

const FADE_DURATION = 0.8 // seconds — must match exit transition below

const Preloader = ({ onComplete }) => {
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(true)

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
            // When exit animation fully completes, fire onComplete
            if (def === 'exit') onComplete()
          }}
          className="fixed inset-0 z-[1000] bg-[#0d0d0b] flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={logoAnimation}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
