import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Author', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (r) => r.min(0).max(5) }),
    defineField({ name: 'text', title: 'Review text', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'verified', title: 'Verified', type: 'boolean', initialValue: true }),
    defineField({ name: 'productName', title: 'Product name', type: 'string' }),
  ],
  preview: { select: { title: 'author', subtitle: 'location' } },
});
