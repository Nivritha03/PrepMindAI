import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkInteractive);
    window.addEventListener('mouseout', handleMouseLeaveWindow);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkInteractive);
      window.removeEventListener('mouseout', handleMouseLeaveWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-2 border-white/50 mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0
      }}
      animate={{
        scale: isInteractive ? 1.5 : 1,
        backgroundColor: isInteractive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        borderWidth: isInteractive ? '0px' : '2px',
      }}
      transition={{ type: 'tween', duration: 0.15 }}
    />
  );
}
