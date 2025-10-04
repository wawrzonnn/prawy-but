interface Step2Props {
	formData: {
		zusAccountBalance?: number | ''
		zusSubaccountBalance?: number | ''
		includeSickLeave: boolean
		gender: 'male' | 'female' | ''
	}
	onInputChange: (field: string, value: string | number | boolean) => void
}

export default function Step2({ formData, onInputChange }: Step2Props) {
	// Dane statystyczne zwolnień lekarskich w Polsce
	const getSickLeaveStats = () => {
		if (formData.gender === 'female') {
			return {
				averageDays: 12,
				description: 'Kobiety przebywają średnio 12 dni rocznie na zwolnieniach lekarskich',
			}
		} else if (formData.gender === 'male') {
			return {
				averageDays: 9,
				description: 'Mężczyźni przebywają średnio 9 dni rocznie na zwolnieniach lekarskich',
			}
		}
		return {
			averageDays: 10.5,
			description: 'Przeciętnie pracujący przebywa około 10-11 dni rocznie na zwolnieniach lekarskich',
		}
	}

	const sickLeaveStats = getSickLeaveStats()

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold text-zus-black mb-4'>Krok 2: Dane fakultatywne</h2>

			<div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
				<p className='text-sm text-green-800'>
					<strong>Informacja:</strong> Wszystkie pola w tym kroku są opcjonalne. Jeśli nie znasz dokładnych kwot,
					symulator oszacuje je na podstawie podanych wcześniej danych o wynagrodzeniu i stażu pracy.
				</p>
			</div>

			{/* Wysokość zgromadzonych środków na koncie w ZUS */}
			<div>
				<label htmlFor='zusAccountBalance' className='block text-sm font-medium text-zus-black mb-2'>
					Wysokość zgromadzonych środków na koncie w ZUS:
				</label>
				<div className='relative'>
					<input
						type='number'
						id='zusAccountBalance'
						min='0'
						step='0.01'
						value={formData.zusAccountBalance}
						onChange={e => onInputChange('zusAccountBalance', e.target.value ? parseFloat(e.target.value) : '')}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00 (opcjonalne)'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Kwota zgromadzona na koncie emerytalnym w ZUS (można znaleźć w informacji o stanie konta)
				</p>
			</div>

			{/* Wysokość zgromadzonych środków na subkoncie w ZUS */}
			<div>
				<label htmlFor='zusSubaccountBalance' className='block text-sm font-medium text-zus-black mb-2'>
					Wysokość zgromadzonych środków na subkoncie w ZUS:
				</label>
				<div className='relative'>
					<input
						type='number'
						id='zusSubaccountBalance'
						min='0'
						step='0.01'
						value={formData.zusSubaccountBalance}
						onChange={e => onInputChange('zusSubaccountBalance', e.target.value ? parseFloat(e.target.value) : '')}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00 (opcjonalne)'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>Środki przeniesione z OFE na subkonto w ZUS (jeśli dotyczy)</p>
			</div>

			{/* Podsumowanie wprowadzonych środków */}
			{(formData.zusAccountBalance || formData.zusSubaccountBalance) && (
				<div className='bg-zus-light-gray p-4 rounded-lg'>
					<h3 className='font-bold text-zus-black mb-3'>Podsumowanie zgromadzonych środków w ZUS:</h3>
					<div className='space-y-2 text-sm'>
						<div className='flex justify-between'>
							<span>Środki na koncie głównym:</span>
							<span className='font-medium'>
								{formData.zusAccountBalance
									? `${Number(formData.zusAccountBalance).toLocaleString('pl-PL')} zł`
									: '0,00 zł'}
							</span>
						</div>
						<div className='flex justify-between'>
							<span>Środki na subkoncie:</span>
							<span className='font-medium'>
								{formData.zusSubaccountBalance
									? `${Number(formData.zusSubaccountBalance).toLocaleString('pl-PL')} zł`
									: '0,00 zł'}
							</span>
						</div>
						<hr className='border-zus-dark-green my-2' />
						<div className='flex justify-between font-bold text-zus-black text-base'>
							<span>Razem zgromadzone środki:</span>
							<span>
								{(Number(formData.zusAccountBalance || 0) + Number(formData.zusSubaccountBalance || 0)).toLocaleString(
									'pl-PL'
								)}{' '}
								zł
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Opcja uwzględnienia zwolnień lekarskich */}
			<div>
				<label className='flex items-start space-x-3 p-4 border-2 border-zus-light-gray rounded-lg cursor-pointer hover:border-zus-green transition-colors'>
					<input
						type='checkbox'
						checked={formData.includeSickLeave}
						onChange={e => onInputChange('includeSickLeave', e.target.checked)}
						className='w-5 h-5 text-zus-green focus:ring-zus-green border-2 border-zus-light-gray rounded mt-1'
					/>
					<div className='flex-1'>
						<span className='text-zus-black font-medium block mb-2'>Uwzględniaj możliwość zwolnień lekarskich</span>
						<p className='text-xs text-zus-dark-green mb-3'>
							Symulacja uwzględni średnią długość zwolnień lekarskich w ciągu życia zawodowego
						</p>

						{/* Informacje o zwolnieniach lekarskich */}
						<div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
							<h4 className='font-bold text-blue-800 mb-2'>📊 Statystyki zwolnień lekarskich w Polsce:</h4>
							<div className='space-y-1 text-sm text-blue-700'>
								<p>{sickLeaveStats.description}</p>
								<p>
									<strong>Wpływ na świadczenie:</strong> Przeciętnie obniża emeryturę o około{' '}
									{((sickLeaveStats.averageDays / 365) * 100).toFixed(1)}% z powodu nieopłacanych składek
								</p>
								<p className='text-xs mt-2 text-blue-600'>
									* Dane oparte na statystykach GUS dotyczących absencji chorobowej w Polsce
								</p>
							</div>
						</div>
					</div>
				</label>
			</div>

			{/* Dodatkowe informacje o wpływie zwolnień */}
			{formData.includeSickLeave && (
				<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
					<h4 className='font-bold text-yellow-800 mb-2'>⚠️ Wpływ zwolnień lekarskich na emeryturę:</h4>
					<div className='space-y-2 text-sm text-yellow-700'>
						<p>
							Podczas zwolnienia lekarskiego nie są opłacane składki emerytalne, co wpływa na wysokość przyszłej
							emerytury.
						</p>
						<p>
							<strong>Uwzględnione w symulacji:</strong>
						</p>
						<ul className='list-disc list-inside ml-4 space-y-1'>
							<li>Średnia długość zwolnień: {sickLeaveStats.averageDays} dni rocznie</li>
							<li>Redukcja kapitału emerytalnego o {((sickLeaveStats.averageDays / 365) * 100).toFixed(1)}%</li>
							<li>Obliczenia uwzględniają całą karierę zawodową</li>
						</ul>
					</div>
				</div>
			)}

			{/* Informacja o oszacowaniu */}
			{!formData.zusAccountBalance && !formData.zusSubaccountBalance && (
				<div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
					<h4 className='font-bold text-gray-800 mb-2'>🔍 Oszacowanie środków</h4>
					<p className='text-sm text-gray-700'>
						Ponieważ nie podano dokładnych kwot zgromadzonych w ZUS, symulator automatycznie oszacuje wysokość środków
						na podstawie:
					</p>
					<ul className='list-disc list-inside ml-4 mt-2 space-y-1 text-sm text-gray-600'>
						<li>Podanego wynagrodzenia brutto</li>
						<li>Roku rozpoczęcia pracy (stażu zawodowego)</li>
						<li>Średniego wzrostu wynagrodzeń w Polsce (3% rocznie)</li>
						<li>Stawki składki emerytalnej (19,52%)</li>
					</ul>
				</div>
			)}
		</div>
	)
}
