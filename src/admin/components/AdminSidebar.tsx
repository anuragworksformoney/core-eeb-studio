import React from 'react';
import { useAdmin } from '../AdminContext';
import { AdminTab } from '../types';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarClock,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePublic: (path?: string) => void;
}

export default function AdminSidebar({ isOpen, onClose, onNavigatePublic }: AdminSidebarProps) {
  const { activeTab, setActiveTab, leads, followUps, logout, adminUser } = useAdmin();

  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;
  const pendingFollowUpsCount = followUps.filter((f) => !f.completed).length;

  const navItems: { tab: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      tab: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      tab: 'leads',
      label: 'Leads & Inquiries',
      icon: <Users className="w-4 h-4" />,
      badge: newLeadsCount > 0 ? newLeadsCount : undefined,
    },
    {
      tab: 'projects',
      label: 'Client Projects',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      tab: 'follow-ups',
      label: 'Follow-ups',
      icon: <CalendarClock className="w-4 h-4" />,
      badge: pendingFollowUpsCount > 0 ? pendingFollowUpsCount : undefined,
    },
    {
      tab: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-800`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                C
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-sm text-white tracking-tight block">
                  CORE WEB STUDIO
                </span>
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block">
                  Admin Portal
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => handleSelectTab(item.tab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          {/* Public Website Link */}
          <button
            type="button"
            onClick={() => onNavigatePublic('/')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] text-slate-500">Live</span>
          </button>

          {/* Current Admin Account Card */}
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {adminUser?.displayName || adminUser?.email?.split('@')[0] || 'Administrator'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {adminUser?.email || 'admin@corewebstudio.in'}
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
