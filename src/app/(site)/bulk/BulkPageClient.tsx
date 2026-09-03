'use client';

import { useState } from 'react';
import { getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';
import { BANDS } from '@/data/pricingBands';

export function BulkPageClient() {
  const [who, setWho] = useState('');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');

  const bulkMessage = `Hello Pozozo Sports, bulk enquiry.\n\nFrom: ${who || '—'}\nNeeded: ${what || '—'}\nDelivery to: ${where || '—'}\n\nPlease send a quote with bulk pricing.`;
  const bulkWaUrl = getWhatsAppUrl(bulkMessage);
  const bulkMailUrl = getMailtoUrl('Bulk enquiry — Pozozo Sports', bulkMessage);

  return (
    <div className="bg-[#F3F5F0] text-[#13251C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left column */}
          <div>
            <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-4">
              Bulk & schools
            </h1>
            <p className="text-base sm:text-[17.5px] leading-relaxed text-[#3C4536] max-w-[46ch] mb-7">
              Tell us the sport, the sizes and how many. We&apos;ll come back with bulk pricing and hold stock
              while your order is approved.
            </p>

            <div className="flex flex-col gap-3.5 mb-9">
              {BANDS.map((band) => (
                <div
                  key={band.qty}
                  className="bg-white border border-[#D8DED2] rounded-sm p-5 flex gap-5 items-center"
                >
                  <span className="font-display text-2xl text-[#1678A0] min-w-[78px]">{band.qty}</span>
                  <span className="text-[15px] text-[#3C4536] leading-relaxed">{band.what}</span>
                </div>
              ))}
            </div>

            <h2 className="font-display uppercase text-xl sm:text-2xl mb-3.5">
              How it works for institutions
            </h2>
            <ol className="flex flex-col gap-2.5 text-[15px] sm:text-[15.5px] leading-relaxed text-[#3C4536] list-decimal pl-5">
              <li>Send the list. A quotation comes back with unit and total pricing, valid for 14 days.</li>
              <li>Take it for approval. We hold the stock against your quote number.</li>
              <li>On approval we invoice, deliver, and include the delivery note for your file.</li>
            </ol>
          </div>

          {/* Right column — enquiry form */}
          <div className="bg-white border border-[#D8DED2] rounded-sm p-7 sm:p-9">
            <h2 className="text-lg font-bold text-[#13251C] mb-5">Send a bulk enquiry</h2>

            <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#5B6B54] tracking-wider mb-4 block">
              NAME / ORGANISATION
              <input
                value={who}
                onChange={(e) => setWho(e.target.value)}
                placeholder="e.g. Chisipite Girls Secondary"
                className="h-[46px] w-full px-4 border border-[#D8DED2] rounded-sm text-[14.5px] outline-none focus:border-[#13251C]"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#5B6B54] tracking-wider mb-4 block">
              WHAT DO YOU NEED?
              <textarea
                rows={4}
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                placeholder="e.g. 24 size 5 netballs, 10 size 7 basketballs, 2 pumps"
                className="w-full px-4 py-3 border border-[#D8DED2] rounded-sm text-[14.5px] outline-none focus:border-[#13251C] resize-y leading-relaxed"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#5B6B54] tracking-wider mb-4 block">
              DELIVERING TO
              <input
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="Town or city"
                className="h-[46px] w-full px-4 border border-[#D8DED2] rounded-sm text-[14.5px] outline-none focus:border-[#13251C]"
              />
            </label>

            <div className="flex gap-2.5">
              <a
                href={bulkWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-[50px] grid place-items-center bg-[#F2900E] hover:bg-[#13251C] hover:text-white text-[#13251C] text-sm font-bold rounded-sm transition-colors"
              >
                Send on WhatsApp
              </a>
              <a
                href={bulkMailUrl}
                className="flex-1 h-[50px] grid place-items-center border border-[#13251C] hover:bg-[#13251C] hover:text-white text-[#13251C] text-sm font-bold rounded-sm transition-colors"
              >
                Send by email
              </a>
            </div>
            <p className="text-xs text-[#5B6B54] leading-relaxed mt-3">
              Nothing sends until you tap — the buttons open WhatsApp or your mail app with the message
              written.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
