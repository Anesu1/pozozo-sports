import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    product: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.name || 'Untitled product', href: `/product/${doc?.slug}` },
          { title: 'Shop', href: '/shop' },
        ],
      }),
    }),
    sport: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled sport', href: `/sport/${doc?.slug}` },
          { title: 'Sports index', href: '/sports' },
        ],
      }),
    }),
    brand: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled brand', href: `/brand/${doc?.slug}` },
          { title: 'Brands index', href: '/brands' },
        ],
      }),
    }),
    category: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.name || 'Untitled category', href: `/shop/category/${doc?.slug}` },
          { title: 'Shop', href: '/shop' },
        ],
      }),
    }),
    journalPost: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled post', href: `/journal/${doc?.slug}` },
          { title: 'Guides', href: '/guides' },
        ],
      }),
    }),
    faq: defineLocations({
      select: { q: 'q' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.q || 'Untitled question', href: '/faq' },
          { title: 'Contact', href: '/contact' },
        ],
      }),
    }),
    sizeGuideEntry: defineLocations({
      select: { sport: 'sport' },
      resolve: (doc) => ({
        locations: [{ title: doc?.sport || 'Size guide entry', href: '/size-guide' }],
      }),
    }),
    careTip: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Care tip', href: '/care' }],
      }),
    }),
    pricingBand: defineLocations({
      select: { qty: 'qty' },
      resolve: (doc) => ({
        locations: [{ title: doc?.qty || 'Pricing band', href: '/bulk' }],
      }),
    }),
    supplyStat: defineLocations({
      select: { n: 'n' },
      resolve: (doc) => ({
        locations: [{ title: doc?.n || 'Supply stat', href: '/who-we-supply' }],
      }),
    }),
    review: defineLocations({
      select: { author: 'author' },
      resolve: (doc) => ({
        locations: [{ title: doc?.author || 'Review', href: '/' }],
      }),
    }),
    collection: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || 'Collection', href: '/shop' }],
      }),
    }),
    storeConfig: defineLocations({
      select: { name: 'name' },
      resolve: () => ({
        locations: [{ title: 'Store config', href: '/' }],
      }),
    }),
    siteSettings: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Site settings', href: '/' }] }),
    }),
    homePage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Home page', href: '/' }] }),
    }),
    aboutPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'About page', href: '/about' }] }),
    }),
    bulkPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Bulk page', href: '/bulk' }] }),
    }),
    guidesPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Guides page', href: '/guides' }] }),
    }),
    brandsPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Brands page', href: '/brands' }] }),
    }),
    sportsPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Sports index page', href: '/sports' }] }),
    }),
    carePage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Care page', href: '/care' }] }),
    }),
    sizeGuidePage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Size guide page', href: '/size-guide' }] }),
    }),
    whoWeSupplyPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Who we supply page', href: '/who-we-supply' }] }),
    }),
    priceListPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Price list page', href: '/price-list' }] }),
    }),
    faqPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'FAQ page', href: '/faq' }] }),
    }),
    contactPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Contact page', href: '/contact' }] }),
    }),
    journalIndexPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: 'Journal index page', href: '/journal' }] }),
    }),
    notFoundPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: '404 page', href: '/' }] }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == "homePage"`,
    },
    {
      route: '/about',
      filter: `_type == "aboutPage"`,
    },
    {
      route: '/bulk',
      filter: `_type == "bulkPage"`,
    },
    {
      route: '/care',
      filter: `_type == "carePage"`,
    },
    {
      route: '/faq',
      filter: `_type == "faqPage"`,
    },
    {
      route: '/guides',
      filter: `_type == "guidesPage"`,
    },
    {
      route: '/brands',
      filter: `_type == "brandsPage"`,
    },
    {
      route: '/sports',
      filter: `_type == "sportsPage"`,
    },
    {
      route: '/contact',
      filter: `_type == "contactPage"`,
    },
    {
      route: '/price-list',
      filter: `_type == "priceListPage"`,
    },
    {
      route: '/journal',
      filter: `_type == "journalIndexPage"`,
    },
    {
      route: '/size-guide',
      filter: `_type == "sizeGuidePage"`,
    },
    {
      route: '/who-we-supply',
      filter: `_type == "whoWeSupplyPage"`,
    },
    {
      route: '/product/:slug',
      filter: `_type == "product" && slug.current == $slug`,
    },
    {
      route: '/sport/:slug',
      filter: `_type == "sport" && slug.current == $slug`,
    },
    {
      route: '/brand/:slug',
      filter: `_type == "brand" && slug.current == $slug`,
    },
    {
      route: '/shop/category/:slug',
      filter: `_type == "category" && slug.current == $slug`,
    },
    {
      route: '/journal/:slug',
      filter: `_type == "journalPost" && slug.current == $slug`,
    },
  ]),
};
