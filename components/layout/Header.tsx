'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { business } from '@/data/business';
import { expertisePages, type ExpertisePage } from '@/data/expertise';

const mainServices  = expertisePages.filter(e => e.featured);
const extraServices = expertisePages.filter(e => !e.featured);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExpertiseOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,51,102,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 focus-ring rounded">
            <Image
              src="/logo.png"
              alt="Showtime Pools"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
              priority
            />
            <span
              className={`font-display font-800 text-lg hidden sm:block transition-colors duration-300 ${
                scrolled ? 'text-pool-deep' : 'text-white'
              }`}
            >
              Showtime Pools
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/" scrolled={scrolled}>Home</NavLink>
            <NavLink href="/service-areas" scrolled={scrolled}>Service Areas</NavLink>

            {/* Expertise Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setExpertiseOpen(v => !v)}
                onKeyDown={e => e.key === 'Escape' && setExpertiseOpen(false)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus-ring ${
                  scrolled
                    ? 'text-slate-700 hover:text-pool-deep hover:bg-pool-stone'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={expertiseOpen}
                aria-haspopup="true"
              >
                Expertise
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${expertiseOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expertiseOpen && (
                <div className="dropdown-menu absolute top-full mt-2 left-0 w-[480px] bg-white rounded-xl shadow-deep border border-pool-stone/60 overflow-hidden animate-slide-down">
                  <div className="grid grid-cols-2 divide-x divide-pool-stone">
                    <div>
                      <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-pool-silver">Core Services</p>
                      {mainServices.map(e => (
                        <Link
                          key={e.slug}
                          href={`/expertise/${e.slug}`}
                          onClick={() => setExpertiseOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-pool-stone hover:text-pool-deep transition-colors duration-150 font-medium"
                        >
                          <span className="text-base shrink-0">{e.icon}</span>
                          <span className="leading-tight">{e.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-pool-silver">Specialty Services</p>
                      {extraServices.map(e => (
                        <Link
                          key={e.slug}
                          href={`/expertise/${e.slug}`}
                          onClick={() => setExpertiseOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-pool-stone hover:text-pool-deep transition-colors duration-150 font-medium"
                        >
                          <span className="text-base shrink-0">{e.icon}</span>
                          <span className="leading-tight">{e.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href={business.existingSite.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus-ring ${
                scrolled
                  ? 'text-slate-700 hover:text-pool-deep hover:bg-pool-stone'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              View Website
            </a>

            {/* CTA */}
            <a
              href={business.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 bg-pool-azure text-white text-sm font-bold rounded-xl hover:bg-pool-azure-hover active:scale-[0.98] transition-[background,transform] duration-150 shadow-azure focus-ring"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now (323) 825-2099
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className={`lg:hidden p-2 rounded-lg transition-colors focus-ring ${
              scrolled ? 'text-pool-deep hover:bg-pool-stone' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-pool-stone shadow-card animate-slide-down">
          <nav className="container-site py-4 flex flex-col gap-1">
            <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/service-areas" onClick={() => setMobileOpen(false)}>Service Areas</MobileNavLink>

            {/* Mobile Expertise */}
            <div className="pt-1">
              <p className="px-3 py-1 text-xs font-bold text-pool-silver uppercase tracking-wide">Core Services</p>
              {mainServices.map(e => (
                <MobileNavLink key={e.slug} href={`/expertise/${e.slug}`} onClick={() => setMobileOpen(false)}>
                  <span className="mr-2">{e.icon}</span>{e.name}
                </MobileNavLink>
              ))}
              <p className="px-3 py-1 mt-1 text-xs font-bold text-pool-silver uppercase tracking-wide">Specialty Services</p>
              {extraServices.map(e => (
                <MobileNavLink key={e.slug} href={`/expertise/${e.slug}`} onClick={() => setMobileOpen(false)}>
                  <span className="mr-2">{e.icon}</span>{e.name}
                </MobileNavLink>
              ))}
            </div>

            <a
              href={business.existingSite.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-pool-stone hover:text-pool-deep transition-colors"
            >
              View Website ↗
            </a>

            <a
              href={business.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-pool-azure text-white text-sm font-bold rounded-xl hover:bg-pool-azure-hover transition-colors shadow-azure"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now (323) 825-2099
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  scrolled,
  children,
}: {
  href: string;
  scrolled: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus-ring ${
        scrolled
          ? 'text-slate-700 hover:text-pool-deep hover:bg-pool-stone'
          : 'text-white/90 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-pool-stone hover:text-pool-deep transition-colors"
    >
      {children}
    </Link>
  );
}
