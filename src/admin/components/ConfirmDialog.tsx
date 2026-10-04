import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
  isDestructive = true,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDestructive ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-blue-50 text-blue-600'
            }`}
          >
            {isDestructive ? <AlertTriangle className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">{title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed mt-1">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-xs cursor-pointer ${
              isDestructive ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
