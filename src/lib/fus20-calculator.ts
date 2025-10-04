/**
 * ZUS FUS20 Pension Calculator
 * Professional pension calculator compliant with ZUS FUS20 actuarial model
 */

import {
  IndividualInputData,
  MacroeconomicScenario,
  PensionCalculationResult,
  PensionAmounts,
  CapitalBreakdown,
  CalculationDetails,
  SickLeaveImpact,
  AlternativeScenarios,
  Comparisons,
  ScenarioDetails
} from '@/types/fus20-types'

import { ZUS_SYSTEM_PARAMETERS } from '@/config/zus-constants'
import { DEFAULT_SCENARIO } from '@/config/fus20-scenarios'
import { getLifeExpectancyAtRetirement } from '@/config/gus-life-tables'

/**
 * Main calculation function - FUS20 compliant
 */
export function calculatePensionFUS20(
  inputData: IndividualInputData,
  scenario: MacroeconomicScenario = DEFAULT_SCENARIO
): PensionCalculationResult {
  const currentYear = new Date().getFullYear()
  const birthYear = currentYear - inputData.currentAge
  
  // 1. Calculate initial capital (for those born before 1949)
  const initialCapital = calculateInitialCapital(
    birthYear,
    inputData.contributoryPeriodBefore1999.totalYears
  )
  
  // 2. Calculate contributions capital with valorization
  const contributionsCapital = calculateContributionsCapital(
    inputData,
    scenario,
    currentYear
  )
  
  // 3. Calculate sick leave impact
  const sickLeaveImpact = inputData.sickLeave?.includeInCalculation
    ? calculateSickLeaveImpact(inputData, currentYear)
    : undefined
  
  // 4. Total capital
  const totalCapital = initialCapital + contributionsCapital - (sickLeaveImpact?.contributionReduction || 0)
  
  // 5. Life expectancy at retirement
  const lifeExpectancyYears = getLifeExpectancyAtRetirement(
    inputData.gender,
    inputData.plannedRetirementAge
  )
  const lifeExpectancyMonths = lifeExpectancyYears * 12
  
  // 6. Calculate monthly pension (nominal)
  const nominalPension = totalCapital / lifeExpectancyMonths
  
  // 7. Calculate real pension (discounted)
  const yearsToRetirement = inputData.plannedRetirementAge - inputData.currentAge
  const realPension = calculateRealPension(nominalPension, yearsToRetirement, scenario)
  
  // 8. Calculate final salary and replacement rate
  const finalSalary = projectFinalSalary(
    inputData.contributionBase.currentMonthlyAmount,
    yearsToRetirement,
    scenario
  )
  const replacementRate = (nominalPension / finalSalary) * 100
  
  // 9. Format amounts
  const pensionAmounts: PensionAmounts = {
    nominalAmount: Math.round(nominalPension),
    nominalAmountFormatted: formatCurrency(nominalPension),
    realAmount: Math.round(realPension),
    realAmountFormatted: formatCurrency(realPension),
    replacementRate: Math.round(replacementRate * 100) / 100
  }
  
  // 10. Capital breakdown
  const capitalBreakdown: CapitalBreakdown = {
    initialCapital: Math.round(initialCapital),
    contributionsCapital: Math.round(contributionsCapital),
    valorizedTotal: Math.round(totalCapital),
    sickLeaveImpact: sickLeaveImpact ? Math.round(sickLeaveImpact.contributionReduction) : undefined
  }
  
  // 11. Calculation details
  const calculationDetails: CalculationDetails = {
    lifeExpectancyAtRetirement: lifeExpectancyYears,
    lifeExpectancyMonths,
    yearsToRetirement,
    monthsToRetirement: yearsToRetirement * 12,
    totalContributoryPeriod: calculateTotalContributoryPeriod(inputData, currentYear),
    finalSalary: Math.round(finalSalary)
  }
  
  // 12. Comparisons with averages
  const comparisons = calculateComparisons(nominalPension, yearsToRetirement, scenario)
  
  // 13. Scenario details
  const scenarioDetails: ScenarioDetails = {
    usedScenario: scenario,
    assumptions: getCalculationAssumptions(scenario),
    disclaimers: getDisclaimers()
  }
  
  return {
    pensionAmounts,
    capitalBreakdown,
    calculationDetails,
    sickLeaveImpact,
    comparisons,
    scenarioDetails,
    calculationDate: new Date()
  }
}

