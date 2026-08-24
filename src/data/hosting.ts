/**
 * PROGRAM PARTNERSKI — HOSTING
 * ════════════════════════════
 * Jedno źródło prawdy dla kodu rabatowego, linku afiliacyjnego I CEN.
 * Zmiana TYLKO tutaj — komponent HostingPromo.astro oraz wszystkie
 * podstrony i wpisy, które podają widełki hostingu, zaktualizują się same.
 *
 * UWAGA: ceny promocyjne dostawców zmieniają się sezonowo. Jeśli mijają
 * kolejne miesiące, warto sprawdzić, czy poniższe liczby są nadal aktualne —
 * nieaktualny cennik na stronie szkodzi bardziej, niż pomaga.
 * Ostatnia weryfikacja: sierpień 2026.
 */

export const HOSTING = {
  dostawca: 'LH.pl',
  kod: 'LH-CtrlZ',
  rabat: '20%',
  link: 'https://www.lh.pl/hosting?ref=karoljasiowka48',

  /** Widełki pakietów od najmniejszego (5 GB) do największego (100 GB). */
  ceny: {
    pierwszyRokOd: 50,
    pierwszyRokDo: 100,
    odnowienieOd: 199,
    odnowienieDo: 599,
  },
} as const;

const zl = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;

/** „50–100 zł" */
export const hostingPierwszyRok = () =>
  `${HOSTING.ceny.pierwszyRokOd}–${zl(HOSTING.ceny.pierwszyRokDo)}`;

/** „199–599 zł" */
export const hostingOdnowienie = () =>
  `${HOSTING.ceny.odnowienieOd}–${zl(HOSTING.ceny.odnowienieDo)}`;

/** Pełne zdanie do sekcji o kosztach — używane w kilku miejscach. */
export const hostingKoszt = () =>
  `U dostawcy, z którym współpracujemy (${HOSTING.dostawca}), pakiety kosztują ` +
  `${hostingPierwszyRok()} w pierwszym roku i ${hostingOdnowienie()} przy odnowieniu — ` +
  `zależnie od wielkości pakietu, od 5 GB do 100 GB. Z naszym kodem ${HOSTING.kod} dochodzi ${HOSTING.rabat} rabatu.`;
