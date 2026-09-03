import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero & form' },
    { name: 'sidebar', title: 'Direct contacts & FAQs' },
  ],
  fields: [
    defineField({ name: 'badge', title: 'Badge', type: 'string', group: 'hero' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'formHeading', title: 'Form heading', type: 'string', group: 'hero' }),
    defineField({ name: 'nameLabel', title: 'Name field label', type: 'string', group: 'hero' }),
    defineField({ name: 'namePlaceholder', title: 'Name field placeholder', type: 'string', group: 'hero' }),
    defineField({ name: 'contactLabel', title: 'Phone/email field label', type: 'string', group: 'hero' }),
    defineField({ name: 'contactPlaceholder', title: 'Phone/email field placeholder', type: 'string', group: 'hero' }),
    defineField({ name: 'organisationLabel', title: 'Organisation field label', type: 'string', group: 'hero' }),
    defineField({ name: 'organisationPlaceholder', title: 'Organisation field placeholder', type: 'string', group: 'hero' }),
    defineField({ name: 'messageLabel', title: 'Message field label', type: 'string', group: 'hero' }),
    defineField({ name: 'messagePlaceholder', title: 'Message field placeholder', type: 'string', group: 'hero' }),
    defineField({ name: 'whatsappButtonLabel', title: 'WhatsApp button label', type: 'string', group: 'hero' }),
    defineField({ name: 'emailButtonLabel', title: 'Email button label', type: 'string', group: 'hero' }),

    defineField({ name: 'directContactsHeading', title: 'Direct contacts heading', type: 'string', group: 'sidebar' }),
    defineField({ name: 'whatsappLabel', title: 'WhatsApp card label', type: 'string', group: 'sidebar' }),
    defineField({ name: 'whatsappNote', title: 'WhatsApp note (e.g. "Fastest response")', type: 'string', group: 'sidebar' }),
    defineField({ name: 'emailLabel', title: 'Email card label', type: 'string', group: 'sidebar' }),
    defineField({ name: 'hoursLabel', title: 'Hours card label', type: 'string', group: 'sidebar' }),
    defineField({ name: 'locationLabel', title: 'Location card label', type: 'string', group: 'sidebar' }),
    defineField({ name: 'faqsHeading', title: 'Mini-FAQ heading', type: 'string', group: 'sidebar' }),
    defineField({
      name: 'faqs',
      title: 'Mini-FAQ entries',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'miniFaq',
          fields: [
            { name: 'q', title: 'Question', type: 'string' },
            { name: 'a', title: 'Answer', type: 'text', rows: 3 },
          ],
        },
      ],
      group: 'sidebar',
    }),
    defineField({ name: 'seeAllFaqsLabel', title: '"See all FAQs" link label', type: 'string', group: 'sidebar' }),
  ],
  preview: { select: { title: 'heading' } },
});
