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
  /** Realizacje z tej branży — najmocniejszy dowód na podstronie branżowej.
   *  Dodawaj TYLKO projekty, które naprawdę są z tej branży. */
  projects?: { slug: string; name: string; note: string }[];
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
  /* ────────────────────────────────────────────────── BIURO RACHUNKOWE */
  {
    slug: 'biura-rachunkowego',
    label: 'Biura rachunkowe i księgowi',
    forWhom: 'biura rachunkowego',
    metaTitle: 'Strona dla biura rachunkowego | CtrlZ Studio',
    description:
      'Strony dla biur rachunkowych i księgowych. Kalkulator kosztu obsługi, podział na formy działalności i formularz, który odsiewa zapytania nie z Waszej półki.',
    h1: ['Strony internetowe', 'dla biura rachunkowego'],
    chips: ['Kalkulator kosztu obsługi', 'Podział wg formy działalności', 'Bezpieczne przesyłanie dokumentów'],
    lead:
      'Klient biura rachunkowego prawie nigdy nie zmienia księgowego z ciekawości — robi to, ' +
      'bo poprzedni zawiódł albo bo właśnie zakłada firmę. W obu przypadkach szuka jednej rzeczy: ' +
      'pewności, że trafił do kogoś, kto ogarnia. Strona ma to udowodnić w kilkanaście sekund.',
    problems: [
      {
        t: 'Ta sama oferta dla JDG i dla spółki z o.o.',
        d: 'Jednoosobowa działalność i spółka to dwa różne zakresy, dwie różne ceny i dwa różne poziomy niepokoju klienta. Wspólna podstrona „Oferta" nie odpowiada dobrze żadnemu z nich.',
      },
      {
        t: 'Cennik ukryty za „wycena indywidualna"',
        d: 'To akurat branża, w której klient porównuje ceny w pierwszej kolejności — bo usługa jest dla niego nieodróżnialna. Brak jakiejkolwiek widełki oznacza, że porówna kogoś innego.',
      },
      {
        t: 'Zero informacji, kto właściwie prowadzi biuro',
        d: 'Powierza się komuś dostęp do wszystkich liczb w firmie. Strona bez nazwiska, zdjęcia i numeru uprawnień każe zaufać anonimowej firmie — a konkurencja obok pokazuje twarz.',
      },
    ],
    why: [
      'Księgowość sprzedaje się zaufaniem i konkretem, nie estetyką. Dlatego strukturę budujemy wokół pytań, które klient i tak zada w pierwszym mailu: ile to kosztuje przy mojej skali, co dokładnie robicie w tej cenie, kto to poprowadzi i jak wygląda przekazanie dokumentów.',
      'Najmocniejszym elementem takiej strony jest zwykle kalkulator kosztu obsługi. Klient podaje formę działalności, liczbę dokumentów i liczbę pracowników, a dostaje kwotę. Zapytanie, które przychodzi po takim kalkulatorze, jest już wstępnie zakwalifikowane — wiecie, z kim rozmawiacie, zanim odbierzecie telefon.',
      'Wiemy, jak to zbudować, bo już to zrobiliśmy: dla biura Księgowość Online 365 postawiliśmy landing z kalkulatorem kosztu księgowości i integracją z zewnętrznym systemem cenowym.',
    ],
    musts: [
      { t: 'Osobne ścieżki dla JDG, spółki i pełnej księgowości', d: 'Trzy podstrony zamiast jednej — każda z własnym zakresem, ceną i przykładem. To także trzy niezależne wejścia z Google.' },
      { t: 'Kalkulator kosztu obsługi', d: 'Forma działalności, liczba dokumentów, liczba pracowników, VAT tak/nie. Klient dostaje kwotę, Wy dostajecie zakwalifikowane zapytanie.' },
      { t: 'Zespół z imienia i nazwiska', d: 'Kto prowadzi biuro, jakie ma uprawnienia i doświadczenie. W usłudze opartej na zaufaniu to nie jest ozdobnik, tylko główny argument.' },
      { t: 'Opis przejścia od poprzedniego biura', d: 'Największa obawa przy zmianie księgowego to chaos w dokumentach. Rozpisany krok po kroku proces przejęcia zdejmuje ją skuteczniej niż jakiekolwiek zapewnienie.' },
      { t: 'Bezpieczny kanał na dokumenty', d: 'Nie załącznik do maila. Panel klienta albo szyfrowane przesyłanie plików — przy danych finansowych to również kwestia zgodności z RODO.' },
      { t: 'Aktualności o zmianach w przepisach', d: 'Krótkie wpisy o zmianach w podatkach robią dwie rzeczy naraz: pokazują, że jesteście na bieżąco, i przyciągają ruch z wyszukiwarki przez cały rok.' },
    ],
    searchIntent: [
      'Fraza „biuro rachunkowe" z nazwą miejscowości to podstawa — decyzja o wyborze księgowego zapada niemal wyłącznie lokalnie, mimo że usługę da się świadczyć zdalnie.',
      'Zapytania problemowe typu „ile kosztuje księgowość dla jednoosobowej działalności" przyciągają osoby dokładnie w momencie zakładania firmy, czyli wtedy, gdy szukają biura.',
      'Wpisy o zmianach w przepisach dają stały ruch przez cały rok i budują wizerunek biura, które nadąża — a to jest dokładnie ta cecha, której klient szuka.',
    ],
    faq: [
      {
        q: 'Czy kalkulator kosztu obsługi nie odstraszy klientów ceną?',
        a: 'Odstraszy tych, dla których jesteście za drodzy — i to jest korzyść, nie strata. Zapytania, które zostają, pochodzą od osób akceptujących poziom cen, więc rozmowa zaczyna się od zakresu, a nie od negocjacji. Przy biurze rachunkowym to zwykle najlepiej zwracający się element strony.',
      },
      {
        q: 'Mamy klientów z polecenia i nie potrzebujemy strony. Czy to się zmieni?',
        a: 'Polecenia i tak trafiają na stronę — ktoś dostaje Wasz numer i sprawdza, komu ma powierzyć dokumenty. Strona nie zastępuje polecenia, tylko decyduje, czy polecenie zamieni się w telefon. Przy usłudze opartej na zaufaniu to bywa cała różnica.',
      },
      {
        q: 'Czy da się bezpiecznie przyjmować dokumenty przez stronę?',
        a: 'Tak, i to na kilka sposobów — od formularza z szyfrowanym przesyłaniem plików po panel klienta z logowaniem. Przy dokumentach finansowych ma to znaczenie także formalne: przesyłanie skanów zwykłym mailem jest trudne do obrony przy RODO.',
      },
      {
        q: 'Czy warto pisać o zmianach w przepisach?',
        a: 'To jedna z niewielu branż, w której blog realnie się opłaca. Przepisy zmieniają się co roku, przedsiębiorcy szukają wyjaśnień, a tekst napisany przez księgowego wygrywa z ogólnikami. Wystarczy jeden solidny wpis miesięcznie.',
      },
    ],
    posts: [
      { slug: 'strona-nie-przynosi-klientow-7-powodow', title: 'Strona nie przynosi klientów — 7 powodów' },
    ],
    projects: [
      { slug: 'ksiegowosc-online-365', name: 'Księgowość Online 365', note: 'Landing biura rachunkowego z kalkulatorem kosztu księgowości i integracją z zewnętrznym systemem cenowym.' },
    ],
  },

  /* ─────────────────────────────────────────────── SIŁOWNIA I KLUB FITNESS */
  {
    slug: 'silowni-i-klubu-fitness',
    label: 'Siłownie i kluby fitness',
    forWhom: 'siłowni i klubu fitness',
    metaTitle: 'Strona dla siłowni i klubu fitness | CtrlZ Studio',
    description:
      'Strony dla siłowni, klubów fitness i studiów treningowych. Grafik zajęć, cennik karnetów, zapis na trening próbny i wersja mobilna, z której się korzysta.',
    h1: ['Strony internetowe', 'dla siłowni i klubu fitness'],
    chips: ['Grafik zajęć', 'Cennik karnetów', 'Zapis na trening próbny'],
    lead:
      'Siłownia sprzedaje coś, czego nie da się pokazać zdjęciem sprzętu — atmosferę i ludzi, ' +
      'którzy tam trenują. Do tego dochodzi rzecz przyziemna: ktoś stoi przed wejściem i sprawdza ' +
      'na telefonie, czy dziś jest jeszcze trening. Strona musi obsłużyć oba te momenty.',
    problems: [
      {
        t: 'Grafik zajęć jako plik PDF',
        d: 'Najczęstszy błąd w tej branży. Na telefonie otwiera się w osobnej aplikacji, jest nieczytelny, a po zmianie godzin przez tydzień wisi nieaktualny. Grafik musi być zwykłą treścią na stronie.',
      },
      {
        t: 'Cennik karnetów, którego nie ma',
        d: 'Cena karnetu to pierwsza rzecz, jakiej szuka ktoś porównujący dwa kluby. Odesłanie po nią do recepcji oznacza, że porówna dwa inne kluby.',
      },
      {
        t: 'Zdjęcia pustej siłowni o poranku',
        d: 'Klub bez ludzi wygląda jak klub, do którego nikt nie chodzi. Zdjęcia z treningu, z twarzami i wysiłkiem, sprzedają miejsce, którego ktoś chce być częścią.',
      },
    ],
    why: [
      'Decyzja o zapisaniu się na siłownię prawie zawsze zapada w telefonie i prawie zawsze wieczorem. Dlatego wersję mobilną projektujemy pierwszą, a nie jako wariant — grafik, cennik i numer telefonu muszą być dostępne w dwóch dotknięciach.',
      'Drugi element to konwersja przez próg wejścia. Mało kto kupuje karnet roczny z marszu; dużo więcej osób przyjdzie na jeden trening próbny. Strona, która ma wyłącznie przycisk „Kup karnet", pomija większość zainteresowanych.',
      'Robiliśmy to dla Dziki Gym — siłowni na krakowskim Ruczaju z ofertą kickboxingu, Krav Magi i treningów personalnych. Przeprojektowaliśmy wersję mobilną od podstaw właśnie dlatego, że to z niej korzystali wszyscy.',
    ],
    musts: [
      { t: 'Grafik zajęć jako treść, nie PDF', d: 'Aktualizowany z panelu, czytelny na telefonie, z podziałem na dni i rodzaje zajęć. Zmiana godziny musi zajmować minutę, nie wizytę u informatyka.' },
      { t: 'Cennik wszystkich wariantów', d: 'Karnet miesięczny, kwartalny, open, wejście jednorazowe, trening personalny. Bez tego nie da się porównać oferty, a klient porównuje zawsze.' },
      { t: 'Zapis na trening próbny', d: 'Najniższy próg wejścia i najskuteczniejszy sposób na pierwszy kontakt. Formularz z wyborem dnia i rodzaju zajęć zamiast „zadzwoń do nas".' },
      { t: 'Sylwetki trenerów', d: 'Ludzie wybierają klub także dla konkretnego trenera. Krótki opis specjalizacji i doświadczenia każdego z nich to realny argument sprzedażowy.' },
      { t: 'Osobne podstrony dla rodzajów zajęć', d: 'Kickboxing, personalne, zajęcia grupowe — każde ze swoją podstroną i frazą. „Kickboxing Kraków" to zupełnie inne zapytanie niż „siłownia Kraków".' },
      { t: 'Zdjęcia z prawdziwych treningów', d: 'Nie stocki i nie puste hale. Klub sprzedaje społeczność, więc trzeba ją pokazać.' },
    ],
    searchIntent: [
      'Fraza z dzielnicą, nie tylko z miastem — „siłownia Ruczaj", „fitness Podgórze". Nikt nie jeździ przez całe miasto na trening, więc zapytania są hiperlokalne.',
      'Rodzaj zajęć plus miasto — „kickboxing Kraków", „trening personalny Wieliczka" — to zapytania z wyraźnie wyższą intencją niż samo słowo „siłownia".',
      'Wizytówka Google z aktualnymi godzinami i zdjęciami odpowiada za dużą część kontaktu w tej branży; przy zapytaniach typu „siłownia w pobliżu" mapa jest pierwszym, co widzi klient.',
    ],
    faq: [
      {
        q: 'Czy da się połączyć stronę z systemem karnetów?',
        a: 'Zwykle tak. Popularne systemy do obsługi klubów udostępniają możliwość osadzenia grafiku albo zapisów na stronie, część ma też API do sprawdzania dostępności miejsc. Powiedzcie, z czego korzystacie, a sprawdzimy zakres integracji przed wyceną.',
      },
      {
        q: 'Mamy aktywny Instagram i Facebooka. Po co nam strona?',
        a: 'Social media pokazują atmosferę i to robią dobrze. Nie odpowiadają natomiast na pytanie o cenę karnetu ani o godzinę zajęć — a to są dwie rzeczy, których szuka ktoś decydujący się na klub. Poza tym profil nie pojawia się w Google, gdy ktoś wpisuje „siłownia" z nazwą dzielnicy.',
      },
      {
        q: 'Jak często trzeba aktualizować grafik?',
        a: 'Tak często, jak się zmienia — i właśnie dlatego musi być edytowalny przez Was, bez naszego udziału. Budujemy to tak, żeby zmiana godziny zajęć zajmowała chwilę w panelu. Nieaktualny grafik szkodzi bardziej niż jego brak.',
      },
      {
        q: 'Czy warto podawać ceny karnetów?',
        a: 'Tak. To branża, w której klient porównuje dwa–trzy kluby w okolicy i robi to wyłącznie po cenie i grafiku. Brak cennika oznacza wypadnięcie z porównania jeszcze przed pierwszym kontaktem.',
      },
    ],
    posts: [
      { slug: 'dlaczego-szybka-strona-sprzedaje', title: 'Dlaczego szybka strona sprzedaje' },
    ],
    projects: [
      { slug: 'dziki-gym', name: 'Dziki Gym — Kraków Ruczaj', note: 'Redesign siłowni z ofertą kickboxingu i Krav Magi. Wersja mobilna przeprojektowana od podstaw — to z niej korzystali wszyscy.' },
    ],
  },

  /* ──────────────────────────────────────── STOLARZ I PRODUCENT MEBLI */
  {
    slug: 'stolarza-i-producenta-mebli',
    label: 'Stolarze i producenci mebli',
    forWhom: 'stolarza i producenta mebli',
    metaTitle: 'Strona dla stolarza i producenta mebli | CtrlZ Studio',
    description:
      'Strony dla stolarzy, producentów mebli na wymiar i firm wykończeniowych. Katalog realizacji, materiały, terminy i wycena z rysunku lub wymiarów.',
    h1: ['Strony internetowe', 'dla stolarza i producenta mebli'],
    chips: ['Katalog realizacji', 'Zapytanie z rysunkiem', 'Materiały i wykończenia'],
    lead:
      'Meble na wymiar kupuje się oczami, ale zamawia dopiero po rozwianiu trzech wątpliwości: ' +
      'ile to potrwa, ile będzie kosztować i czy wykonawca robił już coś podobnego. ' +
      'Strona, która pokazuje wyłącznie ładne zdjęcia, obsługuje jedną trzecią tej decyzji.',
    problems: [
      {
        t: 'Realizacje bez opisu, czym właściwie są',
        d: 'Zdjęcie kuchni bez informacji o materiale, froncie, blacie i czasie realizacji jest ozdobą. Klient nie umie przełożyć go na własne mieszkanie, więc nie pyta.',
      },
      {
        t: 'Brak jakiegokolwiek punktu zaczepienia cenowego',
        d: 'Przy meblach na wymiar dokładna cena rzeczywiście zależy od projektu — ale „od ilu zaczynamy przy zabudowie kuchennej" da się podać. Bez tego zapytania przychodzą od osób z budżetem z innej ligi.',
      },
      {
        t: 'Formularz bez możliwości załączenia rysunku',
        d: 'Klient ma zdjęcie pomieszczenia albo projekt od architekta. Jeśli nie może go dołączyć, wysyła maila zamiast formularza — albo nie wysyła nic.',
      },
    ],
    why: [
      'Ta branża ma najkrótszą drogę od dobrej strony do zapytania, bo produkt jest wizualny, a konkurencja w internecie zaskakująco słaba. Większość warsztatów stolarskich w Małopolsce nie ma strony w ogóle albo ma jedną podstronę z numerem telefonu.',
      'Katalog realizacji budujemy tak, żeby każda z nich była osobną podstroną z własnym adresem: co to było, z jakiego materiału, jak długo trwało, jakie było wyzwanie. To jednocześnie portfolio i treść, która pozycjonuje się na frazy typu „zabudowa kuchenna na wymiar" z nazwą miejscowości.',
      'Realizowaliśmy to dla Beskid Stolarstwo z Andrychowa — firmy sprzedającej okna, drzwi, panele i akcesoria, gdzie katalog produktowy musiał współistnieć z prezentacją usług wykończeniowych.',
    ],
    musts: [
      { t: 'Realizacje jako osobne podstrony', d: 'Każda z opisem materiału, zakresu i czasu realizacji. Jedna dobrze opisana zabudowa działa lepiej niż galeria trzydziestu zdjęć bez podpisów.' },
      { t: 'Podział na typy zleceń', d: 'Kuchnie, szafy wnękowe, meble łazienkowe, schody, wyposażenie lokali. Osobne sekcje z własnymi frazami zamiast wspólnej „Oferty".' },
      { t: 'Formularz z załącznikiem', d: 'Możliwość dołączenia zdjęcia pomieszczenia, wymiarów albo projektu od architekta. To skraca wycenę o kilka wiadomości.' },
      { t: 'Widełki albo cena od', d: 'Choćby orientacyjne „zabudowa kuchenna od…". Odsiewa zapytania, których i tak nie przyjmiecie, i buduje wiarygodność.' },
      { t: 'Materiały i wykończenia', d: 'Płyta, fornir, lite drewno, rodzaje frontów i okuć. Klient, który rozumie różnicę, łatwiej akceptuje wyższą cenę.' },
      { t: 'Realny czas realizacji', d: 'Termin jest w tej branży argumentem równie mocnym jak cena — zwłaszcza gdy konkurencja mówi wymijająco.' },
    ],
    searchIntent: [
      'Typ mebla plus miejscowość — „meble na wymiar Wadowice", „zabudowa kuchenna Kalwaria" — to zapytania z bardzo wysoką intencją i niską konkurencją poza dużymi miastami.',
      'Zapytania materiałowe („szafa wnękowa z lustrem", „kuchnia z frontami lakierowanymi") przyciągają osoby na etapie projektowania, czyli tuż przed zamówieniem.',
      'Wizytówka Google ze zdjęciami ostatnich realizacji jest w stolarce wyjątkowo skuteczna, bo klienci szukają wykonawcy „w pobliżu" i oceniają go po zdjęciach.',
    ],
    faq: [
      {
        q: 'Nie chcę podawać cen, bo każde zlecenie jest inne. Co zamiast?',
        a: 'Widełki albo cena od, liczona dla typowego zakresu — na przykład „zabudowa kuchenna od X zł za metr bieżący, w zależności od materiału i okuć". To nie jest zobowiązanie, tylko filtr. Bez niego większość zapytań pochodzi od osób, dla których jesteście za drodzy, i tracicie czas na wyceny bez szans.',
      },
      {
        q: 'Czy warto pokazywać realizacje, skoro każda jest jednorazowa?',
        a: 'To najmocniejszy element takiej strony. Klient nie kupuje mebla, który widzi na zdjęciu — kupuje pewność, że umiecie zrobić coś podobnego u niego. Dlatego liczy się opis: jaki był problem, jak go rozwiązaliście, ile to trwało.',
      },
      {
        q: 'Czy da się przyjmować wymiary i projekty przez stronę?',
        a: 'Tak, formularz może przyjmować załączniki — zdjęcia pomieszczenia, wymiary, projekt od architekta. W praktyce skraca to wycenę o kilka wiadomości, bo od razu widzicie, o czym mowa.',
      },
      {
        q: 'Prowadzę mały warsztat. Czy strona nie jest przesadą?',
        a: 'Przy stolarce jest odwrotnie niż w większości branż: im mniejsza firma, tym większa różnica. Duzi producenci mebli mają strony i wychodzą w wyszukiwarce, a lokalny stolarz często nie istnieje w internecie — mimo że robi lepszą robotę. Wystarczy kilka dobrze opisanych realizacji, żeby to odwrócić.',
      },
    ],
    projects: [
      { slug: 'beskid-stolarstwo', name: 'Beskid Stolarstwo — Andrychów', note: 'Okna, drzwi, panele i akcesoria — katalog produktowy współistniejący z prezentacją usług wykończeniowych.' },
    ],
  },

  /* ───────────────────────────────────────────────── FIRMA PRODUKCYJNA */
  {
    slug: 'firmy-produkcyjnej',
    label: 'Firmy produkcyjne',
    forWhom: 'firmy produkcyjnej',
    metaTitle: 'Strona dla firmy produkcyjnej | CtrlZ Studio',
    description:
      'Strony dla producentów i podwykonawców przemysłowych. Możliwości techniczne, park maszynowy, certyfikaty i zapytanie ofertowe z dokumentacją w załączniku.',
    h1: ['Strony internetowe', 'dla firmy produkcyjnej'],
    chips: ['Możliwości techniczne', 'Zapytanie ofertowe z rysunkiem', 'Certyfikaty i normy'],
    lead:
      'Po stronie producenta klientem nie jest konsument, tylko technolog albo kupiec, ' +
      'który ma na biurku rysunek i szuka kogoś, kto to wykona. Nie interesuje go, ' +
      'że jesteście firmą z tradycjami — interesuje go tolerancja, materiał i czy przyjmiecie tę serię.',
    problems: [
      {
        t: 'Strona mówi o wartościach zamiast o możliwościach',
        d: 'Zdjęcie hali i akapit o pasji nie odpowiadają na jedyne pytanie, jakie ma kupiec: czy da się u Was zrobić dokładnie to. Konkretne parametry są w tej branży ważniejsze niż cokolwiek innego.',
      },
      {
        t: 'Brak informacji o parku maszynowym',
        d: 'Lista maszyn z zakresami obróbki to dla technologa najważniejsza treść na stronie. Jej brak oznacza telefon z pytaniem — albo, częściej, telefon do kogoś innego.',
      },
      {
        t: 'Formularz kontaktowy bez załącznika',
        d: 'Zapytanie ofertowe zaczyna się od rysunku albo modelu. Formularz z polem „wiadomość" wymusza wysyłkę mailem, co wydłuża drogę i gubi część zapytań.',
      },
    ],
    why: [
      'Sprzedaż przemysłowa jest długa i wielostopniowa, ale zaczyna się dziś prawie zawsze od wyszukiwarki — także wtedy, gdy kończy się targami i spotkaniem. Strona jest pierwszym filtrem: albo kupiec uzna, że nadajecie się do zapytania, albo zamknie kartę.',
      'Dlatego strukturę budujemy wokół możliwości technicznych: rodzaje obróbki, obsługiwane materiały, zakresy wymiarowe, wielkości serii, certyfikaty i normy. To brzmi sucho i właśnie o to chodzi — ten klient szuka faktów, nie narracji.',
      'Wiemy, jak wygląda ta rozmowa, bo prowadziliśmy ją przy Konieczny Konstrukcje — producencie wiat i konstrukcji, gdzie wdrożyliśmy interaktywne modele 3D obracane bezpośrednio w przeglądarce, żeby klient rozumiał konstrukcję, zanim zapyta o wycenę.',
    ],
    musts: [
      { t: 'Możliwości techniczne w liczbach', d: 'Rodzaje obróbki, zakresy wymiarowe, tolerancje, obsługiwane materiały, minimalne i maksymalne serie. To jest najważniejsza podstrona w całym serwisie.' },
      { t: 'Park maszynowy', d: 'Lista maszyn z parametrami. Dla technologa to dowód, że zlecenie da się u Was wykonać — mocniejszy niż jakiekolwiek zapewnienie.' },
      { t: 'Zapytanie ofertowe z załącznikiem', d: 'Formularz przyjmujący rysunki, modele i dokumentację, z polem na wielkość serii i oczekiwany termin.' },
      { t: 'Certyfikaty i normy', d: 'ISO, dopuszczenia branżowe, atesty materiałowe. W części zamówień to warunek wstępny, bez którego nie ma nawet rozmowy.' },
      { t: 'Realizacje z opisem wyzwania', d: 'Nie nazwy klientów, jeśli obowiązuje poufność — wystarczy branża, problem techniczny i sposób jego rozwiązania.' },
      { t: 'Wersja angielska, jeśli eksportujecie', d: 'Przy sprzedaży zagranicznej to warunek istnienia w wyszukiwarce partnera. Opisaliśmy to osobno na stronie o stronach wielojęzycznych.' },
    ],
    searchIntent: [
      'Frazy usługowo-techniczne — „gięcie blachy na zamówienie", „obróbka CNC podwykonawstwo" — mają niewielki wolumen, ale bardzo wysoką wartość pojedynczego zapytania.',
      'Zapytania z nazwą materiału albo technologii przyciągają technologów szukających konkretnej kompetencji, a nie firmy w ogóle.',
      'Przy eksporcie osobne wersje językowe są warunkiem widoczności — niemiecki kupiec nie wpisze zapytania po polsku.',
    ],
    faq: [
      {
        q: 'Sprzedajemy przez handlowców i targi. Czy strona coś zmieni?',
        a: 'Zmieni to, co dzieje się po pierwszym kontakcie. Kupiec, który dostał wizytówkę na targach, sprawdza firmę w internecie przed przekazaniem zapytania dalej — i to, co znajdzie, decyduje, czy trafi ono do Was, czy do konkurenta z lepiej opisanymi możliwościami. Strona nie zastępuje handlowca, tylko przestaje mu przeszkadzać.',
      },
      {
        q: 'Nie możemy podawać nazw klientów. Da się bez tego pokazać doświadczenie?',
        a: 'Tak i to standard w tej branży. Zamiast nazwy piszemy o branży, problemie technicznym i rozwiązaniu: „producent AGD, seria 20 tysięcy sztuk, tolerancja X". Dla technologa to jest właśnie ta informacja, która się liczy — nazwa nie wnosi nic.',
      },
      {
        q: 'Czy warto pokazywać modele 3D produktów?',
        a: 'Przy konstrukcjach i produktach o nieoczywistej geometrii — zdecydowanie. Robiliśmy to dla producenta wiat: klient obraca model w przeglądarce i rozumie budowę bez czytania opisu. Przy prostych detalach wystarczą dobre zdjęcia i rysunek techniczny.',
      },
      {
        q: 'Ile treści potrzebuje taka strona?',
        a: 'Mniej, niż się wydaje, ale gęściej. Kilkanaście podstron opisujących konkretne kompetencje działa lepiej niż pięćdziesiąt ogólników. Kluczowa jest jedna: możliwości techniczne rozpisane na parametry.',
      },
    ],
    projects: [
      { slug: 'konieczny-konstrukcje', name: 'Konieczny Konstrukcje', note: 'Producent wiat i pergoli premium z interaktywnymi modelami 3D obracanymi bezpośrednio w przeglądarce.' },
      { slug: 'modeka', name: 'Modeka — platforma B2B', note: 'Producent odzieży motocyklowej: katalog ponad tysiąca produktów na cztery rynki z osobnymi cennikami i mapą dealerów.' },
    ],
  },

  /* ──────────────────────────────────────────── RESTAURACJA I GASTRONOMIA */
  {
    slug: 'restauracji',
    label: 'Restauracje i gastronomia',
    forWhom: 'restauracji',
    metaTitle: 'Strona dla restauracji i lokalu | CtrlZ Studio',
    description:
      'Strony dla restauracji, pizzerii i kawiarni. Menu edytowalne z telefonu, rezerwacja stolika, godziny otwarcia widoczne od razu i dane strukturalne dla Google.',
    h1: ['Strony internetowe', 'dla restauracji'],
    chips: ['Menu bez PDF-a', 'Rezerwacja stolika', 'Godziny otwarcia od razu'],
    lead:
      'Stronę restauracji ogląda się prawie zawsze w biegu — w samochodzie, na przystanku, ' +
      'kwadrans przed decyzją, gdzie zjeść. Klient sprawdza trzy rzeczy: co macie, ' +
      'czy jest otwarte i jak dojechać. Wszystko inne jest dodatkiem.',
    problems: [
      {
        t: 'Menu wrzucone jako PDF albo zdjęcie kartki',
        d: 'Absolutny numer jeden w tej branży. Na telefonie trzeba je pobrać, powiększać i przewijać na boki. Połowa osób rezygnuje w tym momencie, a Google nie widzi z tego menu ani jednego dania.',
      },
      {
        t: 'Godziny otwarcia nieaktualne albo ukryte w stopce',
        d: 'Najczęstszy powód irytacji klienta i najłatwiejszy do usunięcia. Godziny powinny być widoczne od razu, z informacją o dniach świątecznych, i zgodne z tym, co pokazuje wizytówka Google.',
      },
      {
        t: 'Brak sposobu na rezerwację poza telefonem',
        d: 'Duża część rezerwacji powstaje wieczorem, gdy w lokalu jest największy ruch i nikt nie odbiera. Prosty formularz z datą, godziną i liczbą osób przechwytuje te zgłoszenia.',
      },
    ],
    why: [
      'Gastronomia to jedna z niewielu branż, w której wizytówka Google bywa ważniejsza od samej strony — ale obie muszą mówić to samo. Rozjazd godzin między stroną a mapą jest częstszy, niż się wydaje, i kosztuje realnych klientów.',
      'Menu traktujemy jako treść strony, nie załącznik. Dzięki temu da się je zmienić z telefonu w trzy minuty, a Google potrafi wyświetlić konkretne dania w wynikach — przy zapytaniach typu „pierogi" z nazwą miejscowości to zauważalna różnica.',
      'Osobno pilnujemy danych strukturalnych właściwych dla lokali gastronomicznych: rodzaj kuchni, przedział cenowy, godziny, oceny. To one odpowiadają za to, co widać w wynikach jeszcze przed kliknięciem.',
    ],
    musts: [
      { t: 'Menu jako normalna treść', d: 'Z podziałem na kategorie, z cenami i alergenami, edytowalne z telefonu. Zmiana ceny dania nie może wymagać kontaktu z kimkolwiek.' },
      { t: 'Godziny otwarcia nad zgięciem strony', d: 'Widoczne bez przewijania, z obsługą świąt i dni wolnych, spójne z wizytówką Google.' },
      { t: 'Rezerwacja stolika', d: 'Formularz z datą, godziną i liczbą osób albo integracja z systemem rezerwacji. Przechwytuje zgłoszenia wtedy, gdy nikt nie odbiera telefonu.' },
      { t: 'Zdjęcia własnych dań', d: 'Nie zdjęcia stockowe. To jedyna branża, w której klient dosłownie kupuje to, co widzi — a rozjazd między zdjęciem a talerzem kosztuje opinię.' },
      { t: 'Dane strukturalne dla lokalu', d: 'Kuchnia, przedział cenowy, godziny, menu. Decydują o tym, jak lokal prezentuje się w wynikach i na mapie.' },
      { t: 'Menu w drugim języku, jeśli macie ruch turystyczny', d: 'W okolicach Krakowa i Wieliczki to realna część klientów. Wystarczy sama karta, nie cały serwis.' },
    ],
    searchIntent: [
      'Zapytania „w pobliżu" i z nazwą miejscowości obsługuje przede wszystkim mapa — dlatego wizytówka Google i spójność danych są tu ważniejsze niż jakiekolwiek treści.',
      'Rodzaj kuchni plus miejscowość — „pizza Wadowice", „obiady domowe Skawina" — to zapytania z natychmiastową intencją, często sprzed decyzji o wyjściu z domu.',
      'Menu jako treść strony pozwala trafiać na zapytania o konkretne dania, czego PDF nie umożliwia w ogóle.',
    ],
    faq: [
      {
        q: 'Mamy Facebooka z aktualnym menu. Czy strona jest potrzebna?',
        a: 'Facebook obsługuje stałych gości, którzy Was już znają. Nie pojawia się natomiast wysoko przy zapytaniach typu „gdzie zjeść" z nazwą miejscowości, a to jest ruch od osób, które Was jeszcze nie znają — czyli od nowych klientów. Do tego menu w formie postu jest nie do znalezienia po dwóch tygodniach.',
      },
      {
        q: 'Menu zmienia się co tydzień. Kto będzie to aktualizował?',
        a: 'Wy, z telefonu, w kilka minut. Przy restauracjach to warunek konieczny — strona z nieaktualnym menu jest gorsza niż jej brak. Budujemy panel tak, żeby zmiana ceny albo dodanie dania nie wymagało niczyjej pomocy.',
      },
      {
        q: 'Czy potrzebujemy systemu rezerwacji, czy wystarczy formularz?',
        a: 'Przy lokalu do kilkunastu stolików formularz z powiadomieniem mailowym zwykle w zupełności wystarcza i jest znacznie tańszy w utrzymaniu. Rozbudowany system z kalendarzem miejsc ma sens przy większej skali albo gdy prowadzicie rezerwacje na wiele godzin naprzód.',
      },
      {
        q: 'Czy warto pokazywać ceny w menu na stronie?',
        a: 'Tak, i to bez wyjątku. Menu bez cen budzi podejrzenie, że są wysokie, i zmusza do telefonu, którego nikt nie wykona. To jedna z niewielu rzeczy w gastronomii, gdzie nie ma pola do dyskusji.',
      },
    ],
  },

  /* ────────────────────────────────────────────────── KANCELARIA PRAWNA */
  {
    slug: 'kancelarii-prawnej',
    label: 'Kancelarie prawne',
    forWhom: 'kancelarii prawnej',
    metaTitle: 'Strona dla kancelarii prawnej | CtrlZ Studio',
    description:
      'Strony dla kancelarii adwokackich i radcowskich. Specjalizacje jako osobne podstrony, jasne zasady wynagrodzenia i kontakt zgodny z zasadami etyki zawodowej.',
    h1: ['Strony internetowe', 'dla kancelarii prawnej'],
    chips: ['Specjalizacje osobno', 'Zasady wynagrodzenia', 'Bezpieczny kontakt'],
    lead:
      'Do prawnika trafia się w kłopocie i pod presją czasu. Klient nie porównuje kancelarii ' +
      'tygodniami — wybiera spośród dwóch albo trzech, które wyglądają kompetentnie ' +
      'i piszą o dokładnie tym problemie, który go dotyczy. Strona ma trafić w ten moment.',
    problems: [
      {
        t: 'Jedna podstrona „Zakres usług" z listą dwudziestu dziedzin',
        d: 'Klient z problemem rozwodowym widzi listę, na której rozwód sąsiaduje z prawem budowlanym i zamówieniami publicznymi. Wniosek: kancelaria robi wszystko, czyli nic konkretnie.',
      },
      {
        t: 'Język pisany do prawnika, nie do klienta',
        d: 'Osoba w kłopocie nie zna terminologii i nie chce jej poznawać. Opis, który zaczyna się od podstawy prawnej zamiast od sytuacji życiowej, nie zostaje przeczytany do końca.',
      },
      {
        t: 'Zero informacji o zasadach rozliczenia',
        d: 'Największa obawa klienta indywidualnego to nieprzewidywalny koszt. Nie chodzi o cennik — wystarczy wyjaśnić, jak rozliczacie: stawka godzinowa, ryczałt, czy pierwsza konsultacja jest płatna.',
      },
    ],
    why: [
      'Prawo jest jedną z branż, w których treść ma większe znaczenie niż projekt graficzny. Klient szuka nie „kancelarii", tylko odpowiedzi na swoje pytanie — i wybiera tego, kto tej odpowiedzi udzielił.',
      'Dlatego każdą specjalizację budujemy jako osobną podstronę napisaną językiem sytuacji, nie przepisów: co robić, gdy pracodawca nie płaci; jak wygląda rozwód z orzeczeniem o winie; co grozi za wykroczenie. To zarazem najlepsza treść pozycjonująca, jaką ta branża może mieć.',
      'Pilnujemy przy tym zasad etyki zawodowej — zarówno adwokatów, jak i radców prawnych obowiązują ograniczenia dotyczące informowania o działalności. Strona ma być skuteczna i jednocześnie nie narażać Was na zarzut niedozwolonej reklamy.',
    ],
    musts: [
      { t: 'Specjalizacja = osobna podstrona', d: 'Prawo rodzinne, karne, pracy, gospodarcze — każde z własnym adresem, opisem typowych spraw i wezwaniem do kontaktu. To także osobne wejścia z wyszukiwarki.' },
      { t: 'Sylwetki prawników', d: 'Imię, nazwisko, numer wpisu na listę, specjalizacja i doświadczenie. W tej branży to nie jest zakładka „O nas", tylko główny dowód kompetencji.' },
      { t: 'Wyjaśnione zasady wynagrodzenia', d: 'Nie cennik za sprawę, ale sposób rozliczenia: stawka godzinowa, ryczałt, success fee, czy pierwsza konsultacja jest płatna. Zdejmuje największą obawę klienta.' },
      { t: 'Treści pisane językiem klienta', d: 'Opis sytuacji zamiast podstawy prawnej. Klient wpisuje w Google „co zrobić, gdy", nie nazwę artykułu kodeksu.' },
      { t: 'Bezpieczny kanał kontaktu', d: 'Formularz z jasną informacją o poufności i przetwarzaniu danych. Przy sprawach wrażliwych to element budowania zaufania, nie formalność.' },
      { t: 'Zgodność z zasadami etyki zawodowej', d: 'Bez obietnic wyniku, bez rankingów skuteczności, bez porównań z innymi kancelariami. Skuteczna strona nie musi tego robić.' },
    ],
    searchIntent: [
      'Specjalizacja plus miejscowość — „adwokat rozwody Wadowice", „prawnik prawo pracy Kraków" — to zapytania z najwyższą intencją i realną szansą na pierwszą trójkę poza dużym miastem.',
      'Zapytania problemowe („co zrobić, gdy pracodawca nie wypłaca wynagrodzenia") przyciągają klienta wcześniej, na etapie szukania odpowiedzi, i budują zaufanie zanim zadzwoni.',
      'Wizytówka Google z adresem kancelarii ma znaczenie, bo część klientów szuka prawnika, do którego może przyjechać osobiście.',
    ],
    faq: [
      {
        q: 'Czy strona kancelarii nie narusza zakazu reklamy?',
        a: 'Informowanie o działalności jest dozwolone — ograniczenia dotyczą reklamy nachalnej, obietnic wyniku i porównań z innymi kancelariami. Budujemy strony w tej konwencji: rzeczowy opis specjalizacji, doświadczenia i zasad współpracy. Ostateczna ocena zgodności należy oczywiście do Was, bo to Wy odpowiadacie przed samorządem — dlatego treści zawsze przechodzą Waszą akceptację przed publikacją.',
      },
      {
        q: 'Czy podawać stawki?',
        a: 'Nie musicie podawać kwot za sprawę, ale warto wyjaśnić sposób rozliczenia i to, czy pierwsza konsultacja jest płatna. Klient indywidualny najbardziej boi się nieprzewidywalnego kosztu; samo wyjaśnienie mechanizmu zdejmuje dużą część tej obawy.',
      },
      {
        q: 'Czy blog prawniczy ma sens?',
        a: 'To jedna z najskuteczniejszych treści w tej branży, pod warunkiem że opisuje sytuacje, a nie przepisy. Tekst „co zrobić, gdy pracodawca nie płaci" przyciąga dokładnie tę osobę, która potrzebuje prawnika od prawa pracy. Jeden solidny tekst miesięcznie wystarczy.',
      },
      {
        q: 'Obsługujemy klientów z całej Polski. Czy strona lokalna ma sens?',
        a: 'Ma, bo konkurencja na frazy ogólnopolskie jest ogromna, a na lokalne — nieporównywalnie mniejsza. Zwykle budujemy to dwutorowo: podstrony specjalizacji pod frazy ogólne i treści lokalne pod miasto, w którym macie siedzibę. Ruch zdalny przychodzi z tych pierwszych, a najszybsze efekty dają drugie.',
      },
    ],
  },

];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
