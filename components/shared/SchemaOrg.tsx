import { business } from '@/data/business';

interface LocalBusinessSchemaProps {
  pageUrl?: string;
  pageName?: string;
  pageDescription?: string;
}

export function LocalBusinessSchema({
  pageUrl,
  pageName,
  pageDescription,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': business.meta.siteUrl,
    name: business.name,
    url: pageUrl ?? business.meta.siteUrl,
    description: pageDescription ?? business.meta.siteDescription,
    telephone: business.phone,
    email: business.emails.support,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Los Angeles County, California',
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: business.offices[0].address,
        addressLocality: 'Sherman Oaks',
        addressRegion: 'CA',
        postalCode: '91403',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: business.offices[1].address,
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90067',
        addressCountry: 'US',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pool Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pool Cleaning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pool Maintenance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pool Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Algae Removal' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Equipment Installation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pool Remodeling' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pool Inspections' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Smart Automation' } },
      ],
    },
    sameAs: [
      business.social.facebook,
      business.social.instagram,
      business.social.google,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: { q: string; a: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; href: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${business.meta.siteUrl}${item.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
