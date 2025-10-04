import { NextResponse } from 'next/server'
import { PENSION_CONSTANTS } from '@/config'

export async function GET(): Promise<NextResponse> {
	return NextResponse.json({
		name: 'Kalkulator Emerytury ZUS',
		version: '1.0.0',
		description: 'Kalkulator prognozy emerytury zgodny ze specyfikacją ZUS',
		
		constants: {
			contributionRate: PENSION_CONSTANTS.CONTRIBUTION_RATE,
			averageWageGrowth: PENSION_CONSTANTS.AVERAGE_WAGE_GROWTH,
			inflationRate: PENSION_CONSTANTS.INFLATION_RATE,
			retirementAge: PENSION_CONSTANTS.RETIREMENT_AGE,
			sickLeaveDays: PENSION_CONSTANTS.SICK_LEAVE_DAYS
		},
		
		requiredFields: [
			'age',
			'gender', 
			'grossSalary',
			'workStartYear',
			'plannedRetirementYear'
		],
		
		optionalFields: [
			'zusAccountBalance',
			'zusSubaccountBalance',
			'includeSickLeave'
		],
		
		outputFields: [
			'monthlyPension',
			'monthlyPensionReal',
			'replacementRate',
			'totalCapital',
			'finalSalary',
			'averagePensionInRetirementYear',
			'pensionVsAverageRatio',
			'monthlyPensionWithoutSickLeave',
			'delayedRetirement',
			'yearsToReachExpected'
		],
		
		endpoints: {
			'GET /api/pension/info': 'Informacje o kalkulatorze',
			'POST /api/pension/calculate': 'Oblicz emeryturę'
		},
		
		exampleRequest: {
			age: 35,
			gender: 'male',
			grossSalary: 8000,
			workStartYear: 2010,
			plannedRetirementYear: 2055,
			zusAccountBalance: 120000,
			zusSubaccountBalance: 45000,
			includeSickLeave: false
		}
	})
}
