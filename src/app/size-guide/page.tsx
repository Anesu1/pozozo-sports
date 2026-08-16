import { Metadata } from 'next';
import { SIZES } from '@/data/sizeGuide';
import { getWhatsAppUrl } from '@/data/sportsConfig';

export const metadata: Metadata = {
  title: 'Ball Size Guide – Pozozo Sports',
  description: "The short answer for most school and club buyers, sport by sport.",
};

export default function SizeGuidePage() {
  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I need help choosing a ball size.');

  return (
    <div className="bg-[#EEF1F5] min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0E1726] mb-3.5">
          What size ball?
        </h1>
        <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3A4557] max-w-[56ch] mb-10">
          The short answer for most school and club buyers. If your league publishes its own rule,
          follow that — and if you tell us the age group when you enquire, we&apos;ll check it for
          you.
        </p>

        {SIZES.map((entry) => (
          <div key={entry.sport} className="mb-11">
            <h2 className="font-display uppercase text-2xl mb-1.5 text-[#0E1726]">{entry.sport}</h2>
            <p className="text-sm text-[#3A4557] mb-4 max-w-[60ch]">{entry.note}</p>
            <div className="border border-[#D3DAE4] rounded-sm overflow-hidden bg-white">
              <div className="grid grid-cols-3 bg-[#0E1726] text-white text-[11px] font-bold tracking-widest">
                <div className="p-3.5">SIZE</div>
                <div className="p-3.5">AGE GROUP</div>
                <div className="p-3.5">TYPICAL USE</div>
              </div>
              {entry.rows.map((row) => (
                <div
                  key={row.size}
                  className="grid grid-cols-3 border-t border-[#D3DAE4] text-[15px]"
                >
                  <div className="p-3.5 font-bold text-[#0E1726]">{row.size}</div>
                  <div className="p-3.5 text-[#3A4557]">{row.age}</div>
                  <div className="p-3.5 text-[#3A4557]">{row.use}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-[#F2C230] text-[#0E1726] rounded-sm p-8 flex gap-6 items-center flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <h2 className="font-display uppercase text-2xl mb-2">Still not sure?</h2>
            <p className="text-[15.5px] text-[#2A3342]">
              Tell us the age group and the league. We&apos;ll tell you the size and what it costs.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[50px] px-6 bg-[#0E1726] text-white flex items-center rounded-sm text-sm font-bold hover:bg-white hover:text-[#0E1726] transition-colors"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
