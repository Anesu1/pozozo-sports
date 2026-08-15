import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return & Refund Policy – ECOM®',
  description: 'Understand return windows, item condition requirements, exchanges, and refunds.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-2 block">
            LEGAL &amp; POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">
            Return &amp; Refund Policy
          </h1>
          <p className="text-xs text-[#757575]">Effective Date: June 25, 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#555555] space-y-6 text-sm leading-relaxed border-t border-[#E8E4DF] pt-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">1. 30-Day Return Window</h2>
            <p>
              We want you to feel confident when shopping for wardrobe essentials. You may initiate a return or exchange for any eligible product within 30 calendar days of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Return Conditions</h2>
            <p>
              Returned items must be in their original unworn, unwashed condition with all garment tags and packaging intact. We suggest trying on footwear and bottoms on indoor clean surfaces.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. Exchanges</h2>
            <p>
              If you require a different size or alternative color, we provide free size exchanges with prioritized shipment of your replacement item as soon as the return is scanned by the courier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">4. Refund Processing</h2>
            <p>
              Refunds are processed to the original payment method within 3-5 business days of inspection at our facility.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
