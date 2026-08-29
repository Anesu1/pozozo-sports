import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { JsonLd } from '@/components/JsonLd';

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
    return { title: 'Product' };
  }
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: product.brand },
    sku: product.id,
    category: product.categoryLabel,
    aggregateRating: product.reviewsCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    } : undefined,
    // No `offers` block: price is quoted on enquiry rather than published, and
    // Google requires a price for an Offer to be valid structured data.
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://pozozosports.com/shop' },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.categoryLabel,
        item: `https://pozozosports.com/shop/category/${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://pozozosports.com/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
