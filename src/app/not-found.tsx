import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Search } from 'lucide-react';
import { SPORTS } from '@/data/sports';
import { getWhatsAppUrl } from '@/data/sportsConfig';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist. Browse the catalogue or ask us on WhatsApp instead.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const waUrl = getWhatsAppUrl("Hello Pozozo Sports, I followed a link that didn't work — can you help me find what I was looking for?");

  return (
    <div className="bg-[#F3F5F0] min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center w-full">
        <div className="font-display uppercase text-[#F2900E] text-[15px] font-bold tracking-[0.22em] mb-4">
          404
        </div>
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#13251C] mb-4">
          That page went out of bounds
        </h1>
        <p className="text-base sm:text-lg text-[#3C4536] max-w-[52ch] mx-auto mb-9">
          The link's broken, or the page moved. The catalogue and the sales desk are both still exactly where
          you left them.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <Link
            href="/shop"
            className="h-[52px] px-7 grid place-items-center bg-[#13251C] hover:bg-black text-white text-sm font-bold rounded-sm transition-colors"
          >
            Shop the range
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[52px] px-7 inline-flex items-center gap-2 border border-[#13251C] hover:bg-[#13251C] hover:text-white text-[#13251C] text-sm font-bold rounded-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Ask on WhatsApp
          </a>
          <Link
            href="/"
            className="h-[52px] px-7 inline-flex items-center gap-2 text-[#5B6B54] hover:text-[#13251C] text-sm font-bold transition-colors"
          >
            <Search className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          {SPORTS.map((s) => (
            <Link
              key={s.slug}
              href={`/sport/${s.slug}`}
              style={{ background: s.bg, color: s.fg }}
              className="rounded-sm p-4 hover:opacity-90 transition-opacity"
            >
              <div style={{ color: s.dim }} className="text-[10px] font-bold tracking-[0.18em] mb-1.5">
                {s.kicker}
              </div>
              <div className="font-display uppercase text-sm leading-tight">{s.cta}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
