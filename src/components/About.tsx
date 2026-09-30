import { ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';

export default function About() {
  const whatsappUrl = getWhatsAppUrl("Hi Anurag! I'm interested in building a website with CORE WEB STUDIO. Let's discuss.");

  return (
    <section id="about" className="w-full py-8 sm:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] p-5 sm:p-14 lg:p-18">
          <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-3 sm:mb-4">
            OUR PHILOSOPHY
          </span>

          <h2 className="font-black uppercase text-2xl min-[360px]:text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#111111] leading-[0.98] tracking-tight mb-6 sm:mb-8">
            <span className="block">DIGITAL WORK</span>
            <span className="block">SHOULD DO MORE THAN</span>
            <span className="block text-[#0047FF]">LOOK GOOD.</span>
          </h2>

          <div className="max-w-2xl pt-5 sm:pt-6 border-t-2 border-[#111111]/10">
            <p className="text-base sm:text-2xl text-[#222222] font-semibold leading-relaxed mb-6">
              It should make your business easier to understand, easier to find, easier to contact and easier to run.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="ANURAG"
              className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#FAF7EE] border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#0047FF] md:hover:-translate-y-0.5 md:hover:shadow-[4px_4px_0px_#0047FF] transition-all cursor-pointer select-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#0047FF] shrink-0 md:group-hover:scale-125 transition-transform" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#111111]">
                Directly with the founder — Anurag.
              </span>
              <span className="inline-flex items-center text-xs font-black text-[#0047FF] uppercase tracking-wider opacity-0 max-w-0 overflow-hidden md:group-hover:opacity-100 md:group-hover:max-w-xs transition-all duration-300 ml-1">
                LET'S TALK <ArrowRight className="w-3.5 h-3.5 ml-1 shrink-0" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
