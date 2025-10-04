'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { db, PensionData } from '@/lib/db'
import { Download, LogOut, Users, TrendingUp, PieChart, BarChart3 } from 'lucide-react'

export default function AdminPanel() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [password, setPassword] = useState('')
	const [data, setData] = useState<PensionData[]>([])
	const [filteredData, setFilteredData] = useState<PensionData[]>([])
	const [stats, setStats] = useState({
		total: 0,
		maleCount: 0,
		femaleCount: 0,
		avgExpectedPension: 0,
		avgActualPension: 0,
		withSickLeave: 0,
	})

	useEffect(() => {
		const auth = sessionStorage.getItem('adminAuth')
		if (auth === 'authenticated') {
			setIsAuthenticated(true)
			loadData()
		}
	}, [])

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

	const calculateStats = (data: PensionData[]) => {
		const total = data.length
		const maleCount = data.filter(d => d.gender === 'male').length
		const femaleCount = data.filter(d => d.gender === 'female').length

		// Średnie dla kalkulacji które mają wyniki
		const withResults = data.filter(d => d.monthlyPension)
		const avgActualPension =
			withResults.length > 0 ? withResults.reduce((sum, d) => sum + (d.monthlyPension || 0), 0) / withResults.length : 0

		const withSickLeave = data.filter(d => d.includeSickLeave).length

		setStats({
			total,
			maleCount,
			femaleCount,
			avgExpectedPension: 0, // To będzie z landing page jeśli dodamy
			avgActualPension: Math.round(avgActualPension),
			withSickLeave,
		})
	}

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		// Proste hasło - w produkcji użyj prawdziwego auth
		if (password === 'zus2025') {
			sessionStorage.setItem('adminAuth', 'authenticated')
			setIsAuthenticated(true)
			loadData()
		} else {
			alert('Nieprawidłowe hasło')
		}
	}

	const handleLogout = () => {
		sessionStorage.removeItem('adminAuth')
		setIsAuthenticated(false)
		setPassword('')
	}

	const exportToXLS = () => {
		// Nagłówki zgodnie z wymaganiami
		const headers = [
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
		]

		// Konwersja danych do CSV (kompatybilne z Excel)
		const csvContent = [
			headers.join(';'),
			...filteredData.map(d => {
				const date = new Date(d.createdAt)
				return [
					date.toLocaleDateString('pl-PL'),
					date.toLocaleTimeString('pl-PL'),
					'', // Emerytura oczekiwana - nie mamy tej informacji
					d.age,
					d.gender === 'male' ? 'Mężczyzna' : 'Kobieta',
					d.grossSalary,
					d.includeSickLeave ? 'Tak' : 'Nie',
					d.zusAccountBalance || 0,
					d.zusSubaccountBalance || 0,
					d.monthlyPension || '',
					d.realMonthlyPension || '',
					d.postalCode || '',
				].join(';')
			}),
		].join('\n')

		// BOM dla polskich znaków
		const BOM = '\uFEFF'
		const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = `raport_symulator_${new Date().toISOString().split('T')[0]}.csv`
		link.click()
	}

	if (!isAuthenticated) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center p-4'>
				<Card className='p-8 max-w-md w-full'>
					<div className='text-center mb-6'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto mx-auto mb-4' />
						<h1 className='text-2xl font-bold text-foreground'>Panel Administratora</h1>
						<p className='text-sm text-muted-foreground mt-2'>Symulator Emerytalny ZUS</p>
					</div>
					<form onSubmit={handleLogin} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-foreground mb-2'>Hasło</label>
							<input
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								placeholder='Wprowadź hasło'
								required
							/>
						</div>
						<Button type='submit' className='w-full bg-primary text-primary-foreground'>
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
			<header className='bg-white border-b border-gray-200'>
				<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto' />
						<div>
							<h1 className='text-xl font-bold text-foreground'>Panel Administratora</h1>
							<p className='text-xs text-muted-foreground'>Raportowanie zainteresowania</p>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<Button onClick={exportToXLS} size='sm' className='bg-yellow hover:bg-blue-dark text-yellow-foreground'>
							<Download className='w-4 h-4 mr-2' />
							Eksportuj do XLS
						</Button>
						<Button onClick={handleLogout} variant='ghost' size='sm'>
							<LogOut className='w-4 h-4 mr-2' />
							Wyloguj
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-8'>
				{/* Statystyki */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
					<Card className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
								<Users className='w-6 h-6 text-primary' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Liczba kalkulacji</p>
								<p className='text-3xl font-bold text-foreground'>{stats.total}</p>
							</div>
						</div>
					</Card>

					<Card className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
								<PieChart className='w-6 h-6 text-blue-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Podział płci</p>
								<p className='text-2xl font-bold text-foreground'>
									{stats.maleCount}M / {stats.femaleCount}K
								</p>
							</div>
						</div>
					</Card>

					<Card className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
								<TrendingUp className='w-6 h-6 text-green-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Średnia emerytura</p>
								<p className='text-2xl font-bold text-foreground'>
									{stats.avgActualPension.toLocaleString('pl-PL')} zł
								</p>
							</div>
						</div>
					</Card>

					<Card className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center'>
								<BarChart3 className='w-6 h-6 text-orange-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Ze zwolnieniami</p>
								<p className='text-3xl font-bold text-foreground'>{stats.withSickLeave}</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Tabela danych */}
				<Card className='p-6'>
					<h2 className='text-xl font-bold text-foreground mb-6'>Wszystkie kalkulacje ({filteredData.length})</h2>
					<div className='overflow-x-auto'>
						<table className='w-full text-sm'>
							<thead>
								<tr className='border-b'>
									<th className='text-left py-3 px-2 font-medium text-muted-foreground'>Data</th>
									<th className='text-left py-3 px-2 font-medium text-muted-foreground'>Godz.</th>
									<th className='text-right py-3 px-2 font-medium text-muted-foreground'>Wiek</th>
									<th className='text-left py-3 px-2 font-medium text-muted-foreground'>Płeć</th>
									<th className='text-right py-3 px-2 font-medium text-muted-foreground'>Wynagrodzenie</th>
									<th className='text-center py-3 px-2 font-medium text-muted-foreground'>Choroby</th>
									<th className='text-right py-3 px-2 font-medium text-muted-foreground'>Kapitał ZUS</th>
									<th className='text-right py-3 px-2 font-medium text-muted-foreground'>Emerytura</th>
									<th className='text-right py-3 px-2 font-medium text-muted-foreground'>Urealniona</th>
									<th className='text-left py-3 px-2 font-medium text-muted-foreground'>Kod poczt.</th>
								</tr>
							</thead>
							<tbody className='divide-y'>
								{filteredData.length === 0 ? (
									<tr>
										<td colSpan={10} className='py-8 text-center text-muted-foreground'>
											Brak danych do wyświetlenia
										</td>
									</tr>
								) : (
									filteredData.map(item => (
										<tr key={item.id} className='hover:bg-muted/50 transition-colors'>
											<td className='py-3 px-2'>{new Date(item.createdAt).toLocaleDateString('pl-PL')}</td>
											<td className='py-3 px-2'>
												{new Date(item.createdAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
											</td>
											<td className='text-right py-3 px-2'>{item.age}</td>
											<td className='py-3 px-2'>{item.gender === 'male' ? '👨 M' : '👩 K'}</td>
											<td className='text-right py-3 px-2 font-medium'>
												{item.grossSalary.toLocaleString('pl-PL')} zł
											</td>
											<td className='text-center py-3 px-2'>{item.includeSickLeave ? '✓' : '—'}</td>
											<td className='text-right py-3 px-2'>
												{((item.zusAccountBalance || 0) + (item.zusSubaccountBalance || 0)).toLocaleString('pl-PL')} zł
											</td>
											<td className='text-right py-3 px-2 font-bold text-green-600'>
												{item.monthlyPension ? `${item.monthlyPension.toLocaleString('pl-PL')} zł` : '—'}
											</td>
											<td className='text-right py-3 px-2 text-blue-600'>
												{item.realMonthlyPension ? `${item.realMonthlyPension.toLocaleString('pl-PL')} zł` : '—'}
											</td>
											<td className='py-3 px-2 text-xs'>{item.postalCode || '—'}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</Card>

				{/* Info */}
				<div className='mt-6 text-center text-sm text-muted-foreground'>
					<p>Dane przechowywane lokalnie w przeglądarce użytkownika (IndexedDB)</p>
					<p className='mt-2'>Ostatnia aktualizacja: {new Date().toLocaleString('pl-PL')}</p>
				</div>
			</div>
		</div>
	)
}
