import Link from 'next/link';
import Image from 'next/image';
import { business } from '@/data/business';
import { expertisePages } from '@/data/expertise';
import { serviceAreas } from '@/data/serviceAreas';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18DZy64EfX/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/showtime_pools?igsh=c2x6ajQ0NGh4MHVt',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC3Dw1LtPvuX1JSGT7_KLntw',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Google Business',
    href: 'https://share.google/ltdNPoJBWevHTvrzq',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/showtimepoolssocal/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@showtimepools?_r=1&_t=ZS-93moYOMBILR',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    label: 'Yelp',
    href: 'https://www.yelp.com/biz/showtime-pools-los-angeles-8',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.138 9.138 0 012.364 3.812 1.073 1.073 0 01-.694 1.399zm-7.217 3.459v-5.28c0-1.005 1.234-1.44 1.88-.706l3.332 3.768a1.073 1.073 0 01-.2 1.598 9.124 9.124 0 01-4.024 1.317 1.072 1.072 0 01-1.164-1.144.434.434 0 01-.824.447zm-1.868 4.381l-.985-4.927c-.19-.95.962-1.58 1.685-.905l3.843 3.584a1.072 1.072 0 01-.156 1.648 9.133 9.133 0 01-3.372.944.968.968 0 01-1.015-1.344zm-5.39-4.512a9.16 9.16 0 01-.707-4.3 1.073 1.073 0 011.472-.888l4.748 1.928c.913.371.786 1.714-.188 1.907l-4.989.98a1.072 1.072 0 01-1.337-.627zm2.36-8.703a9.124 9.124 0 013.568-1.862 1.073 1.073 0 011.317.959l.331 5.137c.064.987-1.13 1.55-1.838.853L5.671 8.775a1.072 1.072 0 01.374-1.556z"/>
      </svg>
    ),
  },
];

const featuredFooterAreas = serviceAreas
  .filter(a => a.priority === 5)
  .slice(0, 10);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pool-deep text-white">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="container-site py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 mb-5">
                <Image
                  src="/logo.png"
                  alt="Showtime Pools"
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                />
                <span className="font-display font-800 text-lg text-white">Showtime Pools</span>
              </Link>
              <p className="text-white/65 text-sm leading-relaxed mb-5">
                Premium pool service, repair, remodeling, and equipment installation across Los Angeles County.
              </p>
              <div className="space-y-2 mb-5">
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-2 text-pool-azure hover:text-white transition-colors text-sm font-semibold"
                >
                  <PhoneIcon />
                  {business.phone}
                </a>
                <a
                  href={`mailto:${business.emails.support}`}
                  className="flex items-center gap-2 text-white/65 hover:text-white transition-colors text-sm"
                >
                  <MailIcon />
                  {business.emails.support}
                </a>
              </div>

              {/* Social media icons — 4 per row = 2 rows for 7 icons */}
              <div className="grid grid-cols-4 gap-2 w-fit">
                {socialLinks.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-pool-azure flex items-center justify-center transition-colors duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services/Expertise */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pool-silver mb-5">Expertise</p>
              <ul className="space-y-2">
                {expertisePages.map(e => (
                  <li key={e.slug}>
                    <Link
                      href={`/expertise/${e.slug}`}
                      className="text-sm text-white/70 hover:text-pool-azure transition-colors flex items-center gap-2"
                    >
                      <span className="text-base">{e.icon}</span>
                      {e.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/service-areas"
                    className="text-sm text-white/70 hover:text-pool-azure transition-colors mt-2 block"
                  >
                    → All Service Areas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured areas */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pool-silver mb-5">Service Areas</p>
              <ul className="space-y-2">
                {featuredFooterAreas.map(a => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="text-sm text-white/70 hover:text-pool-azure transition-colors"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Offices */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pool-silver mb-5">Our Offices</p>
              <div className="space-y-5">
                {business.offices.map(office => (
                  <div key={office.id}>
                    <p className="text-sm font-semibold text-white mb-1">{office.label}</p>
                    <p className="text-xs text-white/65 leading-relaxed">{office.address}</p>
                    <p className="text-xs text-white/65">{office.cityStateZip}</p>
                    <a
                      href={`https://maps.google.com/?q=${office.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pool-azure hover:text-white transition-colors mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-pool-silver mb-3">Email Us</p>
                <a href={`mailto:${business.emails.operations}`} className="text-xs text-white/65 hover:text-white transition-colors block">
                  {business.emails.operations}
                </a>
                <a href={`mailto:${business.emails.support}`} className="text-xs text-white/65 hover:text-white transition-colors block mt-1">
                  {business.emails.support}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps — two offices */}
      <div className="border-b border-white/10">
        <div className="container-site py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-silver mb-6 text-center">Find Us</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {business.offices.map(office => (
              <div key={office.id} className="rounded-xl overflow-hidden border border-white/10">
                <div className="bg-white/5 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{office.label}</p>
                  <p className="text-xs text-white/65">{office.fullAddress}</p>
                </div>
                <iframe
                  title={office.label}
                  src={office.embedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-site py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} {business.name}. All rights reserved. Serving Los Angeles County, CA.</p>
          <div className="flex items-center gap-4">
            <a href={business.existingSite.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Visit Main Site
            </a>
            <a href={business.phoneHref} className="hover:text-white transition-colors">
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
