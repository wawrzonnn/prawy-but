# Implementation Roadmap: ZUS FUS20 Compliant Pension Calculator

## 🎯 Goal: Full compliance with ZUS FUS20 specification

---

## 🚀 Implementation Steps

### **PHASE 1: Data Structure & Types** ⏱️ 2-3h

#### 1.1 Create specification-compliant types
```typescript
// src/types/fus20-types.ts
interface IndividualInputData {
  gender: 'male' | 'female'
  currentAge: number
  contributoryPeriodBefore1999: {
    totalYears: number
    nonContributoryYears?: number
  }
  insuranceTitle: {
    code: string // '05' for employees, etc.
    type: 'employee' | 'jdg' | 'rsp_member' | 'farmer'
  }
  contributionBase: {
    currentMonthlyAmount: number
    isJdgPreferential?: boolean
  }
  plannedRetirementAge: number
  sickLeave?: {
    includeInCalculation: boolean
    averageDaysPerYear?: number
    voivodeship?: string
  }
  accumulatedCapital?: {
    zusAccount: number
    zusSubaccount: number
  }
}

interface MacroeconomicScenario {
  id: 'pessimistic' | 'moderate' | 'optimistic'
  parameters: {
    unemploymentRate2080: number
    realWageGrowthIndex2080: number
    inflationIndex2080: number
    contributionCollectionRate2080: number
  }
}
```

#### 1.2 System constants definition
```typescript
// src/config/zus-constants.ts
export const ZUS_SYSTEM_PARAMETERS = {
  RETIREMENT_AGE: {
    MALE: 65,
    FEMALE: 60
  },
  CONTRIBUTION_RATES: {
    TOTAL: 0.1952, // 19.52%
    JDG_PREFERENTIAL: {
      PENSION: 176.27, // PLN monthly
      DISABILITY: 204.37
    },
    JDG_STANDARD: {
      PENSION: 812.23
    }
  },
  INITIAL_CAPITAL: {
    BASE_AMOUNT: 24000, // PLN
    MULTIPLIER_PER_YEAR: 0.013 // 1.3% per year
  }
}
```

### **PHASE 2: FUS20 Macroeconomic Scenarios** ⏱️ 3-4h

#### 2.1 Implement 3 FUS20 scenarios
```typescript
// src/config/fus20-scenarios.ts
export const FUS20_SCENARIOS = {
  PESSIMISTIC: {
    id: 'pessimistic',
    name: 'Pessimistic Scenario',
    parameters: {
      unemploymentRate2080: 0.06, // 6.00%
      realWageGrowthIndex2080: 1.012, // 101.20%
      inflationIndex2080: 1.025, // 102.50%
      contributionCollectionRate2080: 0.98 // 98.00%
    }
  },
  MODERATE: {
    id: 'moderate',
    name: 'Moderate Scenario',
    parameters: {
      unemploymentRate2080: 0.05, // 5.00%
      realWageGrowthIndex2080: 1.02, // 102.00%
      inflationIndex2080: 1.025, // 102.50%
      contributionCollectionRate2080: 0.99 // 99.00%
    }
  },
  OPTIMISTIC: {
    id: 'optimistic',
    name: 'Optimistic Scenario',
    parameters: {
      unemploymentRate2080: 0.042, // 4.20%
      realWageGrowthIndex2080: 1.028, // 102.80%
      inflationIndex2080: 1.025, // 102.50%
      contributionCollectionRate2080: 0.995 // 99.50%
    }
  }
} as const
```

#### 2.2 Dynamic indicator calculation
```typescript
// src/lib/scenario-interpolation.ts
function interpolateScenarioParameters(
  scenario: MacroeconomicScenario,
  currentYear: number,
  targetYear: number
): YearlyParameters {
  // Linear interpolation between current year and 2080
  // Progressive parameter changes over time
  // Contribution valorization according to regulations
}
```

### **PHASE 3: Micro-Inputs Implementation** ⏱️ 4-5h

