import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { BRANDS } from '@/data/brands';
import { JsonLd } from '@/components/JsonLd';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const brand = BRANDS.find((b) => b.slug === params.slug);
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
  const brand = BRANDS.find((b) => b.slug === params.slug);

  if (!brand) {
    notFound();
  }

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
        initialCollection={brand.slug}
        pageTitle={brand.title}
        pageDescription={brand.lede}
      />
    </>
  );
}
