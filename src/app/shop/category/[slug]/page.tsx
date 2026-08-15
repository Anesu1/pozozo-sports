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
    return { title: 'Category – ECOM®' };
  }
  return {
    title: `${category.name} – ECOM® Modern Apparel`,
    description: `Shop our premium collection of ${category.name.toLowerCase()} pieces designed for everyday comfort and modern style.`,
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
      pageDescription={`Shop our curated selection of ${category.name.toLowerCase()} styles built with premium organic fabrics.`}
    />
  );
}
