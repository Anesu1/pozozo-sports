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
    count: 80,
    image: '/balls/bg5000-a.webp',
    description: 'Complete stock of genuine Molten, Mikasa and Fox40 match, training and officiating equipment.',
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
    id: 'volleyball',
    slug: 'volleyball',
    name: 'Volleyball',
    count: 9,
    image: '/volleyballs/mikasa-v333w-volleyball-a.webp',
    description: 'FIVB approved indoor match and training balls, plus outdoor beach volleyballs, from Mikasa.',
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories',
    count: 21,
    image: '/balls/ag500.webp',
    description: 'Pressure gauges, pumps, nets, scoreboards, officiating gear and Fox40 whistles for referees, coaches and team managers.',
  },
];
