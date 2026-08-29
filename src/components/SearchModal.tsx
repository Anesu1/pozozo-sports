'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.spec.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          (p.tag && p.tag.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = ['BG5000', 'FT550B', 'Turbo Netball', 'Molten 3x3', 'AG500 Gauge', 'Size 7'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          <div className="min-h-screen px-3 sm:px-4 text-center flex items-start justify-center pt-14 sm:pt-20 pb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden text-left border border-[#E7EAE1] z-10"
            >
              {/* Search Header Input */}
              <div className="p-3.5 sm:p-5 border-b border-[#E7EAE1] flex items-center gap-2.5 sm:gap-3 bg-[#F0F2EC]/50">
                <Search className="w-5 h-5 text-[#5B6B54] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ball model, brand, or size..."
                  className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#13251C] placeholder-[#8B9782] outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-[#5B6B54] hover:text-[#13251C] hover:bg-black/5 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-2 py-1 text-xs font-semibold text-[#5B6B54] hover:text-[#13251C] bg-white border border-[#E7EAE1] rounded-md shadow-xs"
                >
                  ESC
                </button>
              </div>

              {/* Popular Searches */}
              <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#F0F2EC] border-b border-[#E7EAE1] flex items-center gap-2 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5 text-xs text-[#5B6B54] font-semibold shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Popular:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-2.5 py-1 text-xs bg-white hover:bg-[#13251C] hover:text-white text-[#13251C] border border-[#E7EAE1] rounded-full transition-all shrink-0"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
                {query.trim() === '' ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#5B6B54] mb-3">
                      Featured Stock
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PRODUCTS.slice(0, 4).map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F0F2EC] transition-colors border border-transparent hover:border-[#E7EAE1]"
                        >
                          <div className="relative w-12 h-12 bg-[#F0F2EC] rounded-lg overflow-hidden shrink-0 border border-[#E7EAE1]">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#13251C] truncate">
                              {p.brand} {p.name}
                            </h4>
                            <p className="text-[11px] text-[#5B6B54] truncate">{p.spec}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#5B6B54] mb-2">
                      Matching Balls ({filteredProducts.length})
                    </p>
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F0F2EC] transition-colors border border-transparent hover:border-[#E7EAE1]"
                      >
                        <div className="relative w-12 h-12 bg-[#F0F2EC] rounded-lg overflow-hidden shrink-0 border border-[#E7EAE1]">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#13251C] truncate">
                            {p.brand} {p.name}
                          </h4>
                          <p className="text-[11px] text-[#5B6B54] truncate">{p.spec}</p>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold shrink-0">In Stock</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-sm font-bold text-[#13251C]">No balls found</p>
                    <p className="text-xs text-[#5B6B54]">
                      We couldn&apos;t find any model matching &quot;{query}&quot;. Try &quot;Molten&quot;, &quot;Mikasa&quot;, or &quot;FT550B&quot;.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
