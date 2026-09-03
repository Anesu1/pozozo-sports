import { defineField, defineType } from 'sanity';

export const bulkPage = defineType({
  name: 'bulkPage',
  title: 'Bulk Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'howItWorksHeading', title: '"How it works" heading', type: 'string' }),
    defineField({ name: 'steps', title: '"How it works" steps', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'formHeading', title: 'Form heading', type: 'string' }),
    defineField({ name: 'nameLabel', title: 'Name field label', type: 'string' }),
    defineField({ name: 'namePlaceholder', title: 'Name field placeholder', type: 'string' }),
    defineField({ name: 'needLabel', title: '"What do you need" field label', type: 'string' }),
    defineField({ name: 'needPlaceholder', title: '"What do you need" field placeholder', type: 'string' }),
    defineField({ name: 'deliveryLabel', title: 'Delivery field label', type: 'string' }),
    defineField({ name: 'deliveryPlaceholder', title: 'Delivery field placeholder', type: 'string' }),
    defineField({ name: 'whatsappButtonLabel', title: 'WhatsApp button label', type: 'string' }),
    defineField({ name: 'emailButtonLabel', title: 'Email button label', type: 'string' }),
    defineField({ name: 'disclaimer', title: 'Disclaimer text', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'heading' } },
});
