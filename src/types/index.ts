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

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'ZMW';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number;
  name: string;
}
