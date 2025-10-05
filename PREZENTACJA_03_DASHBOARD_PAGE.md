# PREZENTACJA DLA JURY ZUS - DASHBOARD PAGE

## Dokument przygotowawczy dla designera prezentacji

---

## 1. KONCEPCJA STRONY - Panel Symulacji Emerytalnej

### Główna idea:

**"Szczegółowa analiza rok po roku"**

```
Form = Szybki wynik (3 liczby)
    ↓
Dashboard = Pełna historia (35 lat danych)
```

**Różnica filozoficzna:**
- Form: "Ile będę miał?"
- Dashboard: "JAK dojdę do tej kwoty?"

**Co podkreślić w prezentacji:**
→ **Deep dive:** Przechodzimy z overview do szczegółów
→ **Transparency:** Pokazujemy KAŻDY rok osobno
→ **Empowerment:** Użytkownik może modyfikować i eksperymentować

---

## 2. LAYOUT - Struktura dashboardu

### Desktop view:

```
┌─────────────────────────────────────────────────┐
│  HEADER (Logo + Breadcrumbs + "Powrót")         │
├─────────────────────────────────────────────────┤
│                                                 │
│  TYTUŁ: "Panel Symulacji Emerytalnej"          │
│  [Pobierz raport PDF]  [Nowa symulacja]        │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  📊 WYKRES: Wzrost kapitału emerytalnego       │
│     (Interactive SVG chart)                     │
│                                                 │
├──────────────────────────┬──────────────────────┤
│                          │                      │
│  LEWA (66%):             │  PRAWA (33%):        │
│  • Podsumowanie          │  • Parametry         │
│  • Tabela rok-po-roku    │  • Zwolnienia        │
│                          │  • Kod pocztowy      │
│                          │  • Info              │
│                          │                      │
└──────────────────────────┴──────────────────────┘
     ↓
  [💬 Chat AI (tylko info)]
```

**Co podkreślić w prezentacji:**
→ **Visual hierarchy:** Wykres na górze (pierwszy co widać)
→ **Content priority:** Tabela duża (główna wartość)
→ **Sidebar controls:** Parametry z boku (nie przeszkadzają)

---

## 3. WYKRES WZROSTU KAPITAŁU - Custom SVG Chart

### Wizualizacja:

```
Kapitał (tys. zł)
    ↑
1959│                                    ●
    │                              ●
1469│                        ●
    │                  ●
 979│            ●
    │      ●
 490│ ●
    │
  0└─────────────────────────────────────→
   2025   2035   2045   2055   2065    Rok
```

**A. Co pokazujemy:**
- **Całkowity kapitał** (zielona linia ciągła)
- **Konto główne** (zielona linia przerywana)
- Wypełnienie pod wykresem (gradient zielony)
- Grid lines (siatka 10x10)
- Osie z opisami ("Kapitał (tys. zł)", "Rok")

**B. Interaktywność:**
- Hover na dowolny punkt → tooltip
- Vertical line przy hover (pokazuje dokładny rok)
- Widoczne kropki co 5 lat (milestone markers)
- Wszystkie punkty mają niewidzialny hover area (łatwo trafić)

**C. Tooltip pokazuje:**
```
┌────────────────────────────┐
│ Rok 2045 • Wiek: 50 lat    │
├────────────────────────────┤
│ Kapitał nominalny:         │
│ 489 234 zł                 │
│                            │
│ Kapitał realny:            │
│ 208 456 zł                 │
│ (dzisiejsze zł)            │
├────────────────────────────┤
│ Emerytura realna:          │
│ 4 832 zł/mies              │
│ w dzisiejszych zł          │
│                            │
│ Emerytura nominalna:       │
│ 11 346 zł/mies             │
└────────────────────────────┘
```

