/**
 * MAPA OBRAZÓW REALIZACJI
 * ═══════════════════════
 *
 * Zdjęcia leżą w `src/assets/`, a NIE w `public/`. To celowe: obrazy z `src/`
 * przechodzą przez optymalizator Astro, który podczas builda generuje
 * kilka wariantów rozmiarowych i wstawia `srcset`. Przeglądarka pobiera wtedy
 * wersję dopasowaną do ekranu — telefon nie ściąga pliku 1280 px, żeby
 * wyświetlić go na 380 px.
 *
 * Pliki w `public/` są kopiowane bez zmian i tej optymalizacji nie dostają.
 * Dlatego w `public/` zostaje tylko to, co musi mieć stały adres:
 * favicon, robots.txt i obraz og: (używany w meta tagach jako pełny URL).
 *
 * DODAJESZ NOWĄ REALIZACJĘ?
 * Wrzuć zdjęcie do `src/assets/` — mapa poniżej zbuduje się sama.
 * W danych realizacji podaj nazwę pliku, np. img: 'modeka-hero.webp'.
 */

import type { ImageMetadata } from 'astro';

const files = import.meta.glob('../assets/*.{webp,jpg,jpeg,png}', {
  eager: true,
}) as Record<string, { default: ImageMetadata }>;

/** klucz = sama nazwa pliku, np. "modeka-hero.webp" */
export const IMAGES: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default])
);

/**
 * Znajduje obraz po nazwie pliku. Przyjmuje też starą formę ze slashem
 * ("/modeka-hero.webp"), żeby nie trzeba było przepisywać wszystkich podstron.
 * Zwraca undefined, gdy pliku nie ma — wtedy komponent pokazuje samo tło.
 */
export function img(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  return IMAGES[name.replace(/^\//, '')];
}
