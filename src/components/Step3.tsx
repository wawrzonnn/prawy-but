interface Step3Props {
	formData: {
		age: number | ''
		gender: 'male' | 'female' | ''
		grossSalary: number | ''
		workStartYear: number | ''
		plannedRetirementYear: number | ''
		zusAccountBalance?: number | ''
		zusSubaccountBalance?: number | ''
		includeSickLeave: boolean
		monthlyPension?: number
		monthlyPensionReal?: number
		replacementRate?: number
		totalCapital?: number
		finalSalary?: number
		lifeExpectancyMonths?: number
		sickLeaveDaysPerYear?: number
		sickLeaveImpactPercentage?: number
		averagePensionInRetirementYear?: number
		pensionVsAverageRatio?: number
		monthlyPensionWithoutSickLeave?: number
		delayedRetirement?: {
			oneYear: { monthlyPension: number; replacementRate: number }
			twoYears: { monthlyPension: number; replacementRate: number }
			fiveYears: { monthlyPension: number; replacementRate: number }
		}
		expectedPension?: number
		yearsToReachExpected?: number
	}
	onInputChange: (field: string, value: string | number | boolean) => void
	calculatePension: () => void
}

export default function Step3({ formData, onInputChange, calculatePension }: Step3Props) {
	const currentYear = new Date().getFullYear()
	const yearsToRetirement = formData.plannedRetirementYear ? Number(formData.plannedRetirementYear) - currentYear : 0
	const workingYears =
		formData.plannedRetirementYear && formData.workStartYear
			? Number(formData.plannedRetirementYear) - Number(formData.workStartYear)
			: 0

	// Sprawdź czy wszystkie wymagane dane są wypełnione
	const allRequiredDataFilled = !!(
		formData.age &&
		formData.gender &&
		formData.grossSalary &&
		formData.workStartYear &&
		formData.plannedRetirementYear
	)

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold text-zus-black mb-4'>Krok 3: Prognoza emerytury</h2>

			{/* Podsumowanie wprowadzonych danych */}
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
				<h3 className='font-bold text-blue-800 mb-3'>📋 Podsumowanie wprowadzonych danych:</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
					<div className='space-y-2'>
						<div className='flex justify-between'>
							<span>Wiek:</span>
							<span className='font-medium'>{formData.age || '—'} lat</span>
						</div>
						<div className='flex justify-between'>
							<span>Płeć:</span>
							<span className='font-medium'>
								{formData.gender === 'male' ? 'Mężczyzna' : formData.gender === 'female' ? 'Kobieta' : '—'}
							</span>
						</div>
						<div className='flex justify-between'>
							<span>Wynagrodzenie brutto:</span>
							<span className='font-medium'>
								{formData.grossSalary ? `${Number(formData.grossSalary).toLocaleString('pl-PL')} zł` : '—'}
							</span>
						</div>
					</div>
					<div className='space-y-2'>
						<div className='flex justify-between'>
							<span>Rok rozpoczęcia pracy:</span>
							<span className='font-medium'>{formData.workStartYear || '—'}</span>
						</div>
						<div className='flex justify-between'>
							<span>Planowana emerytura:</span>
							<span className='font-medium'>{formData.plannedRetirementYear || '—'}</span>
						</div>
						<div className='flex justify-between'>
							<span>Lata do emerytury:</span>
							<span className='font-medium'>{yearsToRetirement > 0 ? `${yearsToRetirement} lat` : '—'}</span>
						</div>
					</div>
				</div>

				{/* Dane fakultatywne */}
				<div className='mt-4 pt-3 border-t border-blue-200'>
					<h4 className='font-medium text-blue-800 mb-2'>Dane fakultatywne:</h4>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
						<div className='space-y-1'>
							<div className='flex justify-between'>
								<span>Środki na koncie ZUS:</span>
								<span className='font-medium'>
									{formData.zusAccountBalance
										? `${Number(formData.zusAccountBalance).toLocaleString('pl-PL')} zł`
										: 'Oszacowane automatycznie'}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Środki na subkoncie:</span>
								<span className='font-medium'>
									{formData.zusSubaccountBalance
										? `${Number(formData.zusSubaccountBalance).toLocaleString('pl-PL')} zł`
										: 'Brak'}
								</span>
							</div>
						</div>
						<div className='space-y-1'>
							<div className='flex justify-between'>
								<span>Zwolnienia lekarskie:</span>
								<span className='font-medium'>{formData.includeSickLeave ? 'Uwzględnione' : 'Nieuwzględnione'}</span>
							</div>
							{formData.includeSickLeave && formData.sickLeaveDaysPerYear && (
								<div className='flex justify-between text-xs text-blue-600'>
									<span>Średnio dni rocznie:</span>
									<span>{formData.sickLeaveDaysPerYear} dni</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Przycisk do prognozowania */}
			{allRequiredDataFilled && !formData.monthlyPension && (
				<div className='text-center'>
					<button
						type='button'
						onClick={calculatePension}
						className='px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-colors shadow-lg'>
						🔮 Zaprognozuj moją przyszłą emeryturę
					</button>
					<p className='text-sm text-zus-dark-green mt-2'>
						Kliknij, aby obliczyć prognozę emerytury na podstawie wprowadzonych danych
					</p>
				</div>
			)}

			{/* Wyniki prognozy */}
			{formData.monthlyPension && formData.replacementRate && allRequiredDataFilled && (
				<div className='bg-green-600 text-black p-6 rounded-lg shadow-xl'>
					<h3 className='text-2xl font-bold mb-6 text-center'>🎯 Prognoza Twojej przyszłej emerytury</h3>

					{/* Główne wyniki */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div className='bg-white bg-opacity-20 rounded-lg p-6 text-center'>
							<h4 className='font-bold text-lg mb-2'>Miesięczna emerytura</h4>
							<p className='text-4xl font-bold mb-2'>{formData.monthlyPension.toLocaleString('pl-PL')} zł</p>
							<p className='text-sm opacity-90'>Przewidywana wysokość emerytury</p>
						</div>

						<div className='bg-white bg-opacity-20 rounded-lg p-6 text-center'>
							<h4 className='font-bold text-lg mb-2'>Stopa zastąpienia</h4>
							<p className='text-4xl font-bold mb-2'>{formData.replacementRate}%</p>
							<p className='text-sm opacity-90'>obecnego wynagrodzenia</p>
						</div>
					</div>

					{/* Dodatkowe szczegóły */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
						<div className='bg-white bg-opacity-15 rounded-lg p-4 text-center'>
							<h4 className='font-bold mb-2'>Całkowity kapitał</h4>
							<p className='text-xl font-bold'>{formData.totalCapital?.toLocaleString('pl-PL')} zł</p>
						</div>

						<div className='bg-white bg-opacity-15 rounded-lg p-4 text-center'>
							<h4 className='font-bold mb-2'>Czas pobierania</h4>
							<p className='text-xl font-bold'>
								{formData.lifeExpectancyMonths ? Math.round(formData.lifeExpectancyMonths / 12) : 0} lat
							</p>
						</div>

						<div className='bg-white bg-opacity-15 rounded-lg p-4 text-center'>
							<h4 className='font-bold mb-2'>Staż pracy</h4>
							<p className='text-xl font-bold'>{workingYears} lat</p>
						</div>
					</div>

					{/* Szczegółowe informacje */}
					<div className='bg-white bg-opacity-10 rounded-lg p-4 mb-4'>
						<h4 className='font-bold mb-3 text-black'>📊 Szczegółowe informacje:</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black'>
							<div className='space-y-2'>
								<div className='flex justify-between'>
									<span>Obecne wynagrodzenie:</span>
									<span>{Number(formData.grossSalary).toLocaleString('pl-PL')} zł</span>
								</div>
								<div className='flex justify-between'>
									<span>Różnica miesięczna:</span>
									<span
										className={
											formData.monthlyPension < Number(formData.grossSalary) ? 'text-red-200' : 'text-green-200'
										}>
										{(Number(formData.grossSalary) - formData.monthlyPension).toLocaleString('pl-PL')} zł
									</span>
								</div>
								<div className='flex justify-between'>
									<span>Wiek przejścia na emeryturę:</span>
									<span>{formData.gender === 'female' ? '60' : '65'} lat</span>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex justify-between'>
									<span>Lata składkowe:</span>
									<span>{workingYears} lat</span>
								</div>
								<div className='flex justify-between'>
									<span>Średni wzrost wynagrodzeń:</span>
									<span>3% rocznie</span>
								</div>
								{formData.includeSickLeave && formData.sickLeaveImpactPercentage && (
									<div className='flex justify-between'>
										<span>Wpływ zwolnień lekarskich:</span>
										<span className='text-yellow-200'>-{formData.sickLeaveImpactPercentage}%</span>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Rekomendacje i ostrzeżenia */}
					<div className='bg-white bg-opacity-10 rounded-lg p-4'>
						<h4 className='font-bold mb-3 text-black'>💡 Rekomendacje i uwagi:</h4>
						<ul className='text-sm space-y-2 text-black'>
							{formData.replacementRate < 40 && (
								<li className='flex items-start space-x-2'>
									<span className='text-red-300'>⚠️</span>
									<span>Niska stopa zastąpienia - rozważ dodatkowe oszczędzanie na emeryturę (III filar)</span>
								</li>
							)}
							{formData.replacementRate >= 40 && formData.replacementRate < 60 && (
								<li className='flex items-start space-x-2'>
									<span className='text-yellow-300'>⚡</span>
									<span>Przeciętna stopa zastąpienia - warto rozważyć dodatkowe zabezpieczenie emerytalne</span>
								</li>
							)}
							{formData.replacementRate >= 60 && (
								<li className='flex items-start space-x-2'>
									<span className='text-green-300'>✅</span>
									<span>Dobra stopa zastąpienia - kontynuuj obecną strategię oszczędzania</span>
								</li>
							)}
							{yearsToRetirement > 10 && (
								<li className='flex items-start space-x-2'>
									<span className='text-blue-300'>🕐</span>
									<span>Masz jeszcze czas na optymalizację - rozważ różne scenariusze</span>
								</li>
							)}
							{formData.includeSickLeave && (
								<li className='flex items-start space-x-2'>
									<span className='text-orange-300'>🏥</span>
									<span>Uwzględniono wpływ zwolnień lekarskich na wysokość emerytury</span>
								</li>
							)}
							<li className='flex items-start space-x-2'>
								<span className='text-gray-300'>📈</span>
								<span>Prognoza uwzględnia średni wzrost wynagrodzeń w Polsce (3% rocznie)</span>
							</li>
						</ul>
					</div>

					{/* Przycisk do ponownego obliczenia */}
					<div className='text-center mt-6'>
						<button
							type='button'
							onClick={calculatePension}
							className='px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-black font-medium rounded-lg transition-colors'>
							🔄 Przelicz ponownie
						</button>
					</div>
				</div>
			)}

			{/* Komunikat o brakujących danych */}
			{!allRequiredDataFilled && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<h4 className='font-bold text-red-800 mb-2'>⚠️ Brakujące dane</h4>
					<p className='text-sm text-red-700 mb-3'>
						Aby wygenerować prognozę emerytury, uzupełnij wszystkie obowiązkowe dane w pierwszym kroku:
					</p>
					<ul className='text-sm text-red-600 space-y-1'>
						{!formData.age && <li>• Wiek</li>}
						{!formData.gender && <li>• Płeć</li>}
						{!formData.grossSalary && <li>• Wynagrodzenie brutto</li>}
						{!formData.workStartYear && <li>• Rok rozpoczęcia pracy</li>}
						{!formData.plannedRetirementYear && <li>• Planowany rok zakończenia pracy</li>}
					</ul>
				</div>
			)}

			{/* Informacja o metodologii */}
			<div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
				<h4 className='font-bold text-gray-800 mb-2'>📚 Metodologia obliczeń</h4>
				<p className='text-sm text-gray-700 mb-2'>
					Prognoza oparta jest na aktualnych zasadach systemu emerytalnego w Polsce:
				</p>
				<ul className='text-xs text-gray-600 space-y-1 list-disc list-inside'>
					<li>Składka emerytalna: 19,52% wynagrodzenia brutto</li>
					<li>Średni wzrost wynagrodzeń: 3% rocznie (dane NBP/GUS)</li>
					<li>Tabele średniego dalszego trwania życia wg GUS</li>
					<li>Wiek emerytalny: 60 lat (kobiety), 65 lat (mężczyźni)</li>
					<li>Zwolnienia lekarskie: średnio 9-12 dni rocznie wg statystyk GUS</li>
				</ul>
				<p className='text-xs text-gray-500 mt-2'>
					* Prognoza ma charakter szacunkowy i nie stanowi gwarancji przyszłej wysokości emerytury.
				</p>
			</div>
		</div>
	)
}
