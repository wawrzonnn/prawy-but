interface Step2Props {
	formData: {
		valorisedContributions: number | ''
		valorisedInitialCapital: number | ''
		valorisedSubaccountTotal: number | ''
		contributions12Months: number | ''
	}
	onInputChange: (field: string, value: string | number | boolean) => void
}

export default function Step2({ formData, onInputChange }: Step2Props) {
	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-bold text-zus-black mb-4'>Krok 2: Kapitał emerytalny</h2>

			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
				<p className='text-sm text-blue-800'>
					<strong>Wskazówka:</strong> Wszystkie kwoty znajdziesz w ostatniej informacji o stanie konta emerytalnego z
					ZUS. Jeśli nie masz tych danych, możesz pozostawić pola puste lub wpisać 0.
				</p>
			</div>

			{/* Kwota zwaloryzowanych składek */}
			<div>
				<label htmlFor='valorisedContributions' className='block text-sm font-medium text-zus-black mb-2'>
					Kwota zwaloryzowanych składek: <span className='text-red-500'>*</span>
				</label>
				<div className='relative'>
					<input
						type='number'
						id='valorisedContributions'
						min='0'
						step='0.01'
						value={formData.valorisedContributions}
						onChange={e => onInputChange('valorisedContributions', e.target.value ? parseFloat(e.target.value) : '')}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Suma wszystkich składek emerytalnych wpłaconych po 1999 roku wraz z waloryzacją
				</p>
			</div>

			{/* Kwota zwaloryzowanego kapitału początkowego */}
			<div>
				<label htmlFor='valorisedInitialCapital' className='block text-sm font-medium text-zus-black mb-2'>
					Kwota zwaloryzowanego kapitału początkowego:
				</label>
				<div className='relative'>
					<input
						type='number'
						id='valorisedInitialCapital'
						min='0'
						step='0.01'
						value={formData.valorisedInitialCapital}
						onChange={e => onInputChange('valorisedInitialCapital', e.target.value ? parseFloat(e.target.value) : 0)}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Kapitał za okres pracy przed 1999 rokiem (jeśli dotyczy, domyślnie 0)
				</p>
			</div>

			{/* Zwaloryzowana kwota ogółem na subkoncie */}
			<div>
				<label htmlFor='valorisedSubaccountTotal' className='block text-sm font-medium text-zus-black mb-2'>
					Zwaloryzowana kwota ogółem na subkoncie:
				</label>
				<div className='relative'>
					<input
						type='number'
						id='valorisedSubaccountTotal'
						min='0'
						step='0.01'
						value={formData.valorisedSubaccountTotal}
						onChange={e => onInputChange('valorisedSubaccountTotal', e.target.value ? parseFloat(e.target.value) : 0)}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Środki z OFE przeniesione na subkonto w ZUS (jeśli dotyczy, domyślnie 0)
				</p>
			</div>

			{/* Kwota składek za 12 miesięcy kalendarzowych */}
			<div>
				<label htmlFor='contributions12Months' className='block text-sm font-medium text-zus-black mb-2'>
					Kwota składek za 12 miesięcy kalendarzowych:
				</label>
				<div className='relative'>
					<input
						type='number'
						id='contributions12Months'
						min='0'
						step='0.01'
						value={formData.contributions12Months}
						onChange={e => onInputChange('contributions12Months', e.target.value ? parseFloat(e.target.value) : '')}
						className='w-full px-4 py-3 pr-12 border-2 border-zus-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-zus-green focus:border-transparent text-zus-black text-lg'
						placeholder='0.00'
					/>
					<span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-zus-dark-green font-medium'>
						zł
					</span>
				</div>
				<p className='text-xs text-zus-dark-green mt-1'>
					Składki emerytalne wpłacone w ostatnim roku kalendarzowym (z informacji ZUS)
				</p>
			</div>

			{/* Podsumowanie kapitału */}
			<div className='bg-zus-light-gray p-4 rounded-lg'>
				<h3 className='font-bold text-zus-black mb-3'>Podsumowanie obecnego kapitału emerytalnego:</h3>
				<div className='space-y-2 text-sm'>
					<div className='flex justify-between'>
						<span>Zwaloryzowane składki:</span>
						<span className='font-medium'>
							{formData.valorisedContributions
								? `${Number(formData.valorisedContributions).toLocaleString('pl-PL')} zł`
								: '0,00 zł'}
						</span>
					</div>
					<div className='flex justify-between'>
						<span>Kapitał początkowy:</span>
						<span className='font-medium'>
							{Number(formData.valorisedInitialCapital || 0).toLocaleString('pl-PL')} zł
						</span>
					</div>
					<div className='flex justify-between'>
						<span>Środki na subkoncie:</span>
						<span className='font-medium'>
							{Number(formData.valorisedSubaccountTotal || 0).toLocaleString('pl-PL')} zł
						</span>
					</div>
					<div className='flex justify-between'>
						<span>Składki za ostatni rok:</span>
						<span className='font-medium'>
							{formData.contributions12Months
								? `${Number(formData.contributions12Months).toLocaleString('pl-PL')} zł`
								: '0,00 zł'}
						</span>
					</div>
					<hr className='border-zus-dark-green my-2' />
					<div className='flex justify-between font-bold text-zus-black text-base'>
						<span>Obecny kapitał razem:</span>
						<span>
							{(
								Number(formData.valorisedContributions || 0) +
								Number(formData.valorisedInitialCapital || 0) +
								Number(formData.valorisedSubaccountTotal || 0)
							).toLocaleString('pl-PL')}{' '}
							zł
						</span>
					</div>
				</div>
			</div>

			{/* Informacja o składkach */}
			{formData.contributions12Months && (
				<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
					<h4 className='font-bold text-green-800 mb-2'>📊 Analiza składek:</h4>
					<div className='space-y-1 text-sm text-green-700'>
						<div className='flex justify-between'>
							<span>Składki za ostatni rok:</span>
							<span className='font-medium'>{Number(formData.contributions12Months).toLocaleString('pl-PL')} zł</span>
						</div>
						<div className='flex justify-between'>
							<span>Przeciętna składka miesięczna:</span>
							<span className='font-medium'>{(Number(formData.contributions12Months) / 12).toFixed(2)} zł</span>
						</div>
						<div className='flex justify-between'>
							<span>Szacunkowe wynagrodzenie brutto:</span>
							<span className='font-medium'>
								{(Number(formData.contributions12Months) / 12 / 0.1952).toFixed(2)} zł
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
