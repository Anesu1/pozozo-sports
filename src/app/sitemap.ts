import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { sitemapSlugsQuery } from '@/sanity/lib/queries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sp2clogistics.com';

interface SlugEntry {
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch(sitemapSlugsQuery);
  const { products: PRODUCTS, categories: CATEGORIES, sports: SPORTS, brands: BRANDS, journals: JOURNALS } = data as {
    products: SlugEntry[];
    categories: SlugEntry[];
    sports: SlugEntry[];
    brands: SlugEntry[];
    journals: SlugEntry[];
  };

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/sports-equipment-zimbabwe`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/sports-equipment-harare`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/school-sports-equipment`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/bulk-sports-equipment`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/shop`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sports`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/brands`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/bulk`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/guides`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/size-guide`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/care`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/price-list`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/who-we-supply`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/journal`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms-of-service`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/return-and-refund-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/shipping-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.2 },
  ] as const).map((entry) => ({ ...entry, lastModified: now }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/shop/category/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const sportRoutes: MetadataRoute.Sitemap = SPORTS.map((sport) => ({
    url: `${SITE_URL}/sport/${sport.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = BRANDS.map((brand) => ({
    url: `${SITE_URL}/brand/${brand.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const journalRoutes: MetadataRoute.Sitemap = JOURNALS.map((journal) => ({
    url: `${SITE_URL}/journal/${journal.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...sportRoutes,
    ...brandRoutes,
    ...productRoutes,
    ...journalRoutes,
  ];
}