**D. Etykiety osi:**
- Oś Y: "Kapitał (tys. zł)" - pionowo, po lewej, subtelnie (#9ca3af)
- Oś X: "Rok" - poziomo, na dole, subtelnie
- Wartości bez "k" (już jest w etykiecie: "1959", nie "1959k")

**Co podkreślić w prezentacji:**
→ **Custom SVG:** Nie używamy bibliotek (pełna kontrola, 0 dependencies)
→ **Interactive:** Hover na KAŻDY rok (nie tylko milestone)
→ **Dual values:** Nominalny vs realny (edukacja o inflacji!)
→ **Performance:** Pure SVG = płynne animacje bez lagów

---

## 4. LEGENDA WYKRESU

### Pod wykresem:

```
[■] Całkowity kapitał    [---] Konto główne (81%)
```

**A. Design:**
- Prostokąty kolorowe (visual legend)
- Konto główne = dashed line (odróżnienie)
- Centrowane pod wykresem
- Responsive (column → row na mobile)

**B. Dlaczego pokazujemy konto główne:**
- Subkonto (19%) może nie zostać wypłacone
- Od 2014: OFE → ZUS (subkonto niepewne)
- Użytkownik widzi "bezpieczny" kapitał

**Co podkreślić w prezentacji:**
→ **Transparency:** Pokazujemy podział 81%/19%
→ **Risk awareness:** Subkonto to niepewność (reforma systemu)
→ **Visual clarity:** Linia ciągła vs przerywana = jasne odróżnienie

---

## 5. PODSUMOWANIE PROGNOZY - Główne wyniki

### Card z 4 wartościami:

```
┌─────────────────────────────────────┐
│  Podsumowanie prognozy              │
├──────────────────┬──────────────────┤
│ Kapitał nominalny│ Kapitał realny   │
│ 1 959 234 zł     │ 834 125 zł       │
├──────────────────┼──────────────────┤
│ Emerytura        │ Emerytura realna │
│ nominalna        │                  │
│ 8 819 zł         │ 3 754 zł         │
│                  │ w dzisiejszych zł│
└──────────────────┴──────────────────┘
```

**A. Grid 2×2:**
- Równomierne pola
- Duże liczby (text-xl)
- Subtelne opisy (text-xs)
- Zielone tło (bg-green-50/50)

**B. Dlaczego 4 wartości:**
- Kapitał nominalny: za X lat (w przyszłych złotówkach)
- Kapitał realny: dziś (po odliczeniu inflacji)
- Emerytura nominalna: za X lat (numer na papierze)
- Emerytura realna: dziś (faktyczna siła nabywcza)

**Co podkreślić w prezentacji:**
→ **Dual presentation:** Zawsze pokazujemy obie perspektywy
→ **Financial literacy:** Edukujemy o inflacji (większość nie rozumie)
→ **Highlight realna:** Zielony akcent = to jest najważniejsze

---

## 6. TABELA ROK PO ROKU - Główna wartość dashboardu

### Struktura:

```
Rok │ Wiek │ Wynagr. │ Składka │ Choroby │ Kapitał
────┼──────┼─────────┼─────────┼─────────┼────────
2025│  30  │  7 500  │  +1 463 │    -    │  32 145
2026│  31  │  7 688  │  +1 499 │    -    │  65 782
2027│  32  │  7 880  │  +1 537 │   14    │ 100 934
...
2060│  65  │  14 417 │    0    │    0    │1 959 234
```

**A. Kolumny:**
1. **Rok** - kalendarzowy (2025-2060)
2. **Wiek** - dla kontekstu (30-65)
3. **Wynagrodzenie** - prognozowane (z wzrostem)
4. **Składka miesięczna** - zielony "+1463" (wpływ pozytywny)
5. **Choroby** - dni zwolnienia (pomarańczowy jeśli >0)
6. **Kapitał realny** - skumulowany (dzisiejsze zł)

**B. Edycja wynagrodzenia (INNOWACJA):**
- Kliknij ołówek obok wynagrodzenia → inline edit
- Input number → Enter/Save
- Ptaszek ✓ jeśli edytowane (niebieski)
- Recalculation całej tabeli

**C. Responsywność:**
- Mobile: ukryj "Wiek", "Składka", "Choroby"
- Zostaw: "Rok", "Wynagr.", "Kapitał"
- Scroll horizontal jeśli za wąskie
- Sticky header (kolumny zawsze widoczne)

**D. Collapse/Expand:**
- Default: 10 wierszy (5 pierwszych + 5 ostatnich)
- Button: "Pokaż wszystkie lata (35 lat)"
- Po expand: "Zwiń tabelę"
- W raporcie PDF: ALL rows (nie collapse)

**Co podkreślić w prezentacji:**
→ **INNOWACJA #1:** Edytowalne wynagrodzenia (co jeśli awans?)
→ **Year-by-year transparency:** Każdy rok osobno (nie czarna skrzynka)
→ **Interactive:** Kliknij → zmień → zobacz wpływ
→ **Progressive disclosure:** Default 10 wierszy (nie przytłaczamy)

---

## 7. OSTATNI WIERSZ TABELI - Rok emerytury

### Specjalny przypadek:

```
2060│ 65 │  0 │  0 │  0 │ 1 959 234
```

**A. Dlaczego zera:**
- **Wynagrodzenie = 0:** Już nie pracujesz
- **Składka = 0:** Brak wpłat (na emeryturze)
- **Choroby = 0:** N/A (nie liczy się)
- **Kapitał:** Finalna waloryzacja (ostatni raz rośnie)

**B. To jest OK!**
- Użytkownik pytał: "czy to bug?"
- Odpowiedź: NIE, to expected behavior
- W roku emerytury: kapitał się waloryzuje, ale nie dodajemy składek
- Dzielnik (średni dalszy czas życia) liczony dla tego roku

**Co podkreślić w prezentacji:**
→ **Accurate modeling:** Ostatni rok to przejście (praca → emerytura)
→ **Not a bug:** Design decision (edukacyjny moment)
→ **Visual clarity:** Można dodać subtelny background lub ikonę 🎉

---

## 8. PARAMETRY SYMULACJI (SIDEBAR)

### Card w prawej kolumnie:

```
┌────────────────────────────────┐
│ ⚙️ Parametry symulacji         │
├────────────────────────────────┤
│ Scenariusz ekonomiczny:        │
│ [Dropdown: Umiarkowany ▼]      │
│                                │
│ ✓ Umiarkowany (domyślny)       │
│ • Wzrost wynagrodzeń: 2.5%     │
│ • Inflacja: 2.5%               │
│ • Bezrobocie: 5.0%             │
└────────────────────────────────┘
```

**A. 3 scenariusze:**

| Scenariusz | Wzrost płac | Inflacja | Bezrobocie |
|------------|-------------|----------|------------|
| Pesymistyczny | 1.5% | 3.5% | 8.0% |
| **Umiarkowany** | **2.5%** | **2.5%** | **5.0%** |
| Optymistyczny | 3.5% | 2.0% | 3.0% |

**B. Zmiana scenariusza:**
- Dropdown selection
- Instant recalculation (cała tabela + wykres)
- Info box poniżej (wyjaśnienie parametrów)
- Default: Umiarkowany (najbardziej realistyczny)

**C. Dlaczego to ważne:**
- Przyszłość jest niepewna
- Użytkownik widzi range możliwości
- Pesymistyczny = worst case
- Optymistyczny = best case

**Co podkreślić w prezentacji:**
→ **Scenario planning:** Nie obiecujemy jednej prawdy, pokazujemy zakres
→ **Educational:** Wyjaśniamy co oznaczają parametry makro
→ **Interactive:** Zmiana scenariusza = instant feedback

---

## 9. ZWOLNIENIA LEKARSKIE - Edycja rok po roku

### Interactive section:

```
┌────────────────────────────────┐
│ 💚 Zwolnienia lekarskie  [+]   │
├────────────────────────────────┤
│ Brak dodanych zwolnień         │
│                                │
│ [Kliknij + aby dodać]          │
└────────────────────────────────┘
```

**A. Po dodaniu:**

```
┌────────────────────────────────┐
│ 💚 Zwolnienia lekarskie  [+]   │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │ 2035                     │   │
│ │ 14 dni          [🗑️]     │   │
│ └──────────────────────────┘   │
│ ┌──────────────────────────┐   │
│ │ 2042                     │   │
│ │ 28 dni          [🗑️]     │   │
│ └──────────────────────────┘   │
├────────────────────────────────┤
│ ⚠️ Wpływ na kapitał:           │
│ Zwolnienia zmniejszają składki │
└────────────────────────────────┘
```

**B. Mechanika:**
- Click [+] → Form (rok + liczba dni)
- Dodaj → Card w liście
- Delete [🗑️] → Usuń z listy
- Instant recalculation

**C. Wpływ na tabelę:**
- Kolumna "Choroby" pokazuje dni
- Składka redukowana proporcjonalnie
- Kapitał końcowy niższy

**D. Wizualizacja wpływu:**
```
Bez zwolnień: 1 959 234 zł
Ze zwolnieniami: 1 891 456 zł
Różnica: -67 778 zł (-3.5%)
```

**Co podkreślić w prezentacji:**
→ **Granular control:** Można dodać różne lata (np. 2035: 14 dni, 2042: 28 dni)
→ **Real-world modeling:** Ludzie chorują nieregularnie, nie równo co roku
→ **Visual feedback:** Orange color = negatywny wpływ

---

## 10. KOD POCZTOWY - Opcjonalne (dla statystyk)

### Simple input:

```
┌────────────────────────────────┐
│ 📍 Kod pocztowy (opcjonalnie)  │
├────────────────────────────────┤
│ Podanie kodu pomoże nam w      │
│ tworzeniu lepszych narzędzi    │
│ edukacyjnych dla regionu.      │
│                                │
│ [00-000]                       │
│ Format: 00-000 (np. 00-950)    │
└────────────────────────────────┘
```

**A. Auto-formatting:**
- Wpisujesz: "12345"
- Pokazuje: "12-345"
- Max length: 6 znaków
- Only digits

**B. Dlaczego zbieramy:**
- Analiza regionalna (admin panel)
- Czy emerytura wystarczy w Warszawie vs wieś?
- Różnice kosztów życia
- Planowanie kampanii edukacyjnych

**C. Privacy:**
- Opcjonalne (można pominąć)
- Tylko kod pocztowy (nie adres)
- Anonimowe (nie łączymy z osobą)
- Zapisane lokalnie (IndexedDB)

**Co podkreślić w prezentacji:**
→ **Optional by design:** Nie wymuszamy (respekt dla prywatności)
→ **Transparent purpose:** Jasno mówimy DLACZEGO zbieramy
→ **Regional insights:** Dane pomogą ZUS lepiej targetować edukację

---

## 11. PRZYCISK "POBIERZ RAPORT PDF"

### Design:

```
[📥 Pobierz raport PDF]
```
- Żółty background
- Hover: zielony ZUS (var(--zus-green-primary))
- Duży (size: lg)
- Bold font
- Download icon

**A. Co się dzieje po kliknięciu:**

1. **Zapisz finalne dane do DB** (ostatnia aktualizacja)
2. **Rozwiń tabelę** (setShowAllYears = true)
3. **Wait 100ms** (render DOM)
4. **window.print()** (browser print dialog)
5. **Log:** "W17 kalkulator emerytalny zapisany"

**B. Co jest w raporcie:**

```
┌─────────────────────────────────────┐
│  [Logo ZUS] │ Raport Prognozy       │
│             │ Emerytalnej           │
│             │ Wygenerowano: 5.10.25 │
├─────────────────────────────────────┤
│                                     │
│  📊 Wykres (full color)             │
│                                     │
│  Podsumowanie (4 wartości)          │
│                                     │
│  Tabela (WSZYSTKIE lata)            │
│                                     │
│  Parametry symulacji (box)          │
│   • Wiek, płeć, wynagrodzenie       │
│   • Scenariusz ekonomiczny          │
│   • Zwolnienia (jeśli są)           │
│                                     │
├─────────────────────────────────────┤
│ Footer: [Logo] zus.pl/symulator     │
│         Raport wygenerowany: XX     │
└─────────────────────────────────────┘
```

**C. Print CSS:**
```css
@media print {
  .no-print { display: none !important; }  /* Buttony, chat, sidebary */
  button { display: none !important; }      /* Ołówki edycji */
  .print-only { display: block !important; } /* Header + params box */
  
  /* Custom footer */
  @page {
    @bottom-left { content: "zus.pl/symulator-emerytury"; }
    @bottom-center { content: "Symulator Emerytalny ZUS"; }
    @bottom-right { content: counter(page) " / " counter(pages); }
  }
}
```

**Co podkreślić w prezentacji:**
→ **Professional output:** PDF wygląda jak oficjalny dokument ZUS
→ **Complete picture:** Wszystkie dane w jednym miejscu
→ **Print-optimized:** Czyste, bez interaktywnych elementów
→ **Branding:** Logo + custom footer z adresem strony

---

## 12. PRZYCISK "NOWA SYMULACJA"

### Design:

```
[📄 Nowa symulacja]
```
- Outline style (nie primary)
- Hover: subtle background
- FileText icon
- Size: lg

**A. Co się dzieje po kliknięciu:**

```javascript
// Wyczyść sesję
localStorage.removeItem('pensionCalculatorData')
localStorage.removeItem('currentPensionRecordId')

// Redirect
window.location.href = '/form'
```

**B. Dlaczego czyścimy sesję:**
- Nowa symulacja = nowy rekord w DB
- Nie chcemy nadpisywać poprzedniego
- Świeży start (czyste dane)

**C. UX consideration:**
- Brak confirmation modal (można wrócić przyciskiem "Wstecz")
- Dane poprzedniej symulacji pozostają w DB (admin panel)
- User może zacząć od nowa bez strachu

**Co podkreślić w prezentacji:**
→ **Clear intent:** "Nowa symulacja" = jasne co się stanie
→ **Session management:** System rozróżnia symulacje
→ **Data preservation:** Stare dane nie giną (są w DB)

---

## 13. AUTO-SAVE Z DEBOUNCE - Inteligentny zapis

### Mechanika:

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    saveToDatabase()  // Zapisz po 2 sekundach bezczynności
  }, 2000)
  
  return () => clearTimeout(timer)  // Cancel jeśli kolejna zmiana
}, [yearData, sickLeaves, postalCode, scenario])
```

**A. Trigger events:**
- Zmiana scenariusza
- Dodanie/usunięcie zwolnienia
- Edycja wynagrodzenia
- Wpisanie kodu pocztowego

**B. Co zapisujemy:**
- Wszystkie parametry (age, gender, salary, etc.)
- Wyniki końcowe (monthlyPension, totalCapital)
- Metadata (scenario, sickLeaves)

**C. Gdzie zapisujemy:**
```javascript
const recordId = localStorage.getItem('currentPensionRecordId')

