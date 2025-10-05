# AI Chat Assistant - Dokumentacja

## Przegląd

Chat Assistant to widget AI dostępny w dwóch trybach:

### 1. **Tryb Formularza** (`/form`)
- **Tool Calling** - AI może bezpośrednio modyfikować formularz
- Przeprowadzanie symulacji na polecenie głosowe
- Automatyczna aktualizacja pól formularza

### 2. **Tryb Dashboardu** (`/dashboard`) 
- **Tylko wyjaśnianie** - bez modyfikacji danych
- Interpretacja wykresów i tabel rok po roku
- Tłumaczenie scenariuszy ekonomicznych
- Doradztwo w planowaniu emerytalnym

## Architektura

### Frontend
- **Komponent**: `src/components/ChatWidget.tsx`
- **Funkcjonalność**:
  - Floating button (minimalizowany)
  - Rozwijane okno chatu
  - Historia konwersacji
  - Real-time komunikacja z API
  - Przekazywanie kontekstu formularza

### Backend
- **Endpoint**: `src/app/api/chat/route.ts`
- **Model**: OpenAI GPT-4o-mini (można zmienić na GPT-4o)
- **System Prompt**: XML-like format z pełną dokumentacją capabilities
- **Tool Calling**: 3 funkcje do manipulacji formularzem
- **Context**: Automatyczne przekazywanie stanu formularza i wyników

### Dostępne Tools (Functions)

1. **`update_form_field`** - Aktualizuje pojedyncze pole
   - Parametry: `field`, `value`
   - Przykład: "Ustaw wiek na 35 lat"

2. **`update_multiple_fields`** - Aktualizuje wiele pól naraz
   - Parametry: `updates` (obiekt z polami)
   - Przykład: "Zmień wiek na 40 i pensję na 10000 zł"

3. **`simulate_scenario`** - Przeprowadza symulację scenariusza
   - Parametry: `scenario_name`, `changes`
   - Przykład: "Pokaż mi co będzie jak odłożę emeryturę o 5 lat"

## Konfiguracja

### 1. Klucz API OpenAI

Utwórz plik `.env.local` w głównym katalogu projektu:

```bash
cp env.example .env.local
```

Następnie edytuj `.env.local` i dodaj swój klucz API:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Klucz API możesz uzyskać na: https://platform.openai.com/api-keys

### 2. Restart serwera deweloperskiego

Po dodaniu klucza API, zrestartuj serwer:

```bash
npm run dev
```

## Użycie

Widget automatycznie pojawia się na stronie `/form`. Użytkownik może:

1. Kliknąć floating button w prawym dolnym rogu
2. Zadawać pytania dotyczące:
   - Systemu emerytalnego w Polsce
   - Interpretacji swoich wyników
   - Wyjaśnień pojęć ZUS
   - Planowania emerytalnego
3. Otrzymywać spersonalizowane odpowiedzi bazujące na swoich danych
4. **Prosić o symulacje i zmiany formularza**

### Przykłady komend z Tool Calling

**Pojedyncze zmiany:**
- "Ustaw mój wiek na 35 lat"
- "Zmień pensję na 8000 zł"
- "Włącz zwolnienia lekarskie"

**Kompleksowe symulacje:**
- "Zrób symulację z pensją 12000 zł"
- "Pokaż mi co będzie jak odłożę emeryturę o 3 lata"
- "Zmień wiek na 45 i pensję na 15000"

**Scenariusze "co jeśli":**
- "Co będzie jeśli będę zarabiać dwa razy więcej?"
- "Jak zmieni się emerytura przy wyższym wieku?"
- "Porównaj scenariusz z wyższą pensją"

AI automatycznie rozpoznaje intencję i wywołuje odpowiednie funkcje do aktualizacji formularza.

## System Prompt (XML-like format)

System prompt jest zorganizowany w strukturze XML dla lepszej czytelności i parsowania przez model:

```xml
<system_role>
Inteligentny asystent AI dla Kalkulatora Emerytalnego ZUS
</system_role>

<capabilities>
  <knowledge>
    - System emerytalny w Polsce (ZUS, FUS20)
    - Kalkulacje emerytur i kapitału
    - Interpretacja wyników
  </knowledge>
  
  <tools>
    <tool name="update_form_field">...</tool>
    <tool name="update_multiple_fields">...</tool>
    <tool name="simulate_scenario">...</tool>
  </tools>
</capabilities>

<user_context>
  <current_data>
    - Płeć, wiek, wynagrodzenie
    - Rok rozpoczęcia pracy
    - Planowany rok emerytury
  </current_data>
  
  <calculated_results>
    - Prognozowana emerytura (nominalna i realna)
    - Stopa zastąpienia
    - Zgromadzony kapitał
    - Wpływ zwolnień lekarskich
  </calculated_results>
</user_context>

<instructions>
  1. Odpowiadaj zwięźle po polsku
  2. Gdy użytkownik prosi o zmianę - UŻYJ tool
  3. Wyjaśnij wpływ zmian
  4. Proaktywnie sugeruj symulacje
</instructions>
```

Ten format pomaga modelowi lepiej zrozumieć swoje możliwości i kontekst.

## Koszty

Model `gpt-4o-mini`:
- Input: ~$0.15 / 1M tokenów
- Output: ~$0.60 / 1M tokenów

Średnia konwersacja (10 wiadomości) kosztuje ~$0.001-0.005

Dla większej dokładności można zmienić model na `gpt-4o` w pliku `src/app/api/chat/route.ts`:

```typescript
model: 'gpt-4o', // Zamiast 'gpt-4o-mini'
```

## Customizacja

### Zmiana koloru
Widget używa zmiennej CSS `--zus-green-primary`. Można ją zmienić w `src/app/globals.css`.

### Zmiana modelu AI
W pliku `src/app/api/chat/route.ts` zmień parametr `model`:

```typescript
model: 'gpt-4o', // lub inny model OpenAI
```

### Dostosowanie system promptu
Edytuj funkcję `buildSystemPrompt()` w `src/app/api/chat/route.ts`.

### Zmiana max tokenów odpowiedzi
W `src/app/api/chat/route.ts`:

```typescript
max_tokens: 500, // Zwiększ dla dłuższych odpowiedzi
```

## Alternatywne providery LLM

### Anthropic Claude

Zainstaluj SDK:
```bash
npm install @anthropic-ai/sdk
```

Zmień kod w `route.ts`:
```typescript
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 500,
  messages: apiMessages,
})
```

### Azure OpenAI

Użyj Azure OpenAI endpoint:
```typescript
const response = await fetch('https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT/chat/completions?api-version=2024-02-15-preview', {
  headers: {
    'api-key': process.env.AZURE_OPENAI_KEY,
  },
  // ...
})
```

## Troubleshooting

### "Asystent AI nie jest obecnie skonfigurowany"
- Sprawdź czy plik `.env.local` istnieje
- Sprawdź czy `OPENAI_API_KEY` jest poprawnie ustawiony
- Zrestartuj serwer deweloperski

### Błędy API
- Sprawdź logi w konsoli przeglądarki i terminalu
- Zweryfikuj czy klucz API jest aktywny
- Sprawdź limity rate limit na koncie OpenAI

### Widget nie pojawia się
- Upewnij się że jesteś na stronie `/form`
- Sprawdź konsolę przeglądarki pod kątem błędów
- Zweryfikuj czy komponent jest poprawnie zaimportowany

## Bezpieczeństwo

- **Nigdy** nie commituj pliku `.env.local` do repozytorium
- Klucz API jest używany tylko po stronie serwera (API route)
- Dane użytkownika są wysyłane do OpenAI - upewnij się że jest to zgodne z polityką prywatności
- Rozważ dodanie rate limiting dla endpointu `/api/chat`

## Przyszłe usprawnienia

- [ ] Streaming responses dla lepszego UX
- [ ] Zapisywanie historii konwersacji w localStorage
- [ ] Rate limiting per użytkownik
- [ ] Analityka użycia chatu
- [ ] Wsparcie dla załączników/screenshotów
- [ ] Multi-language support
