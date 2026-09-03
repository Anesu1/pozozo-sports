import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { journalPostBySlugQuery, journalSlugsQuery } from '@/sanity/lib/queries';
import { JournalPost } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(journalSlugsQuery);
  return data as { slug: string }[];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data } = await sanityFetch({ query: journalPostBySlugQuery, params: { slug: params.slug } });
  const journal = data as (JournalPost & { related: JournalPost[] }) | null;
  if (!journal) {
    return { title: 'Guide' };
  }
  return {
    title: journal.title,
    description: journal.excerpt,
    alternates: { canonical: `/journal/${journal.slug}` },
    openGraph: {
      title: journal.title,
      description: journal.excerpt,
      images: [journal.coverImage],
    },
  };
}

export default async function JournalDetailPage(props: PageProps) {
  const params = await props.params;
  const { data } = await sanityFetch({ query: journalPostBySlugQuery, params: { slug: params.slug } });
  const journalData = data as (JournalPost & { related: JournalPost[] }) | null;

  if (!journalData) {
    notFound();
  }

  const { related, ...journal } = journalData;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: journal.title,
    description: journal.excerpt,
    image: [journal.coverImage],
    datePublished: new Date(journal.date).toISOString(),
    author: { '@type': 'Person', name: journal.author.name },
    publisher: { '@type': 'Organization', name: 'Pozozo Sports' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Guides & Articles', item: 'https://pozozosports.com/journal' },
      { '@type': 'ListItem', position: 2, name: journal.title, item: `https://pozozosports.com/journal/${journal.slug}` },
    ],
  };

  return (
    <article className="py-12 sm:py-20 bg-[#F3F5F0] min-h-screen">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5B6B54] hover:text-[#13251C] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to all guides</span>
        </Link>

        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="bg-[#13251C] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-sm">
              {journal.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-[#5B6B54]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {journal.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {journal.readTime}
              </span>
            </div>
          </div>

          <h1 className="font-display uppercase text-3xl sm:text-5xl text-[#13251C] tracking-tight leading-tight">
            {journal.title}
          </h1>

          <p className="text-base sm:text-xl text-[#5B6B54] leading-relaxed">
            {journal.excerpt}
          </p>

          {/* Author Badge */}
          <div className="pt-4 border-t border-[#D8DED2] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#13251C] text-white text-xs font-bold flex items-center justify-center">
                {journal.author.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-display uppercase text-xs sm:text-sm text-[#13251C]">
                  {journal.author.name}
                </h4>
                <p className="text-[11px] text-[#5B6B54]">{journal.author.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden mb-12 border border-[#D8DED2] shadow-lg">
          <Image
            src={journal.coverImage}
            alt={journal.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 text-base sm:text-lg text-[#13251C] leading-relaxed">
          {journal.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="font-display uppercase text-2xl sm:text-3xl text-[#13251C] tracking-tight pt-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[#3C4536] leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bulletPoints && (
                <ul className="space-y-2 my-4 pl-4 border-l-2 border-[#13251C] text-sm sm:text-base text-[#13251C] font-medium">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="leading-relaxed">
                      — {bp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Related Journals Section */}
        <section className="mt-20 pt-16 border-t border-[#D8DED2]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display uppercase text-2xl text-[#13251C]">Related Guides</h3>
            <Link
              href="/journal"
              className="text-xs font-bold uppercase tracking-wider text-[#13251C] hover:underline"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/journal/${item.slug}`}
                className="group p-5 bg-white rounded-sm border border-[#D8DED2] hover:shadow-md transition-all space-y-3"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B6B54]">
                  {item.category}
                </span>
                <h4 className="font-display uppercase text-sm text-[#13251C] group-hover:text-black line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 text-xs font-bold text-[#13251C] group-hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
