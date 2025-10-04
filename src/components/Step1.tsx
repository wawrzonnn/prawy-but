interface Step1Props {
	formData: {
		age: number | ''
		gender: 'male' | 'female' | ''
		grossSalary: number | ''
		workStartYear: number | ''
		plannedRetirementYear: number | ''
	}
	onInputChange: (field: string, value: string | number | boolean) => void
}

export default function Step1({ formData, onInputChange }: Step1Props) {
	const currentYear = new Date().getFullYear()
	const minRetirementAge = formData.gender === 'female' ? 60 : 65

	// Automatyczne ustawienie planowanego roku zakończenia pracy na podstawie wieku i płci
	const calculatePlannedRetirementYear = () => {
		if (formData.age && formData.gender) {
			const retirementAge = formData.gender === 'female' ? 60 : 65
			const birthYear = currentYear - Number(formData.age)
			return birthYear + retirementAge
		}
		return ''
	}

	// Aktualizuj planowany rok emerytury gdy zmienia się wiek lub płeć
	const handleAgeOrGenderChange = (field: string, value: string | number | boolean) => {
		onInputChange(field, value)

		// Automatycznie ustaw planowany rok zakończenia pracy
		if (field === 'age' || field === 'gender') {
			setTimeout(() => {
				const plannedYear = calculatePlannedRetirementYear()
				if (plannedYear) {
					onInputChange('plannedRetirementYear', plannedYear)
				}
			}, 100)
		}
	}

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold text-zus-black mb-4'>Krok 1: Dane podstawowe (obowiązkowe)</h2>

			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
				<p className='text-sm text-blue-800'>
					<strong>Informacja:</strong> Wszystkie pola w tym kroku są obowiązkowe do prognozy emerytury.
				</p>
			</div>

			{/* Wiek */}
			<div>
				<label htmlFor='age' className='block text-sm font-medium text-zus-black mb-2'>
					Wiek (w latach): <span className='text-red-500'>*</span>
				</label>
				<input
					type='number'
					id='age'
					min='18'
					max='67'
					value={formData.age}
					onChange={e => handleAgeOrGenderChange('age', e.target.value ? parseInt(e.target.value) : '')}
					className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
					placeholder='Podaj swój aktualny wiek'
				/>
				<p className='text-xs text-zus-dark-green mt-1'>Aktualny wiek w pełnych latach</p>
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
							onChange={e => handleAgeOrGenderChange('gender', e.target.value)}
							className='mr-3 text-zus-green focus:ring-zus-green'
						/>
						<div>
							<span className='text-zus-black font-medium'>Mężczyzna</span>
							<p className='text-xs text-zus-dark-green'>Wiek emerytalny: 65 lat</p>
						</div>
					</label>
					<label className='flex items-center p-4 border-2 border-zus-light-gray rounded-lg cursor-pointer hover:border-zus-green transition-colors'>
						<input
							type='radio'
							name='gender'
							value='female'
							checked={formData.gender === 'female'}
							onChange={e => handleAgeOrGenderChange('gender', e.target.value)}
							className='mr-3 text-zus-green focus:ring-zus-green'
						/>
						<div>
							<span className='text-zus-black font-medium'>Kobieta</span>
							<p className='text-xs text-zus-dark-green'>Wiek emerytalny: 60 lat</p>
						</div>
					</label>
				</div>
			</div>

			{/* Wysokość wynagrodzenia brutto */}
			<div>
				<label htmlFor='grossSalary' className='block text-sm font-medium text-zus-black mb-2'>
					Wysokość wynagrodzenia brutto (miesięcznie): <span className='text-red-500'>*</span>
				</label>
				<div className='relative'>
					<input
						type='number'
						id='grossSalary'
						min='0'
						step='0.01'
						value={formData.grossSalary}
						onChange={e => onInputChange('grossSalary', e.target.value ? parseFloat(e.target.value) : '')}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Aktualne miesięczne wynagrodzenie brutto (przed odliczeniami)
				</p>
				{formData.grossSalary && (
					<div className='mt-2 p-3 bg-green-50 border border-green-200 rounded-lg'>
						<p className='text-sm text-green-800'>
							<strong>Składka emerytalna miesięcznie:</strong> {(Number(formData.grossSalary) * 0.1952).toFixed(2)} zł
						</p>
					</div>
				)}
			</div>

			{/* Rok rozpoczęcia pracy */}
			<div>
				<label htmlFor='workStartYear' className='block text-sm font-medium text-zus-black mb-2'>
					Rok rozpoczęcia pracy: <span className='text-red-500'>*</span>
				</label>
				<select
					id='workStartYear'
					value={formData.workStartYear}
					onChange={e => onInputChange('workStartYear', e.target.value ? parseInt(e.target.value) : '')}
					className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
					<option value=''>Wybierz rok rozpoczęcia pracy</option>
					{Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i)
						.reverse()
						.map(year => (
							<option key={year} value={year}>
								{year} (styczeń)
							</option>
						))}
				</select>
				<p className='text-xs text-zus-dark-green mt-1'>
					Rok rozpoczęcia pierwszej pracy zawodowej (zawsze styczeń zgodnie z wymaganiami)
				</p>
				{formData.workStartYear && (
					<div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
						<p className='text-sm text-blue-800'>
							<strong>Staż pracy do dziś:</strong> {currentYear - Number(formData.workStartYear)} lat
						</p>
					</div>
				)}
			</div>

			{/* Planowany rok zakończenia aktywności zawodowej */}
			<div>
				<label htmlFor='plannedRetirementYear' className='block text-sm font-medium text-zus-black mb-2'>
					Planowany rok zakończenia aktywności zawodowej: <span className='text-red-500'>*</span>
				</label>
				<select
					id='plannedRetirementYear'
					value={formData.plannedRetirementYear}
					onChange={e => onInputChange('plannedRetirementYear', e.target.value ? parseInt(e.target.value) : '')}
					className='w-full px-4 py-3 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black'>
					<option value=''>Wybierz rok zakończenia pracy</option>
					{Array.from({ length: 50 }, (_, i) => currentYear + i).map(year => (
						<option key={year} value={year}>
							{year} (styczeń)
						</option>
					))}
				</select>
				<p className='text-xs text-zus-dark-green mt-1'>
					Planowany rok przejścia na emeryturę (zawsze styczeń zgodnie z wymaganiami)
				</p>

				{/* Automatyczne ustawienie na podstawie wieku emerytalnego */}
				{formData.age && formData.gender && (
					<div className='mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
						<p className='text-sm text-yellow-800'>
							<strong>Sugerowany rok emerytury:</strong> {calculatePlannedRetirementYear()}
							{formData.plannedRetirementYear &&
								Number(formData.plannedRetirementYear) < Number(calculatePlannedRetirementYear()) && (
									<span className='text-red-600 block mt-1'>
										⚠️ Wybrany rok jest wcześniejszy niż minimalny wiek emerytalny ({minRetirementAge} lat)
									</span>
								)}
						</p>
					</div>
				)}

				{formData.workStartYear && formData.plannedRetirementYear && (
					<div className='mt-2 p-3 bg-green-50 border border-green-200 rounded-lg'>
						<p className='text-sm text-green-800'>
							<strong>Całkowity staż pracy:</strong>{' '}
							{Number(formData.plannedRetirementYear) - Number(formData.workStartYear)} lat
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
