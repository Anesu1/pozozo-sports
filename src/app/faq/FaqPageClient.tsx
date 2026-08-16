'use client';

import { useState } from 'react';
import { FAQS } from '@/data/faqs';

export function FaqPageClient() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div className="bg-[#EEF1F5] min-h-screen">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0E1726] mb-3.5">
          Questions
        </h1>
        <p className="text-[17px] sm:text-[17.5px] text-[#3A4557] mb-9">
          If yours isn&apos;t here, message us — we answer the awkward ones too.
        </p>

        <div className="border border-[#D3DAE4] rounded-sm bg-white overflow-hidden">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-[#D3DAE4] last:border-b-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full text-left p-5 sm:p-6 flex gap-5 items-center"
                >
                  <span className="flex-1 text-[15.5px] sm:text-base font-bold text-[#0E1726]">
                    {faq.q}
                  </span>
                  <span className="text-lg font-bold text-[#1E3A5F]">{isOpen ? '–' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed text-[#3A4557] max-w-[62ch]">
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
