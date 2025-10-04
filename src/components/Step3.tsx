interface Step3Props {
	formData: {
		gender: 'male' | 'female' | ''
		birthYear: number | ''
		retirementAgeYears: number | ''
		retirementAgeMonths: number | ''
		workStartYear: number | ''
		currentGrossSalary: number | ''
		currentSalaryPercentage?: number
		isOfeMember: boolean
		futureSalaryPercentage: number | ''
		valorisedContributions: number | ''
		valorisedInitialCapital: number | ''
		valorisedSubaccountTotal: number | ''
		contributions12Months: number | ''
		monthlyPension?: number
		replacementRate?: number
		totalCapital?: number
		lifeExpectancyMonths?: number
	}
	onInputChange: (field: string, value: string | number | boolean) => void
	calculatePension: () => void
}

export default function Step3({ formData, onInputChange, calculatePension }: Step3Props) {
	const currentYear = new Date().getFullYear()
	const currentAge = formData.birthYear ? currentYear - Number(formData.birthYear) : 0
	const totalRetirementAge = formData.retirementAgeYears
		? Number(formData.retirementAgeYears) + Number(formData.retirementAgeMonths || 0) / 12
		: 0
	const yearsToRetirement = totalRetirementAge > 0 ? totalRetirementAge - currentAge : 0

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold text-zus-black mb-4'>Krok 3: Wynagrodzenie i prognoza</h2>

			{/* Rok rozpoczęcia / wznowienia pracy */}
			<div>
				<label htmlFor='workStartYear' className='block text-sm font-medium text-zus-black mb-2'>
					Rok rozpoczęcia / wznowienia pracy:
				</label>
				<select
					id='workStartYear'
					value={formData.workStartYear}
					onChange={e => onInputChange('workStartYear', e.target.value ? parseInt(e.target.value) : '')}
					className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
					<option value=''>Wybierz rok</option>
					{Array.from({ length: currentYear - 1960 + 1 }, (_, i) => 1960 + i)
						.reverse()
						.map(year => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
				</select>
				{formData.workStartYear && (
					<p className='text-xs text-zus-dark-green mt-1'>
						Staż pracy: {currentYear - Number(formData.workStartYear)} lat
					</p>
				)}
			</div>

			{/* Miesięczne obecne wynagrodzenie brutto */}
			<div>
				<label htmlFor='currentGrossSalary' className='block text-sm font-medium text-zus-black mb-2'>
					Miesięczne obecne wynagrodzenie brutto: <span className='text-red-500'>*</span>
				</label>
				<div className='relative'>
					<input
						type='number'
						id='currentGrossSalary'
						min='0'
						step='0.01'
						value={formData.currentGrossSalary}
						onChange={e => onInputChange('currentGrossSalary', e.target.value ? parseFloat(e.target.value) : '')}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<div className='mt-2 space-y-1 text-xs text-zus-dark-green'>
					{formData.currentGrossSalary && (
						<>
							<p>Składka emerytalna miesięcznie: {(Number(formData.currentGrossSalary) * 0.1952).toFixed(2)} zł</p>
							{formData.currentSalaryPercentage && (
								<p>
									Twoje wynagrodzenie stanowi <strong>{formData.currentSalaryPercentage}%</strong> przeciętnego
									wynagrodzenia
								</p>
							)}
						</>
					)}
				</div>
			</div>

			{/* Członkostwo OFE */}
			<div>
				<label className='flex items-center space-x-3 p-4 border-2 border-zus-light-gray rounded-lg cursor-pointer hover:border-zus-green transition-colors'>
					<input
						type='checkbox'
						checked={formData.isOfeMember}
						onChange={e => onInputChange('isOfeMember', e.target.checked)}
						className='w-5 h-5 text-zus-green focus:ring-zus-green border-2 border-zus-light-gray rounded'
					/>
					<div>
						<span className='text-zus-black font-medium'>Jestem członkiem OFE lub mam subkonto</span>
						<p className='text-xs text-zus-dark-green'>
							Zaznacz, jeśli byłeś członkiem Otwartego Funduszu Emerytalnego
						</p>
					</div>
				</label>
			</div>

			{/* Procent przeciętnego wynagrodzenia w przyszłości */}
			<div>
				<label htmlFor='futureSalaryPercentage' className='block text-sm font-medium text-zus-black mb-2'>
					Procent przeciętnego wynagrodzenia w przyszłości:
				</label>
				<div className='relative'>
					<input
						type='number'
						id='futureSalaryPercentage'
						min='0'
						max='1000'
						step='1'
						value={formData.futureSalaryPercentage}
						onChange={e => onInputChange('futureSalaryPercentage', e.target.value ? parseFloat(e.target.value) : 100)}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='100'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>%</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Prognoza przyszłych zarobków względem przeciętnego wynagrodzenia w gospodarce (domyślnie 100%)
				</p>
			</div>

			{/* Prognoza składek */}
			{formData.currentGrossSalary && yearsToRetirement > 0 && (
				<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
					<h3 className='font-bold text-blue-800 mb-2'>📈 Prognoza przyszłych składek:</h3>
					<div className='space-y-1 text-sm text-blue-700'>
						<div className='flex justify-between'>
							<span>Lata do emerytury:</span>
							<span className='font-medium'>
								{Math.floor(yearsToRetirement)} lat {Math.round((yearsToRetirement % 1) * 12)} miesięcy
							</span>
						</div>
						<div className='flex justify-between'>
							<span>Obecna składka miesięczna:</span>
							<span className='font-medium'>{(Number(formData.currentGrossSalary) * 0.1952).toFixed(2)} zł</span>
						</div>
						<div className='flex justify-between'>
							<span>Prognozowana składka miesięczna:</span>
							<span className='font-medium'>
								{(
									Number(formData.currentGrossSalary) *
									0.1952 *
									(Number(formData.futureSalaryPercentage || 100) / 100)
								).toFixed(2)}{' '}
								zł
							</span>
						</div>
						<div className='flex justify-between'>
							<span>Przyszłe składki razem:</span>
							<span className='font-medium'>
								{(
									Number(formData.currentGrossSalary) *
									0.1952 *
									(Number(formData.futureSalaryPercentage || 100) / 100) *
									yearsToRetirement *
									12
								).toLocaleString('pl-PL')}{' '}
								zł
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Wyniki kalkulacji */}
			{formData.monthlyPension && formData.replacementRate && (
				<div className='bg-zus-green text-white p-6 rounded-lg'>
					<h3 className='text-xl font-bold mb-4'>🎯 Wyniki kalkulacji emerytury ZUS</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<div className='bg-white bg-opacity-20 rounded-lg p-4'>
							<h4 className='font-bold text-lg mb-2'>Miesięczna emerytura</h4>
							<p className='text-3xl font-bold'>{formData.monthlyPension.toLocaleString('pl-PL')} zł</p>
						</div>

						<div className='bg-white bg-opacity-20 rounded-lg p-4'>
							<h4 className='font-bold text-lg mb-2'>Stopa zastąpienia</h4>
							<p className='text-3xl font-bold'>{formData.replacementRate}%</p>
							<p className='text-sm opacity-90'>obecnego wynagrodzenia</p>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<div className='bg-white bg-opacity-20 rounded-lg p-4'>
							<h4 className='font-bold text-lg mb-2'>Całkowity kapitał</h4>
							<p className='text-2xl font-bold'>{formData.totalCapital?.toLocaleString('pl-PL')} zł</p>
						</div>

						<div className='bg-white bg-opacity-20 rounded-lg p-4'>
							<h4 className='font-bold text-lg mb-2'>Czas pobierania</h4>
							<p className='text-2xl font-bold'>
								{formData.lifeExpectancyMonths ? Math.round(formData.lifeExpectancyMonths / 12) : 0} lat
							</p>
							<p className='text-sm opacity-90'>średnie dalsze trwanie życia</p>
						</div>
					</div>

					<div className='space-y-2 text-sm opacity-90'>
						<div className='flex justify-between'>
							<span>Obecne wynagrodzenie brutto:</span>
							<span>{Number(formData.currentGrossSalary).toLocaleString('pl-PL')} zł</span>
						</div>
						<div className='flex justify-between'>
							<span>Różnica miesięczna:</span>
							<span>{(Number(formData.currentGrossSalary) - formData.monthlyPension).toLocaleString('pl-PL')} zł</span>
						</div>
						<div className='flex justify-between'>
							<span>Przewidywany wiek przejścia:</span>
							<span>
								{formData.retirementAgeYears} lat {formData.retirementAgeMonths} miesięcy
							</span>
						</div>
						{formData.currentSalaryPercentage && (
							<div className='flex justify-between'>
								<span>% przeciętnego wynagrodzenia:</span>
								<span>
									{formData.currentSalaryPercentage}% → {formData.futureSalaryPercentage}%
								</span>
							</div>
						)}
					</div>

					{/* Rekomendacje */}
					<div className='mt-4 p-4 bg-white bg-opacity-10 rounded-lg'>
						<h4 className='font-bold mb-2'>💡 Rekomendacje ZUS:</h4>
						<ul className='text-sm space-y-1'>
							{formData.replacementRate < 40 && <li>• Rozważ dodatkowe oszczędzanie na emeryturę (III filar)</li>}
							{formData.replacementRate < 50 && yearsToRetirement > 5 && (
								<li>• Możesz rozważyć późniejsze przejście na emeryturę</li>
							)}
							{formData.replacementRate > 60 && <li>• Dobra sytuacja emerytalna - kontynuuj obecną strategię</li>}
							{formData.isOfeMember && <li>• Uwzględniono środki z OFE/subkonta w kalkulacji</li>}
							{Number(formData.futureSalaryPercentage || 100) > 100 && (
								<li>• Prognoza zakłada wzrost zarobków względem przeciętnej</li>
							)}
						</ul>
					</div>
				</div>
			)}

			{/* Przycisk do przeliczenia */}
			{!formData.monthlyPension && formData.currentGrossSalary && formData.retirementAgeYears && (
				<button
					type='button'
					onClick={calculatePension}
					className='w-full px-6 py-4 bg-zus-dark-green hover:bg-green-800 text-white font-bold rounded-lg transition-colors'>
					🧮 Oblicz emeryturę według metodologii ZUS
				</button>
			)}
		</div>
	)
}
