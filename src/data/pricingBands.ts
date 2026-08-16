export interface PricingBand {
  qty: string;
  what: string;
}

export const BANDS: PricingBand[] = [
  { qty: '1–9', what: 'Standard pricing, quoted per ball.' },
  { qty: '10–49', what: 'Bulk pricing. This is where most schools and clubs land.' },
  { qty: '50+', what: 'Programme pricing, with delivery usually included. Talk to us before you budget.' },
];
