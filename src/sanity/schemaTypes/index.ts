import { type SchemaTypeDefinition } from 'sanity';

import { product } from './product';
import { category } from './category';
import { sport } from './sport';
import { brand } from './brand';
import { collection } from './collection';
import { journalPost } from './journalPost';
import { faq } from './faq';
import { sizeGuideEntry } from './sizeGuideEntry';
import { careTip } from './careTip';
import { pricingBand } from './pricingBand';
import { supplyStat } from './supplyStat';
import { review } from './review';
import { storeConfig } from './storeConfig';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { bulkPage } from './bulkPage';
import { guidesPage } from './guidesPage';
import { brandsPage } from './brandsPage';
import { sportsPage } from './sportsPage';
import { carePage } from './carePage';
import { sizeGuidePage } from './sizeGuidePage';
import { whoWeSupplyPage } from './whoWeSupplyPage';
import { priceListPage } from './priceListPage';
import { faqPage } from './faqPage';
import { contactPage } from './contactPage';
import { journalIndexPage } from './journalIndexPage';
import { notFoundPage } from './notFoundPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    category,
    sport,
    brand,
    collection,
    journalPost,
    faq,
    sizeGuideEntry,
    careTip,
    pricingBand,
    supplyStat,
    review,
    storeConfig,
    siteSettings,
    homePage,
    aboutPage,
    bulkPage,
    guidesPage,
    brandsPage,
    sportsPage,
    carePage,
    sizeGuidePage,
    whoWeSupplyPage,
    priceListPage,
    faqPage,
    contactPage,
    journalIndexPage,
    notFoundPage,
  ],
};
