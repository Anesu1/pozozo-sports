import { defineField, defineType } from 'sanity';

export const journalIndexPage = defineType({
  name: 'journalIndexPage',
  title: 'Journal Index Page',
  type: 'document',
  fields: [
    defineField({ name: 'badge', title: 'Badge', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'heading' } },
});
