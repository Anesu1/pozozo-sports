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
    accent: '#F2C230',
    bg: '#0E1726',
    fg: '#EEF1F5',
    img: '/balls/bg5000-a.webp',
  },
  {
    slug: 'mikasa',
    title: 'Mikasa',
    lede: 'FIFA Quality Pro footballs, the netballs most leagues play with, street basketballs and the gauge that keeps them all honest.',
    accent: '#F2C230',
    bg: '#1E3A5F',
    fg: '#fff',
    img: '/balls/ft550b.webp',
  },
];
