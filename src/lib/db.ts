import Dexie, { Table } from 'dexie'

export interface PensionData {
	id?: number
	currentGrossSalary?: number
	// OBOWIĄZKOWE dane podstawowe
	age: number // Wiek w latach
	gender: 'male' | 'female' // Płeć
	grossSalary: number // Wysokość wynagrodzenia brutto miesięcznie
	plannedRetirementYear: number // Planowany rok zakończenia aktywności zawodowej (styczeń)
	startedWorkBefore1999: boolean // Czy praca rozpoczęta przed 1999
	initialCapital?: number // Zwaloryzowany kapitał początkowy

	// FAKULTATYWNE - środki w ZUS
	zusAccountBalance?: number // Wysokość zgromadzonych środków na koncie w ZUS
	zusSubaccountBalance?: number // Wysokość zgromadzonych środków na subkoncie w ZUS

	// FAKULTATYWNE - opcja zwolnień lekarskich
	includeSickLeave: boolean // Uwzględniaj możliwość zwolnień lekarskich

	// FAKULTATYWNE - kod pocztowy
	postalCode?: string // Kod pocztowy użytkownika (00-000)

	// Wyniki kalkulacji
	monthlyPension?: number // Przewidywana miesięczna emerytura (nominalna)
	realMonthlyPension?: number // Emerytura urealniona (dzisiejsza siła nabywcza)
	replacementRate?: number // Stopa zastąpienia w %
	totalCapital?: number // Całkowity kapitał emerytalny
	lifeExpectancyMonths?: number // Średnie dalsze trwanie życia w miesiącach
	sickLeaveDaysPerYear?: number // Średnia liczba dni zwolnień lekarskich rocznie
	sickLeaveImpactPercentage?: number // Wpływ zwolnień lekarskich na emeryturę w %

	createdAt: Date
}

export class MyDatabase extends Dexie {
	pensionData!: Table<PensionData>

	constructor() {
		super('ZUSCalculatorDB')
		// Zwiększono wersję z 5 na 6, aby zastosować zmiany w schemacie
		this.version(6).stores({
			pensionData:
				// Zaktualizowano pola: usunięto 'workStartYear', dodano 'startedWorkBefore1999' i 'initialCapital'
				'++id, age, gender, grossSalary, plannedRetirementYear, startedWorkBefore1999, initialCapital, zusAccountBalance, zusSubaccountBalance, includeSickLeave, postalCode, monthlyPension, realMonthlyPension, replacementRate, totalCapital, lifeExpectancyMonths, sickLeaveDaysPerYear, sickLeaveImpactPercentage, createdAt',
		})
	}
}

export const db = new MyDatabase()
