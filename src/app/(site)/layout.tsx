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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sp2clogistics.com';
const SITE_TITLE = 'Sports Equipment Supplier Zimbabwe | Pozozo Trading — SP2C Logistics';
const SITE_DESCRIPTION =
  'Official sports equipment supplier in Zimbabwe. Genuine Molten & Mikasa basketballs, footballs, netballs, and volleyballs plus Fox40 gear. Same-day WhatsApp quotes and pro-forma invoices for schools, sports clubs, and institutions across Harare and nationwide.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Pozozo Trading — SP2C Logistics',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'sports equipment Zimbabwe',
    'sports equipment supplier Zimbabwe',
    'sports equipment Harare',
    'sports shop Harare',
    'school sports equipment Zimbabwe',
    'bulk sports equipment Zimbabwe',
    'Molten basketball Zimbabwe',
    'Mikasa football Zimbabwe',
    'Mikasa volleyball Zimbabwe',
    'netball supplier Zimbabwe',
    'Fox40 whistle Zimbabwe',
    'FIBA approved basketball',
    'FIFA Quality Pro football',
    'FIVB approved volleyball',
    'Pozozo Trading',
    'SP2C Logistics',
    'Pozozo Sports',
  ],
  authors: [{ name: 'SP2C Logistics / Pozozo Trading' }],
  creator: 'SP2C Logistics (Pvt) Ltd',
  publisher: 'SP2C Logistics (Pvt) Ltd',
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
    siteName: 'Pozozo Trading — SP2C Logistics',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    '@type': ['SportingGoodsStore', 'Organization'],
    '@id': `${SITE_URL}/#organization`,
    name: 'SP2C Logistics',
    legalName: 'SP2C Logistics (Pvt) Ltd',
    alternateName: ['Pozozo Trading', 'Pozozo Sports', 'Pozozo Trading Sports Division'],
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.png`,
    image: `${SITE_URL}/balls/bg5000-a.webp`,
    telephone: storeConfig.displayPhone,
    email: storeConfig.email,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Zimbabwe',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'SADC Region',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harare',
      addressRegion: 'Harare Province',
      addressCountry: 'ZW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -17.824858,
      longitude: 31.053028,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
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
