import { useState, useEffect } from 'react';
import { X, ExternalLink, Smartphone, Tablet, Monitor, CheckCircle, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#191c1e]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#e6e8eb] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="h-16 px-6 border-b border-[#e6e8eb] flex items-center justify-between shrink-0 bg-[#f7f9fc]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0037b0]" />
            <span className="font-sans-alt text-xs uppercase font-bold tracking-wider text-[#0037b0]">
              CASE STUDY • {project.number}
            </span>
            <span className="text-[#c4c5d7]">/</span>
            <span className="font-headline font-bold text-lg uppercase text-[#191c1e]">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Device View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-[#eceef1] p-1 rounded-full text-[#5f5e5e]">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  deviceMode === 'desktop' ? 'bg-white text-[#191c1e] shadow-sm' : 'hover:text-[#191c1e]'
                }`}
                title="Desktop Preview"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  deviceMode === 'tablet' ? 'bg-white text-[#191c1e] shadow-sm' : 'hover:text-[#191c1e]'
                }`}
                title="Tablet Preview"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  deviceMode === 'mobile' ? 'bg-white text-[#191c1e] shadow-sm' : 'hover:text-[#191c1e]'
                }`}
                title="Mobile Preview"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-[#5f5e5e] hover:text-[#191c1e] hover:bg-[#eceef1] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Device Mockup Stage */}
          <div className="w-full bg-[#eceef1] rounded-2xl p-4 sm:p-8 flex items-center justify-center min-h-[340px] border border-[#e6e8eb]/70">
            <div
              className={`transition-all duration-300 rounded-xl overflow-hidden shadow-xl border border-[#c4c5d7]/50 bg-white ${
                deviceMode === 'desktop'
                  ? 'w-full max-w-4xl'
                  : deviceMode === 'tablet'
                  ? 'w-[540px] max-w-full'
                  : 'w-[320px] max-w-full'
              }`}
            >
              {/* Chrome mockup header */}
              <div className="h-7 bg-[#e6e8eb] px-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c4c5d7]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c4c5d7]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c4c5d7]" />
                </div>
                <div className="text-[10px] font-mono text-[#747686] truncate max-w-[200px]">
                  {project.liveUrl.replace('https://', '')}
                </div>
                <div className="w-6" />
              </div>

              {/* Preview Image */}
              <div className="relative aspect-[16/10] overflow-hidden group">
                <img
                  src={project.imageUrl}
                  alt={project.altText}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-[#191c1e]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-sans-alt text-sm font-bold backdrop-blur-xs"
                >
                  <span>Open Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 font-sans-alt text-xs font-semibold text-[#0037b0] uppercase tracking-wider mb-2">
                  <span>{project.category}</span> • <span>{project.year}</span>
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#191c1e] font-black">
                  {project.title}
                </h2>
              </div>

              <p className="font-sans-alt text-base text-[#191c1e] font-medium leading-relaxed">
                {project.description}
              </p>

              {project.longDescription && (
                <p className="font-sans-alt text-sm sm:text-base text-[#5f5e5e] leading-relaxed">
                  {project.longDescription}
                </p>
              )}

              {/* Highlights */}
              {project.highlights && (
                <div className="pt-4 space-y-3">
                  <h4 className="font-sans-alt text-xs uppercase tracking-wider font-bold text-[#191c1e]">
                    KEY ARCHITECTURAL HIGHLIGHTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-[#434655]">
                        <CheckCircle className="w-4 h-4 text-[#0037b0] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-[#f2f4f7] text-[#434655] font-sans-alt text-xs uppercase tracking-wider font-semibold border border-[#e6e8eb]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 bg-[#f2f4f7] p-6 rounded-xl border border-[#e6e8eb] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#e0e3e6]">
                  <span className="font-sans-alt text-xs uppercase text-[#5f5e5e] block">
                    INDUSTRY
                  </span>
                  <span className="font-sans-alt text-sm font-bold text-[#191c1e]">
                    {project.industry}
                  </span>
                </div>

                <div className="pb-3 border-b border-[#e0e3e6]">
                  <span className="font-sans-alt text-xs uppercase text-[#5f5e5e] block">
                    TIMELINE & RELEASE
                  </span>
                  <span className="font-sans-alt text-sm font-bold text-[#191c1e]">
                    {project.year}
                  </span>
                </div>

                {project.deliverables && (
                  <div>
                    <span className="font-sans-alt text-xs uppercase text-[#5f5e5e] block mb-2">
                      CORE DELIVERABLES
                    </span>
                    <ul className="space-y-1 font-sans-alt text-xs text-[#434655]">
                      {project.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0037b0]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 font-sans-alt text-sm uppercase tracking-wider font-bold rounded-full bg-[#0037b0] text-white py-3.5 px-4 shadow-md shadow-[#0037b0]/25 hover:bg-[#1d4ed8] transition-colors"
                >
                  <span>VISIT LIVE WEBSITE</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInquire(project.title);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 font-sans-alt text-xs uppercase tracking-wider font-bold rounded-full bg-white text-[#191c1e] py-3 px-4 border border-[#e6e8eb] hover:bg-[#f2f4f7] transition-colors cursor-pointer"
                >
                  <span>BUILD SOMETHING SIMILAR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
