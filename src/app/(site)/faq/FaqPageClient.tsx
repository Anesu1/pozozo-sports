'use client';

import { useState } from 'react';
import { FaqEntry } from '@/types';

interface FaqPageClientProps {
  faqs: FaqEntry[];
  heading: string;
  description: string;
}

export function FaqPageClient({ faqs: FAQS, heading, description }: FaqPageClientProps) {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div className="bg-[#F3F5F0] min-h-screen">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#13251C] mb-3.5">
          {heading}
        </h1>
        <p className="text-[17px] sm:text-[17.5px] text-[#3C4536] mb-9">{description}</p>

        <div className="border border-[#D8DED2] rounded-sm bg-white overflow-hidden">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-[#D8DED2] last:border-b-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full text-left p-5 sm:p-6 flex gap-5 items-center"
                >
                  <span className="flex-1 text-[15.5px] sm:text-base font-bold text-[#13251C]">
                    {faq.q}
                  </span>
                  <span className="text-lg font-bold text-[#1678A0]">{isOpen ? '–' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed text-[#3C4536] max-w-[62ch]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
