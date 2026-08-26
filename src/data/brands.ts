export interface BrandMeta {
  slug: 'molten' | 'mikasa';
  title: string;
  lede: string;
  accent: string;
  bg: string;
  fg: string;
  img: string;
}

export const BRANDS: BrandMeta[] = [
  {
    slug: 'molten',
    title: 'Molten',
    lede: "FIBA's ball of choice, and the ball of the 3x3 game. Molten's range runs from BG5000 game leather down to rubber trainers built for outdoor courts, with netballs alongside.",
    accent: '#F2900E',
    bg: '#13251C',
    fg: '#F3F5F0',
    img: '/balls/bg5000-a.webp',
  },
  {
    slug: 'mikasa',
    title: 'Mikasa',
    lede: 'FIVB match and beach volleyballs, FIFA Quality Pro footballs, the netballs most leagues play with, street basketballs, and the gauge that keeps them all honest.',
    accent: '#F2900E',
    bg: '#1678A0',
    fg: '#fff',
    img: '/balls/ft550b.webp',
  },
];
