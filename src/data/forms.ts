/**
 * KONFIGURACJA FORMULARZY
 * ═══════════════════════
 * Jedno miejsce z adresem endpointu. Po wdrożeniu Workera podmień URL poniżej
 * na ten, który zwróci `npx wrangler deploy` (albo na własną subdomenę,
 * jeśli podepniesz np. form.ctrlzstudio.pl w panelu Cloudflare).
 *
 * Kod Workera leży w `worker/` — instrukcja wdrożenia w `worker/README.md`.
 */

export const FORM_ENDPOINT = 'https://ctrlz-forms.ctrlzstudio.workers.dev';

/** Po tylu ms uznajemy, że endpoint nie odpowiada, i przechodzimy na mailto. */
export const FORM_TIMEOUT_MS = 12000;

/** Ukryte pole-pułapka na boty. Musi być identyczne w każdym formularzu. */
export const HONEYPOT_NAME = '_gotcha';
