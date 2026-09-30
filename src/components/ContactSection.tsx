import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, RefreshCw, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { getWhatsAppUrl } from '../config/contact';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface ContactSectionProps {
  inquiryProject?: string;
  inquiryService?: string;
}

export default function ContactSection({ inquiryProject, inquiryService }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Design & Development']);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (inquiryProject) {
      setDetails((prev) =>
        prev.includes(inquiryProject)
          ? prev
          : `Hello, I'm interested in building a website inspired by ${inquiryProject}. ` + prev
      );
    }
  }, [inquiryProject]);

  useEffect(() => {
    if (inquiryService) {
      if (!selectedServices.includes(inquiryService)) {
        setSelectedServices((prev) => [...prev, inquiryService]);
      }
    }
  }, [inquiryService]);

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, 'contact_submissions'), {
        name: name.trim(),
        email: email.trim(),
        service: selectedServices.length > 0 ? selectedServices.join(', ') : 'Website Design & Development',
        businessDescription: details.trim(),
        createdAt: serverTimestamp(),
        status: 'NEW',
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Error saving submission to Firestore:', err);
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

  const handleReset = () => {
    setName('');
    setEmail('');
    setSelectedServices(['Website Design & Development']);
    setDetails('');
    setSubmitted(false);
    setSubmitError(null);
  };

  const servicesList = [
    'Website Design & Development',
    'WhatsApp Automation',
    'SEO & Google Visibility',
    'Lead Generation',
    'Business Automation',
  ];

  return (
    <section id="contact" className="w-full py-8 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] p-5 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left Column: Copy */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="inline-block text-xs sm:text-sm font-black text-[#0047FF] uppercase tracking-[0.25em] mb-2">
                  CONTACT
                </span>
                <h2 className="font-black uppercase text-2xl sm:text-5xl lg:text-6xl text-[#111111] leading-[0.98] tracking-tight mb-3 sm:mb-4">
                  HAVE A PROJECT IN MIND?
                </h2>
                <p className="text-sm sm:text-lg text-[#444444] font-semibold leading-relaxed mb-6 sm:mb-8">
                  Tell us what you do. We'll figure out the rest.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-5 sm:pt-6 border-t-2 border-[#111111]/10">
                <div className="flex items-center gap-2.5 sm:gap-3 text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF] shrink-0" />
                  <span className="text-xs sm:text-base font-bold uppercase tracking-tight">
                    BUILT FOR REAL BUSINESSES
                  </span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF] shrink-0" />
                  <span className="text-xs sm:text-base font-bold">
                    Clear communication and honest timelines
                  </span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF] shrink-0" />
                  <span className="text-xs sm:text-base font-bold">
                    Practical digital solutions that fit your business
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Option */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t-2 border-[#111111]/10">
                <p className="text-[10px] sm:text-[11px] uppercase font-black tracking-wider text-[#666666] mb-1.5 sm:mb-2">
                  PREFER A DIRECT CONVERSATION?
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="LET'S TALK"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#111111] hover:text-[#0047FF] transition-colors group cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span className="underline underline-offset-4 decoration-2 decoration-[#0047FF]">Chat directly on WhatsApp →</span>
                </a>
              </div>
            </div>

            {/* Right Column: Intake Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="min-h-[400px] sm:min-h-[460px] h-full flex flex-col items-center justify-center text-center p-6 sm:p-12 rounded-2xl bg-[#FAF7EE] border-2 border-[#111111] shadow-[4px_4px_0px_#111111]"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-[2px_2px_0px_#111111] mb-5 select-none"
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-black text-xl sm:text-2xl md:text-3xl uppercase text-[#111111] tracking-tight mb-2.5">
                    MESSAGE SENT SUCCESSFULLY.
                  </h3>
                  <p className="text-sm sm:text-base text-[#444444] font-semibold max-w-sm mb-6 leading-relaxed">
                    Thanks for reaching out. We’ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-black px-6 py-3 rounded-full bg-[#111111] text-white border-2 border-[#111111] shadow-[2px_2px_0px_#0047FF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>SEND ANOTHER NOTE</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] sm:text-xs uppercase tracking-wider text-[#111111] font-black">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Priya Parmar"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF7EE] text-[#111111] text-sm font-semibold placeholder:text-[#888888] border-2 border-[#111111] focus:outline-none focus:bg-white focus:border-[#0047FF] focus:shadow-[2.5px_2.5px_0px_#0047FF] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] sm:text-xs uppercase tracking-wider text-[#111111] font-black">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@company.com"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF7EE] text-[#111111] text-sm font-semibold placeholder:text-[#888888] border-2 border-[#111111] focus:outline-none focus:bg-white focus:border-[#0047FF] focus:shadow-[2.5px_2.5px_0px_#0047FF] transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] sm:text-xs uppercase tracking-wider text-[#111111] font-black">
                      WHAT DO YOU NEED?
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {servicesList.map((svc) => {
                        const isChecked = selectedServices.includes(svc);
                        return (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => toggleService(svc)}
                            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-black transition-all cursor-pointer border-2 border-[#111111] max-w-full text-left break-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047FF] focus-visible:ring-offset-1 ${
                              isChecked
                                ? 'bg-[#0047FF] text-white shadow-[2px_2px_0px_#111111]'
                                : 'bg-[#FAF7EE] text-[#111111] hover:bg-white hover:border-[#0047FF]'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isChecked ? 'bg-white' : 'bg-[#111111]'
                              }`}
                            />
                            <span>{svc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Details Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] sm:text-xs uppercase tracking-wider text-[#111111] font-black">
                      ABOUT YOUR BUSINESS
                    </label>
                    <textarea
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell us about your business, what you need, and how we can help..."
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF7EE] text-[#111111] text-sm font-semibold placeholder:text-[#888888] border-2 border-[#111111] focus:outline-none focus:bg-white focus:border-[#0047FF] focus:shadow-[2.5px_2.5px_0px_#0047FF] transition-all resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {submitError && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7EE] border-2 border-red-500 text-red-600 text-xs font-bold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    data-cursor-text="LET'S TALK"
                    className={`w-full inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm uppercase tracking-wider font-black h-12 sm:h-13 px-6 sm:px-8 rounded-full bg-[#111111] text-white border-2 border-[#111111] shadow-[3px_3px_0px_#0047FF] sm:shadow-[4px_4px_0px_#0047FF] transition-all select-none ${
                      isSubmitting
                        ? 'opacity-90 cursor-not-allowed'
                        : 'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span>SENDING...</span>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0047FF] shrink-0" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <span>SEND INQUIRY</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
