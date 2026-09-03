import type { StructureResolver } from 'sanity/structure';

// Singletons — exactly one document each — get pinned list items with fixed
// IDs instead of showing up as generic, creatable document lists.
const SINGLETONS: Array<{ type: string; title: string; id: string }> = [
  { type: 'storeConfig', title: 'Store Config', id: 'storeConfig-singleton' },
  { type: 'siteSettings', title: 'Site Settings', id: 'siteSettings-singleton' },
  { type: 'homePage', title: 'Home Page', id: 'homePage-singleton' },
  { type: 'aboutPage', title: 'About Page', id: 'aboutPage-singleton' },
  { type: 'bulkPage', title: 'Bulk Page', id: 'bulkPage-singleton' },
  { type: 'guidesPage', title: 'Guides Page', id: 'guidesPage-singleton' },
  { type: 'brandsPage', title: 'Brands Page', id: 'brandsPage-singleton' },
  { type: 'sportsPage', title: 'Sports Index Page', id: 'sportsPage-singleton' },
  { type: 'carePage', title: 'Care Page', id: 'carePage-singleton' },
  { type: 'sizeGuidePage', title: 'Size Guide Page', id: 'sizeGuidePage-singleton' },
  { type: 'whoWeSupplyPage', title: 'Who We Supply Page', id: 'whoWeSupplyPage-singleton' },
  { type: 'priceListPage', title: 'Price List Page', id: 'priceListPage-singleton' },
  { type: 'faqPage', title: 'FAQ Page', id: 'faqPage-singleton' },
  { type: 'contactPage', title: 'Contact Page', id: 'contactPage-singleton' },
  { type: 'journalIndexPage', title: 'Journal Index Page', id: 'journalIndexPage-singleton' },
  { type: 'notFoundPage', title: '404 Page', id: 'notFoundPage-singleton' },
];

const singletonTypes = new Set(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.type)
          .child(S.document().schemaType(s.type).documentId(s.id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() ?? '')),
    ]);
