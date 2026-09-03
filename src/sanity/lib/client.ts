import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

// No token here on purpose — this client only ever reads published,
// public content, so it's safe to import from Client Components too
// (e.g. SearchModal fetching directly in the browser).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: '/studio',
  },
});
