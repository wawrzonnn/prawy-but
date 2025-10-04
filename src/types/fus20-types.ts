/**
 * TypeScript types for ZUS FUS20 pension calculator
 * Based on official ZUS FUS20 actuarial model specification
 */

// ===== MICRO-INPUTS (Individual Data) =====

export interface ContributoryPeriodBefore1999 {
  totalYears: number
  nonContributoryYears?: number
}

export interface InsuranceTitle {
  code: '05' | '06' | '08' | string // '05' = employees, '06' = farmers, '08' = RSP
  type: 'employee' | 'jdg' | 'rsp_member' | 'farmer'
  description?: string
}

export interface ContributionBase {
  currentMonthlyAmount: number
  isJdgPreferential?: boolean
  jdgPreferentialMonths?: number
}

export interface SickLeaveData {
  includeInCalculation: boolean
  averageDaysPerYear?: number
  voivodeship?: string
}

export interface AccumulatedCapital {
  zusAccount: number
  zusSubaccount: number
  ofeAccount?: number
}

export interface IndividualInputData {
  // Basic identification
  gender: 'male' | 'female'
  currentAge: number
  
  // Contribution history before 1999
  contributoryPeriodBefore1999: ContributoryPeriodBefore1999
  
  // Insurance status
  insuranceTitle: InsuranceTitle
  
  // Contribution base
  contributionBase: ContributionBase
  
  // Planned retirement
  plannedRetirementAge: number
  
  // Optional: sick leave
  sickLeave?: SickLeaveData
  
  // Optional: accumulated capital
  accumulatedCapital?: AccumulatedCapital
}

// ===== MACRO-PARAMETERS (FUS20 Scenarios) =====

export interface MacroeconomicParameters {
  unemploymentRate2080: number // e.g., 0.05 = 5%
  realWageGrowthIndex2080: number // e.g., 1.02 = 102%
  inflationIndex2080: number // e.g., 1.025 = 102.5%
  contributionCollectionRate2080: number // e.g., 0.99 = 99%
}

export interface MacroeconomicScenario {
  id: 'pessimistic' | 'moderate' | 'optimistic'
  name: string
  description: string
  parameters: MacroeconomicParameters
}

// ===== CALCULATION RESULTS =====

export interface PensionAmounts {
  // Nominal amount (future money value)
  nominalAmount: number
  nominalAmountFormatted: string
  
  // Real amount (discounted to today's purchasing power)
  realAmount: number
  realAmountFormatted: string
  
  // Replacement rate (percentage of final salary)
  replacementRate: number
}

export interface CapitalBreakdown {
  initialCapital: number
  contributionsCapital: number
  valorizedTotal: number
  sickLeaveImpact?: number
}

export interface CalculationDetails {
  lifeExpectancyAtRetirement: number // in years
  lifeExpectancyMonths: number
  yearsToRetirement: number
  monthsToRetirement: number
  totalContributoryPeriod: number
  finalSalary: number
}

export interface SickLeaveImpact {
  averageDaysPerYear: number
  totalDaysLost: number
  contributionReduction: number
  percentageImpact: number
}

export interface DelayedRetirementScenario {
  delayYears: number
  nominalAmount: number
  realAmount: number
  replacementRate: number
  totalCapital: number
}

export interface ContributionScenario {
  changePercentage: number
  nominalAmount: number
  realAmount: number
  replacementRate: number
  totalCapital: number
}

export interface AlternativeScenarios {
  delayedRetirement: {
    oneYear: DelayedRetirementScenario
    twoYears: DelayedRetirementScenario
    fiveYears: DelayedRetirementScenario
  }
  differentContributions: {
    higher10Percent: ContributionScenario
    higher20Percent: ContributionScenario
    lower10Percent: ContributionScenario
  }
}

export interface Comparisons {
  averagePensionInRetirementYear: number
  percentageOfAveragePension: number
  minimumPensionInRetirementYear: number
  percentageOfMinimumPension: number
}

export interface ScenarioDetails {
  usedScenario: MacroeconomicScenario
  assumptions: string[]
  disclaimers: string[]
}

export interface PensionCalculationResult {
  pensionAmounts: PensionAmounts
  capitalBreakdown: CapitalBreakdown
  calculationDetails: CalculationDetails
  sickLeaveImpact?: SickLeaveImpact
  alternativeScenarios?: AlternativeScenarios
  comparisons: Comparisons
  scenarioDetails: ScenarioDetails
  calculationDate: Date
}

// ===== VALIDATION =====

export interface ValidationError {
  field: string
  code: string
  message: string
}

export interface ValidationWarning {
  field: string
  code: string
  message: string
  suggestion?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

// ===== API RESPONSE =====

export interface FUS20ApiResponse {
  success: boolean
  data?: PensionCalculationResult
  error?: {
    code: string
    message: string
    details?: string[]
  }
  warnings?: string[]
}
