import { getWhatsAppUrl } from '../config/contact';

export default function Purpose() {
  const whatsappUrl = getWhatsAppUrl("Hi Anurag! I read your Founder's Note and would like to discuss a project with CORE WEB STUDIO.");

  return (
    <section id="purpose" className="w-full py-8 sm:py-14 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#0047FF] sm:shadow-[6px_6px_0px_#0047FF] p-5 sm:p-12 lg:p-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-[#0047FF]" />
            <span>FOUNDER'S NOTE</span>
          </div>

          <h2 className="font-black uppercase text-xl sm:text-3xl md:text-4xl text-[#111111] leading-[1.05] tracking-tight mb-4 sm:mb-6">
            WHY CORE WEB STUDIO EXISTS
          </h2>

          <div className="pt-4 sm:pt-6 border-t-2 border-[#111111]/10">
            <p className="text-sm min-[360px]:text-base sm:text-2xl text-[#111111] font-semibold leading-relaxed tracking-tight">
              “I started CORE WEB STUDIO with a simple belief: good digital work should be accessible to every business. Our approach is straightforward — understand the business first, then build the right digital solution around it. Whether it’s a website, automation, SEO or something more specific, the goal is always the same: create work that is thoughtful, useful and built to last.”
            </p>

            {/* Personal signature / attribution */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="ANURAG"
              className="group mt-6 sm:mt-8 pt-5 border-t border-[#111111]/10 flex items-center justify-between w-full cursor-pointer select-none"
            >
              <div className="flex flex-col items-start">
                <span
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                  className="text-2xl sm:text-3xl text-[#111111] font-bold tracking-wide -rotate-1 select-none md:group-hover:text-[#0047FF] transition-colors"
                >
                  — Anurag Tiwari
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#666666] mt-0.5">
                  FOUNDER, CORE WEB STUDIO
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7EE] border border-[#111111] text-[11px] font-black uppercase text-[#111111] md:group-hover:bg-[#0047FF] md:group-hover:text-white transition-all shadow-[2px_2px_0px_#111111]">
                <span>TALK TO ANURAG</span>
                <span className="text-[#0047FF] md:group-hover:text-white">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
