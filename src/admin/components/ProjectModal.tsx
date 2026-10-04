import React, { useState, useEffect } from 'react';
import { useAdmin } from '../AdminContext';
import { Project, ProjectStatus } from '../types';
import { X, Briefcase, Calendar, Globe, FileText, Loader2, Save } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  project?: Project | null;
  onClose: () => void;
}

const ALL_PROJECT_STATUSES: ProjectStatus[] = [
  'DEMO',
  'DISCUSSION',
  'IN PROGRESS',
  'REVIEW',
  'COMPLETED',
  'ON HOLD',
];

const COMMON_SERVICES = [
  'Website Design & Development',
  'WhatsApp Automation & Bot',
  'Local SEO & Google Business',
  'Lead Generation Funnel',
  'Business Workflow Automation',
  'E-Commerce & Digital Catalog',
  'Custom Web Application',
];

export default function ProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const { saveProject } = useAdmin();

  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [serviceType, setServiceType] = useState('Website Design & Development');
  const [status, setStatus] = useState<ProjectStatus>('IN PROGRESS');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setClientName(project.clientName || '');
      setProjectName(project.projectName || '');
      setServiceType(project.serviceType || 'Website Design & Development');
      setStatus(project.status || 'IN PROGRESS');
      setStartDate(project.startDate || '');
      setDeadline(project.deadline || '');
      setLiveUrl(project.liveUrl || '');
      setInternalNotes(project.internalNotes || '');
    } else {
      setClientName('');
      setProjectName('');
      setServiceType('Website Design & Development');
      setStatus('IN PROGRESS');
      setStartDate(new Date().toISOString().split('T')[0]);
      setDeadline('');
      setLiveUrl('');
      setInternalNotes('');
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !projectName.trim()) return;

    setSaving(true);
    try {
      await saveProject(
        {
          clientName: clientName.trim(),
          projectName: projectName.trim(),
          serviceType: serviceType.trim(),
          status,
          startDate,
          deadline,
          liveUrl: liveUrl.trim(),
          internalNotes: internalNotes.trim(),
        },
        project?.id
      );
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-16 px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {project ? 'Edit Client Project' : 'Create New Client Project'}
              </h3>
              <p className="text-[11px] text-slate-600">Track delivery, milestones and URLs</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Client / Business Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Sahejrao Realtors"
                className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Luxury Real Estate Portal"
                className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Type
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white text-slate-700 cursor-pointer"
              >
                {COMMON_SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Project Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white text-slate-700 cursor-pointer"
              >
                {ALL_PROJECT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white text-slate-700"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Live Website / Staging URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Internal Notes & Credentials Reference
            </label>
            <textarea
              rows={3}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="e.g. Hosting provisioned on Vercel, domain with GoDaddy, WhatsApp API approved..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{project ? 'Update Project' : 'Create Project'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
