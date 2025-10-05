'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { db, PensionData } from '@/lib/db'
import { Download, LogOut, ArrowUpDown, X, Users, TrendingUp, BarChart3, Calendar, AlertCircle } from 'lucide-react'
import * as XLSX from 'xlsx'

export default function AdminPanel() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [data, setData] = useState<PensionData[]>([])
	const [filteredData, setFilteredData] = useState<PensionData[]>([])
	const [filters, setFilters] = useState({
		dateFrom: '',
		dateTo: '',
		gender: 'all' as 'all' | 'male' | 'female',
		sickLeave: 'all' as 'all' | 'with' | 'without',
	})
	const [sortConfig, setSortConfig] = useState<{
		key: keyof PensionData | null
		direction: 'asc' | 'desc'
	}>({ key: null, direction: 'asc' })
	const [stats, setStats] = useState({
		total: 0,
		maleCount: 0,
		femaleCount: 0,
		avgExpectedPension: 0,
		avgActualPension: 0,
		medianPension: 0,
		avgAge: 0,
		withSickLeave: 0,
	})

	useEffect(() => {
		const auth = sessionStorage.getItem('adminAuth')
		if (auth === 'authenticated') {
			setIsAuthenticated(true)
			loadData()
		}
	}, [])

	useEffect(() => {
		applyFilters()
	}, [filters, data, sortConfig])

	const loadData = async () => {
		try {
			const allData = await db.pensionData.toArray()
			// Sortuj po dacie (najnowsze pierwsze)
			allData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			setData(allData)
			setFilteredData(allData)
			calculateStats(allData)
			console.log('W11 dane pobrane z bazy')
		} catch (error) {
			console.log('W12 blad pobierania danych')
		}
	}

	const applyFilters = () => {
		let filtered = [...data]

		// Filtr daty
		if (filters.dateFrom) {
			const fromDate = new Date(filters.dateFrom)
			filtered = filtered.filter(d => new Date(d.createdAt) >= fromDate)
		}
		if (filters.dateTo) {
			const toDate = new Date(filters.dateTo)
			toDate.setHours(23, 59, 59, 999)
			filtered = filtered.filter(d => new Date(d.createdAt) <= toDate)
		}

		// Filtr płci
		if (filters.gender !== 'all') {
			filtered = filtered.filter(d => d.gender === filters.gender)
		}

		// Filtr zwolnień
		if (filters.sickLeave === 'with') {
			filtered = filtered.filter(d => d.includeSickLeave)
		} else if (filters.sickLeave === 'without') {
			filtered = filtered.filter(d => !d.includeSickLeave)
		}

		// Sortowanie
		if (sortConfig.key) {
			filtered.sort((a, b) => {
				const aValue = a[sortConfig.key!]
				const bValue = b[sortConfig.key!]

				if (aValue === undefined || aValue === null) return 1
				if (bValue === undefined || bValue === null) return -1

				if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
				if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
				return 0
			})
		}

		setFilteredData(filtered)
		calculateStats(filtered)
	}

	const calculateStats = (data: PensionData[]) => {
		const total = data.length
		const maleCount = data.filter(d => d.gender === 'male').length
		const femaleCount = data.filter(d => d.gender === 'female').length

		// Średnie dla kalkulacji które mają wyniki
		const withResults = data.filter(d => d.monthlyPension)
		const avgActualPension =
			withResults.length > 0 ? withResults.reduce((sum, d) => sum + (d.monthlyPension || 0), 0) / withResults.length : 0

		// Mediana
		let medianPension = 0
		if (withResults.length > 0) {
			const sorted = withResults.map(d => d.monthlyPension || 0).sort((a, b) => a - b)
			const mid = Math.floor(sorted.length / 2)
			medianPension = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
		}

		// Średni wiek
		const avgAge = total > 0 ? Math.round(data.reduce((sum, d) => sum + d.age, 0) / total) : 0

		const withSickLeave = data.filter(d => d.includeSickLeave).length

		setStats({
			total,
			maleCount,
			femaleCount,
			avgExpectedPension: 0,
			avgActualPension: Math.round(avgActualPension),
			medianPension: Math.round(medianPension),
			avgAge,
			withSickLeave,
		})
	}

	const handleSort = (key: keyof PensionData) => {
		setSortConfig(prev => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}))
	}

	const clearFilters = () => {
		setFilters({
			dateFrom: '',
			dateTo: '',
			gender: 'all',
			sickLeave: 'all',
		})
	}

	const getDailyStats = () => {
		const dailyMap = new Map<string, number>()
		data.forEach(item => {
			const date = new Date(item.createdAt).toLocaleDateString('pl-PL')
			dailyMap.set(date, (dailyMap.get(date) || 0) + 1)
		})
		return Array.from(dailyMap.entries())
			.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
			.slice(-7) // ostatnie 7 dni
	}

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		setLoginError('')

		// Proste hasło - w produkcji użyj prawdziwego auth
		if (password === 'zus2025') {
			sessionStorage.setItem('adminAuth', 'authenticated')
			setIsAuthenticated(true)
			loadData()
		} else {
			setLoginError('Nieprawidłowe hasło. Spróbuj ponownie.')
		}
	}

	const handleLogout = () => {
		sessionStorage.removeItem('adminAuth')
		setIsAuthenticated(false)
		setPassword('')
	}

	const exportToXLS = () => {
		// Przygotuj dane do arkusza
		const worksheetData = [
			// Nagłówki
			[
				'Data użycia',
				'Godzina użycia',
				'Emerytura oczekiwana',
				'Wiek',
				'Płeć',
				'Wysokość wynagrodzenia',
				'Czy uwzględniał okresy choroby',
				'Wysokość zgromadzonych środków na koncie',
				'Wysokość zgromadzonych środków na subkoncie',
				'Emerytura rzeczywista',
				'Emerytura urealniona',
				'Kod pocztowy',
			],
			// Dane
			...filteredData.map(d => {
				const date = new Date(d.createdAt)
				return [
					date.toLocaleDateString('pl-PL'),
					date.toLocaleTimeString('pl-PL'),
					'', // Emerytura oczekiwana - nie mamy
					d.age,
					d.gender === 'male' ? 'Mężczyzna' : 'Kobieta',
					d.grossSalary,
					d.includeSickLeave ? 'Tak' : 'Nie',
					d.zusAccountBalance || 0,
					d.zusSubaccountBalance || 0,
					d.monthlyPension || '',
					d.realMonthlyPension || '',
					d.postalCode || '',
				]
			}),
		]

		// Utwórz arkusz
		const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

		// Ustaw szerokości kolumn
		worksheet['!cols'] = [
			{ wch: 12 }, // Data
			{ wch: 10 }, // Godzina
			{ wch: 18 }, // Emerytura oczekiwana
			{ wch: 6 }, // Wiek
			{ wch: 12 }, // Płeć
			{ wch: 20 }, // Wynagrodzenie
			{ wch: 28 }, // Choroby
			{ wch: 35 }, // Konto
			{ wch: 35 }, // Subkonto
			{ wch: 20 }, // Emerytura rzeczywista
			{ wch: 18 }, // Urealniona
			{ wch: 12 }, // Kod pocztowy
		]

		// Utwórz workbook
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Symulacje')

		// Eksportuj do pliku
		XLSX.writeFile(workbook, `raport_symulator_${new Date().toISOString().split('T')[0]}.xlsx`)
	}

	if (!isAuthenticated) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center p-4'>
				<Card className='p-6 max-w-md w-full border-0 bg-white shadow-sm'>
					<div className='text-center mb-6'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto mx-auto mb-4' />
						<h1 className='text-xl font-bold text-foreground'>Panel Administratora</h1>
						<p className='text-xs text-muted-foreground mt-2'>Symulator Emerytalny ZUS</p>
					</div>
					<form onSubmit={handleLogin} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-foreground mb-2'>Hasło</label>
							<input
								type='password'
								value={password}
								onChange={e => {
									setPassword(e.target.value)
									setLoginError('') // Wyczyść błąd przy wpisywaniu
								}}
								className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
									loginError ? 'border-red-500 focus:ring-red-500' : 'border-gray-100 focus:ring-primary'
								}`}
								placeholder='Wprowadź hasło'
								required
							/>
							{loginError && (
								<p className='mt-2 text-sm text-red-600 flex items-center gap-1'>
									<AlertCircle className='w-4 h-4' />
									{loginError}
								</p>
							)}
						</div>
						<Button
							type='submit'
							className='w-full bg-[var(--zus-green-primary)] text-white hover:bg-[var(--zus-green-primary)]/90'>
							Zaloguj się
						</Button>
					</form>
				</Card>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='bg-white/95 backdrop-blur-sm border-b border-gray-100'>
				<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto' />
						<div>
							<h1 className='text-lg font-bold text-foreground'>Panel Administratora</h1>
							<p className='text-xs text-muted-foreground'>Raportowanie zainteresowania</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Button onClick={exportToXLS} size='sm' className='bg-yellow hover:bg-blue-dark text-yellow-foreground'>
							<Download className='w-4 h-4 mr-2' />
							Eksportuj do XLS
						</Button>
						<Button onClick={handleLogout} variant='ghost' size='sm' className='hover:bg-muted/50'>
							<LogOut className='w-4 h-4 mr-2' />
							Wyloguj
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-6 max-w-7xl'>
				{/* Statystyki - karty */}
				<div className='grid grid-cols-4 gap-4 mb-6'>
					<Card className='p-4 border-0 bg-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs text-muted-foreground mb-1'>Wszystkie kalkulacje</p>
								<p className='text-2xl font-bold text-foreground'>{stats.total}</p>
							</div>
							<Users className='w-8 h-8 text-primary/20' />
						</div>
					</Card>

					<Card className='p-4 border-0 bg-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs text-muted-foreground mb-1'>Średni wiek</p>
								<p className='text-2xl font-bold text-foreground'>{stats.avgAge} lat</p>
								<p className='text-xs text-muted-foreground mt-1'>
									{stats.maleCount}M / {stats.femaleCount}K
								</p>
							</div>
							<Calendar className='w-8 h-8 text-blue-500/20' />
						</div>
					</Card>

					<Card className='p-4 border-0 bg-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs text-muted-foreground mb-1'>Średnia emerytura</p>
								<p className='text-2xl font-bold text-[var(--zus-green-primary)]'>
									{stats.avgActualPension.toLocaleString('pl-PL')} zł
								</p>
								<p className='text-xs text-muted-foreground mt-1'>
									mediana: {stats.medianPension.toLocaleString('pl-PL')} zł
								</p>
							</div>
							<TrendingUp className='w-8 h-8 text-green-500/20' />
						</div>
					</Card>

					<Card className='p-4 border-0 bg-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs text-muted-foreground mb-1'>Ze zwolnieniami</p>
								<p className='text-2xl font-bold text-foreground'>{stats.withSickLeave}</p>
								<p className='text-xs text-muted-foreground mt-1'>
									{stats.total > 0 ? Math.round((stats.withSickLeave / stats.total) * 100) : 0}% z wszystkich
								</p>
							</div>
							<BarChart3 className='w-8 h-8 text-orange-500/20' />
						</div>
					</Card>
				</div>

				{/* Filtry */}
				<Card className='p-4 border-0 bg-white mb-6'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<span className='text-sm font-medium text-foreground'>Filtruj:</span>
							<div className='flex items-center gap-2'>
								<input
									type='date'
									value={filters.dateFrom}
									onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
									placeholder='Data od'
									className='px-3 py-2 text-xs border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary'
								/>
								<span className='text-xs text-muted-foreground'>—</span>
								<input
									type='date'
									value={filters.dateTo}
									onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
									placeholder='Data do'
									className='px-3 py-2 text-xs border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary'
								/>
							</div>
							<select
								value={filters.gender}
								onChange={e => setFilters({ ...filters, gender: e.target.value as any })}
								className='px-3 py-2 text-xs border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary'>
								<option value='all'>Wszystkie płcie</option>
								<option value='male'>Mężczyźni</option>
								<option value='female'>Kobiety</option>
							</select>
							<select
								value={filters.sickLeave}
								onChange={e => setFilters({ ...filters, sickLeave: e.target.value as any })}
								className='px-3 py-2 text-xs border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary'>
								<option value='all'>Wszystkie</option>
								<option value='with'>Ze zwolnieniami</option>
								<option value='without'>Bez zwolnień</option>
							</select>
						</div>
						{(filters.dateFrom || filters.dateTo || filters.gender !== 'all' || filters.sickLeave !== 'all') && (
							<Button onClick={clearFilters} variant='outline' size='sm' className='text-xs'>
								<X className='w-3 h-3 mr-1' />
								Wyczyść filtry
							</Button>
						)}
					</div>
				</Card>

				{/* Tabela danych */}
				<Card className='p-5 border-0 bg-white'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-base font-bold text-foreground'>
							{filteredData.length === data.length
								? `Wszystkie kalkulacje (${filteredData.length})`
								: `Wyniki filtrowania (${filteredData.length} z ${data.length})`}
						</h2>
						<div className='flex items-center gap-2 text-xs text-muted-foreground'>
							<span>Sortuj:</span>
							<button
								onClick={() => handleSort('createdAt')}
								className={`px-2 py-1 rounded hover:bg-muted/50 ${sortConfig.key === 'createdAt' ? 'text-primary font-medium' : ''}`}>
								Data
							</button>
							<button
								onClick={() => handleSort('monthlyPension')}
								className={`px-2 py-1 rounded hover:bg-muted/50 ${sortConfig.key === 'monthlyPension' ? 'text-primary font-medium' : ''}`}>
								Emerytura
							</button>
						</div>
					</div>
					<div className='overflow-x-auto'>
						<table className='w-full text-sm'>
							<thead>
								<tr className='border-b border-gray-100'>
									<th className='text-left py-2 px-2 font-medium text-muted-foreground text-xs'>Data</th>
									<th className='text-left py-2 px-2 font-medium text-muted-foreground text-xs'>Godz.</th>
									<th className='text-right py-2 px-2 font-medium text-muted-foreground text-xs'>Wiek</th>
									<th className='text-left py-2 px-2 font-medium text-muted-foreground text-xs'>Płeć</th>
									<th className='text-right py-2 px-2 font-medium text-muted-foreground text-xs'>Wynagrodzenie</th>
									<th className='text-center py-2 px-2 font-medium text-muted-foreground text-xs'>Choroby</th>
									<th className='text-right py-2 px-2 font-medium text-muted-foreground text-xs'>Kapitał ZUS</th>
									<th className='text-right py-2 px-2 font-medium text-muted-foreground text-xs'>Emerytura</th>
									<th className='text-right py-2 px-2 font-medium text-muted-foreground text-xs'>Urealniona</th>
									<th className='text-left py-2 px-2 font-medium text-muted-foreground text-xs'>Kod poczt.</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-50'>
								{filteredData.length === 0 ? (
									<tr>
										<td colSpan={10} className='py-6 text-center text-muted-foreground text-sm'>
											Brak danych do wyświetlenia
										</td>
									</tr>
								) : (
									filteredData.map(item => (
										<tr key={item.id} className='hover:bg-muted/30 transition-colors'>
											<td className='py-2 px-2 text-xs'>{new Date(item.createdAt).toLocaleDateString('pl-PL')}</td>
											<td className='py-2 px-2 text-xs'>
												{new Date(item.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
											</td>
											<td className='text-right py-2 px-2'>{item.age}</td>
											<td className='py-2 px-2'>{item.gender === 'male' ? 'M' : 'K'}</td>
											<td className='text-right py-2 px-2 font-medium'>
												{item.grossSalary.toLocaleString('pl-PL')} zł
											</td>
											<td className='text-center py-2 px-2'>{item.includeSickLeave ? '✓' : '—'}</td>
											<td className='text-right py-2 px-2 text-xs'>
												{((item.zusAccountBalance || 0) + (item.zusSubaccountBalance || 0)).toLocaleString('pl-PL')} zł
											</td>
											<td className='text-right py-2 px-2 font-medium text-[var(--zus-green-primary)]'>
												{item.monthlyPension ? `${item.monthlyPension.toLocaleString('pl-PL')} zł` : '—'}
											</td>
											<td className='text-right py-2 px-2 text-blue-600'>
												{item.realMonthlyPension ? `${item.realMonthlyPension.toLocaleString('pl-PL')} zł` : '—'}
											</td>
											<td className='py-2 px-2 text-xs'>{item.postalCode || '—'}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</Card>

				{/* Info */}
				<div className='mt-6 text-center text-xs text-muted-foreground'>
					<p>Dane przechowywane lokalnie w przeglądarce użytkownika (IndexedDB)</p>
					<p className='mt-1'>Ostatnia aktualizacja: {new Date().toLocaleString('pl-PL')}</p>
				</div>
			</div>
		</div>
	)
}
