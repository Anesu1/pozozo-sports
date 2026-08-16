import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailClient } from '@/components/ProductDetailClient';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return { title: 'Product – Pozozo Sports' };
  }
  return {
    title: `${product.name} – Pozozo Sports`,
    description: product.description,
    openGraph: {
      title: `${product.name} – Pozozo Sports`,
      description: product.summary,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collections.some((c) => product.collections.includes(c)))
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
