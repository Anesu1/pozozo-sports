import { Metadata } from 'next';
import { BulkPageClient } from './BulkPageClient';

export const metadata: Metadata = {
  title: 'Bulk & Schools Pricing',
  description: 'Bulk pricing for schools, clubs and academies. Send the list of balls you need on WhatsApp or email and get a quotation with unit and total pricing, valid for 14 days.',
  alternates: { canonical: '/bulk' },
};

export default function BulkPage() {
  return <BulkPageClient />;
}
