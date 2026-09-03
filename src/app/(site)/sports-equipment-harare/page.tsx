import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Truck,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
} from 'lucide-react';
import { getWhatsAppUrl, STORE_CONFIG } from '@/data/sportsConfig';
import { JsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sp2clogistics.com';

export const metadata: Metadata = {
  title: 'Sports Equipment Harare | Genuine Match Balls & Gear | SP2C',
  description:
    'Harare sports equipment supplier. Genuine Molten and Mikasa match balls, Fox40 officiating gear, and training equipment for schools, clubs, and sports academies across Greater Harare. Fast local delivery and collection.',
  alternates: { canonical: '/sports-equipment-harare' },
  openGraph: {
    title: 'Sports Equipment Supplier Harare | SP2C Logistics',
    description:
      'Genuine tournament-grade sports balls and referee gear in Harare. Same-day quotations for schools and sports clubs.',
    url: `${SITE_URL}/sports-equipment-harare`,
    images: ['/balls/bg5000-a.webp'],
  },
};

export default function SportsEquipmentHararePage() {
  const waUrl = getWhatsAppUrl(
    'Hello SP2C Logistics / Pozozo Trading, I am inquiring about sports equipment in Harare.'
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sports Equipment Harare',
        item: `${SITE_URL}/sports-equipment-harare`,
      },
    ],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportingGoodsStore',
    '@id': `${SITE_URL}/sports-equipment-harare/#localstore`,
    name: 'SP2C Logistics / Pozozo Trading Harare',
    description:
      'Harare sports equipment distributor specializing in authentic Molten, Mikasa, and Fox40 balls and officiating gear.',
    url: `${SITE_URL}/sports-equipment-harare`,
    telephone: STORE_CONFIG.displayPhone,
    email: STORE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harare',
      addressRegion: 'Harare Province',
      addressCountry: 'ZW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -17.824858,
      longitude: 31.053028,
    },
    openingHours: 'Mo-Sa 08:00-18:00',
    priceRange: '$$',
  };

  const harareAreas = [
    { name: 'Harare Northern Suburbs', areas: 'Borrowdale, Mount Pleasant, Avondale, Highlands, Gunhill, Chisipite' },
    { name: 'Harare Central & Western', areas: 'Harare CBD, Belvedere, Milton Park, Strathaven, Mabelreign' },
    { name: 'Harare Eastern Suburbs', areas: 'Eastlea, Greendale, Msasa, Hillside, Cranborne' },
    { name: 'Greater Harare & Satellite', areas: 'Chitungwiza, Ruwa, Norton, Epworth, Waterfalls, Highfield' },
  ];

  return (
    <div className="bg-[#F3F5F0] min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={localBusinessJsonLd} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54]">
          <Link href="/" className="hover:text-[#13251C] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#13251C]">Sports Equipment Harare</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13251C] text-[#F3F5F0] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#26362A] text-[#F2900E] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Harare Sports Supply Hub</span>
            </span>
            <h1 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              Sports Equipment in Harare, Zimbabwe
            </h1>
            <p className="text-base sm:text-lg text-[#B4BEA8] leading-relaxed">
              Based in Harare, SP2C Logistics / Pozozo Trading supplies authentic Molten and Mikasa match balls and
              referee equipment to schools, private academies, sports clubs, and tournament organizers across Greater
              Harare.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 bg-[#F2900E] hover:bg-white text-[#13251C] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Message Harare Desk</span>
              </a>
              <Link
                href="/bulk"
                className="h-12 px-7 border border-[#26362A] hover:border-[#F3F5F0] text-[#F3F5F0] text-sm font-semibold rounded-sm transition-colors flex items-center gap-2"
              >
                <span>Bulk Harare Quotes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Contact Strip */}
      <section className="border-y border-[#D8DED2] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#F2900E] shrink-0" />
              <div>
                <strong className="block text-[#13251C]">Distribution Base</strong>
                <span className="text-xs text-[#5B6B54]">Harare, Zimbabwe (Express Delivery & Local Collection)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F2900E] shrink-0" />
              <div>
                <strong className="block text-[#13251C]">Harare Sales Phone</strong>
                <a href={`tel:${STORE_CONFIG.phone}`} className="text-xs text-[#5B6B54] hover:text-[#13251C]">
                  {STORE_CONFIG.displayPhone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#F2900E] shrink-0" />
              <div>
                <strong className="block text-[#13251C]">Hours of Operation</strong>
                <span className="text-xs text-[#5B6B54]">{STORE_CONFIG.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harare Areas Served */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Local Logistics</span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight text-[#13251C]">
            Supplying Across Greater Harare
          </h2>
          <p className="text-sm sm:text-base text-[#3C4536] leading-relaxed">
            We deliver directly to school sports departments, club grounds, training facilities, and corporate recreation
            centers across all Harare suburbs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {harareAreas.map((area, idx) => (
            <div key={idx} className="bg-white border border-[#D8DED2] rounded-sm p-7 space-y-3">
              <h3 className="font-display uppercase text-xl text-[#13251C] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F2900E]" />
                <span>{area.name}</span>
              </h3>
              <p className="text-sm text-[#3C4536] leading-relaxed">{area.areas}</p>
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#1E7A4E] bg-[#E4F1E9] px-2.5 py-1 rounded-sm">
                  Same-Day Delivery & Scheduled Dispatch
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Harare Schools & Clubs Focus */}
      <section className="bg-[#13251C] text-[#F3F5F0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F2900E]">Harare School Leagues</span>
              <h2 className="font-display uppercase text-3xl sm:text-5xl tracking-tight leading-[0.95]">
                Equipping Harare Schools and Tournaments
              </h2>
              <p className="text-sm sm:text-base text-[#B4BEA8] leading-relaxed">
                Harare schools compete at the highest level in CHISZ, NASH, and independent sports festivals. Our match
                balls ensure that practice sessions and competitive fixtures meet official tournament standards.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-sm text-[#F3F5F0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F2900E] shrink-0" />
                  <span>Molten BG5000 & BG4500 FIBA balls for Harare basketball tournaments</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#F3F5F0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F2900E] shrink-0" />
                  <span>Mikasa FT550B Alumndo FIFA Quality Pro balls for school football fixtures</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#F3F5F0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F2900E] shrink-0" />
                  <span>Mikasa V200W & V300W FIVB certified balls for Harare volleyball leagues</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#F3F5F0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F2900E] shrink-0" />
                  <span>Mikasa FX5 match netballs for provincial and inter-school netball teams</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#26362A] rounded-sm p-8 sm:p-10 border border-[#3C4E40] space-y-6">
              <h3 className="font-display uppercase text-2xl text-white">Harare Pro-Forma & Quoting Desk</h3>
              <p className="text-sm text-[#B4BEA8] leading-relaxed">
                Need a formal pro-forma quotation for your Harare school procurement committee or sports club board?
                Send us your requisition list today.
              </p>
              <div className="space-y-3 text-xs text-[#F3F5F0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7BE38B]" />
                  <span>USD Cash, Bank Transfer, and Formal Purchase Orders Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7BE38B]" />
                  <span>14-day price hold guaranteed on written pro-forma quotes</span>
                </div>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#F2900E] hover:bg-white text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Request Pro-Forma on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Harare FAQs */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">Local Info</span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">Harare Sports Equipment FAQ</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Can I collect my sports equipment order in Harare?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Yes. Once your order is confirmed and packaged, local collection can be arranged in Harare, or we can
              deliver directly to your school or club facility via local courier.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>How fast is delivery within Harare?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              For in-stock items, delivery across Greater Harare is typically completed within 24 hours of payment
              confirmation.
            </p>
          </div>

          <div className="bg-white border border-[#D8DED2] rounded-sm p-6 space-y-2">
            <h3 className="font-display uppercase text-lg text-[#13251C] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2900E]" />
              <span>Do you supply whistle equipment for referees in Harare?</span>
            </h3>
            <p className="text-sm text-[#3C4536] leading-relaxed pl-6">
              Yes. We stock genuine Fox40 Classic and Fox40 Sonik Blast pealess whistles with lanyards and cushioned mouth
              grips for match officials and school coaches across Harare.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#D8DED2] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-[#13251C]">Order Match Equipment in Harare</h2>
          <p className="text-sm sm:text-base text-[#3C4536] max-w-xl mx-auto">
            Contact our Harare desk for verified stock, bulk quotations, and immediate sports equipment dispatch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 bg-[#13251C] hover:bg-[#F2900E] text-white hover:text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message Harare Sales Desk</span>
            </a>
            <Link
              href="/sports-equipment-zimbabwe"
              className="h-12 px-8 border border-[#BCC4B4] hover:border-[#13251C] text-[#13251C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <span>Zimbabwe Supply Overview</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
