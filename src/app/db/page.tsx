'use client'

import { useState, useEffect } from 'react'
import { db, PensionData } from '@/lib/db'

export default function DatabasePage() {
	const [pensionData, setPensionData] = useState<PensionData[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		try {
			const data = await db.pensionData.orderBy('createdAt').reverse().toArray()
			setPensionData(data)
			console.log('W19 dane kalkulatora pobrane z bazy')
		} catch (error) {
			console.log('W20 blad pobierania danych kalkulatora')
		} finally {
			setIsLoading(false)
		}
	}

	const deleteRecord = async (id: number) => {
		try {
			await db.pensionData.delete(id)
			console.log('W21 usunieto kalkulacje')
			loadData()
		} catch (error) {
			console.log('W22 blad usuwania kalkulacji')
		}
	}

	const clearAllData = async () => {
		if (confirm('Czy na pewno chcesz usunąć wszystkie kalkulacje?')) {
			try {
				await db.pensionData.clear()
				console.log('W23 wyczyszczono wszystkie kalkulacje')
				loadData()
			} catch (error) {
				console.log('W24 blad czyszczenia kalkulacji')
			}
		}
	}

	if (isLoading) {
		return (
			<div className='min-h-screen bg-zus-white flex items-center justify-center'>
				<div className='text-zus-black'>Ładowanie kalkulacji...</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-zus-white p-4'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-2xl font-bold text-zus-black'>Zapisane kalkulacje emerytalne ZUS</h1>
					<div className='space-x-4'>
						<a
							href='/'
							className='bg-zus-light-gray hover:bg-gray-300 text-zus-black px-4 py-2 rounded-md transition-colors'>
							← Nowa kalkulacja
						</a>
						{pensionData.length > 0 && (
							<button
								onClick={clearAllData}
								className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors'>
								Usuń wszystkie
							</button>
						)}
					</div>
				</div>

				{pensionData.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-zus-black text-lg mb-4'>Brak zapisanych kalkulacji</p>
						<a href='/' className='text-zus-dark-green hover:underline'>
							Stwórz pierwszą kalkulację →
						</a>
					</div>
				) : (
					<div className='space-y-6'>
						<p className='text-zus-black mb-4'>
							Liczba kalkulacji: <strong>{pensionData.length}</strong>
						</p>

						{pensionData.map(record => (
							<div key={record.id} className='bg-white border-2 border-zus-light-gray rounded-lg p-6 shadow-sm'>
								<div className='flex justify-between items-start mb-4'>
									<div className='flex-1'>
										<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
											{/* Podstawowe dane */}
											<div>
												<h3 className='font-bold text-zus-black mb-3'>Podstawowe dane</h3>
												<div className='space-y-2 text-sm'>
													<p>
														<strong>Rok informacji ZUS:</strong> {record.lastZusInfoYear}
													</p>
													<p>
														<strong>Płeć:</strong> {record.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}
													</p>
													<p>
														<strong>Data urodzenia:</strong> {record.birthMonth}/{record.birthYear}
													</p>
													<p>
														<strong>Wiek przejścia:</strong> {record.retirementAgeYears}l {record.retirementAgeMonths}m
													</p>
													<p>
														<strong>Rok przejścia:</strong> {record.birthYear + record.retirementAgeYears}
													</p>
													{record.workStartYear && (
														<p>
															<strong>Rok rozpoczęcia pracy:</strong> {record.workStartYear}
														</p>
													)}
												</div>
											</div>

											{/* Kapitał emerytalny */}
											<div>
												<h3 className='font-bold text-zus-black mb-3'>Kapitał emerytalny</h3>
												<div className='space-y-2 text-sm'>
													<p>
														<strong>Składki zwaloryzowane:</strong>{' '}
														{record.valorisedContributions.toLocaleString('pl-PL')} zł
													</p>
													<p>
														<strong>Kapitał początkowy:</strong>{' '}
														{record.valorisedInitialCapital.toLocaleString('pl-PL')} zł
													</p>
													<p>
														<strong>Subkonto (OFE):</strong> {record.valorisedSubaccountTotal.toLocaleString('pl-PL')}{' '}
														zł
													</p>
													<p>
														<strong>Składki za 12 mies.:</strong> {record.contributions12Months.toLocaleString('pl-PL')}{' '}
														zł
													</p>
													{record.totalCapital && (
														<p className='font-bold text-zus-green'>
															<strong>Kapitał razem:</strong> {record.totalCapital.toLocaleString('pl-PL')} zł
														</p>
													)}
												</div>
											</div>

											{/* Wynagrodzenie i prognoza */}
											<div>
												<h3 className='font-bold text-zus-black mb-3'>Wynagrodzenie</h3>
												<div className='space-y-2 text-sm'>
													<p>
														<strong>Obecne brutto:</strong> {record.currentGrossSalary.toLocaleString('pl-PL')} zł
													</p>
													{record.currentSalaryPercentage && (
														<p>
															<strong>% przeciętnego:</strong> {record.currentSalaryPercentage}%
														</p>
													)}
													<p>
														<strong>Prognoza przyszła:</strong> {record.futureSalaryPercentage}%
													</p>
													<p>
														<strong>Członek OFE:</strong> {record.isOfeMember ? 'Tak' : 'Nie'}
													</p>
													{record.lifeExpectancyMonths && (
														<p>
															<strong>Czas pobierania:</strong> {Math.round(record.lifeExpectancyMonths / 12)} lat
														</p>
													)}
												</div>
											</div>

											{/* Wyniki */}
											<div>
												<h3 className='font-bold text-zus-black mb-3'>Wyniki kalkulacji</h3>
												<div className='space-y-2'>
													{record.monthlyPension && (
														<div className='bg-zus-green text-white p-3 rounded-lg'>
															<p className='text-sm opacity-90'>Miesięczna emerytura</p>
															<p className='text-xl font-bold'>{record.monthlyPension.toLocaleString('pl-PL')} zł</p>
														</div>
													)}
													{record.replacementRate && (
														<div className='bg-zus-dark-green text-white p-3 rounded-lg'>
															<p className='text-sm opacity-90'>Stopa zastąpienia</p>
															<p className='text-xl font-bold'>{record.replacementRate}%</p>
														</div>
													)}
													<div className='text-sm text-zus-dark-green'>
														<p>
															<strong>Różnica miesięczna:</strong>
														</p>
														<p>
															{(record.currentGrossSalary - (record.monthlyPension || 0)).toLocaleString('pl-PL')} zł
														</p>
													</div>
												</div>
											</div>
										</div>

										<div className='mt-4 pt-4 border-t border-zus-light-gray'>
											<p className='text-zus-dark-green text-sm'>
												<strong>Utworzono:</strong> {new Date(record.createdAt).toLocaleString('pl-PL')}
											</p>
										</div>
									</div>

									<button
										onClick={() => record.id && deleteRecord(record.id)}
										className='bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors ml-6'>
										Usuń
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
