/**
 * JEDNO ŹRÓDŁO PRAWDY DLA CEN
 * ═══════════════════════════
 *
 * Wartości muszą być zgodne z kalkulatorem (`src/pages/kalkulator.astro`).
 * Jeśli zmieniasz cennik — zmień go TUTAJ i w kalkulatorze, a wszystkie
 * sekcje FAQ na stronie głównej i podstronach lokalnych zaktualizują się same.
 *
 * (Kalkulator trzyma swoje liczby osobno, bo część z nich siedzi w skrypcie
 * klienckim i w etykietach suwaków. Docelowo warto go podpiąć pod ten plik.)
 */

export const PRICING = {
  landing: 2000,
  firmowa: { from: 4000, tier2: 5500, tier3: 6800 },
  sklep: { from: 8000, tier2: 11000, tier3: 15000 },
  custom: 12000,
  techSurcharge: '+60%',
  addons: {
    seoBasic: 1500,
    seoAdvanced: 3000,
    copywriting: 800,
    integrations: 1200,
    cmsTraining: 500,
    maintenanceMonthly: 350,
  },
} as const;

// Nie używamy toLocaleString — środowisko budowania nie zawsze ma dane lokalizacji
// dla pl-PL i wtedy wychodzi „2000 zł" zamiast „2 000 zł". Formatujemy ręcznie,
// spacją nierozdzielającą, tak jak w kalkulatorze.
const zl = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;

/** Pełna odpowiedź cenowa do sekcji FAQ. */
export function priceAnswer(city?: string): string {
  const where = city ? ` dla firmy z ${city}` : '';
  return (
    `Liczymy według tego samego cennika, co kalkulator wyceny na stronie${where}: ` +
    `landing page lub wizytówka od ${zl(PRICING.landing)}, ` +
    `strona firmowa z CMS od ${zl(PRICING.firmowa.from)} ` +
    `(4–8 podstron ${zl(PRICING.firmowa.tier2)}, 9–15 podstron ${zl(PRICING.firmowa.tier3)}), ` +
    `sklep WooCommerce od ${zl(PRICING.sklep.from)}, ` +
    `dedykowana aplikacja lub konfigurator od ${zl(PRICING.custom)}. ` +
    `Strona pisana w Astro albo Next.js zamiast WordPressa to ${PRICING.techSurcharge} do wyceny — ` +
    `w zamian dostajecie wyraźnie szybszą i tańszą w utrzymaniu stronę. ` +
    `Wycena jest wiążąca i podajemy ją przed startem, bez faktur za „prace dodatkowe" na końcu.`
  );
}

/** Odpowiedź o dodatkach do sekcji FAQ. */
export function addonsAnswer(): string {
  const a = PRICING.addons;
  return (
    `Do każdego projektu można dobrać: SEO podstawowe +${zl(a.seoBasic)}, ` +
    `SEO zaawansowane +${zl(a.seoAdvanced)}, copywriting +${zl(a.copywriting)}, ` +
    `integracje z CRM lub API +${zl(a.integrations)}, szkolenie z obsługi CMS +${zl(a.cmsTraining)}, ` +
    `opieka techniczna ${zl(a.maintenanceMonthly)} miesięcznie. ` +
    `Nic z tego nie jest obowiązkowe — doradzamy, co w Waszym przypadku ma sens, a co nie.`
  );
}
