/**
 * Typy dla API kalkulatora emerytalnego
 */

/**
 * Request body dla POST /api/calculate-pension
 */
export interface CalculatePensionRequest {
	/** Wiek (18-64) */
	age: number
	
	/** Płeć */
	gender: 'male' | 'female'
	
	/** Wynagrodzenie brutto miesięczne (PLN) */
	grossSalary: number
	
	/** Planowany rok przejścia na emeryturę */
	plannedRetirementYear: number
	
	/** Kapitał początkowy dla osób które rozpoczęły pracę przed 1999 (opcjonalnie) */
	initialCapital?: number
	
	/** Środki na koncie ZUS (PLN, opcjonalnie) */
	zusAccountBalance?: number
	
	/** Środki na subkoncie ZUS (PLN, opcjonalnie) */
	zusSubaccountBalance?: number
	
	/** Czy uwzględnić zwolnienia chorobowe (opcjonalnie, domyślnie: false) */
	includeSickLeave?: boolean
	
	/** ID scenariusza ekonomicznego (opcjonalnie, domyślnie: "moderate") */
	scenarioId?: 'pessimistic' | 'moderate' | 'optimistic'
}

/**
 * Dane emerytury w response
 */
export interface PensionData {
	/** Miesięczna emerytura w roku emerytury (nominalna, PLN) */
	monthlyPension: number
	
	/** Miesięczna emerytura w dzisiejszej sile nabywczej (PLN) */
	realMonthlyPension: number
	
	/** Stopa zastąpienia (%) - stosunek emerytury do wynagrodzenia */
	replacementRate: number
	
	/** Zgromadzony kapitał emerytalny (PLN) */
	totalCapital: number
	
	/** Oczekiwana długość życia na emeryturze (miesiące) */
	lifeExpectancyMonths: number
	
	/** Prognozowane wynagrodzenie w roku emerytury (PLN) */
	futureGrossSalary: number
	
	/** Średnia emerytura w roku emerytury (PLN) */
	futureAveragePension: number
	
	/** Lata do emerytury */
	yearsToRetirement: number
}

/**
 * Informacje o scenariuszu ekonomicznym
 */
export interface ScenarioInfo {
	/** ID scenariusza */
	id: 'pessimistic' | 'moderate' | 'optimistic'
	
	/** Nazwa scenariusza */
	name: string
	
	/** Opis scenariusza */
	description: string
}

/**
 * Response dla sukcesu - POST /api/calculate-pension
 */
export interface CalculatePensionSuccessResponse {
	/** Status sukcesu */
	success: true
	
	/** Dane emerytury */
	data: PensionData
	
	/** Informacje o użytym scenariuszu */
	scenario: ScenarioInfo
}

/**
 * Response dla błędu - POST /api/calculate-pension
 */
export interface CalculatePensionErrorResponse {
	/** Status błędu */
	success: false
	
	/** Opis błędu */
	error: string
	
	/** Szczegóły techniczne (opcjonalnie) */
	details?: string
}

/**
 * Pełny response type (sukces lub błąd)
 */
export type CalculatePensionResponse = 
	| CalculatePensionSuccessResponse 
	| CalculatePensionErrorResponse
