interface Step1Props {
	formData: {
		lastZusInfoYear: number | ''
		gender: 'male' | 'female' | ''
		birthMonth: number | ''
		birthYear: number | ''
		retirementAgeYears: number | ''
		retirementAgeMonths: number | ''
	}
	onInputChange: (field: string, value: string | number | boolean) => void
}

export default function Step1({ formData, onInputChange }: Step1Props) {
	const currentYear = new Date().getFullYear()
	const minRetirementAge = formData.gender === 'female' ? 60 : 65

	// Generuj lata dla dropdown (ostatnie 5 lat)
	const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i)

	// Generuj miesiące
	const months = [
		'styczeń',
		'luty',
		'marzec',
		'kwiecień',
		'maj',
		'czerwiec',
		'lipiec',
		'sierpień',
		'wrzesień',
		'październik',
		'listopad',
		'grudzień',
	]

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold text-zus-black mb-4'>Krok 1: Podstawowe dane</h2>

			{/* Rok ostatniej informacji ZUS */}
			<div>
				<label htmlFor='lastZusInfoYear' className='block text-sm font-medium text-zus-black mb-2'>
					Ostatnia Informacja o stanie konta w ZUS za rok: <span className='text-red-500'>*</span>
				</label>
				<select
					id='lastZusInfoYear'
					value={formData.lastZusInfoYear}
					onChange={e => onInputChange('lastZusInfoYear', e.target.value ? parseInt(e.target.value) : '')}
					className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
					<option value=''>Wybierz rok</option>
					{availableYears.map(year => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
				<p className='text-xs text-zus-dark-green mt-1'>
					Wybierz rok, za który masz ostatnią informację o stanie konta emerytalnego
				</p>
			</div>

			{/* Płeć */}
			<div>
				<label className='block text-sm font-medium text-zus-black mb-3'>
					Płeć: <span className='text-red-500'>*</span>
				</label>
				<div className='grid grid-cols-2 gap-4'>
					<label className='flex items-center p-4 border-2 border-zus-light-gray rounded-lg cursor-pointer hover:border-zus-green transition-colors'>
						<input
							type='radio'
							name='gender'
							value='male'
							checked={formData.gender === 'male'}
							onChange={e => onInputChange('gender', e.target.value)}
							className='mr-3 text-zus-green focus:ring-zus-green'
						/>
						<div>
							<span className='text-zus-black font-medium'>Mężczyzna</span>
							<p className='text-xs text-zus-dark-green'>Min. wiek emerytalny: 65 lat</p>
						</div>
					</label>
					<label className='flex items-center p-4 border-2 border-zus-light-gray rounded-lg cursor-pointer hover:border-zus-green transition-colors'>
						<input
							type='radio'
							name='gender'
							value='female'
							checked={formData.gender === 'female'}
							onChange={e => onInputChange('gender', e.target.value)}
							className='mr-3 text-zus-green focus:ring-zus-green'
						/>
						<div>
							<span className='text-zus-black font-medium'>Kobieta</span>
							<p className='text-xs text-zus-dark-green'>Min. wiek emerytalny: 60 lat</p>
						</div>
					</label>
				</div>
			</div>

			{/* Miesiąc i rok urodzenia */}
			<div>
				<label className='block text-sm font-medium text-zus-black mb-3'>
					Miesiąc i rok urodzenia: <span className='text-red-500'>*</span>
				</label>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<select
							value={formData.birthMonth}
							onChange={e => onInputChange('birthMonth', e.target.value ? parseInt(e.target.value) : '')}
							className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
							<option value=''>Wybierz miesiąc</option>
							{months.map((month, index) => (
								<option key={index + 1} value={index + 1}>
									{month}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							type='number'
							min='1940'
							max={currentYear - 18}
							value={formData.birthYear}
							onChange={e => onInputChange('birthYear', e.target.value ? parseInt(e.target.value) : '')}
							className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'
							placeholder='Rok urodzenia'
						/>
					</div>
				</div>
			</div>

			{/* Deklarowany wiek przejścia na emeryturę */}
			<div>
				<label className='block text-sm font-medium text-zus-black mb-3'>
					Deklarowany wiek przejścia na emeryturę w latach i miesiącach: <span className='text-red-500'>*</span>
				</label>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block text-xs text-zus-dark-green mb-1'>Lata:</label>
						<select
							value={formData.retirementAgeYears}
							onChange={e => onInputChange('retirementAgeYears', e.target.value ? parseInt(e.target.value) : '')}
							className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
							<option value=''>Wybierz wiek</option>
							{Array.from({ length: 11 }, (_, i) => minRetirementAge + i).map(age => (
								<option key={age} value={age}>
									{age} lat
								</option>
							))}
						</select>
					</div>
					<div>
						<label className='block text-xs text-zus-dark-green mb-1'>Miesiące:</label>
						<select
							value={formData.retirementAgeMonths}
							onChange={e => onInputChange('retirementAgeMonths', e.target.value ? parseInt(e.target.value) : 0)}
							className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
							{Array.from({ length: 12 }, (_, i) => (
								<option key={i} value={i}>
									{i} miesięcy
								</option>
							))}
						</select>
					</div>
				</div>
				{formData.birthYear && formData.retirementAgeYears && (
					<div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
						<p className='text-sm text-blue-800'>
							<strong>Przewidywane przejście na emeryturę:</strong>{' '}
							{Number(formData.birthYear) + Number(formData.retirementAgeYears)} rok
							{formData.retirementAgeMonths &&
								Number(formData.retirementAgeMonths) > 0 &&
								`, ${formData.retirementAgeMonths} miesięcy`}
						</p>
						{formData.retirementAgeYears < minRetirementAge && (
							<p className='text-sm text-red-600 mt-1'>
								⚠️ Wiek poniżej minimalnego wieku emerytalnego ({minRetirementAge} lat)
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