/**
 * Calculate initial capital for those born before 1949
 */
function calculateInitialCapital(birthYear: number, contributoryYearsBefore1999: number): number {
  if (birthYear >= 1949) return 0
  
  const baseAmount = ZUS_SYSTEM_PARAMETERS.INITIAL_CAPITAL.BASE_AMOUNT
  const multiplierPerYear = ZUS_SYSTEM_PARAMETERS.INITIAL_CAPITAL.MULTIPLIER_PER_YEAR
  
  return baseAmount + (contributoryYearsBefore1999 * multiplierPerYear * baseAmount)
}

/**
 * Calculate contributions capital with valorization
 */
function calculateContributionsCapital(
  inputData: IndividualInputData,
  scenario: MacroeconomicScenario,
  currentYear: number
): number {
  const retirementYear = currentYear + (inputData.plannedRetirementAge - inputData.currentAge)
  const monthlyContribution = getMonthlyContribution(inputData)
  
  let totalCapital = 0
  
  // Calculate future contributions with wage growth and valorization
  for (let year = currentYear; year < retirementYear; year++) {
    const yearsFromNow = year - currentYear
    
    // Wage growth
    const wageGrowthRate = getAnnualWageGrowthRate(scenario)
    const wageGrowthFactor = Math.pow(1 + wageGrowthRate, yearsFromNow)
    const adjustedContribution = monthlyContribution * wageGrowthFactor
    
    // Valorization to retirement year
    const valorizationYears = retirementYear - year
    const valorizationRate = getValorizationRate(scenario)
    const valorizationFactor = Math.pow(1 + valorizationRate, valorizationYears)
    
    const annualCapital = adjustedContribution * 12 * valorizationFactor
    totalCapital += annualCapital
  }
  
  // Add existing accumulated capital if provided
  if (inputData.accumulatedCapital) {
    const existingCapital = inputData.accumulatedCapital.zusAccount + 
                           inputData.accumulatedCapital.zusSubaccount
    const yearsToRetirement = retirementYear - currentYear
    const valorizationRate = getValorizationRate(scenario)
    const valorizedExisting = existingCapital * Math.pow(1 + valorizationRate, yearsToRetirement)
    totalCapital += valorizedExisting
  }
  
  return totalCapital
}

/**
 * Calculate sick leave impact
 */
function calculateSickLeaveImpact(
  inputData: IndividualInputData,
  currentYear: number
): SickLeaveImpact {
  const averageDaysPerYear = inputData.sickLeave?.averageDaysPerYear || 
                             (inputData.gender === 'female' ? 12 : 9)
  
  const yearsToRetirement = inputData.plannedRetirementAge - inputData.currentAge
  const totalDaysLost = averageDaysPerYear * yearsToRetirement
  
  const workingDaysPerYear = 365 - 104 - 13 // Subtract weekends and holidays
  const contributionReductionPercentage = averageDaysPerYear / workingDaysPerYear
  
  const monthlyContribution = getMonthlyContribution(inputData)
  const annualContribution = monthlyContribution * 12
  const contributionReduction = annualContribution * contributionReductionPercentage * yearsToRetirement
  
  return {
    averageDaysPerYear,
    totalDaysLost,
    contributionReduction,
    percentageImpact: Math.round(contributionReductionPercentage * 10000) / 100
  }
}

/**
 * Calculate real pension (discounted to today's purchasing power)
 */
function calculateRealPension(
  nominalPension: number,
  yearsToRetirement: number,
  scenario: MacroeconomicScenario
): number {
  const inflationRate = getAnnualInflationRate(scenario)
  const discountFactor = Math.pow(1 + inflationRate, -yearsToRetirement)
  return nominalPension * discountFactor
}

/**
 * Project final salary at retirement
 */
