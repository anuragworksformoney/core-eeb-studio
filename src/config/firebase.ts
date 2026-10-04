import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// User-provided actual Firebase configuration from Firebase Console
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAfjBPyp4Aftp0UoLOf8q8Dj6BIHGPDatE',
  authDomain: 'core-web-studio.firebaseapp.com',
  projectId: 'core-web-studio',
  storageBucket: 'core-web-studio.firebasestorage.app',
  messagingSenderId: '888226155627',
  appId: '1:888226155627:web:48d48f14ebf2a70c9cf52e',
  measurementId: 'G-15KHYSBXBX',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.includes('PASTE_YOUR') &&
    firebaseConfig.apiKey.length > 10
);

// Safe initialization to avoid duplicate app initialization
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
