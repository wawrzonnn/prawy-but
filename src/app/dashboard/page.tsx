'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import {
	Calculator,
	TrendingUp,
	AlertCircle,
	Settings,
	Plus,
	Trash2,
	Edit2,
	Save,
	ArrowLeft,
	Download,
	FileText,
} from 'lucide-react'

interface YearData {
	year: number
	age: number
	grossSalary: number
	contribution: number
	sickLeaveDays: number
	accountBalance: number
	subaccountBalance: number
	realCapital: number
	isEditing?: boolean
}

interface SickLeave {
	id: string
	year: number
	days: number
}

export default function Dashboard() {
	const [parameters, setParameters] = useState({
		currentAge: 30,
		gender: 'male' as 'male' | 'female',
		currentSalary: 7500,
		workStartYear: 2015,
		retirementYear: 2060,
		wageGrowthRate: 3,
		inflationRate: 2.5,
	})

	const [sickLeaves, setSickLeaves] = useState<SickLeave[]>([])
	const [yearData, setYearData] = useState<YearData[]>([])
	const [editingYear, setEditingYear] = useState<number | null>(null)
	const [showAddSickLeave, setShowAddSickLeave] = useState(false)
	const [customSalaries, setCustomSalaries] = useState<Record<number, number>>({})
	const [postalCode, setPostalCode] = useState('')
	const [showAllYears, setShowAllYears] = useState(false)

	// Import danych z localStorage (z formularza)
	useEffect(() => {
		const savedData = localStorage.getItem('pensionCalculatorData')
		if (savedData) {
			try {
				const data = JSON.parse(savedData)
				setParameters({
					currentAge: data.age || 30,
					gender: data.gender || 'male',
					currentSalary: data.grossSalary || 7500,
					workStartYear: data.workStartYear || 2015,
					retirementYear: data.plannedRetirementYear || 2060,
					wageGrowthRate: 3,
					inflationRate: 2.5,
				})
			} catch (e) {
				console.error('Błąd wczytywania danych', e)
			}
		}
	}, [])

	// Oblicz dane dla każdego roku
	useEffect(() => {
		calculateYearByYear()
	}, [parameters, sickLeaves, customSalaries])

	const calculateYearByYear = () => {
		const currentYear = new Date().getFullYear()
		const years: YearData[] = []
		let accountBalance = 0
		let subaccountBalance = 0

		for (let year = parameters.workStartYear; year <= parameters.retirementYear; year++) {
			const yearsSinceStart = year - parameters.workStartYear
			const age = parameters.currentAge + (year - currentYear)

			// Wynagrodzenie z uwzględnieniem wzrostu realnego + inflacji lub custom wartość
			let grossSalary: number
			if (customSalaries[year]) {
				grossSalary = customSalaries[year]
			} else {
				const yearsSinceNow = year - currentYear
				// Nominalne wynagrodzenie = wzrost realny + inflacja
				const nominalGrowthRate = (parameters.wageGrowthRate + parameters.inflationRate) / 100
				const salaryMultiplier = Math.pow(1 + nominalGrowthRate, yearsSinceNow)
				grossSalary = Math.round(parameters.currentSalary * salaryMultiplier)
			}

			// Składka emerytalna
			const contribution = grossSalary * 0.1952

			// Zwolnienia chorobowe dla tego roku
			const sickLeave = sickLeaves.find(sl => sl.year === year)
			const sickLeaveDays = sickLeave ? sickLeave.days : 0

			// Redukcja składki przez zwolnienia
			const sickLeaveReduction = sickLeaveDays / 365
			const effectiveContribution = contribution * 12 * (1 - sickLeaveReduction)

			// Akumulacja kapitału
			accountBalance += effectiveContribution * 0.81 // 81% na konto główne
			subaccountBalance += effectiveContribution * 0.19 // 19% na subkonto

			// Realna wartość kapitału (zdyskontowana o inflację)
			const yearsSinceNow = year - currentYear
			const inflationFactor = Math.pow(1 + parameters.inflationRate / 100, yearsSinceNow)
			const realCapital = (accountBalance + subaccountBalance) / inflationFactor

			years.push({
				year,
				age,
				grossSalary,
				contribution: Math.round(contribution),
				sickLeaveDays,
				accountBalance: Math.round(accountBalance),
				subaccountBalance: Math.round(subaccountBalance),
				realCapital: Math.round(realCapital),
			})
		}

		setYearData(years)
	}

	const addSickLeave = (year: number, days: number) => {
		setSickLeaves([
			...sickLeaves,
			{
				id: Date.now().toString(),
				year,
				days,
			},
		])
		setShowAddSickLeave(false)
	}

	const removeSickLeave = (id: string) => {
		setSickLeaves(sickLeaves.filter(sl => sl.id !== id))
	}

	const updateSalary = (year: number, newSalary: number) => {
		setCustomSalaries({ ...customSalaries, [year]: newSalary })
		setEditingYear(null)
	}

	const handlePrintReport = async () => {
		// Zapisz dane do bazy przed drukowaniem raportu
		try {
			const finalYearData = yearData[yearData.length - 1]
			await db.pensionData.add({
				age: parameters.currentAge,
				gender: parameters.gender,
				grossSalary: parameters.currentSalary,
				workStartYear: parameters.workStartYear,
				plannedRetirementYear: parameters.retirementYear,
				zusAccountBalance: finalYearData?.accountBalance || 0,
				zusSubaccountBalance: finalYearData?.subaccountBalance || 0,
				includeSickLeave: sickLeaves.length > 0,
				postalCode: postalCode || '',
				monthlyPension: finalYearData
					? Math.round(
							(finalYearData.accountBalance + finalYearData.subaccountBalance) /
								(parameters.gender === 'female' ? 264 : 228)
						)
					: 0,
				realMonthlyPension: 0, // Obliczenie w dashboard jest już szczegółowe
				replacementRate: 0,
				totalCapital: finalYearData ? finalYearData.accountBalance + finalYearData.subaccountBalance : 0,
				lifeExpectancyMonths: parameters.gender === 'female' ? 264 : 228,
				sickLeaveDaysPerYear:
					sickLeaves.length > 0 ? Math.round(sickLeaves.reduce((sum, sl) => sum + sl.days, 0) / sickLeaves.length) : 0,
				sickLeaveImpactPercentage: 0,
				createdAt: new Date(),
			})
			console.log('W17 kalkulator emerytalny zapisany')
		} catch (error) {
			console.log('W18 blad zapisu kalkulatora')
		}

		// Drukuj raport
		window.print()
	}

	const totalCapital =
		yearData.length > 0
			? yearData[yearData.length - 1].accountBalance + yearData[yearData.length - 1].subaccountBalance
			: 0
	const realTotalCapital = yearData.length > 0 ? yearData[yearData.length - 1].realCapital : 0
	const currentYear = new Date().getFullYear()
	const yearsToRetirement = parameters.retirementYear - currentYear

	// Oblicz emeryturę
	const retirementAge = parameters.gender === 'female' ? 60 : 65
	let lifeExpectancyYears = parameters.gender === 'female' ? 24 : 20
	const lifeExpectancyMonths = lifeExpectancyYears * 12
	const monthlyPension = Math.round(totalCapital / lifeExpectancyMonths)
	const realMonthlyPension = Math.round(realTotalCapital / lifeExpectancyMonths)

	// Przygotuj dane do wyświetlenia w tabeli
	const displayYears = showAllYears
		? yearData
		: yearData.length > 10
			? [...yearData.slice(0, 5), ...yearData.slice(-5)]
			: yearData

	return (
		<>
			<style jsx global>{`
				@media print {
					.no-print {
						display: none !important;
					}
					header {
						position: relative !important;
					}
					body {
						print-color-adjust: exact;
						-webkit-print-color-adjust: exact;
					}
					.print-break {
						page-break-after: always;
					}
				}
			`}</style>
			<div className='min-h-screen bg-background overflow-x-hidden'>
				{/* Header */}
				<header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 no-print'>
					<div className='container mx-auto px-4 py-3 md:py-4 flex items-center justify-between'>
						<div className='flex items-center gap-2 md:gap-4 min-w-0'>
							<Link href='/' className='flex items-center gap-2 md:gap-3 flex-shrink-0'>
								<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-6 md:h-8 w-auto' />
							</Link>
							<div className='text-xs md:text-sm text-muted-foreground hidden md:block truncate'>
								<Link href='/' className='hover:text-foreground'>
									Strona główna
								</Link>
								<span className='mx-1 md:mx-2'>/</span>
								<Link href='/form' className='hover:text-foreground'>
									Kalkulator
								</Link>
								<span className='mx-1 md:mx-2'>/</span>
								<span className='text-foreground font-medium'>Dashboard</span>
							</div>
						</div>
						<Link href='/form' className='flex-shrink-0'>
							<Button variant='ghost' size='sm' className='text-xs md:text-sm px-2 md:px-4'>
								<ArrowLeft className='w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2' />
								Powrót
							</Button>
						</Link>
					</div>
				</header>

				{/* Main Content */}
				<div className='pt-20 md:pt-24 pb-16 md:pb-20 px-4'>
					<div className='container mx-auto max-w-7xl'>
						<div className='text-center mb-6'>
							<h1 className='text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3'>
								Dashboard Symulacji Emerytalnej
							</h1>
							<p className='text-sm md:text-base lg:text-lg text-muted-foreground'>Szczegółowa analiza rok po roku</p>

							{/* Przyciski akcji */}
							<div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 mt-4 md:mt-6 no-print'>
								<Button
									onClick={handlePrintReport}
									size='lg'
									className='bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold text-sm md:text-base px-4 md:px-6 py-3 md:py-4 h-auto'>
									<Download className='w-4 md:w-5 h-4 md:h-5 mr-2' />
									Pobierz raport PDF
								</Button>
								<Button
									onClick={() => {
										localStorage.removeItem('pensionCalculatorData')
										window.location.href = '/form'
									}}
									variant='outline'
									size='lg'
									className='text-sm md:text-base px-4 md:px-6 py-3 md:py-4 h-auto'>
									<FileText className='w-4 h-4 mr-2' />
									Nowa symulacja
								</Button>
							</div>
						</div>

						{/* Wykres wzrostu kapitału */}
						<Card className='p-4 md:p-6 mb-4 md:mb-6 border-0 bg-muted/20'>
							<h2 className='text-base md:text-xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2'>
								<TrendingUp className='w-4 md:w-5 h-4 md:h-5 text-primary' />
								Wzrost kapitału emerytalnego
							</h2>

							{/* SVG Chart */}
							<div className='w-full h-64 md:h-96 relative overflow-hidden'>
								<svg viewBox='0 0 1000 400' className='w-full h-full'>
									{/* Siatka */}
									<defs>
										<pattern id='grid' width='100' height='80' patternUnits='userSpaceOnUse'>
											<path d='M 100 0 L 0 0 0 80' fill='none' stroke='#e5e7eb' strokeWidth='1' />
										</pattern>
									</defs>
									<rect width='1000' height='400' fill='url(#grid)' />

									{/* Osie */}
									<line x1='50' y1='350' x2='950' y2='350' stroke='#9ca3af' strokeWidth='2' />
									<line x1='50' y1='50' x2='50' y2='350' stroke='#9ca3af' strokeWidth='2' />

									{/* Linie wykresu */}
									{yearData.length > 0 &&
										(() => {
											const maxCapital = Math.max(...yearData.map(d => d.accountBalance + d.subaccountBalance))
											const xScale = 900 / (yearData.length - 1)
											const yScale = 300 / maxCapital

											// Całkowity kapitał (zielona linia)
											const totalPoints = yearData
												.map((d, i) => {
													const x = 50 + i * xScale
													const y = 350 - (d.accountBalance + d.subaccountBalance) * yScale
													return `${x},${y}`
												})
												.join(' ')

											// Konto główne (ciemniejsza zielona)
											const accountPoints = yearData
												.map((d, i) => {
													const x = 50 + i * xScale
													const y = 350 - d.accountBalance * yScale
													return `${x},${y}`
												})
												.join(' ')

											return (
												<>
													{/* Wypełnienie pod wykresem */}
													<polygon
														points={`50,350 ${totalPoints} ${50 + (yearData.length - 1) * xScale},350`}
														fill='oklch(0.48 0.12 155 / 0.1)'
													/>

													{/* Linia konta głównego */}
													<polyline
														points={accountPoints}
														fill='none'
														stroke='oklch(0.48 0.12 155 / 0.5)'
														strokeWidth='2'
														strokeDasharray='5,5'
													/>

													{/* Główna linia kapitału */}
													<polyline points={totalPoints} fill='none' stroke='oklch(0.48 0.12 155)' strokeWidth='3' />

													{/* Punkty na wykresie co 5 lat */}
													{yearData
														.filter((_, i) => i % 5 === 0 || i === yearData.length - 1)
														.map((d, i) => {
															const index = yearData.indexOf(d)
															const x = 50 + index * xScale
															const y = 350 - (d.accountBalance + d.subaccountBalance) * yScale
															return (
																<circle
																	key={i}
																	cx={x}
																	cy={y}
																	r='4'
																	fill='oklch(0.48 0.12 155)'
																	stroke='white'
																	strokeWidth='2'
																/>
															)
														})}
												</>
											)
										})()}

									{/* Etykiety osi X */}
									{yearData.length > 0 &&
										yearData
											.filter((_, i) => i % 5 === 0 || i === yearData.length - 1)
											.map((d, i) => {
												const index = yearData.indexOf(d)
												const xScale = 900 / (yearData.length - 1)
												const x = 50 + index * xScale
												return (
													<text key={i} x={x} y='370' textAnchor='middle' fontSize='12' fill='#6b7280'>
														{d.year}
													</text>
												)
											})}

									{/* Etykiety osi Y */}
									{[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => {
										const maxCapital = Math.max(...yearData.map(d => d.accountBalance + d.subaccountBalance), 1)
										const value = Math.round((maxCapital * fraction) / 1000) * 1000
										const y = 350 - fraction * 300
										return (
											<text key={i} x='40' y={y + 5} textAnchor='end' fontSize='12' fill='#6b7280'>
												{(value / 1000).toFixed(0)}k
											</text>
										)
									})}
								</svg>
							</div>

							{/* Legenda */}
							<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 md:mt-6'>
								<div className='flex items-center gap-2'>
									<div className='w-4 h-4 bg-primary rounded'></div>
									<span className='text-xs md:text-sm text-muted-foreground'>Całkowity kapitał</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-4 h-1 bg-primary/50 border-2 border-dashed border-primary/50'></div>
									<span className='text-xs md:text-sm text-muted-foreground'>Konto główne (81%)</span>
								</div>
							</div>
						</Card>

						<div className='grid lg:grid-cols-3 gap-4 md:gap-8'>
							{/* Tabela lat - 2 kolumny */}
							<div className='lg:col-span-2 space-y-4 md:space-y-6 min-w-0'>
								{/* Podsumowanie */}
								<Card className='p-4 md:p-5 border-0 bg-green-50/50'>
									<h3 className='text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground'>Podsumowanie prognozy</h3>
									<div className='grid grid-cols-2 gap-3 md:gap-4'>
										<div>
											<div className='text-xs text-muted-foreground mb-1'>Kapitał nominalny</div>
											<div className='text-base md:text-xl font-bold text-foreground break-words'>
												{totalCapital.toLocaleString('pl-PL')} zł
											</div>
										</div>
										<div>
											<div className='text-xs text-muted-foreground mb-1'>Kapitał realny</div>
											<div className='text-base md:text-xl font-bold text-foreground break-words'>
												{realTotalCapital.toLocaleString('pl-PL')} zł
											</div>
											<div className='text-xs text-muted-foreground mt-0.5'>w dzisiejszych zł</div>
										</div>
										<div>
											<div className='text-xs text-muted-foreground mb-1'>Emerytura nominalna</div>
											<div className='text-base md:text-xl font-bold text-foreground break-words'>
												{monthlyPension.toLocaleString('pl-PL')} zł
											</div>
										</div>
										<div>
											<div className='text-xs text-muted-foreground mb-1'>Emerytura realna</div>
											<div className='text-base md:text-xl font-bold text-[var(--zus-green-primary)] break-words'>
												{realMonthlyPension.toLocaleString('pl-PL')} zł
											</div>
											<div className='text-xs text-muted-foreground mt-0.5'>w dzisiejszych zł</div>
										</div>
									</div>
								</Card>

								{/* Tabela rok po roku */}
								<Card className='p-3 md:p-5 border-0 bg-white'>
									<h3 className='text-base md:text-lg font-bold text-foreground mb-3 md:mb-4'>Szczegóły rok po roku</h3>
									<div className='overflow-x-auto -mx-3 md:mx-0 px-3 md:px-0'>
										<table className='w-full text-xs md:text-sm'>
											<thead>
												<tr className='border-b'>
													<th className='text-left py-2 px-1 md:px-2 font-medium text-muted-foreground'>Rok</th>
													<th className='text-right py-2 px-1 md:px-2 font-medium text-muted-foreground hidden sm:table-cell'>
														Wiek
													</th>
													<th className='text-right py-2 px-1 md:px-2 font-medium text-muted-foreground'>Wynagr.</th>
													<th className='text-right py-2 px-1 md:px-2 font-medium text-muted-foreground hidden md:table-cell'>
														Składka
													</th>
													<th className='text-right py-2 px-1 md:px-2 font-medium text-muted-foreground hidden sm:table-cell'>
														Choroby
													</th>
													<th className='text-right py-2 px-1 md:px-2 font-medium text-muted-foreground'>Kapitał</th>
												</tr>
											</thead>
											<tbody className='divide-y'>
												{displayYears.map((data, index) => (
													<tr key={data.year} className='hover:bg-muted/50 transition-colors'>
														<td className='py-2 px-1 md:px-2 font-medium'>{data.year}</td>
														<td className='text-right py-2 px-1 md:px-2 hidden sm:table-cell'>{data.age}</td>
														<td className='text-right py-2 px-1 md:px-2'>
															{editingYear === data.year ? (
																<div className='flex items-center gap-2 justify-end'>
																	<input
																		type='number'
																		defaultValue={data.grossSalary}
																		className='w-32 px-2 py-1 border rounded text-sm text-right'
																		id={`salary-${data.year}`}
																		onKeyDown={e => {
																			if (e.key === 'Enter') {
																				const newValue = parseInt((e.target as HTMLInputElement).value)
																				updateSalary(data.year, newValue)
																			}
																			if (e.key === 'Escape') {
																				setEditingYear(null)
																			}
																		}}
																		autoFocus
																	/>
																	<button
																		onClick={() => {
																			const input = document.getElementById(`salary-${data.year}`) as HTMLInputElement
																			const newValue = parseInt(input.value)
																			updateSalary(data.year, newValue)
																		}}
																		className='text-green-600 hover:text-green-700'>
																		<Save className='w-4 h-4' />
																	</button>
																</div>
															) : (
																<div className='flex items-center gap-1 md:gap-2 justify-end group'>
																	<span className='truncate'>{data.grossSalary.toLocaleString('pl-PL')}</span>
																	<button
																		onClick={() => setEditingYear(data.year)}
																		className='opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition-opacity no-print hidden md:inline'>
																		<Edit2 className='w-3 h-3' />
																	</button>
																	{customSalaries[data.year] && (
																		<span className='text-xs text-blue-600 no-print' title='Edytowane'>
																			✏️
																		</span>
																	)}
																</div>
															)}
														</td>
														<td className='text-right py-2 px-1 md:px-2 text-green-600 hidden md:table-cell'>
															+{data.contribution.toLocaleString('pl-PL')}
														</td>
														<td className='text-right py-2 px-1 md:px-2 hidden sm:table-cell'>
															{data.sickLeaveDays > 0 && <span className='text-orange-600'>{data.sickLeaveDays}</span>}
														</td>
														<td className='text-right py-2 px-1 md:px-2 font-medium'>
															<span className='truncate'>{data.realCapital.toLocaleString('pl-PL')}</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Przycisk "Pokaż więcej" */}
									{yearData.length > 10 && !showAllYears && (
										<div className='mt-4 text-center'>
											<Button onClick={() => setShowAllYears(true)} variant='outline' size='sm' className='text-xs'>
												Pokaż wszystkie lata ({yearData.length} lat)
											</Button>
										</div>
									)}

									{showAllYears && yearData.length > 10 && (
										<div className='mt-4 text-center'>
											<Button onClick={() => setShowAllYears(false)} variant='outline' size='sm' className='text-xs'>
												Zwiń tabelę
											</Button>
										</div>
									)}
								</Card>
							</div>

							{/* Sidebar - parametry i zwolnienia */}
							<div className='space-y-4 md:space-y-6 min-w-0'>
								{/* Parametry globalne */}
								<Card className='p-4 md:p-5 border-0 bg-white'>
									<h3 className='text-sm md:text-base font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2'>
										<Settings className='w-4 h-4 text-primary' />
										Parametry symulacji
									</h3>
									<div className='space-y-3 md:space-y-4'>
										<div>
											<label className='block text-xs md:text-sm font-medium text-foreground mb-2'>
												Wzrost wynagrodzeń realny (rocznie)
											</label>
											<div className='flex items-center gap-2 md:gap-3'>
												<input
													type='range'
													min='0'
													max='10'
													step='0.5'
													value={parameters.wageGrowthRate}
													onChange={e => setParameters({ ...parameters, wageGrowthRate: parseFloat(e.target.value) })}
													className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
												/>
												<span className='text-sm md:text-lg font-bold text-primary w-12 md:w-16 text-right'>
													{parameters.wageGrowthRate}%
												</span>
											</div>
											<p className='text-xs text-muted-foreground mt-1'>Wzrost ponad inflację</p>
										</div>

										<div>
											<label className='block text-xs md:text-sm font-medium text-foreground mb-2'>
												Inflacja (rocznie)
											</label>
											<div className='flex items-center gap-2 md:gap-3'>
												<input
													type='range'
													min='0'
													max='10'
													step='0.5'
													value={parameters.inflationRate}
													onChange={e => setParameters({ ...parameters, inflationRate: parseFloat(e.target.value) })}
													className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
												/>
												<span className='text-sm md:text-lg font-bold text-primary w-12 md:w-16 text-right'>
													{parameters.inflationRate}%
												</span>
											</div>
											<p className='text-xs text-muted-foreground mt-1'>
												Nominalny wzrost: {(parameters.wageGrowthRate + parameters.inflationRate).toFixed(1)}%
											</p>
										</div>
									</div>
								</Card>

								{/* Zwolnienia chorobowe */}
								<Card className='p-4 md:p-5 border-0 bg-white'>
									<div className='flex items-center justify-between mb-3 md:mb-4'>
										<h3 className='text-sm md:text-base font-bold text-foreground flex items-center gap-2'>
											🏥 Zwolnienia lekarskie
										</h3>
										<Button
											size='sm'
											onClick={() => setShowAddSickLeave(true)}
											className='bg-primary text-primary-foreground text-xs md:text-sm px-2 md:px-3'>
											<Plus className='w-3 md:w-4 h-3 md:h-4' />
										</Button>
									</div>

									{showAddSickLeave && (
										<div className='mb-4 p-3 border-0 bg-muted/20 rounded space-y-2'>
											<input
												type='number'
												min='0'
												placeholder='Rok'
												className='w-full px-3 py-2 border border-gray-100 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
												id='sickLeaveYear'
											/>
											<input
												type='number'
												min='0'
												placeholder='Liczba dni'
												className='w-full px-3 py-2 border border-gray-100 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
												id='sickLeaveDays'
											/>
											<div className='flex gap-2'>
												<Button
													size='sm'
													onClick={() => {
														const year = parseInt((document.getElementById('sickLeaveYear') as HTMLInputElement).value)
														const days = parseInt((document.getElementById('sickLeaveDays') as HTMLInputElement).value)
														if (year && year > 0 && days && days >= 0) {
															addSickLeave(year, days)
														}
													}}
													className='flex-1 bg-green-600'>
													Dodaj
												</Button>
												<Button
													size='sm'
													variant='outline'
													onClick={() => setShowAddSickLeave(false)}
													className='flex-1'>
													Anuluj
												</Button>
											</div>
										</div>
									)}

									<div className='space-y-2'>
										{sickLeaves.length === 0 ? (
											<p className='text-sm text-muted-foreground text-center py-4'>Brak dodanych zwolnień</p>
										) : (
											sickLeaves.map(sl => (
												<div
													key={sl.id}
													className='flex items-center justify-between p-3 bg-orange-50/50 border-0 rounded'>
													<div>
														<div className='font-medium text-foreground'>{sl.year}</div>
														<div className='text-sm text-orange-600'>{sl.days} dni</div>
													</div>
													<Button
														size='sm'
														variant='ghost'
														onClick={() => removeSickLeave(sl.id)}
														className='text-red-600 hover:text-red-700 hover:bg-red-50'>
														<Trash2 className='w-4 h-4' />
													</Button>
												</div>
											))
										)}
									</div>

									{sickLeaves.length > 0 && (
										<div className='mt-4 p-3 bg-orange-50/50 border-0 rounded'>
											<p className='text-xs text-orange-700'>
												<strong>Wpływ na kapitał:</strong> Zwolnienia zmniejszają składki emerytalne, co obniża kapitał
												emerytalny
											</p>
										</div>
									)}
								</Card>

								{/* Kod pocztowy */}
								<Card className='p-4 md:p-5 border-0 bg-muted/20'>
									<h3 className='text-sm md:text-base font-bold text-foreground mb-2 md:mb-3 flex items-center gap-2'>
										📮 Kod pocztowy (opcjonalnie)
									</h3>
									<p className='text-xs text-muted-foreground mb-2 md:mb-3'>
										Podanie kodu pocztowego pomoże nam w tworzeniu lepszych narzędzi edukacyjnych dla Twojego regionu.
									</p>
									<input
										type='text'
										placeholder='00-000'
										value={postalCode}
										onChange={e => {
											let value = e.target.value.replace(/[^\d]/g, '') // Usuń wszystko oprócz cyfr

											// Automatycznie dodaj myślnik po drugiej cyfrze
											if (value.length > 2) {
												value = value.slice(0, 2) + '-' + value.slice(2, 5)
											}

											// Ogranicz do 6 znaków (00-000)
											if (value.length <= 6) {
												setPostalCode(value)
											}
										}}
										className='w-full px-4 py-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground'
										maxLength={6}
									/>
									<p className='text-xs text-muted-foreground mt-2'>Format: 00-000 (np. 00-950 dla Warszawy)</p>
								</Card>

								{/* Info */}
								<Card className='p-5 border-0 bg-blue-50/50'>
									<div className='flex items-start gap-3'>
										<AlertCircle className='w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5' />
										<div className='text-xs text-blue-800'>
											<p className='font-medium mb-1'>Jak używać dashboardu?</p>
											<ul className='space-y-0.5 text-xs'>
												<li>• Dostosuj parametry wzrostu i inflacji</li>
												<li>• Dodaj konkretne zwolnienia chorobowe</li>
												<li>• Obserwuj wzrost kapitału na wykresie</li>
												<li>• Sprawdź szczegóły dla każdego roku</li>
											</ul>
										</div>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>

				{/* Print-only header */}
				<div className='hidden print:block'>
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold mb-2'>Raport Prognozy Emerytalnej</h1>
						<p className='text-sm text-muted-foreground'>Wygenerowano: {new Date().toLocaleDateString('pl-PL')}</p>
					</div>
				</div>
			</div>
		</>
	)
}
