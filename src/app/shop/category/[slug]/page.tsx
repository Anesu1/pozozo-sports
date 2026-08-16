import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { CATEGORIES } from '@/data/categories';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) {
    return { title: 'Category – Pozozo Sports' };
  }
  return {
    title: `${category.name} – Pozozo Sports`,
    description: `Genuine Molten and Mikasa ${category.name.toLowerCase()}, ordered directly by WhatsApp message.`,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <ShopCatalog
      initialCategory={category.slug}
      pageTitle={category.name}
      pageDescription={`Genuine Molten and Mikasa ${category.name.toLowerCase()}. Ordered directly by WhatsApp message.`}
    />
  );
}
