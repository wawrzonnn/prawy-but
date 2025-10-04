'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

			// Wynagrodzenie z uwzględnieniem wzrostu lub custom wartość
			let grossSalary: number
			if (customSalaries[year]) {
				grossSalary = customSalaries[year]
			} else {
				const yearsSinceNow = year - currentYear
				const salaryMultiplier = Math.pow(1 + parameters.wageGrowthRate / 100, yearsSinceNow)
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

			years.push({
				year,
				age,
				grossSalary,
				contribution: Math.round(contribution),
				sickLeaveDays,
				accountBalance: Math.round(accountBalance),
				subaccountBalance: Math.round(subaccountBalance),
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

	const handlePrintReport = () => {
		window.print()
	}

	const totalCapital =
		yearData.length > 0
			? yearData[yearData.length - 1].accountBalance + yearData[yearData.length - 1].subaccountBalance
			: 0
	const currentYear = new Date().getFullYear()
	const yearsToRetirement = parameters.retirementYear - currentYear

	// Oblicz emeryturę
	const retirementAge = parameters.gender === 'female' ? 60 : 65
	let lifeExpectancyYears = parameters.gender === 'female' ? 24 : 20
	const lifeExpectancyMonths = lifeExpectancyYears * 12
	const monthlyPension = Math.round(totalCapital / lifeExpectancyMonths)

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
			<div className='min-h-screen bg-background'>
				{/* Header */}
				<header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 no-print'>
					<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<Link href='/' className='flex items-center gap-3'>
								<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto' />
							</Link>
							<div className='text-sm text-muted-foreground hidden md:block'>
								<Link href='/' className='hover:text-foreground'>
									Strona główna
								</Link>
								<span className='mx-2'>/</span>
								<Link href='/form' className='hover:text-foreground'>
									Kalkulator
								</Link>
								<span className='mx-2'>/</span>
								<span className='text-foreground font-medium'>Dashboard</span>
							</div>
						</div>
						<Link href='/form'>
							<Button variant='ghost' size='sm'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Powrót
							</Button>
						</Link>
					</div>
				</header>

				{/* Main Content */}
				<div className='pt-24 pb-20 px-4'>
					<div className='container mx-auto max-w-7xl'>
						<div className='text-center mb-8'>
							<h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>Dashboard Symulacji Emerytalnej</h1>
							<p className='text-xl text-muted-foreground'>Szczegółowa analiza rok po roku</p>

							{/* Przyciski akcji */}
							<div className='flex items-center justify-center gap-4 mt-6 no-print'>
								<Button
									onClick={handlePrintReport}
									size='lg'
									className='bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold'>
									<Download className='w-5 h-5 mr-2' />
									Pobierz raport PDF
								</Button>
								<Button onClick={() => localStorage.removeItem('pensionCalculatorData')} variant='outline' size='lg'>
									<FileText className='w-4 h-4 mr-2' />
									Nowa symulacja
								</Button>
							</div>
						</div>

						{/* Wykres wzrostu kapitału */}
						<Card className='p-8 mb-8'>
							<h2 className='text-2xl font-bold text-foreground mb-6 flex items-center gap-2'>
								<TrendingUp className='w-6 h-6 text-primary' />
								Wzrost kapitału emerytalnego
							</h2>

							{/* SVG Chart */}
							<div className='w-full h-96 relative'>
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
							<div className='flex items-center justify-center gap-6 mt-6'>
								<div className='flex items-center gap-2'>
									<div className='w-4 h-4 bg-primary rounded'></div>
									<span className='text-sm text-muted-foreground'>Całkowity kapitał</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-4 h-1 bg-primary/50 border-2 border-dashed border-primary/50'></div>
									<span className='text-sm text-muted-foreground'>Konto główne (81%)</span>
								</div>
							</div>
						</Card>

						<div className='grid lg:grid-cols-3 gap-8'>
							{/* Tabela lat - 2 kolumny */}
							<div className='lg:col-span-2 space-y-6'>
								{/* Podsumowanie */}
								<Card className='p-6 bg-[var(--zus-green-primary)] text-white'>
									<h3 className='text-xl font-bold mb-4'>Podsumowanie prognozy</h3>
									<div className='grid grid-cols-3 gap-4'>
										<div>
											<div className='text-sm opacity-80'>Całkowity kapitał</div>
											<div className='text-2xl font-bold'>{totalCapital.toLocaleString('pl-PL')} zł</div>
										</div>
										<div>
											<div className='text-sm opacity-80'>Miesięczna emerytura</div>
											<div className='text-2xl font-bold'>{monthlyPension.toLocaleString('pl-PL')} zł</div>
										</div>
										<div>
											<div className='text-sm opacity-80'>Lata do emerytury</div>
											<div className='text-2xl font-bold'>{yearsToRetirement} lat</div>
										</div>
									</div>
								</Card>

								{/* Tabela rok po roku */}
								<Card className='p-6'>
									<h3 className='text-xl font-bold text-foreground mb-4'>Szczegóły rok po roku</h3>
									<div className='overflow-x-auto'>
										<table className='w-full text-sm'>
											<thead>
												<tr className='border-b'>
													<th className='text-left py-2 px-2 font-medium text-muted-foreground'>Rok</th>
													<th className='text-right py-2 px-2 font-medium text-muted-foreground'>Wiek</th>
													<th className='text-right py-2 px-2 font-medium text-muted-foreground'>Wynagrodzenie</th>
													<th className='text-right py-2 px-2 font-medium text-muted-foreground'>Składka</th>
													<th className='text-right py-2 px-2 font-medium text-muted-foreground'>Dni choroby</th>
													<th className='text-right py-2 px-2 font-medium text-muted-foreground'>Kapitał</th>
												</tr>
											</thead>
											<tbody className='divide-y'>
												{yearData.map((data, index) => (
													<tr key={data.year} className='hover:bg-muted/50 transition-colors'>
														<td className='py-2 px-2 font-medium'>{data.year}</td>
														<td className='text-right py-2 px-2'>{data.age}</td>
														<td className='text-right py-2 px-2'>
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
																<div className='flex items-center gap-2 justify-end group'>
																	<span>{data.grossSalary.toLocaleString('pl-PL')} zł</span>
																	<button
																		onClick={() => setEditingYear(data.year)}
																		className='opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition-opacity no-print'>
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
														<td className='text-right py-2 px-2 text-green-600'>
															+{data.contribution.toLocaleString('pl-PL')} zł
														</td>
														<td className='text-right py-2 px-2'>
															{data.sickLeaveDays > 0 && <span className='text-orange-600'>{data.sickLeaveDays}</span>}
														</td>
														<td className='text-right py-2 px-2 font-medium'>
															{(data.accountBalance + data.subaccountBalance).toLocaleString('pl-PL')} zł
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</Card>
							</div>

							{/* Sidebar - parametry i zwolnienia */}
							<div className='space-y-6'>
								{/* Parametry globalne */}
								<Card className='p-6'>
									<h3 className='text-lg font-bold text-foreground mb-4 flex items-center gap-2'>
										<Settings className='w-5 h-5 text-primary' />
										Parametry symulacji
									</h3>
									<div className='space-y-4'>
										<div>
											<label className='block text-sm font-medium text-foreground mb-2'>
												Wzrost wynagrodzeń (rocznie)
											</label>
											<div className='flex items-center gap-3'>
												<input
													type='range'
													min='0'
													max='10'
													step='0.5'
													value={parameters.wageGrowthRate}
													onChange={e => setParameters({ ...parameters, wageGrowthRate: parseFloat(e.target.value) })}
													className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
												/>
												<span className='text-lg font-bold text-primary w-16 text-right'>
													{parameters.wageGrowthRate}%
												</span>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-foreground mb-2'>Inflacja (rocznie)</label>
											<div className='flex items-center gap-3'>
												<input
													type='range'
													min='0'
													max='10'
													step='0.5'
													value={parameters.inflationRate}
													onChange={e => setParameters({ ...parameters, inflationRate: parseFloat(e.target.value) })}
													className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
												/>
												<span className='text-lg font-bold text-primary w-16 text-right'>
													{parameters.inflationRate}%
												</span>
											</div>
										</div>
									</div>
								</Card>

								{/* Zwolnienia chorobowe */}
								<Card className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<h3 className='text-lg font-bold text-foreground flex items-center gap-2'>
											🏥 Zwolnienia lekarskie
										</h3>
										<Button
											size='sm'
											onClick={() => setShowAddSickLeave(true)}
											className='bg-primary text-primary-foreground'>
											<Plus className='w-4 h-4' />
										</Button>
									</div>

									{showAddSickLeave && (
										<div className='mb-4 p-3 border rounded-lg space-y-2'>
											<input
												type='number'
												placeholder='Rok'
												className='w-full px-3 py-2 border rounded text-sm'
												id='sickLeaveYear'
											/>
											<input
												type='number'
												placeholder='Liczba dni'
												className='w-full px-3 py-2 border rounded text-sm'
												id='sickLeaveDays'
											/>
											<div className='flex gap-2'>
												<Button
													size='sm'
													onClick={() => {
														const year = parseInt((document.getElementById('sickLeaveYear') as HTMLInputElement).value)
														const days = parseInt((document.getElementById('sickLeaveDays') as HTMLInputElement).value)
														if (year && days) {
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
													className='flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg'>
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
										<div className='mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg'>
											<p className='text-xs text-orange-700'>
												<strong>Wpływ na kapitał:</strong> Zwolnienia zmniejszają składki emerytalne, co obniża kapitał
												emerytalny
											</p>
										</div>
									)}
								</Card>

								{/* Info */}
								<Card className='p-6 bg-blue-50 border-blue-200'>
									<div className='flex items-start gap-3'>
										<AlertCircle className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
										<div className='text-sm text-blue-800'>
											<p className='font-medium mb-1'>Jak używać dashboardu?</p>
											<ul className='space-y-1 text-xs'>
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
