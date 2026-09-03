import { defineField, defineType } from 'sanity';

export const storeConfig = defineType({
  name: 'storeConfig',
  title: 'Store Config',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Store name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'WhatsApp number (digits only)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'displayPhone', title: 'Display phone', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required().email() }),
    defineField({ name: 'operatingHours', title: 'Operating hours', type: 'string' }),
    defineField({ name: 'currencySymbol', title: 'Currency symbol', type: 'string' }),
    defineField({ name: 'currencyCode', title: 'Currency code', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'displayPhone' } },
});
