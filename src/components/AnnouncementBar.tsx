'use client';

import React from 'react';

const MESSAGES = [
  "ENQUIRE, DON'T CHECKOUT",
  'GENUINE MOLTEN & MIKASA',
  'SAME-DAY QUOTES ON WHATSAPP',
  'BULK PRICING FOR SCHOOLS',
];

export function AnnouncementBar() {
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className="bg-[#F2C230] text-[#0E1726] overflow-hidden h-[38px] flex items-center">
      <div className="flex gap-11 whitespace-nowrap animate-marquee pr-11 text-[11.5px] font-bold tracking-[0.22em]">
        {track.map((msg, i) => (
          <React.Fragment key={i}>
            <span>{msg}</span>
            <span>·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
