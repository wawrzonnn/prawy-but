# API Kalkulatora Emerytalnego

## Endpoint: `/api/calculate-pension`

Oblicza prognozowaną emeryturę na podstawie danych wejściowych.

## TypeScript Types

Wszystkie typy dostępne w: `/src/types/api-types.ts`

```typescript
import type { 
  CalculatePensionRequest, 
  CalculatePensionResponse,
  CalculatePensionSuccessResponse,
  CalculatePensionErrorResponse 
} from '@/types/api-types'
```

### Metoda
`POST`

### URL
```
https://your-domain.com/api/calculate-pension
```

### Request Body

```json
{
  "age": 30,
  "gender": "male",
  "grossSalary": 7500,
  "workStartYear": 2015,
  "plannedRetirementYear": 2060,
  "zusAccountBalance": 0,
  "zusSubaccountBalance": 0,
  "includeSickLeave": false,
  "scenarioId": "moderate"
}
```

### Parametry

| Parametr | Typ | Wymagany | Opis |
|----------|-----|----------|------|
| `age` | number | ✅ Tak | Wiek (18-64) |
| `gender` | string | ✅ Tak | Płeć: `"male"` lub `"female"` |
| `grossSalary` | number | ✅ Tak | Wynagrodzenie brutto miesięczne (PLN) |
| `plannedRetirementYear` | number | ✅ Tak | Planowany rok przejścia na emeryturę |
| `initialCapital` | number | ❌ Nie | Kapitał początkowy dla osób które rozpoczęły pracę przed 1999 (PLN, domyślnie: 0) |
| `zusAccountBalance` | number | ❌ Nie | Środki na koncie ZUS (PLN, domyślnie: 0) |
| `zusSubaccountBalance` | number | ❌ Nie | Środki na subkoncie ZUS (PLN, domyślnie: 0) |
| `includeSickLeave` | boolean | ❌ Nie | Czy uwzględnić zwolnienia chorobowe (domyślnie: false) |
| `scenarioId` | string | ❌ Nie | Scenariusz ekonomiczny: `"pessimistic"`, `"moderate"` (domyślny), `"optimistic"` |

### Response (Success)

```json
{
  "success": true,
  "data": {
    "monthlyPension": 4250,
    "realMonthlyPension": 3100,
    "replacementRate": 45.5,
    "totalCapital": 520000,
    "lifeExpectancyMonths": 245,
    "futureGrossSalary": 9350,
    "futureAveragePension": 3800,
    "yearsToRetirement": 35
  },
  "scenario": {
    "id": "moderate",
    "name": "Scenariusz umiarkowany",
    "description": "Przeciętny wzrost gospodarczy, standardowe założenia"
  }
}
```

### Pola odpowiedzi

| Pole | Typ | Opis |
|------|-----|------|
| `monthlyPension` | number | Miesięczna emerytura w roku emerytury (nominalna, PLN) |
| `realMonthlyPension` | number | Miesięczna emerytura w dzisiejszej sile nabywczej (PLN) |
| `replacementRate` | number | Stopa zastąpienia (%) - stosunek emerytury do wynagrodzenia |
| `totalCapital` | number | Zgromadzony kapitał emerytalny (PLN) |
| `lifeExpectancyMonths` | number | Oczekiwana długość życia na emeryturze (miesiące) |
| `futureGrossSalary` | number | Prognozowane wynagrodzenie w roku emerytury (PLN) |
| `futureAveragePension` | number | Średnia emerytura w roku emerytury (PLN) |
| `yearsToRetirement` | number | Lata do emerytury |

### Response (Error)

```json
{
  "success": false,
  "error": "Opis błędu",
  "details": "Szczegóły techniczne (opcjonalnie)"
}
```

### Kody HTTP

| Kod | Znaczenie |
|-----|-----------|
| 200 | Sukces - emerytura obliczona |
| 400 | Błąd walidacji - nieprawidłowe dane wejściowe |
| 500 | Błąd serwera |

