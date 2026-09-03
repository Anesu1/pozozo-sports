import { Metadata } from 'next';
import { WishlistPageClient } from './WishlistPageClient';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved Pozozo Sports balls.',
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
