import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react';
import { JOURNALS } from '@/data/journals';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return JOURNALS.map((j) => ({
    slug: j.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const journal = JOURNALS.find((j) => j.slug === params.slug);
  if (!journal) {
    return { title: 'Journal – ECOM®' };
  }
  return {
    title: `${journal.title} – ECOM® Journal`,
    description: journal.excerpt,
    openGraph: {
      title: journal.title,
      description: journal.excerpt,
      images: [journal.coverImage],
    },
  };
}

export default function JournalDetailPage({ params }: PageProps) {
  const journal = JOURNALS.find((j) => j.slug === params.slug);

  if (!journal) {
    notFound();
  }

  const related = JOURNALS.filter((j) => j.id !== journal.id).slice(0, 3);

  return (
    <article className="py-12 sm:py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#757575] hover:text-[#1A1A1A] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to all stories</span>
        </Link>

        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="bg-[#1A1A1A] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
              {journal.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-[#757575]">
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

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
            {journal.title}
          </h1>

          <p className="text-base sm:text-xl text-[#757575] leading-relaxed">
            {journal.excerpt}
          </p>

          {/* Author Badge */}
          <div className="pt-4 border-t border-[#E8E4DF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-center">
                {journal.author.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  {journal.author.name}
                </h4>
                <p className="text-[11px] text-[#757575]">{journal.author.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 border border-[#E8E4DF] shadow-lg">
          <Image
            src={journal.coverImage}
            alt={journal.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
          {journal.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight pt-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[#555555] leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bulletPoints && (
                <ul className="space-y-2 my-4 pl-4 border-l-2 border-[#1A1A1A] text-sm sm:text-base text-[#1A1A1A] font-medium">
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
        <section className="mt-20 pt-16 border-t border-[#E8E4DF]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold text-[#1A1A1A]">Related Stories</h3>
            <Link
              href="/journal"
              className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:underline"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/journal/${item.slug}`}
                className="group p-5 bg-[#F6F4F1] rounded-2xl border border-[#E8E4DF] hover:shadow-md transition-all space-y-3"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#757575]">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-black line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1A1A1A] group-hover:underline">
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
