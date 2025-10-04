import Dexie, { Table } from 'dexie'

export interface PensionData {
	id?: number

	// OBOWIĄZKOWE dane podstawowe
	age: number // Wiek w latach
	gender: 'male' | 'female' // Płeć
	grossSalary: number // Wysokość wynagrodzenia brutto miesięcznie
	workStartYear: number // Rok rozpoczęcia pracy (styczeń)
	plannedRetirementYear: number // Planowany rok zakończenia aktywności zawodowej (styczeń)

	// FAKULTATYWNE - środki w ZUS
	zusAccountBalance?: number // Wysokość zgromadzonych środków na koncie w ZUS
	zusSubaccountBalance?: number // Wysokość zgromadzonych środków na subkoncie w ZUS

	// FAKULTATYWNE - opcja zwolnień lekarskich
	includeSickLeave: boolean // Uwzględniaj możliwość zwolnień lekarskich

	// Wyniki kalkulacji
	monthlyPension?: number // Przewidywana miesięczna emerytura
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
		this.version(4).stores({
			pensionData:
				'++id, age, gender, grossSalary, workStartYear, plannedRetirementYear, zusAccountBalance, zusSubaccountBalance, includeSickLeave, monthlyPension, replacementRate, totalCapital, lifeExpectancyMonths, sickLeaveDaysPerYear, sickLeaveImpactPercentage, createdAt',
		})
	}
}

export const db = new MyDatabase()
