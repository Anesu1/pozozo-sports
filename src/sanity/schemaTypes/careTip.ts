import { defineField, defineType } from 'sanity';

export const careTip = defineType({
  name: 'careTip',
  title: 'Care Tip',
  type: 'document',
  fields: [
    defineField({ name: 'n', title: 'Number', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Number', name: 'nAsc', by: [{ field: 'n', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'n' } },
});
