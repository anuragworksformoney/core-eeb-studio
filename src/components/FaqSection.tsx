import { useState } from 'react';

interface FaqItem {
  num: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    num: '01',
    question: 'What services does CORE WEB STUDIO provide?',
    answer:
      'We provide website design & development, WhatsApp automation, SEO & Google visibility, lead generation and business automation.',
  },
  {
    num: '02',
    question: 'Do you only build websites?',
    answer:
      'No. Websites are one part of what we do. We also help businesses with automation, SEO, lead generation and other practical digital systems.',
  },
  {
    num: '03',
    question: 'Can you work with my existing website?',
    answer:
      'Yes. We can improve, redesign or update an existing website when that makes more sense than starting from scratch.',
  },
  {
    num: '04',
    question: 'How long does a project take?',
    answer:
      'The timeline depends on the scope and requirements of the project. We discuss the expected timeline before starting.',
  },
  {
    num: '05',
    question: 'How does pricing work?',
    answer:
      'Pricing depends on what your business needs and the scope of the work. We discuss the requirements first and then provide a clear quote.',
  },
  {
    num: '06',
    question: 'How do I get started?',
    answer:
      'Simply get in touch with us and tell us about your business and what you need. We’ll discuss the right approach from there.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full py-8 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-6 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-2 sm:mb-3">
            FAQ
          </span>
          <h2 className="font-black uppercase text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl text-[#111111] leading-[0.95] tracking-tight">
            QUESTIONS, ANSWERED.
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-[#111111]/15">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.num} className="border-b border-[#111111]/15">
                <button
                  type="button"
                  id={`faq-btn-${item.num}`}
                  onClick={() => toggleItem(index)}
                  className="w-full py-4 sm:py-6 flex items-center justify-between gap-3 sm:gap-4 text-left transition-colors group cursor-pointer focus:outline-none min-h-[48px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.num}`}
                >
                  <div className="flex items-baseline sm:items-center gap-2 sm:gap-4 pr-2 min-w-0">
                    <span className="text-xs sm:text-sm font-black text-[#0047FF] font-mono tracking-wider shrink-0">
                      {item.num}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#111111]/30 shrink-0 select-none">
                      —
                    </span>
                    <span className="font-bold sm:font-black text-sm sm:text-lg md:text-xl text-[#111111] group-hover:text-[#0047FF] transition-colors leading-snug tracking-tight">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-sm font-black transition-all select-none ${
                      isOpen
                        ? 'bg-[#0047FF] border-[#0047FF] text-white'
                        : 'bg-white/80 border-[#111111]/25 text-[#111111] group-hover:border-[#0047FF] group-hover:text-[#0047FF]'
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                <div
                  id={`faq-answer-${item.num}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.num}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 sm:pb-6 pl-7 sm:pl-11 pr-4 sm:pr-8 text-sm sm:text-base text-[#444444] font-medium sm:font-semibold leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
