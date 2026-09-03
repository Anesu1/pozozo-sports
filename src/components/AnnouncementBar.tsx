'use client';

import React from 'react';

interface AnnouncementBarProps {
  messages: string[];
}

export function AnnouncementBar({ messages }: AnnouncementBarProps) {
  const track = [...messages, ...messages];

  return (
    <div className="bg-[#F2900E] text-[#13251C] overflow-hidden h-[38px] flex items-center">
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
