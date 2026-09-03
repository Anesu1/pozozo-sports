import { defineField, defineType } from 'sanity';

export const sport = defineType({
  name: 'sport',
  title: 'Sport',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'kicker', title: 'Kicker', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'blurb', title: 'Blurb (short)', type: 'text', rows: 2, validation: (r) => r.required() }),
    defineField({ name: 'lede', title: 'Lede (long)', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'img', title: 'Hero image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'bg', title: 'Tile background colour (hex)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'fg', title: 'Tile foreground colour (hex)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'dim', title: 'Tile dim/secondary colour (hex)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'line', title: 'Tile border colour', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'cta', title: 'CTA label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'kicker', media: 'img' } },
});
