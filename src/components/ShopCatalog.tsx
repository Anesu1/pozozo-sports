'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2, Grid3X3, LayoutGrid, Search, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryMeta, CollectionMeta, Product } from '@/types';

interface ShopCatalogProps {
  products: Product[];
  categories: CategoryMeta[];
  collections: CollectionMeta[];
  initialCategory?: string;
  initialCollection?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export function ShopCatalog({
  products: PRODUCTS,
  categories: CATEGORIES,
  collections: COLLECTIONS,
  initialCategory = 'all',
  initialCollection = 'all',
  pageTitle = 'The full catalogue',
  pageDescription = 'All 80 genuine Molten, Mikasa and Fox40 balls and match-day accessories. Ordered directly by WhatsApp message.',
}: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedCollection !== 'all') {
      list = list.filter((p) => p.collections.includes(selectedCollection));
    }

    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

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
    <div className="py-12 sm:py-16 bg-[#F3F5F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#D8DED2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5B6B54] mb-2">
            <Link href="/" className="hover:text-[#13251C]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#13251C]">Catalogue</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#13251C] mb-3">
                {activeCollectionMeta && activeCollectionMeta.slug !== 'all'
                  ? activeCollectionMeta.name
                  : pageTitle}
              </h1>
              <p className="text-sm sm:text-base text-[#3C4536] max-w-2xl">
                {activeCollectionMeta && activeCollectionMeta.slug !== 'all'
                  ? activeCollectionMeta.description
                  : pageDescription}
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6B54]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ball model, spec..."
                className="w-full h-11 pl-10 pr-4 bg-white border border-[#D8DED2] focus:border-[#13251C] rounded-sm text-xs font-semibold text-[#13251C] placeholder-[#5B6B54] outline-none transition-colors"
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
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#13251C] text-[#F3F5F0]'
                    : 'bg-white hover:bg-[#E7EAE1] text-[#3C4536] border border-[#D8DED2]'
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>

        {/* Categories & Layout Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-[#D8DED2] mb-10">
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
                  className={`h-10 px-4 rounded-sm text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#13251C] text-[#F3F5F0]'
                      : 'text-[#3C4536] border border-[#BCC4B4] hover:border-[#13251C]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Grid Layout */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#13251C]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5B6B54]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#D8DED2] rounded-sm px-3.5 py-2 text-xs text-[#13251C] outline-none font-medium cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Grid Columns */}
            <div className="hidden lg:flex items-center bg-white border border-[#D8DED2] rounded-sm p-1">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-sm ${
                  gridCols === 2 ? 'bg-[#E7EAE1] text-[#13251C]' : 'text-[#5B6B54]'
                }`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-sm ${
                  gridCols === 3 ? 'bg-[#E7EAE1] text-[#13251C]' : 'text-[#5B6B54]'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-sm ${
                  gridCols === 4 ? 'bg-[#E7EAE1] text-[#13251C]' : 'text-[#5B6B54]'
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
            className={`grid gap-4 sm:gap-5 ${
              gridCols === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : gridCols === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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
          <div className="py-20 text-center bg-white rounded-sm border border-[#D8DED2] p-12">
            <h3 className="text-xl font-bold text-[#13251C] mb-2">No balls found</h3>
            <p className="text-xs sm:text-sm text-[#5B6B54] max-w-sm mx-auto mb-6">
              There are no products matching this specific filter and search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCollection('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-[#13251C] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
