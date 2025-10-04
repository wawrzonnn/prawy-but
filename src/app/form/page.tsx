'use client'

import { useState } from 'react'
import { db } from '@/lib/db'
import Step1 from '@/components/Step1'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import ProgressSteps from '@/components/ProgressSteps'

export default function Form() {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<{
		// OBOWIĄZKOWE dane podstawowe
		age: number | ''
		gender: 'male' | 'female' | ''
		grossSalary: number | ''
		workStartYear: number | ''
		plannedRetirementYear: number | ''

		// FAKULTATYWNE - środki w ZUS
		zusAccountBalance?: number | ''
		zusSubaccountBalance?: number | ''

		// FAKULTATYWNE - opcja zwolnień lekarskich
		includeSickLeave: boolean

		// Wyniki kalkulacji
		monthlyPension?: number
		replacementRate?: number
		totalCapital?: number
		lifeExpectancyMonths?: number
		sickLeaveDaysPerYear?: number
		sickLeaveImpactPercentage?: number
	}>({
		// Podstawowe dane obowiązkowe
		age: '',
		gender: '',
		grossSalary: '',
		workStartYear: '',
		plannedRetirementYear: '',

		// Fakultatywne dane ZUS
		zusAccountBalance: '',
		zusSubaccountBalance: '',

		// Opcja zwolnień lekarskich
		includeSickLeave: false,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Funkcja obliczania procentu przeciętnego wynagrodzenia (uproszczona)
	const calculateCurrentSalaryPercentage = (salary: number) => {
		// Przeciętne wynagrodzenie w Polsce (2024) - ok. 7500 zł brutto
		const averageSalary = 7500
		return Math.round((salary / averageSalary) * 100)
	}

	// Funkcja kalkulacji emerytury z uwzględnieniem nowych wymagań
	const calculatePension = () => {
		if (!formData.gender || !formData.age || !formData.grossSalary || !formData.workStartYear || !formData.plannedRetirementYear) {
			return
		}

		const currentYear = new Date().getFullYear()
		const retirementAge = formData.gender === 'female' ? 60 : 65
		const yearsToRetirement = Number(formData.plannedRetirementYear) - currentYear
		const monthsToRetirement = yearsToRetirement * 12
		const workingYears = Number(formData.plannedRetirementYear) - Number(formData.workStartYear)

		// Średni wzrost wynagrodzeń w Polsce (założenie: 3% rocznie)
		const averageWageGrowth = 0.03
		
		// Składka emerytalna - 19.52% wynagrodzenia brutto
		const currentMonthlyContribution = Number(formData.grossSalary) * 0.1952
		
		// Prognoza przyszłych składek z uwzględnieniem wzrostu wynagrodzeń
		let totalFutureContributions = 0
		for (let year = 0; year < yearsToRetirement; year++) {
			const yearlyGrowthMultiplier = Math.pow(1 + averageWageGrowth, year)
			const adjustedMonthlyContribution = currentMonthlyContribution * yearlyGrowthMultiplier
			totalFutureContributions += adjustedMonthlyContribution * 12
		}

		// Oszacowanie obecnych środków jeśli nie podano
		let estimatedCurrentCapital = 0
		if (formData.zusAccountBalance && formData.zusSubaccountBalance) {
			estimatedCurrentCapital = Number(formData.zusAccountBalance) + Number(formData.zusSubaccountBalance)
		} else {
			// Oszacowanie na podstawie lat pracy i obecnego wynagrodzenia
			const yearsWorked = currentYear - Number(formData.workStartYear)
			const averageContributionPerYear = currentMonthlyContribution * 12
			estimatedCurrentCapital = averageContributionPerYear * yearsWorked * 0.7 // uwzględnienie wzrostu wynagrodzeń w przeszłości
		}

		// Całkowity kapitał emerytalny
		let totalCapital = estimatedCurrentCapital + totalFutureContributions

		// Uwzględnienie zwolnień lekarskich
		let sickLeaveDaysPerYear = 0
		let sickLeaveImpactPercentage = 0
		
		if (formData.includeSickLeave) {
			// Średnie zwolnienia lekarskie w Polsce
			sickLeaveDaysPerYear = formData.gender === 'female' ? 12 : 9 // dni rocznie
			sickLeaveImpactPercentage = (sickLeaveDaysPerYear / 365) * 100
			
			// Redukcja kapitału o wpływ zwolnień lekarskich
			const sickLeaveReduction = sickLeaveDaysPerYear / 365
			totalCapital = totalCapital * (1 - sickLeaveReduction)
		}

		// Tabele średniego dalszego trwania życia przy przejściu na emeryturę
		let lifeExpectancyYears: number
		if (formData.gender === 'female') {
			lifeExpectancyYears = retirementAge <= 60 ? 24 : retirementAge <= 65 ? 22 : 20
		} else {
			lifeExpectancyYears = retirementAge <= 65 ? 20 : retirementAge <= 67 ? 18 : 16
		}

		const lifeExpectancyMonths = lifeExpectancyYears * 12

		// Miesięczna emerytura
		const monthlyPension = totalCapital / lifeExpectancyMonths
		const replacementRate = (monthlyPension / Number(formData.grossSalary)) * 100

		setFormData(prev => ({
			...prev,
			monthlyPension: Math.round(monthlyPension),
			replacementRate: Math.round(replacementRate * 100) / 100,
			totalCapital: Math.round(totalCapital),
			lifeExpectancyMonths,
			sickLeaveDaysPerYear,
			sickLeaveImpactPercentage: Math.round(sickLeaveImpactPercentage * 100) / 100,
		}))
	}

	const handleInputChange = (field: string, value: string | number | boolean) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		// Przelicz emeryturę po każdej zmianie w kroku 3
		if (currentStep === 3) {
			setTimeout(calculatePension, 100)
		}
	}

	const nextStep = () => {
		if (currentStep < 3) setCurrentStep(currentStep + 1)
	}

	const prevStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1)
	}

	const handleStepClick = (step: number) => {
		if (isStepValid(step)) {
			setCurrentStep(step)
		}
	}

	const handleSubmit = async () => {
		if (formData.gender && formData.age && formData.grossSalary && formData.workStartYear && formData.plannedRetirementYear) {
			setIsSubmitting(true)
			try {
				// Oblicz emeryturę przed zapisem
				calculatePension()

				await db.pensionData.add({
					age: Number(formData.age),
					gender: formData.gender,
					grossSalary: Number(formData.grossSalary),
					workStartYear: Number(formData.workStartYear),
					plannedRetirementYear: Number(formData.plannedRetirementYear),
					zusAccountBalance: Number(formData.zusAccountBalance) || 0,
					zusSubaccountBalance: Number(formData.zusSubaccountBalance) || 0,
					includeSickLeave: formData.includeSickLeave,
					monthlyPension: formData.monthlyPension,
					replacementRate: formData.replacementRate,
					totalCapital: formData.totalCapital,
					lifeExpectancyMonths: formData.lifeExpectancyMonths,
					sickLeaveDaysPerYear: formData.sickLeaveDaysPerYear,
					sickLeaveImpactPercentage: formData.sickLeaveImpactPercentage,
					createdAt: new Date(),
				})

				console.log('W17 kalkulator emerytalny zapisany')

				// Reset formularza
				setFormData({
					age: '',
					gender: '',
					grossSalary: '',
					workStartYear: '',
					plannedRetirementYear: '',
					zusAccountBalance: '',
					zusSubaccountBalance: '',
					includeSickLeave: false,
				})
				setCurrentStep(1)
			} catch (error) {
				console.log('W18 blad zapisu kalkulatora')
			} finally {
				setIsSubmitting(false)
			}
		}
	}

	const isStepValid = (step: number) => {
		switch (step) {
			case 1:
				return !!(formData.age && formData.gender && formData.grossSalary && formData.workStartYear && formData.plannedRetirementYear)
			case 2:
				return !!(formData.age && formData.gender && formData.grossSalary && formData.workStartYear && formData.plannedRetirementYear)
			case 3:
				return !!(formData.age && formData.gender && formData.grossSalary && formData.workStartYear && formData.plannedRetirementYear)
			default:
				return false
		}
	}

	const renderCurrentStep = () => {
		switch (currentStep) {
			case 1:
				return <Step1 formData={formData} onInputChange={handleInputChange} />
			case 2:
				return <Step2 formData={formData} onInputChange={handleInputChange} />
			case 3:
				return <Step3 formData={formData} onInputChange={handleInputChange} calculatePension={calculatePension} />
			default:
				return null
		}
	}

	return (
		<div className='min-h-screen bg-zus-light-gray flex items-center justify-center p-4'>
			<div className='bg-zus-white border-2 border-zus-green rounded-lg shadow-xl p-8 w-full max-w-4xl'>
				{/* Header */}
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-zus-black mb-2'>Symulator Emerytury ZUS</h1>
					<p className='text-zus-dark-green'>Prognoza przyszłej emerytury z uwzględnieniem wzrostu wynagrodzeń</p>
				</div>

				{/* Progress Steps */}
				<ProgressSteps
					currentStep={currentStep}
					totalSteps={3}
					onStepClick={handleStepClick}
					isStepValid={isStepValid}
				/>

				<form className='space-y-6'>
					{/* Render Current Step */}
					{renderCurrentStep()}

					{/* Navigation Buttons */}
					<div className='flex justify-between pt-6'>
						<button
							type='button'
							onClick={prevStep}
							disabled={currentStep === 1}
							className='px-6 py-3 bg-zus-light-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-zus-black font-medium rounded-lg transition-colors'>
							← Poprzedni
						</button>

						{currentStep < 3 ? (
							<button
								type='button'
								onClick={nextStep}
								disabled={!isStepValid(currentStep)}
								className='px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-zus-light-gray disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors'>
								Następny →
							</button>
						) : (
							<button
								type='button'
								onClick={handleSubmit}
								disabled={
									!formData.gender ||
									!formData.age ||
									!formData.grossSalary ||
									!formData.workStartYear ||
									!formData.plannedRetirementYear ||
									isSubmitting
								}
								className='px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-zus-light-gray disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors'>
								{isSubmitting ? 'Zapisywanie...' : 'Zaprognozuj moją przyszłą emeryturę'}
							</button>
						)}
					</div>
				</form>

				{/* Link to database */}
				<div className='mt-6 text-center'>
					<a href='/db' className='text-zus-dark-green hover:underline text-sm'>
						Zobacz zapisane kalkulacje →
					</a>
				</div>
			</div>
		</div>
	)
}
