'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	TrendingUp,
	AlertCircle,
	ChevronDown,
	ChevronUp,
	Users,
	Calendar,
	Wallet,
	BarChart3,
	Lightbulb,
	HeartPulse,
} from 'lucide-react'
import { calculatePensionFUS20 } from '@/lib/fus20-calculator'
import { DEFAULT_SCENARIO } from '@/config/fus20-scenarios'
import { INSURANCE_TITLE_CODES } from '@/config/zus-constants'
import type { IndividualInputData } from '@/types/fus20-types'
import { db } from '@/lib/db'
import { ChatWidget } from '@/components/ChatWidget'

export default function Form() {
	const [formData, setFormData] = useState<{
		age: number
		gender: 'male' | 'female' | ''
		grossSalary: number
		plannedRetirementYear: number
		startedWorkBefore1999: boolean // NOWE
		initialCapital?: number // NOWE
		zusAccountBalance?: number
		zusSubaccountBalance?: number
		includeSickLeave: boolean
		monthlyPension?: number
		realMonthlyPension?: number
		monthlyPensionWithoutSickLeave?: number
		futureAveragePension?: number
		futureGrossSalary?: number
		replacementRate?: number
		totalCapital?: number
		lifeExpectancyMonths?: number
		sickLeaveDaysPerYear?: number
		sickLeaveImpactPercentage?: number
	}>({
		age: 30,
		gender: 'male',
		grossSalary: 7500,
		plannedRetirementYear: 2060, // 30 lat w 2025 → urodzony 1995 → emerytura w wieku 65 lat = 2060
		startedWorkBefore1999: false,
		initialCapital: 0,
		zusAccountBalance: 0,
		zusSubaccountBalance: 0,
		includeSickLeave: false,
	})

	const [showAdvanced, setShowAdvanced] = useState(false)
	const [showDelayScenarios, setShowDelayScenarios] = useState(false)
	const [showDetails, setShowDetails] = useState(false)

	// Auto-obliczanie emerytury przy każdej zmianie
	useEffect(() => {
		if (formData.gender && formData.age && formData.grossSalary) {
			calculatePension()
		}
	}, [
		formData.age,
		formData.gender,
		formData.grossSalary,
		formData.plannedRetirementYear,
		formData.includeSickLeave,
		formData.zusAccountBalance,
		formData.zusSubaccountBalance,
		formData.startedWorkBefore1999, // NOWA ZALEŻNOŚĆ
		formData.initialCapital, // NOWA ZALEŻNOŚĆ
	])

	// Automatyczne ustawianie lat pracy na podstawie wieku i płci
	useEffect(() => {
		if (formData.age && formData.gender) {
			const currentYear = new Date().getFullYear()
			const retirementAge = formData.gender === 'female' ? 60 : 65
			const birthYear = currentYear - formData.age
			const plannedRetirement = birthYear + retirementAge
			setFormData((prev) => ({
				...prev,
				plannedRetirementYear: plannedRetirement,
			}))
		}
	}, [formData.age, formData.gender])

	const calculatePension = () => {
		if (!formData.gender || !formData.age || !formData.grossSalary) {
			return
		}

		// Prepare input data for FUS20 calculator
		const inputData: IndividualInputData = {
			gender: formData.gender,
			currentAge: formData.age,
			initialCapital: formData.startedWorkBefore1999 ? formData.initialCapital || 0 : 0, // ZMIANA
			insuranceTitle: INSURANCE_TITLE_CODES.EMPLOYEE, // Default to employee
			contributionBase: {
				currentMonthlyAmount: formData.grossSalary,
				isJdgPreferential: false,
			},
			plannedRetirementAge: formData.plannedRetirementYear - (new Date().getFullYear() - formData.age),
			sickLeave: {
				includeInCalculation: formData.includeSickLeave,
				averageDaysPerYear: formData.gender === 'female' ? 12 : 9,
			},
			accumulatedCapital:
				formData.zusAccountBalance || formData.zusSubaccountBalance
					? {
							zusAccount: formData.zusAccountBalance || 0,
							zusSubaccount: formData.zusSubaccountBalance || 0,
					  }
					: undefined,
		}

		// Calculate using FUS20 calculator
		const result = calculatePensionFUS20(inputData, DEFAULT_SCENARIO)

		// Calculate pension without sick leave for comparison
		let monthlyPensionWithoutSickLeave = result.pensionAmounts.nominalAmount
		if (formData.includeSickLeave && result.sickLeaveImpact) {
			const capitalWithoutSickLeave =
				result.capitalBreakdown.valorizedTotal + result.sickLeaveImpact.contributionReduction
			monthlyPensionWithoutSickLeave = capitalWithoutSickLeave / result.calculationDetails.lifeExpectancyMonths
		}

		// Update form data with results
		setFormData((prev) => ({
			...prev,
			monthlyPension: result.pensionAmounts.nominalAmount,
			realMonthlyPension: result.pensionAmounts.realAmount,
			monthlyPensionWithoutSickLeave: Math.round(monthlyPensionWithoutSickLeave),
			futureAveragePension: result.comparisons.averagePensionInRetirementYear,
			futureGrossSalary: result.calculationDetails.finalSalary,
			replacementRate: result.pensionAmounts.replacementRate,
			totalCapital: result.capitalBreakdown.valorizedTotal,
			lifeExpectancyMonths: result.calculationDetails.lifeExpectancyMonths,
			sickLeaveDaysPerYear: result.sickLeaveImpact?.averageDaysPerYear,
			sickLeaveImpactPercentage: result.sickLeaveImpact?.percentageImpact,
		}))
	}

	// Funkcja do obliczania scenariuszy odroczenia - używa FUS20
	const calculateDelayScenario = (delayYears: number) => {
		if (!formData.gender || !formData.age || !formData.grossSalary) return 0

		const retirementAge = formData.gender === 'female' ? 60 : 65
		const delayedRetirementAge = retirementAge + delayYears

		// Prepare input data with delayed retirement
		const inputData: IndividualInputData = {
			gender: formData.gender,
			currentAge: formData.age,
			initialCapital: formData.startedWorkBefore1999 ? formData.initialCapital || 0 : 0, // ZMIANA
			insuranceTitle: INSURANCE_TITLE_CODES.EMPLOYEE,
			contributionBase: {
				currentMonthlyAmount: formData.grossSalary,
				isJdgPreferential: false,
			},
			plannedRetirementAge: delayedRetirementAge,
			sickLeave: {
				includeInCalculation: formData.includeSickLeave,
				averageDaysPerYear: formData.gender === 'female' ? 12 : 9,
			},
			accumulatedCapital:
				formData.zusAccountBalance || formData.zusSubaccountBalance
					? {
							zusAccount: formData.zusAccountBalance || 0,
							zusSubaccount: formData.zusSubaccountBalance || 0,
					  }
					: undefined,
		}

		// Calculate with delayed retirement using FUS20
		const result = calculatePensionFUS20(inputData, DEFAULT_SCENARIO)
		return result.pensionAmounts.nominalAmount
	}

	const currentYear = new Date().getFullYear()
	const yearsToRetirement = formData.plannedRetirementYear - currentYear

	// Callback dla aktualizacji formularza z AI chatu
	const handleFormUpdate = (updates: Record<string, any>) => {
		setFormData((prev) => ({
			...prev,
			...updates,
		}))
	}

	return (
		<div className='min-h-screen bg-background overflow-x-hidden'>
			{/* Header */}
			<header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200'>
				<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
					<Link href='/' className='flex items-center gap-3'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto' />
					</Link>
					<Link
						href='/'
						className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground transition-colors'
					>
						← Powrót do strony głównej
					</Link>
				</div>
			</header>

			{/* Main Content */}
			<div className='pt-20 pb-16'>
				<div className='container mx-auto max-w-7xl px-4 md:px-6'>
					<div className='text-left mb-6 mt-6'>
						<h1 className='text-2xl md:text-3xl font-bold text-foreground mb-2'>Kalkulator Emerytury ZUS</h1>
						<p className='text-sm text-muted-foreground'>Poznaj swoją przyszłą emeryturę w czasie rzeczywistym</p>
					</div>

					<div className='grid lg:grid-cols-2 gap-4 md:gap-8'>
						{/* Formularz - lewa strona */}
						<div className='space-y-4 min-w-0'>
							{/* Wybór płci */}
							<Card className='p-4 border-0'>
								<h3 className='text-sm font-semibold text-foreground mb-3 flex items-center gap-2'>
									<Users className='w-4 h-4 text-primary' />
									Płeć
								</h3>
								<div className='grid grid-cols-2 gap-3'>
									<button
										onClick={() => setFormData((prev) => ({ ...prev, gender: 'male' }))}
										className={`p-3 rounded border transition-all focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
											formData.gender === 'male'
												? 'border-primary bg-primary/10 shadow-sm'
												: 'border-gray-100 hover:border-primary/50'
										}`}
									>
										<div className='text-center'>
											<div className='text-2xl mb-1'>👨</div>
											<div className='font-semibold text-sm text-foreground'>Mężczyzna</div>
											<div className='text-xs text-muted-foreground'>emerytura: 65 lat</div>
										</div>
									</button>
									<button
										onClick={() => setFormData((prev) => ({ ...prev, gender: 'female' }))}
										className={`p-3 rounded border transition-all focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
											formData.gender === 'female'
												? 'border-primary bg-primary/10 shadow-sm'
												: 'border-gray-100 hover:border-primary/50'
										}`}
									>
										<div className='text-center'>
											<div className='text-2xl mb-1'>👩</div>
											<div className='font-semibold text-sm text-foreground'>Kobieta</div>
											<div className='text-xs text-muted-foreground'>emerytura: 60 lat</div>
										</div>
									</button>
								</div>
							</Card>

							{/* Wiek - slider */}
							<Card className='p-4 border-0'>
								<div className='flex items-center justify-between mb-3'>
									<h3 className='text-sm font-semibold text-foreground flex items-center gap-2'>
										<Calendar className='w-4 h-4 text-primary' />
										Wiek
									</h3>
									<span className='text-2xl font-bold text-primary'>{formData.age} lat</span>
								</div>
								<label htmlFor='age-slider' className='sr-only'>
									Wiek
								</label>
								<input
									id='age-slider'
									type='range'
									min='18'
									max={formData.gender === 'female' ? '59' : '64'}
									value={formData.age}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											age: parseInt(e.target.value),
										}))
									}
									className='w-full h-2 bg-gray-100 rounded appearance-none cursor-pointer accent-primary'
								/>
								<div className='flex justify-between text-xs text-muted-foreground mt-2'>
									<span>18</span>
									<span>{formData.gender === 'female' ? '59' : '64'}</span>
								</div>
								{formData.age >= (formData.gender === 'female' ? 60 : 65) && (
									<p className='text-xs text-orange-600 mt-2'>⚠️ Już jesteś w wieku emerytalnym</p>
								)}
							</Card>

							{/* Wynagrodzenie - slider */}
							<Card className='p-4 border-0'>
								<div className='flex items-center justify-between mb-3'>
									<h3 className='text-sm font-semibold text-foreground flex items-center gap-2'>
										<Wallet className='w-4 h-4 text-primary' />
										Wynagrodzenie brutto
									</h3>
									<span className='text-2xl font-bold text-primary'>
										{formData.grossSalary.toLocaleString('pl-PL')} zł
									</span>
								</div>
								<label htmlFor='salary-slider' className='sr-only'>
									Wynagrodzenie brutto
								</label>
								<input
									id='salary-slider'
									type='range'
									min='3000'
									max='25000'
									step='100'
									value={formData.grossSalary}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											grossSalary: parseInt(e.target.value),
										}))
									}
									className='w-full h-2 bg-gray-100 rounded appearance-none cursor-pointer accent-primary'
								/>
								<div className='flex justify-between text-xs text-muted-foreground mt-2'>
									<span>3 000 zł</span>
									<span>25 000 zł</span>
								</div>
								<p className='text-xs text-muted-foreground mt-2'>
									Składka emerytalna: <strong>{(formData.grossSalary * 0.1952).toFixed(0)} zł/mc</strong>
								</p>
							</Card>

							{/* NOWA SEKCJA: Kapitał początkowy */}
							<Card className='p-4 border-0 space-y-3'>
								<label className='flex items-start space-x-2 p-2 border border-transparent rounded cursor-pointer hover:bg-gray-50 transition-colors'>
									<input
										type='checkbox'
										checked={formData.startedWorkBefore1999}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												startedWorkBefore1999: e.target.checked,
											}))
										}
										className='w-4 h-4 text-primary focus:ring-primary border-2 rounded mt-0.5'
									/>
									<div className='flex-1'>
										<span className='text-sm font-medium block'>Rozpocząłem/am pracę przed 1999 rokiem</span>
										<p className='text-xs text-muted-foreground mt-0.5'>
											Zaznacz, jeśli posiadasz kapitał początkowy ustalony przez ZUS.
										</p>
									</div>
								</label>

								{formData.startedWorkBefore1999 && (
									<div className='px-2 pb-1'>
										<label htmlFor='initial-capital' className='block text-xs font-medium text-foreground mb-1'>
											Zwaloryzowany kapitał początkowy (zł)
										</label>
										<input
											id='initial-capital'
											type='number'
											min='0'
											value={formData.initialCapital || ''}
											onChange={(e) => {
												const value = parseFloat(e.target.value)
												if (e.target.value === '' || value >= 0) {
													setFormData((prev) => ({
														...prev,
														initialCapital: value || 0,
													}))
												}
											}}
											className='w-full px-3 py-2 text-sm border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
											placeholder='Wpisz kwotę z PUE ZUS'
										/>
									</div>
								)}
							</Card>

							{/* Planowany rok przejścia na emeryturę - slider */}
							<Card className='p-4 border-0'>
								<div className='flex items-center justify-between mb-3'>
									<h3 className='text-sm font-semibold text-foreground flex items-center gap-2'>
										<Calendar className='w-4 h-4 text-primary' />
										Rok emerytury
									</h3>
									<span className='text-2xl font-bold text-primary'>{formData.plannedRetirementYear}</span>
								</div>
								<label htmlFor='retirement-year-slider' className='sr-only'>
									Rok emerytury
								</label>
								<input
									id='retirement-year-slider'
									type='range'
									min={(() => {
										const retirementAge = formData.gender === 'female' ? 60 : 65
										const birthYear = currentYear - formData.age
										return birthYear + retirementAge
									})()}
									max={(() => {
										const retirementAge = formData.gender === 'female' ? 60 : 65
										const birthYear = currentYear - formData.age
										return birthYear + retirementAge + 10
									})()}
									value={formData.plannedRetirementYear}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											plannedRetirementYear: parseInt(e.target.value),
										}))
									}
									className='w-full h-2 bg-gray-100 rounded appearance-none cursor-pointer accent-primary'
								/>
								<div className='flex justify-between text-xs text-muted-foreground mt-2'>
									<span>Wiek {formData.gender === 'female' ? '60' : '65'}</span>
									<span>+10 lat</span>
								</div>
								{(() => {
									const retirementAge = formData.gender === 'female' ? 60 : 65
									const birthYear = currentYear - formData.age
									const minRetirementYear = birthYear + retirementAge
									const yearsDelayed = formData.plannedRetirementYear - minRetirementYear

									if (yearsDelayed > 0) {
										return (
											<p className='text-xs text-green-700 mt-2 bg-green-50 p-2 rounded flex items-center gap-1.5'>
												<Lightbulb className='w-3.5 h-3.5 text-green-600 flex-shrink-0' />
												<span>
													Odroczenie o {yearsDelayed} {yearsDelayed === 1 ? 'rok' : 'lata'} zwiększy emeryturę o ~
													{Math.round(yearsDelayed * 6)}%
												</span>
											</p>
										)
									}
									return null
								})()}
							</Card>

							{/* Opcje zaawansowane */}
							<Card className='p-4 border-0'>
								<button
									onClick={() => setShowAdvanced(!showAdvanced)}
									aria-expanded={showAdvanced}
									aria-controls='advanced-options-content'
									className='w-full flex items-center justify-between text-left p-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer'
								>
									<h3 className='text-sm font-semibold text-foreground'>Opcje zaawansowane</h3>
									{showAdvanced ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
								</button>

								{showAdvanced && (
									<div id='advanced-options-content' className='mt-4 space-y-3'>
										<div>
											<label htmlFor='zus-account-balance' className='block text-xs font-medium text-foreground mb-1'>
												Środki na koncie ZUS (opcjonalnie)
											</label>
											<input
												id='zus-account-balance'
												type='number'
												min='0'
												value={formData.zusAccountBalance || ''}
												onChange={(e) => {
													const value = parseFloat(e.target.value)
													if (e.target.value === '' || value >= 0) {
														setFormData((prev) => ({
															...prev,
															zusAccountBalance: value || 0,
														}))
													}
												}}
												className='w-full px-3 py-2 text-sm border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
												placeholder='0'
											/>
										</div>
										<div>
											<label
												htmlFor='zus-subaccount-balance'
												className='block text-xs font-medium text-foreground mb-1'
											>
												Środki na subkoncie ZUS (opcjonalnie)
											</label>
											<input
												id='zus-subaccount-balance'
												type='number'
												min='0'
												value={formData.zusSubaccountBalance || ''}
												onChange={(e) => {
													const value = parseFloat(e.target.value)
													if (e.target.value === '' || value >= 0) {
														setFormData((prev) => ({
															...prev,
															zusSubaccountBalance: value || 0,
														}))
													}
												}}
												className='w-full px-3 py-2 text-sm border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
												placeholder='0'
											/>
										</div>
										<label className='flex items-start space-x-2 p-3 border border-gray-100 rounded cursor-pointer hover:border-primary transition-colors'>
											<input
												type='checkbox'
												checked={formData.includeSickLeave}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														includeSickLeave: e.target.checked,
													}))
												}
												className='w-4 h-4 text-primary focus:ring-primary border-2 rounded mt-0.5'
											/>
											<div className='flex-1'>
												<span className='text-sm font-medium block'>Uwzględnij zwolnienia lekarskie</span>
												<p className='text-xs text-muted-foreground mt-0.5'>
													Średnio {formData.gender === 'female' ? '12' : '9'} dni/rok - obniża emeryturę o ~
													{(((formData.gender === 'female' ? 12 : 9) / 365) * 100).toFixed(1)}%
												</p>
											</div>
										</label>
									</div>
								)}
							</Card>
						</div>

						{/* Wyniki - prawa strona */}
						<div className='space-y-3 lg:sticky lg:top-24 lg:self-start min-w-0'>
							{formData.gender ? (
								<>
									{/* Główny wynik - zielony akcent */}
									<Card className='p-5 border-0 bg-white'>
										<div className='text-center'>
											<p className='text-xs text-muted-foreground mb-2'>Twoja przyszła emerytura</p>
											<div className='text-5xl font-bold text-[var(--zus-green-primary)] mb-2'>
												{(formData.monthlyPension ?? 0).toLocaleString('pl-PL')} zł
											</div>
											<p className='text-xs text-muted-foreground mb-3'>
												miesięcznie w roku {formData.plannedRetirementYear}
											</p>

											{/* Wartość urealniona - jako subtelna informacja */}
											<div className='bg-muted/30 rounded p-2.5'>
												<p className='text-xs text-muted-foreground mb-1'>W dzisiejszej sile nabywczej:</p>
												<p className='text-xl font-bold text-foreground'>
													{formData.realMonthlyPension?.toLocaleString('pl-PL')} zł
												</p>
												<p className='text-xs text-muted-foreground mt-1'>
													(stopa zastąpienia: {formData.replacementRate}%)
												</p>
											</div>
										</div>
									</Card>

									{/* Porównanie ze średnią - kompaktowe */}
									<Card className='p-3 bg-muted/20 border-0'>
										<div className='flex items-center justify-between mb-1.5'>
											<span className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
												<BarChart3 className='w-4 h-4 text-[var(--zus-green-primary)]' />
												vs Średnia krajowa
											</span>
											<span
												className={`font-bold ${
													(formData.monthlyPension || 0) > (formData.futureAveragePension || 0)
														? 'text-green-600'
														: 'text-orange-600'
												}`}
											>
												{(formData.monthlyPension || 0) > (formData.futureAveragePension || 0) ? '+' : ''}
												{(((formData.monthlyPension || 0) / (formData.futureAveragePension || 1) - 1) * 100).toFixed(1)}
												%
											</span>
										</div>
										<p className='text-xs text-muted-foreground'>
											Średnia: <strong>{formData.futureAveragePension?.toLocaleString('pl-PL')} zł</strong>
										</p>
									</Card>

									{/* Wpływ zwolnień chorobowych - kompaktowy */}
									{formData.includeSickLeave && (
										<Card className='p-3 bg-orange-50/50 border-0'>
											<div className='flex items-center justify-between mb-1'>
												<span className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
													<HeartPulse className='w-3.5 h-3.5 text-orange-500' />
													Wpływ zwolnień
												</span>
												<span className='font-bold text-orange-600'>
													-
													{(
														(formData.monthlyPensionWithoutSickLeave || 0) - (formData.monthlyPension || 0)
													).toLocaleString('pl-PL')}{' '}
													zł
												</span>
											</div>
											<p className='text-xs text-orange-700/80'>
												Średnio {formData.sickLeaveDaysPerYear} dni/rok (-
												{formData.sickLeaveImpactPercentage}%)
											</p>
										</Card>
									)}

									{/* Scenariusze odroczenia - collapsible */}
									<Card className='p-2.5 bg-muted/20 border-0'>
										<button
											onClick={() => setShowDelayScenarios(!showDelayScenarios)}
											aria-expanded={showDelayScenarios}
											aria-controls='delay-scenarios-content'
											className='w-full flex items-center justify-between text-left p-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer'
										>
											<span className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
												<Lightbulb className='w-4 h-4 text-yellow-500' />
												Co jeśli będę pracować dłużej?
											</span>
											{showDelayScenarios ? (
												<ChevronUp className='w-3.5 h-3.5' />
											) : (
												<ChevronDown className='w-3.5 h-3.5' />
											)}
										</button>
										{showDelayScenarios && (
											<div id='delay-scenarios-content' className='mt-2 space-y-1.5'>
												{[1, 2, 5].map((years) => {
													const delayedPension = calculateDelayScenario(years)
													const increase = delayedPension - (formData.monthlyPension || 0)
													const increasePercent = ((increase / (formData.monthlyPension || 1)) * 100).toFixed(1)
													return (
														<div key={years} className='flex justify-between items-center p-2 bg-green-50/50 rounded'>
															<span className='text-xs font-medium text-foreground'>
																+{years} {years === 1 ? 'rok' : years < 5 ? 'lata' : 'lat'}
															</span>
															<div className='text-right'>
																<div className='text-sm font-bold text-green-600'>
																	{delayedPension.toLocaleString('pl-PL')} zł
																</div>
																<div className='text-xs text-green-600'>+{increasePercent}%</div>
															</div>
														</div>
													)
												})}
											</div>
										)}
									</Card>

									{/* Szczegóły prognozy - collapsible */}
									<Card className='p-2.5 bg-muted/20 border-0'>
										<button
											onClick={() => setShowDetails(!showDetails)}
											aria-expanded={showDetails}
											aria-controls='forecast-details-content'
											className='w-full flex items-center justify-between text-left p-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer'
										>
											<span className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
												<TrendingUp className='w-3.5 h-3.5 text-primary' />
												Szczegóły prognozy
											</span>
											{showDetails ? <ChevronUp className='w-3.5 h-3.5' /> : <ChevronDown className='w-3.5 h-3.5' />}
										</button>
										{showDetails && (
											<div id='forecast-details-content' className='mt-2 space-y-1.5 text-xs'>
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>Lata do emerytury:</span>
													<span className='font-semibold text-foreground'>{yearsToRetirement} lat</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>Całkowity kapitał:</span>
													<span className='font-semibold text-foreground'>
														{formData.totalCapital?.toLocaleString('pl-PL')} zł
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>Czas pobierania:</span>
													<span className='font-semibold text-foreground'>
														{formData.lifeExpectancyMonths ? Math.round(formData.lifeExpectancyMonths / 12) : 0} lat
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>Wzrost wynagrodzeń:</span>
													<span className='font-semibold text-foreground'>3% rocznie</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>Inflacja:</span>
													<span className='font-semibold text-foreground'>2.5% rocznie</span>
												</div>
											</div>
										)}
									</Card>

									{/* Rekomendacje - kompaktowe */}
									{formData.replacementRate && formData.replacementRate < 60 && (
										<Card className='p-2.5 bg-yellow/10 border-0'>
											<p className='text-xs text-foreground flex items-start gap-2'>
												<AlertCircle className='w-3.5 h-3.5 text-yellow flex-shrink-0 mt-0.5' />
												<span>
													{formData.replacementRate < 40
														? 'Niska stopa zastąpienia - rozważ dodatkowe oszczędzanie'
														: 'Warto pomyśleć o dodatkowym zabezpieczeniu emerytalnym'}
												</span>
											</p>
										</Card>
									)}

									{/* Główny CTA - Dashboard - zielony ZUS */}
									<Button
										onClick={async () => {
											if (!formData.gender) return // Zabezpieczenie - nie powinno się zdarzyć

											// Zapisz dane do localStorage przed przejściem
											const calculatorData = {
												age: formData.age,
												gender: formData.gender,
												grossSalary: formData.grossSalary,
												plannedRetirementYear: formData.plannedRetirementYear,
												startedWorkBefore1999: formData.startedWorkBefore1999,
												initialCapital: formData.initialCapital,
												zusAccountBalance: formData.zusAccountBalance,
												zusSubaccountBalance: formData.zusSubaccountBalance,
												includeSickLeave: formData.includeSickLeave,
											}
											localStorage.setItem('pensionCalculatorData', JSON.stringify(calculatorData))

											// Zapisz pierwszy rekord do bazy i zapamiętaj ID sesji
											try {
												const recordId = await db.pensionData.add({
													age: formData.age,
													gender: formData.gender,
													grossSalary: formData.grossSalary,
													plannedRetirementYear: formData.plannedRetirementYear,
													startedWorkBefore1999: formData.startedWorkBefore1999, // ZMIANA
													initialCapital: formData.initialCapital || 0, // ZMIANA
													zusAccountBalance: formData.zusAccountBalance || 0,
													zusSubaccountBalance: formData.zusSubaccountBalance || 0,
													includeSickLeave: formData.includeSickLeave,
													postalCode: '',
													monthlyPension: formData.monthlyPension,
													realMonthlyPension: formData.realMonthlyPension,
													replacementRate: formData.replacementRate,
													totalCapital: formData.totalCapital,
													lifeExpectancyMonths: formData.lifeExpectancyMonths,
													sickLeaveDaysPerYear: formData.sickLeaveDaysPerYear,
													sickLeaveImpactPercentage: formData.sickLeaveImpactPercentage,
													createdAt: new Date(),
												})
												localStorage.setItem('currentPensionRecordId', recordId.toString())
												console.log('W8 utworzenie postaci')
												console.log('W9 dane zapisane w bazie')
											} catch (error) {
												console.log('W10 blad zapisu do bazy')
											}

											window.location.href = '/dashboard'
										}}
										size='lg'
										className='w-full bg-[var(--zus-green-primary)] hover:bg-blue-dark text-white font-bold py-8 text-base rounded transition-all duration-150 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 focus-visible:ring-4 focus-visible:ring-primary/30'
									>
										Zobacz szczegółową analizę rok po roku
										<TrendingUp className='ml-2 w-5 h-5' />
									</Button>
								</>
							) : (
								<Card className='p-10 text-center border border-dashed border-gray-200'>
									<div className='text-5xl mb-3'>👤</div>
									<h3 className='text-base font-semibold text-foreground mb-2'>Wybierz płeć</h3>
									<p className='text-sm text-muted-foreground'>Zacznij od wyboru płci z lewej strony</p>
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* AI Chat Assistant */}
			<ChatWidget formContext={formData} onFormUpdate={handleFormUpdate} />
		</div>
	)
}
