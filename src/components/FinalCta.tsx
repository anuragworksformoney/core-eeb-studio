import { ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  onOpenProjectModal: () => void;
}

export default function FinalCta({ onOpenProjectModal }: FinalCtaProps) {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-8 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#111111] text-white border-2 border-[#111111] p-6 sm:p-14 lg:p-20 text-center overflow-hidden shadow-[5px_5px_0px_#0047FF] sm:shadow-[8px_8px_0px_#0047FF]">
          {/* Small Blue Decorative Mark/Sticker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0047FF] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-5 sm:mb-6 border border-white/20 select-none">
            <span>LET'S TALK</span>
            <span>✦</span>
            <span className="hidden sm:inline opacity-80 font-mono text-[9px] tracking-widest pl-1 border-l border-white/30">
              CORE / SYSTEM / DIGITAL
            </span>
          </div>

          {/* Large Centered Headline */}
          <h2 className="font-black uppercase text-2xl min-[360px]:text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.93] mb-5 sm:mb-6">
            <span className="block">GOT A BUSINESS?</span>
            <span className="block text-[#0047FF]">LET'S BUILD</span>
            <span className="block">ITS WEBSITE.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-xl text-[#AAAAAA] font-semibold max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
            Tell us what you do.
            <br />
            We'll figure out the rest.
          </p>

          {/* Two Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenProjectModal}
              data-cursor-text="LET'S TALK"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider h-12 sm:h-13 px-6 sm:px-8 rounded-full bg-[#0047FF] text-white border-2 border-white shadow-[3px_3px_0px_#FFFFFF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToWork}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider h-12 sm:h-13 px-6 sm:px-8 rounded-full bg-white text-[#111111] border-2 border-white shadow-[3px_3px_0px_#0047FF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
            >
              <span>SEE OUR WORK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
