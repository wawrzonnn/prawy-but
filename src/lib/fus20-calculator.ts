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
	ScenarioDetails,
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

	// 1. Use provided initial capital (or 0 if not applicable)
	const initialCapital = inputData.initialCapital || 0

	// 2. Calculate contributions capital with valorization
	const contributionsCapital = calculateContributionsCapital(inputData, scenario, currentYear)

	// 3. Calculate sick leave impact
	const sickLeaveImpact = inputData.sickLeave?.includeInCalculation
		? calculateSickLeaveImpact(inputData, currentYear)
		: undefined

	// 4. Total capital
	const totalCapital = initialCapital + contributionsCapital - (sickLeaveImpact?.contributionReduction || 0)

	// 5. Life expectancy at retirement
	const lifeExpectancyYears = getLifeExpectancyAtRetirement(inputData.gender, inputData.plannedRetirementAge)
	const lifeExpectancyMonths = lifeExpectancyYears * 12

	// 6. Calculate monthly pension (nominal)
	const nominalPension = totalCapital > 0 && lifeExpectancyMonths > 0 ? totalCapital / lifeExpectancyMonths : 0

	// 7. Calculate real pension (discounted)
	const yearsToRetirement = inputData.plannedRetirementAge - inputData.currentAge
	const realPension = calculateRealPension(nominalPension, yearsToRetirement, scenario)

	// 8. Calculate final salary and replacement rate
	const finalSalary = projectFinalSalary(inputData.contributionBase.currentMonthlyAmount, yearsToRetirement, scenario)
	const replacementRate = finalSalary > 0 ? (nominalPension / finalSalary) * 100 : 0

	// 9. Format amounts
	const pensionAmounts: PensionAmounts = {
		nominalAmount: Math.round(nominalPension),
		nominalAmountFormatted: formatCurrency(nominalPension),
		realAmount: Math.round(realPension),
		realAmountFormatted: formatCurrency(realPension),
		replacementRate: Math.round(replacementRate * 100) / 100,
	}

	// 10. Capital breakdown
	const capitalBreakdown: CapitalBreakdown = {
		initialCapital: Math.round(initialCapital),
		contributionsCapital: Math.round(contributionsCapital),
		valorizedTotal: Math.round(totalCapital),
		sickLeaveImpact: sickLeaveImpact ? Math.round(sickLeaveImpact.contributionReduction) : undefined,
	}

	// 11. Calculation details
	const calculationDetails: CalculationDetails = {
		lifeExpectancyAtRetirement: lifeExpectancyYears,
		lifeExpectancyMonths,
		yearsToRetirement,
		monthsToRetirement: yearsToRetirement * 12,
		totalContributoryPeriod: calculateTotalContributoryPeriod(inputData, currentYear),
		finalSalary: Math.round(finalSalary),
	}

	// 12. Comparisons with averages
	const comparisons = calculateComparisons(nominalPension, yearsToRetirement, scenario)

	// 13. Scenario details
	const scenarioDetails: ScenarioDetails = {
		usedScenario: scenario,
		assumptions: getCalculationAssumptions(scenario),
		disclaimers: getDisclaimers(),
	}

	return {
		pensionAmounts,
		capitalBreakdown,
		calculationDetails,
		sickLeaveImpact,
		comparisons,
		scenarioDetails,
		calculationDate: new Date(),
	}
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
		const existingCapital = inputData.accumulatedCapital.zusAccount + inputData.accumulatedCapital.zusSubaccount
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
function calculateSickLeaveImpact(inputData: IndividualInputData, currentYear: number): SickLeaveImpact {
	const averageDaysPerYear = inputData.sickLeave?.averageDaysPerYear || (inputData.gender === 'female' ? 12 : 9)

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
		percentageImpact: Math.round(contributionReductionPercentage * 10000) / 100,
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
function projectFinalSalary(currentSalary: number, yearsToRetirement: number, scenario: MacroeconomicScenario): number {
	// POPRAWKA: Używamy pełnego wskaźnika waloryzacji (wzrost płac + inflacja),
	// aby pensja była prognozowana w wartościach nominalnych, tak jak kapitał.
	const nominalGrowthRate = getValorizationRate(scenario)
	return currentSalary * Math.pow(1 + nominalGrowthRate, yearsToRetirement)
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
	const nominalGrowthRate = getValorizationRate(scenario) // Używamy nominalnego wzrostu

	const averagePensionInRetirementYear = currentAveragePension * Math.pow(1 + nominalGrowthRate, yearsToRetirement)
	const minimumPensionInRetirementYear = currentMinimumPension * Math.pow(1 + nominalGrowthRate, yearsToRetirement)

	return {
		averagePensionInRetirementYear: Math.round(averagePensionInRetirementYear),
		percentageOfAveragePension:
			averagePensionInRetirementYear > 0
				? Math.round((monthlyPension / averagePensionInRetirementYear) * 10000) / 100
				: 0,
		minimumPensionInRetirementYear: Math.round(minimumPensionInRetirementYear),
		percentageOfMinimumPension:
			minimumPensionInRetirementYear > 0
				? Math.round((monthlyPension / minimumPensionInRetirementYear) * 10000) / 100
				: 0,
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
function calculateTotalContributoryPeriod(inputData: IndividualInputData, currentYear: number): number {
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
	// Valorization = real wage growth + inflation (approximation of nominal growth)
	return (1 + getAnnualWageGrowthRate(scenario)) * (1 + getAnnualInflationRate(scenario)) - 1
}

/**
 * Format currency
 */
function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
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
		'Contribution valorization according to pension law',
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
		'Does not account for potential changes in the pension system',
	]
}

/**
 * Year-by-year calculation data
 */
export interface YearByYearData {
	year: number
	age: number
	grossSalary: number
	monthlyContribution: number
	annualContribution: number
	sickLeaveDays: number
	sickLeaveReduction: number
	effectiveContribution: number
	accountBalance: number
	subaccountBalance: number
	totalCapital: number
	realCapital: number
	monthlyPension: number
	realMonthlyPension: number
}

/**
 * Calculate year-by-year pension accumulation
 */
export function calculateYearByYear(
	inputData: IndividualInputData,
	scenario: MacroeconomicScenario = DEFAULT_SCENARIO,
	customSalaries: Record<number, number> = {},
	sickLeaves: Record<number, number> = {}
): YearByYearData[] {
	const currentYear = new Date().getFullYear()
	const birthYear = currentYear - inputData.currentAge
	const retirementYear = currentYear + (inputData.plannedRetirementAge - inputData.currentAge)

	const wageGrowthRate = getAnnualWageGrowthRate(scenario)
	const inflationRate = getAnnualInflationRate(scenario)
	const valorizationRate = getValorizationRate(scenario)

	const yearDataArray: YearByYearData[] = []

	let accountBalance = inputData.accumulatedCapital?.zusAccount || 0
	let subaccountBalance = inputData.accumulatedCapital?.zusSubaccount || 0

	// Calculate for each year from current to retirement (not including retirement year)
	for (let year = currentYear; year < retirementYear; year++) {
		const age = inputData.currentAge + (year - currentYear)
		const yearsFromNow = year - currentYear

		// Calculate salary for this year (custom or projected)
		let grossSalary: number
		if (customSalaries[year]) {
			grossSalary = customSalaries[year]
		} else {
			const wageGrowthFactor = Math.pow(1 + wageGrowthRate, yearsFromNow)
			grossSalary = Math.round(inputData.contributionBase.currentMonthlyAmount * wageGrowthFactor)
		}

		// Calculate contribution
		const contributionRate = ZUS_SYSTEM_PARAMETERS.CONTRIBUTION_RATES.TOTAL
		const monthlyContribution = grossSalary * contributionRate
		const annualContribution = monthlyContribution * 12

		// Sick leave for this year
		const sickLeaveDays = sickLeaves[year] || 0
		const workingDaysPerYear = 365 - 104 - 13 // Subtract weekends and holidays
		const sickLeaveReduction = sickLeaveDays / workingDaysPerYear

		// Effective contribution after sick leave
		const effectiveContribution = annualContribution * (1 - sickLeaveReduction)

		// Valorize existing capital from previous year
		if (year > currentYear) {
			accountBalance *= 1 + valorizationRate
			subaccountBalance *= 1 + valorizationRate
		}

		// Add this year's contribution
		accountBalance += effectiveContribution * 0.81 // 81% to main account
		subaccountBalance += effectiveContribution * 0.19 // 19% to subaccount

		const totalCapital = accountBalance + subaccountBalance

		// Calculate real capital (discounted for inflation)
		const inflationFactor = Math.pow(1 + inflationRate, yearsFromNow)
		const realCapital = totalCapital / inflationFactor

		// Calculate pension if retiring this year
		const lifeExpectancyYears = getLifeExpectancyAtRetirement(inputData.gender, age)
		const lifeExpectancyMonths = lifeExpectancyYears * 12
		const monthlyPension = totalCapital / lifeExpectancyMonths
		const realMonthlyPension = realCapital / lifeExpectancyMonths

		yearDataArray.push({
			year,
			age,
			grossSalary,
			monthlyContribution: Math.round(monthlyContribution),
			annualContribution: Math.round(annualContribution),
			sickLeaveDays,
			sickLeaveReduction: Math.round(sickLeaveReduction * 10000) / 100, // percentage
			effectiveContribution: Math.round(effectiveContribution),
			accountBalance: Math.round(accountBalance),
			subaccountBalance: Math.round(subaccountBalance),
			totalCapital: Math.round(totalCapital),
			realCapital: Math.round(realCapital),
			monthlyPension: Math.round(monthlyPension),
			realMonthlyPension: Math.round(realMonthlyPension),
		})
	}

	// Add final year (retirement year) with final capital calculation
	// At retirement, we valorize one last time but don't add new contributions
	accountBalance *= 1 + valorizationRate
	subaccountBalance *= 1 + valorizationRate
	const finalTotalCapital = accountBalance + subaccountBalance

	const retirementAge = inputData.plannedRetirementAge
	const finalInflationFactor = Math.pow(1 + inflationRate, retirementYear - currentYear)
	const finalRealCapital = finalTotalCapital / finalInflationFactor

	const finalLifeExpectancyYears = getLifeExpectancyAtRetirement(inputData.gender, retirementAge)
	const finalLifeExpectancyMonths = finalLifeExpectancyYears * 12
	const finalMonthlyPension = finalTotalCapital / finalLifeExpectancyMonths
	const finalRealMonthlyPension = finalRealCapital / finalLifeExpectancyMonths

	yearDataArray.push({
		year: retirementYear,
		age: retirementAge,
		grossSalary: 0, // No longer working
		monthlyContribution: 0,
		annualContribution: 0,
		sickLeaveDays: 0,
		sickLeaveReduction: 0,
		effectiveContribution: 0,
		accountBalance: Math.round(accountBalance),
		subaccountBalance: Math.round(subaccountBalance),
		totalCapital: Math.round(finalTotalCapital),
		realCapital: Math.round(finalRealCapital),
		monthlyPension: Math.round(finalMonthlyPension),
		realMonthlyPension: Math.round(finalRealMonthlyPension),
	})

	return yearDataArray
}
