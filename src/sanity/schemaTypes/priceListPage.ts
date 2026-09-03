import { defineField, defineType } from 'sanity';

export const priceListPage = defineType({
  name: 'priceListPage',
  title: 'Price List Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'ctaLabel', title: 'CTA button label', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
});
