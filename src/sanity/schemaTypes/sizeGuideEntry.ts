import { defineField, defineType } from 'sanity';

export const sizeGuideEntry = defineType({
  name: 'sizeGuideEntry',
  title: 'Size Guide Entry',
  type: 'document',
  fields: [
    defineField({ name: 'sport', title: 'Sport', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'sportSlug',
      title: 'Sport slug',
      type: 'string',
      options: { list: ['basketball', 'football', 'netball', 'volleyball'] },
    }),
    defineField({ name: 'note', title: 'Note', type: 'text', rows: 2, validation: (r) => r.required() }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            { name: 'size', title: 'Size', type: 'string' },
            { name: 'age', title: 'Age group', type: 'string' },
            { name: 'use', title: 'Typical use', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'sport', subtitle: 'note' } },
});
