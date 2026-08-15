export interface CollectionMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export const COLLECTIONS: CollectionMeta[] = [
  {
    id: 'all',
    slug: 'all',
    name: 'All Equipment',
    tagline: 'GENUINE MATCH STOCK',
    description: 'Every ball we stock from Molten and Mikasa — genuine, pressure-tested, and ready to dispatch.',
    image: '/balls/bg5000-a.webp',
  },
  {
    id: 'molten',
    slug: 'molten',
    name: 'Molten Authorized',
    tagline: 'FIBA & TOURNAMENT OFFICIAL',
    description: 'Official FIBA World Cup match balls (BG5000), 3x3 Libertria series, Vantaggio footballs, and club training balls.',
    image: '/balls/bg5000-a.webp',
  },
  {
    id: 'mikasa',
    slug: 'mikasa',
    name: 'Mikasa Authorized',
    tagline: 'FIFA PRO & LEAGUE NETBALL',
    description: 'FIFA Quality Pro FT550B footballs, Turbo SS-T league netballs, CF700 match basketballs, and AG500 digital gauges.',
    image: '/balls/ft550b.webp',
  },
  {
    id: 'best-sellers',
    slug: 'best-sellers',
    name: 'Most Popular Balls',
    tagline: 'CLUB & LEAGUE FAVORITES',
    description: 'Our most requested match balls by premier clubs, national leagues, and school athletic departments.',
    image: '/balls/u19.webp',
  },
  {
    id: 'new-arrivals',
    slug: 'new-arrivals',
    name: 'New Drops & Upgrades',
    tagline: 'LATEST GENERATION',
    description: 'Newly received stock batches and updated colorway variants for the 2026 season.',
    image: '/balls/u17.webp',
  },
];
