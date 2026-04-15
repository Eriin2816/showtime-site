'use client';
import { useState } from 'react';
import type { Testimonial } from '@/data/testimonials';

const PAGE_SIZE = 3;

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-pool-gold" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE);
  const visible = testimonials.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div>
      {/* Cards — horizontal 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visible.map((t, i) => (
          <div key={`${page}-${i}`} className="bg-white border border-pool-stone rounded-2xl p-7 shadow-card flex flex-col">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, s) => <StarIcon key={s} />)}
            </div>
            <blockquote className="text-slate-700 text-base leading-relaxed flex-1 mb-5 italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 pt-4 border-t border-pool-stone">
              <div className="w-10 h-10 rounded-full bg-pool-deep text-white font-bold text-sm flex items-center justify-center shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-sm text-pool-deep">{t.name}</p>
                <p className="text-xs text-slate-500">{t.location} · {t.service}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-pool-stone flex items-center justify-center text-pool-deep hover:bg-pool-stone disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === page
                    ? 'w-6 h-2.5 bg-pool-azure'
                    : 'w-2.5 h-2.5 bg-pool-stone hover:bg-pool-silver'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border border-pool-stone flex items-center justify-center text-pool-deep hover:bg-pool-stone disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
