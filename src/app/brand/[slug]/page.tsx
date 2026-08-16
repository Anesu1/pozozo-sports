import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { BRANDS } from '@/data/brands';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({
    slug: b.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const brand = BRANDS.find((b) => b.slug === params.slug);
  if (!brand) {
    return { title: 'Brand – Pozozo Sports' };
  }
  return {
    title: `${brand.title} – Pozozo Sports`,
    description: brand.lede,
  };
}

export default function BrandPage({ params }: PageProps) {
  const brand = BRANDS.find((b) => b.slug === params.slug);

  if (!brand) {
    notFound();
  }

  return (
    <ShopCatalog
      initialCollection={brand.slug}
      pageTitle={brand.title}
      pageDescription={brand.lede}
    />
  );
}
