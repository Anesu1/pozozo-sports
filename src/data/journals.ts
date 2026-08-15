import { JournalPost } from '@/types';

export const JOURNALS: JournalPost[] = [
  {
    id: 'journal-choosing-match-vs-training-balls',
    slug: 'choosing-match-vs-training-balls',
    title: 'Match Balls vs. Training Balls: What Clubs Need to Know',
    category: 'Equipment Guide',
    date: 'Aug 10, 2026',
    readTime: '4 min read',
    excerpt: 'How to balance budget and performance when equipping a full league season or school athletic department.',
    coverImage: '/balls/bg5000-a.webp',
    author: {
      name: 'Coach Mwila',
      role: 'Equipment Specialist',
      avatar: '/images/TJIVjPqjVNkyqIa35O8wibnE.png',
    },
    content: [
      {
        heading: 'Why Match Balls Matter for Competitive Play',
        paragraphs: [
          'In official tournament play, ball consistency is non-negotiable. Official FIBA approved game balls like the Molten BG5000 and FIFA Quality Pro footballs like the Mikasa FT550B feature custom multi-layer bladder engineering and microscopic surface texturing that guarantee true flight and predictable rebound.',
          'Using genuine match balls during game day ensures players experience the exact friction, weight distribution, and tactile feedback required at high competitive levels.',
        ],
        bulletPoints: [
          'Genuine leather & multi-tier composite outer shells for sweat dispersion.',
          'Precision panel bonding ensuring zero water uptake on outdoor turf.',
          'Official weight and circumference compliance with FIBA / FIFA regulations.',
        ],
      },
      {
        heading: 'The Role of Durable Training Balls',
        paragraphs: [
          'For daily club drills and school sessions on abrasive concrete or asphalt, high-traction cellular rubber models like the Molten D3500, BC7R series, or Mikasa Street balls provide immense durability without wearing down.',
        ],
      },
    ],
  },
  {
    id: 'journal-maintaining-accurate-ball-pressure',
    slug: 'maintaining-accurate-ball-pressure',
    title: 'Maintaining Accurate Ball Pressure: Why The AG500 Is Crucial',
    category: 'Maintenance',
    date: 'Aug 04, 2026',
    readTime: '3 min read',
    excerpt: 'Over-inflation damages bladder seams; under-inflation slows ball response. How to calibrate match balls precisely.',
    coverImage: '/balls/ag500.webp',
    author: {
      name: 'Referees Committee',
      role: 'Technical Operations',
      avatar: '/images/TJIVjPqjVNkyqIa35O8wibnE.png',
    },
    content: [
      {
        heading: 'The Cost of Guesswork in Pressure',
        paragraphs: [
          'Squeezing a ball with your thumbs gives an inaccurate measure of internal PSI or bar pressure. An over-inflated ball puts excessive tensile stress on bonded seams, leading to micro-tears over time.',
          'The Mikasa AG500 Digital Pressure Gauge features a high-precision digital sensor and an integrated micro-bleed valve, enabling match officials to release exact fractions of a PSI with a single press.',
        ],
        bulletPoints: [
          'Basketball official pressure: 7.0 – 9.0 PSI (0.48 – 0.62 bar)',
          'Football official pressure: 8.5 – 15.6 PSI (0.6 – 1.1 bar)',
          'Netball official pressure: 9.0 – 11.0 PSI (0.62 – 0.76 bar)',
        ],
      },
    ],
  },
  {
    id: 'journal-fiba-3x3-ball-differences',
    slug: 'fiba-3x3-ball-differences',
    title: 'FIBA 3x3 Basketball: Why Size 6 with Size 7 Weight?',
    category: 'Rules & Tech',
    date: 'Jul 28, 2026',
    readTime: '3 min read',
    excerpt: 'Understanding the unique engineering behind Molten’s official 3x3 World Tour game ball.',
    coverImage: '/balls/b33t5000-b.webp',
    author: {
      name: 'Kelvin Silwamba',
      role: '3x3 Coordinator',
      avatar: '/images/TJIVjPqjVNkyqIa35O8wibnE.png',
    },
    content: [
      {
        heading: 'Engineered for Rapid 3x3 Pace',
        paragraphs: [
          'In official FIBA 3x3 tournaments, games are fast-paced with a 12-second shot clock and relentless outdoor wind conditions. The official Molten B33T5000 Libertria features the circumference of a Size 6 ball with the mass and weight of a full Size 7 ball.',
          'This unique balance allows players to handle and shoot with extreme velocity while maintaining heavy wind resistance and outdoor court grip.',
        ],
      },
    ],
  },
];
