import Link from 'next/link';
import { Metadata } from 'next';
import { Ball3D } from '@/components/ball3d/Ball3D';
import { sanityFetch } from '@/sanity/lib/live';
import { carePageQuery, careTipsQuery } from '@/sanity/lib/queries';
import { CarePageContent, CareTip } from '@/types';

export const metadata: Metadata = {
  title: 'Ball Care & Inflation',
  description:
    'Most balls that "wear out" in a term were simply run at the wrong pressure. Five habits that get you a season more.',
  alternates: { canonical: '/care' },
};

export default async function CarePage() {
  const [{ data: careData }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: careTipsQuery }),
    sanityFetch({ query: carePageQuery }),
  ]);
  const CARE = careData as CareTip[];
  const content = contentData as CarePageContent;

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl mb-3.5">
        {content.heading}
      </h1>
      <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3C4536] max-w-[56ch] mb-10">
        {content.description}
      </p>

      <div className="flex flex-col gap-4 mb-11">
        {CARE.map((c) => (
          <div
            key={c.n}
            className="bg-white border border-[#D8DED2] rounded-sm p-7 flex gap-5 items-start"
          >
            <div className="font-display text-2xl text-[#1678A0] min-w-[34px]">{c.n}</div>
            <div>
              <h2 className="text-lg font-bold text-[#13251C] mb-2">{c.title}</h2>
              <p className="text-[15.5px] leading-relaxed text-[#3C4536]">{c.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13251C] text-[#F3F5F0] rounded-sm p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <div className="text-[11px] font-bold tracking-[0.22em] text-[#8B9782] mb-3">
            {content.gaugeKicker}
          </div>
          <h2 className="font-display uppercase text-3xl mb-3.5">{content.gaugeHeading}</h2>
          <p className="text-base text-[#B4BEA8] max-w-[40ch] mb-5">{content.gaugeDescription}</p>
          <Link
            href="/product/ag500"
            className="inline-flex h-[50px] px-6 items-center bg-[#F2900E] text-[#13251C] rounded-sm text-sm font-bold hover:bg-white transition-colors"
          >
            {content.gaugeCta}
          </Link>
        </div>
        <div className="relative h-[180px]">
          <Ball3D
            src="/balls/ag500.webp"
            alt="Mikasa AG500 digital pressure gauge"
            flat
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
