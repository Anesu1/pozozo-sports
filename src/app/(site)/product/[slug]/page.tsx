import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { productBySlugQuery, productSlugsQuery } from '@/sanity/lib/queries';
import { Product } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Build time only — no request context, so draftMode()-aware sanityFetch
  // can't be used here. Static params only ever need published slugs anyway.
  const data = await client.fetch(productSlugsQuery);
  return data as { slug: string }[];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug: params.slug } });
  const product = data as (Product & { relatedProducts: Product[] }) | null;
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

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug: params.slug } });
  const productData = data as (Product & { relatedProducts: Product[] }) | null;

  if (!productData) {
    notFound();
  }

  const { relatedProducts, ...product } = productData;

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
