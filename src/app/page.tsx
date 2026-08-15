'use client';

import React, { useMemo, useRef, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { REVIEWS } from '@/data/reviews';
import { ProductCard } from '@/components/ProductCard';
import { Ball3D } from '@/components/ball3d/Ball3D';
import { STORE_CONFIG, getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';
import { useCart } from '@/context/CartContext';

const SPORTS = [
  {
    id: 'basketball',
    kicker: 'FOR THE COURT',
    title: 'Match and street basketballs',
    img: '/balls/bg5000-a.webp',
    bg: '#12100E',
    fg: '#F5F1E8',
    dim: '#8E857A',
    line: '#3A342D',
    cta: 'Shop basketball',
  },
  {
    id: 'football',
    kicker: 'FOR THE PITCH',
    title: 'Footballs from junior to FIFA Pro',
    img: '/balls/ft550b.webp',
    bg: '#E8E2D4',
    fg: '#12100E',
    dim: '#8A8172',
    line: '#C6BCA9',
    cta: 'Shop football',
  },
  {
    id: 'netball',
    kicker: 'FOR THE RING',
    title: 'Netballs for school and league',
    img: '/balls/u19.webp',
    bg: '#C8482B',
    fg: '#fff',
    dim: '#FFD8CD',
    line: 'rgba(255,255,255,.5)',
    cta: 'Shop netball',
  },
];

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
  'Ten balls or more gets bulk pricing',
  'Quotations and invoices on request',
  'Pumps, needles and gauges quoted alongside',
];

export default function HomePage() {
  const { totalItems, openCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayLimit, setDisplayLimit] = useState<number>(18);

  const [bulkWho, setBulkWho] = useState('');
  const [bulkWhat, setBulkWhat] = useState('');
  const [bulkWhere, setBulkWhere] = useState('');

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

  const bulkMessage = `Hello Pozozo Sports, bulk enquiry.\n\nFrom: ${bulkWho || '—'}\nNeeded: ${
    bulkWhat || '—'
  }\nDelivery to: ${bulkWhere || '—'}\n\nPlease send a quote with bulk pricing.`;
  const bulkWaUrl = getWhatsAppUrl(bulkMessage);
  const bulkMailUrl = getMailtoUrl('Bulk enquiry — Pozozo Sports', bulkMessage);

  const goToCatalogue = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setDisplayLimit(18);
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#F5F1E8] text-[#12100E]">
      {/* Hero */}
      <section id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="relative bg-[#12100E] text-[#F5F1E8] rounded-lg mt-2 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center overflow-hidden">
          <div>
            <div className="text-[11px] font-bold tracking-[0.24em] text-[#9C9284] mb-6">
              MOLTEN &amp; MIKASA · ZAMBIA
            </div>
            <h1 className="font-display text-[42px] xs:text-5xl sm:text-6xl lg:text-[86px] leading-[0.92] tracking-tight mb-6">
              Balls built
              <br />
              for the
              <br />
              <span className="text-[#C8482B]">whistle.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#B8AE9F] max-w-[42ch] mb-8">
              Match and training balls for schools, clubs and shops. Pick what you need, send the list on
              WhatsApp, and get price and stock back the same day.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => goToCatalogue('all')}
                className="h-[54px] px-7 bg-[#F5F1E8] hover:bg-[#C8482B] hover:text-white text-[#12100E] text-sm font-bold rounded-full transition-colors"
              >
                Shop the range
              </button>
              <a
                href={heroWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[54px] px-7 flex items-center border border-[#3A342D] hover:border-[#F5F1E8] text-[#F5F1E8] text-sm font-semibold rounded-full transition-colors"
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
            <span className="absolute right-0 bottom-0 text-[11px] font-bold tracking-[0.16em] text-[#8E857A]">
              MOLTEN BG5000 · FIBA
            </span>
          </div>
        </div>
      </section>

      {/* New in stock rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight">
            New in stock
          </h2>
          <div className="hidden sm:flex gap-2.5">
            <button
              onClick={() => railRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
              aria-label="Previous"
              className="w-[46px] h-[46px] rounded-full border border-[#CFC5B4] hover:bg-[#12100E] hover:text-[#F5F1E8] hover:border-[#12100E] flex items-center justify-center text-lg transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => railRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
              aria-label="Next"
              className="w-[46px] h-[46px] rounded-full border border-[#CFC5B4] hover:bg-[#12100E] hover:text-[#F5F1E8] hover:border-[#12100E] flex items-center justify-center text-lg transition-colors"
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
      <div className="bg-[#12100E] text-[#F5F1E8] overflow-hidden h-16 sm:h-[74px] flex items-center mt-16 sm:mt-20">
        <div className="flex gap-10 sm:gap-[52px] whitespace-nowrap animate-marquee-slow pr-10 sm:pr-[52px] font-display text-lg sm:text-[26px] tracking-tight">
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <span>MADE FOR MATCH DAY</span>
              <span className="text-[#C8482B]">◆</span>
              <span>PRICED FOR THE CLUB</span>
              <span className="text-[#C8482B]">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Shop by sport */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7">
          Shop by sport
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SPORTS.map((s) => (
            <div
              key={s.id}
              style={{ background: s.bg, color: s.fg }}
              className="rounded-lg p-8 min-h-[400px] flex flex-col relative overflow-hidden"
            >
              <div style={{ color: s.dim }} className="text-[11px] font-bold tracking-[0.22em] mb-3">
                {s.kicker}
              </div>
              <h3 className="font-display text-[27px] leading-none tracking-tight mb-4 max-w-[14ch]">
                {s.title}
              </h3>
              <button
                onClick={() => goToCatalogue(s.id)}
                style={{ borderColor: s.line, color: s.fg }}
                className="self-start h-[42px] px-5 rounded-full border text-[13px] font-bold hover:bg-[#C8482B] hover:text-white hover:!border-[#C8482B] transition-colors"
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

      {/* Full catalogue */}
      <section
        id="catalogue"
        ref={catalogueRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 scroll-mt-24"
      >
        <div className="flex items-end justify-between gap-7 flex-wrap mb-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight">
            The full catalogue
          </h2>
          <p className="text-sm leading-relaxed text-[#5E574E] max-w-[36ch]">
            Tap <strong className="text-[#12100E]">Add</strong> on anything you want quoted. Your list stays
            here until you send it.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 pb-5 border-b border-[#DED7C9] mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setDisplayLimit(18);
                }}
                className={`h-10 px-5 rounded-full text-[13px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#12100E] text-[#F5F1E8]'
                    : 'border border-[#CFC5B4] text-[#3E382F] hover:border-[#12100E]'
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
            className="h-10 w-full sm:w-[260px] px-4 border border-[#DED7C9] bg-white rounded-full text-[13px] outline-none focus:border-[#12100E]"
          />
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[18px]">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-[#6B6459] text-[15.5px]">
            Nothing matches that.{' '}
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8482B] hover:text-[#12100E] font-semibold"
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
              className="h-[52px] px-9 border border-[#12100E] text-[#12100E] hover:bg-[#12100E] hover:text-[#F5F1E8] text-sm font-bold rounded-full transition-colors"
            >
              Show all {filteredProducts.length} balls
            </button>
          </div>
        )}
      </section>

      {/* Order with confidence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7">
          Order with confidence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#DED7C9] border border-[#DED7C9] rounded-lg overflow-hidden">
          {CONFIDENCE_FEATURES.map((f) => (
            <div key={f.title} className="bg-[#F5F1E8] p-7">
              <h3 className="text-lg font-bold mb-2.5 tracking-tight">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#5E574E]">{f.body}</p>
            </div>
          ))}
          <div className="bg-[#F5F1E8] p-7">
            <h3 className="text-lg font-bold mb-2.5 tracking-tight">A person, not a bot</h3>
            <p className="text-sm leading-relaxed text-[#5E574E]">
              Every enquiry is answered by someone who knows the stock. {STORE_CONFIG.operatingHours}.
            </p>
          </div>
        </div>
      </section>

      {/* Bulk & schools */}
      <section id="bulk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <div className="text-[11px] font-bold tracking-[0.22em] text-[#9C9284] mb-3.5">
              BULK &amp; SCHOOLS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[0.96] tracking-tight mb-5">
              Kitting out a whole season?
            </h2>
            <p className="text-base sm:text-[16.5px] leading-relaxed text-[#5E574E] max-w-[44ch] mb-6">
              Tell us the sport, the sizes and how many. We&apos;ll come back with bulk pricing and hold stock
              while your order is approved.
            </p>
            <ul className="flex flex-col gap-2.5">
              {BULK_POINTS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px]">
                  <span className="text-[#C8482B] font-bold">—</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#E4DED1] rounded-lg p-7 sm:p-8">
            <h3 className="text-lg font-bold mb-5">Send a bulk enquiry</h3>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#6B6459] tracking-wider">
                NAME / ORGANISATION
                <input
                  value={bulkWho}
                  onChange={(e) => setBulkWho(e.target.value)}
                  placeholder="e.g. Kabulonga Girls Secondary"
                  className="h-[46px] px-4 border border-[#DED7C9] rounded-full text-[14.5px] font-normal outline-none focus:border-[#12100E]"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#6B6459] tracking-wider">
                WHAT DO YOU NEED?
                <textarea
                  value={bulkWhat}
                  onChange={(e) => setBulkWhat(e.target.value)}
                  rows={4}
                  placeholder="e.g. 24 size 5 netballs, 10 size 7 basketballs, 2 pumps"
                  className="px-4 py-3 border border-[#DED7C9] rounded-2xl text-[14.5px] font-normal outline-none focus:border-[#12100E] resize-y leading-relaxed"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#6B6459] tracking-wider">
                DELIVERING TO
                <input
                  value={bulkWhere}
                  onChange={(e) => setBulkWhere(e.target.value)}
                  placeholder="Town or city"
                  className="h-[46px] px-4 border border-[#DED7C9] rounded-full text-[14.5px] font-normal outline-none focus:border-[#12100E]"
                />
              </label>
              <div className="flex gap-2.5 mt-1">
                <a
                  href={bulkWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-[50px] grid place-items-center bg-[#C8482B] hover:bg-[#12100E] text-white text-sm font-bold rounded-full transition-colors"
                >
                  Send on WhatsApp
                </a>
                <a
                  href={bulkMailUrl}
                  className="flex-1 h-[50px] grid place-items-center border border-[#12100E] text-[#12100E] hover:bg-[#12100E] hover:text-white text-sm font-bold rounded-full transition-colors"
                >
                  Send by email
                </a>
              </div>
              <p className="text-xs text-[#8E857A] leading-relaxed">
                Nothing sends until you tap — the buttons open WhatsApp or your mail app with the message
                written.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What clubs say */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-none tracking-tight mb-7 max-w-[20ch]">
          What clubs say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((r, i) => (
            <div
              key={r.id}
              className={`rounded-lg p-7 border ${
                i === 1 ? 'bg-[#12100E] text-[#F5F1E8] border-[#12100E]' : 'bg-white text-[#12100E] border-[#E4DED1]'
              }`}
            >
              <p className="text-[17px] leading-relaxed mb-5">&quot;{r.text}&quot;</p>
              <div className="text-[13px] font-bold">{r.author}</div>
              <div className="text-[12.5px] mt-1 text-[#8E857A]">
                {r.role}
                {r.location ? `, ${r.location}` : ''}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="text-[11px] font-bold tracking-[0.22em] text-[#9C9284] mb-3.5">ABOUT POZOZO</div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[42px] leading-none tracking-tight mb-5">
              We only sell balls we&apos;d play with
            </h2>
            <p className="text-base sm:text-[16.5px] leading-relaxed text-[#5E574E] mb-4">
              Pozozo Sports supplies schools, clubs, academies and retailers with genuine Molten and Mikasa
              match and training balls — from rubber trainers that survive a hard court to FIBA and FIFA
              approved game balls.
            </p>
            <p className="text-base sm:text-[16.5px] leading-relaxed text-[#5E574E]">
              We keep the buying simple on purpose. Send a message, get a straight answer on price and stock,
              and deal with a person the whole way through.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#E4DED1] rounded-lg h-[240px] p-7">
              <Ball3D src="/balls/b33t5000-b.webp" alt="Molten 3x3 official ball" className="w-full h-full" />
            </div>
            <div className="bg-white border border-[#E4DED1] rounded-lg h-[240px] mt-8 p-7">
              <Ball3D src="/balls/fx5.webp" alt="Mikasa FX5 netball" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20">
        <div className="bg-[#C8482B] text-white rounded-lg py-14 sm:py-16 px-8 sm:px-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[52px] leading-none tracking-tight mb-4">
            Ready when you are
          </h2>
          <p className="text-base sm:text-[17.5px] leading-relaxed text-[#FFE6DF] max-w-[48ch] mx-auto mb-8">
            Send your list, ask about stock, or just check a price. We answer {STORE_CONFIG.operatingHours}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 flex items-center gap-2.5 bg-white hover:bg-[#12100E] hover:text-white text-[#12100E] text-sm font-bold rounded-full transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              WhatsApp {STORE_CONFIG.displayPhone}
            </a>
            <a
              href={contactMailUrl}
              className="h-14 px-8 flex items-center border border-white/50 hover:bg-[#12100E] text-white text-sm font-semibold rounded-full transition-colors"
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
            className="flex items-center gap-3.5 bg-[#12100E] text-[#F5F1E8] h-[58px] pl-6 pr-1.5 rounded-full shadow-2xl hover:shadow-[0_18px_40px_rgba(18,16,14,0.35)] transition-shadow"
          >
            <span className="text-sm font-bold">{totalItems} in your enquiry</span>
            <span className="bg-[#C8482B] text-white h-10 px-[18px] grid place-items-center text-[13px] font-bold rounded-full">
              Review &amp; send
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
