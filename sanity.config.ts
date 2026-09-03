import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { colorInput } from '@sanity/color-input';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';
import { resolve } from './src/sanity/presentation/resolve';

const previewUrl =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
      process.env.SANITY_STUDIO_PREVIEW_URL ||
      'https://sp2clogistics.com';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    // Presentation listed first so it's the default tool when opening /studio
    // — the click-to-edit visual editor, not the plain document list.
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewUrl,
        previewMode: { enable: '/api/draft-mode/enable' },
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  ],
});
