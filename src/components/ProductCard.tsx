'use client';

import Link from 'next/link';
import { MessageCircle, Check, Heart, Expand } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { getWhatsAppUrl } from '@/data/sportsConfig';
import { Ball3D } from '@/components/ball3d/Ball3D';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { cart, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;
  const inWishlist = isInWishlist(product.id);

  const singleWaText = `Hello Pozozo Sports, is the ${product.brand} ${product.name} (${product.spec}) in stock, and what is the price?`;
  const waUrl = getWhatsAppUrl(singleWaText);

  return (
    <div className="group relative flex flex-col bg-white rounded-sm border border-[#D8DED2] hover:border-[#13251C] overflow-hidden transition-colors duration-300 w-full">
      {/* 3D Ball Stage */}
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-5 sm:p-6">
        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="absolute inset-0 flex items-center justify-center p-5 sm:p-6"
          aria-label={`Quick view ${product.name}`}
        >
          <Ball3D
            src={product.images[0] || '/balls/bg5000-a.webp'}
            alt={`${product.brand} ${product.name}`}
            flat={product.category === 'accessories'}
            priority={priority}
            className="w-full h-full"
          />
        </button>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tag && (
            <span className="bg-[#F2900E] text-[#13251C] text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 p-1.5 sm:p-2 rounded-sm backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-white text-[#13251C] border border-[#F2900E] shadow-md scale-110'
              : 'bg-white/80 hover:bg-white text-[#13251C] shadow-xs'
          }`}
          aria-label="Save to list"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-[#F2900E] stroke-[#13251C]' : ''}`} />
        </button>

        {/* Quick View */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-10 p-1.5 sm:p-2 rounded-sm bg-white/80 hover:bg-[#13251C] hover:text-white text-[#13251C] shadow-xs opacity-0 group-hover:opacity-100 transition-all"
          title="Quick view"
          aria-label="Quick view"
        >
          <Expand className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="px-4 pb-4 sm:px-[18px] sm:pb-[18px] pt-4 flex-1 flex flex-col gap-1.5 border-t border-[#D8DED2]">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5B6B54]">
          {product.brand}
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="block font-display uppercase text-[15px] sm:text-[18px] text-[#13251C] leading-tight line-clamp-1 transition-colors"
        >
          {product.name}
        </Link>

        <p className="text-[11.5px] sm:text-[12.5px] text-[#5B6B54] line-clamp-2 leading-relaxed">
          {product.spec}
        </p>

        <div className="flex-1" />

        <div className="flex items-center justify-between gap-1 mt-2 mb-1">
          <span className="text-[9px] sm:text-[10px] font-bold text-[#1E7A4E] bg-[#E4F1E9] px-2 py-0.5 rounded-sm">In Stock</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          {/* Add to Enquiry List */}
          <button
            onClick={() => addToCart(product, product.colors[0]?.name, product.sizes[0], 1)}
            className={`flex-1 min-w-0 h-[42px] rounded-sm text-[12.5px] sm:text-[13px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
              inCart
                ? 'bg-[#13251C] text-white border border-[#13251C]'
                : 'bg-[#F3F5F0] hover:bg-[#13251C] hover:text-white text-[#13251C] border border-[#D8DED2]'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="truncate">Added · {cartItem.quantity}</span>
              </>
            ) : (
              <span className="truncate">Add to enquiry</span>
            )}
          </button>

          {/* Direct 1-Click WhatsApp Enquiry */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[42px] h-[42px] shrink-0 grid place-items-center border border-[#D8DED2] hover:bg-[#13251C] hover:text-white hover:border-[#13251C] text-[#13251C] rounded-sm transition-colors"
            title="Ask about this on WhatsApp"
            aria-label="WhatsApp enquiry"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
