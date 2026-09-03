import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { NextRequest } from 'next/server';

import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/env';

export async function GET(request: NextRequest) {
  if (!token) {
    console.error(
      '[Draft Mode] Error: Missing server token. Neither EDIT_SANITY_TOKEN nor SANITY_API_READ_TOKEN is set in the runtime environment.'
    );
    return new Response(
      'Draft Mode Error: Missing Sanity server token. Ensure EDIT_SANITY_TOKEN or SANITY_API_READ_TOKEN is set in your Netlify Environment Variables with "Functions" scope.',
      { status: 500, headers: { 'content-type': 'text/plain' } }
    );
  }

  try {
    const handler = defineEnableDraftMode({
      client: client.withConfig({ token }),
    });
    return await handler.GET(request);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Draft Mode] Error enabling draft mode:', error);
    return new Response(`Draft Mode Error: ${message}`, {
      status: 500,
      headers: { 'content-type': 'text/plain' },
    });
  }
}
