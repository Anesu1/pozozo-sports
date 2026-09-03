import { Metadata } from 'next';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { guidesPageQuery, journalPostsQuery } from '@/sanity/lib/queries';
import { GuidesPageContent, JournalPost } from '@/types';

export const metadata: Metadata = {
  title: 'Guides & Articles',
  description: 'Everything worth knowing before you send a list, and after the balls arrive.',
  alternates: { canonical: '/guides' },
};

export default async function GuidesPage() {
  const [{ data: journalsData }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: journalPostsQuery }),
    sanityFetch({ query: guidesPageQuery }),
  ]);
  const JOURNALS = journalsData as JournalPost[];
  const content = contentData as GuidesPageContent;

  return (
    <div className="bg-[#F3F5F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54] mb-6">
          <Link href="/" className="hover:text-[#13251C]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#13251C]">Guides</span>
        </div>

        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#13251C] mb-3.5">
          {content.heading}
        </h1>
        <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3C4536] max-w-[56ch] mb-10">
          {content.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.tiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className={
                tile.inverted
                  ? 'bg-[#13251C] text-white rounded-sm p-7 flex flex-col gap-2.5 min-h-[210px] transition-colors'
                  : 'bg-white border border-[#D8DED2] hover:border-[#13251C] rounded-sm p-7 flex flex-col gap-2.5 min-h-[210px] transition-colors'
              }
            >
              <h2
                className={`font-display uppercase text-xl ${tile.inverted ? 'text-[#F2900E]' : ''}`}
              >
                {tile.title}
              </h2>
              <p className="text-sm text-[#3C4536] leading-relaxed">{tile.body}</p>
              <div className="flex-1" />
              <span
                className={`text-[13px] font-bold ${
                  tile.inverted ? 'text-[#F2900E]' : 'text-[#1678A0]'
                }`}
              >
                Read →
              </span>
            </Link>
          ))}
        </div>

        <h2 className="font-display uppercase text-2xl sm:text-3xl mt-16 mb-6">{content.furtherReadingHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {JOURNALS.map((j) => (
            <Link
              key={j.slug}
              href={`/journal/${j.slug}`}
              className="bg-white border border-[#D8DED2] hover:border-[#13251C] rounded-sm p-6 flex flex-col gap-2 transition-colors"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#5B6B54]">
                {j.category} · {j.readTime}
              </div>
              <h3 className="font-bold text-[#13251C] text-base line-clamp-2">{j.title}</h3>
              <p className="text-sm text-[#3C4536] line-clamp-2">{j.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