if (recordId) {
  // UPDATE existing record
  await db.pensionData.update(Number(recordId), dataToSave)
} else {
  // CREATE new record (fallback)
  const newId = await db.pensionData.add({ ...dataToSave, createdAt: new Date() })
  localStorage.setItem('currentPensionRecordId', newId.toString())
}
```

**Co podkreślić w prezentacji:**
→ **Auto-save:** Użytkownik nie musi nic robić (0 cognitive load)
→ **Debounce:** Nie zapisujemy przy każdym keystroke (performance)
→ **Smart update:** Ten sam rekord nadpisywany (nie tworzymy 100 wersji)
→ **Admin insights:** Dane trafiają do admin panelu (analityka)

---

## 14. CHAT WIDGET AI - Tryb "tylko wyjaśnianie"

### Różnica vs Form:

**Form (Tool Calling ON):**
- AI może zmieniać formularz
- Funkcje: update_form_field, simulate_scenario
- "Ustaw wiek na 35" → AI zmienia input

**Dashboard (Tool Calling OFF):**
- AI tylko wyjaśnia
- Brak funkcji modyfikacji
- "Co to znaczy kapitał realny?" → AI tłumaczy

**A. Dlaczego różnica:**
```javascript
const isDashboard = formContext?.scenario || formContext?.yearDataLength

