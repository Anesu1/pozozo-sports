export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQS: FaqEntry[] = [
  {
    q: 'Can I pay on the website?',
    a: "No, and that's deliberate. You send an enquiry, we quote, and you pay on collection, on delivery, or by invoice if you're an institution. Nothing is charged here and we never ask for card details.",
  },
  {
    q: "Why aren't prices shown?",
    a: "Ball prices move with the exchange rate and with quantity. Publishing a number we can't hold helps nobody, so we quote instead — usually within the hour during working hours.",
  },
  {
    q: 'How do I know the stock is genuine?',
    a: "We buy through proper channels and can show you where a ball came from. If you have a ball you're unsure about, send us a photo of the valve area and the printing and we'll tell you straight.",
  },
  {
    q: 'Do you invoice schools and institutions?',
    a: 'Yes. We issue a formal quotation for approval, hold the stock against it, then invoice and deliver with a delivery note for your file.',
  },
  {
    q: 'What counts as bulk?',
    a: "Ten balls or more, and they don't have to be the same ball. Mixed orders across sports are normal — one quote covers the lot.",
  },
  {
    q: 'Do you deliver outside the city?',
    a: 'Yes, nationwide by courier or bus depending on size and destination. The cost is confirmed in your quote before you commit.',
  },
  {
    q: 'What if a ball is faulty?',
    a: "Manufacturing faults are covered — tell us within a reasonable time, send a photo, and we'll replace it. Wear from playing on the wrong surface isn't a fault, which is why the care guide exists.",
  },
];
