interface PrinciplesProps {
  onOpenProjectModal?: () => void;
}

const PRINCIPLES_DATA = [
  {
    num: '01',
    title: 'WEBSITES THAT WORK',
    description: 'Modern websites designed around your business, your customers and your goals.',
  },
  {
    num: '02',
    title: 'SMARTER AUTOMATION',
    description: 'WhatsApp automation and digital systems that make enquiries and repetitive work easier.',
  },
  {
    num: '03',
    title: 'GET FOUND ONLINE',
    description: 'SEO and Google visibility strategies that help more people discover your business.',
  },
  {
    num: '04',
    title: 'TURN ATTENTION INTO LEADS',
    description: 'Better digital systems that help potential customers find you, contact you and take action.',
  },
];

export default function Principles({ onOpenProjectModal }: PrinciplesProps) {
  return (
    <section id="why-us" className="w-full py-8 sm:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-2 sm:mb-3">
            THE DIFFERENCE
          </span>
          <h2 className="font-black uppercase text-2xl min-[360px]:text-3xl sm:text-6xl md:text-7xl text-[#111111] leading-[0.94] tracking-tight">
            WHY CORE WEB STUDIO?
          </h2>
        </div>

        {/* 4 Clean Editorial Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {PRINCIPLES_DATA.map((item) => (
            <div
              key={item.num}
              className="group p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] md:hover:-translate-y-2 md:hover:shadow-[6px_6px_0px_#0047FF] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block font-black text-2xl sm:text-4xl text-[#0047FF] mb-3 sm:mb-4 md:group-hover:translate-x-1 transition-transform duration-200">
                  {item.num}
                </span>
                <h3 className="font-black uppercase text-lg sm:text-2xl text-[#111111] tracking-tight mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-lg text-[#444444] font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Subtle Micro-Interaction Detail */}
              <div className="mt-4 pt-3 border-t border-[#111111]/10 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider md:group-hover:text-[#0047FF] transition-colors">
                  SYSTEM / {item.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 md:group-hover:bg-[#0047FF] md:group-hover:scale-125 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
