import React from 'react';
import { useAdmin } from '../AdminContext';
import { ShieldAlert, LogOut, ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface AccessDeniedProps {
  onNavigatePublic: (path?: string) => void;
}

export default function AccessDenied({ onNavigatePublic }: AccessDeniedProps) {
  const { user, logout } = useAdmin();
  const [copied, setCopied] = useState(false);

  const handleCopyUid = () => {
    if (user?.uid) {
      navigator.clipboard.writeText(user.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-slate-900">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
          Administrator Authorization Required
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          You are signed in as <strong className="text-slate-900">{user?.email || 'Authenticated User'}</strong>, but this account is not registered as an authorized administrator for CORE WEB STUDIO.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left mb-6 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Account UID:</span>
            <button
              type="button"
              onClick={handleCopyUid}
              className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy UID'}</span>
            </button>
          </div>
          <div className="font-mono text-slate-700 bg-white p-2 rounded border border-slate-200 break-all select-all">
            {user?.uid || '—'}
          </div>
          <p className="text-[11px] text-slate-600 pt-1">
            To authorize this user, add a document with this UID in Firestore under the <code className="bg-slate-200 px-1 rounded text-slate-800">admins</code> collection with field <code className="bg-slate-200 px-1 rounded text-slate-800">role: "admin"</code>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={logout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch Account / Sign Out</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigatePublic('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </button>
        </div>
      </div>
    </div>
  );
}
