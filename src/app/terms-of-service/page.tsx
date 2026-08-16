import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service – Pozozo Sports',
  description: 'Review terms governing orders, accounts, promotions, and website use.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-2 block">
            LEGAL &amp; POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-[#757575]">Effective Date: June 25, 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#555555] space-y-6 text-sm leading-relaxed border-t border-[#E8E4DF] pt-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">1. Overview</h2>
            <p>
              These Terms of Service govern your use of our fashion e-commerce store, including placing orders, applying promo codes, and interacting with customer support.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Products &amp; Pricing</h2>
            <p>
              We strive to represent colors, fabrics, and fits with utmost fidelity. Prices are listed in your selected currency and may be updated periodically without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. Order Acceptance</h2>
            <p>
              Receipt of an order confirmation signifies our receipt of your order request. We reserve the right to decline or cancel orders in cases of fraud prevention or inventory shortages.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
