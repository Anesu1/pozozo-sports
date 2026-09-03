import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { Ball3D } from '@/components/ball3d/Ball3D';

export const metadata: Metadata = {
  title: 'Molten & Mikasa',
  description:
    "We stock Molten and Mikasa because between them they cover every court and pitch we supply, and because both are easy to authenticate.",
  alternates: { canonical: '/brands' },
};

export default function BrandsPage() {
  return (
    <div className="bg-[#F3F5F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54] mb-2">
          <Link href="/" className="hover:text-[#13251C]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#13251C]">Brands</span>
        </div>

        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#13251C] mb-3.5">
          Two brands, no others
        </h1>
        <p className="text-base sm:text-lg text-[#3C4536] max-w-2xl mb-10 leading-relaxed">
          We stock Molten and Mikasa because between them they cover every court and pitch we
          supply, and because both are easy to authenticate. If a ball claims to be either and the
          price looks too good, it isn&apos;t one.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/brand/${b.slug}`}
              style={{ background: b.bg, color: b.fg }}
              className="rounded-sm p-9 sm:p-10 flex flex-col min-h-[380px]"
            >
              <h2
                className="font-display uppercase text-[42px] sm:text-[46px] leading-none mb-3.5"
                style={{ color: b.accent }}
              >
                {b.title}
              </h2>
              <p
                style={{ color: '#B4BEA8' }}
                className="text-base leading-relaxed mb-5 max-w-[38ch]"
              >
                {b.lede}
              </p>
              <span className="text-[13.5px] font-bold" style={{ color: b.accent }}>
                See the {b.title} range →
              </span>
              <div className="flex-1 min-h-0 max-h-[200px] mt-5 relative">
                <Ball3D src={b.img} alt={b.title} className="w-full h-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
