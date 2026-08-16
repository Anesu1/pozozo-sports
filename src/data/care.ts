export interface CareTip {
  n: string;
  title: string;
  body: string;
}

export const CARE: CareTip[] = [
  {
    n: '01',
    title: 'Inflate to the pressure printed on the ball',
    body: 'Every ball carries its own recommended range near the valve. Guessing by feel is how balls get over-inflated, and an over-inflated ball splits at the seam long before it wears out.',
  },
  {
    n: '02',
    title: 'Wet the needle before it goes in',
    body: 'A dry needle tears the valve. Water or a drop of valve oil is enough, and the ball keeps its air for months instead of weeks.',
  },
  {
    n: '03',
    title: 'Check pressure weekly, not seasonally',
    body: 'All balls lose air slowly. A weekly check with a gauge takes a minute across a whole kit bag and is the single biggest thing you can do for ball life.',
  },
  {
    n: '04',
    title: 'Keep leather off tarmac',
    body: 'Indoor leather on an outdoor court is finished in a term. Use rubber or composite outdoors and save the leather for the hall.',
  },
  {
    n: '05',
    title: 'Store part-deflated, out of the sun',
    body: 'For long breaks let a little air out and keep them somewhere cool and dark. Heat and full pressure together stretch the panels.',
  },
];