## Przykłady użycia

### cURL

```bash
curl -X POST https://your-domain.com/api/calculate-pension \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "gender": "male",
    "grossSalary": 7500,
    "plannedRetirementYear": 2060
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch('https://your-domain.com/api/calculate-pension', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    age: 30,
    gender: 'male',
    grossSalary: 7500,
    plannedRetirementYear: 2060,
    scenarioId: 'moderate'
  })
});

const result = await response.json();

if (result.success) {
  console.log('Miesięczna emerytura:', result.data.monthlyPension, 'zł');
  console.log('W dzisiejszej sile nabywczej:', result.data.realMonthlyPension, 'zł');
  console.log('Stopa zastąpienia:', result.data.replacementRate, '%');
} else {
  console.error('Błąd:', result.error);
}
```

### TypeScript (fetch z typami)

```typescript
import type { 
  CalculatePensionRequest, 
  CalculatePensionResponse 
} from '@/types/api-types'

const requestData: CalculatePensionRequest = {
  age: 30,
  gender: 'male',
  grossSalary: 7500,
  plannedRetirementYear: 2060,
  scenarioId: 'moderate'
}

const response = await fetch('/api/calculate-pension', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestData)
})

const result: CalculatePensionResponse = await response.json()

if (result.success) {
  // TypeScript wie że result.data istnieje
  console.log('Miesięczna emerytura:', result.data.monthlyPension, 'zł')
  console.log('W dzisiejszej sile nabywczej:', result.data.realMonthlyPension, 'zł')
  console.log('Stopa zastąpienia:', result.data.replacementRate, '%')
  console.log('Scenariusz:', result.scenario.name)
} else {
  // TypeScript wie że result.error istnieje
  console.error('Błąd:', result.error)
  if (result.details) {
    console.error('Szczegóły:', result.details)
  }
}
```

### Python (requests)

```python
import requests

url = 'https://your-domain.com/api/calculate-pension'
data = {
    'age': 30,
    'gender': 'male',
    'grossSalary': 7500,
    'plannedRetirementYear': 2060,
    'scenarioId': 'moderate'
}

response = requests.post(url, json=data)
result = response.json()

if result['success']:
    print(f"Miesięczna emerytura: {result['data']['monthlyPension']} zł")
    print(f"W dzisiejszej sile nabywczej: {result['data']['realMonthlyPension']} zł")
    print(f"Stopa zastąpienia: {result['data']['replacementRate']}%")
else:
    print(f"Błąd: {result['error']}")
```

## Scenariusze ekonomiczne

### Pesymistyczny (`pessimistic`)
- Wzrost wynagrodzeń: 1.2% rocznie
- Inflacja: 2.5% rocznie
- Bezrobocie: 6.0%

### Umiarkowany (`moderate`) - domyślny
- Wzrost wynagrodzeń: 2.0% rocznie
- Inflacja: 2.5% rocznie
- Bezrobocie: 5.0%

### Optymistyczny (`optimistic`)
- Wzrost wynagrodzeń: 2.8% rocznie
- Inflacja: 2.5% rocznie
- Bezrobocie: 4.2%

## Uwagi

1. **Waloryzacja**: Wszystkie kwoty są waloryzowane zgodnie z modelem aktuarialnym ZUS FUS20
2. **Kapitał początkowy**: Dla osób urodzonych przed 1949 rokiem uwzględniany jest kapitał z lat przed 1999
3. **Zwolnienia chorobowe**: Domyślnie 9 dni/rok dla mężczyzn, 12 dni/rok dla kobiet
4. **Wiek emerytalny**: 65 lat dla mężczyzn, 60 lat dla kobiet (zgodnie z polskim prawem)

## Rate Limiting

Obecnie brak limitów. W produkcji zalecane jest wprowadzenie rate limitingu.

## Wsparcie

W razie pytań lub problemów, skontaktuj się z zespołem deweloperskim.
