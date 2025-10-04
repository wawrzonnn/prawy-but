import { PensionCalculationInput, PensionCalculationOutput } from '@/types/pension'
import { PENSION_CONSTANTS } from '@/config'

/**
 * Główna funkcja kalkulacji emerytury zgodna ze specyfikacją
 */
export function calculatePension(input: PensionCalculationInput): PensionCalculationOutput {
	const currentYear = new Date().getFullYear()
	const retirementAge = input.gender === 'female' ? PENSION_CONSTANTS.RETIREMENT_AGE.FEMALE : PENSION_CONSTANTS.RETIREMENT_AGE.MALE
	const yearsToRetirement = input.plannedRetirementYear - currentYear
	const monthsToRetirement = yearsToRetirement * 12
	const workingYears = input.plannedRetirementYear - input.workStartYear

	// Składka emerytalna
	const currentMonthlyContribution = input.grossSalary * PENSION_CONSTANTS.CONTRIBUTION_RATE
	
	// Prognoza przyszłych składek z uwzględnieniem wzrostu wynagrodzeń
	let totalFutureContributions = 0
	for (let year = 0; year < yearsToRetirement; year++) {
		const yearlyGrowthMultiplier = Math.pow(1 + PENSION_CONSTANTS.AVERAGE_WAGE_GROWTH, year)
		const adjustedMonthlyContribution = currentMonthlyContribution * yearlyGrowthMultiplier
		totalFutureContributions += adjustedMonthlyContribution * 12
	}

	// Oszacowanie obecnych środków jeśli nie podano
	let estimatedCurrentCapital = 0
	if (input.zusAccountBalance && input.zusSubaccountBalance) {
		estimatedCurrentCapital = input.zusAccountBalance + input.zusSubaccountBalance
	} else {
		// Oszacowanie na podstawie lat pracy i obecnego wynagrodzenia
		const yearsWorked = currentYear - input.workStartYear
		const averageContributionPerYear = currentMonthlyContribution * 12
		estimatedCurrentCapital = averageContributionPerYear * yearsWorked * PENSION_CONSTANTS.HISTORICAL_CAPITAL_MULTIPLIER
	}

	// Całkowity kapitał emerytalny
	let totalCapital = estimatedCurrentCapital + totalFutureContributions

	// Uwzględnienie zwolnień lekarskich
	let sickLeaveDaysPerYear = 0
	let sickLeaveImpactPercentage = 0
	
	if (input.includeSickLeave) {
		// Średnie zwolnienia lekarskie w Polsce
		sickLeaveDaysPerYear = input.gender === 'female' ? PENSION_CONSTANTS.SICK_LEAVE_DAYS.FEMALE : PENSION_CONSTANTS.SICK_LEAVE_DAYS.MALE
		sickLeaveImpactPercentage = (sickLeaveDaysPerYear / 365) * 100
		
		// Redukcja kapitału o wpływ zwolnień lekarskich
		const sickLeaveReduction = sickLeaveDaysPerYear / 365
		totalCapital = totalCapital * (1 - sickLeaveReduction)
	}

	// Tabele średniego dalszego trwania życia przy przejściu na emeryturę
	let lifeExpectancyYears: number
	if (input.gender === 'female') {
		lifeExpectancyYears = retirementAge <= 60 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.FEMALE.AGE_60_OR_LESS : retirementAge <= 65 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.FEMALE.AGE_65_OR_LESS : PENSION_CONSTANTS.LIFE_EXPECTANCY.FEMALE.AGE_OVER_65
	} else {
		lifeExpectancyYears = retirementAge <= 65 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.MALE.AGE_65_OR_LESS : retirementAge <= 67 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.MALE.AGE_67_OR_LESS : PENSION_CONSTANTS.LIFE_EXPECTANCY.MALE.AGE_OVER_67
	}

	const lifeExpectancyMonths = lifeExpectancyYears * 12

	// Miesięczna emerytura
	const monthlyPension = totalCapital / lifeExpectancyMonths

	// Oblicz końcowe wynagrodzenie na moment emerytury (z wzrostem 3%/rok)
	const finalSalary = input.grossSalary * Math.pow(1 + PENSION_CONSTANTS.AVERAGE_WAGE_GROWTH, yearsToRetirement)

	// Stopa zastąpienia - porównanie emerytury z końcowym wynagrodzeniem
	const replacementRate = (monthlyPension / finalSalary) * 100

	// 1. Wysokość urealniona (dzisiejsza siła nabywcza)
	const monthlyPensionReal = monthlyPension / Math.pow(1 + PENSION_CONSTANTS.INFLATION_RATE, yearsToRetirement)

	// 2. Porównanie ze średnią emeryturą (wymagane w specyfikacji linia 29-30)
	const averagePensionInRetirementYear = PENSION_CONSTANTS.AVERAGE_PENSION_2024 * Math.pow(1 + PENSION_CONSTANTS.AVERAGE_WAGE_GROWTH, yearsToRetirement)
	const pensionVsAverageRatio = (monthlyPension / averagePensionInRetirementYear) * 100

	// 3. Emerytura bez uwzględnienia zwolnień lekarskich
	const totalCapitalWithoutSickLeave = estimatedCurrentCapital + totalFutureContributions
	const monthlyPensionWithoutSickLeave = totalCapitalWithoutSickLeave / lifeExpectancyMonths

	// 4. Scenariusze opóźnionej emerytury (+1, +2, +5 lat)
	const calculateDelayedRetirement = (delayYears: number) => {
		const newYearsToRetirement = yearsToRetirement + delayYears
		
		// Dodatkowe składki przez opóźnienie
		let additionalContributions = 0
		for (let year = yearsToRetirement; year < newYearsToRetirement; year++) {
			const yearlyGrowthMultiplier = Math.pow(1 + PENSION_CONSTANTS.AVERAGE_WAGE_GROWTH, year)
			const adjustedMonthlyContribution = currentMonthlyContribution * yearlyGrowthMultiplier
			additionalContributions += adjustedMonthlyContribution * 12
		}
		
		const newTotalCapital = totalCapital + additionalContributions
		const newFinalSalary = input.grossSalary * Math.pow(1 + PENSION_CONSTANTS.AVERAGE_WAGE_GROWTH, newYearsToRetirement)
		
		// Nowe tabele życia (krótsze przez późniejszą emeryturę)
		const newRetirementAge = retirementAge + delayYears
		let newLifeExpectancyYears: number
		if (input.gender === 'female') {
			newLifeExpectancyYears = newRetirementAge <= 60 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.FEMALE.AGE_60_OR_LESS : newRetirementAge <= 65 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.FEMALE.AGE_65_OR_LESS : PENSION_CONSTANTS.LIFE_EXPECTANCY.FEMALE.AGE_OVER_65
		} else {
			newLifeExpectancyYears = newRetirementAge <= 65 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.MALE.AGE_65_OR_LESS : newRetirementAge <= 67 ? PENSION_CONSTANTS.LIFE_EXPECTANCY.MALE.AGE_67_OR_LESS : PENSION_CONSTANTS.LIFE_EXPECTANCY.MALE.AGE_OVER_67
		}
		
		const newLifeExpectancyMonths = newLifeExpectancyYears * 12
		const newMonthlyPension = newTotalCapital / newLifeExpectancyMonths
		const newReplacementRate = (newMonthlyPension / newFinalSalary) * 100
		
		return {
			monthlyPension: Math.round(newMonthlyPension),
			replacementRate: Math.round(newReplacementRate * 100) / 100
		}
	}

	const delayedRetirement = {
		oneYear: calculateDelayedRetirement(1),
		twoYears: calculateDelayedRetirement(2),
		fiveYears: calculateDelayedRetirement(5)
	}

	// 5. Porównanie z oczekiwanym świadczeniem
	const expectedPension = PENSION_CONSTANTS.EXPECTED_PENSION_EXAMPLE
	let yearsToReachExpected = 0
	
	// Oblicz ile lat dłużej trzeba pracować, żeby osiągnąć oczekiwaną emeryturę
	if (monthlyPension < expectedPension) {
		for (let additionalYears = 1; additionalYears <= PENSION_CONSTANTS.MAX_DELAY_YEARS_CHECK; additionalYears++) {
			const testScenario = calculateDelayedRetirement(additionalYears)
			if (testScenario.monthlyPension >= expectedPension) {
				yearsToReachExpected = additionalYears
				break
			}
		}
	}

	return {
		monthlyPension: Math.round(monthlyPension),
		monthlyPensionReal: Math.round(monthlyPensionReal),
		replacementRate: Math.round(replacementRate * 100) / 100,
		totalCapital: Math.round(totalCapital),
		finalSalary: Math.round(finalSalary),
		lifeExpectancyMonths,
		sickLeaveDaysPerYear,
		sickLeaveImpactPercentage: Math.round(sickLeaveImpactPercentage * 100) / 100,
		averagePensionInRetirementYear: Math.round(averagePensionInRetirementYear),
		pensionVsAverageRatio: Math.round(pensionVsAverageRatio * 100) / 100,
		monthlyPensionWithoutSickLeave: Math.round(monthlyPensionWithoutSickLeave),
		delayedRetirement,
		expectedPension,
		yearsToReachExpected
	}
}
