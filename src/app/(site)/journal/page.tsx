import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/live';
import { journalIndexPageQuery, journalPostsQuery } from '@/sanity/lib/queries';
import { JournalIndexPageContent, JournalPost } from '@/types';

export const metadata: Metadata = {
  title: 'Ball Guides & Articles',
  description: 'Practical guides on choosing, sizing and caring for match and training balls, from the Pozozo Sports team.',
  alternates: { canonical: '/journal' },
};

export default async function JournalIndexPage() {
  const [{ data: journalsData }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: journalPostsQuery }),
    sanityFetch({ query: journalIndexPageQuery }),
  ]);
  const JOURNALS = journalsData as JournalPost[];
  const content = contentData as JournalIndexPageContent;
  const featured = JOURNALS[0];
  const rest = JOURNALS.slice(1);

  return (
    <div className="py-12 sm:py-20 bg-[#F3F5F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E7EAE1] border border-[#D8DED2] text-xs font-bold text-[#13251C] uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{content.badge}</span>
          </div>
          <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#13251C] mb-4">
            {content.heading}
          </h1>
          <p className="text-sm sm:text-base text-[#5B6B54]">{content.description}</p>
        </div>

        {/* Featured Story */}
        {featured && (
          <div className="mb-16">
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-sm overflow-hidden border border-[#D8DED2] hover:shadow-2xl transition-all"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#13251C] text-white px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider">
                      {featured.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#5B6B54]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-display uppercase text-2xl sm:text-3xl lg:text-4xl text-[#13251C] group-hover:text-black leading-tight">
                    {featured.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#5B6B54] leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#D8DED2] flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-[#13251C] block">By {featured.author.name}</span>
                    <span className="text-[#5B6B54]">{featured.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#13251C] group-hover:underline">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* All Other Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((journal) => (
            <article
              key={journal.id}
              className="group flex flex-col bg-white rounded-sm overflow-hidden border border-[#D8DED2] hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F5F0]">
                <Image
                  src={journal.coverImage}
                  alt={journal.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-extrabold uppercase tracking-wider text-[#13251C]">
                  {journal.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#5B6B54]">
                    <span>{journal.date}</span>
                    <span>•</span>
                    <span>{journal.readTime}</span>
                  </div>
                  <h3 className="font-display uppercase text-xl text-[#13251C] group-hover:text-black line-clamp-2">
                    <Link href={`/journal/${journal.slug}`}>{journal.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6B54] line-clamp-3 leading-relaxed">
                    {journal.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D8DED2] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#13251C]">By {journal.author.name}</span>
                  <Link
                    href={`/journal/${journal.slug}`}
                    className="text-xs font-bold text-[#13251C] flex items-center gap-1 group-hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
