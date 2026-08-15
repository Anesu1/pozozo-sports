import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { COLLECTIONS } from '@/data/collections';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);
  if (!collection) {
    return { title: 'Collection – ECOM®' };
  }
  return {
    title: `${collection.name} – ECOM® Modern Apparel`,
    description: collection.description,
  };
}

export default function CollectionPage({ params }: PageProps) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);

  if (!collection) {
    notFound();
  }

  return (
    <ShopCatalog
      initialCollection={collection.slug}
      pageTitle={collection.name}
      pageDescription={collection.description}
    />
  );
}
