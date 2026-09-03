import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { brandBySlugQuery, brandSlugsQuery, categoriesQuery, collectionsQuery, productsQuery } from '@/sanity/lib/queries';
import { BrandMeta, CategoryMeta, CollectionMeta, Product } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(brandSlugsQuery);
  return data as { slug: string }[];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data } = await sanityFetch({ query: brandBySlugQuery, params: { slug: params.slug } });
  const brand = data as BrandMeta | null;
  if (!brand) {
    return { title: 'Brand' };
  }
  return {
    title: brand.title,
    description: brand.lede,
    alternates: { canonical: `/brand/${brand.slug}` },
  };
}

export default async function BrandPage(props: PageProps) {
  const params = await props.params;
  const { data } = await sanityFetch({ query: brandBySlugQuery, params: { slug: params.slug } });
  const brand = data as BrandMeta | null;

  if (!brand) {
    notFound();
  }

  const [{ data: productsData }, { data: categoriesData }, { data: collectionsData }] = await Promise.all([
    sanityFetch({ query: productsQuery }),
    sanityFetch({ query: categoriesQuery }),
    sanityFetch({ query: collectionsQuery }),
  ]);
  const products = productsData as Product[];
  const categories = categoriesData as CategoryMeta[];
  const collections = collectionsData as CollectionMeta[];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Brands', item: 'https://pozozosports.com/brands' },
      { '@type': 'ListItem', position: 2, name: brand.title, item: `https://pozozosports.com/brand/${brand.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ShopCatalog
        products={products}
        categories={categories}
        collections={collections}
        initialCollection={brand.slug}
        pageTitle={brand.title}
        pageDescription={brand.lede}
      />
    </>
  );
}
