import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { categoriesQuery, collectionsQuery, productsQuery, sportBySlugQuery, sportSlugsQuery } from '@/sanity/lib/queries';
import { CategoryMeta, CollectionMeta, Product, SportMeta } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(sportSlugsQuery);
  return data as { slug: string }[];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data } = await sanityFetch({ query: sportBySlugQuery, params: { slug: params.slug } });
  const sport = data as SportMeta | null;
  if (!sport) {
    return { title: 'Sport' };
  }
  return {
    title: sport.title,
    description: sport.lede,
    alternates: { canonical: `/sport/${sport.slug}` },
  };
}

export default async function SportPage(props: PageProps) {
  const params = await props.params;
  const { data } = await sanityFetch({ query: sportBySlugQuery, params: { slug: params.slug } });
  const sport = data as SportMeta | null;

  if (!sport) {
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
      { '@type': 'ListItem', position: 1, name: 'Sports', item: 'https://pozozosports.com/sports' },
      { '@type': 'ListItem', position: 2, name: sport.title, item: `https://pozozosports.com/sport/${sport.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ShopCatalog
        products={products}
        categories={categories}
        collections={collections}
        initialCategory={sport.slug}
        pageTitle={sport.title}
        pageDescription={sport.blurb}
      />
    </>
  );
}
