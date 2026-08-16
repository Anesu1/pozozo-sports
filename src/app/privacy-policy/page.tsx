import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how customer information is collected, protected, and used when you enquire with Pozozo Sports.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-2 block">
            LEGAL &amp; POLICIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#757575]">Effective Date: June 25, 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#555555] space-y-6 text-sm leading-relaxed border-t border-[#E8E4DF] pt-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Pozozo Sports collects, uses, and protects your information when you browse our catalogue, send an enquiry on WhatsApp or email, or contact our support team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Information We Collect</h2>
            <p>
              We collect what you give us directly when you send an enquiry or request a quotation — typically your name, phone number or email, delivery location, and the school, club, or organisation you&apos;re ordering for. Enquiries sent via WhatsApp also pass through Meta&apos;s own platform and are subject to WhatsApp&apos;s privacy policy. We do not collect or store payment card details on this website, because no payment is processed here.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. How We Use Data</h2>
            <p>
              Your information is used only to prepare quotations, confirm and deliver orders, arrange invoices for institutions, and answer your questions. We never sell your personal data to third parties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
