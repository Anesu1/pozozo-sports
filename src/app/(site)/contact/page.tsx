import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';
import { sanityFetch } from '@/sanity/lib/live';
import { contactPageQuery, storeConfigQuery } from '@/sanity/lib/queries';
import { ContactPageContent, StoreConfig } from '@/types';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Message the Pozozo Sports sales desk on WhatsApp or email for ball models, school pro-formas, and delivery schedules.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const [{ data: storeConfigData }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: storeConfigQuery }),
    sanityFetch({ query: contactPageQuery }),
  ]);
  return (
    <ContactPageClient
      storeConfig={storeConfigData as StoreConfig}
      content={contentData as ContactPageContent}
    />
  );
}
