/**
 * CtrlZ Studio — endpoint formularzy kontaktowych
 * ══════════════════════════════════════════════
 *
 * Cloudflare Worker przyjmujący zgłoszenia ze wszystkich formularzy w serwisie
 * i wysyłający dwie wiadomości przez Resend:
 *   1. powiadomienie do CtrlZ Studio (z Reply-To ustawionym na klienta),
 *   2. automatyczne potwierdzenie do klienta.
 *
 * DLACZEGO WŁASNY ENDPOINT, A NIE GOTOWIEC:
 * Darmowe plany Web3Forms/Formspree narzucają własny layout maila i własny
 * branding. Tutaj cały HTML obu wiadomości jest nasz — a ponieważ to samo
 * rozwiązanie wdrażamy potem u klientów, kontrola nad wyglądem i treścią
 * automatycznej odpowiedzi jest częścią oferty, nie szczegółem.
 *
 * ZMIENNE ŚRODOWISKOWE (ustawiane w panelu Cloudflare albo `wrangler secret put`):
 *   RESEND_API_KEY  — klucz API z resend.com                    [SEKRET]
 *   MAIL_TO         — adres, na który mają iść zgłoszenia
 *   MAIL_FROM       — nadawca, np. "CtrlZ Studio <formularz@ctrlzstudio.pl>"
 *                     domena MUSI być zweryfikowana w Resend (SPF + DKIM)
 *
 * BEZPIECZEŃSTWO:
 *   - lista dozwolonych źródeł (CORS) — endpoint nie odpowie obcej stronie,
 *   - honeypot `_gotcha` — pole niewidoczne dla ludzi, wypełniane przez boty;
 *     przy trafieniu udajemy sukces, żeby bot nie próbował ponownie,
 *   - limity długości pól — ochrona przed wpychaniem ładunku w treść maila,
 *   - żadne dane nie są nigdzie zapisywane; Worker jest bezstanowy.
 *
 * Jeśli spam kiedyś przebije honeypot, następnym krokiem jest Cloudflare
 * Turnstile (darmowy) — dokładamy jedno pole i jedną weryfikację poniżej.
 */

const ALLOWED_ORIGINS = [
  'https://ctrlzstudio.pl',
  'https://www.ctrlzstudio.pl',
  'http://localhost:4321',
  'http://localhost:4322',
];

/** Ludzkie nazwy formularzy — używane w tytule maila. */
const FORM_NAMES = {
  'kontakt': 'Formularz kontaktowy',
  'strona-glowna': 'Formularz na stronie głównej',
  'kalkulator': 'Kalkulator wyceny',
  'bezplatny-audyt': 'Zamówienie bezpłatnego audytu',
};

/** Etykiety pól w mailu — kolejność ma znaczenie, tak wyświetlamy tabelę. */
const FIELD_LABELS = {
  name: 'Imię i nazwisko',
  company: 'Firma',
  email: 'E-mail',
  phone: 'Telefon',
  url: 'Adres strony',
  branza: 'Branża',
  service: 'Usługa',
  quote: 'Wycena z kalkulatora',
  message: 'Wiadomość',
  problem: 'Co uwiera na obecnej stronie',
};

const LIMITS = { short: 200, message: 5000 };

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

/** Ucina i czyści wartość pola. Nigdy nie wstawiamy surowego wejścia do HTML. */
function clean(value, max) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(s);
}

/* ────────────────────────────────────────────────────────────────
   SZABLONY MAILI — w całości nasze, bez cudzego brandingu
   ──────────────────────────────────────────────────────────────── */

const BRAND = {
  bg: '#0a0a12',
  card: '#12121f',
  border: '#26263a',
  text: '#e8e8f0',
  muted: '#9a9ab0',
  violet: '#7c6bff',
  violetLight: '#c4b5fd',
};

