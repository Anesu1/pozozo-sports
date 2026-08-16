import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy – Pozozo Sports',
  description: 'Learn how cookies support shopping bag, currency preferences, and store functionality.',
};

export default function CookiePolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-2 block">
            LEGAL &amp; POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">
            Cookie Policy
          </h1>
          <p className="text-xs text-[#757575]">Effective Date: June 25, 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#555555] space-y-6 text-sm leading-relaxed border-t border-[#E8E4DF] pt-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">1. What Cookies Are</h2>
            <p>
              Cookies and local storage help our store function properly by remembering your active shopping cart items, saved wishlist garments, region currency preferences, and session tokens.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Essential Shopping Cookies</h2>
            <p>
              Essential cookies are required to preserve your cart items as you navigate across pages and finalize checkout securely. You can control cookie preferences in your browser settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
