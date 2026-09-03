import { defineField, defineType } from 'sanity';

export const supplyStat = defineType({
  name: 'supplyStat',
  title: 'Supply Stat',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'n', title: 'Stat', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'what', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'n', subtitle: 'what' } },
});
