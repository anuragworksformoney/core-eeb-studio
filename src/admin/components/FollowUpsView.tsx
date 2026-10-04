import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { FollowUp } from '../types';
import {
  CalendarClock,
  Plus,
  CheckCircle2,
  Circle,
  AlertCircle,
  Trash2,
  Calendar,
  X,
  Loader2,
  Save,
} from 'lucide-react';
import { formatDateShort } from '../utils/formatters';

interface FollowUpsViewProps {
  initialLead?: any;
  onClearInitialLead?: () => void;
}

export default function FollowUpsView({ initialLead, onClearInitialLead }: FollowUpsViewProps) {
  const { followUps, loadingFollowUps, saveFollowUp, toggleFollowUpComplete, deleteFollowUp } =
    useAdmin();

  const [modalOpen, setModalOpen] = useState(Boolean(initialLead));
  const [leadName, setLeadName] = useState(initialLead?.name || '');
  const [leadEmail, setLeadEmail] = useState(initialLead?.email || '');
  const [service, setService] = useState(initialLead?.service || '');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const pending = followUps.filter((f) => !f.completed);
  const overdue = pending.filter((f) => f.dueDate && f.dueDate < todayStr);
  const upcoming = pending.filter((f) => !f.dueDate || f.dueDate >= todayStr);
  const completed = followUps.filter((f) => f.completed);

  const handleOpenModal = () => {
    setLeadName('');
    setLeadEmail('');
    setService('');
    setDueDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !dueDate || !notes.trim()) return;

    setSaving(true);
    try {
      await saveFollowUp({
        leadName: leadName.trim(),
        leadEmail: leadEmail.trim(),
        service: service.trim(),
        dueDate,
        notes: notes.trim(),
        leadId: initialLead?.id || '',
      });
      setModalOpen(false);
      if (onClearInitialLead) onClearInitialLead();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Follow-up Management
            </h2>
            <p className="text-xs text-slate-700 mt-0.5">
              Scheduled client touchpoints, proposal check-ins, and reminders
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Follow-up</span>
          </button>
        </div>

        {/* Portal-Only Notification Notice */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
          <CalendarClock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Follow-up logs and overdue alerts are displayed live within this management portal.</span>
        </div>
      </div>

      {/* Grid: Overdue & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Overdue Follow-ups */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Overdue Reminders ({overdue.length})
              </h3>
            </div>
          </div>

          {loadingFollowUps ? (
            <div className="py-8 text-center text-xs text-slate-600">Loading reminders...</div>
          ) : overdue.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-600">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
              <span>No overdue follow-ups! Great job staying on track.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {overdue.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 flex items-start justify-between gap-3 text-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFollowUpComplete(item.id, true)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                    title="Mark Complete"
                  >
                    <Circle className="w-4 h-4" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 truncate">{item.leadName}</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full shrink-0">
                        Due: {item.dueDate}
                      </span>
                    </div>
                    {item.leadEmail && (
                      <p className="text-[11px] text-slate-600 mb-1">{item.leadEmail}</p>
                    )}
                    <p className="text-xs text-slate-800 bg-white/80 p-2 rounded border border-rose-100">
                      {item.notes}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteFollowUp(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer shrink-0"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Upcoming / Due Today */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Upcoming & Today ({upcoming.length})
              </h3>
            </div>
          </div>

          {loadingFollowUps ? (
            <div className="py-8 text-center text-xs text-slate-600">Loading reminders...</div>
          ) : upcoming.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-600">
              <CalendarClock className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
              <span>No upcoming follow-ups scheduled.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((item) => {
                const isToday = item.dueDate === todayStr;
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs transition-colors ${
                      isToday
                        ? 'border-blue-200 bg-blue-50/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFollowUpComplete(item.id, true)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                      title="Mark Complete"
                    >
                      <Circle className="w-4 h-4" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <span className="font-bold text-slate-900 truncate">{item.leadName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            isToday ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isToday ? 'Due Today' : `Due: ${item.dueDate}`}
                        </span>
                      </div>
                      {item.leadEmail && (
                        <p className="text-[11px] text-slate-600 mb-1">{item.leadEmail}</p>
                      )}
                      <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded border border-slate-100">
                        {item.notes}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteFollowUp(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer shrink-0"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Completed History */}
      {completed.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
            Completed Reminders ({completed.length})
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {completed.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-slate-600">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleFollowUpComplete(item.id, false)}
                    className="text-emerald-600 hover:text-slate-400 cursor-pointer"
                    title="Mark as not completed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-slate-700 line-through truncate">
                    {item.leadName}
                  </span>
                  <span className="text-slate-600 truncate">&bull; {item.notes}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-600">{item.dueDate}</span>
                  <button
                    type="button"
                    onClick={() => deleteFollowUp(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Follow-up Schedule Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Schedule Lead Follow-up</h3>
                  <p className="text-[11px] text-slate-600">Set reminder date and action plan</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Client / Lead Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Follow-up Notes / Action Item *
                </label>
                <textarea
                  required
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Call to discuss WhatsApp bot proposal and quote ₹35,000..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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
                      <span>Save Follow-up</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
