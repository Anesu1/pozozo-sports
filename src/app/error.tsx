'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, RotateCcw } from 'lucide-react';
import { getWhatsAppUrl } from '@/data/sportsConfig';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, the website threw an error while I was browsing — can you help?');

  return (
    <div className="bg-[#F3F5F0] min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center w-full">
        <div className="font-display uppercase text-[#F2900E] text-[15px] font-bold tracking-[0.22em] mb-4">
          SOMETHING BROKE
        </div>
        <h1 className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#13251C] mb-4">
          That didn't load properly
        </h1>
        <p className="text-base sm:text-lg text-[#3C4536] max-w-[52ch] mx-auto mb-9">
          Try again — most of the time it's a one-off. If it keeps happening, message us and we'll sort it
          from our end.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="h-[52px] px-7 inline-flex items-center gap-2 bg-[#13251C] hover:bg-black text-white text-sm font-bold rounded-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
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
            className="h-[52px] px-7 inline-flex items-center text-[#5B6B54] hover:text-[#13251C] text-sm font-bold transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
