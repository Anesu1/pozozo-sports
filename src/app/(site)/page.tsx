import HomePageClient from './HomePageClient';
import { sanityFetch } from '@/sanity/lib/live';
import { brandsQuery, categoriesQuery, homePageQuery, productsQuery, reviewsQuery, sportsQuery, storeConfigQuery } from '@/sanity/lib/queries';
import { cleanBrandColors, cleanSportColors } from '@/sanity/lib/stega-safe';
import { BrandMeta, CategoryMeta, HomePageContent, Product, Review, SportMeta, StoreConfig } from '@/types';

export default async function HomePage() {
  const [
    { data: productsData },
    { data: categoriesData },
    { data: sportsData },
    { data: brandsData },
    { data: reviewsData },
    { data: storeConfigData },
    { data: contentData },
  ] = await Promise.all([
    sanityFetch({ query: productsQuery }),
    sanityFetch({ query: categoriesQuery }),
    sanityFetch({ query: sportsQuery }),
    sanityFetch({ query: brandsQuery }),
    sanityFetch({ query: reviewsQuery }),
    sanityFetch({ query: storeConfigQuery }),
    sanityFetch({ query: homePageQuery }),
  ]);

  return (
    <HomePageClient
      products={productsData as Product[]}
      categories={categoriesData as CategoryMeta[]}
      sports={(sportsData as SportMeta[]).map(cleanSportColors)}
      brands={(brandsData as BrandMeta[]).map(cleanBrandColors)}
      reviews={reviewsData as Review[]}
      storeConfig={storeConfigData as StoreConfig}
      content={contentData as HomePageContent}
    />
  );
}
