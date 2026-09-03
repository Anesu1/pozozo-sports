import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'catalogue', title: 'Catalogue & sport/brand sections' },
    { name: 'confidence', title: 'Order with confidence' },
    { name: 'bulk', title: 'Bulk teaser' },
    { name: 'other', title: 'Testimonials, before-you-buy, contact CTA' },
  ],
  fields: [
    defineField({ name: 'heroKicker', title: 'Hero kicker', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadingLine1', title: 'Hero heading — line 1', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadingLine2', title: 'Hero heading — line 2', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadingHighlight', title: 'Hero heading — highlighted word', type: 'string', group: 'hero' }),
    defineField({ name: 'heroDescription', title: 'Hero description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroPrimaryCta', title: 'Hero primary button label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCta', title: 'Hero secondary button label', type: 'string', group: 'hero' }),

    defineField({ name: 'newInStockHeading', title: '"New in stock" heading', type: 'string', group: 'catalogue' }),
    defineField({
      name: 'marqueePhrases',
      title: 'Scrolling marquee phrases',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'catalogue',
    }),
    defineField({ name: 'shopBySportHeading', title: '"Shop by sport" heading', type: 'string', group: 'catalogue' }),
    defineField({ name: 'brandsSectionLabel', title: 'Brands section label', type: 'string', group: 'catalogue' }),
    defineField({ name: 'catalogueHeading', title: 'Catalogue heading', type: 'string', group: 'catalogue' }),
    defineField({ name: 'catalogueDescription', title: 'Catalogue description', type: 'text', rows: 2, group: 'catalogue' }),

    defineField({ name: 'confidenceHeading', title: 'Heading', type: 'string', group: 'confidence' }),
    defineField({
      name: 'confidenceFeatures',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'confidenceFeature',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', rows: 2 },
          ],
        },
      ],
      group: 'confidence',
    }),
    defineField({ name: 'confidencePersonTitle', title: '"A person, not a bot" title', type: 'string', group: 'confidence' }),
    defineField({ name: 'confidencePersonBody', title: '"A person, not a bot" body', type: 'text', rows: 2, group: 'confidence' }),

    defineField({ name: 'bulkTeaserKicker', title: 'Kicker', type: 'string', group: 'bulk' }),
    defineField({ name: 'bulkTeaserHeading', title: 'Heading', type: 'string', group: 'bulk' }),
    defineField({ name: 'bulkTeaserDescription', title: 'Description', type: 'text', rows: 2, group: 'bulk' }),
    defineField({ name: 'bulkTeaserCta', title: 'Button label', type: 'string', group: 'bulk' }),
    defineField({
      name: 'bulkTeaserPoints',
      title: 'Bullet points',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'bulk',
    }),

    defineField({ name: 'testimonialsHeading', title: '"What clubs say" heading', type: 'string', group: 'other' }),
    defineField({ name: 'beforeYouBuyHeading', title: '"Before you buy" heading', type: 'string', group: 'other' }),
    defineField({
      name: 'beforeYouBuyCards',
      title: '"Before you buy" cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'beforeYouBuyCard',
          fields: [
            { name: 'href', title: 'Link (path)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', rows: 2 },
          ],
        },
      ],
      group: 'other',
    }),
    defineField({ name: 'contactCtaHeading', title: 'Contact CTA heading', type: 'string', group: 'other' }),
    defineField({ name: 'contactCtaDescription', title: 'Contact CTA description', type: 'text', rows: 2, group: 'other' }),
  ],
  preview: { select: { title: 'heroHeadingLine1' } },
});
