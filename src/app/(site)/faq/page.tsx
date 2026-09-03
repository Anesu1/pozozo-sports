import { Metadata } from 'next';
import { FAQS } from '@/data/faqs';
import { FaqPageClient } from './FaqPageClient';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers on payment, bulk orders, delivery, genuine stock, and faulty balls, from the Pozozo Sports team.',
  alternates: { canonical: '/faq' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FaqPageClient />
    </>
  );
}
