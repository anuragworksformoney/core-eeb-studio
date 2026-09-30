import { useState } from 'react';

interface StudioLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export default function StudioLogo({
  size = 'md',
  showText = true,
  className = '',
  theme = 'light',
}: StudioLogoProps) {
  const [imgError, setImgError] = useState(false);
  const isDark = theme === 'dark';

  const markSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-11 sm:h-11',
  };

  const titleSizes = {
    sm: 'text-sm font-black tracking-tight',
    md: 'text-base sm:text-lg font-black tracking-tight',
    lg: 'text-lg sm:text-xl font-black tracking-tight',
  };

  const descriptorSizes = {
    sm: 'text-[8px] tracking-wider',
    md: 'text-[9px] sm:text-[10px] tracking-widest',
    lg: 'text-[10px] sm:text-[11px] tracking-widest',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Crisp Brand Mark - No white rectangle, pure transparency */}
      <div className={`relative ${markSizes[size]} shrink-0 flex items-center justify-center`}>
        {!imgError ? (
          <img
            src="/core-web-studio-mark.png"
            alt="CORE WEB STUDIO"
            className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          <div
            className="w-full h-full rounded-full bg-[#0047FF] border-2 border-[#111111] flex items-center justify-center shadow-[1px_1px_0px_#111111]"
            aria-hidden="true"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white border border-[#111111]" />
          </div>
        )}
      </div>

      {/* Brand Name & Studio Descriptor */}
      {showText && (
        <div className="flex flex-col justify-center whitespace-nowrap">
          <span
            className={`uppercase ${titleSizes[size]} leading-none ${
              isDark
                ? 'text-white group-hover:text-[#60A5FA]'
                : 'text-[#111111] group-hover:text-[#0047FF]'
            } transition-colors`}
          >
            CORE WEB STUDIO
          </span>
          <span
            className={`uppercase ${descriptorSizes[size]} font-bold mt-1 leading-none ${
              isDark ? 'text-[#888888]' : 'text-[#666666]'
            }`}
          >
            BUILD. CONNECT. GROW.
          </span>
        </div>
      )}
    </div>
  );
}
