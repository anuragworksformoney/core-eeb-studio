import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if fine pointer and no reduced motion
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasPointer || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isRunning = false;
    let hasMoved = false;

    const updateTransform = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        updateTransform();
        isRunning = false;
        rafId = null;
        return;
      }

      currentX += dx * 0.3;
      currentY += dy * 0.3;
      updateTransform();
      rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        currentX = e.clientX;
        currentY = e.clientY;
        updateTransform();
        setIsVisible(true);
      } else {
        startLoop();
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (hasMoved) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Watch for [data-cursor-text] elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor-text]') as HTMLElement;
      if (target) {
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      id="cws-cursor"
      className={`pointer-events-none fixed top-0 left-0 z-[100] hidden md:flex items-center justify-center rounded-full bg-[#0047FF] text-white transition-[width,height,padding,background-color] duration-150 ease-out will-change-transform font-black tracking-wider select-none shadow-[0_4px_16px_rgba(0,71,255,0.45)] border border-white/40 ${
        isHovered
          ? cursorText.length > 5
            ? 'px-3.5 py-2 h-auto min-w-[76px] rounded-full text-[10px]'
            : 'w-14 h-14 text-[11px]'
          : 'w-3.5 h-3.5'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {cursorText && (
        <span className="uppercase tracking-widest leading-none text-center whitespace-nowrap">
          {cursorText}
        </span>
      )}
    </div>
  );
}
