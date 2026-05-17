import { useState, useRef, useEffect } from 'react'
import henGif from '../../assets/gif.gif'

export default function Pet() {
  const henRef = useRef(null)
  
  const pos = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
  })
  const flip = useRef(false)
  const direction = useRef(1) // 1 for right, -1 for left
  
  useEffect(() => {
    let animationFrameId;
    let isIdle = false;
    let idleTimer = null;
    let roamTimer = null;

    // A more predictable roaming state machine
    const setRoamingState = () => {
      // Roam for 5-10 seconds
      isIdle = false;
      roamTimer = setTimeout(() => {
        // Then idle for 2-4 seconds
        isIdle = true;
        idleTimer = setTimeout(setRoamingState, 2000 + Math.random() * 2000);
      }, 5000 + Math.random() * 5000);
    };

    setRoamingState();

    const animate = () => {
      if (!isIdle) {
        // Move horizontally
        pos.current.x += direction.current * 1.5;

        // Check boundaries
        if (typeof window !== 'undefined') {
          const maxLeft = window.innerWidth - 80; // 80 is the width of the gif
          
          if (pos.current.x >= maxLeft) {
            pos.current.x = maxLeft;
            direction.current = -1; // Turn left
          } else if (pos.current.x <= 0) {
            pos.current.x = 0;
            direction.current = 1; // Turn right
          }
        }

        // Flip image to face the direction of movement
        flip.current = direction.current < 0;
      }

      if (henRef.current) {
        henRef.current.style.left = pos.current.x + "px";
        henRef.current.style.transform = `scaleX(${flip.current ? -1 : 1})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
      clearTimeout(roamTimer);
    };
  }, [])

  return (
    <div ref={henRef} style={{
      position: 'fixed',
      bottom: '0px', // Fixed to the footer/bottom
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
