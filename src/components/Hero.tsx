import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onOpenProjectModal: () => void;
}

const ROTATING_PHRASES = [
  'WEBSITES',
  'AUTOMATION',
  'SEO',
  'SYSTEMS',
];

export default function Hero({ onOpenProjectModal }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full lg:h-[calc(100vh-4.5rem)] lg:min-h-[520px] lg:max-h-[850px] flex flex-col justify-start lg:justify-between pt-2 pb-6 sm:pt-5 sm:pb-8 lg:py-5 xl:py-6 overflow-x-clip lg:overflow-hidden touch-pan-y">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full flex flex-col lg:h-full lg:flex-1 lg:justify-between">
        {/* Top Desktop Floating Stickers */}
        <div className="hidden lg:flex items-center justify-between mb-2 xl:mb-3 select-none shrink-0">
          {/* Sticker 1: WEB DESIGN */}
          <div
            className="animate-sticker-1 inline-flex items-center px-3.5 py-1 rounded-full bg-[#111111] text-white text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#0047FF]"
          >
            WEB DESIGN
          </div>

          {/* Sticker 2: WHATSAPP AUTOMATION */}
          <div
            className="animate-sticker-2 inline-flex items-center px-3.5 py-1 rounded-full bg-[#0047FF] text-white text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111]"
          >
            WHATSAPP AUTOMATION
          </div>

          {/* Sticker 3: SEO & LEADS */}
          <div
            className="animate-sticker-3 inline-flex items-center px-3.5 py-1 rounded-full bg-white text-[#111111] text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#0047FF]"
          >
            SEO & LEADS
          </div>
        </div>

        {/* Center: Large Editorial Headline */}
        <div className="py-1 sm:py-2 lg:my-auto">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#666666]">
              CORE / SYSTEM / DIGITAL
            </span>
          </div>

          <h1 className="font-black uppercase text-[#111111] leading-[0.93] tracking-tighter text-[22px] min-[360px]:text-[28px] xs:text-[38px] sm:text-[52px] md:text-[64px] lg:text-[75px] xl:text-[86px] 2xl:text-[97px] select-none break-normal">
            <span className="block">WE BUILD</span>
            {/* Dynamic Rotating Word: strictly fixed-height line container to prevent any layout shift */}
            <span className="block text-[#0047FF] h-[1.12em] relative overflow-hidden select-none pointer-events-none touch-pan-y">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_PHRASES[index]}
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : -16,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 flex items-center whitespace-nowrap"
                >
                  {ROTATING_PHRASES[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block">FOR REAL BUSINESSES</span>
          </h1>
        </div>

        {/* Bottom: Copy, Dual CTAs, & Circular Stamp */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4 lg:gap-6 pt-3 sm:pt-4 border-t-2 border-[#111111]/10 shrink-0 mt-2 sm:mt-4 lg:mt-0">
          <div className="max-w-xl">
            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-[#222222] font-semibold leading-snug mb-3 sm:mb-4">
              Digital solutions for real businesses.
              <br className="hidden xs:inline" />
              <span className="text-[#555555] block xs:inline xs:ml-1">
                Built to look good, work smarter and help you grow.
              </span>
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-sm sm:max-w-none">
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider h-11 sm:h-12 px-5 sm:px-7 rounded-full bg-[#111111] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#0047FF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer shrink-0"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToWork}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider h-11 sm:h-12 px-5 sm:px-7 rounded-full bg-white text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer shrink-0"
              >
                <span>SEE OUR WORK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Supporting Circular Stamp (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center relative w-24 h-24 xl:w-28 xl:h-28 select-none shrink-0 self-end mb-0.5">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full animate-spin-slow"
              aria-hidden="true"
            >
              <path
                id="circlePathHero"
                d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                fill="none"
              />
              <text className="text-[10px] font-black tracking-[0.24em] uppercase fill-[#111111]">
                <textPath href="#circlePathHero" startOffset="0%">
                  DESIGN • BUILD • CONNECT • GROW •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 m-auto w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-black text-xs xl:text-sm shadow-[2px_2px_0px_#111111]">
              ✦
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
