import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ctrlzstudio.pl',
  // Vercel ma trailingSlash: false — sitemap i canonical muszą to odzwierciedlać,
  // inaczej Google dostaje adresy, które przekierowują.
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Strony oznaczone noindex nie mają czego szukać w mapie witryny —
      // wysyłanie ich do Google to sprzeczny sygnał.
      filter: (page) =>
        !['/polityka-prywatnosci', '/dziekujemy'].some((p) =>
          page.replace('https://ctrlzstudio.pl', '').replace(/\/$/, '') === p
        ),
      serialize: (item) => ({
        ...item,
        // usuwamy końcowy slash wszędzie poza stroną główną
        url: item.url === 'https://ctrlzstudio.pl/' ? item.url : item.url.replace(/\/$/, ''),
      }),
    }),
  ],
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