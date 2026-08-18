/**
 * PODSTRONY BRANŻOWE
 * ══════════════════
 *
 * Jedno źródło treści dla wszystkich podstron „strony internetowe dla…".
 * Renderuje je szablon `src/pages/strony-internetowe-dla-[slug].astro`,
 * a listę zbiera `src/pages/branze.astro`.
 *
 * Żeby dodać nową branżę: dopisz obiekt poniżej. Strona, wpis w sitemapie
 * i kafelek na stronie /branze zrobią się same przy najbliższym buildzie.
 *
 * ZASADA: treść każdej branży musi być inna. Powielone akapity z podmienioną
 * nazwą zawodu to duplikat treści — Google potraktuje takie strony jako jedną
 * i cała robota pójdzie na marne. Dlatego każdy wpis ma własne bolączki,
 * własne „co musi być na stronie" i własne pytania w FAQ.
 */

export interface Industry {
  slug: string;
  /** Krótka nazwa do kafelków i breadcrumbów, np. „Fotografowie". */
  label: string;
  /** Dopełniacz do nagłówków: „strony internetowe dla …". */
  forWhom: string;
  metaTitle: string;
  description: string;
  /** Nagłówek H1 — druga część trafia w gradient. */
  h1: [string, string];
  chips: string[];
  lead: string;
  /** Sekcja „co zwykle nie działa" — 3 realne bolączki branży. */
  problems: { t: string; d: string }[];
  /** Akapity sekcji analitycznej — dlaczego w tej branży strona wygląda inaczej. */
  why: string[];
  /** 6 elementów, które w tej branży muszą znaleźć się na stronie. */
  musts: { t: string; d: string }[];
  /** Jak w tej branży ludzie szukają — pod to budujemy strukturę i SEO. */
  searchIntent: string[];
  /** Pytania specyficzne dla branży (ceny dokleja szablon). */
  faq: { q: string; a: string }[];
  /** Powiązane wpisy na blogu — slug bez /blog/. */
  posts?: { slug: string; title: string }[];
}

