import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceAreas } from '@/data/serviceAreas';
import { business } from '@/data/business';
import { CTAButton } from '@/components/shared/CTAButton';
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/shared/SchemaOrg';

export const metadata: Metadata = {
  title: 'Pool Service Areas in Los Angeles County | Showtime Pools',
  description: 'Showtime Pools serves 50+ communities across Los Angeles County — from Sherman Oaks and Beverly Hills to Pacific Palisades and Woodland Hills. Find your neighborhood.',
  alternates: { canonical: `${business.meta.siteUrl}/service-areas` },
  openGraph: {
    title: 'Pool Service Areas in Los Angeles County | Showtime Pools',
    description: 'Expert pool cleaning, maintenance, repair, and remodeling across 50+ Los Angeles communities.',
    url: `${business.meta.siteUrl}/service-areas`,
  },
};

// Sort by priority desc, then name asc
const sortedAreas = [...serviceAreas].sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));

// Slugs that don't yet have a real photo — fall back to placeholder
const NO_AREA_IMAGE = new Set<string>();
function areaImgSrc(slug: string, name: string) {
  if (NO_AREA_IMAGE.has(slug)) return `https://placehold.co/320x240/d4e8f5/1a4a6e?text=${encodeURIComponent(name)}`;
  return `/images/service-areas/${slug}.jpeg`;
}

export default function ServiceAreasPage() {
  return (
    <>
      <LocalBusinessSchema
        pageUrl={`${business.meta.siteUrl}/service-areas`}
        pageName="Showtime Pools Service Areas"
        pageDescription="Pool service, cleaning, maintenance, and repair across 50+ Los Angeles County communities."
      />
      <BreadcrumbSchema items={[
        { name: 'Home', href: '/' },
        { name: 'Service Areas', href: '/service-areas' },
      ]} />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-pool-deep relative overflow-hidden min-h-[420px] flex items-center">
        <img src="/images/service-areas-hero.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Service Areas</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-4">Los Angeles County</p>
          <h1 className="font-display font-800 text-5xl md:text-6xl text-white leading-tight mb-5 max-w-3xl">
            Pool Cleaning &amp; Service Across Los Angeles
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8">
            Showtime Pools operates from two offices — Sherman Oaks and Century City — to deliver fast, reliable pool service to over 50 communities throughout the Valley and Westside.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton label="Book a Free Estimate" size="lg" />
            <a href={business.phoneHref} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white border-2 border-white/25 rounded-xl hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-pool-stone border-b border-pool-stone">
        <div className="container-site py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <Stat label="Communities Served" value="50+" />
            <div className="w-px h-6 bg-pool-silver hidden sm:block" />
            <Stat label="San Fernando Valley" value="2 Offices" />
            <div className="w-px h-6 bg-pool-silver hidden sm:block" />
            <Stat label="Coverage" value="Year-Round" />
            <div className="w-px h-6 bg-pool-silver hidden sm:block" />
            <Stat label="Services" value="Full Lifecycle" />
          </div>
        </div>
      </div>

      {/* Area photo grid */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep">All Service Areas</h2>
              <p className="text-slate-500 text-sm mt-1">Sorted by service priority and coverage depth</p>
            </div>
            <p className="text-sm text-slate-500">{sortedAreas.length} locations</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedAreas.map(area => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group block focus-ring rounded-lg overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-pool-stone">
                  <img
                    src={areaImgSrc(area.slug, area.name)}
                    alt={`${area.name} pool service`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pool-deep/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="pt-2 pb-1">
                  <p className="text-sm font-semibold text-pool-azure group-hover:text-pool-deep transition-colors leading-tight">
                    {area.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">CA</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-sm bg-pool-deep">
        <div className="container-site text-center">
          <h2 className="font-display font-800 text-3xl md:text-4xl text-white mb-4">
            Don&apos;t See Your Neighborhood?
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-7">
            We may still serve your area. Contact us and we&apos;ll confirm coverage and schedule your first visit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton label="Book a Free Estimate" size="lg" />
            <a href={business.phoneHref} className="text-white/70 hover:text-white transition-colors text-sm font-semibold">
              Or call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <span className="font-display font-800 text-xl text-pool-deep">{value}</span>
      <span className="text-slate-500 ml-2 text-sm">{label}</span>
    </div>
  );
}
