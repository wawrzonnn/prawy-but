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
		plannedRetirementYear: 2055,
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
		const currentMonthlyContribution = formData.grossSalary * 0.1952

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
		const replacementRate = (monthlyPension / formData.grossSalary) * 100

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
											<div>
												<span className='text-foreground font-medium block'>Uwzględnij zwolnienia lekarskie</span>
												<p className='text-xs text-muted-foreground mt-1'>
													Średnio {formData.gender === 'female' ? '12' : '9'} dni rocznie
												</p>
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
									{/* Główny wynik */}
									<Card className='p-8 bg-[var(--zus-green-primary)] text-white'>
										<div className='text-center'>
											<h3 className='text-xl font-bold mb-2'>Twoja przyszła emerytura</h3>
											<div className='text-6xl font-bold my-6'>
												{formData.monthlyPension.toLocaleString('pl-PL')} zł
											</div>
											<p className='text-white/90 mb-4'>miesięcznie</p>
											<div className='bg-white/20 rounded-lg p-4'>
												<div className='text-sm opacity-90 mb-1'>Stopa zastąpienia</div>
												<div className='text-3xl font-bold'>{formData.replacementRate}%</div>
												<div className='text-sm opacity-90 mt-1'>twojego obecnego wynagrodzenia</div>
											</div>
										</div>
									</Card>

									{/* Dodatkowe informacje */}
									<Card className='p-6'>
										<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
											<TrendingUp className='w-5 h-5 text-primary' />
											Szczegóły prognozy
										</h3>
										<div className='space-y-3'>
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
											{formData.includeSickLeave && (
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>Wpływ zwolnień:</span>
													<span className='font-bold text-orange-600'>-{formData.sickLeaveImpactPercentage}%</span>
												</div>
											)}
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

									{/* Przycisk zapisu */}
									<Button
										onClick={handleSave}
										disabled={isSubmitting}
										className='w-full bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold py-6 text-lg rounded-[0.25rem] transition-all duration-150'>
										{isSubmitting ? 'Zapisywanie...' : 'Zapisz kalkulację'}
										<Calculator className='ml-2 w-5 h-5' />
									</Button>

									<Link href='/db'>
										<Button variant='outline' className='w-full'>
											Zobacz zapisane kalkulacje
										</Button>
									</Link>
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
