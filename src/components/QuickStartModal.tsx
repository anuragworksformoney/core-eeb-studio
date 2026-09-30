import { useState, useEffect } from 'react';
import { X, ArrowRight, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillProject?: string;
}

export default function QuickStartModal({ isOpen, onClose, prefillProject }: QuickStartModalProps) {
  const projectTypes = [
    'Website Design & Development',
    'WhatsApp Automation',
    'SEO & Google Visibility',
    'Lead Generation',
    'Business Automation',
  ];

  const [projectType, setProjectType] = useState<string>('Website Design & Development');
  const [timeline, setTimeline] = useState<string>('2-4 Weeks');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>(prefillProject ? `Interested in: ${prefillProject}` : '');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (prefillProject) {
      const match = projectTypes.find((t) => t.toLowerCase() === prefillProject.toLowerCase());
      if (match) {
        setProjectType(match);
      } else {
        setNotes(`Interested in: ${prefillProject}`);
      }
    }
  }, [prefillProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const businessDescription = notes.trim()
      ? (timeline ? `${notes.trim()}\n\nDesired Timeline: ${timeline}` : notes.trim())
      : (timeline ? `Desired Timeline: ${timeline}` : '');

    try {
      await addDoc(collection(db, 'contact_submissions'), {
        name: name.trim(),
        email: email.trim(),
        service: projectType || 'Website Design & Development',
        businessDescription,
        createdAt: serverTimestamp(),
        status: 'NEW',
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Error saving inquiry to Firestore:', err);
      setIsSubmitting(false);
      const isPermissionDenied =
        err instanceof Error &&
        (err.message.toLowerCase().includes('permission') || err.message.toLowerCase().includes('insufficient'));
      setSubmitError(
        isPermissionDenied
          ? 'Submission blocked by Firestore rules: update rules in Firebase Console to allow write to contact_submissions.'
          : 'Unable to send your inquiry right now. Please try again.'
      );
    }
  };

  const timelines = ['< 2 Weeks', '2-4 Weeks', '1-2 Months', 'Flexible'];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-[#111111]/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FAF7EE] rounded-2xl sm:rounded-3xl border-2 border-[#111111] shadow-[5px_5px_0px_#0047FF] sm:shadow-[8px_8px_0px_#0047FF] p-5 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#111111]/15 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0047FF]" />
            <span className="text-xs uppercase font-black tracking-widest text-[#0047FF]">
              CORE WEB STUDIO INTAKE
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-[#111111] bg-white flex items-center justify-center text-[#111111] hover:bg-[#0047FF] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#111111]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#111111] mb-5">
              ✓
            </div>
            <h3 className="text-2xl uppercase tracking-tight text-[#111111] font-black mb-2">
              PROJECT INQUIRY RECEIVED
            </h3>
            <p className="text-sm text-[#444444] font-semibold max-w-sm mb-6">
              Thank you, <strong className="text-[#111111]">{name}</strong>. We'll review your project and get back to <strong className="text-[#111111]">{email}</strong> within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setNotes('');
                setSubmitError(null);
                onClose();
              }}
              className="px-6 py-3 rounded-full bg-[#111111] text-white text-xs uppercase tracking-wider font-black border-2 border-[#111111] shadow-[2px_2px_0px_#0047FF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-2xl uppercase tracking-tight text-[#111111] font-black">
                START A PROJECT
              </h2>
              <p className="text-xs font-semibold text-[#555555]">
                Tell us what you do. We'll figure out the rest.
              </p>
            </div>

            {/* Project Type */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#111111] font-black block mb-2">
                PROJECT TYPE
              </label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-black transition-all cursor-pointer border-2 border-[#111111] ${
                      projectType === type
                        ? 'bg-[#0047FF] text-white shadow-[2px_2px_0px_#111111]'
                        : 'bg-white text-[#111111] hover:bg-[#FAF7EE]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#111111] font-black block mb-2">
                DESIRED TIMELINE
              </label>
              <div className="flex flex-wrap gap-2">
                {timelines.map((tl) => (
                  <button
                    key={tl}
                    type="button"
                    onClick={() => setTimeline(tl)}
                    className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-black transition-all cursor-pointer border-2 border-[#111111] ${
                      timeline === tl
                        ? 'bg-[#0047FF] text-white shadow-[2px_2px_0px_#111111]'
                        : 'bg-white text-[#111111] hover:bg-[#FAF7EE]'
                    }`}
                  >
                    {tl}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] font-black block mb-1">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#111111] text-sm font-semibold border-2 border-[#111111] focus:outline-none focus:border-[#0047FF]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] font-black block mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#111111] text-sm font-semibold border-2 border-[#111111] focus:outline-none focus:border-[#0047FF]"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#111111] font-black block mb-1">
                PROJECT DETAILS
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What does your business do, and what are you looking for?"
                className="w-full px-3.5 py-2 rounded-xl bg-white text-[#111111] text-sm font-semibold border-2 border-[#111111] focus:outline-none focus:border-[#0047FF] resize-none"
              />
            </div>

            {/* Error Notification */}
            {submitError && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border-2 border-red-500 text-red-600 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`w-full inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-black h-12 px-6 rounded-full bg-[#111111] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#0047FF] transition-all select-none ${
                isSubmitting
                  ? 'opacity-90 cursor-not-allowed'
                  : 'hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span>SENDING...</span>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0047FF] shrink-0" aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>SUBMIT INQUIRY</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </>
              )}
            </button>

            {/* Direct WhatsApp Alternative */}
            <div className="pt-2 text-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#444444] hover:text-[#0047FF] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Or chat directly on WhatsApp →</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
