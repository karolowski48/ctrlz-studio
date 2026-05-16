# CtrlZ Studio — Astro.js

Strona agencji premium zbudowana w Astro.js z GSAP ScrollTrigger,
glassmorphism, animowanym cursorem i pełnym dark designem.

---

## WYMAGANIA

- Node.js w wersji 18 lub nowszej
  → Pobierz z: https://nodejs.org (wybierz "LTS")
- Edytor kodu: VS Code (https://code.visualstudio.com)
- Terminal (wbudowany w VS Code: Ctrl+` lub Cmd+`)

---

## PIERWSZE URUCHOMIENIE (staging lokalny)

1. Rozpakuj archiwum ZIP do wybranego folderu

2. Otwórz folder w VS Code:
   File → Open Folder → wybierz folder ctrlz-studio

3. Otwórz terminal w VS Code (Ctrl+` lub Cmd+`)

4. Zainstaluj zależności — wpisz i naciśnij Enter:

   npm install

   (Trwa ok. 30–60 sekund, pobiera Astro i GSAP)

5. Uruchom serwer lokalny:

   npm run dev

6. Otwórz przeglądarkę i wejdź na:

   http://localhost:4321

   Strona działa lokalnie! Każda zmiana w plikach odświeża się automatycznie.

---

## ZATRZYMANIE SERWERA

W terminalu naciśnij:  Ctrl+C

---

## BUDOWANIE WERSJI PRODUKCYJNEJ

npm run build

Gotowe pliki pojawią się w folderze /dist — to statyczny HTML/CSS/JS
gotowy do wrzucenia na dowolny hosting (Vercel, Netlify, Cyber_Folks).

Podgląd wersji produkcyjnej lokalnie:

npm run preview
→ Otwórz: http://localhost:4321

---

## DEPLOY NA VERCEL (darmowy, zalecany)

1. Załóż konto na https://github.com i wgraj projekt:
   - Nowe repo → wgraj wszystkie pliki projektu

2. Wejdź na https://vercel.com i zaloguj się przez GitHub

3. Kliknij "Add New Project" → wybierz swoje repo

4. Vercel automatycznie wykryje Astro — kliknij "Deploy"

5. Po ~60 sekundach strona żyje pod adresem:
   ctrlz-studio.vercel.app

6. Podpięcie własnej domeny z Cyber_Folks:
   - W Vercel: Settings → Domains → Add Domain → wpisz ctrlzstudio.pl
   - W panelu Cyber_Folks: DNS → dodaj rekord:
     Typ: A, Nazwa: @, Wartość: 76.76.19.61
     Typ: CNAME, Nazwa: www, Wartość: cname.vercel-dns.com

---

## EDYCJA TREŚCI

Wszystkie teksty, liczby i dane są w jednym pliku:

  src/pages/index.astro

Otwórz go w VS Code, znajdź dowolny tekst (Ctrl+F) i zmień.
Zapisz plik → strona odświeży się automatycznie w przeglądarce.

### Co zmienić na start:
- Imię, bio, liczby statystyk → szukaj "Karol" i sekcji "ABOUT"
- Email kontaktowy → szukaj "kontakt@ctrlzstudio.pl"
- Telefon → szukaj "+48 123 456 789"
- NIP/REGON → szukaj "000-000-00-00" w stopce
- Projekty w portfolio → szukaj sekcji "PORTFOLIO"
- Opinie klientów → szukaj sekcji "TESTIMONIALS"

---

## STRUKTURA PLIKÓW

ctrlz-studio/
├── src/
│   ├── pages/
│   │   └── index.astro      ← GŁÓWNA STRONA (HTML + treść)
│   ├── layouts/
│   │   └── Layout.astro     ← Szkielet HTML (head, cursor, stt)
│   └── styles/
│       └── global.css       ← Cały design (kolory, animacje, komponenty)
├── public/
│   └── favicon.svg          ← Ikona w zakładce przeglądarki
├── astro.config.mjs         ← Konfiguracja Astro
├── package.json             ← Zależności (Astro + GSAP)
└── README.md                ← Ta instrukcja

---

## TECHNOLOGIE

- Astro.js 4.x    — framework (zero JS domyślnie, max wydajność)
- GSAP 3.x        — animacje (ScrollTrigger, countUp, tilt, cursor)
- CSS Variables   — design tokens, glassmorphism
- Google Fonts    — Syne (nagłówki) + DM Sans (body)

---

## ANIMACJE KTÓRE DZIAŁAJĄ

- Custom cursor z lagującym pierścieniem i efektem scale na hover
- Floating orbs z parallax scroll
- ScrollTrigger reveal: fadeUp, fadeLeft, fadeRight, scaleIn
- Animated counters (6+, 250+, 100%)
- Tilt 3D na kartach usług i portfolio przy hover
- Glassmorphism karty z backdrop-filter blur
- Marquee strip z nazwami technologii
- FAQ accordion z rotującą ikoną
- Scroll to top z pulsującą animacją
- Nav z blur po scrollu (scrolled state)
- Noise texture overlay (subtelny szum dla głębi)

---

## PYTANIA

kontakt@ctrlzstudio.pl
