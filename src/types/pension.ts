// ===== TYPY KALKULATORA EMERYTURY =====

export interface PensionCalculationInput {
	// Dane obowiązkowe
	age: number
	gender: 'male' | 'female'
	grossSalary: number
	workStartYear: number
	plannedRetirementYear: number
	
	// Dane fakultatywne
	zusAccountBalance?: number
	zusSubaccountBalance?: number
	includeSickLeave: boolean
}

export interface DelayedRetirementScenario {
	monthlyPension: number
	replacementRate: number
}

export interface PensionCalculationOutput {
	// Podstawowe wyniki
	monthlyPension: number
	monthlyPensionReal: number // wysokość urealniona
	replacementRate: number
	totalCapital: number
	finalSalary: number
	lifeExpectancyMonths: number
	
	// Informacje o zwolnieniach lekarskich
	sickLeaveDaysPerYear: number
	sickLeaveImpactPercentage: number
	
	// Porównania i analizy (zgodne ze specyfikacją)
	averagePensionInRetirementYear: number
	pensionVsAverageRatio: number
	monthlyPensionWithoutSickLeave: number
	
	// Scenariusze opóźnionej emerytury
	delayedRetirement: {
		oneYear: DelayedRetirementScenario
		twoYears: DelayedRetirementScenario
		fiveYears: DelayedRetirementScenario
	}
	
	// Porównanie z oczekiwanym świadczeniem
	expectedPension: number
	yearsToReachExpected: number
}

export interface PensionConstants {
	// Składki i wzrost
	CONTRIBUTION_RATE: number // 19.52% składka emerytalna
	AVERAGE_WAGE_GROWTH: number // 3% wzrost wynagrodzeń rocznie
	INFLATION_RATE: number // 2.5% inflacja rocznie
	
	// Średnia emerytura - potrzebna do porównania (linia 29-30 specyfikacji)
	AVERAGE_PENSION_2024: number // PLN przeciętna emerytura
	
	// Wiek emerytalny
	RETIREMENT_AGE: {
		MALE: number
		FEMALE: number
	}
	
	// Tabele średniego dalszego trwania życia (lata)
	LIFE_EXPECTANCY: {
		FEMALE: {
			AGE_60_OR_LESS: number
			AGE_65_OR_LESS: number
			AGE_OVER_65: number
		}
		MALE: {
			AGE_65_OR_LESS: number
			AGE_67_OR_LESS: number
			AGE_OVER_67: number
		}
	}
	
	// Zwolnienia lekarskie (dni rocznie)
	SICK_LEAVE_DAYS: {
		FEMALE: number
		MALE: number
	}
	
	// Oszacowania kapitału
	HISTORICAL_CAPITAL_MULTIPLIER: number // mnożnik dla oszacowania kapitału historycznego
	
	// Przykładowe wartości
	EXPECTED_PENSION_EXAMPLE: number // PLN oczekiwana emerytura
	MAX_DELAY_YEARS_CHECK: number // maksymalne lata do sprawdzenia opóźnienia
}

// API Response types
export interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
}

export type PensionCalculationResponse = ApiResponse<PensionCalculationOutput>
