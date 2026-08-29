import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how cookies support your enquiry list, wishlist, and site functionality.',
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54] mb-2 block">
            LEGAL &amp; POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#13251C] tracking-tight mb-2">
            Cookie Policy
          </h1>
          <p className="text-xs text-[#5B6B54]">Effective Date: June 25, 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#3C4536] space-y-6 text-sm leading-relaxed border-t border-[#E7EAE1] pt-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#13251C]">1. What Cookies Are</h2>
            <p>
              Cookies and local storage help this site function properly by remembering your active enquiry list and saved wishlist balls between visits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#13251C]">2. Essential Site Cookies</h2>
            <p>
              These are required to keep your enquiry list and wishlist intact as you browse between pages, since there is no account login or checkout on this site. You can clear them at any time in your browser settings, which resets your saved list.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
