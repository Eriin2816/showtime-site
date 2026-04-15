import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNearbyAreas, getAllSlugs, areaBySlug } from '@/data/serviceAreas';
import { business } from '@/data/business';
import { getAreaStrategy } from '@/data/areaStrategy';
import { CTAButton } from '@/components/shared/CTAButton';
import { FAQAccordion } from '@/components/shared/FAQAccordion';

import { FAQSchema, BreadcrumbSchema } from '@/components/shared/SchemaOrg';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const area = areaBySlug.get(params.slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `${business.meta.siteUrl}/service-areas/${area.slug}` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${business.meta.siteUrl}/service-areas/${area.slug}`,
    },
  };
}

export default function ServiceAreaPage({ params }: Props) {
  const area = areaBySlug.get(params.slug);
  if (!area) notFound();

  const strategy    = getAreaStrategy(area);
  const nearbyAreas = getNearbyAreas(area.slug, 5);

  // Merge data FAQs with supplemental FAQs — data-specific ones first
  const allFAQs = [
    ...area.faqEntries,
    ...strategy.supplementalFAQs,
  ];

  const officeLabel = area.bestBranch === 'Either'
    ? 'Sherman Oaks & Century City'
    : area.bestBranch;

  const schemaAddress = area.bestBranch === 'Century City'
    ? business.offices[1]
    : business.offices[0];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Pool Service in ${area.name}`,
    description: area.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: business.name,
      telephone: business.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: schemaAddress.address,
        addressLocality: area.bestBranch === 'Century City' ? 'Los Angeles' : 'Sherman Oaks',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    areaServed: { '@type': 'City', name: area.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema faqs={allFAQs} />
      <BreadcrumbSchema items={[
        { name: 'Home', href: '/' },
        { name: 'Service Areas', href: '/service-areas' },
        { name: area.name, href: `/service-areas/${area.slug}` },
      ]} />

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="pt-28 pb-16 relative overflow-hidden min-h-[480px] flex items-center">
        {/* Background image — dedicated hero photo per area */}
        <img
          src={`/images/service-areas/heroes/${area.slug}.jpeg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container-site relative z-10">
          {/* Breadcrumb — white text for dark hero */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 font-medium" aria-current="page">{area.name}</span>
          </nav>

          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-pool-azure">
              {officeLabel} Office
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${strategy.heroBadgeClass}`}>
              {strategy.heroBadge}
            </span>
          </div>

          <h1 className="font-display font-800 text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-5 max-w-3xl">
            {area.h1}
          </h1>

          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {area.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton label="Book a Free Estimate" size="lg" />
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white border-2 border-white/25 rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY SHOWTIME FOR THIS AREA ───────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3">
              Why {area.name} Homeowners Choose Showtime
            </p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep leading-tight">
              The Right Fit for {area.name}
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              {area.localAngle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {strategy.whyPoints.map((p, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-pool-stone/40 border border-pool-stone">
                <div className="w-8 h-8 rounded-lg bg-pool-azure/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-pool-azure" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-700 text-pool-deep text-base mb-1">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3">What We Offer</p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep leading-tight">
              Pool Services in {area.name}
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              From routine weekly maintenance to complete renovations — all delivered by one accountable team with upfront pricing before any work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {strategy.serviceCards.map((s, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-pool-stone shadow-card card-lift">
                <div className="relative aspect-video overflow-hidden bg-pool-stone">
                  <img
                    src={s.image ?? `https://placehold.co/640x360/d4e8f5/1a4a6e?text=${encodeURIComponent(s.title)}`}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-2xl block mb-3">{s.icon}</span>
                  <h3 className="font-display font-700 text-pool-deep text-base mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCAL CONTEXT SECTION ────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3 text-center">
              Pool Care in {area.name}
            </p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep leading-tight text-center mb-8">
              {strategy.localContent.heading}
            </h2>
            <div className="space-y-4">
              {strategy.localContent.paragraphs.map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RELATED EXPERTISE ────────────────────────── */}
      <section className="section-pad-sm bg-pool-stone/40">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-2 text-center">
            Related Pool Services
          </p>
          <p className="text-center text-sm text-slate-500 mb-6">
            Services most relevant to {area.name} homeowners
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategy.relatedExpertise.map(e => (
              <Link
                key={e.slug}
                href={`/expertise/${e.slug}`}
                className="group bg-white rounded-xl p-5 border border-pool-stone hover:border-pool-azure shadow-card card-lift focus-ring flex items-center gap-4"
              >
                <span className="text-2xl">{e.icon}</span>
                <div>
                  <p className="font-display font-700 text-pool-deep text-sm group-hover:text-pool-azure transition-colors">{e.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{e.tagline}</p>
                </div>
                <svg className="w-4 h-4 text-pool-azure ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEARBY AREAS ─────────────────────────────── */}
      {nearbyAreas.length > 0 && (
        <section className="section-pad-sm bg-white">
          <div className="container-site">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-2 text-center">
              Nearby Communities We Also Serve
            </p>
            <p className="text-center text-sm text-slate-500 mb-6">
              All areas served by the same full-service team
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-5">
              {nearbyAreas.map(nearby => (
                <Link
                  key={nearby.slug}
                  href={`/service-areas/${nearby.slug}`}
                  className="group block rounded-xl overflow-hidden border border-pool-stone hover:border-pool-azure shadow-card card-lift focus-ring"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-pool-stone">
                    <img
                      src={`/images/service-areas/${nearby.slug}.jpeg`}
                      alt={`${nearby.name} pool service`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-pool-deep group-hover:text-pool-azure transition-colors leading-tight truncate">{nearby.name}</p>
                    <p className="text-[10px] text-slate-400">CA</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-pool-silver bg-white text-sm font-semibold text-slate-500 hover:border-pool-azure hover:text-pool-azure transition-colors focus-ring"
              >
                View all areas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3 text-center">
              Questions &amp; Answers
            </p>
            <h2 className="font-display font-800 text-3xl text-pool-deep text-center mb-8">
              Pool Service FAQs for {area.name}
            </h2>
            <FAQAccordion faqs={allFAQs} />
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="section-pad bg-pool-deep relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pool-azure/5 -translate-y-12 translate-x-12" />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3">Get Started Today</p>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white mb-4 leading-tight">
            {strategy.ctaHeading}
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            {strategy.ctaSubtext}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton label="Book a Free Estimate" size="lg" />
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white border-2 border-white/25 rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {business.phone}
            </a>
          </div>
          <p className="text-white/40 text-xs mt-8">
            Served by our {officeLabel} office{area.bestBranch === 'Either' ? 's' : ''}
            {area.bestBranch === 'Sherman Oaks' && ` — ${business.offices[0].fullAddress}`}
            {area.bestBranch === 'Century City' && ` — ${business.offices[1].fullAddress}`}
          </p>
        </div>
      </section>
    </>
  );
}
