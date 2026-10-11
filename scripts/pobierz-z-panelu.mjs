/**
 * POBRANIE TREŚCI Z PANELU CtrlZ Hub (etap 9, krok 3)
 * ═══════════════════════════════════════════════════
 * Uruchamiane przed `astro build` (i ręcznie: `npm run tresci`).
 *
 * Zapisuje:
 *   src/data/panel-export.json   — wpisy, realizacje i cennik z panelu
 *   public/panel-media/<id>.webp — obrazy użyte w tych treściach
 *
 * Konfiguracja (plik `.env` w katalogu strony albo zmienne środowiska):
 *   PANEL_EXPORT_URL    — domyślnie http://localhost:3100/api/strona/eksport
 *   PANEL_EXPORT_SECRET — ten sam sekret co SITE_EXPORT_SECRET w panelu
 *
 * ZASADA: build nigdy nie pada przez panel. Gdy panelu nie ma, sekret jest pusty
 * albo odpowiedź jest błędna, zostawiamy poprzedni plik JSON (a gdy go nie ma —
 * pusty eksport) i piszemy ostrzeżenie. Strona zbuduje się wtedy z plików w repo.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_JSON = path.join(ROOT, 'src', 'data', 'panel-export.json');
const OUT_MEDIA = path.join(ROOT, 'public', 'panel-media');
const TIMEOUT_MS = 20_000;

const EMPTY = { version: 0, generatedAt: null, posts: [], projects: [], pricing: null, media: [] };

/** Wczytuje `.env` z katalogu strony — bez dodatkowej zależności. */
async function readEnvFile() {
  try {
    const text = await readFile(path.join(ROOT, '.env'), 'utf8');
    for (const line of text.split('\n')) {
      const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    // brak pliku .env to normalna sytuacja (np. na serwerze budującym)
  }
}

async function keepPrevious(reason) {
  let previous = EMPTY;
  try {
    previous = JSON.parse(await readFile(OUT_JSON, 'utf8'));
    console.warn(`[panel] ${reason} — zostawiam poprzednie treści (${previous.posts.length} wpisów, ${previous.projects.length} realizacji).`);
    return;
  } catch {
    await writeFile(OUT_JSON, JSON.stringify(EMPTY, null, 2));
    console.warn(`[panel] ${reason} — buduję stronę wyłącznie z plików w repo.`);
  }
}

async function main() {
  await readEnvFile();
  const url = process.env.PANEL_EXPORT_URL ?? 'http://localhost:3100/api/strona/eksport';
  const secret = (process.env.PANEL_EXPORT_SECRET ?? '').trim();

  if (secret.length < 32) {
    await keepPrevious('Brak PANEL_EXPORT_SECRET (albo krótszy niż 32 znaki)');
    return;
  }

  let data;
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${secret}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      await keepPrevious(`Panel odpowiedział HTTP ${response.status}`);
      return;
    }
    data = await response.json();
  } catch (error) {
    await keepPrevious(`Panel nieosiągalny (${error instanceof Error ? error.message : 'błąd sieci'})`);
    return;
  }

  if (!Array.isArray(data?.posts) || !Array.isArray(data?.projects)) {
    await keepPrevious('Odpowiedź panelu nie wygląda jak eksport treści');
    return;
  }

  await writeFile(OUT_JSON, JSON.stringify(data, null, 2));

  // Obrazy: pobieramy tylko te, do których odwołują się treści albo miniatury
  const used = new Set();
  for (const post of data.posts) {
    if (post.coverMediaId) used.add(post.coverMediaId);
    for (const m of String(post.bodyHtml ?? '').matchAll(/\/api\/strona\/media\/([a-z0-9]+)/g)) used.add(m[1]);
  }
  for (const project of data.projects) {
    if (project.heroMediaId) used.add(project.heroMediaId);
    for (const m of String(project.bodyHtml ?? '').matchAll(/\/api\/strona\/media\/([a-z0-9]+)/g)) used.add(m[1]);
  }

  await mkdir(OUT_MEDIA, { recursive: true });
  let downloaded = 0;
  for (const id of used) {
    const target = path.join(OUT_MEDIA, `${id}.webp`);
    try {
      const response = await fetch(`${url}/media/${id}`, {
        headers: { Authorization: `Bearer ${secret}` },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!response.ok) {
        console.warn(`[panel] Obraz ${id}: HTTP ${response.status} — pomijam.`);
        continue;
      }
      await writeFile(target, Buffer.from(await response.arrayBuffer()));
      downloaded += 1;
    } catch (error) {
      console.warn(`[panel] Obraz ${id}: ${error instanceof Error ? error.message : 'błąd pobierania'} — pomijam.`);
    }
  }

  console.log(`[panel] Pobrano ${data.posts.length} wpisów, ${data.projects.length} realizacji i ${downloaded} obrazów.`);
}

main().catch((error) => {
  console.error('[panel] Nieoczekiwany błąd pobierania treści:', error);
  process.exitCode = 0; // build ma iść dalej na plikach z repo
});
