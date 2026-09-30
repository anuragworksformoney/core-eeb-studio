import { STUDIO_EMAIL, STUDIO_PHONE, getWhatsAppUrl } from '../config/contact';
import { Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps = {}) {
  const whatsappUrl = getWhatsAppUrl();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-[#FAF7EE] pt-8 sm:pt-16 pb-20 sm:pb-16 border-t-2 border-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-[#2A2A2A]">
          {/* Brand Name */}
          <div>
            <span className="font-black tracking-tight text-xl sm:text-2xl text-white uppercase block">
              CORE WEB STUDIO
            </span>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 text-sm font-semibold">
            {/* Email */}
            <div className="flex items-center gap-2">
              <span className="text-[#888888]">Email:</span>
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                className="text-[#FAF7EE] hover:text-[#60A5FA] underline-offset-4 hover:underline transition-colors"
              >
                {STUDIO_EMAIL}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-2">
              <span className="text-[#888888]">WhatsApp:</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LET'S TALK"
                className="inline-flex items-center gap-1.5 text-[#FAF7EE] hover:text-[#25D366] underline-offset-4 hover:underline transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{STUDIO_PHONE}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Links */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-[#777777] text-center sm:text-left">
          <div>
            © 2026 CORE WEB STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
            <a
              href="/terms"
              onClick={(e) => handleLinkClick(e, '/terms')}
              className="text-[#777777] hover:text-[#FAF7EE] transition-colors cursor-pointer"
            >
              TERMS & CONDITIONS
            </a>
            <a
              href="/privacy"
              onClick={(e) => handleLinkClick(e, '/privacy')}
              className="text-[#777777] hover:text-[#FAF7EE] transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
