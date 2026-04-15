import type { Metadata } from 'next';
import { business } from '@/data/business';
import { serviceAreas } from '@/data/serviceAreas';
import { expertisePages } from '@/data/expertise';
import { BookingModal } from '@/components/shared/BookingModal';
import { TestimonialSlider } from '@/components/shared/TestimonialSlider';
import { testimonials } from '@/data/testimonials';
import { generalFAQs } from '@/data/faqs';
import { CTAButton } from '@/components/shared/CTAButton';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { LocalBusinessSchema, FAQSchema } from '@/components/shared/SchemaOrg';
import { YouTubeFacade } from '@/components/shared/YouTubeFacade';
import { BeforeAfterCard } from '@/components/shared/BeforeAfterCard';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: business.meta.siteTitle,
  description: business.meta.siteDescription,
  alternates: { canonical: business.meta.siteUrl },
};

const featuredAreas = serviceAreas.filter(a => a.priority === 5).slice(0, 10);
const featuredExpertise = expertisePages.filter(e => e.featured);

const services = [
  { icon: '🧹', title: 'Weekly Cleaning', desc: 'Skimming, brushing, vacuuming, and chemistry balancing on a consistent schedule that keeps your pool always ready.' },
  { icon: '⚗️', title: 'Pool Maintenance', desc: 'Complete chemical management, filter care, and equipment monitoring that protects your pool from the inside out.' },
  { icon: '🔧', title: 'Repairs & Plumbing', desc: 'Accurate diagnosis and efficient repair of pumps, leaks, heaters, plumbing lines, and all mechanical systems.' },
  { icon: '⚡', title: 'Equipment Installation', desc: 'Variable-speed pumps, salt systems, LED lighting, and full smart automation installed and commissioned correctly.' },
  { icon: '🎨', title: 'Remodeling & Resurfacing', desc: 'Plaster, pebble, tile, coping, and deck transformations that restore your pool and modernize your backyard.' },
  { icon: '🔍', title: 'Inspections & Diagnostics', desc: 'Pre-purchase and pre-sale pool inspections with written reports for real estate transactions and peace of mind.' },
];

const bookingSteps = [
  { step: '01', title: 'Book Online', desc: 'Use our simple online scheduler to pick a time that works for you. No phone tag required.' },
  { step: '02', title: 'We Assess', desc: 'A Showtime technician visits your property, evaluates your pool and equipment, and discusses your needs.' },
  { step: '03', title: 'Get a Clear Quote', desc: 'You receive a transparent, upfront estimate — no vague pricing, no unexpected charges.' },
  { step: '04', title: 'We Get to Work', desc: 'Our team delivers the service, keeps you informed, and ensures the result meets the standard you expect.' },
];

const whyPoints = [
  { icon: '🏡', title: 'One Team, Complete Service', desc: 'Cleaning, repairs, equipment, remodeling, and construction — all from a single trusted provider. No juggling contractors.' },
  { icon: '📍', title: 'Two LA Offices', desc: 'Serving the Valley from Sherman Oaks and the Westside from Century City. Fast coverage across 50+ communities.' },
  { icon: '🔬', title: 'Technical Depth', desc: 'Our technicians handle the full scope — from routine chemistry to complex equipment failures and full remodels.' },
  { icon: '📋', title: 'Documented Service', desc: 'Every visit is logged. Every issue is communicated. You always know exactly what was done and what needs attention.' },
  { icon: '⚡', title: 'Fast Response', desc: 'Urgent repairs get priority scheduling. When equipment fails, the first company to respond wins — and that\'s us.' },
  { icon: '🎯', title: 'Transparent Pricing', desc: 'We provide clear quotes before any work begins. No surprise invoices. No vague estimates.' },
];

const transformations = [
  { id: 1, title: 'Full Pool Remodeling',               location: 'Sherman Oaks, CA',      service: 'Remodeling' },
  { id: 2, title: 'Full Pool & Spa Renovation',         location: 'Bel Air, CA',           service: 'Remodeling' },
  { id: 3, title: 'Coping, Deck & Finish Upgrade',      location: 'Encino, CA',            service: 'Tile & Coping' },
  { id: 4, title: 'Pebble Finish Transformation',       location: 'Pacific Palisades, CA', service: 'Resurfacing' },
  { id: 5, title: 'Equipment & Surface Overhaul',       location: 'Calabasas, CA',         service: 'Full Renovation' },
  { id: 6, title: 'Pool Cleaning & Restoration',        location: 'Beverly Hills, CA',     service: 'Pool Cleaning' },
];

