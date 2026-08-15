'use client';

import Link from 'next/link';
import { MessageCircle, Check, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getWhatsAppUrl } from '@/data/sportsConfig';
import { Ball3D } from '@/components/ball3d/Ball3D';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { cart, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { format } = useCurrency();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;
  const inWishlist = isInWishlist(product.id);

  const singleWaText = `Hello Pozozo Sports, is the ${product.brand} ${product.name} (${product.spec}) in stock, and what is the price?`;
  const waUrl = getWhatsAppUrl(singleWaText);

  return (
    <div className="group relative flex flex-col bg-white rounded border border-[#E4DED1] hover:border-[#12100E] overflow-hidden transition-colors duration-300 w-full">
      {/* 3D Ball Stage */}
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-5 sm:p-6">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 flex items-center justify-center p-5 sm:p-6">
          <Ball3D
            src={product.images[0] || '/balls/bg5000-a.webp'}
            alt={`${product.brand} ${product.name}`}
            flat={product.category === 'accessories'}
            priority={priority}
            className="w-full h-full"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tag && (
            <span className="bg-[#C8482B] text-white text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-white text-[#C8482B] shadow-md scale-110'
              : 'bg-white/80 hover:bg-white text-[#12100E] shadow-xs'
          }`}
          aria-label="Save to list"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-[#C8482B] stroke-[#C8482B]' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="px-4 pb-4 sm:px-[18px] sm:pb-[18px] pt-4 flex-1 flex flex-col gap-1.5 border-t border-[#E4DED1]">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9C9284]">
          {product.brand}
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="block text-sm sm:text-[16px] font-bold text-[#12100E] leading-tight line-clamp-1 transition-colors"
        >
          {product.name}
        </Link>

        <p className="text-[11.5px] sm:text-[12.5px] text-[#6B6459] line-clamp-2 leading-relaxed">
          {product.spec}
        </p>

        <div className="flex-1" />

        <div className="flex items-baseline justify-between gap-1 mt-2 mb-1">
          <span className="text-xs sm:text-sm font-extrabold text-[#12100E]">{format(product.price)}</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#3E7A4F]">In Stock</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          {/* Add to Enquiry List */}
          <button
            onClick={() => addToCart(product, product.colors[0]?.name, product.sizes[0], 1)}
            className={`flex-1 min-w-0 h-[42px] rounded-full text-[12.5px] sm:text-[13px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
              inCart
                ? 'bg-[#12100E] text-white border border-[#12100E]'
                : 'bg-[#F5F1E8] hover:bg-[#12100E] hover:text-white text-[#12100E] border border-[#DED7C9]'
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
            className="w-[42px] h-[42px] shrink-0 grid place-items-center border border-[#E4DED1] hover:bg-[#12100E] hover:text-white hover:border-[#12100E] text-[#12100E] rounded-full transition-colors"
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
