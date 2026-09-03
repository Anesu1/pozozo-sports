import { defineField, defineType } from 'sanity';

export const guidesPage = defineType({
  name: 'guidesPage',
  title: 'Guides Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'tiles',
      title: 'Guide tiles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'guideTile',
          fields: [
            { name: 'href', title: 'Link (path)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', rows: 2 },
            { name: 'inverted', title: 'Inverted (dark) style', type: 'boolean' },
          ],
        },
      ],
    }),
    defineField({ name: 'furtherReadingHeading', title: '"Further reading" heading', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
});
