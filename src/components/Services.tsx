import { ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onOpenProjectModal: (serviceName?: string) => void;
}

const SERVICES_DATA = [
  {
    num: '01',
    title: 'WEBSITE DESIGN & DEVELOPMENT',
    description: 'Modern websites built around your business.',
    gridSpan: 'lg:col-span-3 md:col-span-1',
  },
  {
    num: '02',
    title: 'WHATSAPP AUTOMATION',
    description: 'Turn enquiries into easier conversations.',
    gridSpan: 'lg:col-span-3 md:col-span-1',
  },
  {
    num: '03',
    title: 'SEO & GOOGLE VISIBILITY',
    description: 'Help more people discover your business online.',
    gridSpan: 'lg:col-span-2 md:col-span-1',
  },
  {
    num: '04',
    title: 'LEAD GENERATION',
    description: 'Build better ways for potential customers to reach you.',
    gridSpan: 'lg:col-span-2 md:col-span-1',
  },
  {
    num: '05',
    title: 'BUSINESS AUTOMATION',
    description: 'Reduce repetitive work with smarter digital systems.',
    gridSpan: 'lg:col-span-2 md:col-span-2',
  },
];

export default function Services({ onOpenProjectModal }: ServicesProps) {
  return (
    <section id="services" className="w-full py-8 sm:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-2 sm:mb-3">
            WHAT WE DO
          </span>
          <h2 className="font-black uppercase text-2xl min-[360px]:text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111111] leading-[0.94] tracking-tight">
            <span className="block">WE MAKE</span>
            <span className="block">BUSINESSES</span>
            <span className="block text-[#0047FF]">LOOK GOOD</span>
            <span className="block">ONLINE.</span>
          </h2>
        </div>

        {/* Editorial Poster Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-8">
          {SERVICES_DATA.map((svc) => (
            <div
              key={svc.num}
              className={`group p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] md:hover:-translate-y-2 md:hover:shadow-[6px_6px_0px_#0047FF] transition-all duration-200 flex flex-col justify-between min-h-0 sm:min-h-[280px] ${svc.gridSpan}`}
            >
              <div>
                {/* Large Number */}
                <span className="block font-black text-3xl sm:text-5xl text-[#0047FF] mb-4 sm:mb-6 md:group-hover:translate-x-1 transition-transform duration-200">
                  {svc.num}
                </span>

                {/* Service Title */}
                <h3 className="font-black uppercase text-xl sm:text-3xl text-[#111111] tracking-tight mb-3 sm:mb-4">
                  {svc.title}
                </h3>

                {/* Short human description */}
                <p className="text-sm sm:text-lg text-[#333333] font-medium leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Action row with arrow button */}
              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t-2 border-[#111111]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenProjectModal(svc.title)}
                  className="text-xs font-black uppercase tracking-wider text-[#111111] group-hover:text-[#0047FF] transition-colors cursor-pointer py-1"
                >
                  START THIS →
                </button>
                <button
                  type="button"
                  onClick={() => onOpenProjectModal(svc.title)}
                  aria-label={`Start ${svc.title}`}
                  className="w-10 h-10 rounded-full bg-[#FAF7EE] text-[#111111] border-2 border-[#111111] flex items-center justify-center md:group-hover:bg-[#0047FF] md:group-hover:text-white transition-all shadow-[2px_2px_0px_#111111] cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4 md:group-hover:rotate-45 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
