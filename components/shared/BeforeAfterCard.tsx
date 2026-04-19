'use client';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterCardProps {
  before: string;
  after: string;
  title: string;
  location: string;
  service: string;
}

export function BeforeAfterCard({ before, after, title, location, service }: BeforeAfterCardProps) {
  const [position, setPosition] = useState(75);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setPosition(pct);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setInteracted(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-pool-stone shadow-card card-lift">

      {/* Slider area */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] overflow-hidden bg-pool-stone select-none"
        style={{ cursor: dragging ? 'ew-resize' : 'col-resize', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* AFTER image — full width, sits behind */}
        <Image
          src={after}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover"
        />

        {/* BEFORE image — clipped to left of divider */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Drag handle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-deep transition-transform duration-150 ${dragging ? 'scale-110' : 'group-hover:scale-105'}`}
          >
            <svg className="w-5 h-5 text-pool-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* BEFORE label */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="bg-black/65 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Before
          </span>
        </div>

        {/* AFTER label */}
        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <span className="bg-pool-azure text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-azure/40 shadow-sm">
            After
          </span>
        </div>

        {/* Drag hint — hides once user interacts */}
        {!interacted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10">
            <span className="bg-black/55 backdrop-blur-sm text-white/90 text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
              </svg>
              Drag to compare
            </span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display font-700 text-pool-deep text-sm leading-tight truncate">{title}</p>
          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {location}
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-pool-azure bg-pool-azure/10 border border-pool-azure/20 px-2.5 py-1 rounded-full">
          {service}
        </span>
      </div>
    </div>
  );
}
