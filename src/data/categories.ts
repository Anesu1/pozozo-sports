export interface CategoryMeta {
  id: string;
  slug: string;
  name: string;
  count: number;
  image: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    slug: 'all',
    name: 'All Balls',
    count: 51,
    image: '/balls/bg5000-a.webp',
    description: 'Complete stock of genuine Molten and Mikasa match and training balls.',
  },
  {
    id: 'basketball',
    slug: 'basketball',
    name: 'Basketball',
    count: 19,
    image: '/balls/bg5000-a.webp',
    description: 'FIBA approved genuine leather, composite indoor match, 3x3, and outdoor rubber basketballs.',
  },
  {
    id: 'football',
    slug: 'football',
    name: 'Football',
    count: 22,
    image: '/balls/ft550b.webp',
    description: 'FIFA Quality Pro thermal-bonded match balls, club trainers, and youth high-visibility footballs.',
  },
  {
    id: 'netball',
    slug: 'netball',
    name: 'Netball',
    count: 9,
    image: '/balls/u19.webp',
    description: 'Official league-grade match netballs, durable training rubber, and junior size 4 balls.',
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories',
    count: 1,
    image: '/balls/ag500.webp',
    description: 'Digital pressure gauges, pressure release needles, pumps, and match equipment accessories.',
  },
];
