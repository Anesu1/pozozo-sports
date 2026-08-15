import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, MessageCircle, Building2, Truck } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppUrl } from '@/data/sportsConfig';

export const metadata: Metadata = {
  title: 'About Pozozo Sports – Authorised Molten & Mikasa Stock',
  description: 'Learn about our commitment to genuine match balls, direct WhatsApp ordering, and nationwide school/club supply.',
};

export default function AboutPage() {
  const stats = [
    { value: '100%', label: 'Genuine Manufacturer Stock' },
    { value: '51+', label: 'Match & Training Models' },
    { value: '250+', label: 'Schools & Clubs Supplied' },
    { value: 'Same-Day', label: 'WhatsApp Quotes' },
  ];

  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I would like to learn more about your authorized stock.');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-[#F6F4F1] border-b border-[#E8E4DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12100E] text-white text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>GENUINE ATHLETIC SUPPLY</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#12100E] leading-tight font-display">
            Authorised Stock, <br />
            Ordered by Message.
          </h1>
          <p className="text-base sm:text-lg text-[#5E574E] max-w-2xl mx-auto leading-relaxed">
            Pozozo Sports is dedicated exclusively to providing genuine, certified Molten and Mikasa sports balls to competitive clubs, national leagues, schools, and players across Zambia and the region.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#12100E] text-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-white/70 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8E857A] block">
                OUR MISSION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#12100E] tracking-tight font-display">
                No Counterfeits. No Slow Checkouts. Just Reliable Match Equipment.
              </h2>
              <p className="text-sm sm:text-base text-[#5E574E] leading-relaxed">
                Counterfeit balls with uneven seams and defective bladders ruin training sessions and match performance. We maintain direct, authorized distribution channels for Molten and Mikasa balls with verified manufacturer holograms and serial production codes intact.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-sm text-[#12100E] font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Official FIBA &amp; FIFA certified tournament equipment</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#12100E] font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Instant quotation and stock confirmation on WhatsApp</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#12100E] font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Flexible procurement for schools with formal pro-forma invoices</span>
                </li>
              </ul>
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#12100E] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-all shadow-sm"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat With Us</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-square bg-[#F6F4F1] rounded-3xl p-8 border border-[#E8E4DF] shadow-xl flex items-center justify-center">
              <Image
                src="/balls/ft550b.webp"
                alt="Mikasa FT550B FIFA Quality Pro"
                fill
                className="object-contain p-8 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
