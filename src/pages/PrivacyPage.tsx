import { ArrowLeft, Mail, MessageSquare, Lock } from 'lucide-react';
import { STUDIO_EMAIL, STUDIO_PHONE, getWhatsAppUrl } from '../config/contact';

interface PrivacyPageProps {
  onNavigateHome: () => void;
}

export default function PrivacyPage({ onNavigateHome }: PrivacyPageProps) {
  const whatsappUrl = getWhatsAppUrl("Hi CORE WEB STUDIO! I have a question regarding your Privacy Policy.");

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
          <span>PRIVACY</span>
        </div>

        <h1 className="font-black uppercase text-3xl sm:text-4xl md:text-5xl text-[#111111] leading-[0.98] tracking-tight mb-4">
          PRIVACY POLICY
        </h1>

        <p className="text-sm font-bold uppercase tracking-wider text-[#666666]">
          CORE WEB STUDIO • LAST UPDATED: MARCH 2026
        </p>

        <div className="mt-6 pt-6 border-t-2 border-[#111111]/10 text-base sm:text-lg text-[#222222] font-medium leading-relaxed">
          At CORE WEB STUDIO, we respect your privacy and are committed to safeguarding the personal and business information you share with us. This Privacy Policy explains what information we collect, how it is handled, and how your privacy is protected when you visit our website or work with our digital studio.
        </div>
      </div>

      {/* Privacy Content Sections */}
      <div className="space-y-6 sm:space-y-8">
        {/* Section 1 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">01</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Information We Collect
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              We collect information that you knowingly and voluntarily provide to us when interacting with our studio:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#444444]">
              <li>
                <strong className="text-[#111111]">Contact & Inquiry Details:</strong> Full name, business email address, phone / WhatsApp number, company name, and industry when you submit an inquiry form or initiate a project conversation.
              </li>
              <li>
                <strong className="text-[#111111]">Project Specifications:</strong> Your business requirements, target audience, preferred timelines, branding assets, and design preferences submitted through our project kickoff form or discovery sessions.
              </li>
              <li>
                <strong className="text-[#111111]">Direct Correspondence:</strong> Records of communications, messages sent via email, WhatsApp, or discovery calls concerning project scoping and progress.
              </li>
              <li>
                <strong className="text-[#111111]">Technical Logs:</strong> Non-personally identifiable technical telemetry (such as device type, browser version, and page load performance) to maintain site reliability.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">02</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              How We Use Your Information
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              We use the collected information solely for legitimate business operations and project execution, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#444444]">
              <li>Evaluating and responding to your project inquiries and proposals.</li>
              <li>Designing, building, testing, and deploying custom websites and digital automation workflows.</li>
              <li>Communicating milestone progress, staging previews, and delivery timelines.</li>
              <li>Issuing milestone invoices, service receipts, and project documentation.</li>
              <li>Providing post-launch technical assistance and warranty support.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">03</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              We Do Not Sell Your Data
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              CORE WEB STUDIO does not sell, rent, monetize, or trade your personal or business data to third parties, data aggregators, or advertising networks under any circumstances.
            </p>
            <p>
              Your contact details and business specifications are strictly utilized by our internal studio team to deliver your requested digital services.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">04</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              WhatsApp & Direct Messaging
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              We provide direct WhatsApp links and integration to enable swift, convenient communication. When you message CORE WEB STUDIO on WhatsApp:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#444444]">
              <li>Your WhatsApp telephone number and profile display name are transmitted to our studio chat.</li>
              <li>Messages are protected under WhatsApp's standard end-to-end encryption protocols.</li>
              <li>We will never add your number to unsolicited spam lists or broadcast marketing groups. Communication is reserved exclusively for project correspondence and support.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">05</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Data Storage & Security
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              We implement industry-standard technical and organizational safeguards to protect your personal and project information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              All web transmissions are encrypted via SSL/TLS. Sensitive credentials shared for deployment (such as API keys or DNS logins) are kept strictly confidential, accessed solely during setup, and permanently removed upon project handover if requested.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">06</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Data Retention
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              We retain personal information and project documentation for as long as necessary to fulfill the purposes for which it was gathered, provide ongoing client maintenance, and comply with standard legal, accounting, and tax requirements.
            </p>
            <p>
              Upon written request, we will archive or permanently delete your direct contact records and project staging files, subject to our statutory retention obligations.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">07</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Your Rights
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#444444]">
              <li>Request a copy of the personal information CORE WEB STUDIO holds about you.</li>
              <li>Request correction or rectification of incomplete or inaccurate data.</li>
              <li>Request deletion or restriction of processing of your personal information.</li>
              <li>Opt out of any direct communication or updates at any time.</li>
            </ul>
          </div>
        </section>

        {/* Section 8 */}
        <section className="rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-[#111111] text-white">08</span>
            <h2 className="font-black uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
              Contact Us Regarding Privacy
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#333333] space-y-3 leading-relaxed">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please get in touch with our studio founder:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#FAF7EE] border border-[#111111]/20 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <p className="font-bold text-[#111111] text-sm">Privacy Inquiries</p>
                <p className="text-xs text-[#666666]">Anurag Tiwari • Founder, CORE WEB STUDIO</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase">
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-[#0047FF] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{STUDIO_EMAIL}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
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
