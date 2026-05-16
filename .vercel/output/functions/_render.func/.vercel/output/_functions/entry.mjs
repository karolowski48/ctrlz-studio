import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BXJtM43t.mjs';
import { manifest } from './manifest_BXWk_K8P.mjs';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/blog/branding-dla-malej-firmy.astro.mjs');
const _page4 = () => import('./pages/blog/dlaczego-szybka-strona-sprzedaje.astro.mjs');
const _page5 = () => import('./pages/blog/seo-2025.astro.mjs');
const _page6 = () => import('./pages/blog/ux-ktory-konwertuje.astro.mjs');
const _page7 = () => import('./pages/blog/woocommerce-optymalizacja.astro.mjs');
const _page8 = () => import('./pages/blog/wordpress-vs-custom.astro.mjs');
const _page9 = () => import('./pages/blog.astro.mjs');
const _page10 = () => import('./pages/dziekujemy.astro.mjs');
const _page11 = () => import('./pages/kalkulator.astro.mjs');
const _page12 = () => import('./pages/o-nas.astro.mjs');
const _page13 = () => import('./pages/polityka-prywatnosci.astro.mjs');
const _page14 = () => import('./pages/realizacje/eduinspirations.astro.mjs');
const _page15 = () => import('./pages/realizacje/fine-dining.astro.mjs');
const _page16 = () => import('./pages/realizacje/kancelaria-prawna.astro.mjs');
const _page17 = () => import('./pages/realizacje/konfigurator.astro.mjs');
const _page18 = () => import('./pages/realizacje/modeka.astro.mjs');
const _page19 = () => import('./pages/realizacje/sklep-modowy.astro.mjs');
const _page20 = () => import('./pages/realizacje/sklep-sportowy.astro.mjs');
const _page21 = () => import('./pages/realizacje/startup-saas.astro.mjs');
const _page22 = () => import('./pages/realizacje/techopiekun.astro.mjs');
const _page23 = () => import('./pages/realizacje.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/blog/branding-dla-malej-firmy.astro", _page3],
    ["src/pages/blog/dlaczego-szybka-strona-sprzedaje.astro", _page4],
    ["src/pages/blog/seo-2025.astro", _page5],
    ["src/pages/blog/ux-ktory-konwertuje.astro", _page6],
    ["src/pages/blog/woocommerce-optymalizacja.astro", _page7],
    ["src/pages/blog/wordpress-vs-custom.astro", _page8],
    ["src/pages/blog.astro", _page9],
    ["src/pages/dziekujemy.astro", _page10],
    ["src/pages/kalkulator.astro", _page11],
    ["src/pages/o-nas.astro", _page12],
    ["src/pages/polityka-prywatnosci.astro", _page13],
    ["src/pages/realizacje/eduinspirations.astro", _page14],
    ["src/pages/realizacje/fine-dining.astro", _page15],
    ["src/pages/realizacje/kancelaria-prawna.astro", _page16],
    ["src/pages/realizacje/konfigurator.astro", _page17],
    ["src/pages/realizacje/modeka.astro", _page18],
    ["src/pages/realizacje/sklep-modowy.astro", _page19],
    ["src/pages/realizacje/sklep-sportowy.astro", _page20],
    ["src/pages/realizacje/startup-saas.astro", _page21],
    ["src/pages/realizacje/techopiekun.astro", _page22],
    ["src/pages/realizacje.astro", _page23],
    ["src/pages/index.astro", _page24]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "9db01724-872b-47ac-ba42-6822c1850390",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
