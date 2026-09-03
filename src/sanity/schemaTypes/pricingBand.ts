import { defineField, defineType } from 'sanity';

export const pricingBand = defineType({
  name: 'pricingBand',
  title: 'Pricing Band',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'qty', title: 'Quantity', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'what', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'qty', subtitle: 'what' } },
});
