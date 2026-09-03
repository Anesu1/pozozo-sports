import { defineField, defineType } from 'sanity';

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'lede', title: 'Lede', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'accent', title: 'Accent colour (hex)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'bg', title: 'Card background colour (hex)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'fg', title: 'Card foreground colour (hex)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'img', title: 'Hero image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'lede', media: 'img' } },
});
