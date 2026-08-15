'use client';

import React from 'react';
import { MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppUrl } from '@/data/sportsConfig';

export function AnnouncementBar() {
  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I would like to inquire about match ball stock.');

  return (
    <div className="bg-[#12100E] text-[#F5F1E8] text-xs py-2 px-4 border-b border-[#2A2622]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Authorised stock tag */}
        <div className="hidden sm:flex items-center gap-2 font-medium tracking-wide text-white/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Authorised Molten &amp; Mikasa Stock — 100% Genuine Match Balls</span>
        </div>

        {/* Center: Live notification */}
        <div className="mx-auto sm:mx-0 flex items-center gap-2 text-center text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Same Day WhatsApp Quotes • School &amp; Club Bulk Discounts</span>
        </div>

        {/* Right: Direct WhatsApp trigger */}
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Chat: {STORE_CONFIG.displayPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
