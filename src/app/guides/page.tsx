import { Metadata } from 'next';
import Link from 'next/link';
import { JOURNALS } from '@/data/journals';

export const metadata: Metadata = {
  title: 'Guides – Pozozo Sports',
  description: 'Everything worth knowing before you send a list, and after the balls arrive.',
};

const GUIDE_TILES = [
  {
    href: '/size-guide',
    title: 'Ball sizes',
    body: 'Which size suits which age group, sport by sport.',
  },
  {
    href: '/care',
    title: 'Care & inflation',
    body: 'Pressure, needles, storage — a season more from every ball.',
  },
  {
    href: '/faq',
    title: 'FAQ',
    body: 'Delivery, payment, invoices, warranty, counterfeits.',
  },
  {
    href: '/price-list',
    title: 'Price list',
    body: 'The full stock list for procurement, ready to print or attach.',
    inverted: true,
  },
];

export default function GuidesPage() {
  return (
    <div className="bg-[#EEF1F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#55637A] mb-6">
          <Link href="/" className="hover:text-[#0E1726]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0E1726]">Guides</span>
        </div>

        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0E1726] mb-3.5">
          Guides
        </h1>
        <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3A4557] max-w-[56ch] mb-10">
          Everything worth knowing before you send a list, and after the balls arrive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GUIDE_TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className={
                tile.inverted
                  ? 'bg-[#0E1726] text-white rounded-sm p-7 flex flex-col gap-2.5 min-h-[210px] transition-colors'
                  : 'bg-white border border-[#D3DAE4] hover:border-[#0E1726] rounded-sm p-7 flex flex-col gap-2.5 min-h-[210px] transition-colors'
              }
            >
              <h2
                className={`font-display uppercase text-xl ${tile.inverted ? 'text-[#F2C230]' : ''}`}
              >
                {tile.title}
              </h2>
              <p className="text-sm text-[#3A4557] leading-relaxed">{tile.body}</p>
              <div className="flex-1" />
              <span
                className={`text-[13px] font-bold ${
                  tile.inverted ? 'text-[#F2C230]' : 'text-[#1E3A5F]'
                }`}
              >
                Read →
              </span>
            </Link>
          ))}
        </div>

        <h2 className="font-display uppercase text-2xl sm:text-3xl mt-16 mb-6">Further reading</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {JOURNALS.map((j) => (
            <Link
              key={j.slug}
              href={`/journal/${j.slug}`}
              className="bg-white border border-[#D3DAE4] hover:border-[#0E1726] rounded-sm p-6 flex flex-col gap-2 transition-colors"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#55637A]">
                {j.category} · {j.readTime}
              </div>
              <h3 className="font-bold text-[#0E1726] text-base line-clamp-2">{j.title}</h3>
              <p className="text-sm text-[#3A4557] line-clamp-2">{j.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
