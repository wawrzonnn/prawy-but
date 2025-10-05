# AI Assistant - Przykłady użycia

## Wiadomość powitalna

Gdy użytkownik otwiera chat, widzi:

```
Cześć! 👋 Jestem Twoim asystentem AI do spraw emerytalnych.

**Mogę Ci pomóc w:**

📊 **Doradztwie emerytalnym**
• Wyjaśniam wyniki Twojej kalkulacji
• Interpretuję pojęcia (stopa zastąpienia, kapitał, waloryzacja)
• Doradzam w planowaniu emerytalnym

🎯 **Zarządzaniu symulacjami**
• Zmieniam parametry formularza na Twoje polecenie
• Przeprowadzam scenariusze "co jeśli"
• Porównuję różne warianty

**Przykłady:**
• "Ustaw wiek na 35 lat"
• "Zrób symulację z pensją 12000 zł"
• "Co będzie jak odłożę emeryturę o 5 lat?"
• "Wyjaśnij mi co to jest stopa zastąpienia"

Napisz co Cię interesuje! 💬
```

## Przykładowe konwersacje

### 1. Zmiana pojedynczego parametru

**Użytkownik:** "Ustaw mój wiek na 35 lat"

**AI:**
- Wywołuje: `update_form_field(field: "age", value: 35)`
- Odpowiada: "✅ Zaktualizowano pole age na wartość 35. Formularz został zaktualizowany. Wyniki przeliczą się automatycznie."

**Efekt:** Formularz pokazuje wiek 35, emerytura przelicza się automatycznie.

---

### 2. Kompleksowa symulacja

**Użytkownik:** "Zrób symulację z pensją 12000 zł i wiekiem 40 lat"

**AI:**
- Wywołuje: `update_multiple_fields(updates: { grossSalary: 12000, age: 40 })`
- Odpowiada: "✅ Zaktualizowano 2 pola formularza. Formularz został zaktualizowany. Wyniki przeliczą się automatycznie."

**Efekt:** Oba pola aktualizują się jednocześnie, nowe wyniki emerytury.

---

### 3. Scenariusz "co jeśli"

**Użytkownik:** "Co będzie jak odłożę emeryturę o 5 lat?"

**AI:**
- Wywołuje: `simulate_scenario(scenario_name: "odroczenie o 5 lat", changes: { plannedRetirementYear: 2065 })`
- Odpowiada: "✅ Przeprowadzono symulację: odroczenie o 5 lat. Formularz został zaktualizowany. Wyniki przeliczą się automatycznie."
- Dodatkowo wyjaśnia: "Odroczenie emerytury o 5 lat zwiększy Twoją emeryturę o około 30% dzięki dłuższemu okresowi składkowania i krótszemu okresowi pobierania."

**Efekt:** Rok emerytury zmienia się, użytkownik widzi wyższą emeryturę.

---

### 4. Pytanie o wyjaśnienie

**Użytkownik:** "Co to jest stopa zastąpienia?"

**AI:**
- Nie wywołuje żadnego tool (tylko odpowiedź tekstowa)
- Odpowiada: "Stopa zastąpienia to procent Twojego ostatniego wynagrodzenia, który będziesz otrzymywać jako emeryturę. W Twoim przypadku wynosi ona 45%, co oznacza, że Twoja emerytura będzie stanowić 45% ostatniej pensji. Im wyższa stopa zastąpienia, tym lepiej - oznacza to mniejszy spadek poziomu życia po przejściu na emeryturę."

**Efekt:** Tylko odpowiedź tekstowa, formularz bez zmian.

---

### 5. Proaktywne sugestie

**Użytkownik:** "Moja emerytura wydaje się niska"

**AI:**
- Nie wywołuje tool
- Odpowiada: "Rzeczywiście, Twoja stopa zastąpienia wynosi 45%, co jest poniżej rekomendowanego poziomu 60-70%. Mogę zaproponować kilka scenariuszy:

1. **Wyższa pensja** - Co będzie jeśli Twoje wynagrodzenie wzrośnie do 10000 zł?
2. **Odroczenie emerytury** - Jak zmieni się emerytura jeśli będziesz pracować 3 lata dłużej?
3. **Dodatkowe oszczędności** - Możesz rozważyć PPK lub IKE jako uzupełnienie

Chcesz, żebym przeprowadził którąś z tych symulacji?"

