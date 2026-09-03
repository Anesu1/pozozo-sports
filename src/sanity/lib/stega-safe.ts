import { stegaClean } from 'next-sanity';
import { BrandMeta, SportMeta } from '@/types';

// sport.bg/fg/dim/line and brand.bg/fg/accent are plain hex-color strings
// rendered directly as inline CSS (style={{ background: s.bg }}), not as
// visible text. Unlike colors[].hex or storeConfig.email, their field names
// aren't on Sanity's stega-encoding denylist, so in a draft-mode preview
// they could come back with invisible stega characters appended — which
// would make the CSS value invalid and silently drop the style. Cleaning
// them here is the officially recommended defensive pattern for any value
// used in a non-text context.

export function cleanSportColors(sport: SportMeta): SportMeta {
  return {
    ...sport,
    bg: stegaClean(sport.bg),
    fg: stegaClean(sport.fg),
    dim: stegaClean(sport.dim),
    line: stegaClean(sport.line),
  };
}

export function cleanBrandColors(brand: BrandMeta): BrandMeta {
  return {
    ...brand,
    bg: stegaClean(brand.bg),
    fg: stegaClean(brand.fg),
    accent: stegaClean(brand.accent),
  };
}
