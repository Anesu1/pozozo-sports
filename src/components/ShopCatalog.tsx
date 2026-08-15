'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2, Grid3X3, LayoutGrid, Search, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { COLLECTIONS } from '@/data/collections';
import { ProductCard } from '@/components/ProductCard';

interface ShopCatalogProps {
  initialCategory?: string;
  initialCollection?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export function ShopCatalog({
  initialCategory = 'all',
  initialCollection = 'all',
  pageTitle = 'Complete Match Stock',
  pageDescription = 'All 51 genuine Molten and Mikasa match and training balls. Ordered directly by WhatsApp message.',
}: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter Collection / Brand
    if (selectedCollection !== 'all') {
      list = list.filter((p) => p.collections.includes(selectedCollection));
    }

    // Filter Brand
    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Search Query
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

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedCollection, selectedBrand, searchQuery, sortBy]);

  const activeCollectionMeta = COLLECTIONS.find((c) => c.slug === selectedCollection);

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#E8E4DF]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8E857A] mb-2">
            <Link href="/" className="hover:text-[#12100E]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#12100E]">Catalogue</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#12100E] mb-3 font-display">
                {activeCollectionMeta && activeCollectionMeta.slug !== 'all'
                  ? activeCollectionMeta.name
                  : pageTitle}
              </h1>
              <p className="text-sm sm:text-base text-[#5E574E] max-w-2xl">
                {activeCollectionMeta && activeCollectionMeta.slug !== 'all'
                  ? activeCollectionMeta.description
                  : pageDescription}
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E857A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ball model, spec..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F4F1] border border-[#E8E4DF] focus:border-[#12100E] rounded-xl text-xs font-semibold text-[#12100E] placeholder-[#8E857A] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Collections / Brands Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {COLLECTIONS.map((col) => {
            const isActive = selectedCollection === col.slug;
            return (
              <button
                key={col.id}
                onClick={() => {
                  setSelectedCollection(col.slug);
                  if (col.slug === 'molten') setSelectedBrand('Molten');
                  else if (col.slug === 'mikasa') setSelectedBrand('Mikasa');
                  else setSelectedBrand('all');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#12100E] text-[#F5F1E8] shadow-xs'
                    : 'bg-[#F6F4F1] hover:bg-[#ECE9E7] text-[#5E574E] border border-[#E8E4DF]'
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>

        {/* Categories & Layout Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 bg-[#F6F4F1] rounded-2xl border border-[#E8E4DF] mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#12100E] shadow-xs'
                      : 'text-[#5E574E] hover:text-[#12100E]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Grid Layout */}
          <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#E8E4DF]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#12100E]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8E857A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E8E4DF] rounded-lg px-2.5 py-1.5 text-xs text-[#12100E] outline-none font-medium cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Grid Columns */}
            <div className="hidden lg:flex items-center bg-white border border-[#E8E4DF] rounded-lg p-0.5">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-md ${
                  gridCols === 2 ? 'bg-[#F6F4F1] text-[#12100E]' : 'text-[#8E857A]'
                }`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-md ${
                  gridCols === 3 ? 'bg-[#F6F4F1] text-[#12100E]' : 'text-[#8E857A]'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-md ${
                  gridCols === 4 ? 'bg-[#F6F4F1] text-[#12100E]' : 'text-[#8E857A]'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className={`grid gap-6 ${
              gridCols === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : gridCols === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
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
          <div className="py-20 text-center bg-[#F6F4F1] rounded-3xl p-12">
            <h3 className="text-xl font-bold text-[#12100E] mb-2">No balls found</h3>
            <p className="text-xs sm:text-sm text-[#8E857A] max-w-sm mx-auto mb-6">
              There are no products matching this specific filter and search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCollection('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-[#12100E] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
