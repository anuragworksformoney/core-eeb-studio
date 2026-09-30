import { useState } from 'react';
import { getWhatsAppUrl } from '../config/contact';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none print:hidden pointer-events-auto"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        right: 'max(1rem, env(safe-area-inset-right, 1rem))',
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-text="LET'S TALK"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with CORE WEB STUDIO on WhatsApp"
        className="group relative flex items-center gap-2 h-11 w-11 sm:h-12 sm:w-auto px-0 sm:px-4 justify-center rounded-full bg-[#25D366] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#0047FF] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        {/* SVG WhatsApp Logo */}
        <div className="w-5 h-5 shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.473-8.413" />
          </svg>
        </div>

        {/* Label: On desktop always or hover, on mobile compact icon circle */}
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline whitespace-nowrap">
          {isHovered ? 'CHAT WITH US' : 'WHATSAPP'}
        </span>
      </a>
    </aside>
  );
}
