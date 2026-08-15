import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#12100E',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pozozosports.com'),
  title: 'Pozozo Sports – Authorised Molten & Mikasa Stock',
  description: 'Match balls, ordered by message. Genuine FIBA and FIFA certified Molten and Mikasa basketballs, footballs, netballs, and accessories.',
  icons: {
    icon: '/balls/bg5000-a.webp',
  },
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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-[#1A1A1A] antialiased">
        <Providers>
          <AnnouncementBar />
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
