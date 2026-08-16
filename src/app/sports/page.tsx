import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SPORTS } from '@/data/sports';
import { Ball3D } from '@/components/ball3d/Ball3D';

export const metadata: Metadata = {
  title: 'Shop by Sport – Pozozo Sports',
  description: 'Each sport has its own sizes, approvals and surfaces. Start where you play.',
};

export default function SportsIndexPage() {
  return (
    <div className="bg-[#EEF1F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#55637A] mb-2">
          <Link href="/" className="hover:text-[#0E1726]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0E1726]">Sports</span>
        </div>

        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0E1726] mb-3">
          Shop by sport
        </h1>
        <p className="text-base sm:text-lg text-[#3A4557] max-w-2xl mb-10">
          Each sport has its own sizes, approvals and surfaces. Start where you play.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
