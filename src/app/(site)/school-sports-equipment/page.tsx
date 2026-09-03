import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Package,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { getWhatsAppUrl, STORE_CONFIG } from '@/data/sportsConfig';
import { JsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sp2clogistics.com';

export const metadata: Metadata = {
  title: 'School Sports Equipment Zimbabwe | Pro-Formas & Bulk Supply | SP2C',
  description:
    'Equip your school with genuine tournament-grade sports balls and training equipment. Official pro-forma invoices, curriculum age-group sizes (Size 3, 4, 5, 6, 7), and bulk discounts for primary and secondary schools across Zimbabwe.',
  alternates: { canonical: '/school-sports-equipment' },
  openGraph: {
    title: 'School Sports Equipment Supplier Zimbabwe | SP2C Logistics',
    description:
      'Official pro-forma invoices, curriculum ball sizes, and bulk discounts for schools across Zimbabwe. Genuine Molten & Mikasa stock.',
    url: `${SITE_URL}/school-sports-equipment`,
    images: ['/balls/bg5000-a.webp'],
  },
};

export default function SchoolSportsEquipmentPage() {
  const waUrl = getWhatsAppUrl(
    'Hello SP2C Logistics / Pozozo Trading, I am inquiring about sports equipment for our school.'
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'School Sports Equipment',
        item: `${SITE_URL}/school-sports-equipment`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do Zimbabwean schools order sports equipment from SP2C Logistics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Send your required equipment list via WhatsApp or email. We issue an official pro-forma invoice detailing unit prices, quantities, and delivery timeframe. Your school bursar or administration can then process payment via bank transfer or cash requisition.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which ball sizes should our school buy for primary vs secondary students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For primary schools (Grade 1–7), we recommend Size 3 or 4 footballs, Size 5 basketballs, and Size 4 netballs. For secondary schools (Form 1–6), official competition sizes apply: Size 5 footballs, Size 6 (female) or Size 7 (male) basketballs, and Size 5 netballs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer bulk discounts for school term purchases?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We offer tiered institutional discounts for orders of 10 or more balls, allowing schools to stretch their athletic budget across both training balls and match fixture balls.',
        },
      },
    ],
  };

  const ballSizeGuide = [
    {
      sport: 'Football / Soccer',
      primaryJunior: 'Size 3 (Ages 6–9)',
      primarySenior: 'Size 4 (Ages 10–13)',
      secondary: 'Size 5 (Official match & league play)',
      recommendedModel: 'Mikasa FT550B Alumndo / Molten Vantaggio',
    },
    {
      sport: 'Basketball',
      primaryJunior: 'Size 5 (Primary junior leagues)',
      primarySenior: 'Size 6 (Girls senior / U14 boys)',
      secondary: 'Size 7 (Boys Form 1–6) / Size 6 (Girls)',
      recommendedModel: 'Molten BG5000, BG4500, BG3800',
    },
    {
      sport: 'Netball',
      primaryJunior: 'Size 4 (Primary school introduction)',
      primarySenior: 'Size 5 (Upper primary competition)',
      secondary: 'Size 5 (Official tournament match weight)',
      recommendedModel: 'Mikasa FX5 Netball',
    },
    {
      sport: 'Volleyball',
      primaryJunior: 'Lightweight Training / Foam Touch',
      primarySenior: 'Standard Size 5 (Lower pressure)',
      secondary: 'Size 5 (Official FIVB match specifications)',
      recommendedModel: 'Mikasa V200W / V300W / V330W',
    },
  ];

  return (
    <div className="bg-[#F3F5F0] min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54]">
          <Link href="/" className="hover:text-[#13251C] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#13251C]">School Sports Equipment</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13251C] text-[#F3F5F0] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#26362A] text-[#F2900E] text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Primary & Secondary School Procurement</span>
            </span>
            <h1 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              School Sports Equipment in Zimbabwe
            </h1>
            <p className="text-base sm:text-lg text-[#B4BEA8] leading-relaxed">
              Equip your school with genuine tournament-certified sports equipment. We provide official pro-forma
              invoices, age-appropriate ball sizes, and tiered bulk pricing for school heads, sports directors, and
              bursars across Zimbabwe.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 bg-[#F2900E] hover:bg-white text-[#13251C] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Request School Pro-Forma</span>
              </a>
              <Link
                href="/bulk"
                className="h-12 px-7 border border-[#26362A] hover:border-[#F3F5F0] text-[#F3F5F0] text-sm font-semibold rounded-sm transition-colors flex items-center gap-2"
              >
                <span>View Bulk Pricing Tiers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Schools Choose Us */}
      <section className="border-y border-[#D8DED2] bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">School Trust Factors</span>
            <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">
              Why Over 250+ Schools Rely on Pozozo Trading
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-[#13251C] text-[#F2900E] grid place-items-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display uppercase text-lg text-[#13251C]">Pro-Forma Invoices</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                Formal 14-day quotes ready for school head approval, board sign-off, and school finance disbursement.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-[#13251C] text-[#F2900E] grid place-items-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display uppercase text-lg text-[#13251C]">100% Genuine Certification</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                No cheap counterfeits that puncture after two practice sessions. Only genuine Molten & Mikasa stock.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-[#13251C] text-[#F2900E] grid place-items-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-display uppercase text-lg text-[#13251C]">Tiered School Packs</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                Packaged sets of 10, 20, or 50 balls with complimentary inflation needles and maintenance tips.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-[#13251C] text-[#F2900E] grid place-items-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display uppercase text-lg text-[#13251C]">Term-Ready Delivery</h3>
              <p className="text-xs text-[#5B6B54] leading-relaxed">
                Delivered before term opening so your teams start athletics and ball sports without training delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Ball Size Chart */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Curriculum Guidance</span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight text-[#13251C]">
            School Sports Ball Size Guide
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] leading-relaxed">
            Using the right ball size prevents joint strain in developing athletes and ensures adherence to Zimbabwean
            NAPH and NASH tournament regulations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-sm border border-[#D8DED2]">
            <thead>
              <tr className="bg-[#13251C] text-white font-display uppercase text-xs tracking-wider">
                <th className="p-4 border-b border-[#26362A]">Sport Code</th>
                <th className="p-4 border-b border-[#26362A]">Primary Junior (Grade 1–4)</th>
                <th className="p-4 border-b border-[#26362A]">Primary Senior (Grade 5–7)</th>
                <th className="p-4 border-b border-[#26362A]">Secondary (Form 1–6)</th>
                <th className="p-4 border-b border-[#26362A]">Tournament Model</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y divide-[#D8DED2]">
              {ballSizeGuide.map((item, i) => (
                <tr key={i} className="hover:bg-[#F3F5F0] transition-colors">
                  <td className="p-4 font-bold text-[#13251C]">{item.sport}</td>
                  <td className="p-4 text-[#3C4536]">{item.primaryJunior}</td>
                  <td className="p-4 text-[#3C4536]">{item.primarySenior}</td>
                  <td className="p-4 font-semibold text-[#13251C]">{item.secondary}</td>
                  <td className="p-4 text-[#5B6B54] font-medium">{item.recommendedModel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* School Procurement Protocol */}
      <section className="bg-[#13251C] text-[#F3F5F0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2900E]">Transparent Requisitions</span>
            <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight leading-[0.95]">
              How to Order for Your School
            </h2>
            <p className="text-sm sm:text-base text-[#B4BEA8] leading-relaxed">
              We make the requisition process simple and legally compliant with institutional accounting standards:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <span className="w-7 h-7 rounded-sm bg-[#F2900E] text-[#13251C] font-bold text-sm grid place-items-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h3 className="font-display uppercase text-lg text-white">Send Requisition List</h3>
                  <p className="text-xs sm:text-sm text-[#B4BEA8] mt-0.5">
                    WhatsApp or email the sports codes, quantities, and sizes needed for your term.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-7 h-7 rounded-sm bg-[#F2900E] text-[#13251C] font-bold text-sm grid place-items-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h3 className="font-display uppercase text-lg text-white">Receive Pro-Forma Invoice</h3>
                  <p className="text-xs sm:text-sm text-[#B4BEA8] mt-0.5">
                    We generate a formal pro-forma quote with unit pricing, VAT/tax breakdown where applicable, and delivery timeline.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-7 h-7 rounded-sm bg-[#F2900E] text-[#13251C] font-bold text-sm grid place-items-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h3 className="font-display uppercase text-lg text-white">Payment & Gate Delivery</h3>
                  <p className="text-xs sm:text-sm text-[#B4BEA8] mt-0.5">
                    Settle via bank transfer or cash requisition. We securely dispatch the balls directly to your school gate.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-7 bg-[#F2900E] hover:bg-white text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send School List on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Bursar & Sports Master FAQ</span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">School Equipment Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Can we mix different sports in one bulk order?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Yes. Many schools order a mixed carton containing 5 footballs, 5 basketballs, and 5 netballs. The volume
              discount applies to the cumulative total of balls ordered.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Are Fox40 referee whistles included in school packages?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Yes. We supply Fox40 Classic and Sonik Blast whistles for physical education teachers, coaches, and sports
              prefects, available individually or added to bulk school packages.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#D8DED2] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">
            Prepare Your School for the Upcoming Term
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] max-w-xl mx-auto">
            Get in touch with our institutional desk today to receive your pro-forma quote within hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 bg-[#13251C] hover:bg-[#F2900E] text-white hover:text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Request School Pro-Forma</span>
            </a>
            <Link
              href="/who-we-supply"
              className="h-12 px-8 border border-[#BCC4B4] hover:border-[#13251C] text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <span>See Who We Supply</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
