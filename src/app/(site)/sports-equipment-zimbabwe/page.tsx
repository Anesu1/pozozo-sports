import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  Award,
  FileText,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Package,
} from 'lucide-react';
import { getWhatsAppUrl, STORE_CONFIG } from '@/data/sportsConfig';
import { JsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sp2clogistics.com';

export const metadata: Metadata = {
  title: 'Sports Equipment Supplier Zimbabwe | Molten & Mikasa | SP2C Logistics',
  description:
    'Leading sports equipment supplier in Zimbabwe. Genuine tournament-grade Molten and Mikasa basketballs, footballs, volleyballs, netballs, and Fox40 gear for schools, clubs, and sports academies. Same-day WhatsApp quotes and nationwide delivery.',
  alternates: { canonical: '/sports-equipment-zimbabwe' },
  openGraph: {
    title: 'Sports Equipment Supplier Zimbabwe | SP2C Logistics',
    description:
      'Genuine tournament-grade sports balls and officiating equipment across Zimbabwe. Pro-forma quotes for schools, clubs, and institutions.',
    url: `${SITE_URL}/sports-equipment-zimbabwe`,
    images: ['/balls/bg5000-a.webp'],
  },
};

export default function SportsEquipmentZimbabwePage() {
  const waUrl = getWhatsAppUrl(
    'Hello SP2C Logistics / Pozozo Trading, I am inquiring about sports equipment supply in Zimbabwe.'
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sports Equipment Zimbabwe',
        item: `${SITE_URL}/sports-equipment-zimbabwe`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I buy genuine Molten and Mikasa sports equipment in Zimbabwe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SP2C Logistics (trading as Pozozo Trading) supplies 100% authentic Molten and Mikasa sports balls with factory holograms, batch serial numbers, and official FIBA, FIFA, and FIVB tournament certifications. Orders are dispatched from Harare nationwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you supply sports equipment to schools across Zimbabwe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We supply primary and secondary schools across all 10 provinces in Zimbabwe. We issue formal pro-forma invoices, accept institutional procurement payments, and provide bulk-tiered pricing on junior and senior curriculum sports balls.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does delivery work outside Harare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We deliver to Bulawayo, Mutare, Gweru, Masvingo, Kwekwe, Victoria Falls, and all major regional towns using verified regional couriers and dedicated freight logistics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I request a quotation for sports equipment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply message our sales desk on WhatsApp at +263 77 735 1222 with your required equipment list or send an email to pozozotrading@sp2clogistics.com. We respond with stock confirmation and pricing within the same day.',
        },
      },
    ],
  };

  const categories = [
    {
      title: 'Basketball Equipment',
      description: 'FIBA-approved match balls, 3x3 tournament balls, and durable composite leather balls.',
      brands: 'Molten BG5000, BG4500, BG3800, B33T5000',
      href: '/sport/basketball',
    },
    {
      title: 'Football Equipment',
      description: 'FIFA Quality Pro match footballs and tough hand-stitched training balls built for African pitches.',
      brands: 'Mikasa FT550B Alumndo, Molten Vantaggio 5000',
      href: '/sport/football',
    },
    {
      title: 'Volleyball Equipment',
      description: 'Official FIVB game balls, national league models, and high-durability school tournament balls.',
      brands: 'Mikasa V200W, V300W, V330W, Molten V5M5000',
      href: '/sport/volleyball',
    },
    {
      title: 'Netball Equipment',
      description: 'High-grip tournament match netballs and weather-resistant training balls for schools and clubs.',
      brands: 'Mikasa FX5, League Match Leatherette',
      href: '/sport/netball',
    },
    {
      title: 'Officiating & Accessories',
      description: 'Authentic Fox40 pealess referee whistles, digital ball pressure gauges, and heavy-duty pumps.',
      brands: 'Fox40 Classic, Sonik Blast, Mikasa AG500 Gauge',
      href: '/shop/category/accessories',
    },
    {
      title: 'Bulk & Institutional Supply',
      description: 'Discounted multi-ball cartons and tournament bundles for schools, clubs, and sports academies.',
      brands: 'Tiered Pricing from 10+ Units',
      href: '/school-sports-equipment',
    },
  ];

  const provinces = [
    'Harare Province (CBD, Borrowdale, Avondale, Mount Pleasant, Chitungwiza)',
    'Bulawayo Metropolitan (Suburbs, Belmont, Industrial Hub)',
    'Manicaland (Mutare, Nyanga, Rusape, Chipinge)',
    'Midlands (Gweru, Kwekwe, Zvishavane, Gokwe)',
    'Masvingo Province (Masvingo Town, Chiredzi, Gutu)',
    'Mashonaland West (Chinhoyi, Kadoma, Kariba)',
    'Mashonaland East (Marondera, Ruwa, Mutoko)',
    'Mashonaland Central (Bindura, Mazowe, Shamva)',
    'Matabeleland North & South (Victoria Falls, Hwange, Gwanda)',
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
          <span className="text-[#13251C]">Sports Equipment Zimbabwe</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13251C] text-[#F3F5F0] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#26362A] text-[#F2900E] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Zimbabwe Direct Sports Supply</span>
            </span>
            <h1 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              Sports Equipment Supplier in Zimbabwe
            </h1>
            <p className="text-base sm:text-lg text-[#B4BEA8] leading-relaxed">
              SP2C Logistics, trading as Pozozo Trading, is Zimbabwe&apos;s verified supplier of authentic Molten, Mikasa, and
              Fox40 tournament sports equipment. Serving schools, clubs, sports academies, and national institutions
              with genuine gear and same-day WhatsApp quotations.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 bg-[#F2900E] hover:bg-white text-[#13251C] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Request Zimbabwe Quote</span>
              </a>
              <Link
                href="/shop"
                className="h-12 px-7 border border-[#26362A] hover:border-[#F3F5F0] text-[#F3F5F0] text-sm font-semibold rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="border-y border-[#D8DED2] bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <Award className="w-6 h-6 text-[#F2900E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display uppercase text-lg text-[#13251C]">100% Genuine Gear</h3>
                <p className="text-xs text-[#5B6B54] leading-relaxed mt-1">
                  Direct manufacturer channels with authentic serials and holograms. No grey market counterfeits.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <FileText className="w-6 h-6 text-[#F2900E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display uppercase text-lg text-[#13251C]">Institutional Invoicing</h3>
                <p className="text-xs text-[#5B6B54] leading-relaxed mt-1">
                  Official pro-forma invoices for school boards, sports clubs, NGOs, and government tenders.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Truck className="w-6 h-6 text-[#F2900E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display uppercase text-lg text-[#13251C]">Nationwide Dispatch</h3>
                <p className="text-xs text-[#5B6B54] leading-relaxed mt-1">
                  Central distribution in Harare with reliable delivery across Bulawayo, Mutare, Gweru, and all provinces.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Package className="w-6 h-6 text-[#F2900E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display uppercase text-lg text-[#13251C]">Bulk Discounts</h3>
                <p className="text-xs text-[#5B6B54] leading-relaxed mt-1">
                  Special price tiers for multi-ball orders, equipping entire school rosters and league tournaments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Complete Product Range</span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight text-[#13251C]">
            Sports Equipment Available in Zimbabwe
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] leading-relaxed">
            All equipment is stocked and verified for official competition play and rigorous school training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="bg-white border border-[#D8DED2] hover:border-[#13251C] rounded-sm p-7 flex flex-col justify-between group transition-colors"
            >
              <div className="space-y-3">
                <h3 className="font-display uppercase text-2xl text-[#13251C] group-hover:text-[#F2900E] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-[#3C4536] leading-relaxed">{cat.description}</p>
                <p className="text-xs font-semibold text-[#5B6B54]">{cat.brands}</p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#13251C] group-hover:text-[#F2900E] transition-colors">
                <span>View Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nationwide Coverage */}
      <section className="bg-[#13251C] text-[#F3F5F0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F2900E]">Reliable Logistics</span>
              <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight leading-[0.95]">
                Supplying Every Province in Zimbabwe
              </h2>
              <p className="text-sm sm:text-base text-[#B4BEA8] leading-relaxed">
                Whether you are a sports director at a Harare private school, a football coach in Bulawayo, or an athletic
                academy in Mutare, our distribution network delivers authentic equipment directly to your premises.
              </p>
              <div className="space-y-2.5 pt-2">
                {provinces.map((prov, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#F3F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#F2900E] shrink-0" />
                    <span>{prov}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#26362A] rounded-sm p-8 sm:p-10 border border-[#3C4E40] space-y-6">
              <h3 className="font-display uppercase text-2xl sm:text-3xl text-white">How School & Club Orders Work</h3>
              <ol className="space-y-4 text-xs sm:text-sm text-[#B4BEA8]">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F2900E] text-[#13251C] font-bold text-xs grid place-items-center shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Send Your Equipment List:</strong> Message our WhatsApp desk with the
                    quantities and sports ball models needed.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F2900E] text-[#13251C] font-bold text-xs grid place-items-center shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Receive Same-Day Quotation:</strong> We provide formal pricing, stock
                    confirmation, and estimated delivery dates.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F2900E] text-[#13251C] font-bold text-xs grid place-items-center shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Fast Dispatch:</strong> Upon confirmation, items are dispatched via
                    secure courier or prepared for Harare collection.
                  </div>
                </li>
              </ol>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#F2900E] hover:bg-white text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with WhatsApp Sales Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Procurement FAQ</span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">
            Zimbabwe Sports Equipment FAQs
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Are your Molten and Mikasa balls 100% genuine?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Yes, unconditionally. We only supply genuine manufacturer balls with verified production serial codes,
              batch holograms, and official tournament stamps (FIBA, FIFA Quality Pro, FIVB). We do not deal in illicit
              grey-market replicas.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Can schools pay via bank transfer with a pro-forma invoice?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Yes. We regularly supply schools, universities, and government bodies across Zimbabwe. We provide formal
              pro-forma invoices valid for 14 days, allowing school heads and bursars to process approved requisitions.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Where is your central distribution located?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Our primary distribution operations are based in Harare, Zimbabwe, with express freight arrangements to all
              major provincial towns and Southern African (SADC) destinations.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>What is the fastest way to get pricing?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              The fastest way is to send your list via WhatsApp to{' '}
              <a href={waUrl} className="font-bold text-[#13251C] underline">
                {STORE_CONFIG.displayPhone}
              </a>
              . Our sales team typically confirms stock and quotes within hours.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#D8DED2] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">
            Equip Your Team with Genuine Match Balls
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] max-w-xl mx-auto">
            Contact SP2C Logistics / Pozozo Trading today for verified tournament sports equipment, pro-formas, and bulk
            discounts in Zimbabwe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 bg-[#13251C] hover:bg-[#F2900E] text-white hover:text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Sales Desk</span>
            </a>
            <Link
              href="/contact"
              className="h-12 px-8 border border-[#BCC4B4] hover:border-[#13251C] text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