const tools = isDashboard ? undefined : [
  update_form_field,
  update_multiple_fields,
  simulate_scenario
]
```

**B. Initial message (Dashboard):**
```
Cześć! 👋 Jestem asystentem AI dashboardu.

Mogę Ci pomóc:
• Wyjaśnić dane z wykresu i tabeli
• Interpretować scenariusze ekonomiczne
• Tłumaczyć kapitał nominalny vs realny
• Doradzać w planowaniu emerytalnym

Przykłady:
• "Co oznacza ten wykres?"
• "Dlaczego kapitał realny jest niższy?"
• "Jak wpływa scenariusz na emeryturę?"
```

**C. Context przekazany do AI:**
```javascript
formContext={{
  // Parametry
  age, gender, grossSalary,
  workStartYear, plannedRetirementYear,
  
  // Wyniki
  monthlyPension, realMonthlyPension,
  totalCapital, realTotalCapital,
  replacementRate,
  
  // Dane dashboard
  yearsToRetirement,
  scenario: scenario.name,
  wageGrowth, inflation, unemployment,
  sickLeavesCount,
  yearDataLength
}}
```

**Co podkreślić w prezentacji:**
→ **Mode-aware AI:** Różne capabilities w zależności od kontekstu
→ **Safety:** W dashboard nie zmieniamy danych (tylko czytamy)
→ **Educational focus:** Pomoc w zrozumieniu, nie w modyfikacji
→ **Full context:** AI zna WSZYSTKIE dane użytkownika (może dokładnie odpowiedzieć)

---

## 15. BREADCRUMBS - Nawigacja

### Header:

```
[Logo ZUS] / Strona główna / Kalkulator / Dashboard
                                           ^^^^^^^^
                                          (bold)
