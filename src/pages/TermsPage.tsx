import { ArrowLeft, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { STUDIO_EMAIL, STUDIO_PHONE, getWhatsAppUrl } from '../config/contact';

interface TermsPageProps {
  onNavigateHome: () => void;
}

export default function TermsPage({ onNavigateHome }: TermsPageProps) {
  const whatsappUrl = getWhatsAppUrl("Hi CORE WEB STUDIO! I have a question regarding your Terms & Conditions.");

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-16">
      {/* Back to Home Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full border-2 border-[#111111] bg-white text-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Header Card */}
      <div className="rounded-3xl bg-white border-2 border-[#111111] shadow-[6px_6px_0px_#0047FF] p-7 sm:p-12 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-5">
          <span className="w-2 h-2 rounded-full bg-[#0047FF]" />
          <span>LEGAL</span>
        </div>

        <h1 className="font-black uppercase text-3xl sm:text-4xl md:text-5xl text-[#111111] leading-[0.98] tracking-tight mb-4">
          TERMS & CONDITIONS
        </h1>

        <p className="text-sm font-bold uppercase tracking-wider text-[#666666]">
          CORE WEB STUDIO • LAST UPDATED: MARCH 2026
        </p>

        <div className="mt-6 pt-6 border-t-2 border-[#111111]/10 text-base sm:text-lg text-[#222222] font-medium leading-relaxed">
          Welcome to CORE WEB STUDIO. These Terms & Conditions govern your engagement with us for digital services including custom website design and development, WhatsApp business automation, search engine optimization (SEO), digital lead generation systems, and technical consulting. By commissioning a project or engaging our services, you agree to these terms.
        </div>
      </div>

      {/* Terms Content Sections */}
      <div className="space-y-6 sm:space-y-8">
        {/* Section 1 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">01</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Scope of Services
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              CORE WEB STUDIO provides tailored digital solutions for modern businesses. Our core services comprise:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#444444]">
              <li>
                <strong className="text-[#111111]">Websites That Work:</strong> Bespoke UI/UX design, custom responsive frontend engineering, high-performance web development, domain and DNS configuration, and production deployment.
              </li>
              <li>
                <strong className="text-[#111111]">Smarter Automation:</strong> WhatsApp Business API integrations, instant enquiry routing, automated client onboarding workflows, and digital business systems.
              </li>
              <li>
                <strong className="text-[#111111]">Get Found Online:</strong> Search Engine Optimization (SEO), technical website audits, metadata optimization, and Google visibility setup.
              </li>
              <li>
                <strong className="text-[#111111]">Turn Attention Into Leads:</strong> Conversion-centered landing pages, contact funnels, and lead qualification mechanisms.
              </li>
            </ul>
            <p>
              The specific deliverables, specifications, and scope for each project are documented in a formal written proposal, quotation, or project agreement.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">02</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Project Proposals & Acceptance
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              All project proposals issued by CORE WEB STUDIO remain valid for thirty (30) calendar days from the date of issue unless specified otherwise. Acceptance occurs when the client confirms the scope in writing (via email, signed agreement, or documented WhatsApp confirmation) and remits the required project kickoff deposit.
            </p>
            <p>
              Work commences only after the initial milestone payment is received and foundational project assets are supplied.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">03</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Client Responsibilities & Assets
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              To ensure on-time delivery, the client agrees to provide all necessary business information, brand guidelines, high-resolution logos, product details, imagery, and copywriting in a timely manner.
            </p>
            <p>
              The client warrants that all text, imagery, trademarks, and media provided to CORE WEB STUDIO are either owned by the client or appropriately licensed. The client assumes full legal responsibility for any supplied material.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">04</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Process, Milestones & Revisions
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              Our production process follows a four-step framework: <strong>DISCUSS</strong>, <strong>PLAN</strong>, <strong>BUILD</strong>, and <strong>LAUNCH</strong>. Each phase includes designated review milestones.
            </p>
            <p>
              Each project includes the agreed rounds of design and layout refinements stated in your proposal. Revisions beyond the agreed scope, structural pivots requested after design sign-off, or additional custom feature requests will be estimated and billed separately under an agreed change request.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">05</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Intellectual Property & Handover
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              Upon receipt of full and final payment for the project, all intellectual property rights for custom frontend designs, bespoke page code, and unique assets created specifically for the client transfer to the client.
            </p>
            <p>
              CORE WEB STUDIO retains rights to proprietary developer toolkits, starter boilerplate libraries, and generalized code frameworks utilized across projects. CORE WEB STUDIO reserves the standard agency privilege to showcase the completed work, screenshots, and business metrics in our studio portfolio, case studies, and marketing materials.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">06</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Payment Terms & Invoicing
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              Payments are structured in milestones as set forth in the project proposal (typically an initial commitment deposit followed by milestone disbursements and final balance prior to production launch/handover).
            </p>
            <p>
              Invoices are due within seven (7) business days of issuance. Late payments may pause active development until the account is brought current. All payments must be made in the agreed currency via direct bank transfer or approved payment gateways.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">07</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Third-Party Services & Subscriptions
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              Certain digital solutions rely on external third-party providers (e.g. domain registrars, hosting infrastructure, Meta / WhatsApp Business API, Google Search Console, or payment processors).
            </p>
            <p>
              Any recurring fees, API usage charges, domain renewals, or hosting subscriptions levied by these third-party services are the sole responsibility of the client. CORE WEB STUDIO does not control external provider uptime or pricing changes.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">08</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Warranties & Limitation of Liability
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              CORE WEB STUDIO delivers robust, cross-browser tested digital work crafted to industry best practices. We provide a post-launch support period (as specified in your proposal) to rectify any bugs or inconsistencies directly attributable to the delivered code.
            </p>
            <p>
              In no event shall CORE WEB STUDIO be held liable for any indirect, incidental, or consequential damages, loss of business data, or downtime resulting from client modifications, external third-party platform interruptions, or hosting server outages.
            </p>
          </div>
        </section>
      </div>

      {/* Back to Home Bottom Link */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full border-2 border-[#111111] bg-[#111111] text-white shadow-[3px_3px_0px_#0047FF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
}
