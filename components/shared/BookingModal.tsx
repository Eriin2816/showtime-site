'use client';
import { useState, useEffect, useRef } from 'react';

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formHeight, setFormHeight] = useState(500);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Auto-resize iframe based on GHL postMessage resize events
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data) return;
      // GHL sends various resize message shapes — handle all known formats
      const h =
        e.data.height ??
        e.data.iframeHeight ??
        (typeof e.data.value === 'string' && e.data.type === 'iframeResize'
          ? parseInt(e.data.value)
          : undefined);
      if (typeof h === 'number' && h > 100) setFormHeight(h);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
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
      <div className="relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] w-full max-w-[560px] flex flex-col max-h-[90vh]">

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

        {/* Benefits */}
        <div className="px-6 pt-5 pb-4 shrink-0">
          <ul className="grid grid-cols-2 gap-2">
            {[
              'Free, no-obligation estimate',
              'Response within 1 business day',
              'Upfront pricing before any work begins',
              'Serving 50+ Los Angeles communities',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                <svg className="w-3.5 h-3.5 text-pool-azure shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* GHL Form — inline embed, height driven by postMessage */}
        <div className="overflow-y-auto flex-1 px-6 pb-2">
          <iframe
            ref={iframeRef}
            src="https://app.showtimepoolmechanics.com/widget/form/FLKa6w2LjIjQ7hYtjyCv"
            style={{ width: '100%', height: `${formHeight}px`, border: 'none', borderRadius: '6px' }}
            title="Get a Free Estimate"
            allow="payment"
          />
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