```

**A. Klikalność:**
- "Strona główna" → /
- "Kalkulator" → /form
- "Dashboard" → /dashboard (current, nie klikalne)

**B. Mobile:**
- Ukryj breadcrumbs (za małe)
- Zostaw tylko logo + button "Powrót"

**C. Button "Powrót":**
```
[← Powrót]
```
- Prowadzi do /form
- Dane są zapisane (localStorage)
- Użytkownik może wrócić i zmienić parametry

**Co podkreślić w prezentacji:**
→ **Clear navigation:** Zawsze wiesz gdzie jesteś
→ **Easy return:** Jeden klik aby wrócić do form
→ **Data continuity:** Dane nie giną przy nawigacji

---

## 16. RESPONSYWNOŚĆ - Mobile optimization

### Zmiany na mobile:

**A. Layout:**
- Grid 2 kolumny → Stack (jedna pod drugą)
- Tabela: ukryj kolumny "Wiek", "Składka", "Choroby"
- Wykres: zachowaj (responsive SVG)
- Chat: fullscreen overlay

**B. Touch targets:**
- Min 44×44px (Apple HIG)
- Większe buttony
- Spacing między elementami

**C. Scroll:**
- Tabela: horizontal scroll jeśli za szeroka
- Sticky header (kolumny zawsze widoczne)
- Smooth scrolling

**D. Typography:**
- text-sm → text-base (czytelniejsze)
- Mniejsze padding (więcej contentu)
- Line-height zwiększony (lepsze dla touch)

**Co podkreślić w prezentacji:**
→ **Mobile-first:** 60%+ użytkowników na telefonie
→ **Touch-optimized:** Łatwo kliknąć, łatwo scrollować
→ **Content priority:** Najważniejsze dane zawsze widoczne

---

## 17. ACCESSIBILITY - WCAG 2.1

### Keyboard navigation:

**A. Tab order:**
1. Header links (logo, breadcrumbs, powrót)
2. Przyciski akcji (PDF, nowa symulacja)
3. Dropdown scenariusze
4. Edycja wynagrodzenia (inline inputs)
5. Dodaj zwolnienie
6. Input kod pocztowy
7. Chat widget

**B. Focus states:**
```css
focus:ring-2 focus:ring-primary  /* Wyraźny outline */
focus-visible:ring-2             /* Tylko keyboard */
```

**C. Screen readers:**
```html
<button aria-label="Edytuj wynagrodzenie za rok 2035">
  <Edit2 className="w-3 h-3" />