#### 3.1 Extend form with required fields
```typescript
// New form fields according to specification:
interface FormData extends IndividualInputData {
  // History of contributions before 1999
  contributoryPeriodBefore1999: {
    totalYears: number
    nonContributoryYears: number
  }
  
  // Insurance title code (dropdown)
  insuranceTitle: {
    code: '05' | '06' | '08' // employees/farmers/RSP
    type: 'employee' | 'jdg' | 'rsp_member' | 'farmer'
  }
  
  // Contribution base (including JDG preferential)
  contributionBase: {
    currentMonthlyAmount: number
    isJdgPreferential: boolean
    jdgPreferentialMonths?: number
  }
  
  // Sick leave (optional - regional data)
  sickLeave: {
    includeInCalculation: boolean
    averageDaysPerYear?: number
    voivodeship?: string
  }
}
```

#### 3.2 Data validation according to specification
```typescript
// src/lib/fus20-validation.ts
interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

function validateIndividualInputData(
  data: IndividualInputData
): ValidationResult {
  // Check required fields
  // Validate insurance title codes
  // Control contribution base (min/max)
  // Verify retirement age
}
```

### **PHASE 4: Calculation Engine** ⏱️ 6-8h

#### 4.1 Initial capital (for those born before 1949)
```typescript
// src/lib/initial-capital-calculator.ts
function calculateInitialCapital(
  birthYear: number, 
  contributoryYearsBefore1999: number
): number {
  if (birthYear >= 1949) return 0
  
  // ZUS formula: base amount + (years of service * multiplier * base amount)
  const baseAmount = ZUS_SYSTEM_PARAMETERS.INITIAL_CAPITAL.BASE_AMOUNT
  const multiplierPerYear = ZUS_SYSTEM_PARAMETERS.INITIAL_CAPITAL.MULTIPLIER_PER_YEAR
  
  return baseAmount + (contributoryYearsBefore1999 * multiplierPerYear * baseAmount)
}
```

#### 4.2 Contribution valorization
```typescript
// src/lib/contribution-valorization.ts
function valorizeContributions(
  contributions: number[], 
  fromYear: number, 
  toYear: number, 
  scenario: MacroeconomicScenario
): number {
  // Valorization = wage growth + inflation
  // Use indicators from selected FUS20 scenario
  // Interpolation between current year and 2080
  
  let valorizedAmount = 0
  for (let year = fromYear; year < toYear; year++) {
    const yearlyParams = interpolateScenarioParameters(scenario, year, 2080)
    const valorizationRate = yearlyParams.wageGrowthRate + yearlyParams.inflationRate
    valorizedAmount += contributions[year - fromYear] * Math.pow(1 + valorizationRate, toYear - year)
  }
  return valorizedAmount
}
```

#### 4.3 Calculate contributions by insurance type
```typescript
// src/lib/contribution-calculator.ts
function calculateMonthlyContribution(
  insuranceTitle: InsuranceTitle, 
  contributionBase: ContributionBase
): number {
  switch(insuranceTitle.type) {
    case 'employee':
      return contributionBase.currentMonthlyAmount * ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.TOTAL
    case 'jdg':
      return contributionBase.isJdgPreferential 
        ? ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.JDG_PREFERENTIAL.PENSION
        : ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.JDG_STANDARD.PENSION
    case 'rsp_member':
      return contributionBase.currentMonthlyAmount * ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.TOTAL
    case 'farmer':
      // Special KRUS rules
      return calculateKrusContribution(contributionBase)
  }
}
```

#### 4.4 Precise life expectancy tables
```typescript
// src/config/gus-life-tables.ts
export const LIFE_EXPECTANCY_GUS_2022 = {
  MALE: {
    AGE_60: 19.8, AGE_61: 19.0, AGE_62: 18.2, AGE_63: 17.4,
    AGE_64: 16.6, AGE_65: 15.8, AGE_66: 15.1, AGE_67: 14.3
  },
  FEMALE: {
    AGE_55: 26.8, AGE_56: 25.9, AGE_57: 25.0, AGE_58: 24.1,
    AGE_59: 23.2, AGE_60: 22.3, AGE_61: 21.4, AGE_62: 20.5
  }
} as const

function getLifeExpectancyAtRetirement(
  gender: 'male' | 'female', 
  retirementAge: number
): number {
  const tables = LIFE_EXPECTANCY_GUS_2022[gender.toUpperCase()]
  const ageKey = `AGE_${retirementAge}` as keyof typeof tables
  return tables[ageKey] || interpolateLifeExpectancy(gender, retirementAge)
}
```

