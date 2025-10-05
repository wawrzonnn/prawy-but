# OpenAI Tool Calling - Przewodnik Implementacji

## Czym jest Tool Calling?

Tool Calling (Function Calling) to funkcjonalność OpenAI, która pozwala modelom GPT **wywoływać funkcje w Twoim kodzie** na podstawie naturalnego języka użytkownika.

Zamiast tylko generować tekst, model może:
1. Rozpoznać intencję użytkownika
2. Zdecydować którą funkcję wywołać
3. Wygenerować poprawne parametry w formacie JSON
4. Zwrócić te dane do Twojego kodu

## Jak to działa?

### 1. Definiujesz dostępne funkcje

```typescript
const tools = [
  {
    type: 'function',
    function: {
      name: 'update_form_field',
      description: 'Aktualizuje pole formularza',
      parameters: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            enum: ['age', 'salary', 'gender'],
            description: 'Nazwa pola'
          },
          value: {
            description: 'Nowa wartość'
          }
        },
        required: ['field', 'value']
      }
    }
  }
]
```

### 2. Wysyłasz tools do OpenAI API

```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: messages,
    tools: tools,           // ← Przekazujesz definicje funkcji
    tool_choice: 'auto'     // ← Model sam decyduje czy użyć
  })
})
```

### 3. Model zwraca tool_calls

Gdy użytkownik napisze: **"Ustaw wiek na 35 lat"**

Model zwraca:
```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": null,
      "tool_calls": [{
        "id": "call_abc123",
        "type": "function",
        "function": {
          "name": "update_form_field",
          "arguments": "{\"field\": \"age\", \"value\": 35}"
        }
      }]
    }
  }]
}
```

### 4. Wykonujesz funkcję w swoim kodzie

```typescript
if (assistantMessage.tool_calls) {
  for (const toolCall of assistantMessage.tool_calls) {
    const functionName = toolCall.function.name
    const args = JSON.parse(toolCall.function.arguments)
    
    // Wywołaj swoją funkcję
    if (functionName === 'update_form_field') {
      updateFormField(args.field, args.value)
    }
  }
}
```

## Nasza implementacja

### Backend (`src/app/api/chat/route.ts`)

**3 funkcje:**
1. `update_form_field` - pojedyncze pole
2. `update_multiple_fields` - wiele pól naraz
3. `simulate_scenario` - scenariusze "co jeśli"

**Przepływ:**
1. Użytkownik pisze wiadomość
2. API wysyła do OpenAI z definicjami tools
3. Model zwraca tool_calls (jeśli potrzebne)
4. Backend wykonuje funkcje i zwraca wyniki
5. Frontend aktualizuje stan formularza

### Frontend (`src/components/ChatWidget.tsx`)

**Callback `onFormUpdate`:**
```typescript
const handleFormUpdate = (updates: Record<string, any>) => {
  setFormData(prev => ({
    ...prev,
    ...updates
  }))
}
```

**Obsługa tool calls:**
```typescript
if (data.requires_tool_execution && data.tool_results) {
  for (const toolResult of data.tool_results) {
    if (toolResult.result.success && onFormUpdate) {
      onFormUpdate(toolResult.result.updates)
    }
  }
}
```

## Best Practices

### 1. Dokładne opisy funkcji
```typescript
description: 'Aktualizuje pojedyncze pole formularza kalkulatora emerytalnego. Użyj tej funkcji gdy użytkownik chce zmienić swoje dane lub przeprowadzić symulację z innymi wartościami.'
```

Im lepszy opis, tym lepiej model rozumie kiedy użyć funkcji.

### 2. Używaj enum dla ograniczonych wartości
```typescript
field: {
  type: 'string',
  enum: ['age', 'gender', 'grossSalary'],  // ← Tylko te wartości
  description: 'Nazwa pola do aktualizacji'
}
```

### 3. Walidacja po stronie serwera
```typescript
function executeToolCall(toolName: string, args: any) {
  // Waliduj argumenty
  if (args.age < 18 || args.age > 64) {
    return { success: false, error: 'Nieprawidłowy wiek' }
  }
  
  // Wykonaj akcję
  return { success: true, message: 'Zaktualizowano' }
}
```

### 4. Tool choice options

```typescript
tool_choice: 'auto'      // Model sam decyduje (domyślne)
tool_choice: 'none'      // Wyłącz tool calling
tool_choice: 'required'  // Wymusz użycie tool
tool_choice: { type: 'function', function: { name: 'update_form_field' } }  // Konkretna funkcja
```

### 5. Parallel function calling

Model może wywołać **wiele funkcji naraz**:
```json
{
  "tool_calls": [
    { "function": { "name": "update_form_field", "arguments": "{\"field\": \"age\", \"value\": 35}" }},
    { "function": { "name": "update_form_field", "arguments": "{\"field\": \"salary\", \"value\": 8000}" }}
  ]
}
```

Obsłuż to w pętli:
```typescript
for (const toolCall of toolCalls) {
  executeToolCall(toolCall.function.name, JSON.parse(toolCall.function.arguments))
}
```

## Debugging

### Console logs
```typescript
console.log('Tool call:', toolCall.function.name, functionArgs)
console.log('Tool result:', result)
```

### Sprawdź response z OpenAI
```typescript
const data = await response.json()
console.log('OpenAI response:', JSON.stringify(data, null, 2))
```

### Testuj z różnymi promptami
- "Ustaw wiek na 35" ✅
- "Zmień mój wiek" ❌ (brak wartości)
- "Wiek 35" ✅ (model domyśli się)

## Koszty

Tool calling **nie zwiększa** znacząco kosztów:
- Definicje tools liczą się jako input tokens
- ~50-100 tokenów na tool definition
- Odpowiedź z tool_calls: ~20-50 tokenów

**Przykład:**
- 3 tools = ~150 tokenów input
- Koszt: ~$0.00002 na request (gpt-4o-mini)

## Alternatywy

### Structured Outputs
Nowsza metoda (2024) - gwarantuje zgodność ze schematem JSON:
```typescript
response_format: {
  type: "json_schema",
  json_schema: {
    name: "form_update",
    schema: { /* JSON Schema */ }
  }
}
```

### JSON Mode
Prostszy, ale mniej precyzyjny:
```typescript
response_format: { type: "json_object" }
```

## Zasoby

- [OpenAI Function Calling Docs](https://platform.openai.com/docs/guides/function-calling)
- [JSON Schema Reference](https://json-schema.org/understanding-json-schema/)
- [OpenAI Cookbook Examples](https://cookbook.openai.com/)

## Podsumowanie

Tool Calling pozwala AI **wykonywać akcje** zamiast tylko rozmawiać. W naszym przypadku:

**Użytkownik:** "Zrób symulację z pensją 12000 zł"
↓
**AI rozpoznaje:** Trzeba wywołać `update_form_field`
↓
**Backend wykonuje:** Aktualizuje `grossSalary: 12000`
↓
**Frontend:** Odświeża formularz i wyniki
↓
**Użytkownik:** Widzi nowe obliczenia w czasie rzeczywistym

To właśnie **magia tool calling**! 🎯
