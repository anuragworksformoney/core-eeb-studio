import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  addDoc,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Lead, Project, FollowUp, AdminUser, AdminTab, LeadStatus } from './types';
import { handleFirestoreError, OperationType } from './utils/firestoreError';

// Authorized emails that automatically qualify as administrative users
const BOOTSTRAPPED_ADMIN_EMAILS = [
  'anurag.tiwari@universal.edu.in',
  'connect@corewebstudio.in',
  'hello@corewebstudio.in',
];

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AdminContextType {
  user: User | null;
  adminUser: AdminUser | null;
  loadingAuth: boolean;
  isAuthorizedAdmin: boolean;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  leads: Lead[];
  projects: Project[];
  followUps: FollowUp[];
  loadingLeads: boolean;
  loadingProjects: boolean;
  loadingFollowUps: boolean;
  leadsError: string | null;
  projectsError: string | null;
  followUpsError: string | null;
  updateLeadStatus: (leadId: string, status: LeadStatus, internalNotes?: string) => Promise<void>;
  saveProject: (projectData: Partial<Project>, projectId?: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  saveFollowUp: (followUpData: Partial<FollowUp>, followUpId?: string) => Promise<void>;
  toggleFollowUpComplete: (followUpId: string, completed: boolean) => Promise<void>;
  deleteFollowUp: (followUpId: string) => Promise<void>;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);

  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingFollowUps, setLoadingFollowUps] = useState(false);

  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [followUpsError, setFollowUpsError] = useState<string | null>(null);

  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4500);
  }, []);

  // 1. Listen to Auth State and Verify Admin Privileges
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setAdminUser(null);
        setIsAuthorizedAdmin(false);
        setLeads([]);
        setProjects([]);
        setFollowUps([]);
        setLoadingAuth(false);
        return;
      }

      try {
        let authorized = false;
        let role: 'owner' | 'admin' | 'unauthorized' = 'unauthorized';

        // Check A: Bootstrapped founder / owner emails
        const emailLower = (currentUser.email || '').toLowerCase().trim();
        if (BOOTSTRAPPED_ADMIN_EMAILS.some((adm) => adm.toLowerCase() === emailLower)) {
          authorized = true;
          role = 'owner';
        }

        // Check B: Custom Claims from Token
        if (!authorized) {
          try {
            const tokenResult = await currentUser.getIdTokenResult();
            if (tokenResult.claims.admin === true || tokenResult.claims.role === 'admin') {
              authorized = true;
              role = 'admin';
            }
          } catch {
            // Ignore token lookup failure
          }
        }

        // Check C: Firestore /admins/{uid} collection
        if (!authorized) {
          try {
            const adminDocRef = doc(db, 'admins', currentUser.uid);
            const adminDoc = await getDoc(adminDocRef);
            if (adminDoc.exists()) {
              authorized = true;
              const data = adminDoc.data();
              role = (data.role as 'owner' | 'admin') || 'admin';
            }
          } catch {
            // Document check blocked or does not exist
          }
        }

        setIsAuthorizedAdmin(authorized);
        setAdminUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          isAuthorizedAdmin: authorized,
          role,
        });
      } catch (err) {
        console.error('Failed to verify admin status:', err);
        setIsAuthorizedAdmin(false);
      } finally {
        setLoadingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Fetch Live Leads (contact_submissions)
  useEffect(() => {
    if (!user || !isAuthorizedAdmin) {
      setLeads([]);
      return;
    }

    setLoadingLeads(true);
    setLeadsError(null);

    const path = 'contact_submissions';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loadedLeads: Lead[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || 'Anonymous',
            email: data.email || '—',
            phone: data.phone || '',
            businessName: data.businessName || '',
            service: data.service || 'General Inquiry',
            businessDescription: data.businessDescription || '',
            status: (data.status as LeadStatus) || 'NEW',
            internalNotes: data.internalNotes || '',
            source: data.source || 'Website',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
        });
        setLeads(loadedLeads);
        setLoadingLeads(false);
      },
      (error) => {
        console.error('Error listening to leads:', error);
        setLeadsError('Unable to load leads: check Firestore rules or permission.');
        setLoadingLeads(false);
        try {
          handleFirestoreError(error, OperationType.LIST, path);
        } catch {
          // Logged in firestore error
        }
      }
    );

    return () => unsubscribe();
  }, [user, isAuthorizedAdmin]);

  // 3. Fetch Live Projects
  useEffect(() => {
    if (!user || !isAuthorizedAdmin) {
      setProjects([]);
      return;
    }

    setLoadingProjects(true);
    setProjectsError(null);

    const path = 'projects';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loadedProjects: Project[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            clientName: data.clientName || 'Untitled Client',
            projectName: data.projectName || 'Untitled Project',
            serviceType: data.serviceType || 'Web Development',
            status: data.status || 'IN PROGRESS',
            startDate: data.startDate || '',
            deadline: data.deadline || '',
            liveUrl: data.liveUrl || '',
            internalNotes: data.internalNotes || '',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
        });
        setProjects(loadedProjects);
        setLoadingProjects(false);
      },
      (error) => {
        console.error('Error listening to projects:', error);
        setProjectsError('Unable to load projects: check Firestore rules.');
        setLoadingProjects(false);
        try {
          handleFirestoreError(error, OperationType.LIST, path);
        } catch {
          // Logged in firestore error
        }
      }
    );

    return () => unsubscribe();
  }, [user, isAuthorizedAdmin]);

  // 4. Fetch Live Follow-Ups
  useEffect(() => {
    if (!user || !isAuthorizedAdmin) {
      setFollowUps([]);
      return;
    }

    setLoadingFollowUps(true);
    setFollowUpsError(null);

    const path = 'follow_ups';
    const q = query(collection(db, path), orderBy('dueDate', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded: FollowUp[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            leadId: data.leadId || '',
            leadName: data.leadName || 'Contact',
            leadEmail: data.leadEmail || '',
            service: data.service || '',
            dueDate: data.dueDate || '',
            notes: data.notes || '',
            completed: Boolean(data.completed),
            completedAt: data.completedAt,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
        });
        setFollowUps(loaded);
        setLoadingFollowUps(false);
      },
      (error) => {
        console.error('Error listening to follow ups:', error);
        setFollowUpsError('Unable to load follow-ups.');
        setLoadingFollowUps(false);
        try {
          handleFirestoreError(error, OperationType.LIST, path);
        } catch {
          // Logged in firestore error
        }
      }
    );

    return () => unsubscribe();
  }, [user, isAuthorizedAdmin]);

  // Lead Actions
  const updateLeadStatus = async (leadId: string, status: LeadStatus, internalNotes?: string) => {
    const path = `contact_submissions/${leadId}`;
    try {
      const docRef = doc(db, 'contact_submissions', leadId);
      const updatePayload: Record<string, any> = {
        status,
        updatedAt: serverTimestamp(),
      };
      if (internalNotes !== undefined) {
        updatePayload.internalNotes = internalNotes.trim();
      }
      await updateDoc(docRef, updatePayload);
      showToast(`Lead status updated to ${status}`, 'success');
    } catch (error) {
      showToast('Failed to update lead status. Check permissions.', 'error');
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  // Project Actions
  const saveProject = async (projectData: Partial<Project>, projectId?: string) => {
    const path = projectId ? `projects/${projectId}` : 'projects';
    try {
      if (projectId) {
        const docRef = doc(db, 'projects', projectId);
        await updateDoc(docRef, {
          clientName: projectData.clientName?.trim(),
          projectName: projectData.projectName?.trim(),
          serviceType: projectData.serviceType?.trim(),
          status: projectData.status,
          startDate: projectData.startDate || '',
          deadline: projectData.deadline || '',
          liveUrl: projectData.liveUrl?.trim() || '',
          internalNotes: projectData.internalNotes?.trim() || '',
          updatedAt: serverTimestamp(),
        });
        showToast('Project updated successfully', 'success');
      } else {
        await addDoc(collection(db, 'projects'), {
          clientName: projectData.clientName?.trim() || 'Client',
          projectName: projectData.projectName?.trim() || 'New Project',
          serviceType: projectData.serviceType?.trim() || 'Website Development',
          status: projectData.status || 'IN PROGRESS',
          startDate: projectData.startDate || '',
          deadline: projectData.deadline || '',
          liveUrl: projectData.liveUrl?.trim() || '',
          internalNotes: projectData.internalNotes?.trim() || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast('New project created', 'success');
      }
    } catch (error) {
      showToast('Error saving project.', 'error');
      handleFirestoreError(error, projectId ? OperationType.UPDATE : OperationType.CREATE, path);
    }
  };

  const deleteProject = async (projectId: string) => {
    const path = `projects/${projectId}`;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      showToast('Project deleted', 'info');
    } catch (error) {
      showToast('Failed to delete project.', 'error');
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  // Follow-Up Actions
  const saveFollowUp = async (followUpData: Partial<FollowUp>, followUpId?: string) => {
    const path = followUpId ? `follow_ups/${followUpId}` : 'follow_ups';
    try {
      if (followUpId) {
        await updateDoc(doc(db, 'follow_ups', followUpId), {
          leadName: followUpData.leadName?.trim(),
          leadEmail: followUpData.leadEmail?.trim() || '',
          service: followUpData.service || '',
          dueDate: followUpData.dueDate,
          notes: followUpData.notes?.trim() || '',
          updatedAt: serverTimestamp(),
        });
        showToast('Follow-up updated', 'success');
      } else {
        await addDoc(collection(db, 'follow_ups'), {
          leadId: followUpData.leadId || '',
          leadName: followUpData.leadName?.trim() || 'Lead',
          leadEmail: followUpData.leadEmail?.trim() || '',
          service: followUpData.service || '',
          dueDate: followUpData.dueDate || new Date().toISOString().split('T')[0],
          notes: followUpData.notes?.trim() || '',
          completed: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast('Follow-up reminder scheduled', 'success');
      }
    } catch (error) {
      showToast('Error saving follow-up.', 'error');
      handleFirestoreError(error, followUpId ? OperationType.UPDATE : OperationType.CREATE, path);
    }
  };

  const toggleFollowUpComplete = async (followUpId: string, completed: boolean) => {
    const path = `follow_ups/${followUpId}`;
    try {
      await updateDoc(doc(db, 'follow_ups', followUpId), {
        completed,
        completedAt: completed ? serverTimestamp() : null,
        updatedAt: serverTimestamp(),
      });
      showToast(completed ? 'Follow-up marked as completed' : 'Follow-up reopened', 'info');
    } catch (error) {
      showToast('Failed to update follow-up.', 'error');
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deleteFollowUp = async (followUpId: string) => {
    const path = `follow_ups/${followUpId}`;
    try {
      await deleteDoc(doc(db, 'follow_ups', followUpId));
      showToast('Follow-up removed', 'info');
    } catch (error) {
      showToast('Failed to delete follow-up.', 'error');
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast('Signed out of admin portal', 'info');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        adminUser,
        loadingAuth,
        isAuthorizedAdmin,
        activeTab,
        setActiveTab,
        leads,
        projects,
        followUps,
        loadingLeads,
        loadingProjects,
        loadingFollowUps,
        leadsError,
        projectsError,
        followUpsError,
        updateLeadStatus,
        saveProject,
        deleteProject,
        saveFollowUp,
        toggleFollowUpComplete,
        deleteFollowUp,
        toast,
        showToast,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