function projectFinalSalary(
  currentSalary: number,
  yearsToRetirement: number,
  scenario: MacroeconomicScenario
): number {
  const wageGrowthRate = getAnnualWageGrowthRate(scenario)
  return currentSalary * Math.pow(1 + wageGrowthRate, yearsToRetirement)
}

/**
 * Calculate comparisons with average pensions
 */
function calculateComparisons(
  monthlyPension: number,
  yearsToRetirement: number,
  scenario: MacroeconomicScenario
): Comparisons {
  const currentAveragePension = ZUS_SYSTEM_PARAMETERS.CURRENT_AVERAGES.PENSION
  const currentMinimumPension = ZUS_SYSTEM_PARAMETERS.CURRENT_AVERAGES.MINIMUM_PENSION
  const wageGrowthRate = getAnnualWageGrowthRate(scenario)
  
  const averagePensionInRetirementYear = currentAveragePension * Math.pow(1 + wageGrowthRate, yearsToRetirement)
  const minimumPensionInRetirementYear = currentMinimumPension * Math.pow(1 + wageGrowthRate, yearsToRetirement)
  
  return {
    averagePensionInRetirementYear: Math.round(averagePensionInRetirementYear),
    percentageOfAveragePension: Math.round((monthlyPension / averagePensionInRetirementYear) * 10000) / 100,
    minimumPensionInRetirementYear: Math.round(minimumPensionInRetirementYear),
    percentageOfMinimumPension: Math.round((monthlyPension / minimumPensionInRetirementYear) * 10000) / 100
  }
}

/**
 * Get monthly contribution based on insurance type
 */
function getMonthlyContribution(inputData: IndividualInputData): number {
  const { insuranceTitle, contributionBase } = inputData
  
  switch (insuranceTitle.type) {
    case 'employee':
      return contributionBase.currentMonthlyAmount * ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.TOTAL
    
    case 'jdg':
      return contributionBase.isJdgPreferential
        ? ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.JDG_PREFERENTIAL.PENSION
        : ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.JDG_STANDARD.PENSION
    
    case 'rsp_member':
      return contributionBase.currentMonthlyAmount * ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.TOTAL
    
    case 'farmer':
      // KRUS has different rules - simplified here
      return contributionBase.currentMonthlyAmount * 0.15
    
    default:
      return contributionBase.currentMonthlyAmount * ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.TOTAL
  }
}

/**
 * Calculate total contributory period
 */
function calculateTotalContributoryPeriod(
  inputData: IndividualInputData,
  currentYear: number
): number {
  const workStartYear = currentYear - (inputData.currentAge - 18) // Assumption: work starts at 18
  return inputData.plannedRetirementAge - 18
}

/**
 * Helper functions for rates
 */
function getAnnualWageGrowthRate(scenario: MacroeconomicScenario): number {
  return scenario.parameters.realWageGrowthIndex2080 - 1
}

function getAnnualInflationRate(scenario: MacroeconomicScenario): number {
  return scenario.parameters.inflationIndex2080 - 1
}

function getValorizationRate(scenario: MacroeconomicScenario): number {
  // Valorization = wage growth + inflation
  return getAnnualWageGrowthRate(scenario) + getAnnualInflationRate(scenario)
}

/**
 * Format currency
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Get calculation assumptions
 */
function getCalculationAssumptions(scenario: MacroeconomicScenario): string[] {
  return [
    `Macroeconomic scenario: ${scenario.name}`,
    `Real wage growth: ${((scenario.parameters.realWageGrowthIndex2080 - 1) * 100).toFixed(2)}%`,
    `Inflation: ${((scenario.parameters.inflationIndex2080 - 1) * 100).toFixed(2)}%`,
    `Contribution collection rate: ${(scenario.parameters.contributionCollectionRate2080 * 100).toFixed(2)}%`,
    'GUS life expectancy tables 2020-2022',
    'Contribution valorization according to pension law'
  ]
}

/**
 * Get disclaimers
 */
function getDisclaimers(): string[] {
  return [
    'This calculation is for informational purposes only and does not guarantee future pension amount',
    'Actual pension may differ depending on changes in legislation',
    'Projection is based on current macroeconomic assumptions which may change',
    'Does not account for potential changes in the pension system'
  ]
}
