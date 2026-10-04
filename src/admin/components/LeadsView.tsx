import React, { useState, useMemo } from 'react';
import { useAdmin } from '../AdminContext';
import { Lead, LeadStatus } from '../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  Inbox,
  CalendarPlus,
  Eye,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { formatTimestamp, getLeadStatusBadge } from '../utils/formatters';

interface LeadsViewProps {
  onSelectLead: (lead: Lead) => void;
  onScheduleFollowUp: (lead: Lead) => void;
}

const ALL_STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'INTERESTED', 'CONVERTED', 'LOST'];

export default function LeadsView({ onSelectLead, onScheduleFollowUp }: LeadsViewProps) {
  const { leads, loadingLeads, leadsError, updateLeadStatus } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Extract unique services from leads
  const availableServices = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.service) set.add(l.service);
    });
    return Array.from(set);
  }, [leads]);

  // Filter & Sort Logic
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // Search Filter
        const queryLower = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !queryLower ||
          lead.name?.toLowerCase().includes(queryLower) ||
          lead.email?.toLowerCase().includes(queryLower) ||
          lead.businessName?.toLowerCase().includes(queryLower);

        // Status Filter
        const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;

        // Service Filter
        const matchesService = serviceFilter === 'ALL' || lead.service === serviceFilter;

        return matchesQuery && matchesStatus && matchesService;
      })
      .sort((a, b) => {
        const timeA = a.createdAt?.seconds
          ? a.createdAt.seconds * 1000
          : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.seconds
          ? b.createdAt.seconds * 1000
          : new Date(b.createdAt || 0).getTime();

        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [leads, searchQuery, statusFilter, serviceFilter, sortOrder]);

  const handleQuickStatusChange = async (leadId: string, newStatus: LeadStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateLeadStatus(leadId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Lead Management
            </h2>
            <p className="text-xs text-slate-700 mt-0.5">
              Live prospective inquiries from the CORE WEB STUDIO contact forms ({leads.length} total)
            </p>
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({leads.length})
            </button>
            {ALL_STATUSES.map((st) => {
              const count = leads.filter((l) => l.status === st).length;
              const isSelected = statusFilter === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input (5 cols) */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, business..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-slate-50/50"
            />
          </div>

          {/* Service Filter (4 cols) */}
          <div className="sm:col-span-4 relative">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-slate-50/50 text-slate-700 cursor-pointer"
            >
              <option value="ALL">All Services ({availableServices.length})</option>
              {availableServices.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order Toggle (3 cols) */}
          <div className="sm:col-span-3">
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {leadsError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {leadsError}
        </div>
      )}

      {/* Table & Cards Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loadingLeads ? (
          <div className="py-20 text-center text-slate-600 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-400" />
            <span>Fetching live Firestore submissions...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 text-center p-6">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No matching leads found</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL' || serviceFilter !== 'ALL'
                ? 'Try broadening your search query or resetting active filters.'
                : 'No contact form submissions have been recorded yet.'}
            </p>
            {(searchQuery || statusFilter !== 'ALL' || serviceFilter !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setServiceFilter('ALL');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Client / Name</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Inquiry Excerpt</th>
                    <th className="py-3 px-4">Submission Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredLeads.map((lead) => {
                    const badge = getLeadStatusBadge(lead.status);
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => onSelectLead(lead)}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      >
                        {/* Name & Contact */}
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div className="font-bold text-sm group-hover:text-blue-600 transition-colors">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-slate-600">{lead.email}</div>
                          {lead.businessName && (
                            <div className="text-[10px] text-slate-700 font-medium">{lead.businessName}</div>
                          )}
                        </td>

                        {/* Service */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700 max-w-[200px] truncate">
                            {lead.service}
                          </span>
                        </td>

                        {/* Message Excerpt */}
                        <td className="py-3.5 px-4 text-slate-600 max-w-[280px]">
                          <p className="line-clamp-2 text-xs">
                            {lead.businessDescription || '—'}
                          </p>
                          {lead.internalNotes && (
                            <div className="text-[10px] text-blue-700 font-medium mt-1 truncate">
                              Note: {lead.internalNotes}
                            </div>
                          )}
                        </td>

                        {/* Submission Date */}
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {formatTimestamp(lead.createdAt)}
                        </td>

                        {/* Status (with inline quick change) */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleQuickStatusChange(lead.id, e.target.value as LeadStatus, e as any)
                            }
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer focus:outline-none ${badge.bg} ${badge.text} border-current`}
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st} className="bg-white text-slate-900">
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onScheduleFollowUp(lead);
                              }}
                              title="Schedule Follow-up"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <CalendarPlus className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onSelectLead(lead)}
                              title="View Details"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const badge = getLeadStatusBadge(lead.status);
                return (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="p-4 space-y-3 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{lead.name}</h4>
                        <p className="text-xs text-slate-600">{lead.email}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="font-bold block text-slate-900 mb-0.5">{lead.service}</span>
                      <p className="line-clamp-2 text-slate-600 text-[11px]">
                        {lead.businessDescription || 'No project description provided.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                      <span>{formatTimestamp(lead.createdAt)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onScheduleFollowUp(lead);
                          }}
                          className="font-bold text-blue-600 hover:text-blue-800"
                        >
                          + Follow-up
                        </button>
                        <span>&bull;</span>
                        <span className="font-bold text-slate-700">Details &rarr;</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