**Efekt:** AI proaktywnie sugeruje konkretne akcje.

---

### 6. Złożone zapytanie

**Użytkownik:** "Porównaj scenariusz gdzie zarabiam 15000 zł i odkładam emeryturę o 2 lata"

**AI:**
- Wywołuje: `update_multiple_fields(updates: { grossSalary: 15000, plannedRetirementYear: 2062 })`
- Odpowiada: "✅ Zaktualizowano 2 pola formularza. Formularz został zaktualizowany.

**Wyniki symulacji:**
- Nowa emerytura: ~6,500 zł/mc (wzrost o 2,000 zł)
- Stopa zastąpienia: 58% (wzrost o 13 punktów procentowych)
- Zgromadzony kapitał: ~850,000 zł

**Wnioski:**
Kombinacja wyższego wynagrodzenia i odroczenia emerytury znacząco poprawia Twoją sytuację emerytalną. Stopa zastąpienia zbliża się do rekomendowanego poziomu 60%."

**Efekt:** Formularz pokazuje nowe wartości + szczegółowa analiza od AI.

---

## Komendy które NIE wymagają tool calling

Te zapytania są obsługiwane jako zwykła konwersacja:

- "Co to jest kapitał emerytalny?"
- "Jak działa system emerytalny w Polsce?"
- "Czy warto odkładać emeryturę?"
- "Jakie są zalety PPK?"
- "Co oznacza waloryzacja?"
- "Dlaczego moja emerytura jest taka niska?"

AI odpowiada tekstem bez modyfikacji formularza.

---

## Komendy które WYMAGAJĄ tool calling

Te zapytania automatycznie wywołują funkcje:

**Pojedyncze zmiany:**
- "Ustaw wiek na X"
- "Zmień pensję na Y"
- "Włącz/wyłącz zwolnienia lekarskie"
- "Zmień rok emerytury na Z"

**Wiele zmian:**
- "Zmień wiek na X i pensję na Y"
- "Ustaw wszystkie dane: wiek X, pensja Y, rok emerytury Z"
- "Zaktualizuj formularz: [lista zmian]"

**Symulacje:**
- "Zrób symulację z [parametry]"
- "Pokaż mi co będzie jak [zmiana]"
- "Co jeśli [scenariusz]"
- "Porównaj scenariusz gdzie [warunki]"

---

## Inteligentne rozpoznawanie intencji

AI rozumie różne sposoby wyrażania tej samej intencji:

**Wszystkie te komendy zrobią to samo:**
- "Ustaw wiek na 35"
- "Zmień mój wiek na 35 lat"
- "Wiek 35"
- "Chcę mieć 35 lat"
- "Zaktualizuj wiek do 35"

**Wszystkie wywołają:** `update_form_field(field: "age", value: 35)`

---

## Best Practices dla użytkowników

### ✅ Dobre zapytania

- "Zrób symulację z pensją 12000 zł" ← konkretna wartość
- "Co będzie jak odłożę emeryturę o 3 lata" ← jasny scenariusz
- "Ustaw wiek na 40 i pensję na 10000" ← precyzyjne parametry

### ❌ Problematyczne zapytania

- "Zmień mój wiek" ← brak wartości
- "Zrób symulację" ← brak parametrów
- "Pokaż mi coś" ← niejasna intencja

Gdy zapytanie jest niejasne, AI poprosi o doprecyzowanie.

---

## Debugging dla developerów

### Console logs w API route

```typescript
console.log('Tool call:', toolCall.function.name, functionArgs)
console.log('Tool result:', result)
```

### Sprawdzanie odpowiedzi OpenAI

```typescript
const data = await response.json()
console.log('OpenAI response:', JSON.stringify(data, null, 2))
```

### Testowanie różnych promptów

```bash
# Terminal 1 - Serwer
npm run dev

# Terminal 2 - Logi
tail -f .next/server.log
```

---

## Podsumowanie

AI Assistant łączy:
- **Konwersacyjny interfejs** - naturalny język
- **Tool calling** - bezpośrednia manipulacja formularzem
- **Kontekst** - świadomość aktualnych danych użytkownika
- **Proaktywność** - sugestie i rekomendacje

To sprawia, że użytkownik może zarządzać symulacjami mówiąc naturalnie, zamiast klikać w formularzu. 🎯