</button>

<div role="region" aria-label="Wykres wzrostu kapitału">
  <svg>...</svg>
</div>
```

**D. ARIA live regions:**
```html
<div aria-live="polite" aria-atomic="true">
  Przeliczono symulację. Nowa emerytura: 6 542 zł.
</div>
```

**Co podkreślić w prezentacji:**
→ **Fully accessible:** Każda funkcja dostępna z klawiatury
→ **Screen reader support:** Wszystkie elementy opisane
→ **Live updates:** Screen reader ogłasza zmiany

---

## 18. PORÓWNANIE: DASHBOARD vs FORM

### Complementary design:

| Aspekt | FORM | DASHBOARD |
|--------|------|-----------|
| **Cel** | Quick overview | Deep dive |
| **Output** | 3 liczby | 35 lat danych |
| **Interakcja** | Inputy | Wykres + tabela |
| **AI** | Zmienia dane | Tylko wyjaśnia |
| **Czas** | 30 sekund | 5-10 minut |
| **Detale** | Podstawowe | Granularne |
| **Edycja** | Wszystkie pola | Tylko wynagrodzenia |

**Co podkreślić w prezentacji:**
→ **Two-stage process:** Form = discovery, Dashboard = exploration
→ **Progressive disclosure:** Nie przytłaczamy od razu wszystkimi danymi
→ **Complementary:** Razem tworzą kompletny obraz

---

## 19. INNOWACJE TECHNICZNE

### A. SVG Chart (Custom):
- Zero dependencies (nie Chart.js, nie Recharts)
- Pełna kontrola nad interakcją
- Performance: 60fps animations
- Accessibility: Keyboard navigable

### B. Inline editing:
- Click → Edit mode
- Enter/Save → Update
- Escape → Cancel
- Instant recalculation

### C. Debounced auto-save:
- 2s delay po ostatniej zmianie
- Nie zapisuje przy każdym keystroke
- IndexedDB (offline-capable)

### D. Print optimization:
- Custom CSS @media print
- @page rules (footer custom)
- Wszystkie lata w tabeli
- Professional layout

### E. Scenario switching:
- Instant calculation (nie async)
- Pure functions (deterministic)
- No loading states (bo instant)

**Co podkreślić w prezentacji:**
→ **Zero dependencies:** Mniej bloat, więcej kontroli
→ **Performance-first:** Wszystko smooth, zero lagów
→ **Offline-capable:** Działa bez internetu (IndexedDB + localStorage)

---

## 20. METRYKI SUKCESU DASHBOARD

### Co mierzyć:

1. **Time on dashboard** - Ile czasu analizują?
2. **Table interactions** - Czy edytują wynagrodzenia?
3. **Scenario switches** - Ile razy zmieniają scenariusz?
4. **PDF downloads** - Ile % pobiera raport?
5. **Sick leave additions** - Czy dodają zwolnienia?
6. **Chart hovers** - Czy interaktują z wykresem?
7. **AI engagement** - Czy pytają AI?

### Oczekiwane wyniki:

- Avg time: 5-10 min (deep engagement)
- Table edits: 30%+ (eksperymentują)
- Scenario switches: 2-3x (porównują)
- PDF downloads: 40%+ (chcą zachować)
- Chart interactions: 80%+ (ciekawość)

---

## 21. KEY TAKEAWAYS DLA PREZENTACJI

### 3 główne punkty:

**1. YEAR-BY-YEAR TRANSPARENCY**
- Nie mówimy "dostaniesz X zł"
- Pokazujemy JAK dojdziesz do X zł
- Każdy rok osobno = zrozumienie mechanizmu
- Edukacja przez transparentność

**2. INTERACTIVE WHAT-IF ANALYSIS**
- Edytuj wynagrodzenie (awans w 2035?)
- Dodaj zwolnienia (choroba w 2042?)
- Zmień scenariusz (pesymistyczny vs optymistyczny)
- Instant feedback = empowerment

**3. PROFESSIONAL REPORTING**
- PDF export z pełnymi danymi
- Print-optimized (wygląda jak oficjalny raport ZUS)
- Zachowaj i porównaj (portfolio planning)
- Share with advisor (doradca finansowy)

---

## 22. SCREENSHOTY DO PREZENTACJI

### Priorytet 1 (MUST HAVE):

1. Pełny dashboard - desktop view
2. Wykres z tooltip (hover state)
3. Tabela - wszystkie kolumny widoczne
4. Inline editing wynagrodzenia (edit mode)
5. Podsumowanie 4 wartości (grid 2×2)
6. Scenariusze dropdown (expanded)

### Priorytet 2 (NICE TO HAVE):

7. Zwolnienia - lista z 2-3 wpisami
8. Raport PDF (preview)
9. Mobile view (stacked layout)
10. Chat widget (tryb dashboard)
11. Legenda wykresu
12. Parametry symulacji box

---

## 23. STORYTELLING W PREZENTACJI

### Narracja dla jury:

**PROBLEM:**
"Użytkownik widzi 'Twoja emerytura: 6542 zł'. OK, ale SKĄD się to wzięło? Jakie założenia? Co jeśli awans? Co jeśli choroba? Brak transparentności = brak zaufania."

**ROZWIĄZANIE:**
"Dashboard to szkło powiększające. Widzisz KAŻDY rok osobno. Rok 2035: zarobisz 11k, wpłacisz 2.1k składki, kapitał urośnie do 245k. Możesz kliknąć i zmienić: 'A co jeśli w 2035 dostanę awans do 15k?' → Instant recalculation. Widzisz wpływ."

**REZULTAT:**
"Użytkownik rozumie system. Wie że jego decyzje (praca dłużej, mniej zwolnień, awans) mają REALNY wpływ na emeryturę. To nie jest czarna skrzynka. To jest narzędzie planowania."

---

## 24. PORÓWNANIE Z KONKURENCJĄ

### Typowy kalkulator (po kliknięciu "Oblicz"):

❌ Jedna strona z wynikiem (3 liczby)
❌ Brak wyjaśnienia skąd się wzięły
❌ Nie można modyfikować
❌ Nie można porównać scenariuszy
❌ Brak PDF export
❌ Statyczna tabela (jeśli w ogóle jest)

### Nasz Dashboard:

✅ Interaktywny wykres (hover pokazuje detale)
✅ Edytowalna tabela (zmień wynagrodzenie → see impact)
✅ 3 scenariusze (pesymistyczny/umiarkowany/optymistyczny)
✅ PDF export (professional report)
✅ AI assistant (wyjaśnia + doradza)
✅ Auto-save (nie tracisz danych)
✅ Granularne zwolnienia (dodaj konkretne lata)

---

## 25. FUTURE ENHANCEMENTS (dla dyskusji)

### Możliwe rozszerzenia:

**A. Porównanie symulacji:**
- Zapisz kilka scenariuszy
- Porównaj side-by-side
- "Scenariusz A vs B: różnica 234 zł/mies"

**B. Export do Excel:**
- Tabela → .xlsx
- Użytkownik może analizować w Excelu
- Własne wykresy, pivoty

**C. Share link:**
- Wygeneruj unikalny URL
- Udostępnij doradcy finansowemu
- Read-only view

**D. Historical data import:**
- Pobierz z PUE ZUS przez API
- Auto-fill kapitał początkowy
- Dokładniejsze prognozy

**E. Goal-based planning:**
- "Chcę 5000 zł emerytury"
- System pokazuje: musisz pracować do 68 lub zarabiać 9500 zł
- Reverse engineering celu

---

## 26. TECHNICAL CHALLENGES & SOLUTIONS

### A. Performance (35 lat danych):

**Challenge:** Przeliczenie 35 wierszy przy każdej zmianie
**Solution:** 
- Pure functions (deterministic)
- Memoization (useMemo)
- Debounced auto-save (nie przy każdym keystroke)
- Result: < 100ms recalculation

### B. Print styling:

**Challenge:** Elementy interaktywne w PDF
**Solution:**
- @media print CSS
- display: none dla .no-print
- Custom @page footer (logo + URL)
- Result: Professional PDF

### C. Chart interactivity:

**Challenge:** Hover na małe punkty (mobile)
**Solution:**
- Niewidzialne circle r="8" (duży target)
- Widoczne circle r="4" (estetyka)
- Vertical line przy hover (jasny feedback)
- Result: Łatwo trafić nawet palcem

### D. Data synchronization:

**Challenge:** Form → Dashboard → DB (3 źródła prawdy)
**Solution:**
- localStorage = temporary transport
- IndexedDB = source of truth
- recordId w localStorage = session tracker
- Result: Spójne dane everywhere

---

## KONIEC DOKUMENTU - DASHBOARD PAGE

Następny dokument: PREZENTACJA_04_ADMIN_PANEL.md (jeśli potrzebny)
LUB
PREZENTACJA_05_PODSUMOWANIE.md (finalne takeaways)

