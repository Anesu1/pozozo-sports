'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Search,
  CheckCircle2,
  ShieldCheck,
  Award,
  Truck,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Phone,
  Send,
  Building,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { REVIEWS } from '@/data/reviews';
import { JOURNALS } from '@/data/journals';
import { ProductCard } from '@/components/ProductCard';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import { STORE_CONFIG, getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const { totalItems, openCart } = useCart();

  // Catalogue Filtering State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayLimit, setDisplayLimit] = useState<number>(12);

  // Bulk Enquiry Form State
  const [bulkWho, setBulkWho] = useState('');
  const [bulkWhat, setBulkWhat] = useState('');
  const [bulkWhere, setBulkWhere] = useState('');

  // Hero 3D Tilt State
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0, active: false });
  const heroCardRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x, y, active: true });
  };

  // Filtered Catalogue
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Brand Filter
    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Search Query Filter
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
  }, [selectedCategory, selectedBrand, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, displayLimit);

  // Bulk WhatsApp URL
  const bulkMessage = `Hello Pozozo Sports, bulk enquiry.\n\nFrom: ${bulkWho || '—'}\nNeeded: ${
    bulkWhat || '—'
  }\nDelivery to: ${bulkWhere || '—'}\n\nPlease send a quote with bulk pricing.`;
  const bulkWaUrl = getWhatsAppUrl(bulkMessage);

  const heroWaUrl = getWhatsAppUrl('Hello Pozozo Sports, I would like to inquire about match ball stock.');

  return (
    <div className="bg-[#FAF8F5] text-[#12100E] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 lg:py-24 border-b border-[#E8E4DF] bg-white">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#12100E] text-[#F5F1E8] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AUTHORISED MOLTEN &amp; MIKASA STOCK</span>
              </div>

              <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#12100E] leading-[1.1] font-display break-words">
                Match balls, <br className="hidden xs:inline" />
                ordered by message.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#5E574E] max-w-xl leading-relaxed">
                No card, no checkout. Pick what your club, school or shop needs, send the list on WhatsApp, and we come back with price, stock and delivery the same day.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#catalogue"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-[#12100E] hover:bg-black active:bg-black text-[#F5F1E8] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Explore Catalogue ({PRODUCTS.length})</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={heroWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-white shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Key Trust Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#E8E4DF]">
                <div className="space-y-0.5 p-2 sm:p-0">
                  <div className="text-lg sm:text-2xl font-black text-[#12100E]">51+</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#8E857A] uppercase">Ball Models</div>
                </div>
                <div className="space-y-0.5 p-2 sm:p-0">
                  <div className="text-lg sm:text-2xl font-black text-[#12100E]">100%</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#8E857A] uppercase">Genuine Stock</div>
                </div>
                <div className="space-y-0.5 p-2 sm:p-0">
                  <div className="text-lg sm:text-2xl font-black text-[#12100E]">Same-Day</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#8E857A] uppercase">WhatsApp Quote</div>
                </div>
                <div className="space-y-0.5 p-2 sm:p-0">
                  <div className="text-lg sm:text-2xl font-black text-[#12100E]">Bulk &amp; School</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#8E857A] uppercase">Pro-Formas</div>
                </div>
              </div>
            </div>

            {/* Hero Interactive 3D Ball Showcase */}
            <div className="lg:col-span-5">
              <div
                ref={heroCardRef}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={() => setHeroTilt({ x: 0, y: 0, active: false })}
                className="relative bg-[#F6F4F1] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8E4DF] shadow-xl flex flex-col items-center justify-center min-h-[340px] sm:min-h-[420px] overflow-hidden"
              >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#DED7C9_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Flagship Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                  <span className="bg-[#12100E] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    FLAGSHIP GAME BALLS
                  </span>
                </div>

                {/* 3D Ball Shadow */}
                <div
                  className="absolute bottom-8 sm:bottom-10 left-1/2 w-40 sm:w-48 h-5 sm:h-6 -translate-x-1/2 rounded-[50%] bg-radial from-black/50 to-transparent blur-xs pointer-events-none transition-all duration-150"
                  style={{
                    transform: heroTilt.active
                      ? `translateX(calc(-50% + ${-heroTilt.x * 30}px)) scaleX(${
                          1 - Math.abs(heroTilt.x) * 0.2
                        })`
                      : 'translateX(-50%)',
                  }}
                />

                {/* Interactive 3D Sphere */}
                <div
                  className="relative w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72 transition-transform duration-200 ease-out flex items-center justify-center z-10"
                  style={{
                    transform: heroTilt.active
                      ? `rotateY(${heroTilt.x * 28}deg) rotateX(${-heroTilt.y * 28}deg) translateZ(30px) scale(1.08)`
                      : 'rotateY(0deg) rotateX(0deg) scale(1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Image
                    src="/balls/bg5000-a.webp"
                    alt="Molten BG5000 Official Game Ball"
                    fill
                    priority
                    className="object-contain drop-shadow-2xl"
                  />

                  {/* Specular Light Reflection */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-60"
                    style={{
                      background: `radial-gradient(circle at ${32 + (heroTilt.active ? heroTilt.x * 40 : 0)}% ${
                        26 + (heroTilt.active ? heroTilt.y * 32 : 0)
                      }%, rgba(255,255,255,0.7), rgba(255,255,255,0) 45%)`,
                    }}
                  />
                </div>

                <div className="mt-4 text-center z-10">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#12100E]">
                    Molten BG5000 Official Game Ball
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#8E857A] font-semibold">
                    Size 7 genuine leather · FIBA Approved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full Live Interactive Catalogue Section */}
      <section id="catalogue" className="py-12 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#E8E4DF] mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8E857A] block mb-1 sm:mb-2">
                COMPLETE MATCH STOCK
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#12100E] tracking-tight font-display">
                Browse The Balls
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E857A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. BG5000, FT550B, size 5..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F4F1] border border-[#E8E4DF] focus:border-[#12100E] rounded-xl text-xs font-semibold text-[#12100E] placeholder-[#8E857A] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Category & Brand Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-8">
            {/* Category Filter Pills (Horizontal Scroll) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                const count =
                  cat.slug === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === cat.slug).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#12100E] text-[#F5F1E8] shadow-xs'
                        : 'bg-[#F6F4F1] hover:bg-[#ECE9E7] active:bg-[#ECE9E7] text-[#5E574E] border border-[#E8E4DF]'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Brand Filter */}
            <div className="flex items-center gap-1 bg-[#F6F4F1] p-1 rounded-xl border border-[#E8E4DF] shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedBrand === 'all' ? 'bg-white text-[#12100E] shadow-xs' : 'text-[#8E857A]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedBrand('Molten')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedBrand === 'Molten' ? 'bg-white text-[#12100E] shadow-xs' : 'text-[#8E857A]'
                }`}
              >
                Molten
              </button>
              <button
                onClick={() => setSelectedBrand('Mikasa')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedBrand === 'Mikasa' ? 'bg-white text-[#12100E] shadow-xs' : 'text-[#8E857A]'
                }`}
              >
                Mikasa
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {visibleProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              <AnimatePresence>
                {visibleProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-16 sm:py-20 text-center bg-[#F6F4F1] rounded-3xl p-6 sm:p-8 border border-[#E8E4DF]">
              <h3 className="text-lg sm:text-xl font-bold text-[#12100E] mb-2">No balls found</h3>
              <p className="text-xs text-[#8E857A] mb-6">
                No products match &quot;{searchQuery}&quot; in the selected category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#12100E] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > displayLimit && (
            <div className="mt-10 sm:mt-12 text-center">
              <button
                onClick={() => setDisplayLimit((prev) => prev + 16)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F6F4F1] hover:bg-[#12100E] hover:text-white text-[#12100E] border border-[#E8E4DF] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
              >
                Show All {filteredProducts.length} Balls
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. "How Ordering Works" 3-Step Section */}
      <section className="py-16 sm:py-24 lg:py-28 bg-[#12100E] text-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
              SIMPLE &amp; DIRECT
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white font-display">
              How ordering works
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              No credit cards, no checkout hurdles. Order by WhatsApp message for instant personal service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-[#1C1815] p-6 sm:p-8 rounded-3xl border border-[#2A2622] space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2A2622] text-white font-black text-base sm:text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Build your list</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Add balls and set quantities from our live stock. Mix basketballs, netballs, footballs, and gauges in a single list.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1C1815] p-6 sm:p-8 rounded-3xl border border-[#2A2622] space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600 text-white font-black text-base sm:text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Send it on WhatsApp</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                One tap opens WhatsApp with your full item list, sizes, and specs already formatted.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1C1815] p-6 sm:p-8 rounded-3xl border border-[#2A2622] space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2A2622] text-white font-black text-base sm:text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">We quote &amp; deliver</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Get price, stock, and delivery schedule confirmed in writing. Pay on collection, delivery, or institutional invoice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Bulk & School Orders" Dedicated Form Section */}
      <section id="bulk" className="py-16 sm:py-24 lg:py-28 bg-[#F6F4F1] border-b border-[#E8E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E4DF] text-xs font-bold uppercase tracking-wider text-[#12100E]">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                <span>INSTITUTIONAL &amp; LEAGUE SUPPLY</span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#12100E] tracking-tight font-display">
                Kitting out a whole season?
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-[#5E574E] leading-relaxed">
                We supply schools, academies, universities, and tournament leagues with multi-sport packages. Tell us what your department needs and we’ll prepare a formal quote.
              </p>

              <ul className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-[#12100E]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tiered bulk volume pricing for orders of 10+ balls</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-[#12100E]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official pro-forma invoices &amp; procurement documentation</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-[#12100E]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nationwide courier delivery direct to your sports office</span>
                </li>
              </ul>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E4DF] shadow-xl space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#12100E]">Quick Bulk Request</h3>
              <p className="text-xs text-[#8E857A]">
                Fill out the fields below to generate a pre-formatted WhatsApp quote instantly.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E857A] block mb-1">
                    Your Name / School / Club *
                  </label>
                  <input
                    type="text"
                    value={bulkWho}
                    onChange={(e) => setBulkWho(e.target.value)}
                    placeholder="e.g. Kabulonga Girls Secondary / Lusaka City FC"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#F6F4F1] border border-[#E8E4DF] rounded-xl text-xs font-semibold text-[#12100E] outline-none focus:border-[#12100E]"
                  />
                </div>

                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E857A] block mb-1">
                    What balls &amp; quantities do you need? *
                  </label>
                  <textarea
                    rows={3}
                    value={bulkWhat}
                    onChange={(e) => setBulkWhat(e.target.value)}
                    placeholder="e.g. 15 × Mikasa FT550B footballs, 10 × Turbo SS-T netballs, 2 × Molten BG5000 basketballs, 1 AG500 gauge"
                    className="w-full p-3 bg-[#F6F4F1] border border-[#E8E4DF] rounded-xl text-xs font-semibold text-[#12100E] outline-none focus:border-[#12100E] resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E857A] block mb-1">
                    Delivery Location / Town *
                  </label>
                  <input
                    type="text"
                    value={bulkWhere}
                    onChange={(e) => setBulkWhere(e.target.value)}
                    placeholder="e.g. Lusaka, Kitwe, Ndola, or collection"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#F6F4F1] border border-[#E8E4DF] rounded-xl text-xs font-semibold text-[#12100E] outline-none focus:border-[#12100E]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={bulkWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Bulk Request on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <ReviewCarousel />

      {/* 6. Equipment Guides & Journal */}
      <section className="py-16 sm:py-24 lg:py-28 bg-white border-t border-[#E8E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8E857A] block mb-1">
                EQUIPMENT INTELLIGENCE
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-[#12100E] tracking-tight font-display">
                Ball Guides &amp; Care
              </h2>
            </div>
            <Link
              href="/journal"
              className="text-xs font-bold uppercase tracking-wider text-[#12100E] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {JOURNALS.map((journal) => (
              <Link
                key={journal.id}
                href={`/journal/${journal.slug}`}
                className="group flex flex-col bg-[#F6F4F1] rounded-3xl overflow-hidden border border-[#E8E4DF] hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-white overflow-hidden p-6 flex items-center justify-center">
                  <Image
                    src={journal.coverImage}
                    alt={journal.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#12100E]">
                    {journal.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#8E857A] block mb-1">
                      {journal.date} • {journal.readTime}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#12100E] group-hover:text-black line-clamp-2">
                      {journal.title}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-[#12100E] flex items-center gap-1 group-hover:underline pt-2 border-t border-[#E8E4DF]">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom WhatsApp Bar for quick access */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <a
          href={heroWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full font-bold text-xs shadow-2xl transition-transform hover:scale-105 active:scale-95"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
          <span className="hidden xs:inline">WhatsApp Order</span>
        </a>
      </div>
    </div>
  );
}