### **PHASE 5: Specification-Compliant Results** ⏱️ 3-4h

#### 5.1 Real amount (nominal)
```typescript
// src/lib/pension-calculator.ts
interface PensionAmounts {
  // Amount in future money value (year of retirement)
  nominalAmount: number
  nominalAmountFormatted: string
  
  // Amount discounted to today's purchasing power
  realAmount: number
  realAmountFormatted: string
  
  // Replacement rate
  replacementRate: number
}

function calculateNominalPension(
  totalCapital: number, 
  lifeExpectancyMonths: number
): number {
  return totalCapital / lifeExpectancyMonths
}
```

#### 5.2 Real amount (discounted)
```typescript
function calculateRealPension(
  nominalPension: number, 
  yearsToRetirement: number, 
  scenario: MacroeconomicScenario
): number {
  // Discounted to today's purchasing power
  const inflationRate = scenario.parameters.inflationIndex2080 - 1
  return nominalPension / Math.pow(1 + inflationRate, yearsToRetirement)
}
```

#### 5.3 Detailed results structure
```typescript
// src/types/calculation-results.ts
interface PensionCalculationResult {
  pensionAmounts: {
    nominalAmount: number
    realAmount: number
    replacementRate: number
  }
  capitalBreakdown: {
    initialCapital: number
    contributionsCapital: number
    valorizedTotal: number
    sickLeaveImpact?: number
  }
  calculationDetails: {
    lifeExpectancyAtRetirement: number
    yearsToRetirement: number
    totalContributoryPeriod: number
  }
  scenarioDetails: {
    usedScenario: MacroeconomicScenario
    assumptions: string[]
    disclaimers: string[]
  }
  alternativeScenarios?: {
    delayedRetirement: DelayedRetirementScenario[]
    differentContributions: ContributionScenario[]
  }
}
```

### **PHASE 6: API Endpoint** ⏱️ 2-3h

#### 6.1 Professional FUS20 endpoint
```typescript
// src/app/api/pension/fus20/route.ts
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { inputData, scenarioId } = await request.json()
    
    // Validate all required fields
    const validation = validateIndividualInputData(inputData)
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: validation.errors
        }
      }, { status: 400 })
    }
    
    // Select macroeconomic scenario
    const scenario = FUS20_SCENARIOS[scenarioId.toUpperCase()]
    
    // Full calculation according to specification
    const result = calculatePensionFUS20(inputData, scenario)
    
    return NextResponse.json({
      success: true,
      data: result,
      warnings: validation.warnings
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: 'Calculation failed'
      }
    }, { status: 500 })
  }
}
```

#### 6.2 API documentation
```typescript
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'ZUS FUS20 Pension Calculator',
    version: '2.0.0',
    description: 'Professional pension calculator compliant with ZUS FUS20 actuarial model',
    
    scenarios: Object.values(FUS20_SCENARIOS),
    
    requiredFields: [
      'gender', 'currentAge', 'contributionBase.currentMonthlyAmount'
    ],
    
    optionalFields: [
      'contributoryPeriodBefore1999', 'insuranceTitle', 
      'plannedRetirementAge', 'accumulatedCapital', 'sickLeave'
    ],
    
    exampleRequest: {
      inputData: {
        gender: 'male',
        currentAge: 35,
        contributionBase: { currentMonthlyAmount: 8000 },
        // ... other fields
      },
      scenarioId: 'moderate'
    }
  })
}
```

### **PHASE 7: UI Update** ⏱️ 4-5h

