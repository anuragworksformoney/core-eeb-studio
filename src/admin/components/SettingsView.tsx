import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import {
  ShieldCheck,
  Building,
  User,
  LogOut,
  Sliders,
  Copy,
  Check,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { STUDIO_PHONE_RAW, STUDIO_EMAIL } from '../../config/contact';

export default function SettingsView() {
  const { adminUser, logout, showToast } = useAdmin();
  const [copiedUid, setCopiedUid] = useState(false);

  // Simple local preferences
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [defaultSort, setDefaultSort] = useState('newest');

  const handleCopyUid = () => {
    if (adminUser?.uid) {
      navigator.clipboard.writeText(adminUser.uid);
      setCopiedUid(true);
      showToast('Admin UID copied to clipboard', 'info');
      setTimeout(() => setCopiedUid(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Portal Settings & Administration
        </h2>
        <p className="text-xs text-slate-700 mt-0.5">
          Agency profile, administrator identity, and dashboard preferences
        </p>
      </div>

      {/* Agency Information Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Agency Information
            </h3>
            <p className="text-[11px] text-slate-600">Core operational branding</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Agency Name
            </span>
            <span className="font-black text-sm text-slate-900">CORE WEB STUDIO</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Official Email
            </span>
            <span className="font-semibold text-slate-900">{STUDIO_EMAIL}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              WhatsApp Support
            </span>
            <span className="font-semibold text-slate-900">{STUDIO_PHONE_RAW}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Website URL
            </span>
            <span className="font-semibold text-blue-600">https://corewebstudio.in</span>
          </div>
        </div>
      </div>

      {/* Admin Account Information Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Administrator Profile
            </h3>
            <p className="text-[11px] text-slate-600">Active authenticated session</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-100 gap-2">
            <div>
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">
                Admin Email
              </span>
              <span className="font-bold text-sm text-slate-900">
                {adminUser?.email || '—'}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="capitalize">{adminUser?.role || 'Admin'} Authorized</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Firebase User UID
              </span>
              <button
                type="button"
                onClick={handleCopyUid}
                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                {copiedUid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUid ? 'Copied' : 'Copy UID'}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 bg-white p-2 rounded border border-slate-200 select-all break-all">
              {adminUser?.uid || '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Access Control & Security Notice */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Authorization & Security Controls
            </h3>
            <p className="text-[11px] text-slate-600">Access policy and permissions</p>
          </div>
        </div>

        <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
          <p>
            • <strong>Zero Public Access:</strong> Lead records, internal notes, and client projects are strictly shielded by Firestore Security Rules. Public visitors can only submit inquiries.
          </p>
          <p>
            • <strong>Admin Verification:</strong> Users are authorized either via bootstrapped owner accounts (<code className="bg-slate-100 px-1 rounded text-slate-900 font-mono text-[11px]">anurag.tiwari@universal.edu.in</code>) or by registering their UID into the Firestore <code className="bg-slate-100 px-1 rounded text-slate-900 font-mono text-[11px]">admins</code> collection.
          </p>
          <p>
            • <strong>No Hardcoded Secrets:</strong> No database keys or administrative passwords exist in client code.
          </p>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-2 flex items-center justify-between">
        <p className="text-xs text-slate-600">Finished your session?</p>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Admin Portal</span>
        </button>
      </div>
    </div>
  );
}
