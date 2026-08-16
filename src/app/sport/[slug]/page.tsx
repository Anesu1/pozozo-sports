import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/ShopCatalog';
import { SPORTS } from '@/data/sports';

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
    return { title: 'Sport – Pozozo Sports' };
  }
  return {
    title: `${sport.title} – Pozozo Sports`,
    description: sport.lede,
  };
}

export default function SportPage({ params }: PageProps) {
  const sport = SPORTS.find((s) => s.slug === params.slug);

  if (!sport) {
    notFound();
  }

  return (
    <ShopCatalog
      initialCategory={sport.slug}
      pageTitle={sport.title}
      pageDescription={sport.blurb}
    />
  );
}
