import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/data/sportsConfig';
import { Ball3D } from '@/components/ball3d/Ball3D';
import { sanityFetch } from '@/sanity/lib/live';
import { aboutPageQuery } from '@/sanity/lib/queries';
import { AboutPageContent } from '@/types';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Trading since 2016, Pozozo Sports supplies genuine match balls and officiating gear to schools, clubs and national teams across Zimbabwe and the SADC region.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: aboutPageQuery });
  const content = data as AboutPageContent;

  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I would like to learn more about your authorized stock.');

  return (
    <div className="bg-[#F3F5F0] min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-[#F3F5F0] border-b border-[#D8DED2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#13251C] text-[#F3F5F0] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F2900E]" />
            <span>{content.heroBadge}</span>
          </span>
          <h1 className="font-display uppercase text-4xl sm:text-6xl tracking-tight text-[#13251C] leading-[0.95]">
            {content.heroHeadingLine1} <br />
            {content.heroHeadingLine2}
          </h1>
          <p className="text-base sm:text-lg text-[#3C4536] max-w-2xl mx-auto leading-relaxed">
            {content.heroDescription}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#13251C] text-[#F3F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {content.stats.map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="font-display uppercase text-3xl sm:text-4xl text-[#F3F5F0]">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-[#B4BEA8] font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 sm:py-28 bg-[#F3F5F0] border-b border-[#D8DED2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54] block">
            {content.aboutLabel}
          </span>
          <div className="space-y-5 text-sm sm:text-base text-[#3C4536] leading-relaxed">
            {content.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="font-display uppercase text-xl sm:text-2xl text-[#13251C] tracking-tight pt-4">
            {content.aboutTagline}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-28 bg-[#F3F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54] block">
                {content.missionLabel}
              </span>
              <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C] tracking-tight">
                {content.missionHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#3C4536] leading-relaxed">
                {content.missionDescription}
              </p>
              <ul className="space-y-3 pt-2">
                {content.missionBullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3 text-sm text-[#13251C] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[#F2900E] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F2900E] hover:bg-white text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  <span>{content.missionPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#13251C] hover:bg-white text-white hover:text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{content.missionSecondaryCta}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-square bg-white rounded-sm p-8 border border-[#D8DED2] flex items-center justify-center">
              <div className="relative w-full h-full">
                <Ball3D
                  src="/balls/ft550b.webp"
                  alt="Mikasa FT550B FIFA Quality Pro"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why teams order from us */}
      <section className="py-20 sm:py-28 bg-[#F3F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#D8DED2] border border-[#D8DED2] rounded-sm overflow-hidden">
            {content.capabilities.map((c) => (
              <div key={c.title} className="bg-[#F3F5F0] p-8">
                <h3 className="font-display uppercase text-2xl text-[#13251C] mb-2.5 tracking-tight">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#3C4536]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