const BRANDS = [
  { name: 'Jandy',          logo: '/images/brands/jandy.png' },
  { name: 'Pentair',        logo: '/images/brands/pentair.png' },
  { name: 'Hayward',        logo: '/images/brands/hayward.png' },
  { name: 'Aquastar',       logo: '/images/brands/aquastar.png' },
  { name: 'Raypak',         logo: '/images/brands/raypak.png' },
  { name: 'Clear Comfort',  logo: '/images/brands/clear-comfort.png' },
  { name: 'PAL Lightning',  logo: '/images/brands/pal-lightning.png' },
  { name: 'MOEN',           logo: '/images/brands/moen.png' },
  { name: 'Intermatic',     logo: '/images/brands/intermatic.png' },
  { name: 'Rola-Chem',      logo: '/images/brands/rola-chem.png' },
  { name: 'Siemens',        logo: '/images/brands/siemens.png' },
  { name: 'J&J Electronics', logo: '/images/brands/jj-electronics.png' },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <FAQSchema faqs={generalFAQs.slice(0, 5)} />
      <BookingModal />

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Luxury pool in Los Angeles"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container-site relative z-10 pt-24 pb-16 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-pool-azure text-xs font-bold uppercase tracking-widest mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-pool-azure animate-pulse-slow" />
              Los Angeles&apos; Premier Pool Service Team
            </p>

            {/* H1 */}
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 animate-fade-up animate-delay-100">
              Crystal Clear.
              <br />
              <span className="text-gradient-azure">Perfection.</span>
            </h1>

            <p className="text-white/80 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-up animate-delay-200">
              Full-service pool care, repairs, remodeling, and equipment installation across Los Angeles County.
              One team handles it all — weekly maintenance to complete renovations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animate-delay-300">
              <CTAButton label="Book a Free Estimate" size="lg" />
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors duration-200 focus-ring"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {business.phone}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/65 text-sm animate-fade-up animate-delay-400">
              <TrustBadge>Sherman Oaks &amp; Century City Offices</TrustBadge>
              <TrustBadge>50+ Communities Served</TrustBadge>
              <TrustBadge>Full-Service Team</TrustBadge>
              <TrustBadge>Fast Repair Response</TrustBadge>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── WHY CHOOSE ───────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeader
            eyebrow="Why Showtime Pools"
            title="One Team. The Full Spectrum of Pool Care."
            subtitle="Most pool companies specialize in one thing. We handle the full lifecycle — from weekly maintenance through major repairs, equipment upgrades, and complete renovations. One trusted team, zero contractor juggling."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white border border-pool-stone rounded-2xl p-7 card-lift shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-pool-stone flex items-center justify-center text-2xl mb-4">
                  {point.icon}
                </div>
                <h3 className="font-display font-700 text-lg text-pool-deep mb-2">{point.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-12 text-center">
            <CTAButton label="Schedule Your Free Assessment" size="lg" />
          </div>
        </div>
      </section>


      {/* ─── HOW TO BOOK ──────────────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="How It Works"
            title="Getting Started Is Simple"
            subtitle="No complicated intake process. No vague timelines. Just a straightforward path from your first contact to a pool that\'s performing exactly as it should."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-pool-stone via-pool-azure to-pool-stone" />

            {bookingSteps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-pool-deep text-white font-display font-800 text-2xl flex items-center justify-center mx-auto mb-5 shadow-deep relative z-10">
                  {step.step}
                </div>
                <h3 className="font-display font-700 text-pool-deep text-xl mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTAButton label="Book a Free Estimate" size="lg" />
          </div>
        </div>
      </section>

      {/* ─── ABOUT US ─────────────────────────────────── */}
      <section className="section-pad text-white relative overflow-hidden">
        <img src="/images/about-bg.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />

        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-4">About Showtime Pools</p>
              <h2 className="font-display font-800 text-4xl md:text-5xl text-white mb-6 leading-tight">
                Los Angeles Pool Experts. Local to the Neighborhoods We Serve.
              </h2>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5">
                Showtime Pools is a full-service pool company based in Sherman Oaks, California, with an additional office in Century City. We serve homeowners and commercial clients across Los Angeles County — from the San Fernando Valley to the Westside and beyond.
              </p>
              <p className="text-white/75 text-base leading-relaxed mb-5">
                Our approach is built around being the only pool company you need. We handle weekly cleaning and maintenance, emergency repairs, equipment installation and upgrades, inspections, remodeling, new construction, and outdoor living additions — all in-house. When you have a pool issue, you make one call.
              </p>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                We operate from two offices — Sherman Oaks at 15301 Ventura Blvd and Century City at 1925 Century Park East — to provide fast, efficient coverage across the county. Our team combines technical expertise with the professionalism that Los Angeles homeowners expect from a premium service provider.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton label="Book a Free Estimate" variant="primary" size="lg" />
                <a
                  href={business.existingSite.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 transition-colors duration-200 focus-ring"
                >
                  Visit Our Main Site ↗
                </a>
              </div>
            </div>

            {/* Video — facade loads iframe only on click, zero impact on page load */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-full max-w-sm">
              <YouTubeFacade
                videoId={business.youtubeVideoId}
                title="Showtime Pools — Los Angeles Pool Service"
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED SERVICE AREAS ───────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeader
            eyebrow="Where We Operate"
            title="Serving Los Angeles County's Best Neighborhoods"
            subtitle="From Sherman Oaks and Encino to Beverly Hills and Pacific Palisades — we serve over 50 communities across the Valley and Westside."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
            {featuredAreas.map(area => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group block focus-ring rounded-xl overflow-hidden border border-pool-stone hover:border-pool-azure shadow-card card-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-pool-stone">
                  <img
                    src={`/images/service-areas/${area.slug}.jpeg`}
                    alt={`${area.name} pool service`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pool-deep/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-xs font-semibold text-pool-deep group-hover:text-pool-azure transition-colors leading-tight truncate">{area.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">CA</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-pool-deep text-pool-deep font-bold text-sm hover:bg-pool-deep hover:text-white transition-colors duration-200 focus-ring"
            >
              View All 50+ Service Areas
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED EXPERTISE ───────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="Our Expertise"
            title="Specialized Knowledge Across Every Pool Service Category"
            subtitle="Deep expertise in each service category — not a generalist crew that does a little bit of everything."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExpertise.map(e => (
              <Link
                key={e.slug}
                href={`/expertise/${e.slug}`}
                className="group bg-white rounded-2xl border border-pool-stone card-lift shadow-card focus-ring block overflow-hidden"
              >
                {/* 4:3 image placeholder */}
                <div className="aspect-[4/3] overflow-hidden bg-pool-stone">
                  <img
                    src={`/images/expertise/cards/${e.slug}.jpeg`}
                    alt={e.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-700 text-pool-deep text-lg group-hover:text-pool-azure transition-colors mb-1">
                    {e.name}
                  </h3>
                  <p className="text-xs text-pool-silver mb-3">{e.tagline}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {e.intro.slice(0, 130)}...
                  </p>
                  <div className="flex items-center gap-1 text-pool-azure text-sm font-semibold mt-4">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE & AFTER ───────────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="Real Results"
            title="Before & After Pool Transformations"
            subtitle="See how outdated, worn, and underperforming pools are transformed into clean, modern, high-value backyard spaces with expert remodeling, resurfacing, and finish work."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {transformations.map(t => (
              <BeforeAfterCard
                key={t.id}
                before={`/images/transformations/${t.id}-before.jpeg`}
                after={`/images/transformations/${t.id}-after.jpeg`}
                title={t.title}
                location={t.location}
                service={t.service}
              />
            ))}
          </div>

          <div className="text-center">
            <CTAButton label="Book a Free Estimate" size="lg" />
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeader
            eyebrow="Client Feedback"
            title="What Los Angeles Homeowners Say"
            subtitle="Placeholder reviews — replace with real client testimonials when available."
          />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="section-pad bg-pool-stone/40">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="Common Questions"
              title="Frequently Asked Questions"
            />
            <FAQAccordion faqs={generalFAQs} />
          </div>
        </div>
      </section>

      {/* ─── BRAND MARQUEE ────────────────────────────── */}
      <section className="py-12 bg-white border-y border-pool-stone overflow-hidden">
        <div className="container-site mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-silver">Equipment Brands We Install &amp; Service</p>
        </div>
        <div className="relative flex overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee track — duplicated for seamless loop */}
          <div className="flex animate-marquee whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-6 px-8 py-4 rounded-xl border border-pool-stone bg-white shadow-card shrink-0 h-20 w-40"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 max-w-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-pool-azure mb-4">Ready to Get Started?</p>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white mb-5 leading-tight">
            Your Pool. Our Expertise.<br />Perfect Results.
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Book a free estimate today. Our team will assess your pool, explain what&apos;s needed, and provide a clear, upfront quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton label="Book a Free Estimate" size="lg" />
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors focus-ring"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <svg className="w-4 h-4 text-pool-azure shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {children}
    </span>
  );
}
