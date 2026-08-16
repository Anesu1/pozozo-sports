export interface SportMeta {
  slug: 'basketball' | 'football' | 'netball';
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

export const SPORTS: SportMeta[] = [
  {
    slug: 'basketball',
    kicker: 'FOR THE COURT',
    title: 'Match and street basketballs',
    blurb: 'Game leather for the league, composite for the school hall, rubber for the outdoor court.',
    lede: 'Three surfaces, three balls. Leather is for indoor match play and will not survive a tarmac court; composite handles both; rubber is what a school buys twenty of.',
    img: '/balls/bg5000-a.webp',
    bg: '#0E1726',
    fg: '#EEF1F5',
    dim: '#8494AC',
    line: '#2C3A50',
    cta: 'Shop basketball',
  },
  {
    slug: 'football',
    kicker: 'FOR THE PITCH',
    title: 'Footballs from junior to FIFA Pro',
    blurb: 'Thermal-bonded match balls, hand-stitched trainers and junior sizes for the academy.',
    lede: 'Thermal-bonded balls keep their shape and take less water — worth it for match day. Machine-stitched trainers are the sensible buy in bulk.',
    img: '/balls/ft550b.webp',
    bg: '#DCE3EC',
    fg: '#0E1726',
    dim: '#3A4557',
    line: '#B9C3D2',
    cta: 'Shop football',
  },
  {
    slug: 'netball',
    kicker: 'FOR THE RING',
    title: 'Netballs for school and league',
    blurb: 'Size 5 for seniors, size 4 for juniors, in the colourways leagues actually ask for.',
    lede: 'Netball is the order we fill most. Size 5 covers senior school and club; size 4 is for the younger age groups.',
    img: '/balls/u19.webp',
    bg: '#1E3A5F',
    fg: '#fff',
    dim: '#C3D0E0',
    line: 'rgba(255,255,255,.55)',
    cta: 'Shop netball',
  },
];
