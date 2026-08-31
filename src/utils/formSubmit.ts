/**
 * WSPÓLNA OBSŁUGA FORMULARZY
 * ══════════════════════════
 *
 * Jedna funkcja dla wszystkich czterech formularzy w serwisie. Wysyła dane
 * do naszego Workera (worker/src/index.js), a po sukcesie przenosi na /dziekujemy.
 *
 * DLACZEGO JEST TU FALLBACK NA mailto:
 * Jeśli endpoint padnie, nie zwróci się w czasie albo klient siedzi za
 * firewallem blokującym obce domeny — zgłoszenie NIE MOŻE przepaść.
 * W takim wypadku wracamy do starego zachowania, czyli otwarcia klienta poczty
 * z gotową treścią. To gorsze doświadczenie, ale wciąż lepsze niż cisza.
 *
 * ZDARZENIE GA4:
 * `generate_lead` odpala się dopiero PO potwierdzeniu z serwera, więc mierzy
 * realnie wysłane zapytania, a nie kliknięcia w przycisk. Przy fallbacku
 * wysyłamy je z parametrem `method: 'mailto'`, żeby dało się odróżnić
 * jedno od drugiego w raportach.
 */

import { FORM_ENDPOINT, FORM_TIMEOUT_MS } from '../data/forms';

export interface SubmitOptions {
  /** Identyfikator formularza — trafia do maila i do zdarzenia GA4. */
  formId: string;
  /** Dodatkowe pola spoza <form>, np. wycena wyliczona przez kalkulator. */
  extra?: Record<string, string>;
  /** Temat maila w wariancie awaryjnym (mailto). */
  fallbackSubject: string;
  /** Treść maila w wariancie awaryjnym (mailto). */
  fallbackBody: string;
}

function track(name: string, params: Record<string, unknown>) {
  (window as any).czTrack?.(name, params);
}

export async function submitForm(form: HTMLFormElement, opts: SubmitOptions): Promise<void> {
  const fd = new FormData(form);
  const payload: Record<string, string> = {
    formId: opts.formId,
    page: location.pathname,
  };
  fd.forEach((value, key) => {
    if (typeof value === 'string') payload[key] = value;
  });
  Object.assign(payload, opts.extra ?? {});

  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"], input[type="submit"]');
  const btnLabel = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Wysyłanie…</span>';
  }

  // Bez limitu czasu użytkownik patrzyłby na „Wysyłanie…" w nieskończoność.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FORM_TIMEOUT_MS);

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    clearTimeout(timer);

    const data = await res.json().catch(() => ({ ok: false }));

    if (res.ok && data.ok) {
      track('generate_lead', { form_id: opts.formId, method: 'endpoint', ...(opts.extra ?? {}) });
      location.href = '/dziekujemy';
      return;
    }

    // Błąd walidacji po stronie serwera — nie ma sensu otwierać poczty,
    // bo dane i tak są niepoprawne. Mówimy o tym wprost.
    if (res.status === 422) {
      if (btn) { btn.disabled = false; if (btnLabel) btn.innerHTML = btnLabel; }
      alert('Sprawdź proszę imię i adres e-mail — bez nich nie damy rady odpowiedzieć.');
      return;
    }

    throw new Error(`endpoint_${res.status}`);
  } catch {
    clearTimeout(timer);
    // Wariant awaryjny: otwieramy klienta poczty z gotową treścią.
    track('generate_lead', { form_id: opts.formId, method: 'mailto' });
    if (btn) { btn.disabled = false; if (btnLabel) btn.innerHTML = btnLabel; }
    window.location.href =
      `mailto:kontakt@ctrlzstudio.pl?subject=${encodeURIComponent(opts.fallbackSubject)}` +
      `&body=${encodeURIComponent(opts.fallbackBody)}`;
  }
}
