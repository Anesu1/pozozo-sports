import { defineLive } from 'next-sanity/live';

import { client } from './client';
import { token } from '../env';

// Draft-mode-aware, stega-aware fetch used by every Server Component page.
// Falls back to the public CDN client (no live updates, no stega) when
// there's no token — the site should never hard-fail just because the
// preview credential is missing.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN || false,
});
