# Endpoint formularzy — wdrożenie

Worker przyjmuje zgłoszenia ze wszystkich czterech formularzy i wysyła dwie
wiadomości: powiadomienie do nas i automatyczne potwierdzenie do klienta.
Cały HTML obu maili jest w `src/index.js` — nie ma tu żadnego cudzego brandingu
ani limitu szablonów.

**Koszt: 0 zł.** Cloudflare Workers — 100 000 żądań dziennie w darmowym planie,
z jawnie dozwolonym użyciem komercyjnym. Resend — 3 000 maili miesięcznie
(maks. 100 dziennie).

---

## 1. Resend — konto i weryfikacja domeny

1. Załóż konto na [resend.com](https://resend.com) (darmowy plan wystarcza).
2. **Domains → Add Domain** → wpisz `ctrlzstudio.pl`.
3. Resend pokaże rekordy DNS do dodania — zwykle trzy: `TXT` (SPF),
   `TXT` (DKIM) i czasem `MX` dla subdomeny zwrotnej. Dodaj je u operatora DNS
   domeny (tam, gdzie masz ustawione rekordy dla strony).
4. Poczekaj na status **Verified**. Propagacja zajmuje zwykle kilkanaście minut,
   maksymalnie kilka godzin.
5. **API Keys → Create API Key** → uprawnienie *Sending access* w zupełności
   wystarcza. Skopiuj klucz — pokazuje się tylko raz.

> Bez zweryfikowanej domeny maile albo nie wyjdą, albo wpadną do spamu.
> To jedyny krok, którego nie da się pominąć.

---

## 2. Wdrożenie Workera

W katalogu `worker/`:

```bash
npx wrangler login          # otworzy przeglądarkę, zaloguj się do Cloudflare
npx wrangler secret put RESEND_API_KEY
# wklej klucz z Resend i zatwierdź

npx wrangler deploy
```

Po wdrożeniu w konsoli pojawi się adres w rodzaju:

```
https://ctrlz-forms.twoje-konto.workers.dev
```

Adresy `MAIL_TO` i `MAIL_FROM` są w `wrangler.toml` — zmienisz je tam,
a nie w kodzie.

---

## 3. Podpięcie adresu w serwisie

Otwórz `src/data/forms.ts` i podmień:

```ts
export const FORM_ENDPOINT = 'https://ctrlz-forms.KONTO.workers.dev';
```

na adres zwrócony przez `wrangler deploy`. To jedyne miejsce w całym serwisie,
w którym ten adres występuje.

Opcjonalnie: w panelu Cloudflare (**Workers → Triggers → Custom Domains**)
możesz podpiąć własną subdomenę, np. `form.ctrlzstudio.pl`. Wygląda lepiej
i uniezależnia od adresu `workers.dev`.

---

## 4. Test

```bash
curl -X POST https://ctrlz-forms.twoje-konto.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: https://ctrlzstudio.pl" \
  -d '{"formId":"kontakt","name":"Test","email":"twoj@email.pl","message":"Test wysyłki"}'
```

Oczekiwana odpowiedź: `{"ok":true}`, a na skrzynce dwie wiadomości —
powiadomienie i potwierdzenie.

Po wdrożeniu strony sprawdź jeszcze realny formularz: powinien przenieść
na `/dziekujemy`.

---

## Co jest zabezpieczone

| Mechanizm | Działanie |
|---|---|
| Lista dozwolonych źródeł | Endpoint odpowiada tylko na żądania z `ctrlzstudio.pl` i z localhosta |
| Honeypot `_gotcha` | Ukryte pole; jeśli wypełnione, zwracamy sukces i nic nie wysyłamy |
| Limity długości | 200 znaków na pole, 5 000 na wiadomość |
| Escapowanie HTML | Treść od użytkownika nigdy nie trafia do maila jako kod |
| Reply-To | Odpowiadasz klientowi jednym kliknięciem z własnej skrzynki |
| Brak zapisu danych | Worker jest bezstanowy — nic nigdzie nie zostaje |

Jeśli spam kiedyś przebije honeypot, następny krok to **Cloudflare Turnstile**
(też darmowy): jedno pole w formularzu i jedna weryfikacja w Workerze.

---

## Awaryjny wariant w serwisie

`src/utils/formSubmit.ts` ma wbudowany fallback: jeśli endpoint nie odpowie
w 12 sekund albo zwróci błąd, formularz wraca do starego zachowania i otwiera
klienta poczty z gotową treścią. Zgłoszenie nie przepada nawet wtedy,
gdy Worker jest niedostępny.

W GA4 rozróżnisz oba przypadki po parametrze zdarzenia `generate_lead`:
`method: "endpoint"` (wysłane przez API) albo `method: "mailto"` (wariant awaryjny).
Jeśli w raportach zaczną dominować te drugie — coś jest nie tak z Workerem.
