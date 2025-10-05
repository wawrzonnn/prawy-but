# PREZENTACJA DLA JURY ZUS - LANDING PAGE

## Dokument przygotowawczy dla designera prezentacji

---

## 1. HERO SECTION - Pierwsze wrażenie (0:00-0:15 slajdów)

### Kluczowe elementy do pokazania:

**A. Główny przekaz (nagłówek):**

- "Sprawdź na jaką emeryturę dziś pracujesz"
- EMOCJA: Bezpośrednie pytanie, które budzi świadomość
- TRAFNOŚĆ: Hit w potrzebę użytkownika - każdy pracujący chce to wiedzieć

**B. Podtytuł value proposition:**

- "Twoja przyszła emerytura nie musi być zagadką! Zrozum system, poznaj liczby i przejmij kontrolę nad swoją finansową przyszłością."
- 3 obietnice: ZROZUM → POZNAJ → PRZEJMIJ KONTROLĘ

**C. Video demo kalkulatora (KLUCZOWY ELEMENT):**

- ✅ Zamiast statycznych zrzutów ekranu - **LIVE VIDEO** kalkulatora w akcji
- Szybkość odtwarzania: 2.1x (szybka prezentacja bez nudy)
- Autoplay + loop (użytkownik od razu widzi jak to działa)
- Efekt tła: Pulsujące żółte koło (kolor ZUS)
- **INNOWACJA:** Pierwsza strona ZUS z interaktywnym video demo na landing page

**D. Animacje:**

- Fade-in + slide-up dla wszystkich elementów
- Płynne pojawienie się (nie wszystko naraz)
- Delay 0.8s, 1.0s, 1.2s - budowanie napięcia

**Co podkreślić w prezentacji:**
→ Nowoczesne UX: Video pokazuje działanie natychmiast (bez czytania instrukcji)
→ Budowanie zaufania: Użytkownik widzi co dostanie zanim kliknie
→ Transparentność: Zero ukrytych funkcji, wszystko widoczne od razu

---

## 2. REALITY CHECK - Konfrontacja z rzeczywistością (0:15-0:30)

### Psychologia sekcji:

**A. Mechanika:**

```
Input użytkownika: "Chciałbym otrzymać: 5000 zł"
    ↓
Kalkulator automatyczny: "Rzeczywiście otrzymam: ~2000 zł"
    ↓
Efekt WOW: "O kurde, aż tyle mniej?!"
```

**B. Stopa zastąpienia 40%:**

- Realistyczna wartość dla polskiego systemu emerytalnego
- Oparta na danych ZUS i GUS
- **EDUKACJA:** Większość ludzi nie wie, że emerytura to tylko 40% ostatniego wynagrodzenia

**C. Interaktywność:**

- Pole input z formatowaniem (automatyczne spacje co 3 cyfry)
- Realtime calculation (natychmiastowa odpowiedź)
- Max 100,000 zł (zabezpieczenie przed absurdami)

**D. Kolorystyka:**

- Zielone tło ZUS (var(--zus-green-primary))
- Białe karty z przezroczystością (backdrop-blur)
- Żółte ikony (Target, AlertCircle) - przyciągają wzrok

**Co podkreślić w prezentacji:**
→ **Engagement:** Użytkownik wprowadza SWOJE dane (personalizacja)
→ **Edukacja:** Konfrontacja z rzeczywistością (nie oszukujemy, pokazujemy prawdę)
→ **Motywacja:** Po zobaczeniu różnicy użytkownik CHCE policzyć dokładniej
→ CTA umieszczony bezpośrednio po "szoku" - idealne miejsce

---

## 3. HOW IT WORKS - Prostota procesu (0:30-0:45)

### 3 kroki do emerytury:

**01. Wprowadź dane do formularza**

- Wiek, płeć, wynagrodzenie, planowany wiek emerytury
- Opcjonalnie: dane z konta ZUS (jeśli użytkownik je zna)
- **PROSTO:** Tylko 4-5 podstawowych pól

**02. Dostosuj parametry**

