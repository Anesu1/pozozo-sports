export interface SizeGuideRow {
  size: string;
  age: string;
  use: string;
}

export interface SizeGuideEntry {
  sport: string;
  sportSlug?: 'basketball' | 'football' | 'netball';
  note: string;
  rows: SizeGuideRow[];
}

export const SIZES: SizeGuideEntry[] = [
  {
    sport: 'Basketball',
    sportSlug: 'basketball',
    note: "Sizes are the official ones; check whether your league plays size 6 for women's competition.",
    rows: [
      { size: 'Size 7', age: 'Men, 15 and over', use: "Senior men's match and training" },
      { size: 'Size 6', age: 'Women 12+, boys 12–14', use: "Women's competition, junior boys" },
      { size: 'Size 5', age: 'Ages 9–11', use: 'Primary and mini-basketball' },
      { size: 'Size 3', age: 'Under 8', use: 'Mini hoops, skills work' },
    ],
  },
  {
    sport: 'Football',
    sportSlug: 'football',
    note: 'Size 5 is the adult ball; anything below is about weight and control, not just circumference.',
    rows: [
      { size: 'Size 5', age: '13 and over', use: 'Match and training, all senior play' },
      { size: 'Size 4', age: 'Ages 8–12', use: 'Junior matches and academy sessions' },
      { size: 'Size 3', age: 'Ages 5–8', use: 'First-touch coaching' },
    ],
  },
  {
    sport: 'Netball',
    sportSlug: 'netball',
    note: 'Most Zambian school and club netball is played with size 5.',
    rows: [
      { size: 'Size 5', age: '14 and over', use: 'Senior school, club and league' },
      { size: 'Size 4', age: 'Ages 9–13', use: 'Junior school netball' },
      { size: 'Size 3', age: 'Under 9', use: 'Introductory and skills sessions' },
    ],
  },
];