export const INDUSTRIES: Industry[] = [
  /* ─────────────────────────────────────────────────────────── FOTOGRAF */
  {
    slug: 'fotografa',
    label: 'Fotografowie',
    forWhom: 'fotografa',
    metaTitle: 'Strona internetowa dla fotografa — portfolio | CtrlZ Studio',
    description:
      'Strony dla fotografów ślubnych, portretowych i produktowych. Szybkie portfolio, które nie zabija jakości zdjęć i realnie prowadzi do zapytania o termin.',
    h1: ['Strony internetowe', 'dla fotografa'],
    chips: ['Portfolio bez utraty jakości', 'Szybkie ładowanie galerii', 'Formularz zapytania o termin'],
    lead:
      'Fotograf sprzedaje zdjęciami — i to jest największy techniczny problem jego strony. ' +
      'Portfolio musi wyglądać perfekcyjnie i jednocześnie ładować się w ułamku sekundy na telefonie. ' +
      'Te dwie rzeczy stoją ze sobą w sprzeczności i większość gotowych szablonów przegrywa tę walkę.',
    problems: [
      {
        t: 'Galeria waży kilkanaście megabajtów',
        d: 'Zdjęcia wrzucone w oryginale ładują się na telefonie kilkanaście sekund. Klient wychodzi, zanim zobaczy pierwsze. To najczęstszy problem stron fotograficznych i jednocześnie najłatwiejszy do naprawienia.',
      },
      {
        t: 'Portfolio bez podziału na kategorie',
        d: 'Para szukająca fotografa ślubnego przegląda sesje produktowe i chrzciny. Nie znajduje tego, po co przyszła, więc zakłada, że tego nie robicie.',
      },
      {
        t: 'Brak jakiejkolwiek informacji o cenie',
        d: 'Fotografowie unikają cen z obawy, że odstraszą. Efekt jest odwrotny — dostajecie zapytania od osób z budżetem trzy razy niższym i tracicie godziny na rozmowy, które nie mogą się udać.',
      },
    ],
    why: [
      'W fotografii decyzja zapada emocjonalnie, ale zapytanie wysyła się dopiero po sprawdzeniu dwóch rzeczy: czy styl pasuje i czy termin jest wolny. Strona, która obsługuje tylko pierwszą, kończy pracę w połowie.',
      'Dlatego przy portfolio nie projektujemy „galerii", tylko ścieżkę: styl → konkretna realizacja od początku do końca → informacja o pakietach → formularz z datą wydarzenia. Każdy krok odpowiada na pytanie, które klient i tak by zadał mailem.',
      'Technicznie to projekt, w którym najwięcej pracy idzie w rzeczy niewidoczne: konwersję zdjęć do nowoczesnych formatów, generowanie kilku rozmiarów pod różne ekrany i doczytywanie kolejnych kadrów dopiero, gdy użytkownik do nich dojedzie. Zdjęcie wygląda tak samo, a waży kilka razy mniej.',
    ],
    musts: [
      { t: 'Portfolio podzielone na typy sesji', d: 'Śluby, portrety, biznes, produkt — osobne sekcje z własnymi adresami. Każda z nich może pozycjonować się na inną frazę.' },
      { t: 'Pełne reportaże, nie pojedyncze kadry', d: 'Para chce zobaczyć, jak wygląda cały dzień w Waszym wykonaniu. Jeden kompletny reportaż przekonuje mocniej niż pięćdziesiąt najlepszych zdjęć z pięćdziesięciu różnych ślubów.' },
      { t: 'Widełki cenowe albo pakiety', d: 'Nie trzeba podawać dokładnego cennika. Wystarczy „pakiety od…", żeby odfiltrować zapytania, na które i tak nie odpowiecie pozytywnie.' },
      { t: 'Formularz z datą i miejscem', d: 'Data wydarzenia to pierwsza rzecz, którą sprawdzacie. Pytanie o nią w formularzu oszczędza całą wymianę maili.' },
      { t: 'Optymalizacja zdjęć w tle', d: 'Format WebP, kilka rozmiarów na zdjęcie, doczytywanie przy przewijaniu. Bez tego portfolio nie ma szans na dobry wynik szybkości.' },
      { t: 'Opinie z podpisem i kontekstem', d: 'Imiona pary i data ślubu działają nieporównywalnie mocniej niż anonimowe „polecam, super kontakt".' },
    ],
    searchIntent: [
      'Fraza z miastem i typem sesji — „fotograf ślubny Wadowice", „sesja biznesowa Kraków" — to zapytania z najwyższą intencją zakupową i najniższą konkurencją.',
      'Osobne podstrony dla każdego typu sesji dają Wam kilka niezależnych wejść z Google zamiast jednego.',
      'Wizytówka Google ze zdjęciami z ostatnich realizacji potrafi generować kontakt szybciej niż sama strona — przy zapytaniach lokalnych mapa wyświetla się nad wynikami.',
    ],
    faq: [
      {
        q: 'Czy strona spowolni się przez dużą liczbę zdjęć?',
        a: 'Nie, jeśli zdjęcia są przygotowane technicznie. Konwertujemy je do formatu WebP, generujemy kilka rozmiarów dla różnych ekranów i wczytujemy kolejne dopiero, gdy użytkownik do nich dojedzie. W praktyce galeria z setką zdjęć ładuje się szybciej niż strona z pięcioma wrzuconymi w oryginale.',
      },
      {
        q: 'Czy będę mógł sam dodawać nowe sesje?',
        a: 'Tak — przy stronach fotograficznych panel do samodzielnego dodawania realizacji ma sens, bo portfolio zmienia się co miesiąc. Zdjęcia wrzucacie w oryginale, a strona sama je przelicza i optymalizuje przy wgrywaniu.',
      },
      {
        q: 'Czy warto podawać ceny na stronie?',
        a: 'Naszym zdaniem tak, przynajmniej w formie „pakiety od…". Bez tego rozmawiacie z osobami, których budżet jest kilka razy niższy od Waszego, i tracicie na to czas, który mógłby pójść na obróbkę. Widełki nie odstraszają właściwych klientów — odstraszają niewłaściwych, i o to chodzi.',
      },
      {
        q: 'Mam już profil na Instagramie — czy strona jest mi potrzebna?',
        a: 'Instagram pokazuje styl, ale nie sprzedaje. Nie ma tam cen, nie ma pełnych reportaży, nie da się wygodnie sprawdzić dostępności terminu, a algorytm decyduje, kto zobaczy Wasze zdjęcia. Strona jest miejscem, w którym zainteresowanie z Instagrama zamienia się w zapytanie — i którego nikt Wam nie wyłączy.',
      },
    ],
    posts: [
      { slug: 'dlaczego-szybka-strona-sprzedaje', title: 'Dlaczego szybka strona sprzedaje' },
    ],
  },

  /* ───────────────────────────────────────────────────── FIRMA BUDOWLANA */
  {
    slug: 'firmy-budowlanej',
    label: 'Firmy budowlane i wykończeniowe',
    forWhom: 'firmy budowlanej',
    metaTitle: 'Strona dla firmy budowlanej i remontowej | CtrlZ Studio',
    description:
      'Strony dla firm budowlanych, wykończeniowych i remontowych. Katalog realizacji, formularz wyceny i pozycjonowanie na frazy z nazwą miejscowości.',
    h1: ['Strony internetowe', 'dla firmy budowlanej'],
    chips: ['Katalog realizacji', 'Formularz wyceny', 'Frazy lokalne'],
    lead:
      'W budowlance klient nie kupuje usługi — kupuje pewność, że nie zostanie z niedokończonym domem. ' +
      'Cała strona jest po to, żeby tę pewność zbudować, zanim ktokolwiek zadzwoni.',
    problems: [
      {
        t: 'Zdjęcia realizacji zrobione telefonem po zmroku',
        d: 'Firma z dwudziestoletnim doświadczeniem wygląda przez to gorzej niż konkurent, który zaczął rok temu, ale zapłacił za sesję. Klient ocenia wykonanie po zdjęciu, bo nie ma innego materiału.',
      },
      {
        t: 'Strona nie mówi, gdzie pracujecie',
        d: 'Ktoś z Myślenic nie zadzwoni, jeśli nie widzi, że dojeżdżacie w ten rejon. Brak listy obsługiwanych miejscowości to najczęstsza i najkosztowniejsza luka na stronach firm budowlanych.',
      },
      {
        t: 'Ogólnikowy zakres usług',
        d: '„Usługi ogólnobudowlane" nie mówi nic i nie pozycjonuje się na nic. Klient szuka „elewacja", „poddasze", „wylewki" i wpisuje dokładnie to.',
      },
    ],
    why: [
      'Budowlanka to jedna z niewielu branż, w których strona nie musi być piękna — musi być wiarygodna. Klient wydaje kilkadziesiąt tysięcy złotych komuś, kogo widzi pierwszy raz, i szuka wszystkiego, co obniża jego ryzyko.',
      'Najmocniej działają realizacje pokazane jako historia: stan przed, zakres prac, czas wykonania, efekt. Nie galeria losowych zdjęć z budowy, tylko konkretne projekty, przy których widać skalę i staranność wykończenia.',
      'Druga rzecz to jasny zakres. Firma, która pisze „stany surowe, elewacje, dachy" i osobno opisuje każdą z tych usług, dostaje zapytania dokładnie na to, co chce robić — i pozycjonuje się na trzy niezależne grupy fraz zamiast na jedną ogólną.',
    ],
    musts: [
      { t: 'Realizacje w układzie przed i po', d: 'Najsilniejszy dowód w tej branży. Jedno dobre zestawienie przekonuje bardziej niż cała strona tekstu o doświadczeniu.' },
      { t: 'Lista obsługiwanych miejscowości', d: 'Konkretne nazwy, nie „okolice Krakowa". To jednocześnie informacja dla klienta i materiał, na którym pracuje pozycjonowanie lokalne.' },
      { t: 'Rozbite usługi, nie jeden worek', d: 'Osobna podstrona dla elewacji, osobna dla wykończeń wnętrz. Każda celuje we własne zapytania i własnych klientów.' },
      { t: 'Formularz z zakresem i metrażem', d: 'Kilka pól, które pozwalają ocenić zlecenie przed wyjazdem na oględziny. Oszczędza dni pracy w skali roku.' },
      { t: 'Uprawnienia, ubezpieczenie, gwarancja', d: 'Rzeczy, o które klient boi się zapytać, a które rozstrzygają wybór. Napisane wprost budują przewagę nad konkurencją, która milczy.' },
      { t: 'Telefon widoczny na każdym ekranie', d: 'W tej branży ludzie dzwonią, nie piszą. Numer musi być w zasięgu kciuka przez cały czas przewijania.' },
    ],
    searchIntent: [
      'Zapytania są krótkie i lokalne: „firma budowlana Sułkowice", „wykończenia wnętrz Kalwaria", „elewacje Wadowice". Wygrywa ten, kto ma podstronę dokładnie pod tę frazę.',
      'Osobne podstrony usługowo-lokalne — usługa plus miejscowość — to najskuteczniejsza struktura w tej branży i jednocześnie ta, której prawie nikt lokalnie nie stosuje.',
      'Opinie w wizytówce Google mają w budowlance ogromną wagę, bo klient traktuje je jako zabezpieczenie przed spartaczoną robotą.',
    ],
    faq: [
      {
        q: 'Nie mam dobrych zdjęć realizacji. Co wtedy?',
        a: 'To najczęstsza sytuacja i da się ją rozwiązać dwutorowo. Startujemy z tym, co jest — po selekcji i obróbce zwykle da się wybrać kilkanaście przyzwoitych kadrów. Równolegle warto zaplanować jedną sesję na najbliższej ładnej realizacji. W budowlance dobre zdjęcia zwracają się szybciej niż jakikolwiek inny wydatek na marketing.',
      },
      {
        q: 'Czy warto pokazywać ceny usług budowlanych?',
        a: 'Rzadko, bo wycena zależy od metrażu i stanu obiektu. Zamiast cennika lepiej działa widełka orientacyjna za metr albo przykładowa wycena zrealizowanego projektu z opisem zakresu. Klient dostaje punkt odniesienia, a Wy nie wiążecie się kwotą.',
      },
      {
        q: 'Ile podstron potrzebuje firma budowlana?',
        a: 'Zwykle od sześciu do dwunastu: strona główna, osobna podstrona na każdą główną usługę, realizacje, o firmie, kontakt. Przy działaniu w kilku miejscowościach dochodzą podstrony lokalne. Struktura wynika z tego, na ile różnych fraz chcecie być widoczni.',
      },
      {
        q: 'Klienci i tak przychodzą z polecenia — po co mi strona?',
        a: 'Bo polecenie kończy się na stronie. Ktoś dostaje Wasz numer od znajomego, wpisuje nazwę firmy w Google i sprawdza, czy to poważna działalność. Brak strony albo strona sprzed dziesięciu lat kasuje część poleceń, zanim zamienią się w telefon — i nigdy się o tym nie dowiecie.',
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────── GABINET */
  {
    slug: 'gabinetu-medycznego',
    label: 'Gabinety i usługi medyczne',
    forWhom: 'gabinetu medycznego',
    metaTitle: 'Strona internetowa dla gabinetu medycznego | CtrlZ Studio',
    description:
      'Strony dla gabinetów stomatologicznych, fizjoterapeutycznych i kosmetologicznych. Zapisy online, cennik zabiegów, zgodność z RODO.',
    h1: ['Strony internetowe', 'dla gabinetu'],
    chips: ['Zapisy online', 'Cennik zabiegów', 'Zgodność z RODO'],
    lead:
      'Pacjent szuka gabinetu wtedy, gdy coś go boli albo gdy zbiera się na coś od dawna odkładanego. ' +
      'W obu przypadkach decyduje szybko i sprawdza trzy rzeczy: czy to blisko, czy jest wolny termin i czy może temu komuś zaufać.',
    problems: [
      {
        t: 'Zapisy tylko przez telefon w godzinach pracy',
        d: 'Znaczna część pacjentów szuka gabinetu wieczorem albo w weekend, czyli wtedy, gdy nikt nie odbiera. Jeśli jedyną drogą jest telefon, ten pacjent zapisze się gdzie indziej.',
      },
      {
        t: 'Brak cennika zabiegów',
        d: 'W usługach medycznych i estetycznych cena jest jednym z pierwszych filtrów. Jej brak nie buduje tajemnicy, tylko przenosi pacjenta na stronę konkurencji, która ją podała.',
      },
      {
        t: 'Anonimowy gabinet bez twarzy',
        d: 'Pacjent powierza komuś swoje zdrowie. Strona bez zdjęcia i nazwiska specjalisty, bez wykształcenia i doświadczenia, każe mu podjąć tę decyzję na ślepo.',
      },
    ],
    why: [
      'Strona gabinetu ma jedno zadanie: doprowadzić do umówienia wizyty przy jak najmniejszym wysiłku pacjenta. Wszystko, co dokłada mu kroków — szukanie numeru, dzwonienie w godzinach pracy, dopytywanie o cenę — obniża liczbę zapisów.',
      'Dlatego projektujemy wokół dwóch elementów: możliwości zapisania się o dowolnej porze i kompletu informacji, które pacjent chciałby znać przed wizytą. Cennik, czas trwania zabiegu, przygotowanie, przeciwwskazania.',
      'Wiarygodność budują konkretne rzeczy: nazwisko i zdjęcie specjalisty, wykształcenie, szkolenia, staż. W tej branży zaufanie jest walutą, a strona jest jedynym miejscem, w którym możecie je zbudować przed pierwszym kontaktem.',
    ],
    musts: [
      { t: 'Zapisy online lub przez formularz', d: 'Możliwość umówienia wizyty o dwudziestej drugiej w niedzielę. Choćby prosty formularz z wyborem preferowanego terminu — to i tak zmienia liczbę zapisów.' },
      { t: 'Cennik zabiegów', d: 'Pełny albo z widełkami. Pacjent i tak zapyta, a informacja podana z góry oszczędza rozmowy i buduje wrażenie uczciwości.' },
      { t: 'Sylwetka specjalisty', d: 'Imię, nazwisko, zdjęcie, wykształcenie, doświadczenie. Najmocniejszy element budujący zaufanie na całej stronie.' },
      { t: 'Opis każdego zabiegu osobno', d: 'Na czym polega, ile trwa, jak się przygotować, czego się spodziewać. To jednocześnie odpowiedź na obawy pacjenta i materiał, który pozycjonuje się w Google.' },
      { t: 'Dojazd, parking, godziny', d: 'Mapa, informacja o parkingu i o wejściu do budynku. Drobiazgi, o które pacjenci pytają najczęściej.' },
      { t: 'Zgodność z RODO', d: 'Formularz kontaktowy w gabinecie zbiera dane o zdrowiu, więc wymaga poprawnych zgód i polityki prywatności. To nie jest miejsce na skróty.' },
    ],
    searchIntent: [
      'Zapytania łączą zabieg z lokalizacją: „stomatolog Sułkowice", „fizjoterapeuta kręgosłup Myślenice", „licówki cena Kraków".',
      'Osobne podstrony dla poszczególnych zabiegów wchodzą na frazy problemowe — pacjent często szuka nazwy dolegliwości, a nie nazwy zabiegu.',
      'Wizytówka Google z aktualnymi godzinami i opiniami jest w tej branży ważniejsza niż w większości innych — mapa jest pierwszym miejscem, w które patrzy pacjent.',
    ],
    faq: [
      {
        q: 'Czy da się podpiąć system rezerwacji wizyt?',
        a: 'Tak. Jeśli korzystacie już z systemu do zarządzania gabinetem, zwykle da się podpiąć jego moduł rezerwacji bezpośrednio na stronę. Jeśli nie, alternatywą jest formularz z wyborem preferowanego terminu — pacjent zostawia zgłoszenie o dowolnej porze, a rejestracja potwierdza je rano. Prostsze, tańsze i przy jednym gabinecie zwykle wystarczające.',
      },
      {
        q: 'Czy strona gabinetu musi spełniać wymogi RODO?',
        a: 'Tak, i to ostrzej niż zwykła strona firmowa, bo formularz kontaktowy w gabinecie może zbierać informacje o stanie zdrowia. Potrzebne są prawidłowe zgody przy formularzu, polityka prywatności opisująca zakres i cel przetwarzania oraz świadome podejście do narzędzi analitycznych. Konfigurujemy to standardowo w każdym takim projekcie.',
      },
      {
        q: 'Czy publikować zdjęcia efektów zabiegów?',
        a: 'Działają bardzo mocno, ale wymagają wyraźnej zgody pacjenta na wykorzystanie wizerunku i ostrożności przy zabiegach medycznych, gdzie obowiązują ograniczenia w reklamie. Bezpieczny wariant to zdjęcia z zachowaniem anonimowości i opisem przypadku zamiast obietnicy efektu.',
      },
      {
        q: 'Mam gabinet w małej miejscowości — czy strona się opłaci?',
        a: 'Zwykle tak, i to szybciej niż w dużym mieście, bo konkurencja w wynikach lokalnych jest znacznie mniejsza. W miejscowości, gdzie żaden gabinet nie ma porządnej strony i opisanych zabiegów, pierwsza pozycja w Google jest realnie do zdobycia w kilka miesięcy.',
      },
    ],
  },

  /* ──────────────────────────────────────────── DOMKI I AGROTURYSTYKA */
  {
    slug: 'domkow-i-agroturystyki',
    label: 'Domki, agroturystyka, noclegi',
    forWhom: 'domków i agroturystyki',
    metaTitle: 'Strona dla domków i agroturystyki | CtrlZ Studio',
    description:
      'Strony dla domków letniskowych, agroturystyk i obiektów noclegowych. Kalendarz dostępności, rezerwacja bez prowizji portali, galeria i okolica.',
    h1: ['Strony internetowe', 'dla domków i agroturystyki'],
    chips: ['Kalendarz dostępności', 'Rezerwacja bez prowizji', 'Galeria obiektu'],
    lead:
      'Każda rezerwacja przez duży portal to prowizja, która zostaje u pośrednika. ' +
      'Własna strona z kalendarzem i możliwością rezerwacji jest jedynym sposobem, żeby część tych pieniędzy odzyskać — a przy sezonie liczonym w dziesiątkach rezerwacji to nie są drobne.',
    problems: [
      {
        t: 'Cały ruch idzie przez portale rezerwacyjne',
        d: 'Portale dają widoczność, ale biorą prowizję od każdej doby i to one budują relację z gościem. Bez własnego kanału rezerwacji jesteście od nich całkowicie zależni.',
      },
      {
        t: 'Brak informacji o dostępności',
        d: 'Gość pyta mailem o wolne terminy, czeka na odpowiedź, w międzyczasie rezerwuje gdzie indziej. Widoczny kalendarz kasuje ten problem w całości.',
      },
      {
        t: 'Zero treści o okolicy',
        d: 'Ludzie nie szukają „domku", tylko wyjazdu. Pytają o szlaki, atrakcje dla dzieci, odległość do stoku. Obiekt, który to opisuje, wchodzi na dziesiątki zapytań, o które nikt inny nie walczy.',
      },
    ],
    why: [
      'W wynajmie krótkoterminowym strona ma policzalny zwrot: każda rezerwacja, która przyjdzie bezpośrednio zamiast przez portal, zostawia u Was pełną kwotę. Przy kilkudziesięciu rezerwacjach w sezonie strona zwraca się zwykle w pierwszym roku.',
      'Żeby to zadziałało, gość musi mieć na stronie wszystko, co miałby na portalu, i jeden powód więcej, żeby zarezerwować bezpośrednio. Zwykle wystarczy cena o kilka procent niższa niż na portalu — nadal zarabiacie więcej, bo nie oddajecie prowizji.',
      'Drugi filar to treść o okolicy. Wpisy o szlakach, atrakcjach i tym, co robić przy złej pogodzie, przyciągają ludzi planujących wyjazd na długo przed wyborem noclegu. To najtańszy sposób zdobywania ruchu w tej branży i praktycznie nikt lokalnie go nie stosuje.',
    ],
    musts: [
      { t: 'Kalendarz dostępności', d: 'Widoczne wolne terminy bez pisania i czekania. Najczęściej odwiedzany element takiej strony.' },
      { t: 'Rezerwacja bezpośrednia', d: 'Formularz albo pełny system rezerwacji. Każde zgłoszenie tą drogą to prowizja, która zostaje u Was.' },
      { t: 'Komplet zdjęć obiektu', d: 'Każde pomieszczenie, łazienka, kuchnia, otoczenie, widok. Gość, który nie widzi łazienki, zakłada najgorsze.' },
      { t: 'Konkretne wyposażenie', d: 'Liczba miejsc, sypialnie, sauna, jacuzzi, grill, wi-fi, czy przyjmujecie psy. To są dokładnie te frazy, które ludzie wpisują w Google.' },
      { t: 'Sekcja o okolicy', d: 'Szlaki, atrakcje, odległości, plan na deszczowy dzień. Buduje ruch z zapytań, których konkurencja w ogóle nie obsługuje.' },
      { t: 'Wersja angielska', d: 'Przy obiektach w rejonach turystycznych często zwraca się szybciej, niż zakładacie.' },
    ],
    searchIntent: [
      'Zapytania są opisowe i pełne warunków: „domek z jacuzzi Beskidy", „agroturystyka z końmi dla dzieci", „domki nad jeziorem z psem". Wygrywa ten, kto wypisał wyposażenie wprost.',
      'Treści o okolicy — szlaki, atrakcje, pomysły na weekend — ściągają gości na etapie planowania, czyli zanim w ogóle zaczną szukać noclegu.',
      'Wizytówka Google ze zdjęciami wnętrz i opiniami jest przy noclegach jednym z najsilniejszych źródeł kontaktu.',
    ],
    faq: [
      {
        q: 'Czy da się podpiąć kalendarz z portalu rezerwacyjnego?',
        a: 'Tak — większość portali udostępnia synchronizację kalendarzy, więc rezerwacja zrobiona tam automatycznie blokuje termin na Waszej stronie i odwrotnie. To rozwiązuje główną obawę przy prowadzeniu dwóch kanałów jednocześnie, czyli podwójną rezerwację tego samego terminu.',
      },
      {
        q: 'Czy potrzebuję pełnego systemu rezerwacji z płatnościami?',
        a: 'Nie na start. Przy jednym lub dwóch obiektach zwykle wystarcza kalendarz dostępności plus formularz rezerwacji z potwierdzeniem mailowym i zadatkiem przelewem. Pełny system z płatnościami online zaczyna się opłacać przy większej liczbie obiektów albo dużej rotacji gości.',
      },
      {
        q: 'Czy strona wyprze rezerwacje z portali?',
        a: 'Nie wyprze i nie o to chodzi. Portale zostawcie jako źródło nowych gości, a stronę zbudujcie tak, żeby przejmowała powroty i polecenia — czyli te rezerwacje, za które i tak płacicie prowizję, mimo że gość trafił do Was sam. Zwykle to od nich zaczyna się realna oszczędność.',
      },
      {
        q: 'Ile zdjęć powinno być na stronie obiektu?',
        a: 'Więcej, niż się wydaje. Gość wynajmujący dom na tydzień chce zobaczyć każde pomieszczenie, łazienkę, kuchnię, otoczenie i widok z okna. Trzydzieści dobrych zdjęć nie jest przesadą — pod warunkiem że są zoptymalizowane, bo inaczej strona przestanie się ładować na telefonie w górach przy słabym zasięgu.',
      },
    ],
  },

  /* ───────────────────────────────────────────────────────── INSTALATOR */
  {
    slug: 'instalatora',
    label: 'Instalatorzy i usługi techniczne',
    forWhom: 'instalatora',
    metaTitle: 'Strona internetowa dla instalatora | CtrlZ Studio',
    description:
      'Strony dla instalatorów fotowoltaiki, pomp ciepła, klimatyzacji i hydraulików. Szybki kontakt, obszar działania, formularz wyceny instalacji.',
    h1: ['Strony internetowe', 'dla instalatora'],
    chips: ['Kontakt w jednym kliknięciu', 'Obszar działania', 'Formularz wyceny'],
    lead:
      'W usługach instalacyjnych liczy się czas reakcji. Klient z awarią dzwoni pod trzy pierwsze numery z Google ' +
      'i zleca temu, kto odbierze. Strona ma jedno zadanie: sprawić, żeby ten telefon trafił do Was.',
    problems: [
      {
        t: 'Numer telefonu ukryty w stopce',
        d: 'Osoba z zalaną łazienką nie będzie przewijać strony. Numer musi być widoczny od razu i klikalny — jedno dotknięcie ma uruchamiać połączenie.',
      },
      {
        t: 'Brak jasnego obszaru dojazdu',
        d: 'Bez listy miejscowości klient zakłada, że nie dojedziecie, i dzwoni do kogoś innego. To najtańsza do naprawienia strata w tej branży.',
      },
      {
        t: 'Wszystko wrzucone w jeden worek',
        d: 'Fotowoltaika, pompy ciepła i klimatyzacja opisane w jednym akapicie nie pozycjonują się na nic. To trzy różne usługi, trzy różne grupy klientów i trzy różne grupy fraz.',
      },
    ],
    why: [
      'Ta branża dzieli się na dwa zupełnie różne scenariusze i strona musi obsłużyć oba. Pierwszy to awaria — decyzja w kilka minut, liczy się wyłącznie szybki kontakt. Drugi to inwestycja planowana tygodniami, jak fotowoltaika czy pompa ciepła, gdzie klient czyta, porównuje i liczy zwrot.',
      'Dla pierwszego scenariusza projektujemy widoczny numer, informację o czasie dojazdu i obsługiwanych miejscowościach. Dla drugiego — treści, które odpowiadają na realne pytania: ile to kosztuje, po ilu latach się zwraca, jakie są dofinansowania, co obejmuje gwarancja.',
      'Ten drugi rodzaj treści jest w tej branży najbardziej niedoceniany. Klient planujący fotowoltaikę czyta miesiącami, a firma, która odpowiada mu na pytania, zanim zadzwoni, wchodzi do rozmowy już jako ekspert — a nie jako trzecia oferta do porównania ceną.',
    ],
    musts: [
      { t: 'Telefon przyklejony na mobile', d: 'Klikalny numer widoczny przez cały czas przewijania. W usługach awaryjnych to element, który wprost decyduje o liczbie zleceń.' },
      { t: 'Osobna podstrona na każdą usługę', d: 'Fotowoltaika, pompy ciepła, klimatyzacja, hydraulika. Każda z własnym opisem, cenami orientacyjnymi i realizacjami.' },
      { t: 'Obszar działania z nazwami', d: 'Konkretne miejscowości i orientacyjny czas dojazdu. Podwójna korzyść: informacja dla klienta i paliwo dla SEO lokalnego.' },
      { t: 'Realizacje ze zdjęciami', d: 'Zdjęcie wykonanej instalacji z mocą, miejscowością i krótkim opisem. Dowód, że robicie to naprawdę, a nie odsprzedajecie zlecenia dalej.' },
      { t: 'Kalkulator albo widełki cen', d: 'Przy większych inwestycjach klient chce rzędu wielkości przed rozmową. Bez tego wielu w ogóle nie zadzwoni.' },
      { t: 'Certyfikaty i gwarancja', d: 'Uprawnienia, autoryzacje producentów, warunki gwarancji i serwisu. Przy inwestycji na kilkanaście lat to rozstrzyga wybór.' },
    ],
    searchIntent: [
      'Awarie to frazy pilne i lokalne: „hydraulik Myślenice", „awaria pieca Kalwaria". Tu liczy się wyłącznie widoczność i szybki kontakt.',
      'Inwestycje to frazy informacyjne: „ile kosztuje pompa ciepła", „fotowoltaika czy się opłaca", „dofinansowanie 2026". Odpowiadając na nie treścią, zdobywacie klienta, zanim zacznie porównywać oferty.',
      'Połączenie usługi z miejscowością na osobnych podstronach daje kilkanaście niezależnych wejść z Google zamiast jednego.',
    ],
    faq: [
      {
        q: 'Czy warto podawać ceny instalacji?',
        a: 'Warto podać widełki albo przykładową wycenę zrealizowanej instalacji z opisem zakresu. Klient szuka rzędu wielkości i jeśli go nie znajdzie, zadzwoni do kogoś, kto go podał. Dokładna wycena i tak wymaga oględzin, więc niczym się nie wiążecie.',
      },
      {
        q: 'Mam już wizytówkę Google — czy strona coś zmieni?',
        a: 'Wizytówka świetnie obsługuje awarie, bo pokazuje się na mapie i daje kliknięcie w telefon. Nie obsłuży jednak inwestycji, przy których klient czyta tygodniami — tam potrzeba treści, realizacji i konkretów. Najlepiej działa jedno z drugim: wizytówka ściąga pilne telefony, strona buduje zaufanie przy dużych zleceniach.',
      },
      {
        q: 'Ile trwa zrobienie takiej strony?',
        a: 'Prosta strona z kontaktem, obszarem działania i opisem usług — zwykle dwa do czterech tygodni. Rozbudowany serwis z osobnymi podstronami dla każdej usługi, kalkulatorem i katalogiem realizacji — cztery do ośmiu tygodni. Największym hamulcem bywa zebranie zdjęć wykonanych instalacji.',
      },
      {
        q: 'Nie mam czasu na prowadzenie strony. To problem?',
        a: 'Nie. Strona instalatora nie wymaga cotygodniowej pracy — treści usługowe zostają aktualne latami. Wystarczy dorzucać zdjęcia większych realizacji, choćby raz na kwartał. Jeśli nie chcecie robić nawet tego, przejmujemy to w ramach opieki technicznej.',
      },
    ],
  },

  /* ────────────────────────────────────────────── WARSZTAT SAMOCHODOWY */
  {
    slug: 'warsztatu-samochodowego',
    label: 'Warsztaty i usługi motoryzacyjne',
    forWhom: 'warsztatu samochodowego',
    metaTitle: 'Strona dla warsztatu samochodowego | CtrlZ Studio',
    description:
      'Strony dla warsztatów, serwisów i wulkanizacji. Zapisy na wizytę, cennik usług, specjalizacje marek i pozycjonowanie na frazy lokalne.',
    h1: ['Strony internetowe', 'dla warsztatu samochodowego'],
    chips: ['Zapisy na wizytę', 'Cennik usług', 'Specjalizacje marek'],
    lead:
      'Warsztat wygrywa zaufaniem, bo klient z zasady zakłada, że zostanie naciągnięty. ' +
      'Strona, która wprost mówi, co ile kosztuje i w czym się specjalizujecie, rozbraja tę obawę, zanim ktokolwiek podjedzie.',
    problems: [
      {
        t: 'Brak jakiegokolwiek cennika',
        d: 'Wymiana oleju, klocki, przegląd — to usługi powtarzalne i klient chce znać cenę z góry. Warsztat, który ją podaje, od razu wygląda uczciwiej od tego, który każe dzwonić.',
      },
      {
        t: 'Niewidoczna specjalizacja',
        d: 'Jeśli robicie głównie diesle albo konkretne marki, to jest Wasza największa przewaga. Ukryta w akapicie „kompleksowe usługi" nie przyciąga nikogo i nie pozycjonuje się na nic.',
      },
      {
        t: 'Zapisy tylko telefonicznie',
        d: 'Sporo osób wolałoby umówić się wieczorem przez formularz zamiast dzwonić w godzinach pracy z hałaśliwego biura. Bez tej opcji część klientów po prostu nie wraca.',
      },
    ],
    why: [
      'Motoryzacja to branża, w której klient przychodzi z gotowym podejrzeniem, że zapłaci za coś, czego nie potrzebował. Wszystko, co tę obawę zmniejsza — jawny cennik, opis procedury, zdjęcia warsztatu, imiona mechaników — działa mocniej niż jakiekolwiek hasło reklamowe.',
      'Druga rzecz to specjalizacja. Warsztat „od wszystkiego" konkuruje wyłącznie ceną. Warsztat opisany jako serwis konkretnych marek albo konkretnych układów przyciąga klientów, którzy szukają dokładnie tego i są gotowi zapłacić więcej za pewność.',
      'Trzecia to obsługa zapytań, które ludzie faktycznie wpisują. Nikt nie szuka „usług mechanicznych" — ludzie szukają „wymiana rozrządu cena", „diagnostyka komputerowa Myślenice", „geometria kół Skawina". Każde z takich zapytań może mieć na stronie swoje miejsce.',
    ],
    musts: [
      { t: 'Cennik usług powtarzalnych', d: 'Olej, klocki, przegląd, geometria. Jawna cena buduje zaufanie szybciej niż cokolwiek innego na stronie.' },
      { t: 'Wyraźna specjalizacja', d: 'Marki, typy silników, konkretne układy. To jest powód, dla którego klient wybierze Was zamiast najbliższego warsztatu.' },
      { t: 'Zapisy przez formularz', d: 'Wybór usługi, marka i model, preferowany termin. Pozwala przygotować części przed wizytą i skraca postój auta.' },
      { t: 'Zdjęcia warsztatu i zespołu', d: 'Czysty warsztat i twarze mechaników robią różnicę. Klient zostawia auto ludziom, nie firmie.' },
      { t: 'Opinie klientów', d: 'W tej branży opinie ważą wyjątkowo dużo, bo wybiera się między warsztatami, których jakości nie da się ocenić z zewnątrz.' },
      { t: 'Godziny, dojazd, auto zastępcze', d: 'Praktyczne informacje, o które klienci dzwonią najczęściej. Odpowiedzcie na nie na stronie, a telefon zwolni się na realne zapisy.' },
    ],
    searchIntent: [
      'Frazy usługowo-lokalne: „mechanik Sułkowice", „wymiana rozrządu Wadowice", „diagnostyka komputerowa Myślenice". Krótkie, konkretne, z wysoką intencją.',
      'Frazy cenowe — „wymiana sprzęgła cena", „ile kosztuje geometria" — obsłużone jawnym cennikiem przyciągają ruch, którego konkurencja nie zbiera.',
      'Specjalizacja markowa to osobna, bardzo wartościowa grupa zapytań — klienci konkretnych marek szukają serwisu, który się w nich orientuje.',
    ],
    faq: [
      {
        q: 'Czy podawanie cen nie zniechęci klientów?',
        a: 'W tej branży działa odwrotnie. Klient zakłada najgorsze, więc brak ceny czyta jako „będzie drogo". Jawny cennik usług powtarzalnych — olej, klocki, przegląd — buduje wrażenie uczciwości i przyciąga osoby, które porównują właśnie w ten sposób. Prace nietypowe zawsze można zostawić do indywidualnej wyceny.',
      },
      {
        q: 'Czy warto opisywać marki, w których się specjalizujemy?',
        a: 'Zdecydowanie. To jedna z najlepiej działających rzeczy na stronie warsztatu. Klient konkretnej marki celowo szuka serwisu, który zna jej typowe usterki, i chętnie pojedzie dalej niż do najbliższego warsztatu. To także zapytania o wyraźnie niższej konkurencji niż ogólne „mechanik".',
      },
      {
        q: 'Czy potrzebuję systemu zapisów online?',
        a: 'Na start wystarczy formularz z wyborem usługi, marką i preferowanym terminem — zgłoszenie potwierdzacie telefonicznie. Pełny system z kalendarzem stanowisk ma sens dopiero przy większym serwisie z kilkoma podnośnikami i stałym obłożeniem.',
      },
      {
        q: 'Mam komplet klientów. Po co mi strona?',
        a: 'Po to, żeby mieć wpływ na to, jakich klientów przyjmujecie. Warsztat bez strony bierze to, co przyjdzie, i konkuruje ceną. Warsztat, który opisał specjalizację i podał cennik, przyciąga klientów szukających konkretnie tego, co robicie najlepiej — a to zwykle także ci, którzy nie targują się o każdą stówę.',
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
