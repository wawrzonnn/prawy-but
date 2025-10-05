import { NextRequest, NextResponse } from 'next/server'
import { calculatePensionFUS20 } from '@/lib/fus20-calculator'
import { DEFAULT_SCENARIO, getScenarioById } from '@/config/fus20-scenarios'
import { INSURANCE_TITLE_CODES } from '@/config/zus-constants'
import type { IndividualInputData } from '@/types/fus20-types'
import type { 
	CalculatePensionRequest, 
	CalculatePensionSuccessResponse, 
	CalculatePensionErrorResponse 
} from '@/types/api-types'

/**
 * POST /api/calculate-pension
 * 
 * Endpoint do obliczania emerytury na podstawie danych wejściowych
 * 
 * Request body:
 * {
 *   "age": number,                    // Wiek (18-64)
 *   "gender": "male" | "female",      // Płeć
 *   "grossSalary": number,            // Wynagrodzenie brutto miesięczne
 *   "workStartYear"?: number,         // Rok rozpoczęcia pracy (opcjonalnie)
 *   "plannedRetirementYear": number,  // Planowany rok emerytury
 *   "zusAccountBalance"?: number,     // Środki na koncie ZUS (opcjonalnie)
 *   "zusSubaccountBalance"?: number,  // Środki na subkoncie ZUS (opcjonalnie)
 *   "includeSickLeave"?: boolean,     // Czy uwzględnić zwolnienia (opcjonalnie)
 *   "scenarioId"?: string            // ID scenariusza: "pessimistic" | "moderate" | "optimistic" (opcjonalnie, domyślnie "moderate")
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "monthlyPension": number,           // Miesięczna emerytura (nominalna)
 *     "realMonthlyPension": number,       // Miesięczna emerytura (w dzisiejszej sile nabywczej)
 *     "replacementRate": number,          // Stopa zastąpienia (%)
 *     "totalCapital": number,             // Zgromadzony kapitał
 *     "lifeExpectancyMonths": number,     // Oczekiwana długość życia (miesiące)
 *     "futureGrossSalary": number,        // Wynagrodzenie przy emeryturze
 *     "futureAveragePension": number,     // Średnia emerytura w roku emerytury
 *     "yearsToRetirement": number         // Lata do emerytury
 *   }
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse<CalculatePensionSuccessResponse | CalculatePensionErrorResponse>> {
	try {
		const body: CalculatePensionRequest = await request.json()

		// Walidacja wymaganych pól
		if (!body.age || !body.gender || !body.grossSalary || !body.plannedRetirementYear) {
			const errorResponse: CalculatePensionErrorResponse = {
				success: false,
				error: 'Brakujące wymagane pola: age, gender, grossSalary, plannedRetirementYear',
			}
			return NextResponse.json(errorResponse, { status: 400 })
		}

		// Walidacja wieku
		if (body.age < 18 || body.age > 64) {
			const errorResponse: CalculatePensionErrorResponse = {
				success: false,
				error: 'Wiek musi być w przedziale 18-64 lat',
			}
			return NextResponse.json(errorResponse, { status: 400 })
		}

		// Walidacja płci
		if (body.gender !== 'male' && body.gender !== 'female') {
			const errorResponse: CalculatePensionErrorResponse = {
				success: false,
				error: 'Płeć musi być "male" lub "female"',
			}
			return NextResponse.json(errorResponse, { status: 400 })
		}

		// Wybierz scenariusz
		const scenario = body.scenarioId ? getScenarioById(body.scenarioId) : DEFAULT_SCENARIO

		// Oblicz dane
		const currentYear = new Date().getFullYear()

		// Przygotuj dane wejściowe dla kalkulatora FUS20
		const inputData: IndividualInputData = {
			gender: body.gender,
			currentAge: body.age,
			initialCapital: body.initialCapital || 0,
			insuranceTitle: INSURANCE_TITLE_CODES.EMPLOYEE,
			contributionBase: {
				currentMonthlyAmount: body.grossSalary,
				isJdgPreferential: false,
			},
			plannedRetirementAge: body.plannedRetirementYear - (currentYear - body.age),
			sickLeave: {
				includeInCalculation: body.includeSickLeave || false,
				averageDaysPerYear: body.gender === 'female' ? 12 : 9,
			},
			accumulatedCapital:
				body.zusAccountBalance || body.zusSubaccountBalance
					? {
							zusAccount: body.zusAccountBalance || 0,
							zusSubaccount: body.zusSubaccountBalance || 0,
						}
					: undefined,
		}

		// Oblicz emeryturę
		const result = calculatePensionFUS20(inputData, scenario)

		// Oblicz lata do emerytury
		const yearsToRetirement = body.plannedRetirementYear - currentYear

		// Przygotuj odpowiedź
		const response: CalculatePensionSuccessResponse = {
			success: true,
			data: {
				monthlyPension: result.pensionAmounts.nominalAmount || 0,
				realMonthlyPension: result.pensionAmounts.realAmount || 0,
				replacementRate: result.pensionAmounts.replacementRate || 0,
				totalCapital: result.capitalBreakdown.valorizedTotal || 0,
				lifeExpectancyMonths: result.calculationDetails.lifeExpectancyMonths || 0,
				futureGrossSalary: result.calculationDetails.finalSalary || 0,
				futureAveragePension: result.comparisons.averagePensionInRetirementYear || 0,
				yearsToRetirement: yearsToRetirement,
			},
			scenario: {
				id: scenario.id as 'pessimistic' | 'moderate' | 'optimistic',
				name: scenario.name,
				description: scenario.description,
			},
		}

		return NextResponse.json(response, { status: 200 })
	} catch (error) {
		console.error('Błąd obliczania emerytury:', error)
		const errorResponse: CalculatePensionErrorResponse = {
			success: false,
			error: 'Błąd serwera podczas obliczania emerytury',
			details: error instanceof Error ? error.message : 'Nieznany błąd',
		}
		return NextResponse.json(errorResponse, { status: 500 })
	}
}
