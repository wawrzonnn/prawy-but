'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { calculatePensionFUS20, calculateYearByYear, type YearByYearData } from '@/lib/fus20-calculator'
import { DEFAULT_SCENARIO, FUS20_SCENARIOS, getScenarioById } from '@/config/fus20-scenarios'
import { INSURANCE_TITLE_CODES } from '@/config/zus-constants'
import type { IndividualInputData, MacroeconomicScenario } from '@/types/fus20-types'
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
	HeartPulse,
	MapPin,
} from 'lucide-react'
import { ChatWidget } from '@/components/ChatWidget'
import { Tooltip } from '@/components/ui/tooltip'

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
		zusAccountBalance: 0,
		zusSubaccountBalance: 0,
	})

	const [scenario, setScenario] = useState<MacroeconomicScenario>(DEFAULT_SCENARIO)
	const [sickLeaves, setSickLeaves] = useState<SickLeave[]>([])
	const [yearData, setYearData] = useState<YearByYearData[]>([])
	const [editingYear, setEditingYear] = useState<number | null>(null)
	const [showAddSickLeave, setShowAddSickLeave] = useState(false)
	const [customSalaries, setCustomSalaries] = useState<Record<number, number>>({})
	const [postalCode, setPostalCode] = useState('')
	const [showAllYears, setShowAllYears] = useState(false)
	const [hoveredPoint, setHoveredPoint] = useState<{
		year: number
		age: number
		capital: number
		realCapital: number
		monthlyPension: number
		realMonthlyPension: number
		x: number
		y: number
	} | null>(null)

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
					zusAccountBalance: data.zusAccountBalance || 0,
					zusSubaccountBalance: data.zusSubaccountBalance || 0,
				})
			} catch (e) {
				console.error('Błąd wczytywania danych', e)
			}
		}
	}, [])

	// Oblicz dane dla każdego roku używając kalkulatora FUS20
	useEffect(() => {
		recalculateYearByYear()
	}, [parameters, sickLeaves, customSalaries, scenario])

	// Auto-save z debounce - aktualizuj rekord w bazie przy zmianach
	useEffect(() => {
		const timer = setTimeout(() => {
			saveToDatabase()
		}, 2000) // czekaj 2 sekundy po ostatniej zmianie

		return () => clearTimeout(timer)
	}, [yearData, sickLeaves, postalCode, scenario])

	const recalculateYearByYear = () => {
		const currentYear = new Date().getFullYear()
		const birthYear = currentYear - parameters.currentAge

		// Przygotuj dane wejściowe dla kalkulatora FUS20
		const inputData: IndividualInputData = {
			gender: parameters.gender,
			currentAge: parameters.currentAge,
			initialCapital: 0, // Dashboard nie ma tej informacji, można dodać później
			insuranceTitle: INSURANCE_TITLE_CODES.EMPLOYEE,
			contributionBase: {
				currentMonthlyAmount: parameters.currentSalary,
				isJdgPreferential: false,
			},
			plannedRetirementAge: parameters.retirementYear - birthYear,
			accumulatedCapital:
				parameters.zusAccountBalance || parameters.zusSubaccountBalance
					? {
							zusAccount: parameters.zusAccountBalance,
							zusSubaccount: parameters.zusSubaccountBalance,
						}
					: undefined,
		}

		// Przekształć sickLeaves do formatu wymaganego przez kalkulator
		const sickLeavesMap: Record<number, number> = {}
		sickLeaves.forEach(sl => {
			sickLeavesMap[sl.year] = sl.days
		})

		// Użyj kalkulatora FUS20 do obliczenia danych rok po roku
		const yearByYearData = calculateYearByYear(inputData, scenario, customSalaries, sickLeavesMap)
		setYearData(yearByYearData)
	}

	const saveToDatabase = async () => {
		if (yearData.length === 0) return

		const recordId = localStorage.getItem('currentPensionRecordId')
		const finalYearData = yearData[yearData.length - 1]

		const dataToSave = {
			age: parameters.currentAge,
			gender: parameters.gender,
			grossSalary: parameters.currentSalary,
			startedWorkBefore1999: parameters.workStartYear < 1999,
			initialCapital: 0, // Dashboard nie ma tej informacji
			plannedRetirementYear: parameters.retirementYear,
			zusAccountBalance: parameters.zusAccountBalance,
			zusSubaccountBalance: parameters.zusSubaccountBalance,
			includeSickLeave: sickLeaves.length > 0,
			postalCode: postalCode || '',
			monthlyPension: finalYearData?.monthlyPension || 0,
			realMonthlyPension: finalYearData?.realMonthlyPension || 0,
			replacementRate:
				finalYearData?.monthlyPension && finalYearData?.grossSalary
					? Math.round((finalYearData.monthlyPension / finalYearData.grossSalary) * 10000) / 100
					: 0,
			totalCapital: finalYearData?.totalCapital || 0,
			lifeExpectancyMonths: finalYearData?.monthlyPension
				? Math.round(finalYearData.totalCapital / finalYearData.monthlyPension)
				: 0,
			sickLeaveDaysPerYear:
				sickLeaves.length > 0 ? Math.round(sickLeaves.reduce((sum, sl) => sum + sl.days, 0) / sickLeaves.length) : 0,
			sickLeaveImpactPercentage: 0,
		}

		try {
			if (recordId) {
				// Nadpisz istniejący rekord
				await db.pensionData.update(Number(recordId), dataToSave)
				console.log('W9 dane zapisane w bazie')
			} else {
				// Stwórz nowy rekord (fallback jeśli nie przyszło z Form)
				const newRecordId = await db.pensionData.add({
					...dataToSave,
					createdAt: new Date(),
				})
				localStorage.setItem('currentPensionRecordId', newRecordId.toString())
				console.log('W8 utworzenie postaci')
				console.log('W9 dane zapisane w bazie')
			}
		} catch (error) {
			console.log('W10 blad zapisu do bazy')
		}
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
		// Zapisz finalne dane przed drukowaniem (ostatnia aktualizacja)
		await saveToDatabase()

		// Rozwiń tabelę przed drukowaniem
		setShowAllYears(true)

		// Poczekaj na render DOM
		await new Promise(resolve => setTimeout(resolve, 100))

		// Drukuj raport
		window.print()

		console.log('W17 kalkulator emerytalny zapisany')
	}

	const finalYearData = yearData.length > 0 ? yearData[yearData.length - 1] : null
	const totalCapital = finalYearData?.totalCapital || 0
	const realTotalCapital = finalYearData?.realCapital || 0
	const monthlyPension = finalYearData?.monthlyPension || 0
	const realMonthlyPension = finalYearData?.realMonthlyPension || 0

	const currentYear = new Date().getFullYear()
	const yearsToRetirement = parameters.retirementYear - currentYear

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
					/* Customizacja footera przeglądarki */
					@page {
						margin: 1.5cm 1cm 1.5cm 1cm;
						@bottom-left {
							content: 'zus.pl/symulator-emerytury';
							font-size: 9pt;
							color: #6b7280;
						}
						@bottom-center {
							content: 'Symulator Emerytalny ZUS';
							font-size: 9pt;
							color: #6b7280;
						}
						@bottom-right {
							content: counter(page) ' / ' counter(pages);
							font-size: 9pt;
							color: #6b7280;
						}
					}

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
					/* Ukryj wszystkie interaktywne elementy */
					input[type='range'],
					input[type='text'],
					input[type='number'],
					button,
					.no-print,
					svg.lucide-edit-2,
					svg.lucide-save {
						display: none !important;
						visibility: hidden !important;
					}
					/* Pokaż wszystkie kolumny tabeli na druku */
					.hidden {
						display: table-cell !important;
					}
					/* Usunięcie sticky positioning */
					.lg\:sticky {
						position: relative !important;
					}
					/* Lepszy layout dla druku */
					.grid {
						display: block !important;
					}
					/* Większy padding dla lepszej czytelności */
					body {
						font-size: 10pt !important;
					}
					h1 {
						font-size: 20pt !important;
					}
					h2 {
						font-size: 16pt !important;
					}
					h3 {
						font-size: 14pt !important;
					}
					/* Pokaż sekcje tylko do druku */
					.print-only {
						display: block !important;
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
						{/* Print-only header - MUSI być na samej górze */}
						<div className='hidden print:block'>
							<div className='flex items-center justify-center mb-6 pt-4'>
								<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='mr-3' />
								<div className='border-l border-gray-300 pl-3'>
									<h1 className='text-lg font-bold mb-0.5'>Raport Prognozy Emerytalnej</h1>
									<p className='text-xs text-muted-foreground'>
										Wygenerowano: {new Date().toLocaleDateString('pl-PL')}
									</p>
								</div>
							</div>
						</div>

						<div className='text-center mb-6 no-print'>
							<h1 className='text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3'>
								Panel Symulacji Emerytalnej
							</h1>
							<p className='text-sm md:text-base lg:text-lg text-muted-foreground'>Szczegółowa analiza rok po roku</p>

							{/* Przyciski akcji */}
							<div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 mt-4 md:mt-6 no-print'>
								<Button
									onClick={handlePrintReport}
									size='lg'
									className='bg-yellow hover:bg-[var(--zus-green-primary)] text-yellow-foreground hover:text-white font-bold text-sm md:text-base px-4 md:px-6 py-3 md:py-4 h-auto transition-colors'>
									<Download className='w-4 md:w-5 h-4 md:h-5 mr-2' />
									Pobierz raport PDF
								</Button>
								<Button
									onClick={() => {
										// Wyczyść sesję - nowa symulacja = nowy rekord
										localStorage.removeItem('pensionCalculatorData')
										localStorage.removeItem('currentPensionRecordId')
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
								<Tooltip content='Kapitał emerytalny to suma wszystkich Twoich składek emerytalnych plus ich waloryzacja (odsetki). Z tego kapitału będzie liczona Twoja emerytura.' />
							</h2>

							{/* SVG Chart */}
							<div className='w-full h-64 md:h-96 relative'>
								<svg viewBox='0 0 1000 400' className='w-full h-full' onMouseLeave={() => setHoveredPoint(null)}>
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
											const maxCapital = Math.max(...yearData.map(d => d.totalCapital))
											const xScale = 900 / (yearData.length - 1)
											const yScale = 300 / maxCapital

											// Całkowity kapitał (zielona linia)
											const totalPoints = yearData
												.map((d, i) => {
													const x = 50 + i * xScale
													const y = 350 - d.totalCapital * yScale
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

													{/* Vertical line przy hover */}
													{hoveredPoint && (
														<line
															x1={hoveredPoint.x}
															y1='50'
															x2={hoveredPoint.x}
															y2='350'
															stroke='#6b7280'
															strokeWidth='1'
															strokeDasharray='5,5'
															opacity='0.5'
														/>
													)}

													{/* Niewidzialne punkty dla lepszej interaktywności - każdy rok */}
													{yearData.map((d, i) => {
														const x = 50 + i * xScale
														const y = 350 - d.totalCapital * yScale

														return (
															<circle
																key={`hover-${i}`}
																cx={x}
																cy={y}
																r='8'
																fill='transparent'
																style={{ cursor: 'pointer' }}
																onMouseEnter={() =>
																	setHoveredPoint({
																		year: d.year,
																		age: d.age,
																		capital: d.totalCapital,
																		realCapital: d.realCapital,
																		monthlyPension: d.monthlyPension,
																		realMonthlyPension: d.realMonthlyPension,
																		x,
																		y,
																	})
																}
															/>
														)
													})}

													{/* Widoczne punkty na wykresie co 5 lat */}
													{yearData
														.filter((_, i) => i % 5 === 0 || i === yearData.length - 1)
														.map((d, i) => {
															const index = yearData.indexOf(d)
															const x = 50 + index * xScale
															const y = 350 - d.totalCapital * yScale
															const isHovered = hoveredPoint?.year === d.year

															return (
																<circle
																	key={i}
																	cx={x}
																	cy={y}
																	r={isHovered ? '6' : '4'}
																	fill='oklch(0.48 0.12 155)'
																	stroke='white'
																	strokeWidth='2'
																	style={{ cursor: 'pointer', transition: 'r 0.2s' }}
																	onMouseEnter={() =>
																		setHoveredPoint({
																			year: d.year,
																			age: d.age,
																			capital: d.totalCapital,
																			realCapital: d.realCapital,
																			monthlyPension: d.monthlyPension,
																			realMonthlyPension: d.realMonthlyPension,
																			x,
																			y,
																		})
																	}
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
										const maxCapital = Math.max(...yearData.map(d => d.totalCapital), 1)
										const value = Math.round((maxCapital * fraction) / 1000) * 1000
										const y = 350 - fraction * 300
										return (
											<text key={i} x='40' y={y + 5} textAnchor='end' fontSize='12' fill='#6b7280'>
												{(value / 1000).toFixed(0)}
											</text>
										)
									})}

									{/* Opis osi Y (pionowa) */}
									<text
										x='3'
										y='200'
										textAnchor='middle'
										fontSize='12'
										fontWeight='500'
										fill='#9ca3af'
										transform='rotate(-90, 3, 200)'>
										Kapitał (tys. zł)
									</text>

									{/* Opis osi X (pozioma) */}
									<text x='500' y='395' textAnchor='middle' fontSize='12' fontWeight='500' fill='#9ca3af'>
										Rok
									</text>
								</svg>

								{/* Tooltip */}
								{hoveredPoint && (
									<div
										className='absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10 no-print min-w-[220px]'
										style={{
											left: `${(hoveredPoint.x / 1000) * 100}%`,
											top: `${(hoveredPoint.y / 400) * 100}%`,
											transform: hoveredPoint.x > 500 ? 'translate(-100%, -120%)' : 'translate(10px, -120%)',
										}}>
										<div className='text-xs font-semibold text-foreground mb-2'>
											Rok {hoveredPoint.year} • Wiek: {hoveredPoint.age} lat
										</div>

										<div className='space-y-2 border-t pt-2'>
											<div>
												<div className='text-xs text-muted-foreground'>Kapitał nominalny</div>
												<div className='text-sm font-bold text-foreground'>
													{hoveredPoint.capital.toLocaleString('pl-PL')} zł
												</div>
											</div>

											<div>
												<div className='text-xs text-muted-foreground'>Kapitał realny (dzisiejsze zł)</div>
												<div className='text-sm font-bold text-foreground'>
													{hoveredPoint.realCapital.toLocaleString('pl-PL')} zł
												</div>
											</div>

											<div className='border-t pt-2 space-y-1.5'>
												<div>
													<div className='text-xs text-muted-foreground'>Emerytura realna (miesięcznie)</div>
													<div className='text-base font-bold text-[var(--zus-green-primary)]'>
														{hoveredPoint.realMonthlyPension.toLocaleString('pl-PL')} zł
													</div>
													<div className='text-xs text-muted-foreground'>w dzisiejszych zł</div>
												</div>
												<div className='pt-1'>
													<div className='text-xs text-muted-foreground'>Emerytura nominalna</div>
													<div className='text-xs font-medium text-foreground'>
														{hoveredPoint.monthlyPension.toLocaleString('pl-PL')} zł/mies.
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
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
																		className='text-green-600 hover:text-green-700 cursor-pointer'>
																		<Save className='w-4 h-4' />
																	</button>
																</div>
															) : (
																<div className='flex items-center gap-1 md:gap-2 justify-end group'>
																	<span className='truncate'>{data.grossSalary.toLocaleString('pl-PL')}</span>
																	<button
																		onClick={() => setEditingYear(data.year)}
																		aria-label={`Edytuj wynagrodzenie za rok ${data.year}`}
																		className='text-blue-600/40 hover:text-blue-700 transition-colors no-print hidden md:inline cursor-pointer'
																		title='Edytuj wynagrodzenie'>
																		<Edit2 className='w-3 h-3' />
																	</button>
																	{customSalaries[data.year] && (
																		<span className='text-xs text-blue-600 font-bold no-print' title='Edytowane'>
																			✓
																		</span>
																	)}
																</div>
															)}
														</td>
														<td className='text-right py-2 px-1 md:px-2 text-green-600 hidden md:table-cell'>
															+{data.monthlyContribution.toLocaleString('pl-PL')}
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

							{/* Parametry - tylko do druku */}
							<div className='hidden print-only space-y-4'>
								<Card className='p-5 border-0 bg-white'>
									<h3 className='text-base font-bold text-foreground mb-3'>Parametry symulacji</h3>
									<div className='space-y-2 text-sm'>
										<div>
											<span className='font-medium'>Wiek:</span> {parameters.currentAge} lat
										</div>
										<div>
											<span className='font-medium'>Płeć:</span>{' '}
											{parameters.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}
										</div>
										<div>
											<span className='font-medium'>Aktualne wynagrodzenie:</span>{' '}
											{parameters.currentSalary.toLocaleString('pl-PL')} zł
										</div>
										<div>
											<span className='font-medium'>Rok rozpoczęcia pracy:</span> {parameters.workStartYear}
										</div>
										<div>
											<span className='font-medium'>Planowany rok emerytury:</span> {parameters.retirementYear}
										</div>
										<div>
											<span className='font-medium'>Scenariusz ekonomiczny:</span> {scenario.name}
										</div>
										<div>
											<span className='font-medium'>Wzrost wynagrodzeń:</span>{' '}
											{((scenario.parameters.realWageGrowthIndex2080 - 1) * 100).toFixed(1)}% rocznie
										</div>
										<div>
											<span className='font-medium'>Inflacja:</span>{' '}
											{((scenario.parameters.inflationIndex2080 - 1) * 100).toFixed(1)}% rocznie
										</div>
										<div>
											<span className='font-medium'>Bezrobocie:</span>{' '}
											{(scenario.parameters.unemploymentRate2080 * 100).toFixed(1)}%
										</div>
										{sickLeaves.length > 0 && (
											<div className='mt-3 pt-3 border-t'>
												<div className='font-medium mb-2'>Zwolnienia lekarskie:</div>
												{sickLeaves.map(sl => (
													<div key={sl.id} className='text-xs'>
														Rok {sl.year}: {sl.days} dni
													</div>
												))}
											</div>
										)}
									</div>
								</Card>
							</div>

							{/* Sidebar - parametry i zwolnienia */}
							<div className='space-y-4 md:space-y-6 min-w-0 no-print'>
								{/* Parametry globalne */}
								<Card className='p-4 md:p-5 border-0 bg-white'>
									<h3 className='text-sm md:text-base font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2'>
										<Settings className='w-4 h-4 text-primary' />
										Parametry symulacji
									</h3>
									<div className='space-y-3'>
										<div>
											<label
												htmlFor='scenario-select'
												className='block text-xs md:text-sm font-medium text-foreground mb-2'>
												Scenariusz ekonomiczny
											</label>
											<select
												id='scenario-select'
												value={scenario.id}
												onChange={e => {
													const newScenario = getScenarioById(e.target.value)
													setScenario(newScenario)
												}}
												className='w-full px-3 py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm'>
												<option value='pessimistic'>Pesymistyczny</option>
												<option value='moderate'>Umiarkowany (domyślny)</option>
												<option value='optimistic'>Optymistyczny</option>
											</select>
										</div>

										<div className='p-3 bg-blue-50/50 rounded text-xs space-y-1'>
											<div className='font-semibold text-foreground mb-1.5'>{scenario.name}</div>
											<div className='text-muted-foreground'>{scenario.description}</div>
											<div className='pt-2 space-y-0.5 text-muted-foreground'>
												<div>
													• Wzrost wynagrodzeń: {((scenario.parameters.realWageGrowthIndex2080 - 1) * 100).toFixed(1)}%
													rocznie
												</div>
												<div>
													• Inflacja: {((scenario.parameters.inflationIndex2080 - 1) * 100).toFixed(1)}% rocznie
												</div>
												<div>• Bezrobocie: {(scenario.parameters.unemploymentRate2080 * 100).toFixed(1)}%</div>
											</div>
										</div>
									</div>
								</Card>

								{/* Zwolnienia chorobowe */}
								<Card className='p-4 md:p-5 border-0 bg-white'>
									<div className='flex items-center justify-between mb-3 md:mb-4'>
										<h3 className='text-sm md:text-base font-bold text-foreground flex items-center gap-2'>
											<HeartPulse className='w-4 md:w-5 h-4 md:h-5 text-orange-500' />
											Zwolnienia lekarskie
										</h3>
										<Button
											size='sm'
											onClick={() => setShowAddSickLeave(true)}
											className='bg-primary text-primary-foreground text-xs md:text-sm px-2 md:px-3'>
											<Plus className='w-3 md:w-4 h-3 md:h-4' aria-hidden="true" />
									<span className="sr-only">Dodaj zwolnienie lekarskie</span>
										</Button>
									</div>

									{showAddSickLeave && (
										<div className='mb-4 p-3 border-0 bg-muted/20 rounded space-y-2'>
											<label htmlFor='sickLeaveYear' className='sr-only'>
												Rok zwolnienia
											</label>
											<input
												type='number'
												min='0'
												placeholder='Rok'
												aria-label='Rok zwolnienia'
												className='w-full px-3 py-2 border border-gray-100 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
												id='sickLeaveYear'
											/>
											<label htmlFor='sickLeaveDays' className='sr-only'>
												Liczba dni zwolnienia
											</label>
											<input
												type='number'
												min='0'
												placeholder='Liczba dni'
												aria-label='Liczba dni zwolnienia'
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
										<MapPin className='w-4 md:w-5 h-4 md:h-5 text-blue-500' />
										Kod pocztowy (opcjonalnie)
									</h3>
									<p className='text-xs text-muted-foreground mb-2 md:mb-3'>
										Podanie kodu pocztowego pomoże nam w tworzeniu lepszych narzędzi edukacyjnych dla Twojego regionu.
									</p>
									<label htmlFor='postal-code' className='sr-only'>
										Kod pocztowy
									</label>
									<input
										id='postal-code'
										type='text'
										placeholder='00-000'
										aria-label='Kod pocztowy'
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

				{/* Print-only footer */}
				<div className='hidden print:block mt-12 pt-6 border-t border-gray-200'>
					<div className='flex items-center justify-between text-xs text-muted-foreground mb-3'>
						<div className='flex items-center gap-2'>
							<Image src='/logozus.svg' alt='ZUS Logo' width={80} height={20} />
							<span>Symulator Emerytalny ZUS</span>
						</div>
						<div>
							<p>Raport wygenerowany: {new Date().toLocaleString('pl-PL')}</p>
						</div>
					</div>
					<div className='text-xs text-center text-muted-foreground'>
						<p>
							To narzędzie edukacyjne służy do oszacowania przyszłej emerytury. Rzeczywista wysokość świadczenia może
							się różnić.
						</p>
					</div>
				</div>

				{/* AI Chat Assistant */}
				<ChatWidget
					formContext={{
						// Parametry użytkownika
						age: parameters.currentAge,
						gender: parameters.gender,
						grossSalary: parameters.currentSalary,
						workStartYear: parameters.workStartYear,
						plannedRetirementYear: parameters.retirementYear,
						zusAccountBalance: parameters.zusAccountBalance,
						zusSubaccountBalance: parameters.zusSubaccountBalance,
						// Wyniki końcowe
						monthlyPension: monthlyPension,
						realMonthlyPension: realMonthlyPension,
						totalCapital: totalCapital,
						realTotalCapital: realTotalCapital,
						replacementRate:
							finalYearData?.monthlyPension && finalYearData?.grossSalary
								? Math.round((finalYearData.monthlyPension / finalYearData.grossSalary) * 10000) / 100
								: 0,
						// Dodatkowe dane dashboardu
						yearsToRetirement: yearsToRetirement,
						scenario: scenario.name,
						scenarioDescription: scenario.description,
						wageGrowth: ((scenario.parameters.realWageGrowthIndex2080 - 1) * 100).toFixed(1),
						inflation: ((scenario.parameters.inflationIndex2080 - 1) * 100).toFixed(1),
						unemployment: (scenario.parameters.unemploymentRate2080 * 100).toFixed(1),
						sickLeavesCount: sickLeaves.length,
						yearDataLength: yearData.length,
					}}
				/>
			</div>
		</>
	)
}