- Zwolnienia lekarskie
- Scenariusze wynagrodzeń
- Wpływ odroczenia emerytury
- **ELASTYCZNOŚĆ:** Każdy ma inną sytuację

**03. Poznaj wynik**

- Emerytura nominalna vs realna
- Stopa zastąpienia
- Porównanie ze średnią krajową
- **KOMPLEKSOWOŚĆ:** Pełna analiza w jednym miejscu

**Wizualizacja:**

- Duże numery "01", "02", "03" w pastelowym zielonym (#c4e8d8)
- Fade-in z opóźnieniem (200ms, 350ms, 500ms)
- Proste, czytelne ikony

**Co podkreślić w prezentacji:**
→ **Accessible:** 3 kroki, nie 30
→ **User-friendly:** Nawet osoba bez wiedzy ekonomicznej da radę
→ **Professional:** Mimo prostoty - precyzyjne obliczenia (FUS20)

---

## 4. FEATURES - 6 kluczowych funkcjonalności (0:45-1:00)

### Siatka 3x2 z ikonami lucide-react:

#### 🧮 Wysokość emerytury

- Obliczenie emerytury nominalnej (za X lat)
- Obliczenie emerytury realnej (w dzisiejszych złotówkach)
- **PRAKTYCZNOŚĆ:** Użytkownik wie ile naprawdę będzie warte

#### 📈 Stopa zastąpienia

- Procent ostatniego wynagrodzenia
- Typowo 35-50% w polskim systemie
- **BENCHMARK:** Porównanie z międzynarodowymi standardami

#### 📅 Scenariusze przejścia

- Symulacja różnych wieków emerytalnych
- Wpływ odroczenia o 1, 2, 5 lat
- **CO JEŚLI:** "A gdybym pracował dłużej?"

#### 📊 Wzrost kapitału

- Wizualizacja rok po roku
- Konto główne (81%) vs subkonto (19%)
- **TRANSPARENTNOŚĆ:** Użytkownik widzi jak rośnie kapitał

#### 👥 Wpływ zwolnień lekarskich

- Średnia długość zwolnień
- Realny wpływ na wysokość emerytury (%)
- **REALIZM:** Każdy czasem choruje - uwzględniamy to

#### 🎯 Porównanie ze średnią

- Średnia krajowa w roku przejścia na emeryturę
- Pozycjonowanie użytkownika (lepiej/gorzej od średniej)
- **KONTEKST:** "Czy to dużo czy mało?"

**Wizualizacja:**

- Karty z hover:scale[1.02]
- Ikony w zaokrąglonych kwadratach (primary/10 bg)
- Staggered animation (każda karta po 100ms)

**Co podkreślić w prezentacji:**
→ **Kompleksowość:** 6 perspektyw analizy (inne kalkulatory mają 1-2)
→ **Eduakacja:** Każda funkcja uczy czegoś o systemie emerytalnym
→ **Personalizacja:** Uwzględnianie indywidualnych czynników (zwolnienia)

---

## 5. PENSION GROUPS - Wizualizacja rozkładu emerytur (1:00-1:20)

### Interaktywne wykresy:

**A. Wybór typu wykresu:**

- 🥧 Kołowy (donut chart) - proporcje całości
- 📊 Słupkowy (horizontal bars) - łatwiejsze porównanie

**B. 4 grupy emerytów:**

| Przedział    | Średnia | % emerytów | Profil                                           |
| ------------ | ------- | ---------- | ------------------------------------------------ |
| Do 2000 zł   | 1650 zł | 15%        | Niska aktywność zawodowa, <20/25 lat pracy       |
| 2001-3500 zł | 2550 zł | 30%        | Największa grupa, wynagrodzenie ~średnia krajowa |
| 3501-5000 zł | 3700 zł | 40%        | Długi staż (30-35 lat), powyżej średniej         |
| >5000 zł     | 5800 zł | 15%        | Najwyższe zarobki, 35-40 lat bez przerw          |

**C. Interaktywność:**

- Hover na pasek/segment → tooltip z opisem
- Animacja wejścia (staggered, każda grupa po 200ms)
- Shine effect przy hover (gradient biały przemieszcza się)
- Grid lines na słupkach (0%, 10%, 20%... 50%)

**D. Kolory ZUS:**

- --zus-blue-dark
- --zus-green-primary
- --zus-yellow
- --zus-blue

**Co podkreślić w prezentacji:**
→ **Data-driven:** Realne dane o rozkładzie emerytur w Polsce
→ **Educational:** Użytkownik rozumie DLACZEGO niektórzy mają więcej
→ **Interactive:** Toggle między wykresami (zaangażowanie użytkownika)
→ **Professional:** Wykresy SVG, nie obrazki - skalowalne, płynne

---

## 6. FUN FACTS - Ciekawostki emerytalne (1:20-1:30)

### Gamifikacja edukacji:

**A. Koło losujące:**

- 14 faktów o emeryturach w Polsce
- Spinning animation (800ms)
- Click-to-randomize
- Duże koło żółte (48-64 jednostek)

**B. Przykładowe fakty:**

- "Najwyższa emerytura w Polsce: 48,000 zł/mies (górnik, 42 lata pracy)"
- "Każdy rok dłuższej pracy = +5-7% emerytury"
- "9 milionów emerytów w Polsce"
- "Średnia emerytura: ~3,500 zł brutto"

**C. Psychologia:**

- Lightbulb icon (💡 = ciekawostka)
- "Kliknij koło, aby wylosować" - call to action
- Fade opacity przy losowaniu (smooth transition)

**Co podkreślić w prezentacji:**
→ **Engagement:** Użytkownik CHCE kliknąć koło (bo jest ładne i interaktywne)
→ **Education through play:** Nauka przez zabawę (nie nudne statystyki)
→ **Retention:** Użytkownik zostaje dłużej na stronie (ciekawi go więcej faktów)
→ **Trust building:** Im więcej wie o systemie, tym bardziej ufa kalkulatorowi

---

## 7. CTA (Call To Action) - 2 miejsca strategiczne

### A. Po Reality Check (pierwsze CTA)

```
"Przejdź do kalkulatora emerytury" [Calculator icon]
```

- Żółty button na zielonym tle
- Hover: białe tło, ciemny tekst
- Placement: Zaraz po "szoku" (użytkownik zmotywowany)

### B. Finalne CTA (na dole)

```
"Sprawdź swoją przyszłą emeryturę - zanim zrobi to czas"
```

- Dramatyczne sformułowanie (pressure)
- Ten sam żółty button
- Duży padding (px-12, py-7)
- Bold font

**Co podkreślić w prezentacji:**
→ **Psychology:** CTA umieszczone w momentach największej motywacji
→ **Consistency:** Ten sam button design = rozpoznawalność
→ **Urgency:** "zanim zrobi to czas" - FOMO (fear of missing out)

---

## 8. INNOWACJE TECHNICZNE (dla jury technicznego)

### A. Performance:

- Next.js 15 (latest)
- React Server Components gdzie możliwe
- Video z lazy loading
- Animations tylko CSS (nie JS heavy)

### B. Accessibility:

- Semantic HTML (header, section, footer)
- ARIA labels (aria-label, aria-expanded, aria-controls)
- Focus states (focus:ring-2, focus-visible)
- Keyboard navigation (collapsible, buttons)

### C. Animations:

- Intersection Observer (animacja gdy sekcja w viewport)
- Smooth scroll (scroll-smooth)
- Hardware accelerated (transform, opacity)
- No layout shift (width/height defined)

### D. UX Details:

- Input formatting (spacje co 3 cyfry)
- Number validation (max 100k)
- Prevent scroll on number input (onWheel blur)
- Hydration-safe (useMemo dla chartów)

---

## 9. KOLORYSTYKA I BRANDING ZUS

### Paleta kolorów:

```css
--zus-green-primary: oklch(0.48 0.12 155) /* Główny zielony */ --zus-yellow: #ffc700 /* Akcent żółty */ --zus-blue-dark:
	#003a63 /* Ciemny niebieski */ --zus-blue: #0085ca /* Jasny niebieski */ --zus-gray-light: #f5f5f5 /* Tło */;
```

### Typografia:

- Font: Lato (Google Fonts)
- Weights: 400 (regular), 700 (bold)
- Hierarchia: h1 (6xl) → h2 (4xl) → h3 (2xl)

### Spacing:

- Consistent padding: 4, 6, 8, 12, 16, 20 (units)
- Sections separation: py-20, py-40
- Container max-width: 6xl (1152px)

---

## 10. METRYKI SUKCESU LANDING PAGE

### Co mierzyć:

1. **Time on page** - Czy użytkownicy czytają?
2. **Scroll depth** - Czy dochodzą do CTA?
3. **Interaction rate** - Czy klikają Reality Check?
4. **Click-through rate** - Ile % klika CTA?
5. **Fun facts engagement** - Ile losowań?

### Oczekiwane wyniki:

- CTR > 40% (landing → kalkulator)
- Avg time on page > 2 min (czytają content)
- Scroll depth 80%+ (dochodzą do końca)

---

## 11. PORÓWNANIE Z KONKURENCJĄ

### Typowy kalkulator ZUS (stary):

❌ Długi formularz od razu (zniechęcający)
❌ Brak wizualizacji wyników
❌ Statyczne tabele liczb
❌ Zero edukacji o systemie
❌ Brzydki UI (lata 2000)

### Nasz landing page:

✅ Soft onboarding (video, ciekawostki)
✅ Interaktywne wykresy
✅ Reality Check (motywacja)
✅ Edukacja przez zabawę (fun facts)
✅ Nowoczesny UI (2025)

---

## 12. KEY TAKEAWAYS DLA PREZENTACJI

### 3 główne punkty do podkreślenia:

**1. EDUKACJA PRZEZ DOŚWIADCZENIE**

- Nie mówimy "Twoja emerytura będzie niska"
- Pozwalamy użytkownikowi ODKRYĆ to samemu (Reality Check)
- Psychologia: Samopoznanie > Pouczanie

**2. INTERAKTYWNOŚĆ = ENGAGEMENT**

- Video demo (nie statyczne obrazki)
- Toggle wykresów (kołowy/słupkowy)
- Losowanie faktów (koło fortuny)
- Input z natychmiastową odpowiedzią

**3. TRANSPARENTNOŚĆ I ZAUFANIE**

- Pokazujemy wszystko od razu (video demo)
- Realne dane (rozkład emerytur)
- Uczciwe liczby (40% stopa zastąpienia)
- Profesjonalny design (branding ZUS)

---

## 13. SCREENSHOTY DO PREZENTACJI (prośba do designera)

### Priorytet 1 (MUST HAVE):

1. Hero section z video demo (pełna szerokość)
2. Reality Check - side by side (5000 → 2000)
3. Wykresy kołowe i słupkowe (oba typy)
4. 6 feature cards w grid layout
5. Koło z ciekawostkami (z tekstem)

### Priorytet 2 (NICE TO HAVE):

6. How It Works - 3 kroki
7. Mobile view (responsywność)
8. Hover states (tooltips, shine effects)
9. Animacje wejścia (gif/video)
10. CTA buttons (przed/po hover)

---

## 14. STORYTELLING W PREZENTACJI (narracja)

### Sugerowany flow slajdów:

**SLAJD 1:** "Problem"

- Większość Polaków nie wie, ile będą mieli emerytury
- 60% oczekuje więcej niż system może dać
- Tradycyjne kalkulatory ZUS są... trudne

**SLAJD 2:** "Nasza odpowiedź"

- Landing page który EDUKUJE, nie straszy
- Nowoczesny UI, a nie formularz z lat 90
- Interaktywność, nie statyczne liczby

**SLAJD 3-8:** Prezentacja sekcji (jak w tym dokumencie)

**SLAJD 9:** "Rezultat"

- Użytkownicy CHCĄ policzyć swoją emeryturę
- Rozumieją system (dzięki edukacji)
- Czują się w kontroli (nie bezradni)

---

## KONIEC DOKUMENTU - LANDING PAGE

Następny dokument: PREZENTACJA_02_FORM_PAGE.md
