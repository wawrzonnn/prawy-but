'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, AlertCircle, ChevronDown, ChevronUp, Users, Calendar, Wallet } from 'lucide-react'

export default function Form() {
	const [formData, setFormData] = useState<{
		age: number
		gender: 'male' | 'female' | ''
		grossSalary: number
		workStartYear: number
		plannedRetirementYear: number
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
		workStartYear: 2015,
		plannedRetirementYear: 2060, // 30 lat w 2025 → urodzony 1995 → emerytura w wieku 65 lat = 2060
		zusAccountBalance: 0,
		zusSubaccountBalance: 0,
		includeSickLeave: false,
	})

	const [showAdvanced, setShowAdvanced] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Auto-obliczanie emerytury przy każdej zmianie
	useEffect(() => {
		if (formData.gender && formData.age && formData.grossSalary) {
			calculatePension()
		}
	}, [
		formData.age,
		formData.gender,
		formData.grossSalary,
		formData.workStartYear,
		formData.plannedRetirementYear,
		formData.includeSickLeave,
		formData.zusAccountBalance,
		formData.zusSubaccountBalance,
	])

	// Automatyczne ustawianie lat pracy na podstawie wieku i płci
	useEffect(() => {
		if (formData.age && formData.gender) {
			const currentYear = new Date().getFullYear()
			const retirementAge = formData.gender === 'female' ? 60 : 65
			const birthYear = currentYear - formData.age
			const plannedRetirement = birthYear + retirementAge
			setFormData(prev => ({ ...prev, plannedRetirementYear: plannedRetirement }))
		}
	}, [formData.age, formData.gender])

	const calculatePension = () => {
		if (!formData.gender || !formData.age || !formData.grossSalary) {
			return
		}

		const currentYear = new Date().getFullYear()
		const retirementAge = formData.gender === 'female' ? 60 : 65
		const yearsToRetirement = formData.plannedRetirementYear - currentYear
		const workingYears = formData.plannedRetirementYear - formData.workStartYear

		const averageWageGrowth = 0.03
		const inflationRate = 0.025 // średnia inflacja 2.5%
		const currentMonthlyContribution = formData.grossSalary * 0.1952

		// Prognozowane wynagrodzenie w momencie przejścia na emeryturę
		const futureGrossSalary = formData.grossSalary * Math.pow(1 + averageWageGrowth, yearsToRetirement)

		let totalFutureContributions = 0
		for (let year = 0; year < yearsToRetirement; year++) {
			const yearlyGrowthMultiplier = Math.pow(1 + averageWageGrowth, year)
			const adjustedMonthlyContribution = currentMonthlyContribution * yearlyGrowthMultiplier
			totalFutureContributions += adjustedMonthlyContribution * 12
		}

		let estimatedCurrentCapital = 0
		if (formData.zusAccountBalance || formData.zusSubaccountBalance) {
			estimatedCurrentCapital = (formData.zusAccountBalance || 0) + (formData.zusSubaccountBalance || 0)
		} else {
			const yearsWorked = currentYear - formData.workStartYear
			const averageContributionPerYear = currentMonthlyContribution * 12
			estimatedCurrentCapital = averageContributionPerYear * yearsWorked * 0.7
		}

		let totalCapital = estimatedCurrentCapital + totalFutureContributions
		let totalCapitalWithoutSickLeave = totalCapital

		let sickLeaveDaysPerYear = 0
		let sickLeaveImpactPercentage = 0

		if (formData.includeSickLeave) {
			sickLeaveDaysPerYear = formData.gender === 'female' ? 12 : 9
			sickLeaveImpactPercentage = (sickLeaveDaysPerYear / 365) * 100
			const sickLeaveReduction = sickLeaveDaysPerYear / 365
			totalCapital = totalCapital * (1 - sickLeaveReduction)
		}

		let lifeExpectancyYears: number
		if (formData.gender === 'female') {
			lifeExpectancyYears = retirementAge <= 60 ? 24 : retirementAge <= 65 ? 22 : 20
		} else {
			lifeExpectancyYears = retirementAge <= 65 ? 20 : retirementAge <= 67 ? 18 : 16
		}

		const lifeExpectancyMonths = lifeExpectancyYears * 12
		const monthlyPension = totalCapital / lifeExpectancyMonths
		const monthlyPensionWithoutSickLeave = totalCapitalWithoutSickLeave / lifeExpectancyMonths

		// Wartość urealniona (dzisiejsza siła nabywcza)
		const realMonthlyPension = monthlyPension / Math.pow(1 + inflationRate, yearsToRetirement)

		const replacementRate = (monthlyPension / futureGrossSalary) * 100

		// Średnia emerytura prognozowana na rok przejścia (zakładamy wzrost 3% rocznie od obecnej średniej 3500 zł)
		const currentAveragePension = 3500
		const futureAveragePension = currentAveragePension * Math.pow(1 + averageWageGrowth, yearsToRetirement)

		setFormData(prev => ({
			...prev,
			monthlyPension: Math.round(monthlyPension),
			realMonthlyPension: Math.round(realMonthlyPension),
			monthlyPensionWithoutSickLeave: Math.round(monthlyPensionWithoutSickLeave),
			futureAveragePension: Math.round(futureAveragePension),
			futureGrossSalary: Math.round(futureGrossSalary),
			replacementRate: Math.round(replacementRate * 100) / 100,
			totalCapital: Math.round(totalCapital),
			lifeExpectancyMonths,
			sickLeaveDaysPerYear,
			sickLeaveImpactPercentage: Math.round(sickLeaveImpactPercentage * 100) / 100,
		}))
	}

	// Funkcja do obliczania scenariuszy odroczenia
	const calculateDelayScenario = (delayYears: number) => {
		if (!formData.gender || !formData.monthlyPension) return 0

		const currentYear = new Date().getFullYear()
		const retirementAge = formData.gender === 'female' ? 60 : 65
		const birthYear = currentYear - formData.age
		const baseRetirementYear = birthYear + retirementAge
		const delayedRetirementYear = baseRetirementYear + delayYears

		const yearsToDelayedRetirement = delayedRetirementYear - currentYear

		const averageWageGrowth = 0.03
		const currentMonthlyContribution = formData.grossSalary * 0.1952

		// Dodatkowe składki z lat odroczenia
		let additionalContributions = 0
		for (let year = 0; year < delayYears; year++) {
			const yearFromNow = formData.plannedRetirementYear - currentYear + year
			const yearlyGrowthMultiplier = Math.pow(1 + averageWageGrowth, yearFromNow)
			const adjustedMonthlyContribution = currentMonthlyContribution * yearlyGrowthMultiplier
			additionalContributions += adjustedMonthlyContribution * 12
		}

		const newTotalCapital = (formData.totalCapital || 0) + additionalContributions

		let lifeExpectancyYears: number
		const actualRetirementAge = retirementAge + delayYears
		if (formData.gender === 'female') {
			lifeExpectancyYears = actualRetirementAge <= 60 ? 24 : actualRetirementAge <= 65 ? 22 : 20
		} else {
			lifeExpectancyYears = actualRetirementAge <= 65 ? 20 : actualRetirementAge <= 67 ? 18 : 16
		}

		const lifeExpectancyMonths = lifeExpectancyYears * 12
		return Math.round(newTotalCapital / lifeExpectancyMonths)
	}

	const handleSave = async () => {
		if (!formData.gender || !formData.age || !formData.grossSalary) return

		setIsSubmitting(true)
		try {
			await db.pensionData.add({
				age: formData.age,
				gender: formData.gender,
				grossSalary: formData.grossSalary,
				workStartYear: formData.workStartYear,
				plannedRetirementYear: formData.plannedRetirementYear,
				zusAccountBalance: formData.zusAccountBalance || 0,
				zusSubaccountBalance: formData.zusSubaccountBalance || 0,
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
		} catch (error) {
			console.log('W18 blad zapisu kalkulatora')
		} finally {
			setIsSubmitting(false)
		}
	}

	const currentYear = new Date().getFullYear()
	const yearsToRetirement = formData.plannedRetirementYear - currentYear

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200'>
				<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
					<Link href='/' className='flex items-center gap-3'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto' />
					</Link>
					<Link href='/'>
						<Button variant='ghost' size='sm'>
							← Powrót do strony głównej
						</Button>
					</Link>
				</div>
			</header>

			{/* Main Content */}
			<div className='pt-24 pb-20 px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>Interaktywny Kalkulator Emerytury</h1>
						<p className='text-xl text-muted-foreground'>Poznaj swoją przyszłą emeryturę w czasie rzeczywistym</p>
					</div>

					<div className='grid lg:grid-cols-2 gap-8'>
						{/* Formularz - lewa strona */}
						<div className='space-y-6'>
							{/* Wybór płci */}
							<Card className='p-6'>
								<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
									<Users className='w-5 h-5 text-primary' />
									Wybierz płeć
								</h3>
								<div className='grid grid-cols-2 gap-4'>
									<button
										onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
										className={`p-6 rounded-lg border-2 transition-all ${
											formData.gender === 'male'
												? 'border-primary bg-primary/10 shadow-lg'
												: 'border-gray-200 hover:border-primary/50'
										}`}>
										<div className='text-center'>
											<div className='text-4xl mb-2'>👨</div>
											<div className='font-bold text-foreground'>Mężczyzna</div>
											<div className='text-xs text-muted-foreground mt-1'>Wiek emerytalny: 65 lat</div>
										</div>
									</button>
									<button
										onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
										className={`p-6 rounded-lg border-2 transition-all ${
											formData.gender === 'female'
												? 'border-primary bg-primary/10 shadow-lg'
												: 'border-gray-200 hover:border-primary/50'
										}`}>
										<div className='text-center'>
											<div className='text-4xl mb-2'>👩</div>
											<div className='font-bold text-foreground'>Kobieta</div>
											<div className='text-xs text-muted-foreground mt-1'>Wiek emerytalny: 60 lat</div>
										</div>
									</button>
								</div>
							</Card>

							{/* Wiek - slider */}
							<Card className='p-6'>
								<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
									<Calendar className='w-5 h-5 text-primary' />
									Twój wiek
								</h3>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<span className='text-muted-foreground'>Wiek:</span>
										<span className='text-3xl font-bold text-primary'>{formData.age} lat</span>
									</div>
									<input
										type='range'
										min='18'
										max='67'
										value={formData.age}
										onChange={e => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
										className='w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
									/>
									<div className='flex justify-between text-xs text-muted-foreground'>
										<span>18 lat</span>
										<span>67 lat</span>
									</div>
								</div>
							</Card>

							{/* Wynagrodzenie - slider */}
							<Card className='p-6'>
								<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
									<Wallet className='w-5 h-5 text-primary' />
									Miesięczne wynagrodzenie brutto
								</h3>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<span className='text-muted-foreground'>Zarobki:</span>
										<span className='text-3xl font-bold text-primary'>
											{formData.grossSalary.toLocaleString('pl-PL')} zł
										</span>
									</div>
									<input
										type='range'
										min='3000'
										max='25000'
										step='100'
										value={formData.grossSalary}
										onChange={e => setFormData(prev => ({ ...prev, grossSalary: parseInt(e.target.value) }))}
										className='w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
									/>
									<div className='flex justify-between text-xs text-muted-foreground'>
										<span>3 000 zł</span>
										<span>25 000 zł</span>
									</div>
									<div className='bg-primary/10 p-3 rounded-lg'>
										<p className='text-sm text-foreground'>
											<strong>Składka emerytalna miesięcznie:</strong> {(formData.grossSalary * 0.1952).toFixed(2)} zł
										</p>
									</div>
								</div>
							</Card>

							{/* Rok rozpoczęcia pracy */}
							<Card className='p-6'>
								<h3 className='text-lg font-bold text-foreground mb-4'>Rok rozpoczęcia pracy</h3>
								<select
									value={formData.workStartYear}
									onChange={e => setFormData(prev => ({ ...prev, workStartYear: parseInt(e.target.value) }))}
									className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground'>
									{Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i)
										.reverse()
										.map(year => (
											<option key={year} value={year}>
												{year}
											</option>
										))}
								</select>
								<p className='text-sm text-muted-foreground mt-2'>
									Staż pracy do dziś: <strong>{currentYear - formData.workStartYear} lat</strong>
								</p>
							</Card>

							{/* Planowany rok przejścia na emeryturę - slider */}
							<Card className='p-6'>
								<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
									<Calendar className='w-5 h-5 text-primary' />
									Planowany rok przejścia na emeryturę
								</h3>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<span className='text-muted-foreground'>Przejście na emeryturę:</span>
										<span className='text-3xl font-bold text-primary'>{formData.plannedRetirementYear}</span>
									</div>
									<input
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
										onChange={e => setFormData(prev => ({ ...prev, plannedRetirementYear: parseInt(e.target.value) }))}
										className='w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
									/>
									<div className='flex justify-between text-xs text-muted-foreground'>
										<span>Wiek emerytalny ({formData.gender === 'female' ? '60' : '65'} lat)</span>
										<span>+10 lat</span>
									</div>
									{(() => {
										const retirementAge = formData.gender === 'female' ? 60 : 65
										const birthYear = currentYear - formData.age
										const minRetirementYear = birthYear + retirementAge
										const yearsDelayed = formData.plannedRetirementYear - minRetirementYear

										if (yearsDelayed > 0) {
											return (
												<div className='bg-green-50 border border-green-200 p-3 rounded-lg'>
													<p className='text-sm text-green-800'>
														<strong>
															💡 Odroczenie o {yearsDelayed}{' '}
															{yearsDelayed === 1 ? 'rok' : yearsDelayed < 5 ? 'lata' : 'lat'}:
														</strong>{' '}
														Każdy rok dłuższej pracy zwiększa emeryturę o ~5-7%. Twoja emerytura będzie wyższa o około{' '}
														{Math.round(yearsDelayed * 6)}%!
													</p>
												</div>
											)
										}
										return (
											<div className='bg-blue-50 border border-blue-200 p-3 rounded-lg'>
												<p className='text-sm text-blue-800'>
													Przejście na emeryturę w wieku emerytalnym ({retirementAge} lat)
												</p>
											</div>
										)
									})()}
									<p className='text-xs text-muted-foreground'>
										Całkowity staż pracy: <strong>{formData.plannedRetirementYear - formData.workStartYear} lat</strong>
									</p>
								</div>
							</Card>

							{/* Opcje zaawansowane */}
							<Card className='p-6'>
								<button
									onClick={() => setShowAdvanced(!showAdvanced)}
									className='w-full flex items-center justify-between text-left'>
									<h3 className='text-lg font-bold text-foreground'>Opcje zaawansowane</h3>
									{showAdvanced ? <ChevronUp className='w-5 h-5' /> : <ChevronDown className='w-5 h-5' />}
								</button>

								{showAdvanced && (
									<div className='mt-4 space-y-4'>
										<div>
											<label className='block text-sm font-medium text-foreground mb-2'>
												Środki na koncie ZUS (opcjonalnie)
											</label>
											<input
												type='number'
												value={formData.zusAccountBalance || ''}
												onChange={e =>
													setFormData(prev => ({ ...prev, zusAccountBalance: parseFloat(e.target.value) || 0 }))
												}
												className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
												placeholder='0'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-foreground mb-2'>
												Środki na subkoncie ZUS (opcjonalnie)
											</label>
											<input
												type='number'
												value={formData.zusSubaccountBalance || ''}
												onChange={e =>
													setFormData(prev => ({ ...prev, zusSubaccountBalance: parseFloat(e.target.value) || 0 }))
												}
												className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
												placeholder='0'
											/>
										</div>
										<label className='flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors'>
											<input
												type='checkbox'
												checked={formData.includeSickLeave}
												onChange={e => setFormData(prev => ({ ...prev, includeSickLeave: e.target.checked }))}
												className='w-5 h-5 text-primary focus:ring-primary border-2 rounded mt-1'
											/>
											<div className='flex-1'>
												<span className='text-foreground font-medium block'>Uwzględnij zwolnienia lekarskie</span>
												<p className='text-xs text-muted-foreground mt-1'>
													Średnio {formData.gender === 'female' ? '12' : '9'} dni rocznie dla{' '}
													{formData.gender === 'female' ? 'kobiet' : 'mężczyzn'}
												</p>
												{formData.includeSickLeave && (
													<div className='mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800'>
														📊 Zwolnienia lekarskie nie generują składek emerytalnych, co obniża świadczenie o ~
														{(((formData.gender === 'female' ? 12 : 9) / 365) * 100).toFixed(1)}%
													</div>
												)}
											</div>
										</label>
									</div>
								)}
							</Card>
						</div>

						{/* Wyniki - prawa strona */}
						<div className='space-y-6 lg:sticky lg:top-24 lg:self-start'>
							{formData.gender && formData.monthlyPension ? (
								<>
									{/* Główny wynik - dwie wartości */}
									<Card className='p-8 bg-[var(--zus-green-primary)] text-white'>
										<div className='text-center'>
											<h3 className='text-xl font-bold mb-4'>Twoja przyszła emerytura</h3>

											{/* Wartość rzeczywista */}
											<div className='mb-6'>
												<div className='text-sm opacity-80 mb-2'>Wartość rzeczywista (nominalna)</div>
												<div className='text-5xl font-bold mb-1'>
													{formData.monthlyPension.toLocaleString('pl-PL')} zł
												</div>
												<p className='text-white/80 text-sm'>w roku {formData.plannedRetirementYear}</p>
											</div>

											{/* Wartość urealniona */}
											<div className='bg-white/20 rounded-lg p-4 mb-4'>
												<div className='text-sm opacity-90 mb-2'>Wartość urealniona (dzisiejsza siła nabywcza)</div>
												<div className='text-4xl font-bold mb-1'>
													{formData.realMonthlyPension?.toLocaleString('pl-PL')} zł
												</div>
												<p className='text-white/80 text-xs'>równowartość w dzisiejszych złotówkach</p>
											</div>

											<div className='bg-white/10 rounded-lg p-3'>
												<div className='text-sm opacity-90 mb-1'>Stopa zastąpienia</div>
												<div className='text-2xl font-bold'>{formData.replacementRate}%</div>
												<div className='text-xs opacity-80 mt-1'>
													przyszłego wynagrodzenia ({formData.futureGrossSalary?.toLocaleString('pl-PL')} zł)
												</div>
											</div>
										</div>
									</Card>

									{/* Porównanie ze średnią */}
									<Card className='p-6 bg-primary/5'>
										<h3 className='text-lg font-bold text-foreground mb-4'>📊 Porównanie ze średnią krajową</h3>
										<div className='space-y-3'>
											<div className='flex justify-between items-center'>
												<span className='text-sm text-muted-foreground'>Twoja emerytura:</span>
												<span className='font-bold text-foreground text-lg'>
													{formData.monthlyPension.toLocaleString('pl-PL')} zł
												</span>
											</div>
											<div className='flex justify-between items-center'>
												<span className='text-sm text-muted-foreground'>
													Średnia w {formData.plannedRetirementYear}:
												</span>
												<span className='font-bold text-muted-foreground text-lg'>
													{formData.futureAveragePension?.toLocaleString('pl-PL')} zł
												</span>
											</div>
											<div className='h-px bg-border my-2'></div>
											<div className='flex justify-between items-center'>
												<span className='text-sm font-medium text-foreground'>Różnica:</span>
												<span
													className={`font-bold text-lg ${(formData.monthlyPension || 0) > (formData.futureAveragePension || 0) ? 'text-green-600' : 'text-orange-600'}`}>
													{(formData.monthlyPension || 0) > (formData.futureAveragePension || 0) ? '+' : ''}
													{(((formData.monthlyPension || 0) / (formData.futureAveragePension || 1) - 1) * 100).toFixed(
														1
													)}
													%
												</span>
											</div>
										</div>
									</Card>

									{/* Wpływ zwolnień chorobowych */}
									{formData.includeSickLeave && (
										<Card className='p-6 bg-orange-50 border-2 border-orange-200'>
											<h3 className='text-lg font-bold text-foreground mb-4'>🏥 Wpływ zwolnień lekarskich</h3>
											<div className='space-y-3'>
												<div className='flex justify-between'>
													<span className='text-sm text-muted-foreground'>Bez zwolnień:</span>
													<span className='font-bold text-foreground'>
														{formData.monthlyPensionWithoutSickLeave?.toLocaleString('pl-PL')} zł
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-sm text-muted-foreground'>Ze zwolnieniami:</span>
													<span className='font-bold text-orange-600'>
														{formData.monthlyPension.toLocaleString('pl-PL')} zł
													</span>
												</div>
												<div className='h-px bg-orange-200 my-2'></div>
												<div className='flex justify-between items-center'>
													<span className='text-sm font-medium text-foreground'>Strata miesięczna:</span>
													<span className='font-bold text-orange-600'>
														-
														{(
															(formData.monthlyPensionWithoutSickLeave || 0) - (formData.monthlyPension || 0)
														).toLocaleString('pl-PL')}{' '}
														zł
													</span>
												</div>
												<p className='text-xs text-orange-700 mt-2'>
													Średnio {formData.sickLeaveDaysPerYear} dni zwolnień rocznie obniża emeryturę o{' '}
													{formData.sickLeaveImpactPercentage}%
												</p>
											</div>
										</Card>
									)}

									{/* Scenariusze odroczenia */}
									<Card className='p-6 bg-green-50 border-2 border-green-200'>
										<h3 className='text-lg font-bold text-foreground mb-4'>💡 Scenariusze odroczenia emerytury</h3>
										<p className='text-sm text-muted-foreground mb-4'>
											Zobacz, jak zmieni się Twoja emerytura, jeśli będziesz pracować dłużej:
										</p>
										<div className='space-y-3'>
											{[1, 2, 5].map(years => {
												const delayedPension = calculateDelayScenario(years)
												const increase = delayedPension - (formData.monthlyPension || 0)
												const increasePercent = ((increase / (formData.monthlyPension || 1)) * 100).toFixed(1)
												return (
													<div key={years} className='bg-white rounded-lg p-3'>
														<div className='flex justify-between items-center'>
															<div>
																<span className='font-medium text-foreground'>
																	+{years} {years === 1 ? 'rok' : years < 5 ? 'lata' : 'lat'}
																</span>
																<span className='text-xs text-muted-foreground block'>
																	do wieku {(formData.gender === 'female' ? 60 : 65) + years} lat
																</span>
															</div>
															<div className='text-right'>
																<div className='font-bold text-green-600 text-lg'>
																	{delayedPension.toLocaleString('pl-PL')} zł
																</div>
																<div className='text-xs text-green-600'>
																	+{increase.toLocaleString('pl-PL')} zł (+{increasePercent}%)
																</div>
															</div>
														</div>
													</div>
												)
											})}
										</div>
									</Card>

									{/* Szczegóły prognozy */}
									<Card className='p-6'>
										<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
											<TrendingUp className='w-5 h-5 text-primary' />
											Szczegóły prognozy
										</h3>
										<div className='space-y-3 text-sm'>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>Lata do emerytury:</span>
												<span className='font-bold text-foreground'>{yearsToRetirement} lat</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>Całkowity kapitał:</span>
												<span className='font-bold text-foreground'>
													{formData.totalCapital?.toLocaleString('pl-PL')} zł
												</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>Czas pobierania:</span>
												<span className='font-bold text-foreground'>
													{formData.lifeExpectancyMonths ? Math.round(formData.lifeExpectancyMonths / 12) : 0} lat
												</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>Średni wzrost wynagrodzeń:</span>
												<span className='font-bold text-foreground'>3% rocznie</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>Zakładana inflacja:</span>
												<span className='font-bold text-foreground'>2.5% rocznie</span>
											</div>
										</div>
									</Card>

									{/* Rekomendacje */}
									<Card className='p-6 bg-yellow/10 border-2 border-yellow'>
										<h3 className='text-lg font-bold text-foreground mb-3 flex items-center gap-2'>
											<AlertCircle className='w-5 h-5 text-yellow' />
											Rekomendacje
										</h3>
										<div className='space-y-2 text-sm text-foreground'>
											{formData.replacementRate && formData.replacementRate < 40 && (
												<p>⚠️ Niska stopa zastąpienia - rozważ dodatkowe oszczędzanie (III filar)</p>
											)}
											{formData.replacementRate && formData.replacementRate >= 40 && formData.replacementRate < 60 && (
												<p>⚡ Przeciętna stopa - warto pomyśleć o dodatkowym zabezpieczeniu</p>
											)}
											{formData.replacementRate && formData.replacementRate >= 60 && (
												<p>✅ Dobra stopa zastąpienia - kontynuuj obecną strategię</p>
											)}
											{yearsToRetirement > 10 && <p>🕐 Masz jeszcze czas na optymalizację swojej emerytury</p>}
										</div>
									</Card>

									{/* Główny CTA - Dashboard */}
									<div className='space-y-3'>
										<Link href='/dashboard' className='block'>
											<Button
												size='lg'
												className='w-full bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold py-6 text-xl rounded-[0.25rem] transition-all duration-150'>
												Zobacz szczegółową analizę rok po roku
												<TrendingUp className='ml-2 w-6 h-6' />
											</Button>
										</Link>
										<p className='text-xs text-center text-muted-foreground'>
											Edytuj wynagrodzenia, dodaj zwolnienia i zobacz wzrost kapitału
										</p>
									</div>

									{/* Opcjonalne akcje */}
									<div className='space-y-2 pt-4 border-t'>
										<Button onClick={handleSave} disabled={isSubmitting} variant='outline' className='w-full'>
											{isSubmitting ? 'Zapisywanie...' : 'Zapisz i wróć później'}
											<Calculator className='ml-2 w-4 h-4' />
										</Button>

										<Link href='/db'>
											<Button variant='ghost' className='w-full text-sm'>
												Zobacz zapisane kalkulacje
											</Button>
										</Link>
									</div>
								</>
							) : (
								<Card className='p-8 text-center'>
									<div className='text-6xl mb-4'>🧮</div>
									<h3 className='text-xl font-bold text-foreground mb-2'>Rozpocznij kalkulację</h3>
									<p className='text-muted-foreground'>
										{!formData.gender
											? 'Wybierz płeć, aby zobaczyć prognozę emerytury'
											: 'Dostosuj parametry, aby zobaczyć swoją przyszłą emeryturę'}
									</p>
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
