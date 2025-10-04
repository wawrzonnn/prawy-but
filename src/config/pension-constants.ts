/**
 * Wszystkie stałe kalkulatora emerytury w jednym pliku
 * Łatwe zarządzanie wszystkimi parametrami systemu
 */

// ===== STOPY I STAWKI EMERYTALNE =====
export const PENSION_RATES = {
	CONTRIBUTION_RATE: 0.1952, // 19.52% składka emerytalna
	AVERAGE_WAGE_GROWTH: 0.03, // 3% wzrost wynagrodzeń rocznie
	INFLATION_RATE: 0.025, // 2.5% inflacja rocznie
	HISTORICAL_CAPITAL_MULTIPLIER: 0.7, // mnożnik dla oszacowania kapitału historycznego
} as const

// ===== WIEK EMERYTALNY =====
export const RETIREMENT_AGES = {
	MALE: 65,
	FEMALE: 60
} as const

// ===== TABELE ŚREDNIEGO DALSZEGO TRWANIA ŻYCIA =====
export const LIFE_EXPECTANCY_TABLES = {
	FEMALE: {
		AGE_60_OR_LESS: 24,
		AGE_65_OR_LESS: 22,
		AGE_OVER_65: 20
	},
	MALE: {
		AGE_65_OR_LESS: 20,
		AGE_67_OR_LESS: 18,
		AGE_OVER_67: 16
	}
} as const

// ===== STATYSTYKI ZWOLNIEŃ LEKARSKICH =====
export const SICK_LEAVE_STATISTICS = {
	FEMALE: 12, // dni rocznie
	MALE: 9     // dni rocznie
} as const

// ===== DANE RYNKOWE =====
export const MARKET_DATA = {
	BASE_YEAR: 2024,
	AVERAGE_PENSION_BASE_YEAR: 3500, // PLN przeciętna emerytura w 2024
	EXPECTED_PENSION_EXAMPLE: 5000, // PLN oczekiwana emerytura dla przykładów
	MAX_DELAY_YEARS_CHECK: 20 // maksymalne lata do sprawdzenia opóźnienia emerytury
} as const

// ===== GŁÓWNA KONFIGURACJA - WSZYSTKO W JEDNYM MIEJSCU =====
export const PENSION_CONSTANTS = {
	// Stopy i stawki
	CONTRIBUTION_RATE: PENSION_RATES.CONTRIBUTION_RATE,
	AVERAGE_WAGE_GROWTH: PENSION_RATES.AVERAGE_WAGE_GROWTH,
	INFLATION_RATE: PENSION_RATES.INFLATION_RATE,
	HISTORICAL_CAPITAL_MULTIPLIER: PENSION_RATES.HISTORICAL_CAPITAL_MULTIPLIER,
	
	// Wiek emerytalny
	RETIREMENT_AGE: RETIREMENT_AGES,
	
	// Tabele życia
	LIFE_EXPECTANCY: LIFE_EXPECTANCY_TABLES,
	
	// Zwolnienia lekarskie
	SICK_LEAVE_DAYS: SICK_LEAVE_STATISTICS,
	
	// Dane rynkowe
	AVERAGE_PENSION_2024: MARKET_DATA.AVERAGE_PENSION_BASE_YEAR,
	EXPECTED_PENSION_EXAMPLE: MARKET_DATA.EXPECTED_PENSION_EXAMPLE,
	MAX_DELAY_YEARS_CHECK: MARKET_DATA.MAX_DELAY_YEARS_CHECK,
} as const
