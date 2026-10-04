import React from 'react';
import { useAdmin } from '../AdminContext';
import { Lead } from '../types';
import {
  Users,
  Briefcase,
  UserCheck,
  CheckCircle2,
  CalendarClock,
  ArrowRight,
  TrendingUp,
  Inbox,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { formatTimestamp, getLeadStatusBadge, getProjectStatusBadge } from '../utils/formatters';

interface DashboardViewProps {
  onSelectLead: (lead: Lead) => void;
  onOpenNewProject: () => void;
}

export default function DashboardView({ onSelectLead, onOpenNewProject }: DashboardViewProps) {
  const {
    leads,
    projects,
    followUps,
    loadingLeads,
    loadingProjects,
    setActiveTab,
    toggleFollowUpComplete,
  } = useAdmin();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED').length;
  const convertedLeads = leads.filter((l) => l.status === 'CONVERTED').length;
  const activeProjects = projects.filter(
    (p) => p.status === 'IN PROGRESS' || p.status === 'DISCUSSION' || p.status === 'REVIEW'
  ).length;

  const todayStr = new Date().toISOString().split('T')[0];
  const pendingFollowUps = followUps.filter((f) => !f.completed);
  const overdueFollowUps = pendingFollowUps.filter((f) => f.dueDate && f.dueDate < todayStr);

  const recentLeads = leads.slice(0, 5);
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Studio Operations Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
            CORE WEB STUDIO Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor client inquiries submitted through the public website, manage ongoing client projects, and coordinate follow-up reminders.
          </p>
        </div>

        {/* Decorative background accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-600/20 to-transparent pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {/* Card 1: Total Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {loadingLeads ? '—' : totalLeads}
          </div>
          <p className="text-[11px] text-slate-700 mt-1">All time inquiries</p>
        </div>

        {/* Card 2: New Leads */}
        <div className="bg-white rounded-xl border border-blue-200 p-4 sm:p-5 shadow-2xs hover:border-blue-300 transition-all bg-blue-50/20">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New Leads</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
            {loadingLeads ? '—' : newLeads}
          </div>
          <p className="text-[11px] text-blue-600 font-medium mt-1">Awaiting review</p>
        </div>

        {/* Card 3: Contacted Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Contacted</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {loadingLeads ? '—' : contactedLeads}
          </div>
          <p className="text-[11px] text-slate-700 mt-1">In communication</p>
        </div>

        {/* Card 4: Converted Leads */}
        <div className="bg-white rounded-xl border border-emerald-200 p-4 sm:p-5 shadow-2xs hover:border-emerald-300 transition-all bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Converted</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
            {loadingLeads ? '—' : convertedLeads}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Closed projects</p>
        </div>

        {/* Card 5: Active Projects */}
        <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Projects</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {loadingProjects ? '—' : activeProjects}
          </div>
          <p className="text-[11px] text-slate-700 mt-1">Under development</p>
        </div>
      </div>

      {/* Overdue Follow-ups Alert (if any) */}
      {overdueFollowUps.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 text-rose-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                {overdueFollowUps.length} Overdue Follow-up{overdueFollowUps.length > 1 ? 's' : ''}
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                Client leads require your scheduled response.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('follow-ups')}
            className="text-xs font-bold text-rose-700 hover:text-rose-900 underline shrink-0 cursor-pointer"
          >
            Review Now &rarr;
          </button>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Recent Inquiries
                </h3>
                <p className="text-xs text-slate-700">Submissions via public website forms</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span>View All ({totalLeads})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loadingLeads ? (
              <div className="py-12 text-center text-slate-600 text-xs">Loading live inquiries...</div>
            ) : recentLeads.length === 0 ? (
              <div className="py-12 text-center">
                <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No contact submissions yet</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Public contact form submissions will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentLeads.map((lead) => {
                  const badge = getLeadStatusBadge(lead.status);
                  return (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {lead.name}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            <span>{badge.label}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-700 truncate">
                          <span className="truncate">{lead.service}</span>
                          <span>&bull;</span>
                          <span className="text-slate-600 shrink-0">{formatTimestamp(lead.createdAt)}</span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Active Projects & Upcoming Follow-ups (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Projects Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Client Projects
                </h3>
                <p className="text-xs text-slate-700">Ongoing client deliverables</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span>View All ({projects.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loadingProjects ? (
              <div className="py-8 text-center text-slate-600 text-xs">Loading projects...</div>
            ) : recentProjects.length === 0 ? (
              <div className="py-8 text-center">
                <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No client projects registered</p>
                <button
                  type="button"
                  onClick={onOpenNewProject}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <span>+ Create First Project</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentProjects.map((p) => {
                  const badge = getProjectStatusBadge(p.status);
                  return (
                    <div
                      key={p.id}
                      onClick={() => setActiveTab('projects')}
                      className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{p.projectName}</p>
                          <p className="text-[11px] text-slate-700">{p.clientName}</p>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      {p.deadline && (
                        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 mt-1 border-t border-slate-200/50">
                          <span>Deadline:</span>
                          <span className="font-semibold text-slate-700">{p.deadline}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Follow-ups snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Upcoming Follow-ups
                </h3>
                <p className="text-xs text-slate-700">Scheduled reminders</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('follow-ups')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span>Pipeline ({pendingFollowUps.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingFollowUps.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-600">
                <CalendarClock className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                <span>All scheduled follow-ups are completed.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {pendingFollowUps.slice(0, 3).map((f) => (
                  <div
                    key={f.id}
                    className="p-2.5 rounded-lg border border-slate-100 flex items-start justify-between gap-2.5 text-xs hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 truncate">{f.leadName}</div>
                      <div className="text-[11px] text-slate-700 truncate">{f.notes}</div>
                      <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                        Due: {f.dueDate}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFollowUpComplete(f.id, true)}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 text-[10px] font-bold transition-colors cursor-pointer shrink-0"
                    >
                      Done
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