#### 7.1 Extended form
```typescript
// src/components/FUS20PensionForm.tsx
interface FUS20FormProps {
  onCalculate: (data: IndividualInputData, scenario: string) => void
}

function FUS20PensionForm({ onCalculate }: FUS20FormProps) {
  // Add all required micro-input fields
  // Macroeconomic scenario selection
  // "Contribution history before 1998" section
  // Insurance title codes dropdown
  // JDG contribution calculator (preferential/standard)
  
  return (
    <form>
      {/* Basic data */}
      <GenderSelection />
      <AgeInput />
      
      {/* Contribution history before 1999 */}
      <ContributionHistorySection />
      
      {/* Insurance title */}
      <InsuranceTitleDropdown />
      
      {/* Contribution base */}
      <ContributionBaseCalculator />
      
      {/* Scenario selection */}
      <ScenarioSelector scenarios={FUS20_SCENARIOS} />
      
      {/* Optional fields */}
      <SickLeaveSection />
      <AccumulatedCapitalSection />
    </form>
  )
}
```

#### 7.2 Detailed results display
```typescript
// src/components/FUS20Results.tsx
function FUS20Results({ result }: { result: PensionCalculationResult }) {
  return (
    <div>
      {/* Real vs nominal amounts */}
      <PensionAmountsCard 
        nominal={result.pensionAmounts.nominalAmount}
        real={result.pensionAmounts.realAmount}
        replacementRate={result.pensionAmounts.replacementRate}
      />
      
      {/* Capital breakdown */}
      <CapitalBreakdownCard 
        initial={result.capitalBreakdown.initialCapital}
        contributions={result.capitalBreakdown.contributionsCapital}
        valorized={result.capitalBreakdown.valorizedTotal}
      />
      
      {/* Scenario comparison */}
      <ScenarioComparisonTable 
        scenarios={['pessimistic', 'moderate', 'optimistic']}
      />
      
      {/* Parameter impact analysis */}
      <ParameterImpactChart />
    </div>
  )
}
```

### **PHASE 8: Testing & Validation** ⏱️ 3-4h

#### 8.1 Unit tests
```typescript
// src/__tests__/fus20-calculator.test.ts
describe('FUS20 Calculator', () => {
  test('should calculate initial capital correctly', () => {
    const result = calculateInitialCapital(1945, 15)
    expect(result).toBeGreaterThan(0)
  })
  
  test('should handle all macroeconomic scenarios', () => {
    Object.values(FUS20_SCENARIOS).forEach(scenario => {
      const result = calculatePensionFUS20(mockInputData, scenario)
      expect(result.pensionAmounts.nominalAmount).toBeGreaterThan(0)
    })
  })
  
  test('should validate contribution valorization', () => {
    const valorized = valorizeContributions([1000], 2024, 2060, FUS20_SCENARIOS.MODERATE)
    expect(valorized).toBeGreaterThan(1000)
  })
  
  test('should handle different insurance types', () => {
    const employeeContribution = calculateMonthlyContribution(
      { type: 'employee', code: '05' },
      { currentMonthlyAmount: 5000 }
    )
    const jdgContribution = calculateMonthlyContribution(
      { type: 'jdg', code: '05' },
      { currentMonthlyAmount: 5000, isJdgPreferential: true }
    )
    expect(employeeContribution).not.toEqual(jdgContribution)
  })
})
```

#### 8.2 Integration tests
```typescript
// src/__tests__/api-integration.test.ts
describe('FUS20 API Integration', () => {
  test('should return valid calculation results', async () => {
    const response = await fetch('/api/pension/fus20', {
      method: 'POST',
      body: JSON.stringify({ inputData: mockData, scenarioId: 'moderate' })
    })
    const result = await response.json()
    expect(result.success).toBe(true)
    expect(result.data.pensionAmounts.nominalAmount).toBeGreaterThan(0)
  })
  
  test('should validate input data properly', async () => {
    const response = await fetch('/api/pension/fus20', {
      method: 'POST',
      body: JSON.stringify({ inputData: invalidData })
    })
    expect(response.status).toBe(400)
  })
})
```

