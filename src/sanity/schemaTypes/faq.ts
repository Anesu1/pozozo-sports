import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'q', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'a', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'q' } },
});
