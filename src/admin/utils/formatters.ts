export function formatTimestamp(timestamp: any): string {
  if (!timestamp) return '—';

  try {
    let date: Date;
    if (typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      return '—';
    }

    if (isNaN(date.getTime())) return '—';

    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return '—';
  }
}

export function formatDateShort(timestamp: any): string {
  if (!timestamp) return '—';

  try {
    let date: Date;
    if (typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      return '—';
    }

    if (isNaN(date.getTime())) return '—';

    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return '—';
  }
}

export function getLeadStatusBadge(status: string): { label: string; bg: string; text: string; dot: string } {
  switch (status?.toUpperCase()) {
    case 'NEW':
      return { label: 'NEW', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' };
    case 'CONTACTED':
      return { label: 'CONTACTED', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
    case 'INTERESTED':
      return { label: 'INTERESTED', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' };
    case 'CONVERTED':
      return { label: 'CONVERTED', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
    case 'LOST':
      return { label: 'LOST', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };
    default:
      return { label: status || 'NEW', bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400' };
  }
}

export function getProjectStatusBadge(status: string): { label: string; bg: string; text: string; border: string } {
  switch (status?.toUpperCase()) {
    case 'DEMO':
      return { label: 'DEMO', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' };
    case 'DISCUSSION':
      return { label: 'DISCUSSION', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'IN PROGRESS':
      return { label: 'IN PROGRESS', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'REVIEW':
      return { label: 'REVIEW', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
    case 'COMPLETED':
      return { label: 'COMPLETED', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'ON HOLD':
      return { label: 'ON HOLD', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
    default:
      return { label: status || 'IN PROGRESS', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
  }
}
