export type LeadStatus = 'NEW' | 'CONTACTED' | 'INTERESTED' | 'CONVERTED' | 'LOST';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  service: string;
  businessDescription: string;
  status: LeadStatus;
  internalNotes?: string;
  source?: string;
  createdAt: any;
  updatedAt?: any;
}

export type ProjectStatus =
  | 'DEMO'
  | 'DISCUSSION'
  | 'IN PROGRESS'
  | 'REVIEW'
  | 'COMPLETED'
  | 'ON HOLD';

export interface Project {
  id: string;
  clientName: string;
  projectName: string;
  serviceType: string;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  liveUrl?: string;
  internalNotes?: string;
  createdAt: any;
  updatedAt?: any;
}

export interface FollowUp {
  id: string;
  leadId?: string;
  leadName: string;
  leadEmail: string;
  service?: string;
  dueDate: string; // YYYY-MM-DD
  notes: string;
  completed: boolean;
  completedAt?: any;
  createdAt: any;
  updatedAt?: any;
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  isAuthorizedAdmin: boolean;
  role: 'owner' | 'admin' | 'unauthorized';
}

export type AdminTab = 'dashboard' | 'leads' | 'projects' | 'follow-ups' | 'settings';
