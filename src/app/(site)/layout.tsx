import type { Metadata, Viewport } from 'next';
import { Antonio, Karla } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { JsonLd } from '@/components/JsonLd';
import { STORE_CONFIG } from '@/data/sportsConfig';

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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportingGoodsStore',
  name: 'Pozozo Sports',
  alternateName: 'Pozozo Trading',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: STORE_CONFIG.displayPhone,
  email: STORE_CONFIG.email,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${antonio.variable} ${karla.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F3F5F0] text-[#13251C] antialiased font-sans">
        <JsonLd data={organizationJsonLd} />
        <LoadingScreen />
        <Providers>
          <AnnouncementBar />
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <QuickViewModal />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
