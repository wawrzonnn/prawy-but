'use client'

import { useState } from 'react'
import { db } from '@/lib/db'
import Step1 from '@/components/Step1'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import ProgressSteps from '@/components/ProgressSteps'
import { calculatePension } from '@/lib/pensionCalculator'
import { PensionCalculationInput, PensionCalculationOutput } from '@/types/pension'

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
		monthlyPensionReal?: number // wysokość urealniona (dzisiejsza siła nabywcza)
		replacementRate?: number
		totalCapital?: number
		finalSalary?: number
		lifeExpectancyMonths?: number
		sickLeaveDaysPerYear?: number
		sickLeaveImpactPercentage?: number
		
		// Dodatkowe analizy zgodne ze specyfikacją
		averagePensionInRetirementYear?: number
		pensionVsAverageRatio?: number
		monthlyPensionWithoutSickLeave?: number
		delayedRetirement?: {
			oneYear: { monthlyPension: number; replacementRate: number }
			twoYears: { monthlyPension: number; replacementRate: number }
			fiveYears: { monthlyPension: number; replacementRate: number }
		}
		expectedPension?: number // oczekiwane świadczenie użytkownika
		yearsToReachExpected?: number
	}>({
		// Podstawowe dane obowiązkowe - z przykładowymi wartościami
		age: 35,
		gender: 'male',
		grossSalary: 8000,
		workStartYear: 2010,
		plannedRetirementYear: 2055,

		// Fakultatywne dane ZUS
		zusAccountBalance: 120000,
		zusSubaccountBalance: 45000,

		// Opcja zwolnień lekarskich
		includeSickLeave: false,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Funkcja kalkulacji emerytury używająca wspólnej logiki
	const calculatePensionData = () => {
		if (!formData.gender || !formData.age || !formData.grossSalary || !formData.workStartYear || !formData.plannedRetirementYear) {
			return
		}

		// Przygotuj dane wejściowe
		const input: PensionCalculationInput = {
			age: Number(formData.age),
			gender: formData.gender,
			grossSalary: Number(formData.grossSalary),
			workStartYear: Number(formData.workStartYear),
			plannedRetirementYear: Number(formData.plannedRetirementYear),
			zusAccountBalance: formData.zusAccountBalance ? Number(formData.zusAccountBalance) : undefined,
			zusSubaccountBalance: formData.zusSubaccountBalance ? Number(formData.zusSubaccountBalance) : undefined,
			includeSickLeave: formData.includeSickLeave
		}

		// Oblicz używając wspólnej funkcji
		const result = calculatePension(input)

		// Zaktualizuj stan formularza
		setFormData(prev => ({
			...prev,
			...result
		}))
	}

	const handleInputChange = (field: string, value: string | number | boolean) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		// Przelicz emeryturę po każdej zmianie w kroku 3
		if (currentStep === 3) {
			setTimeout(calculatePensionData, 100)
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
				calculatePensionData()

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

				// Reset formularza do przykładowych wartości
				setFormData({
					age: 35,
					gender: 'male',
					grossSalary: 8000,
					workStartYear: 2010,
					plannedRetirementYear: 2054,
					zusAccountBalance: 120000,
					zusSubaccountBalance: 45000,
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
				return <Step3 formData={formData} onInputChange={handleInputChange} calculatePension={calculatePensionData} />
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
