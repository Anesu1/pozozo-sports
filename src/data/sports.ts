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

export const SPORTS: SportMeta[] = [
  {
    slug: 'basketball',
    kicker: 'FOR THE COURT',
    title: 'Match and street basketballs',
    blurb: 'Game leather for the league, composite for the school hall, rubber for the outdoor court.',
    lede: 'Three surfaces, three balls. Leather is for indoor match play and will not survive a tarmac court; composite handles both; rubber is what a school buys twenty of.',
    img: '/balls/bg5000-a.webp',
    bg: '#13251C',
    fg: '#F3F5F0',
    dim: '#8B9782',
    line: '#26362A',
    cta: 'Shop basketball',
  },
  {
    slug: 'football',
    kicker: 'FOR THE PITCH',
    title: 'Footballs from junior to FIFA Pro',
    blurb: 'Thermal-bonded match balls, hand-stitched trainers and junior sizes for the academy.',
    lede: 'Thermal-bonded balls keep their shape and take less water — worth it for match day. Machine-stitched trainers are the sensible buy in bulk.',
    img: '/balls/ft550b.webp',
    bg: '#DCEFF0',
    fg: '#13251C',
    dim: '#3C4536',
    line: '#BCC4B4',
    cta: 'Shop football',
  },
  {
    slug: 'netball',
    kicker: 'FOR THE RING',
    title: 'Netballs for school and league',
    blurb: 'Size 5 for seniors, size 4 for juniors, in the colourways leagues actually ask for.',
    lede: 'Netball is the order we fill most. Size 5 covers senior school and club; size 4 is for the younger age groups.',
    img: '/balls/u19.webp',
    bg: '#1678A0',
    fg: '#fff',
    dim: '#BEE4EF',
    line: 'rgba(255,255,255,.55)',
    cta: 'Shop netball',
  },
  {
    slug: 'volleyball',
    kicker: 'FOR THE COURT & SAND',
    title: 'Volleyballs for court and beach',
    blurb: 'FIVB approved match and training balls indoors, plus covers built for sand outside.',
    lede: 'Indoor sets and serves want a composite match ball; beach needs a cover built for sand and sun. Mikasa covers both without switching brands.',
    img: '/volleyballs/mikasa-v333w-volleyball-a.webp',
    bg: '#F2900E',
    fg: '#13251C',
    dim: '#7A3D06',
    line: 'rgba(14,23,38,.35)',
    cta: 'Shop volleyball',
  },
];
