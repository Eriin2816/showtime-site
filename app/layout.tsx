import type { Metadata } from 'next';
import { Raleway, DM_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { business } from '@/data/business';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(business.meta.siteUrl),
  title: {
    default: business.meta.siteTitle,
    template: `%s | Showtime Pools`,
  },
  description: business.meta.siteDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: business.meta.siteUrl,
    siteName: business.name,
    title: business.meta.siteTitle,
    description: business.meta.siteDescription,
    images: [{ url: business.meta.ogImage, width: 1200, height: 630, alt: 'Showtime Pools — Los Angeles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.meta.siteTitle,
    description: business.meta.siteDescription,
    images: [business.meta.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: business.meta.siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-white text-slate-800 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
