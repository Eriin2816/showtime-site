'use client';
import { useState } from 'react';

export function YouTubeFacade({ videoId, title = 'Showtime Pools Video' }: { videoId: string; title?: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-pool-deep shadow-deep">
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          className="group absolute inset-0 w-full h-full focus-ring"
          aria-label={`Play: ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-[transform,background-color] duration-200 flex items-center justify-center shadow-deep">
              <svg className="w-6 h-6 text-pool-deep ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* YouTube badge */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </div>
        </button>
      )}
    </div>
  );
}
