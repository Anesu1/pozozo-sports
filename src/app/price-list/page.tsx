import { PRODUCTS } from '@/data/products';
import { getWhatsAppUrl } from '@/data/sportsConfig';

export const metadata = {
  title: 'Stock List – Pozozo Sports',
  description: 'Everything we carry, by sport, ready for procurement.',
};

export default function PriceListPage() {
  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, please send me your priced stock list.');

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-3">
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl">Stock list</h1>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 bg-[#0E1726] text-white flex items-center rounded-sm text-sm font-bold hover:bg-[#F2C230] hover:text-[#0E1726] transition-colors"
        >
          Request a priced copy
        </a>
      </div>
      <p className="text-base sm:text-[16.5px] leading-relaxed text-[#3A4557] max-w-[60ch] mb-8">
        Everything we carry, by sport. Prices move with the exchange rate and with quantity, so we
        quote rather than publish — ask for a priced copy and we&apos;ll send one you can take to
        procurement.
      </p>

      <div className="border border-[#D3DAE4] rounded-sm overflow-hidden bg-white">
        <div className="grid grid-cols-[1fr_2fr_1.6fr] bg-[#0E1726] text-white text-[11px] font-bold tracking-widest">
          <div className="p-3.5">BRAND</div>
          <div className="p-3.5">MODEL</div>
          <div className="p-3.5">SPECIFICATION</div>
        </div>
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[1fr_2fr_1.6fr] border-t border-[#D3DAE4] text-[14.5px]"
          >
            <div className="p-3 text-[#55637A]">{product.brand}</div>
            <div className="p-3 font-semibold">{product.name}</div>
            <div className="p-3 text-[#3A4557]">{product.spec}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
