'use client';
import { useState } from 'react';

interface FAQ { q: string; a: string }

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-pool-stone">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4 group focus-ring"
            aria-expanded={openIndex === i}
          >
            <span className="font-display font-700 text-base md:text-lg text-pool-deep group-hover:text-pool-azure transition-colors">
              {faq.q}
            </span>
            <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-pool-stone transition-[transform,border-color,background] duration-200 ${
              openIndex === i
                ? 'bg-pool-azure border-pool-azure rotate-180'
                : 'bg-transparent group-hover:border-pool-azure'
            }`}>
              <svg
                className={`w-4 h-4 transition-colors ${openIndex === i ? 'text-white' : 'text-pool-deep group-hover:text-pool-azure'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="pb-5 text-slate-600 text-sm md:text-base leading-relaxed animate-fade-in">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
