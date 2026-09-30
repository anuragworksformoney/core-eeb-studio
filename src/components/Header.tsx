import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import StudioLogo from './StudioLogo';

interface HeaderProps {
  onOpenProjectModal: () => void;
  onNavigateHome?: (sectionId?: string) => void;
  isHome?: boolean;
}

export default function Header({ onOpenProjectModal, onNavigateHome, isHome = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = ['services', 'work', 'why-us', 'process', 'about', 'contact'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Use IntersectionObserver instead of synchronous offsetTop queries during scroll
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-15% 0px -70% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigateHome) {
      onNavigateHome(id);
    }
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 w-full z-50 bg-[#FAF7EE]/95 backdrop-blur-xs border-b border-[#111111]"
    >
      <div className="h-16 lg:h-18 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Logo & Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) {
              onNavigateHome();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex items-center focus:outline-none cursor-pointer"
        >
          <StudioLogo size="md" />
        </a>

        {/* Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] font-bold tracking-wider uppercase text-[#111111]">
          <button
            type="button"
            onClick={() => scrollTo('work')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'work'
                ? 'text-[#0047FF] border-b-2 border-[#0047FF]'
                : 'hover:text-[#0047FF]'
            }`}
          >
            WORK
          </button>
          <button
            type="button"
            onClick={() => scrollTo('services')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'services'
                ? 'text-[#0047FF] border-b-2 border-[#0047FF]'
                : 'hover:text-[#0047FF]'
            }`}
          >
            SERVICES
          </button>
          <button
            type="button"
            onClick={() => scrollTo('process')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'process'
                ? 'text-[#0047FF] border-b-2 border-[#0047FF]'
                : 'hover:text-[#0047FF]'
            }`}
          >
            PROCESS
          </button>
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'about'
                ? 'text-[#0047FF] border-b-2 border-[#0047FF]'
                : 'hover:text-[#0047FF]'
            }`}
          >
            ABOUT
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'contact'
                ? 'text-[#0047FF] border-b-2 border-[#0047FF]'
                : 'hover:text-[#0047FF]'
            }`}
          >
            CONTACT
          </button>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenProjectModal}
            className="hidden sm:inline-flex items-center justify-center gap-2 text-[12px] font-extrabold uppercase tracking-wider rounded-full bg-[#111111] text-white px-5 py-2.5 border-2 border-[#111111] shadow-[3px_3px_0px_#0047FF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl border-2 border-[#111111] bg-white text-[#111111] shadow-[2px_2px_0px_#111111] cursor-pointer shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 md:hidden bg-[#FAF7EE] px-4 sm:px-6 py-5 border-b-2 border-[#111111] shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-2.5">
              <nav className="flex flex-col gap-1.5 text-sm uppercase tracking-wider font-extrabold">
                <button
                  type="button"
                  onClick={() => scrollTo('work')}
                  className="text-left px-4 py-2.5 rounded-xl hover:bg-white text-[#111111] transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  WORK
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('services')}
                  className="text-left px-4 py-2.5 rounded-xl hover:bg-white text-[#111111] transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  SERVICES
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('process')}
                  className="text-left px-4 py-2.5 rounded-xl hover:bg-white text-[#111111] transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  PROCESS
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  className="text-left px-4 py-2.5 rounded-xl hover:bg-white text-[#111111] transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  ABOUT
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="text-left px-4 py-2.5 rounded-xl hover:bg-white text-[#111111] transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  CONTACT
                </button>
              </nav>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="inline-flex items-center justify-center gap-2 text-sm font-extrabold rounded-full bg-[#111111] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#0047FF] px-6 py-3 mt-1 uppercase tracking-wider cursor-pointer min-h-[48px]"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
