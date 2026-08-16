import React from 'react';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop All Balls',
  description: 'Browse the full catalogue of genuine Molten and Mikasa basketballs, footballs, netballs, and accessories, ordered directly by WhatsApp.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return <ShopCatalog />;
}
