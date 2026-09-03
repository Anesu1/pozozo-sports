import React from 'react';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/ShopCatalog';
import { sanityFetch } from '@/sanity/lib/live';
import { categoriesQuery, collectionsQuery, productsQuery } from '@/sanity/lib/queries';
import { CategoryMeta, CollectionMeta, Product } from '@/types';

export const metadata: Metadata = {
  title: 'Shop All Balls',
  description: 'Browse the full catalogue of genuine Molten and Mikasa basketballs, footballs, netballs and volleyballs, plus Fox40 officiating whistles, ordered directly by WhatsApp.',
  alternates: { canonical: '/shop' },
};

export default async function ShopPage() {
  const [{ data: productsData }, { data: categoriesData }, { data: collectionsData }] = await Promise.all([
    sanityFetch({ query: productsQuery }),
    sanityFetch({ query: categoriesQuery }),
    sanityFetch({ query: collectionsQuery }),
  ]);
  return (
    <ShopCatalog
      products={productsData as Product[]}
      categories={categoriesData as CategoryMeta[]}
      collections={collectionsData as CollectionMeta[]}
    />
  );
}
