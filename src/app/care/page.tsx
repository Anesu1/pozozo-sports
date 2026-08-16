import Link from 'next/link';
import { Ball3D } from '@/components/ball3d/Ball3D';
import { CARE } from '@/data/care';

export const metadata = {
  title: 'Ball Care & Inflation – Pozozo Sports',
  description:
    'Most balls that "wear out" in a term were simply run at the wrong pressure. Five habits that get you a season more.',
};

export default function CarePage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl mb-3.5">
        Care & inflation
      </h1>
      <p className="text-[17px] sm:text-[17.5px] leading-relaxed text-[#3A4557] max-w-[56ch] mb-10">
        Most balls that &quot;wear out&quot; in a term were simply run at the wrong pressure. Five
        habits that get you a season more.
      </p>

      <div className="flex flex-col gap-4 mb-11">
        {CARE.map((c) => (
          <div
            key={c.n}
            className="bg-white border border-[#D3DAE4] rounded-sm p-7 flex gap-5 items-start"
          >
            <div className="font-display text-2xl text-[#1E3A5F] min-w-[34px]">{c.n}</div>
            <div>
              <h2 className="text-lg font-bold text-[#0E1726] mb-2">{c.title}</h2>
              <p className="text-[15.5px] leading-relaxed text-[#3A4557]">{c.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0E1726] text-[#EEF1F5] rounded-sm p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <div className="text-[11px] font-bold tracking-[0.22em] text-[#8494AC] mb-3">
            THE ONE TOOL WORTH BUYING
          </div>
          <h2 className="font-display uppercase text-3xl mb-3.5">Mikasa AG500 gauge</h2>
          <p className="text-base text-[#A7B4C7] max-w-[40ch] mb-5">
            One digital gauge in the kit bag keeps a whole set of balls at match pressure. Cheaper
            than replacing two balls a season.
          </p>
          <Link
            href="/product/ag500"
            className="inline-flex h-[50px] px-6 items-center bg-[#F2C230] text-[#0E1726] rounded-sm text-sm font-bold hover:bg-white transition-colors"
          >
            View the gauge
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
