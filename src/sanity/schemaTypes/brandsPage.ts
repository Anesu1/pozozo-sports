import { defineField, defineType } from 'sanity';

export const brandsPage = defineType({
  name: 'brandsPage',
  title: 'Brands Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'heading' } },
});
