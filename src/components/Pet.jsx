import { useState, useRef, useEffect } from 'react'
import henGif from '../../assets/gif.gif'

const CLUCK_PHRASES = [
  "Cluck! Building dreams... 🏗️",
  "Vastu checked & approved! 📐",
  "This foundation is solid! 🪨",
  "Laying down some solid bricks! 🧱",
  "Karrcholai quality is unmatched! 🌟",
  "Cluck cluck! Eco-friendly construction! 🌿",
  "Just inspecting the masonry... 🔍",
  "No cutting corners here! 📐",
  "Hmm, looks structurally sound! 🏗️",
  "Happy building! 🏠",
  "Cluck! Time for a coffee break? ☕",
  "Is that a worm in the lawn? 🐛"
];

export default function Pet() {
  const henRef = useRef(null)
  const imgRef = useRef(null)
  const bubbleTimeoutRef = useRef(null)
  const stateTimerRef = useRef(null)
  
  const [isStatic, setIsStatic] = useState(false)
  const [staticSrc, setStaticSrc] = useState('')
  const [bubbleText, setBubbleText] = useState('')
  const [showBubble, setShowBubble] = useState(false)

  const pos = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
    y: 0,
    rotate: 0,
    opacity: 1
  })
  const flip = useRef(false)
  const direction = useRef(1) // 1 for right, -1 for left
  const frameCount = useRef(0)
  const jumpFrame = useRef(0)
  
  const stateRef = useRef('idle') // starts idle
  const prevBeforeJump = useRef('idle')

  const triggerBubble = (text, duration = 3000) => {
    setBubbleText(text);
    setShowBubble(true);
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, duration);
  };

  const captureGifFrame = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      // Ensure we have loaded dimensions
      if (img.naturalWidth && img.naturalHeight) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        try {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          setIsStatic(true);
          setStaticSrc(dataUrl);
        } catch (e) {
          console.warn("Could not capture frame, using fallback JPEGs/GIFs", e);
        }
      }
    }
  };

  const handleImageLoad = () => {
    if (stateRef.current === 'idle' && !isStatic) {
      // Freeze the initial frame on load
      captureGifFrame();
    }
  };

  const pickRandomState = () => {
    if (stateRef.current === 'jumping' || stateRef.current === 'startled') {
      return;
    }

    const choices = ['walking', 'idle', 'pecking', 'sleeping'];
    const nextState = choices[Math.floor(Math.random() * choices.length)];
    
    // Handle transitions for GIF play/pause
    if (stateRef.current === 'walking' && nextState !== 'walking') {
      captureGifFrame();
    } else if (stateRef.current !== 'walking' && nextState === 'walking') {
      setIsStatic(false);
    }

    stateRef.current = nextState;

    // Periodic bubbles
    if (Math.random() < 0.35) {
      let phrase = '';
      if (nextState === 'sleeping') {
        phrase = "Zzz... 💤";
      } else if (nextState === 'pecking') {
        phrase = Math.random() < 0.5 ? "Ooh, a seed! 🌾" : "Checking the levels... 📐";
      } else {
        phrase = CLUCK_PHRASES[Math.floor(Math.random() * CLUCK_PHRASES.length)];
      }
      triggerBubble(phrase, 3000);
    }

    // Schedule next transition
    const duration = nextState === 'walking' 
      ? 6000 + Math.random() * 6000  // walk 6-12s
      : 3000 + Math.random() * 3000; // idle 3-6s
      
    stateTimerRef.current = setTimeout(pickRandomState, duration);
  };

  const handleChickenHover = () => {
    if (stateRef.current === 'jumping') return;

    // Startle run!
    stateRef.current = 'startled';
    setIsStatic(false);
    
    // Run opposite direction
    direction.current = -direction.current;
    triggerBubble(Math.random() < 0.5 ? "Cluck?! ❗" : "Whoa! 🚀", 1500);

    if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    
    stateTimerRef.current = setTimeout(() => {
      stateRef.current = 'walking';
      stateTimerRef.current = setTimeout(pickRandomState, 4000);
    }, 1800);
  };

  const handleChickenClick = () => {
    if (stateRef.current === 'jumping') return;
    
    prevBeforeJump.current = stateRef.current;
    stateRef.current = 'jumping';
    jumpFrame.current = 0;
    setIsStatic(false); // Animate while soaring

    const jumpPhrases = [
      "Cluck cluck! Hup! 🪽",
      "We've reached new heights! 🚀",
      "High quality, high rise! 🏢",
      "Jump! 🏗️",
      "Wheee! 🐔"
    ];
    triggerBubble(jumpPhrases[Math.floor(Math.random() * jumpPhrases.length)], 2000);
  };

  useEffect(() => {
    let animationFrameId;

    // Initial transition scheduler
    stateTimerRef.current = setTimeout(pickRandomState, 4000);

    const animate = () => {
      frameCount.current += 1;
      const t = frameCount.current;

      if (stateRef.current === 'walking') {
        pos.current.x += direction.current * 1.2;
        pos.current.y = Math.abs(Math.sin(t * 0.15)) * -4;
        pos.current.rotate = Math.sin(t * 0.15) * 5;
        pos.current.opacity = 1;

        if (typeof window !== 'undefined') {
          const maxLeft = window.innerWidth - 80;
          if (pos.current.x >= maxLeft) {
            pos.current.x = maxLeft;
            direction.current = -1;
          } else if (pos.current.x <= 0) {
            pos.current.x = 0;
            direction.current = 1;
          }
        }
        flip.current = direction.current < 0;

      } else if (stateRef.current === 'startled') {
        pos.current.x += direction.current * 3.5;
        pos.current.y = Math.abs(Math.sin(t * 0.3)) * -6;
        pos.current.rotate = Math.sin(t * 0.3) * 12;
        pos.current.opacity = 1;

        if (typeof window !== 'undefined') {
          const maxLeft = window.innerWidth - 80;
          if (pos.current.x >= maxLeft) {
            pos.current.x = maxLeft;
            direction.current = -1;
          } else if (pos.current.x <= 0) {
            pos.current.x = 0;
            direction.current = 1;
          }
        }
        flip.current = direction.current < 0;

      } else if (stateRef.current === 'pecking') {
        const peckCycle = t % 60;
        if (peckCycle < 15) {
          pos.current.rotate = (peckCycle / 15) * 35;
          pos.current.y = (peckCycle / 15) * 3;
        } else if (peckCycle < 30) {
          pos.current.rotate = 35 - ((peckCycle - 15) / 15) * 35;
          pos.current.y = 3 - ((peckCycle - 15) / 15) * 3;
        } else {
          pos.current.rotate = 0;
          pos.current.y = 0;
        }
        pos.current.opacity = 1;

      } else if (stateRef.current === 'sleeping') {
        pos.current.y = Math.sin(t * 0.05) * -1.5;
        pos.current.rotate = 8;
        pos.current.opacity = 0.7 + Math.sin(t * 0.05) * 0.15;

      } else if (stateRef.current === 'jumping') {
        jumpFrame.current += 1;
        const progress = jumpFrame.current / 40;
        if (progress >= 1) {
          stateRef.current = prevBeforeJump.current || 'idle';
          pos.current.y = 0;
          pos.current.rotate = 0;
          if (stateRef.current === 'walking' || stateRef.current === 'startled') {
            setIsStatic(false);
          } else {
            setTimeout(captureGifFrame, 50);
          }
        } else {
          pos.current.y = -Math.sin(progress * Math.PI) * 45;
          pos.current.rotate = -20 * Math.cos(progress * Math.PI);
        }
        pos.current.opacity = 1;

      } else {
        // Idle
        pos.current.y = 0;
        pos.current.rotate = 0;
        pos.current.opacity = 1;
      }

      if (henRef.current) {
        henRef.current.style.left = pos.current.x + "px";
        henRef.current.style.transform = `translateY(${pos.current.y}px)`;
        
        const scaleX = flip.current ? -1 : 1;
        const rotationVal = flip.current ? -pos.current.rotate : pos.current.rotate;
        
        if (imgRef.current) {
          imgRef.current.style.transform = `scaleX(${scaleX}) rotate(${rotationVal}deg)`;
          imgRef.current.style.opacity = pos.current.opacity;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={henRef} style={{
      position: 'fixed',
      bottom: '12px', // Slightly above bottom edge for premium look
      width: '80px',
      height: '80px',
      zIndex: 999999,
      pointerEvents: 'none',
    }}>
      <div 
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          cursor: 'pointer',
          position: 'relative'
        }}
        onClick={handleChickenClick}
        onMouseEnter={handleChickenHover}
      >
        {/* Elegant Speech Bubble */}
        <div style={{
          position: 'absolute',
          bottom: '90px',
          left: '50%',
          transform: `translateX(-50%) scale(${showBubble ? 1 : 0.8})`,
          opacity: showBubble ? 1 : 0,
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          background: 'rgba(47, 79, 62, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#F5F2EC',
          padding: '6px 12px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
          zIndex: 1000000
        }}>
          {bubbleText}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(47, 79, 62, 0.95)'
          }} />
        </div>

        {/* The Chicken Image */}
        <img 
          ref={imgRef}
          src={isStatic ? staticSrc : henGif} 
          alt="Roaming Pet" 
          onLoad={handleImageLoad}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            transition: 'opacity 0.2s ease',
            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.15))'
          }}
        />
      </div>
    </div>
  )
}
