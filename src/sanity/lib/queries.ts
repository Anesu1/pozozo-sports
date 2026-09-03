import { defineQuery } from 'next-sanity';

// Every fragment below reshapes a Sanity document back into the exact shape
// of the pre-migration static data (src/types/index.ts) — image fields
// resolved to plain URL strings, colors' `hex` unwrapped to a plain string —
// so consuming components need no changes beyond the data source itself.

const productFields = /* groq */ `
  "id": _id,
  name,
  brand,
  "slug": slug.current,
  price,
  originalPrice,
  spec,
  "tag": badge,
  rating,
  reviewsCount,
  category,
  categoryLabel,
  collections,
  description,
  summary,
  "images": images[].asset->url,
  "colors": colors[]{name, "hex": hex.hex, imageIndex},
  sizes,
  isNew,
  isBestSeller,
  isFeatured,
  details,
  features
`;

export const productsQuery = defineQuery(`*[_type == "product"] | order(name asc) { ${productFields} }`);

export const productBySlugQuery = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  ${productFields},
  "relatedProducts": *[
    _type == "product" &&
    _id != ^._id &&
    (category == ^.category || count((collections[])[@ in ^.collections]) > 0)
  ][0...4]{ ${productFields} }
}`);

export const productSlugsQuery = defineQuery(`*[_type == "product" && defined(slug.current)]{"slug": slug.current}`);

const categoryFields = /* groq */ `
  "id": slug.current,
  "slug": slug.current,
  name,
  count,
  "image": image.asset->url,
  description
`;

export const categoriesQuery = defineQuery(`*[_type == "category"] | order(order asc) { ${categoryFields} }`);
export const categoryBySlugQuery = defineQuery(`*[_type == "category" && slug.current == $slug][0]{ ${categoryFields} }`);
export const categorySlugsQuery = defineQuery(`*[_type == "category" && defined(slug.current)]{"slug": slug.current}`);

const sportFields = /* groq */ `
  "slug": slug.current,
  kicker,
  title,
  blurb,
  lede,
  "img": img.asset->url,
  bg,
  fg,
  dim,
  line,
  cta
`;

export const sportsQuery = defineQuery(`*[_type == "sport"] | order(order asc) { ${sportFields} }`);
export const sportBySlugQuery = defineQuery(`*[_type == "sport" && slug.current == $slug][0]{ ${sportFields} }`);
export const sportSlugsQuery = defineQuery(`*[_type == "sport" && defined(slug.current)]{"slug": slug.current}`);

const brandFields = /* groq */ `
  "slug": slug.current,
  title,
  lede,
  accent,
  bg,
  fg,
  "img": img.asset->url
`;

export const brandsQuery = defineQuery(`*[_type == "brand"] | order(order asc) { ${brandFields} }`);
export const brandBySlugQuery = defineQuery(`*[_type == "brand" && slug.current == $slug][0]{ ${brandFields} }`);
export const brandSlugsQuery = defineQuery(`*[_type == "brand" && defined(slug.current)]{"slug": slug.current}`);

const collectionFields = /* groq */ `
  "id": slug.current,
  "slug": slug.current,
  name,
  tagline,
  description,
  "image": image.asset->url
`;

export const collectionsQuery = defineQuery(`*[_type == "collection"] | order(order asc) { ${collectionFields} }`);

const journalFields = /* groq */ `
  "id": _id,
  "slug": slug.current,
  title,
  category,
  date,
  readTime,
  excerpt,
  "coverImage": coverImage.asset->url,
  author,
  content
`;

export const journalPostsQuery = defineQuery(`*[_type == "journalPost"] | order(order asc) { ${journalFields} }`);
export const journalPostBySlugQuery = defineQuery(`*[_type == "journalPost" && slug.current == $slug][0]{
  ${journalFields},
  "related": *[_type == "journalPost" && _id != ^._id] | order(order asc) [0...3]{ ${journalFields} }
}`);
export const journalSlugsQuery = defineQuery(`*[_type == "journalPost" && defined(slug.current)]{"slug": slug.current}`);

export const faqsQuery = defineQuery(`*[_type == "faq"] | order(order asc) { q, a }`);

export const sizeGuideQuery = defineQuery(`*[_type == "sizeGuideEntry"] | order(order asc) {
  sport,
  sportSlug,
  note,
  rows
}`);

export const careTipsQuery = defineQuery(`*[_type == "careTip"] | order(n asc) { n, title, body }`);

export const pricingBandsQuery = defineQuery(`*[_type == "pricingBand"] | order(order asc) { qty, what }`);

export const supplyStatsQuery = defineQuery(`*[_type == "supplyStat"] | order(order asc) { n, what }`);

export const reviewsQuery = defineQuery(`*[_type == "review"] | order(_id asc) {
  "id": _id,
  author,
  location,
  rating,
  text,
  verified,
  productName,
  role
}`);

export const storeConfigQuery = defineQuery(`*[_type == "storeConfig"][0]{
  name,
  tagline,
  phone,
  displayPhone,
  email,
  operatingHours,
  currencySymbol,
  currencyCode,
  location
}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]`);
export const homePageQuery = defineQuery(`*[_type == "homePage"][0]`);
export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]`);
export const bulkPageQuery = defineQuery(`*[_type == "bulkPage"][0]`);
export const guidesPageQuery = defineQuery(`*[_type == "guidesPage"][0]`);
export const brandsPageQuery = defineQuery(`*[_type == "brandsPage"][0]`);
export const sportsPageQuery = defineQuery(`*[_type == "sportsPage"][0]`);
export const carePageQuery = defineQuery(`*[_type == "carePage"][0]`);
export const sizeGuidePageQuery = defineQuery(`*[_type == "sizeGuidePage"][0]`);
export const whoWeSupplyPageQuery = defineQuery(`*[_type == "whoWeSupplyPage"][0]`);
export const priceListPageQuery = defineQuery(`*[_type == "priceListPage"][0]`);
export const faqPageQuery = defineQuery(`*[_type == "faqPage"][0]`);
export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]`);
export const journalIndexPageQuery = defineQuery(`*[_type == "journalIndexPage"][0]`);
export const notFoundPageQuery = defineQuery(`*[_type == "notFoundPage"][0]`);

// One round trip for sitemap.ts — every slug set it needs, in one query.
export const sitemapSlugsQuery = defineQuery(`{
  "products": *[_type == "product" && defined(slug.current)]{"slug": slug.current},
  "categories": *[_type == "category" && defined(slug.current)]{"slug": slug.current},
  "sports": *[_type == "sport" && defined(slug.current)]{"slug": slug.current},
  "brands": *[_type == "brand" && defined(slug.current)]{"slug": slug.current},
  "journals": *[_type == "journalPost" && defined(slug.current)]{"slug": slug.current}
}`);
