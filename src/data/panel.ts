/**
 * TREŚCI Z PANELU CtrlZ Hub (etap 9, krok 3)
 * ══════════════════════════════════════════
 * Dane pobiera `scripts/pobierz-z-panelu.mjs` przed budowaniem strony i zapisuje
 * do `panel-export.json`. Ten moduł tylko je czyta i scala z plikami w repo.
 *
 * ZASADA PIERWSZEŃSTWA: wygrywa panel. Wpis albo realizacja o tym samym adresie
 * (`slug`) bierze treść z panelu, a plik w `src/pages/**` zostaje jako zapas —
 * dzięki temu strona buduje się także wtedy, gdy panel jest wyłączony.
 *
 * Obrazy z panelu leżą w `public/panel-media/<id>.webp`, więc w treści podmieniamy
 * adresy `/api/strona/media/<id>` na `/panel-media/<id>.webp`.
 */
import exported from './panel-export.json';
import { posts as filePosts, type Post } from './posts';
import { PROJECTS as fileProjects, type Project } from './projects';

export type PanelPost = {
  slug: string; title: string; metaTitle: string | null; description: string; excerpt: string; cat: string;
  time: string; date: string; publishAt: string; featured: boolean; bg: string; glowColor: string;
  coverMediaId: string | null; bodyHtml: string; schemaJson: string | null;
};

export type PanelProject = {
  slug: string; name: string; title: string; description: string; city: string; tag: string; pill1: string; pill2: string;
  cat: string; year: string; tags: string[]; result: string; bgClass: string; glowClass: string; glowColor: string;
  heroMediaId: string | null; desc: string; featured: boolean; sortOrder: number;
  results: { value: string; label: string }[]; prevSlug: string | null; nextSlug: string | null;
  publishAt: string; bodyHtml: string; schemaJson: string | null;
};

type PanelExport = {
  version: number;
  generatedAt: string | null;
  posts: PanelPost[];
  projects: PanelProject[];
  media: { id: string; width: number; height: number; alt: string }[];
};

const data = exported as unknown as PanelExport;

export const PANEL_POSTS: PanelPost[] = data.posts ?? [];
export const PANEL_PROJECTS: PanelProject[] = data.projects ?? [];
export const PANEL_MEDIA = data.media ?? [];

/** Adres obrazu pobranego z panelu; `null` dla pustego identyfikatora. */
export function panelMedia(id: string | null | undefined): string | null {
  return id ? `/panel-media/${id}.webp` : null;
}

/** Treść z panelu: adresy obrazów wskazują na pliki pobrane obok strony. */
/**
 * JSON-LD do `<script type="application/ld+json" set:html>`: postać kanoniczna z `<`, `>`, `&`,
 * U+2028 i U+2029 jako `\\uXXXX`, żeby `</script>` w danych nie zamknął znacznika. Panel robi to samo
 * przy eksporcie — tu obrona w głąb. Błędny JSON = brak znacznika.
 */
export function panelJsonLd(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed !== 'object' || parsed === null) return null;
    return JSON.stringify(parsed).replace(/[<>&\u2028\u2029]/g, (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);
  } catch {
    return null;
  }
}

export function panelBody(html: string): string {
  return html.replace(/\/api\/strona\/media\/([a-z0-9]+)/g, '/panel-media/$1.webp');
}

const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

/** „22 września 2026” → liczba do sortowania (pliki nie mają daty ISO). */
function polishDateValue(date: string): number {
  const m = /^(\d{1,2})\s+(\p{L}+)\s+(\d{4})$/u.exec(date.trim());
  if (!m) return 0;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  return month < 0 ? 0 : new Date(Number(m[3]), month, Number(m[1])).getTime();
}

/** Wpis z panelu w kształcie, którego używają listy na stronie. */
function toPostCard(post: PanelPost): Post {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    cat: post.cat,
    time: post.time,
    date: post.date,
    featured: post.featured,
    bg: post.bg,
    glowColor: post.glowColor,
  };
}

/** Realizacja z panelu w kształcie kafelka na liście. */
function toProjectCard(project: PanelProject): Project {
  return {
    slug: project.slug,
    city: project.city,
    name: project.name,
    tag: project.tag,
    pill1: project.pill1,
    pill2: project.pill2,
    featured: project.featured,
    bg: project.bgClass,
    glow: project.glowClass,
    img: project.heroMediaId ? `panel:${project.heroMediaId}` : '',
    desc: project.desc,
  };
}

/** Wpisy do list: panel + pliki (bez duplikatów), od najnowszego. */
export const ALL_POSTS: Post[] = (() => {
  const fromPanel = PANEL_POSTS.map(toPostCard);
  const panelSlugs = new Set(fromPanel.map((p) => p.slug));
  const merged = [...fromPanel, ...filePosts.filter((p) => !panelSlugs.has(p.slug))];
  return merged.sort((a, b) => polishDateValue(b.date) - polishDateValue(a.date));
})();

/** Realizacje do list: panel + pliki (bez duplikatów), w kolejności z panelu, potem z pliku. */
export const ALL_PROJECTS: Project[] = (() => {
  const fromPanel = [...PANEL_PROJECTS].sort((a, b) => a.sortOrder - b.sortOrder).map(toProjectCard);
  const panelSlugs = new Set(fromPanel.map((p) => p.slug));
  return [...fromPanel, ...fileProjects.filter((p) => !panelSlugs.has(p.slug))];
})();
