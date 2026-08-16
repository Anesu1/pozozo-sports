import type { Metadata, Viewport } from 'next';
import { Antonio, Karla } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Footer } from '@/components/Footer';

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
  themeColor: '#0E1726',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pozozosports.com'),
  title: 'Pozozo Sports – Authorised Molten & Mikasa Stock',
  description: 'Match balls, ordered by message. Genuine FIBA and FIFA certified Molten and Mikasa basketballs, footballs, netballs, and accessories.',
  openGraph: {
    title: 'Pozozo Sports – Authorised Molten & Mikasa Stock',
    description: 'Match balls, ordered by message. Pick what your club, school or shop needs, send the list on WhatsApp, and we come back with price, stock and delivery the same day.',
    images: ['/balls/bg5000-a.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${antonio.variable} ${karla.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#EEF1F5] text-[#0E1726] antialiased font-sans">
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
