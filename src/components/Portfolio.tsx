import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/content';

export default function Portfolio() {
  return (
    <section id="work" className="w-full py-8 sm:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-2 sm:mb-3">
            PORTFOLIO
          </span>
          <h2 className="font-black uppercase text-2xl min-[360px]:text-3xl sm:text-6xl md:text-7xl text-[#111111] leading-[0.94] tracking-tight mb-2 sm:mb-3">
            SELECTED WORK
          </h2>
          <p className="text-sm sm:text-xl text-[#444444] font-semibold">
            A few websites we've built for real businesses.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">
          {PROJECTS.map((project, idx) => {
            // Asymmetric layout spans: card 0 is 7 cols, card 1 is 5 cols; card 2 is 5 cols, card 3 is 7 cols; cards 4 & 5 are 6 cols each
            const colSpan =
              idx === 0
                ? 'md:col-span-7'
                : idx === 1
                ? 'md:col-span-5'
                : idx === 2
                ? 'md:col-span-5'
                : idx === 3
                ? 'md:col-span-7'
                : 'md:col-span-6';

            return (
              <article
                key={project.id}
                className={`group flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border-2 border-[#111111] shadow-[4px_4px_0px_#111111] md:hover:-translate-y-1.5 md:hover:scale-[1.01] md:hover:shadow-[6px_6px_0px_#0047FF] transition-all duration-300 overflow-hidden ${colSpan}`}
              >
                {/* Large Preview Image Frame */}
                <div className="relative w-full aspect-[16/10] bg-[#FAF7EE] border-b-2 border-[#111111] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.altText}
                    className="w-full h-full object-cover md:group-hover:scale-104 md:group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Sticker (Intentional, Studio Blue or Black) */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 inline-flex items-center px-3 py-1 rounded-full bg-[#111111] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#0047FF]">
                    {project.category}
                  </div>
                </div>

                {/* Content & Action */}
                <div className="p-5 sm:p-8 flex flex-col justify-between grow md:group-hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-xs font-black text-[#0047FF] tracking-widest uppercase">
                        PROJECT {project.number}
                      </span>
                    </div>
                    <h3 className="font-black uppercase text-xl sm:text-3xl text-[#111111] tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-base text-[#444444] font-medium leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Exactly ONE "VIEW PROJECT" link opening live site in new tab */}
                  <div className="pt-3 sm:pt-4 border-t-2 border-[#111111]/10 flex items-center justify-between">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-black uppercase tracking-wider text-[#111111] group-hover:text-[#0047FF] transition-colors py-1"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <span>VIEW PROJECT</span>
                        <ArrowRight className="w-4 h-4 text-[#0047FF] md:group-hover:translate-x-1.5 transition-transform duration-200" />
                      </span>

                      <span
                        aria-hidden="true"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF7EE] text-[#111111] border-2 border-[#111111] flex items-center justify-center group-hover:bg-[#0047FF] group-hover:text-white transition-all shadow-[2px_2px_0px_#111111]"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
