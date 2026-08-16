import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { SPORTS } from '@/data/sports';
import { JsonLd } from '@/components/JsonLd';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SPORTS.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const sport = SPORTS.find((s) => s.slug === params.slug);
  if (!sport) {
    return { title: 'Sport' };
  }
  return {
    title: sport.title,
    description: sport.lede,
    alternates: { canonical: `/sport/${sport.slug}` },
  };
}

export default function SportPage({ params }: PageProps) {
  const sport = SPORTS.find((s) => s.slug === params.slug);

  if (!sport) {
    notFound();
  }

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
        initialCategory={sport.slug}
        pageTitle={sport.title}
        pageDescription={sport.blurb}
      />
    </>
  );
}
