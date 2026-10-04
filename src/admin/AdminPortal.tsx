import React, { useState } from 'react';
import { AdminProvider, useAdmin } from './AdminContext';
import AdminLogin from './components/AdminLogin';
import AccessDenied from './components/AccessDenied';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import DashboardView from './components/DashboardView';
import LeadsView from './components/LeadsView';
import ProjectsView from './components/ProjectsView';
import FollowUpsView from './components/FollowUpsView';
import SettingsView from './components/SettingsView';
import LeadDetailModal from './components/LeadDetailModal';
import ProjectModal from './components/ProjectModal';
import { Lead, Project } from './types';
import { Loader2 } from 'lucide-react';

interface AdminPortalProps {
  onNavigatePublic: (path?: string) => void;
}

function AdminContent({ onNavigatePublic }: AdminPortalProps) {
  const { user, isAuthorizedAdmin, loadingAuth, activeTab, toast } = useAdmin();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [initialFollowUpLead, setInitialFollowUpLead] = useState<Lead | null>(null);

  // 1. Loading Authentication State
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-sans">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md">
          C
        </div>
        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
        <p className="text-xs font-semibold text-slate-700">Verifying administrator session...</p>
      </div>
    );
  }

  // 2. Unauthenticated -> Show Admin Login
  if (!user) {
    return <AdminLogin onNavigatePublic={onNavigatePublic} />;
  }

  // 3. Authenticated but not an Authorized Admin -> Show Access Denied
  if (!isAuthorizedAdmin) {
    return <AccessDenied onNavigatePublic={onNavigatePublic} />;
  }

  // 4. Authorized Admin -> Render Full Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-3 duration-200 pointer-events-none">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 pointer-events-auto ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigatePublic={onNavigatePublic}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Fixed Header */}
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenNewProject={() => setNewProjectModalOpen(true)}
          onNavigatePublic={onNavigatePublic}
        />

        {/* View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onSelectLead={(lead) => setSelectedLead(lead)}
              onOpenNewProject={() => setNewProjectModalOpen(true)}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsView
              onSelectLead={(lead) => setSelectedLead(lead)}
              onScheduleFollowUp={(lead) => setInitialFollowUpLead(lead)}
            />
          )}

          {activeTab === 'projects' && <ProjectsView />}

          {activeTab === 'follow-ups' && (
            <FollowUpsView
              initialLead={initialFollowUpLead}
              onClearInitialLead={() => setInitialFollowUpLead(null)}
            />
          )}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onScheduleFollowUp={(lead) => {
          setInitialFollowUpLead(lead);
        }}
      />

      {/* Quick Add Project Modal from Header */}
      <ProjectModal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
      />
    </div>
  );
}

export default function AdminPortal({ onNavigatePublic }: AdminPortalProps) {
  return (
    <AdminProvider>
      <AdminContent onNavigatePublic={onNavigatePublic} />
    </AdminProvider>
  );
}
