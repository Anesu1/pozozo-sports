import { defineField, defineType } from 'sanity';

export const whoWeSupplyPage = defineType({
  name: 'whoWeSupplyPage',
  title: 'Who We Supply Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'testimonialQuote', title: 'Testimonial quote', type: 'text', rows: 3 }),
    defineField({ name: 'testimonialAuthor', title: 'Testimonial author', type: 'string' }),
    defineField({ name: 'testimonialLocation', title: 'Testimonial location', type: 'string' }),
    defineField({ name: 'ctaHeading', title: 'CTA heading', type: 'string' }),
    defineField({ name: 'ctaDescription', title: 'CTA description', type: 'text', rows: 2 }),
    defineField({ name: 'ctaLabel', title: 'CTA button label', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
});
