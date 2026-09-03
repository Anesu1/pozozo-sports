import { Metadata } from 'next';
import { getWhatsAppUrl } from '@/data/sportsConfig';
import { sanityFetch } from '@/sanity/lib/live';
import { priceListPageQuery, productsQuery } from '@/sanity/lib/queries';
import { PriceListPageContent, Product } from '@/types';

export const metadata: Metadata = {
  title: 'Stock List',
  description: 'Everything we carry, by sport, ready for procurement.',
  alternates: { canonical: '/price-list' },
};

export default async function PriceListPage() {
  const [{ data }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: productsQuery }),
    sanityFetch({ query: priceListPageQuery }),
  ]);
  const PRODUCTS = data as Product[];
  const content = contentData as PriceListPageContent;
  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, please send me your priced stock list.');

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-3">
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl">{content.heading}</h1>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 bg-[#13251C] text-white flex items-center rounded-sm text-sm font-bold hover:bg-[#F2900E] hover:text-[#13251C] transition-colors"
        >
          {content.ctaLabel}
        </a>
      </div>
      <p className="text-base sm:text-[16.5px] leading-relaxed text-[#3C4536] max-w-[60ch] mb-8">
        {content.description}
      </p>

      <div className="border border-[#D8DED2] rounded-sm overflow-hidden bg-white">
        <div className="grid grid-cols-[1fr_2fr_1.6fr] bg-[#13251C] text-white text-[11px] font-bold tracking-widest">
          <div className="p-3.5">BRAND</div>
          <div className="p-3.5">MODEL</div>
          <div className="p-3.5">SPECIFICATION</div>
        </div>
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[1fr_2fr_1.6fr] border-t border-[#D8DED2] text-[14.5px]"
          >
            <div className="p-3 text-[#5B6B54]">{product.brand}</div>
            <div className="p-3 font-semibold">{product.name}</div>
            <div className="p-3 text-[#3C4536]">{product.spec}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
