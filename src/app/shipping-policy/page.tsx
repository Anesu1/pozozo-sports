import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'See how bulk and individual ball orders are processed, delivered nationwide, and handled for collection.',
  alternates: { canonical: '/shipping-policy' },
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-2 block">
            LEGAL &amp; POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">
            Shipping Policy
          </h1>
          <p className="text-xs text-[#757575]">Effective Date: June 25, 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#555555] space-y-6 text-sm leading-relaxed border-t border-[#E8E4DF] pt-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">1. Overview</h2>
            <p>
              This Shipping Policy explains how ball orders are delivered once your enquiry is confirmed. We deliver genuine Molten and Mikasa balls and accessories nationwide, and also offer direct collection from our Lusaka distribution point.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Order Processing</h2>
            <p>
              Once you confirm a quotation sent on WhatsApp or by email, we begin preparing your order — usually within 1-2 business days. Processing can take a little longer at the start of school terms or around public holidays. Enquiries received over a weekend or public holiday are picked up the next business day.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. Shipping Methods &amp; Times</h2>
            <p>
              Standard nationwide delivery by courier or bus arrives within 2-5 business days depending on destination. Lusaka orders can usually be delivered, or made ready for collection, the same or next business day. We currently deliver within Zambia only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">4. Shipping Costs</h2>
            <p>
              Delivery cost depends on order size, weight, and destination, and is confirmed in your quotation before you commit — there is no checkout on this site to add surprise fees. Bulk orders for schools and clubs often qualify for reduced or waived delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">5. Tracking Your Order</h2>
            <p>
              Once your order is dispatched, we confirm the courier or bus details directly on WhatsApp or by email, along with an estimated arrival time. Institutional orders include a delivery note for your records.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
