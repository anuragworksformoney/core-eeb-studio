import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { Lead, LeadStatus } from '../types';
import {
  X,
  Calendar,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Clock,
  Save,
  CheckCircle2,
  CalendarPlus,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { formatTimestamp, getLeadStatusBadge } from '../utils/formatters';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onScheduleFollowUp: (lead: Lead) => void;
}

const ALL_STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'INTERESTED', 'CONVERTED', 'LOST'];

export default function LeadDetailModal({
  lead,
  onClose,
  onScheduleFollowUp,
}: LeadDetailModalProps) {
  const { updateLeadStatus } = useAdmin();

  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead?.status || 'NEW');
  const [internalNotes, setInternalNotes] = useState(lead?.internalNotes || '');
  const [saving, setSaving] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!lead) return null;

  const badge = getLeadStatusBadge(currentStatus);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateLeadStatus(lead.id, currentStatus, internalNotes);
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyEmail = () => {
    if (lead.email && lead.email !== '—') {
      navigator.clipboard.writeText(lead.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="h-16 px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              <span>{badge.label}</span>
            </span>
            <span className="text-xs text-slate-600 font-mono">ID: {lead.id.slice(0, 8)}...</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Submitter Overview */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lead.name}
            </h2>
            {lead.businessName && (
              <p className="text-sm font-semibold text-slate-600 mt-0.5">{lead.businessName}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{lead.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {lead.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{lead.phone}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Submitted: {formatTimestamp(lead.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Requested Service */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Requested Service</span>
            </div>
            <div className="text-sm font-semibold text-slate-900">{lead.service}</div>
          </div>

          {/* Business Description / Project Scope */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Inquiry Details / Message</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {lead.businessDescription || 'No project description provided.'}
            </div>
          </div>

          {/* Status Selector & Quick Follow-Up */}
          <div className="pt-2 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Update Lead Status
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((status) => {
                const isSelected = currentStatus === status;
                const statusBadge = getLeadStatusBadge(status);
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCurrentStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? `${statusBadge.bg} ${statusBadge.text} border-current ring-2 ring-blue-500/20`
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Internal Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Internal Studio Notes
              </label>
              <span className="text-[11px] text-slate-600">Visible only to admins</span>
            </div>
            <textarea
              rows={3}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="e.g. Budget discussed ₹45k, client prefers WhatsApp demo on Friday afternoon..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-slate-900 bg-white"
            />
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onScheduleFollowUp(lead);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs tracking-wide transition-all cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-blue-600" />
            <span>Schedule Follow-up</span>
          </button>

          <div className="w-full sm:w-auto flex items-center justify-end gap-2.5">
            {savedFeedback && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes saved!</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Updates</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
