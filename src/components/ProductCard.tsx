'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Check, Heart, Shield, Award } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getWhatsAppUrl } from '@/data/sportsConfig';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { cart, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { format } = useCurrency();

  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const cardRef = useRef<HTMLDivElement>(null);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;
  const inWishlist = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  const singleWaText = `Hello Pozozo Sports, is the ${product.brand} ${product.name} (${product.spec}) in stock, and what is the price?`;
  const waUrl = getWhatsAppUrl(singleWaText);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E8E4DF] hover:border-[#1A1A1A] overflow-hidden transition-all duration-300 hover:shadow-xl w-full"
    >
      {/* 3D Ball Container */}
      <div className="relative aspect-square w-full bg-[#F6F4F1] overflow-hidden flex items-center justify-center p-4 sm:p-6 perspective-[900px]">
        {/* Dynamic Ball Floor Shadow */}
        <div
          className="absolute bottom-4 sm:bottom-5 left-1/2 w-3/5 h-3.5 sm:h-4 -translate-x-1/2 rounded-[50%] bg-radial from-black/40 to-transparent blur-xs pointer-events-none transition-all duration-150 ease-out"
          style={{
            transform: tilt.active
              ? `translateX(calc(-50% + ${-tilt.x * 20}px)) scaleX(${1 - Math.abs(tilt.x) * 0.2}) scaleY(${1 - Math.abs(tilt.y) * 0.2})`
              : 'translateX(-50%)',
            opacity: tilt.active ? 0.75 : 0.45,
          }}
        />

        {/* 3D Rotating Sphere */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: tilt.active
              ? `rotateY(${tilt.x * 24}deg) rotateX(${-tilt.y * 24}deg) translateZ(20px) scale(1.05)`
              : 'rotateY(0deg) rotateX(0deg) scale(1)',
            transformStyle: 'preserve-3d',
          }}
        >
          <Image
            src={product.images[0] || '/balls/bg5000-a.webp'}
            alt={`${product.brand} ${product.name}`}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-contain p-2 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dynamic Light Shading & Specular Gloss Sphere Overlay */}
          <div
            className="absolute inset-[6%] rounded-full pointer-events-none transition-all duration-150 mix-blend-multiply opacity-60"
            style={{
              background: `radial-gradient(circle at ${72 + (tilt.active ? tilt.x * 30 : 0)}% ${
                76 + (tilt.active ? tilt.y * 24 : 0)
              }%, rgba(18,16,14,0.45), rgba(18,16,14,0) 60%)`,
            }}
          />
          <div
            className="absolute inset-[10%] rounded-full pointer-events-none transition-all duration-150 mix-blend-screen opacity-50"
            style={{
              background: `radial-gradient(circle at ${32 + (tilt.active ? tilt.x * 36 : 0)}% ${
                26 + (tilt.active ? tilt.y * 28 : 0)
              }%, rgba(255,255,255,0.6), rgba(255,255,255,0) 45%)`,
            }}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tag ? (
            <span className="bg-[#12100E] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-xs">
              {product.tag}
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-md text-[#12100E] border border-[#E8E4DF] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
              {product.brand}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 shadow-md scale-110'
              : 'bg-white/80 hover:bg-white text-[#12100E] shadow-xs'
          }`}
          aria-label="Save to list"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between border-t border-[#E8E4DF] bg-white">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#8E857A] uppercase tracking-wider">
            <span>{product.brand}</span>
            <span className="text-[9px] sm:text-[10px] bg-[#F6F4F1] px-1.5 py-0.5 rounded text-[#12100E] capitalize">
              {product.category}
            </span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="block text-xs sm:text-base font-bold text-[#12100E] hover:text-black line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>

          <p className="text-[11px] sm:text-xs text-[#5E574E] line-clamp-2 leading-relaxed">
            {product.spec}
          </p>
        </div>

        {/* Pricing & WhatsApp Actions */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E8E4DF] space-y-2">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-[10px] sm:text-xs text-[#8E857A] font-semibold">Guide:</span>
              <span className="text-xs sm:text-base font-extrabold text-[#12100E]">
                {format(product.price)}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
              In Stock
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Add to Enquiry Basket */}
            <button
              onClick={() => addToCart(product, product.colors[0]?.name, product.sizes[0], 1)}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs ${
                inCart
                  ? 'bg-[#12100E] text-white'
                  : 'bg-[#F6F4F1] hover:bg-[#12100E] hover:text-white active:bg-[#12100E] active:text-white text-[#12100E] border border-[#E8E4DF]'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span className="truncate">Added · {cartItem.quantity}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">Add to List</span>
                </>
              )}
            </button>

            {/* Direct 1-Click WhatsApp Enquiry */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl transition-all shadow-xs flex items-center justify-center shrink-0"
              title="Inquire directly on WhatsApp"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
