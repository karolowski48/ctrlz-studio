import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ctrlzstudio.pl',
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
      cssCodeSplit: true,
      minify: 'esbuild',
    },
  },
});