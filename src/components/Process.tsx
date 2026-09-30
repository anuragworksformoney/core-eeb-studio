interface ProcessProps {
  onOpenProjectModal?: () => void;
}

const STEPS = [
  {
    num: '01',
    title: 'DISCUSS',
    desc: 'We understand your business, goals and what you need.',
  },
  {
    num: '02',
    title: 'PLAN',
    desc: 'We choose the right digital solution for your business.',
  },
  {
    num: '03',
    title: 'BUILD',
    desc: 'We design, develop and set everything up for you.',
  },
  {
    num: '04',
    title: 'LAUNCH',
    desc: 'We put everything together and help you get it working.',
  },
];

export default function Process({ onOpenProjectModal }: ProcessProps) {
  return (
    <section id="process" className="w-full py-8 sm:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-2 sm:mb-3">
            PROCESS
          </span>
          <h2 className="font-black uppercase text-2xl min-[360px]:text-3xl sm:text-6xl md:text-7xl text-[#111111] leading-[0.94] tracking-tight">
            HOW IT WORKS
          </h2>
        </div>

        {/* 4 Simple Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="group p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] md:hover:-translate-y-2 md:hover:shadow-[6px_6px_0px_#0047FF] transition-all duration-200 flex flex-col justify-between min-h-0 sm:min-h-[220px]"
            >
              <div>
                <span className="inline-block font-black text-2xl sm:text-4xl text-[#0047FF] mb-3 sm:mb-5 md:group-hover:scale-105 md:group-hover:translate-x-1 transition-transform duration-200">
                  {step.num}
                </span>
                <h3 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight mb-2">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#444444] font-semibold">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
