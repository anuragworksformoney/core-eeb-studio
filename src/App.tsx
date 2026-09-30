import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Principles from './components/Principles';
import About from './components/About';
import Purpose from './components/Purpose';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import QuickStartModal from './components/QuickStartModal';
import WhatsAppButton from './components/WhatsAppButton';
import SectionReveal from './components/SectionReveal';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

type Route = 'home' | 'terms' | 'privacy';

const getRouteFromLocation = (): Route => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.startsWith('/terms') || hash === '#terms' || hash === '#terms-and-conditions') {
    return 'terms';
  }
  if (path.startsWith('/privacy') || hash === '#privacy' || hash === '#privacy-policy') {
    return 'privacy';
  }
  return 'home';
};

export default function App() {
  const [route, setRoute] = useState<Route>(getRouteFromLocation);
  const [isQuickStartOpen, setIsQuickStartOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string>('');

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(getRouteFromLocation());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (route === 'terms') {
      document.title = 'Terms & Conditions — CORE WEB STUDIO';
    } else if (route === 'privacy') {
      document.title = 'Privacy Policy — CORE WEB STUDIO';
    } else {
      document.title = 'CORE WEB STUDIO — Digital Solutions for Real Businesses';
    }
  }, [route]);

  const navigateTo = (pathOrRoute: string, sectionId?: string) => {
    let targetUrl = '/';
    let targetRoute: Route = 'home';

    if (pathOrRoute === '/terms' || pathOrRoute === 'terms') {
      targetUrl = '/terms';
      targetRoute = 'terms';
    } else if (pathOrRoute === '/privacy' || pathOrRoute === 'privacy') {
      targetUrl = '/privacy';
      targetRoute = 'privacy';
    }

    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    setRoute(targetRoute);

    if (targetRoute === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenProjectModal = (serviceName?: string) => {
    if (serviceName) {
      setInquiryService(serviceName);
    }
    setIsQuickStartOpen(true);
  };

  return (
    <div className="bg-[#FAF7EE] bg-dotted-grid text-[#111111] min-h-screen relative selection:bg-[#0047FF] selection:text-white overflow-x-hidden">
      {/* Custom Cursor follower (Desktop Only, disabled on mobile/touch & prefers-reduced-motion) */}
      <CustomCursor />

      {/* Main Top Header */}
      <Header
        onOpenProjectModal={() => handleOpenProjectModal()}
        onNavigateHome={(sectionId) => navigateTo('/', sectionId)}
        isHome={route === 'home'}
      />

      {/* Main Content Flow */}
      <main className="w-full pt-16 lg:pt-18 overflow-x-hidden">
        {route === 'terms' ? (
          <TermsPage onNavigateHome={() => navigateTo('/')} />
        ) : route === 'privacy' ? (
          <PrivacyPage onNavigateHome={() => navigateTo('/')} />
        ) : (
          <>
            {/* 1. Large Editorial Hero on subtle dotted canvas */}
            <Hero onOpenProjectModal={() => handleOpenProjectModal()} />

            {/* 2. Full-Width Infinite Seamless Marquee */}
            <Marquee />

            {/* 3. Section 01 — What We Do */}
            <SectionReveal>
              <Services onOpenProjectModal={handleOpenProjectModal} />
            </SectionReveal>

            {/* 4. Section 02 — Selected Work */}
            <SectionReveal>
              <Portfolio />
            </SectionReveal>

            {/* 5. Section 03 — Why Us (Principles) */}
            <SectionReveal>
              <Principles onOpenProjectModal={() => handleOpenProjectModal()} />
            </SectionReveal>

            {/* 6. Section 04 — How It Works (Process) */}
            <SectionReveal>
              <Process onOpenProjectModal={() => handleOpenProjectModal()} />
            </SectionReveal>

            {/* 7. Section 05 — About (Philosophy) */}
            <SectionReveal>
              <About />
            </SectionReveal>

            {/* 8. Dedicated Purpose Section: WHY CORE WEB STUDIO EXISTS */}
            <SectionReveal>
              <Purpose />
            </SectionReveal>

            {/* 9. Section 06 — Contact */}
            <SectionReveal>
              <ContactSection inquiryService={inquiryService} />
            </SectionReveal>

            {/* 10. FAQ Section */}
            <SectionReveal>
              <FaqSection />
            </SectionReveal>

            {/* 11. Final CTA (Strong Black Section) */}
            <SectionReveal>
              <FinalCta onOpenProjectModal={() => handleOpenProjectModal()} />
            </SectionReveal>
          </>
        )}
      </main>

      {/* 10. Clean Studio Footer */}
      <Footer onNavigate={(path) => navigateTo(path)} />

      {/* Quick Intake Project Modal */}
      <QuickStartModal
        isOpen={isQuickStartOpen}
        onClose={() => setIsQuickStartOpen(false)}
        prefillProject={inquiryService}
      />

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppButton />
    </div>
  );
}
