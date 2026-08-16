import React from 'react';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop All Balls – Pozozo Sports',
  description: 'Explore the full catalog of jackets, hoodies, denim jeans, tees, and knitwear.',
};

export default function ShopPage() {
  return <ShopCatalog />;
}
