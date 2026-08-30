import { Metadata } from 'next';
import { SUPPLY } from '@/data/supply';
import { getWhatsAppUrl } from '@/data/sportsConfig';

export const metadata: Metadata = {
  title: 'Who We Supply',
  description: 'Schools, clubs, academies, leagues and the shops that resell to them.',
  alternates: { canonical: '/who-we-supply' },
};

export default function WhoWeSupplyPage() {
  const waUrl = getWhatsAppUrl(
    'Hello Pozozo Sports, I would like to know more about becoming a listed customer.'
  );

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl mb-3.5">
        Who we supply
      </h1>
      <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3C4536] max-w-[56ch] mb-9">
        Schools, clubs, academies, leagues and the shops that resell to them. Here&apos;s the shape
        of it.
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
          &quot;They kitted out our whole netball programme in one order, and the second season
          they remembered exactly what we&apos;d bought.&quot;
        </p>
        <div className="text-sm font-bold">Head of sport, secondary school</div>
        <div className="text-[13px] text-[#8B9782] mt-1">Harare</div>
      </div>

      <div className="bg-white border border-dashed border-[#BCC4B4] rounded-sm p-8 flex gap-6 items-center flex-wrap">
        <div>
          <h2 className="font-display uppercase text-2xl mb-2">Your name could sit here</h2>
          <p className="text-[15.5px] text-[#3C4536]">
            We list customers only with written permission. If you&apos;d like your school or club
            named, tell us.
          </p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[50px] px-6 bg-[#13251C] text-white flex items-center rounded-sm text-sm font-bold hover:bg-[#F2900E] hover:text-[#13251C] transition-colors"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
