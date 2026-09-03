import { defineField, defineType } from 'sanity';

export const sportsPage = defineType({
  name: 'sportsPage',
  title: 'Sports Index Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'heading' } },
});
