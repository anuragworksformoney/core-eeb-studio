import React from 'react';
import { useAdmin } from '../AdminContext';
import { Menu, ShieldCheck, Plus, ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onOpenNewProject: () => void;
  onNavigatePublic: (path?: string) => void;
}

export default function AdminHeader({
  onToggleSidebar,
  onOpenNewProject,
  onNavigatePublic,
}: AdminHeaderProps) {
  const { activeTab, adminUser } = useAdmin();

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'leads':
        return 'Lead Management';
      case 'projects':
        return 'Client Projects';
      case 'follow-ups':
        return 'Follow-up Pipeline';
      case 'settings':
        return 'Portal Settings';
      default:
        return 'Admin Portal';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open Navigation Sidebar"
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {getTitle()}
          </h1>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-700">
            <span>CORE WEB STUDIO</span>
            <span>&bull;</span>
            <span className="capitalize">{activeTab}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Firestore Connected Badge */}
        <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Firestore</span>
        </div>

        {/* Quick Add Project Button */}
        <button
          type="button"
          onClick={onOpenNewProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Project</span>
        </button>

        {/* View Public Site button */}
        <button
          type="button"
          onClick={() => onNavigatePublic('/')}
          title="Open Public Site"
          aria-label="Open Public Site"
          className="hidden sm:inline-flex items-center gap-1 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Admin Avatar Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
            {adminUser?.displayName?.[0] || adminUser?.email?.[0] || 'A'}
          </div>
          <div className="hidden xl:block text-left text-xs leading-tight">
            <span className="font-bold text-slate-800 block truncate max-w-[120px]">
              {adminUser?.displayName || adminUser?.email?.split('@')[0]}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
