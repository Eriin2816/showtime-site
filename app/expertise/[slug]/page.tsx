import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { expertisePages, getAllExpertiseSlugs } from '@/data/expertise';
import { serviceAreas, areaBySlug } from '@/data/serviceAreas';
import { business } from '@/data/business';
import { CTAButton } from '@/components/shared/CTAButton';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { FAQSchema, BreadcrumbSchema } from '@/components/shared/SchemaOrg';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllExpertiseSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = expertisePages.find(e => e.slug === params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `${business.meta.siteUrl}/expertise/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${business.meta.siteUrl}/expertise/${page.slug}`,
    },
  };
}

export default function ExpertisePage({ params }: Props) {
  const page = expertisePages.find(e => e.slug === params.slug);
  if (!page) notFound();

  // Get the related areas as full objects
  const relatedAreas = page.relatedAreaSlugs
    .map(s => areaBySlug.get(s))
    .filter(Boolean) as typeof serviceAreas;

  // Also show some other top areas
  const topAreas = serviceAreas.filter(a => a.priority === 5).slice(0, 6);

  // Other expertise pages to cross-link
  const otherExpertise = expertisePages.filter(e => e.slug !== page.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.name,
    description: page.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: business.name,
      telephone: business.phone,
      url: business.meta.siteUrl,
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Los Angeles County, CA' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema faqs={page.faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', href: '/' },
        { name: 'Expertise', href: '/service-areas' },
        { name: page.name, href: `/expertise/${page.slug}` },
      ]} />

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="pt-28 pb-16 bg-pool-deep relative overflow-hidden min-h-[420px] flex items-center">
        <img src={`/images/expertise/${page.slug}.jpeg`} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/expertise" className="hover:text-white transition-colors">Expertise</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 font-medium" aria-current="page">{page.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
              {page.icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure">Los Angeles Pool Experts</p>
          </div>

          <h1 className="font-display font-800 text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-4 max-w-3xl">
            {page.h1}
          </h1>

          <p className="text-pool-azure font-semibold text-base mb-4 italic">{page.tagline}</p>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {page.intro}
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

      {/* ─── WHAT IT IS ───────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3">The Details</p>
              <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep leading-tight mb-5">
                What Is {page.name}?
              </h2>
              <p className="text-slate-700 leading-relaxed mb-5">
                {page.whatIsIt}
              </p>
              <CTAButton label="Schedule a Free Assessment" variant="secondary" />
            </div>

            <div className="bg-pool-stone/50 rounded-2xl p-7 border border-pool-stone">
              <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-5">Why It Matters</p>
              <div className="space-y-4">
                {page.benefits.map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-pool-azure/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-pool-azure" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-pool-deep text-sm">{b.title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ──────────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3">Service Scope</p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep leading-tight">
              What&apos;s Included in Our {page.name} Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.whatsIncluded.map((item, i) => {
              const imageSrc = item.imageFile?.startsWith('/')
                ? item.imageFile
                : `/images/expertise/${page.scopeImageFolder ?? page.slug}/${item.imageFile ?? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.jpeg`;
              return (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-pool-stone shadow-card card-lift">
                  <div className="relative aspect-video overflow-hidden bg-pool-stone">
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-pool-deep text-white font-display font-800 text-sm flex items-center justify-center mb-4">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display font-700 text-pool-deep text-base mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY SHOWTIME ─────────────────────────────── */}
      <section className="section-pad text-white relative overflow-hidden">
        <img src="/images/about-bg.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-4">
              Why Trust Showtime Pools
            </p>
            <h2 className="font-display font-800 text-4xl md:text-5xl text-white leading-tight mb-5">
              The Showtime Pools Difference for {page.name}
            </h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
              {page.whyShowtime}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Upfront pricing before any work begins' },
                { label: 'Documented service records every visit' },
                { label: 'All major equipment brands serviced' },
                { label: 'Sherman Oaks & Century City offices' },
                { label: 'Full repair and renovation in-house' },
                { label: 'Fast response for urgent issues' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <svg className="w-4 h-4 text-pool-azure shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3 text-center">Common Questions</p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-pool-deep text-center mb-10">
              {page.name} FAQ
            </h2>
            <FAQAccordion faqs={page.faqs} />
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ────────────────────────────── */}
      <section className="section-pad-sm bg-pool-stone/40">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-5 text-center">
            Where We Provide {page.name} Services
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-5">
            {topAreas.map(area => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group block rounded-xl overflow-hidden border border-pool-stone hover:border-pool-azure shadow-card card-lift focus-ring"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-pool-stone">
                  <img
                    src={`/images/service-areas/${area.slug}.jpeg`}
                    alt={`${area.name} pool service`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-pool-deep group-hover:text-pool-azure transition-colors leading-tight truncate">{area.name}</p>
                  <p className="text-[10px] text-slate-400">CA</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-dashed border-pool-silver bg-white text-sm font-semibold text-slate-500 hover:border-pool-azure hover:text-pool-azure transition-colors focus-ring"
            >
              + {serviceAreas.length - topAreas.length} more areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── OTHER EXPERTISE ──────────────────────────── */}
      <section className="section-pad-sm bg-white">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-5 text-center">More From Showtime Pools</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherExpertise.map(e => (
              <Link
                key={e.slug}
                href={`/expertise/${e.slug}`}
                className="group bg-white rounded-xl p-4 border border-pool-stone hover:border-pool-azure shadow-card card-lift focus-ring text-center"
              >
                <span className="text-2xl block mb-2">{e.icon}</span>
                <p className="font-display font-700 text-sm text-pool-deep group-hover:text-pool-azure transition-colors">
                  {e.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="section-pad bg-pool-deep relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pool-azure/5 -translate-y-12 translate-x-12" />
        <div className="container-site relative z-10 text-center">
          <span className="text-4xl block mb-4">{page.icon}</span>
          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-3">Book Today</p>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white mb-4 leading-tight">
            Expert {page.name}<br />Across Los Angeles
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Get a free, no-pressure estimate from a team that knows Los Angeles pools.
            Clear pricing, fast scheduling, professional results.
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
        </div>
      </section>
    </>
  );
}
