import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { categoryBySlugQuery, categorySlugsQuery, categoriesQuery, collectionsQuery, productsQuery } from '@/sanity/lib/queries';
import { CategoryMeta, CollectionMeta, Product } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(categorySlugsQuery);
  return data as { slug: string }[];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data } = await sanityFetch({ query: categoryBySlugQuery, params: { slug: params.slug } });
  const category = data as CategoryMeta | null;
  if (!category) {
    return { title: 'Category' };
  }
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/shop/category/${category.slug}` },
  };
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const { data } = await sanityFetch({ query: categoryBySlugQuery, params: { slug: params.slug } });
  const category = data as CategoryMeta | null;

  if (!category) {
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
      { '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://pozozosports.com/shop' },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://pozozosports.com/shop/category/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ShopCatalog
        products={products}
        categories={categories}
        collections={collections}
        initialCategory={category.slug}
        pageTitle={category.name}
        pageDescription={category.description}
      />
    </>
  );
}
