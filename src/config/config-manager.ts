/**
 * Menedżer konfiguracji - pozwala na dynamiczne zarządzanie stałymi
 * Można tu dodać logikę ładowania z API, plików ENV, bazy danych itp.
 */

import { 
	PENSION_RATES,
	RETIREMENT_AGES, 
	LIFE_EXPECTANCY_TABLES,
	SICK_LEAVE_STATISTICS,
	MARKET_DATA
} from './pension-constants'

export class PensionConfigManager {
	/**
	 * Aktualizuj stopy emerytalne
	 */
	static updatePensionRates(newRates: Partial<typeof PENSION_RATES>) {
		// W przyszłości można dodać logikę zapisu do bazy/API
		console.log('Aktualizacja stóp emerytalnych:', newRates)
		return { ...PENSION_RATES, ...newRates }
	}

	/**
	 * Aktualizuj wiek emerytalny
	 */
	static updateRetirementAges(newAges: Partial<typeof RETIREMENT_AGES>) {
		console.log('Aktualizacja wieku emerytalnego:', newAges)
		return { ...RETIREMENT_AGES, ...newAges }
	}

	/**
	 * Aktualizuj tabele życia
	 */
	static updateLifeExpectancyTables(newTables: Partial<typeof LIFE_EXPECTANCY_TABLES>) {
		console.log('Aktualizacja tabel życia:', newTables)
		return { ...LIFE_EXPECTANCY_TABLES, ...newTables }
	}

	/**
	 * Aktualizuj dane rynkowe
	 */
	static updateMarketData(newData: Partial<typeof MARKET_DATA>) {
		console.log('Aktualizacja danych rynkowych:', newData)
		return { ...MARKET_DATA, ...newData }
	}

	/**
	 * Załaduj konfigurację z zewnętrznego źródła
	 */
	static async loadConfigFromAPI(apiUrl: string) {
		try {
			const response = await fetch(apiUrl)
			const config = await response.json()
			
			console.log('Załadowano konfigurację z API:', config)
			return config
		} catch (error) {
			console.error('Błąd ładowania konfiguracji:', error)
			return null
		}
	}

	/**
	 * Waliduj konfigurację
	 */
	static validateConfig(config: any): boolean {
		// Dodaj walidację wymaganych pól
		const requiredFields = [
			'CONTRIBUTION_RATE',
			'AVERAGE_WAGE_GROWTH',
			'INFLATION_RATE'
		]

		return requiredFields.every(field => 
			config[field] !== undefined && 
			typeof config[field] === 'number'
		)
	}

	/**
	 * Eksportuj aktualną konfigurację
	 */
	static exportCurrentConfig() {
		return {
			pensionRates: PENSION_RATES,
			retirementAges: RETIREMENT_AGES,
			lifeExpectancyTables: LIFE_EXPECTANCY_TABLES,
			sickLeaveStatistics: SICK_LEAVE_STATISTICS,
			marketData: MARKET_DATA,
			exportedAt: new Date().toISOString()
		}
	}
}
