import { defineField, defineType } from 'sanity';

export const sizeGuidePage = defineType({
  name: 'sizeGuidePage',
  title: 'Size Guide Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'ctaHeading', title: 'CTA heading', type: 'string' }),
    defineField({ name: 'ctaDescription', title: 'CTA description', type: 'text', rows: 2 }),
    defineField({ name: 'ctaLabel', title: 'CTA button label', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
});
