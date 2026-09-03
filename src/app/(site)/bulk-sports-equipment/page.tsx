import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Boxes,
  FileCheck2,
  Truck,
  Percent,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { getWhatsAppUrl, STORE_CONFIG } from '@/data/sportsConfig';
import { JsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sp2clogistics.com';

export const metadata: Metadata = {
  title: 'Bulk Sports Equipment Zimbabwe | Wholesale Rates | SP2C Logistics',
  description:
    'Wholesale sports equipment and bulk match ball supply in Zimbabwe. Tiered discounts for schools, sports clubs, retailers, and sports federations. Instant quotes on WhatsApp.',
  alternates: { canonical: '/bulk-sports-equipment' },
  openGraph: {
    title: 'Bulk Sports Equipment Zimbabwe | Wholesale Supply',
    description:
      'Tiered bulk rates on genuine Molten, Mikasa, and Fox40 sports gear for schools, clubs, and sports retailers across Zimbabwe.',
    url: `${SITE_URL}/bulk-sports-equipment`,
    images: ['/balls/bg5000-a.webp'],
  },
};

export default function BulkSportsEquipmentPage() {
  const waUrl = getWhatsAppUrl(
    'Hello SP2C Logistics / Pozozo Trading, I am inquiring about wholesale / bulk sports equipment orders.'
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bulk Sports Equipment',
        item: `${SITE_URL}/bulk-sports-equipment`,
      },
    ],
  };

  const bulkTiers = [
    {
      tier: 'Club & Academy Pack',
      units: '6 – 12 Balls',
      discount: 'Institutional Tier 1',
      features: ['Ideal for club training & match days', 'Includes inflation needles', 'Same-day quotation'],
    },
    {
      tier: 'School Term Carton',
      units: '13 – 30 Balls',
      discount: 'Institutional Tier 2',
      features: ['Mixed sport codes allowed', '14-day pro-forma invoice price lock', 'Free Harare delivery'],
      featured: true,
    },
    {
      tier: 'Federation / Wholesaler',
      units: '31+ Balls',
      discount: 'Direct Wholesale Tier',
      features: ['Dedicated logistics manager', 'Scheduled provincial freight dispatch', 'Priority stock allocation'],
    },
  ];

  return (
    <div className="bg-[#F3F5F0] min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54]">
          <Link href="/" className="hover:text-[#13251C] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#13251C]">Bulk Sports Equipment</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13251C] text-[#F3F5F0] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#26362A] text-[#F2900E] text-xs font-bold uppercase tracking-wider">
              <Boxes className="w-4 h-4" />
              <span>Wholesale & Institutional Procurement</span>
            </span>
            <h1 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              Bulk Sports Equipment in Zimbabwe
            </h1>
            <p className="text-base sm:text-lg text-[#B4BEA8] leading-relaxed">
              SP2C Logistics / Pozozo Trading provides wholesale sports equipment distribution across Zimbabwe and the
              SADC region. Volume-tiered pricing on authentic Molten, Mikasa, and Fox40 gear with guaranteed serial
              authenticity.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 bg-[#F2900E] hover:bg-white text-[#13251C] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Request Bulk Wholesale Quote</span>
              </a>
              <Link
                href="/price-list"
                className="h-12 px-7 border border-[#26362A] hover:border-[#F3F5F0] text-[#F3F5F0] text-sm font-semibold rounded-sm transition-colors flex items-center gap-2"
              >
                <span>View Standard Price List</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Tiered Pricing</span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight text-[#13251C]">
            Volume Purchasing Tiers
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] leading-relaxed">
            Mix and match basketballs, footballs, netballs, and volleyballs to reach volume tier brackets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bulkTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-sm p-8 flex flex-col justify-between border ${
                tier.featured
                  ? 'bg-[#13251C] text-white border-[#13251C]'
                  : 'bg-white text-[#13251C] border-[#D8DED2]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-display uppercase text-2xl">{tier.tier}</h3>
                  {tier.featured && (
                    <span className="bg-[#F2900E] text-[#13251C] text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="font-display uppercase text-3xl text-[#F2900E]">{tier.units}</div>
                <p className={`text-xs font-bold uppercase tracking-wider ${tier.featured ? 'text-[#B4BEA8]' : 'text-[#5B6B54]'}`}>
                  {tier.discount}
                </p>
                <ul className="space-y-2.5 pt-4 border-t border-[#D8DED2]/30 text-xs sm:text-sm">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#F2900E] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full h-11 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    tier.featured
                      ? 'bg-[#F2900E] hover:bg-white text-[#13251C]'
                      : 'bg-[#13251C] hover:bg-[#F2900E] text-white hover:text-[#13251C]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire for this tier</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Procurement Perks */}
      <section className="border-t border-[#D8DED2] bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <FileCheck2 className="w-8 h-8 text-[#F2900E]" />
              <h3 className="font-display uppercase text-xl text-[#13251C]">Pro-Forma & VAT Ready</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                Full documentation provided for educational boards, corporate recreational clubs, and NGO grant budgets.
              </p>
            </div>
            <div className="space-y-2">
              <Truck className="w-8 h-8 text-[#F2900E]" />
              <h3 className="font-display uppercase text-xl text-[#13251C]">Freight & Logistics</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                Coordinated dispatch from Harare to Bulawayo, Mutare, Gweru, Masvingo, and cross-border SADC locations.
              </p>
            </div>
            <div className="space-y-2">
              <Percent className="w-8 h-8 text-[#F2900E]" />
              <h3 className="font-display uppercase text-xl text-[#13251C]">Custom Carton Builds</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                Combine footballs, basketballs, netballs, and referee whistles in one order to meet budget allocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Wholesale FAQ</span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">Bulk Ordering Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>What is the minimum quantity for bulk pricing?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Our initial bulk discount tier starts at 6 units. Greater price concessions apply for orders of 13+ and
              31+ units.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>How long is a bulk quotation valid?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              All formal pro-forma invoices and written quotes are price-locked and stock-reserved for 14 calendar days.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#D8DED2] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">
            Ready to Place a Bulk Order?
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] max-w-xl mx-auto">
            Contact our wholesale procurement desk on WhatsApp for immediate stock availability and tiered volume
            pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 bg-[#13251C] hover:bg-[#F2900E] text-white hover:text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Request Wholesale Pro-Forma</span>
            </a>
            <Link
              href="/school-sports-equipment"
              className="h-12 px-8 border border-[#BCC4B4] hover:border-[#13251C] text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <span>School Equipment Guide</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
