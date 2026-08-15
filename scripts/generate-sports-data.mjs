import fs from 'fs';

const raw = [
  ['bg5000','Molten','BG5000 Official Game Ball','Size 7 genuine leather · FIBA approved','/balls/bg5000-a.webp','basketball','FLAGSHIP', 1850, 2100, 5.0, 142, true, true, true, ['/balls/bg5000-a.webp', '/balls/bg5000-b.webp']],
  ['bg4550','Molten','BG4550 Indoor/Outdoor','Size 7 composite leather · FIBA approved','/balls/bg4550.webp','basketball','', 1250, 1450, 4.9, 98, false, true, true, ['/balls/bg4550.webp', '/balls/bg4550-b.webp']],
  ['b7d3500','Molten','D3500 Outdoor','Size 7 rubber · hard-court durable','/balls/b7d3500.webp','basketball','', 650, 750, 4.8, 64, false, false, false, ['/balls/b7d3500.webp']],
  ['gg7x','Molten','GG7X Composite','Size 7 · club and school training','/balls/gg7x.webp','basketball','', 950, 1100, 4.9, 115, false, true, true, ['/balls/gg7x.webp', '/balls/gg7x-3850.webp']],
  ['bg3850','Molten','BG3850 Match','Size 7 composite · indoor match','/balls/gg7x-3850.webp','basketball','', 880, 990, 4.8, 52, false, false, false, ['/balls/gg7x-3850.webp']],
  ['bc7r-red','Molten','BC7R Rubber — Red / Black','Size 7 rubber · outdoor','/balls/bc7r-red.webp','basketball','', 450, 520, 4.7, 43, false, false, false, ['/balls/bc7r-red.webp']],
  ['bc7r-blue','Molten','BC7R Rubber — Blue / Yellow','Size 7 rubber · outdoor','/balls/bc7r-blue.webp','basketball','', 450, 520, 4.7, 39, false, false, false, ['/balls/bc7r-blue.webp']],
  ['bc7r-rwb','Molten','BC7R Rubber — Red / White / Blue','Size 7 rubber · outdoor','/balls/bc7r-rwb.webp','basketball','', 450, 520, 4.7, 48, false, false, false, ['/balls/bc7r-rwb.webp']],
  ['b33t5000','Molten','B33T5000 Libertria 3x3','Official size 6 · FIBA 3x3','/balls/b33t5000-b.webp','basketball','3x3', 1450, 1650, 5.0, 76, true, true, true, ['/balls/b33t5000-b.webp', '/balls/b33t5000-a.webp']],
  ['b33t5000b','Molten','B33T5000 3x3 Game Ball','Size 6 composite · FIBA 3x3','/balls/b33t5000-a.webp','basketball','', 1350, 1500, 4.9, 58, false, false, false, ['/balls/b33t5000-a.webp', '/balls/b33t5000-b.webp']],
  ['b33t2000','Molten','B33T2000 3x3 Training','Size 6 rubber · 3x3 practice','/balls/b33t2000-b.webp','basketball','', 550, 650, 4.8, 33, false, false, false, ['/balls/b33t2000-b.webp', '/balls/b33t2000-a.webp']],
  ['b33t2000b','Molten','B33T2000 3x3 Outdoor','Size 6 rubber · 3x3 practice','/balls/b33t2000-a.webp','basketball','', 550, 650, 4.8, 29, false, false, false, ['/balls/b33t2000-a.webp', '/balls/b33t2000-b.webp']],
  ['cf700','Mikasa','CF700 Leather','Size 7 leather · indoor match','/balls/u04.webp','basketball','', 1450, 1700, 4.9, 87, false, true, true, ['/balls/u04.webp']],
  ['cf600','Mikasa','CF600 Leather','Size 6 leather · women\'s match','/balls/u05.webp','basketball','', 1380, 1600, 4.9, 64, false, false, false, ['/balls/u05.webp']],
  ['street7','Mikasa','Street 7','Size 7 rubber · navy / red','/balls/u06.webp','basketball','', 480, 560, 4.7, 51, false, false, false, ['/balls/u06.webp']],
  ['street6','Mikasa','Street 6','Size 6 rubber · yellow / blue','/balls/u07.webp','basketball','', 460, 540, 4.7, 44, false, false, false, ['/balls/u07.webp']],
  ['street5','Mikasa','Street 5','Size 5 rubber · junior','/balls/u08.webp','basketball','', 440, 500, 4.8, 38, false, false, false, ['/balls/u08.webp']],
  ['mik-off','Mikasa','Official Rubber Basketball','Size 7 rubber · school training','/balls/u02.webp','basketball','', 450, 520, 4.7, 62, false, false, false, ['/balls/u02.webp']],
  ['train-bb','Mikasa','Practice Basketball','Size 7 rubber · budget training','/balls/u03.webp','basketball','', 390, 450, 4.6, 28, false, false, false, ['/balls/u03.webp']],

  ['ft550b','Mikasa','FT550B Alumndo','Size 5 · FIFA Quality Pro','/balls/ft550b.webp','football','FIFA PRO', 1450, 1700, 5.0, 168, true, true, true, ['/balls/ft550b.webp', '/balls/u17.webp', '/balls/u18.webp']],
  ['ft550-blue','Mikasa','FT550 Alumndo — Blue','Size 5 thermal bonded','/balls/u17.webp','football','NEW', 1400, 1650, 4.9, 74, true, false, true, ['/balls/u17.webp', '/balls/ft550b.webp']],
  ['ft550-orange','Mikasa','FT550 Alumndo — Orange','Size 5 thermal bonded','/balls/u18.webp','football','NEW', 1400, 1650, 4.9, 82, true, false, true, ['/balls/u18.webp', '/balls/ft550b.webp']],
  ['f5a5000-y','Molten','F5A5000 Vantaggio — Yellow','Size 5 · FIFA Quality Pro','/balls/f5a5000-yellow.webp','football','', 1500, 1750, 5.0, 114, false, true, true, ['/balls/f5a5000-yellow.webp', '/balls/f5a5000-orange.webp']],
  ['f5a5000-o','Molten','F5A5000 Vantaggio — Orange','Size 5 · winter high-visibility','/balls/f5a5000-orange.webp','football','', 1500, 1750, 4.9, 67, false, false, false, ['/balls/f5a5000-orange.webp', '/balls/f5a5000-yellow.webp']],
  ['f3n1000-r','Molten','F3N1000 — Red','Size 3 · junior training','/balls/f3n1000-red.webp','football','', 420, 490, 4.8, 41, false, false, false, ['/balls/f3n1000-red.webp']],
  ['f3n1000-y','Molten','F3N1000 — Yellow','Size 3 · junior training','/balls/f3n1000-yellow.webp','football','', 420, 490, 4.8, 36, false, false, false, ['/balls/f3n1000-yellow.webp']],
  ['f3n1000-w','Molten','F3N1000 — White / Blue','Size 3 · junior training','/balls/f3n1000-white.webp','football','', 420, 490, 4.8, 53, false, false, false, ['/balls/f3n1000-white.webp']],
  ['skickoff-b','Mikasa','Super Kick Off — Black','Size 5 · FIFA Basic','/balls/u11.webp','football','', 750, 880, 4.8, 89, false, true, false, ['/balls/u11.webp', '/balls/u12.webp']],
  ['skickoff-bl','Mikasa','Super Kick Off — Blue','Size 5 · FIFA Basic','/balls/u12.webp','football','', 750, 880, 4.8, 77, false, false, false, ['/balls/u12.webp', '/balls/u11.webp']],
  ['kickoff-r','Mikasa','Kick Off — Red','Size 5 hand-stitched','/balls/u13.webp','football','', 520, 600, 4.7, 49, false, false, false, ['/balls/u13.webp']],
  ['kickoff-b','Mikasa','Kick Off — Blue','Size 5 hand-stitched','/balls/u14.webp','football','', 520, 600, 4.7, 45, false, false, false, ['/balls/u14.webp']],
  ['kickoff-p','Mikasa','Kick Off — Pink / Black','Size 5 hand-stitched','/balls/u15.webp','football','', 520, 600, 4.7, 38, false, false, false, ['/balls/u15.webp']],
  ['kickoff-g','Mikasa','Kick Off — Green','Size 5 hand-stitched','/balls/u16.webp','football','', 520, 600, 4.7, 42, false, false, false, ['/balls/u16.webp']],
  ['mik-match-n','Mikasa','Match Ball — Navy / Red','Size 5 thermal bonded','/balls/u24.webp','football','', 980, 1150, 4.8, 59, false, false, false, ['/balls/u24.webp']],
  ['mik-match-w','Mikasa','Match Ball — White / Navy','Size 5 thermal bonded','/balls/u25.webp','football','', 980, 1150, 4.8, 63, false, false, false, ['/balls/u25.webp']],
  ['mik-tr-g','Mikasa','Trainer — White / Green','Size 5 machine-stitched','/balls/u26.webp','football','', 450, 520, 4.7, 50, false, false, false, ['/balls/u26.webp']],
  ['mik-tr-r','Mikasa','Trainer — White / Red','Size 4 machine-stitched','/balls/u27.webp','football','', 430, 500, 4.7, 34, false, false, false, ['/balls/u27.webp']],
  ['mik-tr-gb','Mikasa','Trainer — Green / Black','Size 5 machine-stitched','/balls/u28.webp','football','', 450, 520, 4.7, 41, false, false, false, ['/balls/u28.webp']],
  ['mik-tr-rb','Mikasa','Trainer — Red / Black','Size 5 machine-stitched','/balls/u29.webp','football','', 450, 520, 4.7, 39, false, false, false, ['/balls/u29.webp']],
  ['mik-fb-a','Mikasa','Club Football — White / Yellow','Size 5 training','/balls/u09.webp','football','', 480, 550, 4.7, 36, false, false, false, ['/balls/u09.webp']],
  ['mik-fb-b','Mikasa','Club Football — White / Blue','Size 5 training','/balls/u10.webp','football','', 480, 550, 4.7, 40, false, false, false, ['/balls/u10.webp']],

  ['fx5','Mikasa','FX5 Netball','Size 5 · match grade leatherette','/balls/fx5.webp','netball','MATCH', 850, 990, 4.9, 93, false, true, true, ['/balls/fx5.webp']],
  ['netball-3550','Mikasa','Netball 3550-P','Size 5 rubber · pink / white','/balls/u01.webp','netball','', 460, 530, 4.8, 62, false, false, false, ['/balls/u01.webp']],
  ['turbo-navy','Mikasa','Turbo SS-T — Navy','Size 5 · league play','/balls/u19.webp','netball','LEAGUE', 780, 900, 4.9, 128, true, true, true, ['/balls/u19.webp']],
  ['turbo-red','Mikasa','Turbo SS-T — Red','Size 5 · league play','/balls/u20.webp','netball','', 780, 900, 4.8, 71, false, false, false, ['/balls/u20.webp']],
  ['turbo-yel','Mikasa','Turbo SS-T — Yellow / Blue','Size 5 · league play','/balls/u21.webp','netball','', 780, 900, 4.8, 65, false, false, false, ['/balls/u21.webp']],
  ['turbo-blk','Mikasa','Turbo SS-T — Yellow / Black','Size 5 · league play','/balls/u22.webp','netball','', 780, 900, 4.8, 54, false, false, false, ['/balls/u22.webp']],
  ['turbo-4','Mikasa','Turbo SS-T — Size 4','Junior primary school netball','/balls/u23.webp','netball','JUNIOR', 720, 840, 4.8, 49, false, false, false, ['/balls/u23.webp']],
  ['n5y3500','Molten','N5Y3500 Netball','Size 5 · school and club match','/balls/n5y3500.webp','netball','', 690, 800, 4.8, 57, false, true, false, ['/balls/n5y3500.webp']],
  ['molten-pink','Molten','Netball — Pink','Size 5 rubber · training','/balls/molten-pink.webp','netball','', 450, 520, 4.7, 43, false, false, false, ['/balls/molten-pink.webp']],

  ['ag500','Mikasa','AG500 Digital Pressure Gauge','Digital pressure gauge with pressure release valve','/balls/ag500.webp','accessories','PRO TOOL', 650, 780, 5.0, 84, true, true, true, ['/balls/ag500.webp']]
];

