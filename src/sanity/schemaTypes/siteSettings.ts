import { defineField, defineType } from 'sanity';

const linkFields = [
  { name: 'label', title: 'Label', type: 'string' as const },
  { name: 'href', title: 'Link (path)', type: 'string' as const },
];

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'announcementMessages',
      title: 'Announcement bar messages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'logoLine1', title: 'Logo text (main)', type: 'string' }),
    defineField({ name: 'logoLine2', title: 'Logo text (sub)', type: 'string' }),
    defineField({
      name: 'navLinks',
      title: 'Header nav links',
      type: 'array',
      of: [{ type: 'object', name: 'navLink', fields: linkFields }],
    }),
    defineField({ name: 'footerTagline', title: 'Footer tagline', type: 'text', rows: 2 }),
    defineField({
      name: 'footerColumns',
      title: 'Footer link columns',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'links', title: 'Links', type: 'array', of: [{ type: 'object', name: 'footerLink', fields: linkFields }] },
          ],
        },
      ],
    }),
    defineField({ name: 'footerCopyright', title: 'Footer copyright line', type: 'string' }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer legal links',
      type: 'array',
      of: [{ type: 'object', name: 'legalLink', fields: linkFields }],
    }),
  ],
  preview: { select: { title: 'logoLine1' } },
});
