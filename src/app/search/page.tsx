'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className="py-12 sm:py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-4">
            Search Our Store
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, hoodie, denim, cargo..."
              className="w-full pl-12 pr-4 py-4 bg-[#F6F4F1] border border-[#E8E4DF] focus:border-[#1A1A1A] rounded-2xl text-sm font-medium text-[#1A1A1A] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-[#E8E4DF] mb-8">
          <p className="text-xs font-bold text-[#757575] uppercase tracking-wider">
            Showing {filtered.length} products
          </p>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-bold text-[#1A1A1A] hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No matching products</h3>
            <p className="text-xs text-[#757575] max-w-xs mx-auto mb-6">
              We couldn&apos;t find any items matching &quot;{query}&quot;. Try exploring our full collection.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-xl inline-block"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
