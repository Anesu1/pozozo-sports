import { defineField, defineType } from 'sanity';

export const carePage = defineType({
  name: 'carePage',
  title: 'Care Page',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'gaugeKicker', title: 'Gauge callout kicker', type: 'string' }),
    defineField({ name: 'gaugeHeading', title: 'Gauge callout heading', type: 'string' }),
    defineField({ name: 'gaugeDescription', title: 'Gauge callout description', type: 'text', rows: 2 }),
    defineField({ name: 'gaugeCta', title: 'Gauge callout button label', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
});
