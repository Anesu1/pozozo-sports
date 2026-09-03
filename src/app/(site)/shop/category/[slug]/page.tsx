import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { CATEGORIES } from '@/data/categories';
import { JsonLd } from '@/components/JsonLd';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const category = CATEGORIES.find((c) => c.slug === params.slug);
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
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

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
        initialCategory={category.slug}
        pageTitle={category.name}
        pageDescription={category.description}
      />
    </>
  );
}
