import { Metadata } from 'next';
import { BulkPageClient } from './BulkPageClient';
import { sanityFetch } from '@/sanity/lib/live';
import { bulkPageQuery, pricingBandsQuery } from '@/sanity/lib/queries';
import { BulkPageContent, PricingBand } from '@/types';

export const metadata: Metadata = {
  title: 'Bulk & Schools Pricing',
  description: 'Bulk pricing for schools, clubs and academies. Send the list of balls you need on WhatsApp or email and get a quotation with unit and total pricing, valid for 14 days.',
  alternates: { canonical: '/bulk' },
};

export default async function BulkPage() {
  const [{ data: bandsData }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: pricingBandsQuery }),
    sanityFetch({ query: bulkPageQuery }),
  ]);
  return <BulkPageClient bands={bandsData as PricingBand[]} content={contentData as BulkPageContent} />;
}
