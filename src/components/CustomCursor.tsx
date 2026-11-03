import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CustomCursorProps {
  cardHoverState: boolean | null; // true = active card, false = inactive card, null = none
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cardHoverState }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isOverButton, setIsOverButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad, not touch)
    if (typeof window !== 'undefined') {
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      setIsFinePointer(finePointer);
    }
  }, []);

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over a button or interactive link
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, input, select, [role="button"]')) {
        setIsOverButton(true);
      } else {
        setIsOverButton(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // RAF loop for smooth interpolation
    const render = () => {
      // Linear interpolation (lerp)
      const ease = 0.22;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer, reducedMotion, isVisible]);

  if (!isFinePointer || reducedMotion || !isVisible) {
    return null;
  }

  let stateClass = '';
  if (cardHoverState === true) {
    stateClass = 'active-card-hover';
  } else if (cardHoverState === false) {
    stateClass = 'inactive-card-hover';
  } else if (isOverButton) {
    stateClass = 'button-hover';
  }

  return (
    <div ref={cursorRef} className={`custom-cursor ${stateClass}`} aria-hidden="true">
      {cardHoverState === true && <span className="cursor-label">OPEN</span>}
    </div>
  );
};
