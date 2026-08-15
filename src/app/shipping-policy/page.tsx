import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy – ECOM®',
  description: 'See how orders are processed, shipped, tracked, and handled for worldwide deliveries.',
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
              This Shipping Policy explains how orders are processed and delivered for purchases made through our fashion e-commerce website. We ship apparel, accessories, and wardrobe essentials with the goal of getting your order to you safely and reliably.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Order Processing</h2>
            <p>
              Orders are usually processed within 1-2 business days after payment is confirmed. Processing times may vary during collection launches, sale periods, or holiday drops. Orders placed on weekends or public holidays begin processing on the next business day.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. Shipping Methods &amp; Times</h2>
            <p>
              Standard domestic delivery arrives within 2-4 business days. Express international air freight arrives within 4-7 business days to over 100 supported countries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">4. Shipping Costs</h2>
            <p>
              We offer free standard worldwide shipping on all orders over $150 USD. Orders below this threshold incur calculated flat carrier rates shown clearly at checkout.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">5. Tracking Your Order</h2>
            <p>
              Once your package departs our fulfilment centre, an automated dispatch email containing end-to-end tracking details and courier links will be sent to your email address.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