const products = raw.map(([id, brand, name, spec, img, cat, tag, price, orig, rating, revs, isNew, isBest, isFeat, imgs]) => {
  const collections = [
    brand.toLowerCase(),
    cat,
    tag ? tag.toLowerCase().replace(/\s+/g, '-') : '',
    isNew ? 'new-arrivals' : '',
    isBest ? 'best-sellers' : '',
    isFeat ? 'flagship-match' : '',
    'all'
  ].filter(Boolean);

  let material = 'High-grade composite';
  if (spec.includes('leather')) material = 'Premium Genuine / Full-Grain Leather';
  else if (spec.includes('rubber')) material = 'Durable High-Traction Cellular Rubber';
  else if (spec.includes('thermal')) material = 'Thermal Bonded Seamless PU';
  else if (cat === 'accessories') material = 'Digital precision sensor & stainless probe';

  let surface = 'Indoor hardwood courts & outdoor sport courts';
  if (cat === 'football') surface = 'Natural grass & FIFA approved synthetic turf';
  else if (cat === 'netball') surface = 'Indoor sports halls & outdoor all-weather courts';
  else if (spec.includes('Outdoor')) surface = 'Outdoor asphalt, concrete, and hard courts';
  else if (cat === 'accessories') surface = 'All match balls (FIBA, FIFA, Netball)';

  let cert = 'Standard Authorized Stock';
  if (spec.includes('FIBA')) cert = 'FIBA Officially Approved Match Ball';
  else if (spec.includes('FIFA Quality Pro')) cert = 'FIFA Quality Pro Certified';
  else if (spec.includes('FIFA Basic')) cert = 'FIFA Basic Certified';
  else if (tag === '3x3') cert = 'Official FIBA 3x3 World Tour Specification';

  return {
    id,
    name,
    brand,
    slug: id,
    price,
    originalPrice: orig,
    spec,
    tag: tag || undefined,
    rating,
    reviewsCount: revs,
    category: cat,
    categoryLabel: cat.charAt(0).toUpperCase() + cat.slice(1),
    collections,
    isNew,
    isBestSeller: isBest,
    isFeatured: isFeat,
    summary: `${brand} ${name} — ${spec}. Genuine authorized stock from Pozozo Sports.`,
    description: `The ${brand} ${name} is engineered to professional match standards. Featuring ${spec.toLowerCase()}, optimal panel seam alignment, consistent rebound dynamics, and superior grip control for competitive clubs, tournaments, and schools.`,
    images: imgs,
    colors: [
      { name: 'Standard Match Spec', hex: cat === 'basketball' ? '#C8482B' : (cat === 'football' ? '#FFFFFF' : '#1D2A44') }
    ],
    sizes: [spec.includes('Size 7') ? 'Size 7' : (spec.includes('Size 6') ? 'Size 6' : (spec.includes('Size 5') ? 'Size 5' : (spec.includes('Size 4') ? 'Size 4' : (spec.includes('Size 3') ? 'Size 3' : 'Standard'))))],
    details: [
      `Genuine 100% authorized ${brand} stock with manufacturer hologram`,
      cert,
      `Ideal for: ${surface}`,
      'Engineered for maximum roundness retention and predictable bounce trajectory',
      'Available for immediate single unit or bulk institutional delivery on WhatsApp'
    ],
    features: {
      material,
      intendedSurface: surface,
      certification: cert,
      sizeSpecification: spec
    }
  };
});

const fileContent = `import { Product } from "@/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync('src/data/products.ts', fileContent);
console.log(`Successfully generated src/data/products.ts with ${products.length} sports items!`);
