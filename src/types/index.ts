export type SportCategory = 'basketball' | 'football' | 'netball' | 'volleyball' | 'accessories' | 'all';
export type BallBrand = 'Molten' | 'Mikasa' | 'Fox40';

export interface Product {
  id: string;
  name: string;
  brand: BallBrand;
  slug: string;
  price: number;
  originalPrice?: number;
  spec: string;
  rating: number;
  reviewsCount: number;
  category: SportCategory;
  categoryLabel: string;
  collections: string[];
  tag?: string;
  description: string;
  summary: string;
  images: string[];
  colors: Array<{
    name: string;
    hex: string;
    imageIndex?: number;
  }>;
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  details: string[];
  features: {
    material: string;
    intendedSurface: string;
    certification: string;
    sizeSpecification: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
  };
  content: Array<{
    heading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }>;
}

export interface Review {
  id: string;
  author: string;
  location?: string;
  rating: number;
  text: string;
  verified: boolean;
  productName?: string;
  role?: string;
}

export interface CategoryMeta {
  id: string;
  slug: string;
  name: string;
  count: number;
  image: string;
  description: string;
}

export interface SportMeta {
  slug: 'basketball' | 'football' | 'netball' | 'volleyball';
  kicker: string;
  title: string;
  blurb: string;
  lede: string;
  img: string;
  bg: string;
  fg: string;
  dim: string;
  line: string;
  cta: string;
}

export interface BrandMeta {
  slug: 'molten' | 'mikasa';
  title: string;
  lede: string;
  accent: string;
  bg: string;
  fg: string;
  img: string;
}

export interface CollectionMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface SizeGuideRow {
  size: string;
  age: string;
  use: string;
}

export interface SizeGuideEntry {
  sport: string;
  sportSlug?: 'basketball' | 'football' | 'netball' | 'volleyball';
  note: string;
  rows: SizeGuideRow[];
}

export interface CareTip {
  n: string;
  title: string;
  body: string;
}

export interface PricingBand {
  qty: string;
  what: string;
}

export interface SupplyStat {
  n: string;
  what: string;
}

export interface StoreConfig {
  name: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  email: string;
  operatingHours: string;
  currencySymbol: string;
  currencyCode: string;
  location: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  announcementMessages: string[];
  logoLine1: string;
  logoLine2: string;
  navLinks: NavLink[];
  footerTagline: string;
  footerColumns: Array<{ heading: string; links: NavLink[] }>;
  footerCopyright: string;
  footerLegalLinks: NavLink[];
}

export interface HomePageContent {
  heroKicker: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroHeadingHighlight: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  newInStockHeading: string;
  marqueePhrases: string[];
  shopBySportHeading: string;
  brandsSectionLabel: string;
  catalogueHeading: string;
  catalogueDescription: string;
  confidenceHeading: string;
  confidenceFeatures: Array<{ title: string; body: string }>;
  confidencePersonTitle: string;
  confidencePersonBody: string;
  bulkTeaserKicker: string;
  bulkTeaserHeading: string;
  bulkTeaserDescription: string;
  bulkTeaserCta: string;
  bulkTeaserPoints: string[];
  testimonialsHeading: string;
  beforeYouBuyHeading: string;
  beforeYouBuyCards: Array<{ href: string; title: string; body: string }>;
  contactCtaHeading: string;
  contactCtaDescription: string;
}

export interface AboutPageContent {
  heroBadge: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroDescription: string;
  stats: Array<{ value: string; label: string }>;
  aboutLabel: string;
  aboutParagraphs: string[];
  aboutTagline: string;
  missionLabel: string;
  missionHeading: string;
  missionDescription: string;
  missionBullets: string[];
  missionPrimaryCta: string;
  missionSecondaryCta: string;
  capabilities: Array<{ title: string; body: string }>;
}

export interface BulkPageContent {
  heading: string;
  description: string;
  howItWorksHeading: string;
  steps: string[];
  formHeading: string;
  nameLabel: string;
  namePlaceholder: string;
  needLabel: string;
  needPlaceholder: string;
  deliveryLabel: string;
  deliveryPlaceholder: string;
  whatsappButtonLabel: string;
  emailButtonLabel: string;
  disclaimer: string;
}

export interface GuidesPageContent {
  heading: string;
  description: string;
  tiles: Array<{ href: string; title: string; body: string; inverted?: boolean }>;
  furtherReadingHeading: string;
}

export interface SimpleHeroPageContent {
  heading: string;
  description: string;
}

export interface CarePageContent extends SimpleHeroPageContent {
  gaugeKicker: string;
  gaugeHeading: string;
  gaugeDescription: string;
  gaugeCta: string;
}

export interface SizeGuidePageContent extends SimpleHeroPageContent {
  ctaHeading: string;
  ctaDescription: string;
  ctaLabel: string;
}

export interface WhoWeSupplyPageContent extends SimpleHeroPageContent {
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialLocation: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaLabel: string;
}

export interface PriceListPageContent extends SimpleHeroPageContent {
  ctaLabel: string;
}

export interface ContactPageContent {
  badge: string;
  heading: string;
  description: string;
  formHeading: string;
  nameLabel: string;
  namePlaceholder: string;
  contactLabel: string;
  contactPlaceholder: string;
  organisationLabel: string;
  organisationPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  whatsappButtonLabel: string;
  emailButtonLabel: string;
  directContactsHeading: string;
  whatsappLabel: string;
  whatsappNote: string;
  emailLabel: string;
  hoursLabel: string;
  locationLabel: string;
  faqsHeading: string;
  faqs: FaqEntry[];
  seeAllFaqsLabel: string;
}

export interface JournalIndexPageContent {
  badge: string;
  heading: string;
  description: string;
}

export interface NotFoundPageContent {
  kicker: string;
  heading: string;
  description: string;
  shopCta: string;
  whatsappCta: string;
  homeCta: string;
}
