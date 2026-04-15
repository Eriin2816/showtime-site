// Single source of truth for all business information
export const business = {
  name: 'Showtime Pools',
  tagline: 'Crystal Clear. Perfection.',
  subTagline: 'Premium pool service, repair, and remodeling across Los Angeles County.',

  phone: '(323) 825-2099',
  phoneHref: 'tel:3238252099',

  emails: {
    operations: 'operations@showtimepoolmechanics.com',
    support: 'support@showtimepoolmechanics.com',
  },

  offices: [
    {
      id: 'sherman-oaks',
      label: 'Sherman Oaks Office',
      address: '15301 Ventura Blvd.',
      cityStateZip: 'Sherman Oaks, CA 91403',
      fullAddress: '15301 Ventura Blvd., Sherman Oaks, CA 91403',
      mapQuery: '15301+Ventura+Blvd+Sherman+Oaks+CA+91403',
      embedSrc:
        'https://maps.google.com/maps?q=15301+Ventura+Blvd+Sherman+Oaks+CA+91403&output=embed&z=15',
    },
    {
      id: 'century-city',
      label: 'Century City Office',
      address: '1925 Century Park East, Suite 1700',
      cityStateZip: 'Los Angeles, CA 90067',
      fullAddress: '1925 Century Park East Suite 1700, Los Angeles, CA 90067',
      mapQuery: '1925+Century+Park+East+Suite+1700+Los+Angeles+CA+90067',
      embedSrc:
        'https://maps.google.com/maps?q=1925+Century+Park+East+Suite+1700+Los+Angeles+CA+90067&output=embed&z=15',
    },
  ],

  cta: {
    label: 'Book a Free Estimate',
    href: 'https://app.showtimepoolmechanics.com/widget/booking/KkBpnBMhT5QXn8YtTsDb',
  },

  popupForm: {
    href: 'https://app.showtimepoolmechanics.com/widget/form/FLKa6w2LjIjQ7hYtjyCv',
  },

  // Replace with your actual YouTube video ID (the part after ?v= in the URL)
  youtubeVideoId: 'fpaPs1UEWsI',

  existingSite: {
    label: 'View Website',
    href: 'https://www.showtimepoolservice.com/',
  },

  social: {
    facebook: 'https://www.facebook.com/showtimepools',
    instagram: 'https://www.instagram.com/showtimepools',
    google: 'https://g.page/showtimepools',
    youtube: 'https://www.youtube.com/showtimepools',
  },

  serviceArea: 'Los Angeles County, CA',

  meta: {
    siteTitle: 'Showtime Pools | Premium Pool Service, Repair & Remodeling — Los Angeles',
    siteDescription:
      'Showtime Pools delivers expert pool cleaning, maintenance, repairs, equipment upgrades, and remodeling across Los Angeles County. One team handles it all — serving Sherman Oaks, Beverly Hills, Encino, and 50+ communities.',
    ogImage: 'https://showtimepoolservice.com/images/og-image.png',
    siteUrl: 'https://showtimepoolservice.com',
  },
} as const;

export type Business = typeof business;
