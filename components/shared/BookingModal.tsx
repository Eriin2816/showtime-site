'use client';
import { useState, useEffect } from 'react';
import { business } from '@/data/business';

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setOpen(true), 10_000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!mounted || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a pool service estimate"
    >
      <div className="relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] w-full max-w-[520px] flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-pool-deep px-6 pt-6 pb-5 relative shrink-0 rounded-t-2xl">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-pool-azure/20 flex items-center justify-center">
              <span className="text-xl">🏊</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pool-azure">Los Angeles Pool Experts</p>
              <p className="text-white font-display font-800 text-xl leading-tight">Get a Free Estimate</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Tell us about your pool. We&apos;ll follow up with a clear, no-pressure quote.
          </p>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Benefits */}
          <ul className="space-y-3 mb-6">
            {[
              'Free, no-obligation estimate',
              'Response within 1 business day',
              'Upfront pricing before any work begins',
              'Serving 50+ Los Angeles communities',
            ].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                <svg className="w-4 h-4 text-pool-azure shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Primary CTA */}
          <a
            href={business.popupForm.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-pool-azure hover:bg-pool-azure-hover text-white font-bold text-base rounded-xl transition-colors duration-200 shadow-azure mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Fill Out the Estimate Form
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-pool-stone" />
            <span className="text-xs text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-pool-stone" />
          </div>

          {/* Phone CTA */}
          <a
            href={business.phoneHref}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 border-2 border-pool-deep text-pool-deep hover:bg-pool-deep hover:text-white font-bold text-sm rounded-xl transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {business.phone}
          </a>
        </div>

        {/* Trust strip */}
        <div className="bg-pool-stone px-6 py-3 flex items-center justify-center gap-4 text-xs text-slate-500 shrink-0 rounded-b-2xl">
          {['No spam', 'No pressure', 'Fast response'].map(label => (
            <span key={label} className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-pool-azure" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
