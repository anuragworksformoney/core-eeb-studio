import React, { useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../config/firebase';
import { Lock, ArrowLeft, AlertCircle, Loader2, KeyRound, ExternalLink } from 'lucide-react';

interface AdminLoginProps {
  onNavigatePublic: (path?: string) => void;
}

export default function AdminLogin({ onNavigatePublic }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    if (!isFirebaseConfigured) {
      setError(
        'Firebase Web API Key is missing. In Firebase Console (Project Settings > General > Your apps), copy your Web API Key and set VITE_FIREBASE_API_KEY in your environment.'
      );
      setLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      console.error('Google sign-in error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('api-key-not-valid') || msg.includes('invalid-api-key')) {
        setError(
          'Firebase API Key is invalid or expired. Check your Web API Key in Firebase Console > Project Settings > General > Your apps, and set VITE_FIREBASE_API_KEY.'
        );
      } else if (!msg.includes('closed-by-user') && !msg.includes('cancelled')) {
        setError('Sign in failed. Ensure popups are allowed and credentials are valid.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setError(null);

    if (!isFirebaseConfigured) {
      setError(
        'Firebase Web API Key is missing. In Firebase Console (Project Settings > General > Your apps), copy your Web API Key and set VITE_FIREBASE_API_KEY in your environment.'
      );
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: unknown) {
      console.error('Email sign in error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('api-key-not-valid') || msg.includes('invalid-api-key')) {
        setError(
          'Firebase API Key is invalid or expired. Check your Web API Key in Firebase Console > Project Settings > General > Your apps, and set VITE_FIREBASE_API_KEY.'
        );
      } else {
        setError('Invalid admin credentials. Please verify your email and password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Return to public site link */}
      <button
        type="button"
        onClick={() => onNavigatePublic('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-8 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to CORE WEB STUDIO</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-7 sm:p-9">
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md font-black text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-900 tracking-tight">
              CORE WEB STUDIO
            </h1>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Management Portal
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-slate-900 text-xl font-bold mb-1">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>Administrator Sign In</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Private management portal for lead intake, client projects, and pipeline follow-ups.
          </p>
        </div>

        {/* Clear Missing API Key Instructions if not configured */}
        {!isFirebaseConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Firebase Web API Key Required</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Your Firebase project <code className="bg-amber-100/90 px-1 py-0.5 rounded font-mono font-semibold text-amber-900">core-web-studio</code> is registered, but the Web API Key is needed to authenticate live sessions.
            </p>
            <div className="bg-white/95 p-3 rounded-lg border border-amber-200 text-[11px] text-slate-700 space-y-1.5">
              <p className="font-bold text-slate-900">Where to obtain your key:</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                <li>
                  Open <strong>Firebase Console &gt; Project Settings &gt; General</strong>.
                </li>
                <li>
                  Scroll to <strong>Your apps</strong> and select your Web App (<code className="font-mono text-[10px] text-slate-800">1:888226155627:web:...</code>).
                </li>
                <li>
                  Copy the <strong className="text-slate-900">apiKey</strong> string (starts with <code className="font-mono text-slate-900">AIza...</code>).
                </li>
                <li>
                  Set <code className="font-mono font-semibold text-slate-900">VITE_FIREBASE_API_KEY=&quot;YOUR_KEY&quot;</code> in your environment.
                </li>
              </ol>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Quick Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-xs hover:border-slate-400 disabled:opacity-60 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            or sign in with password
          </span>
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@corewebstudio.in"
              className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all bg-slate-50/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-7 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-600 font-medium">
            Authorized admin accounts only. Public registration is disabled.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-600">
        CORE WEB STUDIO &copy; {new Date().getFullYear()} &bull; Private System
      </div>
    </div>
  );
}

