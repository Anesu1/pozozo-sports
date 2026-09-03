'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';

export function WishlistPageClient() {
  const { wishlist, clearWishlist, count } = useWishlist();
  const { addToCart, openCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach((p) => {
      addToCart(p, p.colors[0]?.name, p.sizes[0], 1);
    });
    openCart();
  };

  return (
    <div className="py-12 sm:py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E7EAE1] mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54] mb-2 block">
              SAVED ITEMS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13251C] tracking-tight">
              My Wishlist ({count})
            </h1>
          </div>

          {count > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToBag}
                className="px-5 py-2.5 bg-[#13251C] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 bg-[#F0F2EC] hover:bg-[#E7EAE1] text-[#5B6B54] hover:text-rose-600 border border-[#E7EAE1] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {count === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#F0F2EC] text-[#5B6B54] rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-[#13251C]">Your wishlist is empty</h3>
            <p className="text-xs sm:text-sm text-[#5B6B54]">
              Save pieces you love while browsing our store, and revisit them here anytime.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#13251C] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                <span>Discover Styles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
