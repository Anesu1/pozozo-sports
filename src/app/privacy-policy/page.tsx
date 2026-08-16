import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – Pozozo Sports',
  description: 'Learn how customer information is collected, protected, and used.',
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
              This Privacy Policy explains how Pozozo Sports collects, uses, and protects your information when you browse our catalogue, send an enquiry, or contact our support team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">2. Information We Collect</h2>
            <p>
              We collect information provided directly when placing orders, including name, shipping address, contact email, phone number, and order preferences. We never store credit card numbers on our servers; transactions are processed through encrypted PCI-DSS compliant payment gateways.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#1A1A1A]">3. How We Use Data</h2>
            <p>
              Your data is exclusively used to fulfill orders, issue tracking alerts, process returns, prevent fraud, and send optional newsletter style updates if opted in. We never sell your personal data to third-party data brokers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
