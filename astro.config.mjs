import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ctrlzstudio.pl',
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
