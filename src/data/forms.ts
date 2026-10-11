/**
 * Zgłoszenia lecą prosto do panelu CtrlZ Hub (`POST /api/formularz`, etap 9).
 * Adres nadpisujemy zmienną `PUBLIC_FORM_ENDPOINT` w `.env` — lokalnie wskazuje panel na porcie 3100,
 * na produkcji panel na własnej subdomenie. Gdy panel nie odpowie w `FORM_TIMEOUT_MS`,
 * `submitForm` przechodzi na wariant awaryjny `mailto:` (patrz src/utils/formSubmit.ts).
 */
export const FORM_ENDPOINT =
  import.meta.env.PUBLIC_FORM_ENDPOINT ?? 'https://hub.ctrlzstudio.pl/api/formularz';

/** Po tylu ms uznajemy, że endpoint nie odpowiada, i przechodzimy na mailto. */
export const FORM_TIMEOUT_MS = 12000;

/** Ukryte pole-pułapka na boty. Musi być identyczne w każdym formularzu. */
export const HONEYPOT_NAME = '_gotcha';

/**
 * Anonimowy rejestr zgód cookies w panelu (`POST /api/zgody`) — ten sam panel co formularze, więc adres liczymy
 * z `FORM_ENDPOINT`. Baner wysyła tam wybór bez danych osobowych (src/components/CookieConsent.astro).
 */
export const CONSENT_ENDPOINT = FORM_ENDPOINT.replace(/\/api\/formularz\/?$/, '/api/zgody');
