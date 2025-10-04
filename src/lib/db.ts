import Dexie, { Table } from 'dexie'

export interface PensionData {
	id?: number

	// Podstawowe dane (zgodne z oficjalnym kalkulatorem ZUS)
	lastZusInfoYear: number // Ostatnia Informacja o stanie konta w ZUS za rok
	gender: 'male' | 'female'
	birthMonth: number // 1-12
	birthYear: number

	// Kapitał emerytalny (obecny stan)
	valorisedContributions: number // Kwota zwaloryzowanych składek
	valorisedInitialCapital: number // Kwota zwaloryzowanego kapitału początkowego
	valorisedSubaccountTotal: number // Zwaloryzowana kwota ogółem na subkoncie
	contributions12Months: number // Kwota składek za 12 miesięcy kalendarzowych

	// Planowanie emerytalne
	retirementAgeYears: number // Deklarowany wiek przejścia na emeryturę w latach
	retirementAgeMonths: number // Deklarowany wiek przejścia na emeryturę w miesiącach (0-11)
	workStartYear: number // Rok rozpoczęcia / wznowienia pracy
	currentGrossSalary: number // Miesięczne obecne wynagrodzenie brutto

	// Dodatkowe parametry
	currentSalaryPercentage?: number // Obecne wynagrodzenie jako % przeciętnego (automatyczne)
	isOfeMember: boolean // Jestem członkiem OFE lub mam subkonto
	futureSalaryPercentage: number // Procent przeciętnego wynagrodzenia w przyszłości

	// Wyniki kalkulacji
	monthlyPension?: number // Przewidywana miesięczna emerytura
	replacementRate?: number // Stopa zastąpienia w %
	totalCapital?: number // Całkowity kapitał emerytalny
	lifeExpectancyMonths?: number // Średnie dalsze trwanie życia w miesiącach

	createdAt: Date
}

export class MyDatabase extends Dexie {
	pensionData!: Table<PensionData>

	constructor() {
		super('ZUSCalculatorDB')
		this.version(3).stores({
			pensionData:
				'++id, lastZusInfoYear, gender, birthMonth, birthYear, valorisedContributions, valorisedInitialCapital, valorisedSubaccountTotal, contributions12Months, retirementAgeYears, retirementAgeMonths, workStartYear, currentGrossSalary, currentSalaryPercentage, isOfeMember, futureSalaryPercentage, monthlyPension, replacementRate, totalCapital, lifeExpectancyMonths, createdAt',
		})
	}
}

export const db = new MyDatabase()
