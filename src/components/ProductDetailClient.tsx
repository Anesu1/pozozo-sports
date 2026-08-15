'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  Plus,
  Minus,
  MessageCircle,
  ClipboardList,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle2,
  Share2,
  ChevronDown,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useToast } from '@/context/ToastContext';
import { ProductCard } from '@/components/ProductCard';
import { STORE_CONFIG, getWhatsAppUrl } from '@/data/sportsConfig';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('specs');

  // 3D Tilt for large main view
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const ballBoxRef = useRef<HTMLDivElement>(null);

  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { format } = useCurrency();
  const { showToast } = useToast();

  const inWishlist = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!ballBoxRef.current) return;
    const rect = ballBoxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  const handleAddToCart = () => {
    addToCart(product, product.colors[0]?.name, product.sizes[0], quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ball link copied to clipboard!', 'success');
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  // Pre-filled WhatsApp message for this ball
  const waText = `Hello Pozozo Sports, is the ${product.brand} ${product.name} (${product.spec}) in stock for quantity ${quantity}, and what is the confirmed price?`;
  const waUrl = getWhatsAppUrl(waText);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#8E857A] mb-6 sm:mb-12 overflow-x-auto no-scrollbar pb-1">
          <Link href="/" className="hover:text-[#12100E] shrink-0">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#12100E] shrink-0">
            Catalogue
          </Link>
          <span>/</span>
          <Link
            href={`/shop/category/${product.category}`}
            className="hover:text-[#12100E] capitalize shrink-0"
          >
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-[#12100E] font-bold truncate">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: 3D Interactive Ball Presentation */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Multi-view Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-y-auto no-scrollbar shrink-0 sm:w-24 pb-1 sm:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F6F4F1] border overflow-hidden transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#12100E] ring-2 ring-[#12100E] ring-offset-2 scale-105'
                        : 'border-[#E8E4DF] hover:border-[#12100E]/40'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main 3D Ball Stage */}
            <div
              ref={ballBoxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex-1 aspect-square bg-[#F6F4F1] rounded-3xl border border-[#E8E4DF] overflow-hidden p-6 xs:p-8 sm:p-12 shadow-sm flex items-center justify-center perspective-[1000px] max-h-[440px] sm:max-h-none mx-auto w-full"
            >
              {/* Dynamic Floor Shadow */}
              <div
                className="absolute bottom-6 sm:bottom-10 left-1/2 w-3/5 h-4 sm:h-6 -translate-x-1/2 rounded-[50%] bg-radial from-black/50 to-transparent blur-xs pointer-events-none transition-all duration-150"
                style={{
                  transform: tilt.active
                    ? `translateX(calc(-50% + ${-tilt.x * 30}px)) scaleX(${
                        1 - Math.abs(tilt.x) * 0.2
                      })`
                    : 'translateX(-50%)',
                  opacity: tilt.active ? 0.8 : 0.45,
                }}
              />

              {/* 3D Rotating Sphere */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
                style={{
                  transform: tilt.active
                    ? `rotateY(${tilt.x * 26}deg) rotateX(${-tilt.y * 26}deg) translateZ(26px) scale(1.06)`
                    : 'rotateY(0deg) rotateX(0deg) scale(1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-2 sm:p-4 drop-shadow-2xl"
                />

                {/* Shading & Specular Glare */}
                <div
                  className="absolute inset-[6%] rounded-full pointer-events-none mix-blend-multiply opacity-60"
                  style={{
                    background: `radial-gradient(circle at ${72 + (tilt.active ? tilt.x * 34 : 0)}% ${
                      76 + (tilt.active ? tilt.y * 26 : 0)
                    }%, rgba(18,16,14,0.4), rgba(18,16,14,0) 60%)`,
                  }}
                />
                <div
                  className="absolute inset-[10%] rounded-full pointer-events-none mix-blend-screen opacity-55"
                  style={{
                    background: `radial-gradient(circle at ${32 + (tilt.active ? tilt.x * 40 : 0)}% ${
                      26 + (tilt.active ? tilt.y * 32 : 0)
                    }%, rgba(255,255,255,0.65), rgba(255,255,255,0) 46%)`,
                  }}
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1.5 z-10">
                <span className="bg-[#12100E] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                  {product.brand}
                </span>
                {product.tag && (
                  <span className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Share */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/80 hover:bg-white text-[#12100E] shadow-sm transition-transform active:scale-95 z-10"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Right: Purchase & WhatsApp Ordering Panel */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#8E857A] uppercase tracking-wider mb-2">
                <span>
                  {product.brand} • {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-[#12100E]">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 stroke-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#8E857A]">({product.reviewsCount})</span>
                </div>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-[#12100E] leading-tight font-display">
                {product.name}
              </h1>

              {/* Specification Subtitle */}
              <p className="text-xs sm:text-sm font-semibold text-[#8E857A] mt-1">
                {product.spec}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 sm:gap-3 mt-3">
                <span className="text-xs text-[#8E857A] font-semibold">Guide Price:</span>
                <span className="text-xl sm:text-3xl font-extrabold text-[#12100E]">
                  {format(product.price)}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                  In Stock
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5E574E] leading-relaxed">
              {product.description}
            </p>

            {/* Quick Spec Highlights */}
            <div className="p-3.5 sm:p-4 bg-[#F6F4F1] rounded-2xl border border-[#E8E4DF] grid grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-[#8E857A] block text-[10px] uppercase">Certification</strong>
                <span className="font-bold text-[#12100E] line-clamp-1">{product.features.certification}</span>
              </div>
              <div>
                <strong className="text-[#8E857A] block text-[10px] uppercase">Surface</strong>
                <span className="font-bold text-[#12100E] line-clamp-1">{product.features.intendedSurface}</span>
              </div>
            </div>

            {/* Quantity Stepper & Dual WhatsApp / List Actions */}
            <div className="pt-2 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E4DF] rounded-xl bg-[#F6F4F1] p-1 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 sm:p-2.5 rounded-lg hover:bg-white text-[#5E574E] hover:text-[#12100E] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <span className="px-2.5 sm:px-4 text-xs sm:text-sm font-bold text-[#12100E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 sm:p-2.5 rounded-lg hover:bg-white text-[#5E574E] hover:text-[#12100E] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Primary: Inquire on WhatsApp */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span className="truncate">Inquire on WhatsApp</span>
                </a>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 sm:p-4 rounded-xl border transition-all shrink-0 ${
                    inWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm'
                      : 'bg-white border-[#E8E4DF] hover:bg-[#F6F4F1] text-[#12100E]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Secondary: Add to Multi-Item List */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3 sm:py-3.5 bg-[#12100E] hover:bg-black active:bg-black text-[#F5F1E8] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Add to Multi-Item Enquiry List</span>
              </button>
            </div>

            {/* Accordions */}
            <div className="pt-4 sm:pt-6 border-t border-[#E8E4DF] space-y-2.5 sm:space-y-3">
              {/* Accordion 1: Technical Specs */}
              <div className="border border-[#E8E4DF] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('specs')}
                  className="w-full p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm text-[#12100E] bg-white flex items-center justify-between"
                >
                  <span>Ball Technical Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E857A] transition-transform ${
                      activeAccordion === 'specs' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'specs' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-3.5 sm:px-4 pb-4 bg-white text-xs text-[#5E574E] space-y-2.5"
                    >
                      <ul className="space-y-1.5 list-disc list-inside">
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 pt-2 border-t border-[#E8E4DF] text-[11px]">
                        <div>
                          <strong>Material:</strong> {product.features.material}
                        </div>
                        <div>
                          <strong>Surface:</strong> {product.features.intendedSurface}
                        </div>
                        <div>
                          <strong>Approval:</strong> {product.features.certification}
                        </div>
                        <div>
                          <strong>Spec:</strong> {product.features.sizeSpecification}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Ordering & Payment */}
              <div className="border border-[#E8E4DF] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('ordering')}
                  className="w-full p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm text-[#12100E] bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#12100E]" />
                    <span>Ordering, Payment &amp; School Invoices</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E857A] transition-transform ${
                      activeAccordion === 'ordering' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'ordering' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-3.5 sm:px-4 pb-4 bg-white text-xs text-[#5E574E] leading-relaxed"
                    >
                      We accept orders via WhatsApp message. You can pay on collection, upon courier delivery, or via official institutional bank transfer/pro-forma invoice for verified schools and clubs.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Related Balls Grid */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#E8E4DF]">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6 sm:mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8E857A] mb-1 block">
                  EXPLORE ALTERNATIVES
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-[#12100E]">
                  More {product.brand} &amp; {product.categoryLabel} Balls
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-[#12100E] hover:underline self-start xs:self-auto"
              >
                View Full Catalogue
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
