import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: { list: ['Molten', 'Mikasa', 'Fox40'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ name: 'originalPrice', title: 'Original Price', type: 'number' }),
    defineField({ name: 'spec', title: 'Spec line', type: 'string', validation: (r) => r.required() }),
    // Named "badge" rather than "tag" — Sanity's stega encoder has a
    // built-in denylist (color, hex, email, tag, etc.) for field names whose
    // values are often used functionally rather than as display text, and
    // "tag" is on it. That would silently make this badge un-clickable in
    // the Presentation click-to-edit overlay, even though it's pure display
    // text here. The GROQ projection re-exposes it as `tag` (see queries.ts)
    // so no application code needs to change.
    defineField({ name: 'badge', title: 'Badge', type: 'string' }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (r) => r.min(0).max(5) }),
    defineField({ name: 'reviewsCount', title: 'Reviews count', type: 'number' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['basketball', 'football', 'netball', 'volleyball', 'accessories', 'all'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'categoryLabel', title: 'Category label', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'collections',
      title: 'Collections / tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 2, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5, validation: (r) => r.required() }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'colors',
      title: 'Colours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorEntry',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'hex', title: 'Colour', type: 'color' },
            { name: 'imageIndex', title: 'Image index', type: 'number' },
          ],
        },
      ],
    }),
    defineField({ name: 'sizes', title: 'Sizes', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'isNew', title: 'New', type: 'boolean', initialValue: false }),
    defineField({ name: 'isBestSeller', title: 'Best seller', type: 'boolean', initialValue: false }),
    defineField({ name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'details', title: 'Detail bullets', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'object',
      fields: [
        { name: 'material', title: 'Material', type: 'string' },
        { name: 'intendedSurface', title: 'Intended surface', type: 'string' },
        { name: 'certification', title: 'Certification', type: 'string' },
        { name: 'sizeSpecification', title: 'Size specification', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'spec', media: 'images.0' },
  },
});
