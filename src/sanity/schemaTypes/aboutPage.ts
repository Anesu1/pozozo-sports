import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero & stats' },
    { name: 'about', title: 'About us' },
    { name: 'mission', title: 'Mission' },
  ],
  fields: [
    defineField({ name: 'heroBadge', title: 'Hero badge', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadingLine1', title: 'Hero heading — line 1', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadingLine2', title: 'Hero heading — line 2', type: 'string', group: 'hero' }),
    defineField({ name: 'heroDescription', title: 'Hero description', type: 'text', rows: 3, group: 'hero' }),
    defineField({
      name: 'stats',
      title: 'Stats bar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
      group: 'hero',
    }),

    defineField({ name: 'aboutLabel', title: 'Section label', type: 'string', group: 'about' }),
    defineField({
      name: 'aboutParagraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'about',
    }),
    defineField({ name: 'aboutTagline', title: 'Tagline', type: 'string', group: 'about' }),

    defineField({ name: 'missionLabel', title: 'Section label', type: 'string', group: 'mission' }),
    defineField({ name: 'missionHeading', title: 'Heading', type: 'string', group: 'mission' }),
    defineField({ name: 'missionDescription', title: 'Description', type: 'text', rows: 3, group: 'mission' }),
    defineField({
      name: 'missionBullets',
      title: 'Bullet points',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'mission',
    }),
    defineField({ name: 'missionPrimaryCta', title: 'Primary button label', type: 'string', group: 'mission' }),
    defineField({ name: 'missionSecondaryCta', title: 'Secondary button label', type: 'string', group: 'mission' }),
    defineField({
      name: 'capabilities',
      title: '"Why teams order from us" cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'capability',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', rows: 2 },
          ],
        },
      ],
      group: 'mission',
    }),
  ],
  preview: { select: { title: 'heroHeadingLine1' } },
});
