import { Metadata } from 'next';
import { FaqPageClient } from './FaqPageClient';
import { JsonLd } from '@/components/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { faqPageQuery, faqsQuery } from '@/sanity/lib/queries';
import { FaqEntry, SimpleHeroPageContent } from '@/types';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers on payment, bulk orders, delivery, genuine stock, and faulty balls, from the Pozozo Sports team.',
  alternates: { canonical: '/faq' },
};

export default async function FaqPage() {
  const [{ data }, { data: contentData }] = await Promise.all([
    sanityFetch({ query: faqsQuery }),
    sanityFetch({ query: faqPageQuery }),
  ]);
  const FAQS = data as FaqEntry[];
  const content = contentData as SimpleHeroPageContent;

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

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FaqPageClient faqs={FAQS} heading={content.heading} description={content.description} />
    </>
  );
}
