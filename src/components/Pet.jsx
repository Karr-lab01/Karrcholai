import { useState, useRef, useEffect } from 'react'
import henGif from '../../assets/gif.gif'

export default function Pet() {
  const henRef = useRef(null)
  
  const pos = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
    y: typeof window !== 'undefined' ? window.innerHeight - 80 : 200 // Default to bottom
  })
  const flip = useRef(false)
  
  useEffect(() => {
    let animationFrameId;
    let walkTargetX = pos.current.x;
    let walkTargetY = pos.current.y;
    let isIdle = false;

    // Toggle between roaming and standing still
    const stateInterval = setInterval(() => {
      isIdle = Math.random() > 0.6; // 60% chance to stand idle
    }, 3000);

    const animate = () => {
      if (!isIdle) {
        // Occasionally pick a new random walk target
        if (Math.random() < 0.02) {
           walkTargetX = pos.current.x + (Math.random() - 0.5) * 600;
           walkTargetY = pos.current.y + (Math.random() - 0.5) * 600;
        }
        
        // Keep target within window bounds
        if (typeof window !== 'undefined') {
           walkTargetX = Math.max(0, Math.min(window.innerWidth - 80, walkTargetX));
           walkTargetY = Math.max(0, Math.min(window.innerHeight - 80, walkTargetY));
        }

        const dx = walkTargetX - pos.current.x;
        const dy = walkTargetY - pos.current.y;
        
        pos.current.x += dx * 0.015;
        pos.current.y += dy * 0.015;

        // Flip image to face the direction of movement
        if (Math.abs(dx) > 1) {
          flip.current = dx < 0;
        }
      }
      
      // Ensure pet doesn't walk off-screen
      if (typeof window !== 'undefined') {
        pos.current.x = Math.max(0, Math.min(window.innerWidth - 80, pos.current.x));
        pos.current.y = Math.max(0, Math.min(window.innerHeight - 80, pos.current.y));
      }

      if (henRef.current) {
        henRef.current.style.left = pos.current.x + "px";
        henRef.current.style.top = pos.current.y + "px";
        henRef.current.style.transform = `scaleX(${flip.current ? -1 : 1})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(stateInterval);
    };
  }, [])

  return (
    <div ref={henRef} style={{
      position: 'fixed',
      width: '80px',
      height: '80px',
      zIndex: 999999, // Ensure it's above absolutely everything
      pointerEvents: 'none',
      transition: 'transform 0.1s ease-out'
    }}>
      <img 
        src={henGif} 
        alt="Roaming Pet" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}
