'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ClipboardList, Minus, Plus, Check } from 'lucide-react';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getWhatsAppUrl } from '@/data/sportsConfig';
import { Ball3D } from '@/components/ball3d/Ball3D';

export function QuickViewModal() {
  const { quickViewProduct, isQuickViewOpen, closeQuickView } = useQuickView();
  const { cart, addToCart } = useCart();
  const { format } = useCurrency();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isQuickViewOpen) setQuantity(1);
  }, [isQuickViewOpen, quickViewProduct]);

  if (!quickViewProduct) return null;
  const product = quickViewProduct;

  const cartItem = cart.find((item) => item.product.id === product.id);
  const waUrl = getWhatsAppUrl(
    `Hello Pozozo Sports, is the ${product.brand} ${product.name} (${product.spec}) in stock for quantity ${quantity}, and what is the confirmed price?`
  );

  const rows = [
    { k: 'Brand', v: product.brand },
    { k: 'Specification', v: product.spec },
    { k: 'Category', v: product.categoryLabel },
    { k: 'Price', v: format(product.price) },
  ];

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-[#13251C]/55 backdrop-blur-sm"
          />
          <div className="min-h-screen px-3 sm:px-4 flex items-center justify-center py-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-[#F3F5F0] rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-2 z-10 shadow-[0_30px_80px_rgba(14,23,38,.45)]"
            >
              <button
                onClick={closeQuickView}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-sm border border-[#BCC4B4] bg-[#F3F5F0] hover:bg-[#13251C] hover:text-white hover:border-[#13251C] text-[#13251C] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative min-h-[280px] sm:min-h-[340px] bg-white flex items-center justify-center p-9 border-b sm:border-b-0 sm:border-r border-[#D8DED2]">
                <Ball3D
                  src={product.images[0]}
                  alt={product.name}
                  flat={product.category === 'accessories'}
                  className="w-full h-full"
                />
              </div>

              <div className="p-8 sm:p-9 flex flex-col">
                <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5B6B54] mb-2.5">
                  {product.brand}
                </div>
                <h2 className="font-display uppercase text-[28px] sm:text-[34px] leading-none tracking-tight mb-3">
                  {product.name}
                </h2>
                <p className="text-[15px] leading-relaxed text-[#3C4536] mb-5">{product.summary}</p>

                <div className="border-t border-[#D8DED2] mb-5">
                  {rows.map((r) => (
                    <div key={r.k} className="flex gap-5 py-3 border-b border-[#D8DED2] text-[14.5px]">
                      <span className="min-w-[104px] text-[#5B6B54] font-semibold">{r.k}</span>
                      <span className="text-[#13251C] font-medium">{r.v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3.5">
                  <div className="flex items-center border border-[#D8DED2] bg-white rounded-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-10 flex items-center justify-center text-[#13251C]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="min-w-[26px] text-center text-sm font-bold text-[#13251C]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-10 flex items-center justify-center text-[#13251C]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, product.colors[0]?.name, product.sizes[0], quantity);
                      closeQuickView();
                    }}
                    className="flex-1 min-w-0 h-10 rounded-sm bg-[#13251C] hover:bg-black text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {cartItem ? <Check className="w-3.5 h-3.5" /> : <ClipboardList className="w-3.5 h-3.5" />}
                    <span className="truncate">{cartItem ? `Added · ${cartItem.quantity}` : 'Add to enquiry'}</span>
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 shrink-0 grid place-items-center rounded-sm bg-[#F2900E] hover:bg-[#13251C] hover:text-white text-[#13251C] transition-colors"
                    title="Ask about this on WhatsApp"
                    aria-label="Ask about this on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-[#5B6B54] leading-relaxed mb-4">
                  Price on enquiry — it moves with quantity and the exchange rate, so we quote rather than publish.
                </p>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeQuickView}
                  className="text-[13px] font-bold text-[#13251C] hover:underline mt-auto"
                >
                  View full details →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
