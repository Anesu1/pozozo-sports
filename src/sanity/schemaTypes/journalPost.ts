import { defineField, defineType } from 'sanity';

export const journalPost = defineType({
  name: 'journalPost',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'category', title: 'Category', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'readTime', title: 'Read time', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'role', title: 'Role', type: 'string' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Article sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text', rows: 3 }] },
            { name: 'bulletPoints', title: 'Bullet points', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: { select: { title: 'heading', subtitle: 'paragraphs.0' } },
        },
      ],
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
});