#### 8.3 Test cases
```typescript
// Test scenarios according to specification:
const testCases = [
  {
    name: 'Male employee, 35 years, no initial capital',
    data: {
      gender: 'male',
      currentAge: 35,
      contributoryPeriodBefore1999: { totalYears: 0 },
      insuranceTitle: { type: 'employee', code: '05' },
      contributionBase: { currentMonthlyAmount: 8000 }
    }
  },
  {
    name: 'Female JDG preferential, 45 years, with pre-1998 service',
    data: {
      gender: 'female',
      currentAge: 45,
      contributoryPeriodBefore1999: { totalYears: 10 },
      insuranceTitle: { type: 'jdg', code: '05' },
      contributionBase: { currentMonthlyAmount: 5000, isJdgPreferential: true }
    }
  },
  {
    name: 'Male born before 1949, with initial capital',
    data: {
      gender: 'male',
      currentAge: 80, // born in 1944
      contributoryPeriodBefore1999: { totalYears: 25 },
      insuranceTitle: { type: 'employee', code: '05' },
      contributionBase: { currentMonthlyAmount: 6000 }
    }
  }
]
```

---

## 📊 Implementation Timeline

| Phase | Time | Priority | Dependencies |
|-------|------|----------|-------------|
| **Phase 1** | 2-3h | 🔴 Critical | - |
| **Phase 2** | 3-4h | 🔴 Critical | Phase 1 |
| **Phase 3** | 4-5h | 🟡 High | Phase 1 |
| **Phase 4** | 6-8h | 🔴 Critical | Phase 1, 2 |
| **Phase 5** | 3-4h | 🟡 High | Phase 4 |
| **Phase 6** | 2-3h | 🟢 Medium | Phase 4, 5 |
| **Phase 7** | 4-5h | 🟡 High | Phase 3, 4 |
| **Phase 8** | 3-4h | 🟢 Medium | All phases |

**Total time: 27-36 hours of work**

---

## 🎯 Success Criteria

### ✅ Minimum requirements (FUS20-compliant MVP):
- [ ] All 3 FUS20 macroeconomic scenarios
- [ ] Initial capital for those born before 1949
- [ ] Contribution valorization according to regulations
- [ ] Insurance type differentiation (employees/JDG/RSP)
- [ ] Precise GUS life expectancy tables
- [ ] Real and nominal amounts

### ✅ Full specification compliance:
- [ ] All micro-inputs from documentation
- [ ] Dynamic macroeconomic indicators
- [ ] Contribution collection rates (98%-99.5%)
- [ ] Regional sick leave data
- [ ] Complete documentation and tests
- [ ] ZUS-standard compliant API

---

## ⚠️ Risks & Challenges

### 🔴 High risk:
1. **Limited access to full ZUS data** - some parameters may require approximation
2. **Valorization complexity** - regulations may change over time
3. **Data updates** - GUS tables and indicators require regular updates

### 🟡 Medium risk:
1. **Calculation performance** - complex calculations may be slow
2. **Data validation** - complicated business rules
3. **Compatibility** - different browsers and devices

### 🟢 Low risk:
1. **UI/UX** - can be improved iteratively
2. **Tests** - can be added gradually
3. **Documentation** - can be expanded over time

---

## 📚 Data Sources for Implementation

### Required external data:
1. **ZUS**: FUS20 model, valorization indicators, average pensions
2. **GUS**: Life expectancy tables 2020-2022, demographic statistics

### Update frequency:
- **Annually**: Valorization indicators, average pensions
- **Every 3-5 years**: GUS life expectancy tables
- **Every 2-3 years**: FUS20 macroeconomic scenarios

---

## 🚀 Implementation Checklist

### Phase 1: Data Structure & Types
- [ ] Create `IndividualInputData` interface
- [ ] Define `MacroeconomicScenario` types
- [ ] Set up `ZUS_SYSTEM_PARAMETERS` constants
- [ ] Implement validation interfaces

{{ ... }}
### Phase 8: Testing
- [ ] Unit tests for all functions
- [ ] Integration tests
- [ ] Test cases validation
- [ ] Performance testing

---

## 🔮 Future Extensions

The calculator can be extended with:
- **Third pillar pensions**: PPK, IKE, IKZE
- **Bridge pensions**: For uniformed services
- **Disability pensions**: Calculation of disability benefits
- **Agricultural pensions**: Integration with KRUS system
- **International agreements**: Cross-border pension calculations
- **Tax optimization**: Net pension amount calculations

{{ ... }}
