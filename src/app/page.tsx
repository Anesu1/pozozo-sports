'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { REVIEWS } from '@/data/reviews';
import { SPORTS } from '@/data/sports';
import { BRANDS } from '@/data/brands';
import { ProductCard } from '@/components/ProductCard';
import { Ball3D } from '@/components/ball3d/Ball3D';
import { STORE_CONFIG, getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';
import { useCart } from '@/context/CartContext';

const CONFIDENCE_FEATURES = [
  {
    title: 'Genuine stock only',
    body: 'Molten and Mikasa, sourced through proper channels. No lookalikes, no grey imports.',
  },
  {
    title: 'Nationwide delivery',
    body: 'Delivered to your school, club or shop, or collect from us. Cost is confirmed in the quote.',
  },
  {
    title: 'Pay how you like',
    body: 'On collection, on delivery, or by invoice for institutions. Nothing is charged on this site.',
  },
];

const BULK_POINTS = [
  'Quotations and invoices on request',
  'Mixed orders across sports are normal',
  'Pumps, needles and gauges quoted alongside',
];

const BEFORE_YOU_BUY = [
  {
    href: '/size-guide',
    title: 'Ball size guide',
    body: 'Which size for which age group, in every sport we stock.',
  },
  {
    href: '/care',
    title: 'Care & inflation',
    body: 'Get a season more out of every ball. Pressure, needles, storage.',
  },
  {
    href: '/faq',
    title: 'Questions',
    body: 'Delivery, payment terms, invoices, warranty and counterfeits.',
  },
];

export default function HomePage() {
  const { totalItems, openCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayLimit, setDisplayLimit] = useState<number>(18);

  const railRef = useRef<HTMLDivElement>(null);
  const catalogueRef = useRef<HTMLDivElement>(null);

  const heroWaUrl = getWhatsAppUrl('Hello Pozozo Sports, I have a question about your balls.');
  const contactMailUrl = getMailtoUrl('Enquiry — Pozozo Sports', 'Hello Pozozo Sports,');

  const freshProducts = useMemo(
    () => [...PRODUCTS.filter((p) => p.tag), ...PRODUCTS.filter((p) => !p.tag)].slice(0, 8),
    []
  );

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedCategory !== 'all') list = list.filter((p) => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.spec.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, displayLimit);
  const testimonials = REVIEWS.slice(0, 3);

  const goToCatalogue = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setDisplayLimit(18);
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#EEF1F5] text-[#0E1726]">
      {/* Hero */}
      <section id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="relative bg-[#0E1726] text-[#EEF1F5] rounded-sm mt-2 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center overflow-hidden">
          <div>
            <div className="text-[11px] font-bold tracking-[0.24em] text-[#8494AC] mb-6">
              MOLTEN &amp; MIKASA · ZAMBIA
            </div>
            <h1 className="font-display uppercase text-[42px] xs:text-5xl sm:text-6xl lg:text-[84px] leading-[0.9] tracking-tight mb-6">
              Balls built
              <br />
              for the
              <br />
              <span className="text-[#F2C230]">whistle</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#A7B4C7] max-w-[42ch] mb-8">
              Match and training balls for schools, clubs and shops. Pick what you need, send the list on
              WhatsApp, and get price and stock back the same day.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => goToCatalogue('all')}
                className="h-[54px] px-7 bg-[#F2C230] hover:bg-white text-[#0E1726] text-sm font-bold rounded-sm transition-colors"
              >
                Shop the range
              </button>
              <a
                href={heroWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[54px] px-7 flex items-center border border-[#2C3A50] hover:border-[#EEF1F5] text-[#EEF1F5] text-sm font-semibold rounded-sm transition-colors"
              >
                Ask a question
              </a>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[360px] lg:h-[400px] flex items-center justify-center">
            <Ball3D
              src="/balls/bg5000-a.webp"
              alt="Molten BG5000 FIBA official game ball"
              priority
              className="w-full h-full"
            />
            <span className="absolute right-0 bottom-0 text-[11px] font-bold tracking-[0.16em] text-[#8494AC]">
              MOLTEN BG5000 · FIBA
            </span>
          </div>
        </div>
      </section>

      {/* New in stock rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight">
            New in stock
          </h2>
          <div className="hidden sm:flex gap-2.5">
            <button
              onClick={() => railRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
              aria-label="Previous"
              className="w-[46px] h-[46px] rounded-sm border border-[#B9C3D2] hover:bg-[#0E1726] hover:text-[#EEF1F5] hover:border-[#0E1726] flex items-center justify-center text-lg transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => railRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
              aria-label="Next"
              className="w-[46px] h-[46px] rounded-sm border border-[#B9C3D2] hover:bg-[#0E1726] hover:text-[#EEF1F5] hover:border-[#0E1726] flex items-center justify-center text-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>
        <div ref={railRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {freshProducts.map((p) => (
            <div key={p.id} className="shrink-0 w-[260px] sm:w-[282px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Dark marquee band */}
      <div className="bg-[#0E1726] text-[#EEF1F5] overflow-hidden h-16 sm:h-[74px] flex items-center mt-16 sm:mt-20">
        <div className="flex gap-10 sm:gap-[52px] whitespace-nowrap animate-marquee-slow pr-10 sm:pr-[52px] font-display uppercase text-lg sm:text-[26px] tracking-tight">
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <span>MADE FOR MATCH DAY</span>
              <span className="text-[#F2C230]">◆</span>
              <span>PRICED FOR THE CLUB</span>
              <span className="text-[#F2C230]">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Shop by sport */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7">
          Shop by sport
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SPORTS.map((s) => (
            <div
              key={s.slug}
              style={{ background: s.bg, color: s.fg }}
              className="rounded-sm p-8 min-h-[400px] flex flex-col relative overflow-hidden"
            >
              <div style={{ color: s.dim }} className="text-[11px] font-bold tracking-[0.22em] mb-3">
                {s.kicker}
              </div>
              <h3 className="font-display uppercase text-[27px] leading-none tracking-tight mb-4 max-w-[14ch]">
                {s.title}
              </h3>
              <button
                onClick={() => goToCatalogue(s.slug)}
                style={{ borderColor: s.line, color: s.fg }}
                className="self-start h-[42px] px-5 rounded-sm border text-[13px] font-bold hover:bg-[#F2C230] hover:text-[#0E1726] hover:!border-[#F2C230] transition-colors"
              >
                {s.cta}
              </button>
              <div className="flex-1 mt-4 relative min-h-0">
                <Ball3D src={s.img} alt={s.title} className="w-full h-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two brands, no others */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/brand/${b.slug}`}
              className="bg-white border border-[#D3DAE4] hover:border-[#0E1726] rounded-sm p-9 flex flex-col gap-3 transition-colors"
            >
              <div className="text-[11px] font-bold tracking-[0.22em] text-[#55637A]">AUTHORISED STOCK</div>
              <h3 className="font-display uppercase text-[34px] leading-none tracking-tight">{b.title}</h3>
              <p className="text-[15.5px] leading-relaxed text-[#3A4557]">{b.lede}</p>
              <span className="text-[13px] font-bold text-[#1E3A5F] mt-1">See the {b.title} range →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Full catalogue */}
      <section
        id="catalogue"
        ref={catalogueRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 scroll-mt-24"
      >
        <div className="flex items-end justify-between gap-7 flex-wrap mb-6">
          <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight">
            The full catalogue
          </h2>
          <p className="text-sm leading-relaxed text-[#3A4557] max-w-[36ch]">
            Tap <strong className="text-[#0E1726]">Add</strong> on anything you want quoted. Your list stays
            here until you send it.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 pb-5 border-b border-[#D3DAE4] mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setDisplayLimit(18);
                }}
                className={`h-10 px-5 rounded-sm text-[13px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0E1726] text-[#EEF1F5]'
                    : 'border border-[#B9C3D2] text-[#3A4557] hover:border-[#0E1726]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
          <div className="flex-1" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search BG5000, netball, size 5…"
            className="h-10 w-full sm:w-[260px] px-4 border border-[#D3DAE4] bg-white rounded-sm text-[13px] outline-none focus:border-[#0E1726]"
          />
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[18px]">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-[#3A4557] text-[15.5px]">
            Nothing matches that.{' '}
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E3A5F] hover:text-[#0E1726] font-semibold"
            >
              Ask us on WhatsApp
            </a>{' '}
            — we source to order.
          </div>
        )}

        {filteredProducts.length > visibleProducts.length && (
          <div className="flex justify-center pt-10">
            <button
              onClick={() => setDisplayLimit(999)}
              className="h-[52px] px-9 border border-[#0E1726] text-[#0E1726] hover:bg-[#0E1726] hover:text-[#EEF1F5] text-sm font-bold rounded-sm transition-colors"
            >
              Show all {filteredProducts.length} balls
            </button>
          </div>
        )}
      </section>

      {/* Order with confidence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7">
          Order with confidence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D3DAE4] border border-[#D3DAE4] rounded-sm overflow-hidden">
          {CONFIDENCE_FEATURES.map((f) => (
            <div key={f.title} className="bg-[#EEF1F5] p-7">
              <h3 className="text-lg font-bold mb-2.5 tracking-tight">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#3A4557]">{f.body}</p>
            </div>
          ))}
          <div className="bg-[#EEF1F5] p-7">
            <h3 className="text-lg font-bold mb-2.5 tracking-tight">A person, not a bot</h3>
            <p className="text-sm leading-relaxed text-[#3A4557]">
              Every enquiry is answered by someone who knows the stock. {STORE_CONFIG.operatingHours}.
            </p>
          </div>
        </div>
      </section>

      {/* Bulk & schools teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-[#0E1726] text-[#EEF1F5] rounded-sm p-9 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-9 lg:gap-11 items-center">
            <div>
              <div className="text-[11px] font-bold tracking-[0.22em] text-[#8494AC] mb-3.5">
                BULK &amp; SCHOOLS
              </div>
              <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[44px] leading-[0.98] tracking-tight mb-4">
                Kitting out a whole season?
              </h2>
              <p className="text-base sm:text-[16.5px] leading-relaxed text-[#A7B4C7] max-w-[46ch] mb-6">
                Ten balls or more gets bulk pricing, and we hold stock while your order is approved.
              </p>
              <Link
                href="/bulk"
                className="inline-flex items-center h-[52px] px-7 bg-[#F2C230] hover:bg-white text-[#0E1726] text-sm font-bold rounded-sm transition-colors"
              >
                Send a bulk enquiry
              </Link>
            </div>
            <div className="flex flex-col gap-3.5">
              {BULK_POINTS.map((item) => (
                <div key={item} className="border-t border-[#2C3A50] pt-3.5 text-[15px] text-[#A7B4C7]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What clubs say */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7 max-w-[20ch]">
          What clubs say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((r, i) => (
            <div
              key={r.id}
              className={`rounded-sm p-7 border ${
                i === 1 ? 'bg-[#0E1726] text-[#EEF1F5] border-[#0E1726]' : 'bg-white text-[#0E1726] border-[#D3DAE4]'
              }`}
            >
              <p className="text-[17px] leading-relaxed mb-5">&quot;{r.text}&quot;</p>
              <div className="text-[13px] font-bold">{r.author}</div>
              <div className={`text-[12.5px] mt-1 ${i === 1 ? 'text-[#8494AC]' : 'text-[#55637A]'}`}>
                {r.role}
                {r.location ? `, ${r.location}` : ''}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before you buy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7">
          Before you buy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BEFORE_YOU_BUY.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="bg-white border border-[#D3DAE4] hover:border-[#0E1726] rounded-sm p-8 flex flex-col gap-2.5 transition-colors"
            >
              <h3 className="font-display uppercase text-2xl">{g.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#3A4557]">{g.body}</p>
              <span className="text-[13px] font-bold text-[#1E3A5F] mt-1">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20">
        <div className="bg-[#F2C230] text-[#0E1726] rounded-sm py-14 sm:py-16 px-8 sm:px-12 text-center">
          <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[52px] leading-none tracking-tight mb-4">
            Ready when you are
          </h2>
          <p className="text-base sm:text-[17.5px] leading-relaxed text-[#2A3342] max-w-[48ch] mx-auto mb-8">
            Send your list, ask about stock, or just check a price. We answer {STORE_CONFIG.operatingHours}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 flex items-center gap-2.5 bg-[#0E1726] hover:bg-white hover:text-[#0E1726] text-white text-sm font-bold rounded-sm transition-colors"
            >
              <span className="w-2 h-2 rounded-sm bg-[#25D366]" />
              WhatsApp {STORE_CONFIG.displayPhone}
            </a>
            <a
              href={contactMailUrl}
              className="h-14 px-8 flex items-center border border-[#0E1726]/40 hover:bg-[#0E1726] hover:text-white text-[#0E1726] text-sm font-semibold rounded-sm transition-colors"
            >
              {STORE_CONFIG.email}
            </a>
          </div>
        </div>
      </section>

      {/* Floating enquiry bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40">
          <button
            onClick={openCart}
            className="flex items-center gap-3.5 bg-[#0E1726] text-[#EEF1F5] h-[58px] pl-6 pr-1.5 rounded-sm shadow-2xl hover:shadow-[0_18px_40px_rgba(14,23,38,0.35)] transition-shadow"
          >
            <span className="text-sm font-bold">{totalItems} in your enquiry</span>
            <span className="bg-[#F2C230] text-[#0E1726] h-10 px-[18px] grid place-items-center text-[13px] font-bold rounded-sm">
              Review &amp; send
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
