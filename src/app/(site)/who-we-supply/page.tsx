import { Metadata } from 'next';
import { getWhatsAppUrl } from '@/data/sportsConfig';
import { sanityFetch } from '@/sanity/lib/live';
import { supplyStatsQuery, whoWeSupplyPageQuery } from '@/sanity/lib/queries';
import { SupplyStat, WhoWeSupplyPageContent } from '@/types';

export const metadata: Metadata = {
  title: 'Who We Supply',
  description: 'Schools, clubs, academies, leagues and the shops that resell to them.',
  alternates: { canonical: '/who-we-supply' },
};

export default async function WhoWeSupplyPage() {
  const [{ data }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: supplyStatsQuery }),
    sanityFetch({ query: whoWeSupplyPageQuery }),
  ]);
  const SUPPLY = data as SupplyStat[];
  const content = contentData as WhoWeSupplyPageContent;
  const waUrl = getWhatsAppUrl(
    'Hello Pozozo Sports, I would like to know more about becoming a listed customer.'
  );

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl mb-3.5">
        {content.heading}
      </h1>
      <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3C4536] max-w-[56ch] mb-9">
        {content.description}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D8DED2] border border-[#D8DED2] rounded-sm overflow-hidden mb-11">
        {SUPPLY.map((s) => (
          <div key={s.n} className="bg-[#F3F5F0] p-7">
            <div className="font-display text-4xl text-[#13251C]">{s.n}</div>
            <div className="text-sm text-[#3C4536] mt-2 leading-relaxed">{s.what}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#13251C] text-[#F3F5F0] rounded-sm p-9 sm:p-11 mb-11">
        <p className="text-xl sm:text-[22px] leading-relaxed mb-5 max-w-[44ch]">
          &quot;{content.testimonialQuote}&quot;
        </p>
        <div className="text-sm font-bold">{content.testimonialAuthor}</div>
        <div className="text-[13px] text-[#8B9782] mt-1">{content.testimonialLocation}</div>
      </div>

      <div className="bg-white border border-dashed border-[#BCC4B4] rounded-sm p-8 flex gap-6 items-center flex-wrap">
        <div>
          <h2 className="font-display uppercase text-2xl mb-2">{content.ctaHeading}</h2>
          <p className="text-[15.5px] text-[#3C4536]">{content.ctaDescription}</p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[50px] px-6 bg-[#13251C] text-white flex items-center rounded-sm text-sm font-bold hover:bg-[#F2900E] hover:text-[#13251C] transition-colors"
        >
          {content.ctaLabel}
        </a>
      </div>
    </div>
  );
}
