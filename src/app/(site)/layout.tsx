import type { Metadata, Viewport } from 'next';
import { Antonio, Karla } from 'next/font/google';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import './globals.css';
import { Providers } from './providers';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { siteSettingsQuery, storeConfigQuery } from '@/sanity/lib/queries';
import { SiteSettings, StoreConfig } from '@/types';

const antonio = Antonio({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-antonio',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-karla',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#13251C',
};

const SITE_URL = 'https://pozozosports.com';
const SITE_TITLE = 'Pozozo Sports – Authorised Molten & Mikasa Stock';
const SITE_DESCRIPTION =
  'Match balls, ordered by message. Genuine FIBA, FIFA and FIVB certified Molten and Mikasa basketballs, footballs, netballs and volleyballs, plus Fox40 officiating whistles, with same-day WhatsApp quotes and bulk pricing for schools and clubs.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s – Pozozo Sports',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Molten basketball Zimbabwe',
    'Mikasa football Zimbabwe',
    'Mikasa volleyball Zimbabwe',
    'FIBA approved basketball',
    'FIFA Quality Pro football',
    'FIVB approved volleyball',
    'netball supplier Zimbabwe',
    'Fox40 whistle Zimbabwe',
    'school sports equipment Zimbabwe',
    'bulk sports balls supplier',
    'sports equipment supplier SADC',
    'Pozozo Sports',
  ],
  authors: [{ name: 'Pozozo Sports' }],
  creator: 'Pozozo Sports',
  publisher: 'Pozozo Sports',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: SITE_URL,
    siteName: 'Pozozo Sports',
    title: SITE_TITLE,
    description: 'Pick what your club, school or shop needs, send the list on WhatsApp, and we come back with price, stock and delivery the same day.',
    images: ['/balls/bg5000-a.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/balls/bg5000-a.webp'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraftMode = (await draftMode()).isEnabled;
  const [{ data: storeConfigData }, { data: siteSettingsData }] = await Promise.all([
    sanityFetch({ query: storeConfigQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ]);
  const storeConfig = storeConfigData as StoreConfig;
  const siteSettings = siteSettingsData as SiteSettings;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportingGoodsStore',
    name: 'Pozozo Sports',
    alternateName: 'Pozozo Trading',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: storeConfig.displayPhone,
    email: storeConfig.email,
    areaServed: 'ZW',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harare',
      addressCountry: 'ZW',
    },
    openingHours: 'Mo-Sa 08:00-18:00',
    brand: [
      { '@type': 'Brand', name: 'Molten' },
      { '@type': 'Brand', name: 'Mikasa' },
      { '@type': 'Brand', name: 'Fox40' },
    ],
  };

  return (
    <html lang="en" className={`scroll-smooth ${antonio.variable} ${karla.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F3F5F0] text-[#13251C] antialiased font-sans">
        <JsonLd data={organizationJsonLd} />
        <LoadingScreen />
        <Providers>
          <AnnouncementBar messages={siteSettings.announcementMessages} />
          <HeaderWrapper
            storeConfig={storeConfig}
            logoLine1={siteSettings.logoLine1}
            logoLine2={siteSettings.logoLine2}
            navLinks={siteSettings.navLinks}
          />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <QuickViewModal />
          <Footer
            logoLine1={siteSettings.logoLine1}
            logoLine2={siteSettings.logoLine2}
            tagline={siteSettings.footerTagline}
            columns={siteSettings.footerColumns}
            copyright={siteSettings.footerCopyright}
            legalLinks={siteSettings.footerLegalLinks}
          />
        </Providers>
        <SanityLive includeDrafts={isDraftMode} />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