function shell(inner) {
  return `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
        <tr><td style="padding:26px 32px;border-bottom:1px solid ${BRAND.border};">
          <span style="font-size:19px;font-weight:800;color:#fff;letter-spacing:-.02em;">Ctrl<span style="color:${BRAND.violet};">Z</span> Studio</span>
        </td></tr>
        ${inner}
        <tr><td style="padding:20px 32px;border-top:1px solid ${BRAND.border};">
          <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.6;">
            CtrlZ Studio · ul. Dworska 40a, 34-144 Izdebnik · NIP 5512672426<br>
            <a href="https://ctrlzstudio.pl" style="color:${BRAND.violetLight};text-decoration:none;">ctrlzstudio.pl</a> ·
            <a href="tel:+48575043985" style="color:${BRAND.violetLight};text-decoration:none;">+48 575 043 985</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/** Mail do nas — ma być gęsty i skanowalny, bez ozdobników. */
function notificationHtml(formId, fields, meta) {
  const rows = Object.keys(FIELD_LABELS)
    .filter((k) => fields[k])
    .map((k) => {
      const isLong = k === 'message' || k === 'problem';
      const val = escapeHtml(fields[k]).replace(/\n/g, '<br>');
      return `<tr>
        <td style="padding:10px 0;vertical-align:top;width:150px;font-size:13px;color:${BRAND.muted};">${FIELD_LABELS[k]}</td>
        <td style="padding:10px 0;vertical-align:top;font-size:${isLong ? '14' : '15'}px;color:${BRAND.text};line-height:1.65;">${val}</td>
      </tr>`;
    })
    .join('');

  return shell(`
    <tr><td style="padding:28px 32px 8px;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.violetLight};">Nowe zapytanie</p>
      <h1 style="margin:0 0 20px;font-size:21px;color:#fff;font-weight:700;letter-spacing:-.02em;">${escapeHtml(FORM_NAMES[formId] || 'Formularz')}</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>
    <tr><td style="padding:16px 32px 28px;">
      <a href="mailto:${escapeHtml(fields.email)}" style="display:inline-block;background:${BRAND.violet};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:10px;">Odpowiedz klientowi</a>
      <p style="margin:16px 0 0;font-size:12px;color:${BRAND.muted};line-height:1.6;">
        Wysłano z: ${escapeHtml(meta.page || '—')}<br>
        ${escapeHtml(meta.date)}
      </p>
    </td></tr>
  `);
}

/** Automatyczne potwierdzenie dla klienta — ton ten sam co na stronie. */
function autoreplyHtml(fields) {
  const firstName = escapeHtml((fields.name || '').split(' ')[0] || '');
  return shell(`
    <tr><td style="padding:28px 32px 8px;">
      <h1 style="margin:0 0 16px;font-size:22px;color:#fff;font-weight:700;letter-spacing:-.02em;">
        ${firstName ? `${firstName}, dziękujemy` : 'Dziękujemy'} — wiadomość dotarła
      </h1>
      <p style="margin:0 0 14px;font-size:15px;color:${BRAND.text};line-height:1.75;">
        Odpowiadamy zwykle tego samego dnia roboczego, najpóźniej w ciągu 24 godzin.
        Jeśli sprawa jest pilna, najszybciej złapiesz nas pod numerem
        <a href="tel:+48575043985" style="color:${BRAND.violetLight};text-decoration:none;">+48 575 043 985</a>.
      </p>
      <p style="margin:0 0 20px;font-size:15px;color:${BRAND.text};line-height:1.75;">
        Poniżej kopia tego, co do nas trafiło — gdybyś chciał coś dopowiedzieć,
        wystarczy odpowiedzieć na tę wiadomość.
      </p>
    </td></tr>
    <tr><td style="padding:0 32px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(124,107,255,.06);border:1px solid ${BRAND.border};border-radius:12px;">
        <tr><td style="padding:18px 20px;">
          <p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.7;white-space:pre-wrap;">${escapeHtml(fields.message || fields.problem || fields.url || '(bez treści wiadomości)')}</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;">
      <p style="margin:0 0 10px;font-size:13px;color:${BRAND.muted};line-height:1.7;">W międzyczasie możesz zobaczyć:</p>
      <p style="margin:0;font-size:14px;line-height:1.9;">
        <a href="https://ctrlzstudio.pl/realizacje" style="color:${BRAND.violetLight};text-decoration:none;">nasze realizacje</a><br>
        <a href="https://ctrlzstudio.pl/jak-pracujemy" style="color:${BRAND.violetLight};text-decoration:none;">jak wygląda współpraca krok po kroku</a><br>
        <a href="https://ctrlzstudio.pl/bezplatny-audyt" style="color:${BRAND.violetLight};text-decoration:none;">bezpłatny audyt strony</a>
      </p>
    </td></tr>
  `);
}

/* ────────────────────────────────────────────────────────────────
   WYSYŁKA
   ──────────────────────────────────────────────────────────────── */

async function sendMail(env, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, origin);
    }
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return json({ ok: false, error: 'forbidden_origin' }, 403, origin);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: 'bad_json' }, 400, origin);
    }

    // Honeypot — bot wypełnił ukryte pole. Odpowiadamy sukcesem,
    // żeby nie dawać mu sygnału, że filtr zadziałał.
    if (clean(data._gotcha, 50)) {
      return json({ ok: true }, 200, origin);
    }

    const formId = clean(data.formId, 40) || 'kontakt';
    const fields = {};
    for (const key of Object.keys(FIELD_LABELS)) {
      const max = key === 'message' ? LIMITS.message : LIMITS.short;
      const v = clean(data[key], max);
      if (v) fields[key] = v;
    }

    // E-mail jest jedynym polem wymaganym zawsze — bez niego nie ma jak odpowiedzieć.
    // Imienia nie wymagamy, bo formularz bezpłatnego audytu prosi tylko o adres
    // strony i e-mail; wymuszanie go blokowałoby poprawne zgłoszenia.
    if (!fields.email || !isEmail(fields.email)) {
      return json({ ok: false, error: 'invalid_email' }, 422, origin);
    }

    const meta = {
      page: clean(data.page, 300),
      date: new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' }),
    };

    try {
      // 1. Powiadomienie do nas — Reply-To na klienta, żeby odpowiadać jednym kliknięciem.
      await sendMail(env, {
        from: env.MAIL_FROM,
        to: [env.MAIL_TO],
        reply_to: fields.email,
        subject: `${FORM_NAMES[formId] || 'Formularz'} — ${fields.name || fields.url || fields.email}`,
        html: notificationHtml(formId, fields, meta),
      });
    } catch (err) {
      // Bez powiadomienia zgłoszenie przepada — to jedyny błąd, który zwracamy.
      return json({ ok: false, error: 'send_failed' }, 502, origin);
    }

    try {
      // 2. Potwierdzenie dla klienta. Jeśli padnie, zgłoszenie i tak mamy —
      //    dlatego nie przerywa to odpowiedzi sukcesem.
      await sendMail(env, {
        from: env.MAIL_FROM,
        to: [fields.email],
        reply_to: env.MAIL_TO,
        subject: 'Dziękujemy za wiadomość — CtrlZ Studio',
        html: autoreplyHtml(fields),
      });
    } catch (err) {
      console.error('autoreply_failed', err.message);
    }

    return json({ ok: true }, 200, origin);
  },
};
