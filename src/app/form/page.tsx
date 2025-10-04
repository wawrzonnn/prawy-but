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
		// Podstawowe dane (zgodne z oficjalnym kalkulatorem ZUS)
		lastZusInfoYear: number | ''
		gender: 'male' | 'female' | ''
		birthMonth: number | ''
		birthYear: number | ''

		// Kapitał emerytalny (obecny stan)
		valorisedContributions: number | ''
		valorisedInitialCapital: number | ''
		valorisedSubaccountTotal: number | ''
		contributions12Months: number | ''

		// Planowanie emerytalne
		retirementAgeYears: number | ''
		retirementAgeMonths: number | ''
		workStartYear: number | ''
		currentGrossSalary: number | ''

		// Dodatkowe parametry
		currentSalaryPercentage?: number
		isOfeMember: boolean
		futureSalaryPercentage: number | ''

		// Wyniki kalkulacji
		monthlyPension?: number
		replacementRate?: number
		totalCapital?: number
		lifeExpectancyMonths?: number
	}>({
		// Podstawowe dane
		lastZusInfoYear: new Date().getFullYear(),
		gender: '',
		birthMonth: '',
		birthYear: '',

		// Kapitał emerytalny
		valorisedContributions: '',
		valorisedInitialCapital: 0,
		valorisedSubaccountTotal: 0,
		contributions12Months: '',

		// Planowanie emerytalne
		retirementAgeYears: '',
		retirementAgeMonths: 0,
		workStartYear: '',
		currentGrossSalary: '',

		// Dodatkowe parametry
		isOfeMember: false,
		futureSalaryPercentage: 100, // domyślnie 100% obecnego poziomu
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Funkcja obliczania procentu przeciętnego wynagrodzenia (uproszczona)
	const calculateCurrentSalaryPercentage = (salary: number) => {
		// Przeciętne wynagrodzenie w Polsce (2024) - ok. 7500 zł brutto
		const averageSalary = 7500
		return Math.round((salary / averageSalary) * 100)
	}

	// Funkcja kalkulacji emerytury (rozszerzona zgodnie z ZUS)
	const calculatePension = () => {
		if (!formData.gender || !formData.birthYear || !formData.currentGrossSalary || !formData.retirementAgeYears) {
			return
		}

		const currentAge = new Date().getFullYear() - Number(formData.birthYear)
		const totalRetirementAge = Number(formData.retirementAgeYears) + Number(formData.retirementAgeMonths || 0) / 12
		const yearsToRetirement = totalRetirementAge - currentAge
		const monthsToRetirement = yearsToRetirement * 12

		// Składka emerytalna - 19.52% wynagrodzenia brutto
		const monthlyContribution = Number(formData.currentGrossSalary) * 0.1952

		// Prognoza przyszłych składek z uwzględnieniem procentu przeciętnego wynagrodzenia
		const futureSalaryMultiplier = Number(formData.futureSalaryPercentage || 100) / 100
		const adjustedMonthlyContribution = monthlyContribution * futureSalaryMultiplier
		const futureContributions = adjustedMonthlyContribution * monthsToRetirement

		// Całkowity kapitał emerytalny
		const totalCapital =
			Number(formData.valorisedContributions || 0) +
			Number(formData.valorisedInitialCapital || 0) +
			Number(formData.valorisedSubaccountTotal || 0) +
			futureContributions

		// Tabele średniego dalszego trwania życia (bardziej precyzyjne)
		// Uwzględniamy wiek przejścia na emeryturę
		let lifeExpectancyYears: number
		if (formData.gender === 'female') {
			lifeExpectancyYears = totalRetirementAge <= 60 ? 24 : totalRetirementAge <= 65 ? 22 : 20
		} else {
			lifeExpectancyYears = totalRetirementAge <= 65 ? 20 : totalRetirementAge <= 67 ? 18 : 16
		}

		const lifeExpectancyMonths = lifeExpectancyYears * 12

		// Miesięczna emerytura
		const monthlyPension = totalCapital / lifeExpectancyMonths
		const replacementRate = (monthlyPension / Number(formData.currentGrossSalary)) * 100

		// Oblicz procent przeciętnego wynagrodzenia
		const currentSalaryPercentage = calculateCurrentSalaryPercentage(Number(formData.currentGrossSalary))

		setFormData(prev => ({
			...prev,
			monthlyPension: Math.round(monthlyPension),
			replacementRate: Math.round(replacementRate * 100) / 100,
			totalCapital: Math.round(totalCapital),
			lifeExpectancyMonths,
			currentSalaryPercentage,
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
		if (formData.gender && formData.birthYear && formData.currentGrossSalary && formData.retirementAgeYears) {
			setIsSubmitting(true)
			try {
				// Oblicz emeryturę przed zapisem
				calculatePension()

				await db.pensionData.add({
					lastZusInfoYear: Number(formData.lastZusInfoYear),
					gender: formData.gender,
					birthMonth: Number(formData.birthMonth) || 1,
					birthYear: Number(formData.birthYear),
					valorisedContributions: Number(formData.valorisedContributions) || 0,
					valorisedInitialCapital: Number(formData.valorisedInitialCapital) || 0,
					valorisedSubaccountTotal: Number(formData.valorisedSubaccountTotal) || 0,
					contributions12Months: Number(formData.contributions12Months) || 0,
					retirementAgeYears: Number(formData.retirementAgeYears),
					retirementAgeMonths: Number(formData.retirementAgeMonths) || 0,
					workStartYear: Number(formData.workStartYear) || new Date().getFullYear() - 20,
					currentGrossSalary: Number(formData.currentGrossSalary),
					currentSalaryPercentage: formData.currentSalaryPercentage,
					isOfeMember: formData.isOfeMember,
					futureSalaryPercentage: Number(formData.futureSalaryPercentage) || 100,
					monthlyPension: formData.monthlyPension,
					replacementRate: formData.replacementRate,
					totalCapital: formData.totalCapital,
					lifeExpectancyMonths: formData.lifeExpectancyMonths,
					createdAt: new Date(),
				})

				console.log('W17 kalkulator emerytalny zapisany')

				// Reset formularza
				setFormData({
					lastZusInfoYear: new Date().getFullYear(),
					gender: '',
					birthMonth: '',
					birthYear: '',
					valorisedContributions: '',
					valorisedInitialCapital: 0,
					valorisedSubaccountTotal: 0,
					contributions12Months: '',
					retirementAgeYears: '',
					retirementAgeMonths: 0,
					workStartYear: '',
					currentGrossSalary: '',
					isOfeMember: false,
					futureSalaryPercentage: 100,
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
				return !!(formData.lastZusInfoYear && formData.gender && formData.birthYear && formData.retirementAgeYears)
			case 2:
				return !!(
					formData.lastZusInfoYear &&
					formData.gender &&
					formData.birthYear &&
					formData.retirementAgeYears &&
					formData.valorisedContributions !== ''
				)
			case 3:
				return !!(
					formData.lastZusInfoYear &&
					formData.gender &&
					formData.birthYear &&
					formData.retirementAgeYears &&
					formData.valorisedContributions !== '' &&
					formData.currentGrossSalary
				)
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
					<h1 className='text-3xl font-bold text-zus-black mb-2'>Kalkulator Emerytalny ZUS</h1>
					<p className='text-zus-dark-green'>Emerytura na nowych zasadach - wersja uproszczona</p>
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
								className='px-6 py-3 bg-zus-green hover:bg-zus-dark-green disabled:bg-zus-light-gray disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors'>
								Następny →
							</button>
						) : (
							<button
								type='button'
								onClick={handleSubmit}
								disabled={
									!formData.gender ||
									!formData.birthYear ||
									!formData.retirementAgeYears ||
									!formData.valorisedContributions ||
									!formData.currentGrossSalary ||
									isSubmitting
								}
								className='px-6 py-3 bg-zus-green hover:bg-zus-dark-green disabled:bg-zus-light-gray disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors'>
								{isSubmitting ? 'Zapisywanie...' : 'Oblicz emeryturę'}
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
