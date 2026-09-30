import StudioLogo from './StudioLogo';

export default function BrandStrip() {
  return (
    <section className="w-full my-6 bg-white rounded-xl shadow-xs border border-[#e6e8eb] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <StudioLogo size="lg" showText={false} />
        <div className="flex flex-col">
          <span className="font-headline text-lg sm:text-xl uppercase tracking-tight text-[#191c1e] font-black">
            CORE DIGITAL PRACTICE
          </span>
          <span className="font-sans-alt text-xs text-[#5f5e5e] uppercase tracking-widest font-semibold">
            BESPOKE ARCHITECTURE & DEV
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-[#5f5e5e] font-sans-alt text-xs uppercase tracking-wider font-semibold">
        <span className="px-3.5 py-1.5 rounded-full bg-[#f2f4f7] text-[#191c1e] border border-[#e6e8eb]">
          100% Hand-Crafted Code
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-[#f2f4f7] text-[#191c1e] border border-[#e6e8eb]">
          Sub-Second Load Time
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-[#f2f4f7] text-[#191c1e] border border-[#e6e8eb]">
          Mobile First Architecture
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-[#0037b0] text-white shadow-xs">
          Production Grade
        </span>
      </div>
    </section>
  );
}

