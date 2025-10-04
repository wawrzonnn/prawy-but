import { NextRequest, NextResponse } from 'next/server'
import { calculatePension } from '@/lib/pensionCalculator'
import { PensionCalculationInput, PensionCalculationResponse } from '@/types/pension'

export async function POST(request: NextRequest): Promise<NextResponse<PensionCalculationResponse>> {
	try {
		const input: PensionCalculationInput = await request.json()
		
		// Walidacja podstawowych danych
		if (!input.age || !input.gender || !input.grossSalary || !input.workStartYear || !input.plannedRetirementYear) {
			return NextResponse.json({
				success: false,
				error: 'Brakuje wymaganych danych: wiek, płeć, wynagrodzenie, rok rozpoczęcia pracy, planowany rok emerytury'
			}, { status: 400 })
		}

		// Walidacja zakresów
		if (input.age < 18 || input.age > 67) {
			return NextResponse.json({
				success: false,
				error: 'Wiek musi być między 18 a 67 lat'
			}, { status: 400 })
		}

		if (input.grossSalary <= 0) {
			return NextResponse.json({
				success: false,
				error: 'Wynagrodzenie musi być większe od 0'
			}, { status: 400 })
		}

		const currentYear = new Date().getFullYear()
		if (input.workStartYear < 1970 || input.workStartYear > currentYear) {
			return NextResponse.json({
				success: false,
				error: `Rok rozpoczęcia pracy musi być między 1970 a ${currentYear}`
			}, { status: 400 })
		}

		if (input.plannedRetirementYear <= currentYear || input.plannedRetirementYear > currentYear + 50) {
			return NextResponse.json({
				success: false,
				error: `Planowany rok emerytury musi być między ${currentYear + 1} a ${currentYear + 50}`
			}, { status: 400 })
		}

		// Oblicz emeryturę
		const result = calculatePension(input)

		return NextResponse.json({
			success: true,
			data: result
		})

	} catch (error) {
		console.error('Błąd kalkulacji emerytury:', error)
		
		return NextResponse.json({
			success: false,
			error: 'Wystąpił błąd podczas kalkulacji emerytury'
		}, { status: 500 })
	}
}

// Opcjonalnie GET dla testów
export async function GET(): Promise<NextResponse> {
	return NextResponse.json({
		message: 'API kalkulatora emerytury',
		endpoints: {
			'POST /api/pension/calculate': 'Oblicz emeryturę na podstawie danych wejściowych',
			'GET /api/pension/info': 'Informacje o kalkulatorze'
		}
	})
}
