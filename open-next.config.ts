import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// No ISR/revalidate usage in this app (all product/sport/brand/journal pages
// are pure SSG via generateStaticParams, everything else is server-rendered
// per-request against live Sanity data) — default in-memory cache is enough,
// no need for the R2-backed incremental cache override.
export default defineCloudflareConfig();
