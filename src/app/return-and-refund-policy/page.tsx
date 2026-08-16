import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
  description: 'Understand return windows, faulty-ball claims, exchanges, and refunds on Pozozo Sports orders.',
  alternates: { canonical: '/return-and-refund-policy' },
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
            <h2 className="text-base font-bold text-[#1A1A1A]">1. 30-Day Fault Window</h2>
            <p>
              Manufacturing faults are covered. If a ball splits, loses shape, or otherwise fails outside of normal play within 30 days of delivery or collection, send us a photo of the valve area and the fault and we&apos;ll arrange a replacement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Return Conditions</h2>
            <p>
              To qualify, the ball must be returned with its original packaging and manufacturer hologram or serial stamp intact. Wear from play on the wrong surface — for example an indoor leather ball used outdoors — is not treated as a fault, which is why we set out surface guidance in our care guide.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. Exchanges</h2>
            <p>
              If you ordered the wrong size or sport by mistake, tell us before the ball has been used and we&apos;ll arrange an exchange, subject to stock. Bulk and institutional orders can usually swap sizes within the same quotation before delivery is confirmed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">4. Refund Processing</h2>
            <p>
              Where a refund is agreed instead of a replacement, it is paid back the same way you paid us — mobile money, bank transfer, or cash on collection — usually within 3-5 business days of the ball being returned and inspected.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
