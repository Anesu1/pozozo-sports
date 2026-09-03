import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Ball3D } from '@/components/ball3d/Ball3D';
import { sanityFetch } from '@/sanity/lib/live';
import { sportsPageQuery, sportsQuery } from '@/sanity/lib/queries';
import { cleanSportColors } from '@/sanity/lib/stega-safe';
import { SimpleHeroPageContent, SportMeta } from '@/types';

export const metadata: Metadata = {
  title: 'Shop by Sport',
  description: 'Each sport has its own sizes, approvals and surfaces. Start where you play.',
  alternates: { canonical: '/sports' },
};

export default async function SportsIndexPage() {
  const [{ data }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: sportsQuery }),
    sanityFetch({ query: sportsPageQuery }),
  ]);
  const SPORTS = (data as SportMeta[]).map(cleanSportColors);
  const content = contentData as SimpleHeroPageContent;

  return (
    <div className="bg-[#F3F5F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54] mb-2">
          <Link href="/" className="hover:text-[#13251C]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#13251C]">Sports</span>
        </div>

        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#13251C] mb-3">
          {content.heading}
        </h1>
        <p className="text-base sm:text-lg text-[#3C4536] max-w-2xl mb-10">{content.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPORTS.map((s) => (
            <Link
              key={s.slug}
              href={`/sport/${s.slug}`}
              style={{ background: s.bg, color: s.fg }}
              className="rounded-sm p-8 min-h-[420px] flex flex-col relative overflow-hidden"
            >
              <div style={{ color: s.dim }} className="text-[11px] font-bold tracking-[0.22em] mb-3">
                {s.kicker}
              </div>
              <h2 className="font-display uppercase text-[29px] leading-none tracking-tight mb-3 max-w-[14ch]">
                {s.title}
              </h2>
              <p style={{ color: s.dim }} className="text-[15px] leading-relaxed mb-4">
                {s.blurb}
              </p>
              <span
                style={{ borderColor: s.line, color: s.fg }}
                className="self-start h-[42px] px-5 rounded-sm border text-[13px] font-bold flex items-center"
              >
                {s.cta}
              </span>
              <div className="flex-1 min-h-0 max-h-[220px] mt-4 relative">
                <Ball3D src={s.img} alt={s.title} className="w-full h-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
