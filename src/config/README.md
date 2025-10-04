# Konfiguracja Kalkulatora Emerytury

## 📁 Struktura plików

```
src/config/
├── index.ts                   # Re-export z pension-constants.ts
├── pension-constants.ts       # 🎯 WSZYSTKIE STAŁE W JEDNYM PLIKU
├── config-manager.ts          # Narzędzia do zarządzania konfiguracją
└── README.md                  # Ten plik
```

## 🔧 Jak zarządzać stałymi

### 1. Podstawowe zmiany
```typescript
// Wszystkie stałe w jednym pliku: src/config/pension-constants.ts

// Zmiana stopy składkowej
CONTRIBUTION_RATE: 0.20, // było 0.1952

// Zmiana wieku emerytalnego  
RETIREMENT_AGES: {
  MALE: 67, // było 65
  FEMALE: 62 // było 60
}
```

### 2. Zaawansowane zarządzanie
```typescript
import { PensionConfigManager } from '@/config/config-manager'

// Aktualizuj stopy
const newRates = PensionConfigManager.updatePensionRates({
  CONTRIBUTION_RATE: 0.20 // 20%
})

// Załaduj z API
const config = await PensionConfigManager.loadConfigFromAPI('/api/config')
```

### 3. Walidacja
```typescript
const isValid = PensionConfigManager.validateConfig(newConfig)
if (!isValid) {
  throw new Error('Nieprawidłowa konfiguracja')
}
```

## 📊 Źródła danych

### Pension Rates (pension-rates.ts)
- **CONTRIBUTION_RATE**: 19.52% - oficjalna stawka ZUS
- **AVERAGE_WAGE_GROWTH**: 3% - średni wzrost wynagrodzeń (NBP/GUS)
- **INFLATION_RATE**: 2.5% - cel inflacyjny NBP

### Life Expectancy (life-expectancy-tables.ts)
- Źródło: **GUS - Tabele trwania życia**
- Aktualizacja: co 3-5 lat
- Różnicowanie: wiek/płeć

### Market Data (market-data.ts)
- **AVERAGE_PENSION_2024**: 3500 zł - średnia emerytura
- Źródło: **ZUS - sprawozdania roczne**
- Aktualizacja: **rocznie**

## 🚀 Dodawanie nowych parametrów

### 1. Stwórz nowy plik
```typescript
// src/config/new-parameter.ts
export const NEW_PARAMETER = {
  VALUE: 123
} as const
```

### 2. Dodaj do index.ts
```typescript
import { NEW_PARAMETER } from './new-parameter'

export const PENSION_CONSTANTS = {
  // ... existing
  NEW_VALUE: NEW_PARAMETER.VALUE
}
```

### 3. Zaktualizuj typy
```typescript
// src/types/pension.ts
export interface PensionConstants {
  // ... existing
  NEW_VALUE: number
}
```

## ⚠️ Ważne uwagi

1. **Wszystkie zmiany** wpływają na UI i API
2. **Testuj** po każdej zmianie parametrów
3. **Dokumentuj** źródła danych
4. **Waliduj** nowe wartości przed wdrożeniem
5. **Backup** przed większymi zmianami
