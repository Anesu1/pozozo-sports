import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the terms governing enquiries, quotations, bulk orders, and use of the Pozozo Sports website.',
  alternates: { canonical: '/terms-of-service' },
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
              These Terms of Service govern your use of the Pozozo Sports website, including browsing the catalogue, sending enquiries, requesting quotations, and placing bulk orders with our sales desk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Products &amp; Pricing</h2>
            <p>
              We strive to represent ball models, specifications, and stock accurately. Amounts can be displayed in several currencies for reference, but all orders are quoted, invoiced, and paid in Zambian Kwacha (ZMW) unless otherwise agreed. Prices are indicative and may change without notice — the price and stock we confirm in your quotation is what applies to your order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. Order Acceptance</h2>
            <p>
              An order is only confirmed once you accept a quotation sent by our sales desk on WhatsApp or email. We reserve the right to decline or cancel an enquiry in cases of suspected fraud, incorrect pricing, or genuine stock shortages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">4. Payment</h2>
            <p>
              No payment is collected through this website and no card details are ever requested here. Confirmed orders are settled on collection, on delivery, or against invoice for approved schools, clubs, and institutions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
