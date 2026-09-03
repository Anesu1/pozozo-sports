import { defineField, defineType } from 'sanity';

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: '404 Page',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', title: 'Kicker (e.g. "404")', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'shopCta', title: '"Shop the range" button label', type: 'string' }),
    defineField({ name: 'whatsappCta', title: '"Ask on WhatsApp" button label', type: 'string' }),
    defineField({ name: 'homeCta', title: '"Back to home" button label', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
});
