'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Calculator,
	TrendingUp,
	PiggyBank,
	Calendar,
	Target,
	Wallet,
	LineChart,
	Users,
	Award,
	AlertCircle,
	Lightbulb,
	BarChart3,
} from 'lucide-react'

const funFacts = [
	'Czy wiesz, że najwyższa emerytura w Polsce wynosi ponad 48 000 zł miesięcznie? Otrzymuje ją emerytowany górnik z województwa śląskiego, który przepracował 42 lata.',
	'Średni wiek przejścia na emeryturę w Polsce to 61 lat dla kobiet i 63 lata dla mężczyzn, choć ustawowy wiek emerytalny to 60/65 lat.',
	'Każdy rok dłuższej pracy zwiększa wysokość emerytury średnio o 5–7%. Odroczenie emerytury o 5 lat może zwiększyć świadczenie nawet o 30–35%.',
	'W Polsce jest ponad 9 milionów emerytów, a przeciętna emerytura wynosi około 3 500 zł brutto.',
	'Średnia emerytura wypłacana przez ZUS w 2023 roku wynosiła 3 270,23 zł, a sama emerytura starcza – 3 389,49 zł.',
	'W Polsce miesięcznie świadczenia emerytalne z ZUS otrzymuje około 7,9 miliona osób.',
	'Polski system emerytalny opiera się na trzech filarach: obowiązkowych (I i II) oraz dobrowolnym (III – np. IKE, IKZE).',
	'Składka emerytalna wynosi 19,52% podstawy wymiaru i jest współdzielona przez pracownika i pracodawcę.',
	'Kobiety mogą otrzymywać tymczasową emeryturę z subkonta do czasu osiągnięcia wieku 65 lat – w 2023 roku wypłacano ok. 502 tys. takich świadczeń miesięcznie.',
	'Osoby z niewystarczającym stażem składkowym mogą otrzymać gwarantowaną emeryturę minimalną, jeśli pracowały co najmniej 20 lat (kobiety) lub 25 lat (mężczyźni).',
	'Rolnicy korzystają z odrębnego systemu emerytalnego KRUS, który obejmuje osoby prowadzące gospodarstwa rolne.',
	'Emerytura socjalna przysługuje osobom całkowicie niezdolnym do pracy z powodu choroby powstałej przed 18. rokiem życia – w 2023 roku korzystało z niej ponad 293 tys. osób.',
	'Od 2021 roku w Polsce wypłacana jest coroczna „czternasta emerytura” – dodatkowe świadczenie równe kwocie minimalnej emerytury brutto (z limitem dochodowym).',
	'W Polsce nadal funkcjonują dwa równoległe systemy emerytalne: stary (dla osób urodzonych przed 1949 r.) i nowy (po reformie z 1999 r).',
]

export default function Home() {
	const [selectedPensionAmount, setSelectedPensionAmount] = useState<number | null>(null)
	const [desiredPension, setDesiredPension] = useState<string>('5000')
	const [desiredPensionDisplay, setDesiredPensionDisplay] = useState<string>('5 000')
	const [isChartVisible, setIsChartVisible] = useState(false)
	const [isClient, setIsClient] = useState(false)
	const [chartType, setChartType] = useState<'bar' | 'pie'>('pie')
	const [chartKey, setChartKey] = useState(0)
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
	const [isSpinning, setIsSpinning] = useState(false)
	const [currentFact, setCurrentFact] = useState('')
	const chartSectionRef = useRef<HTMLDivElement>(null)
	const realityCheckRef = useRef<HTMLDivElement>(null)
	const howItWorksRef = useRef<HTMLDivElement>(null)
	const featuresRef = useRef<HTMLDivElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

	const pensionGroups = [
		{
			range: 'Do 2 000 zł',
			average: '1 650 zł',
			percentage: '15%',
			description:
				'Świadczeniobiorcy otrzymujący emeryturę poniżej minimalnej wykazywali się niską aktywnością zawodową. Nie przepracowali minimum 25 lat dla mężczyzn i 20 lat dla kobiet, w związku z tym nie nabyli prawa do gwarancji minimalnej emerytury.',
		},
		{
			range: '2 001 - 3 500 zł',
			average: '2 550 zł',
			percentage: '30%',
			description:
				'Największa grupa emerytów w Polsce. Osoby te przepracowały wymagany okres, ale ich wynagrodzenia były na poziomie zbliżonym do średniej krajowej lub niższym.',
		},
		{
			range: '3 501 - 5 000 zł',
			average: '3 700 zł',
			percentage: '40%',
			description:
				'Emeryci z tej grupy pracowali przez długi okres i zarabiali powyżej średniej krajowej. Regularnie odprowadzali składki emerytalne przez co najmniej 30-35 lat.',
		},
		{
			range: 'Powyżej 5 000 zł',
			average: '5 800 zł',
			percentage: '15%',
			description:
				'Najwyższe emerytury otrzymują osoby, które przez całe życie zawodowe zarabiały znacznie powyżej średniej krajowej, pracowały przez 35-40 lat bez przerw i nie korzystały często ze zwolnień lekarskich.',
		},
	]

	useEffect(() => {
		setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)])
	}, [])

	// Strip the hash and reset scroll on hard refresh of /#reality-check
	useEffect(() => {
		if (typeof window !== 'undefined' && window.location.hash === '#reality-check') {
			history.replaceState(null, '', window.location.pathname + window.location.search)
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
		}
	}, [])

	// Function to randomize fact with spinning animation (avoid repeating same fact)
	const randomizeFact = () => {
		setIsSpinning(true)
		setTimeout(() => {
			const availableFacts = funFacts.filter(fact => fact !== currentFact)
			const newFact = availableFacts[Math.floor(Math.random() * availableFacts.length)]
			setCurrentFact(newFact)
			setIsSpinning(false)
		}, 800)
	}

	// Reset and trigger animation when chart type changes
	useEffect(() => {
		setChartKey(prev => prev + 1)
		setIsChartVisible(false)
		const timer = setTimeout(() => setIsChartVisible(true), 100)
		return () => clearTimeout(timer)
	}, [chartType])

	// Set isClient to true on component mount
	useEffect(() => {
		setIsClient(true)
	}, [])

	// Track mouse position for tooltip
	const handleMouseMove = (e: React.MouseEvent) => {
		setTooltipPosition({
			x: e.clientX,
			y: e.clientY,
		})
	}

	// Intersection Observer for all sections
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const sectionName = entry.target.getAttribute('data-section')
						if (sectionName) {
							setVisibleSections(prev => new Set(prev).add(sectionName))
						}
						// Special handling for chart section
						if (sectionName === 'charts' && !isChartVisible) {
							setIsChartVisible(true)
						}
					}
				})
			},
			{
				threshold: 0.15,
				rootMargin: '0px',
			}
		)

		const refs = [realityCheckRef, howItWorksRef, featuresRef, chartSectionRef, ctaRef]
		refs.forEach(ref => {
			if (ref.current) {
				observer.observe(ref.current)
			}
		})

		return () => {
			refs.forEach(ref => {
				if (ref.current) {
					observer.unobserve(ref.current)
				}
			})
		}
	}, [isChartVisible])

	// Format number with spaces as thousand separator
	const formatNumber = (num: number | string): string => {
		const str = num.toString()
		if (str.length <= 3) return str
		return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	// Chart calculations to prevent hydration mismatch
	const chartCalculations = useMemo(() => {
		return pensionGroups.map((group, index) => {
			const percentage = parseInt(group.percentage)
			const colors = ['var(--zus-blue-dark)', 'var(--zus-green-primary)', 'var(--zus-yellow)', 'var(--zus-blue)']

			// Calculate cumulative percentage for positioning
			const prevPercentages = pensionGroups.slice(0, index).reduce((sum, g) => sum + parseInt(g.percentage), 0)

			const startAngle = (prevPercentages / 100) * 360 - 90
			const endAngle = ((prevPercentages + percentage) / 100) * 360 - 90
			const midAngle = (startAngle + endAngle) / 2
			const largeArc = percentage > 50 ? 1 : 0

			// Convert to radians
			const startRad = (startAngle * Math.PI) / 180
			const endRad = (endAngle * Math.PI) / 180
			const midRad = (midAngle * Math.PI) / 180

			// Calculate path for donut - larger size
			const outerRadius = 140
			const innerRadius = 80
			const x1 = outerRadius * Math.cos(startRad)
			const y1 = outerRadius * Math.sin(startRad)
			const x2 = outerRadius * Math.cos(endRad)
			const y2 = outerRadius * Math.sin(endRad)
			const x3 = innerRadius * Math.cos(endRad)
			const y3 = innerRadius * Math.sin(endRad)
			const x4 = innerRadius * Math.cos(startRad)
			const y4 = innerRadius * Math.sin(startRad)

			const pathData = `
        M ${x1} ${y1}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
        Z
      `

			// Line starts from outer edge of donut (exactly at the edge)
			const lineStartRadius = 140
			const lineStartX = lineStartRadius * Math.cos(midRad)
			const lineStartY = lineStartRadius * Math.sin(midRad)

			// Line middle point (further out)
			const lineMidRadius = 155
			const lineMidX = lineMidRadius * Math.cos(midRad)
			const lineMidY = lineMidRadius * Math.sin(midRad)

			// Horizontal line end position
			const horizontalLength = 40
			const lineEndX = lineMidX + (lineMidX > 0 ? horizontalLength : -horizontalLength)
			const lineEndY = lineMidY

			// Text position
			const textOffset = lineMidX > 0 ? 5 : -5
			const textAnchor = lineMidX > 0 ? 'start' : 'end'

			return {
				percentage,
				color: colors[index],
				prevPercentages,
				startAngle,
				endAngle,
				midAngle,
				largeArc,
				startRad,
				endRad,
				midRad,
				pathData,
				lineStartX,
				lineStartY,
				lineMidX,
				lineMidY,
				lineEndX,
				lineEndY,
				textOffset,
				textAnchor,
			}
		})
	}, [pensionGroups])

	// Oblicz rzeczywistą emeryturę (stopa zastąpienia ~50%)
	const calculateRealPension = () => {
		const desired = parseFloat(desiredPension)
		if (!desired || desired <= 0) return 0
		const replacementRate = 0.4 // 35% stopa zastąpienia
		return Math.round(desired * replacementRate)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200'>
				<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
					<Link href='/' className='flex items-center gap-3'>
						<Image src='/logozus.svg' alt='ZUS Logo' width={120} height={32} className='h-8 w-auto' />
					</Link>
					<a href='#reality-check' className='scroll-smooth'>
						<Button
							size='lg'
							className='bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out cursor-pointer'>
							Oblicz swoją emeryturę
						</Button>
					</a>
				</div>
			</header>

			{/* Hero Section - Question about expected pension */}
			<section className='min-h-[90dvh] py-32 md:py-0 md:h-[90dvh] flex items-center px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='flex flex-col md:flex-row w-full gap-12 md:gap-8'>
						{/* Lewa część: tekst + guzik */}
						<div className='w-full md:w-[40%] flex flex-col justify-center items-start space-y-6'>
							<h2 className='text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]'>
								Sprawdź na jaką emeryturę dziś pracujesz
							</h2>

							<p className='text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]'>
								Twoja przyszła emerytura nie musi być zagadką! Zrozum system, poznaj liczby i przejmij kontrolę nad
								swoją finansową przyszłością.
							</p>

<<<<<<< Updated upstream
							<div className='flex flex-col sm:flex-row gap-4 justify-start items-start pt-6 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]'>
								<a href='#reality-check' className='scroll-smooth'>
									<Button
										size='lg'
										className='bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow text-lg px-8 py-6 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out cursor-pointer'>
										Oblicz swoją emeryturę
										<Calculator className='ml-2 w-5 h-5' />
									</Button>
								</a>
							</div>
						</div>
=======
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-start pt-6 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                <a href="#reality-check" className="scroll-smooth">
                  <Button
                    size="lg"
                    className="bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow text-lg px-8 py-6 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out cursor-pointer"
                  >
                    Oblicz swoją emeryturę
                    <Calculator className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Prawa część: video demo */}
            <div className="w-full md:w-[60%] relative flex justify-center items-center mt-12 md:mt-0">
              <div className="relative w-full max-w-xl">
                {/* Efekt tła - koło */}
                <div className="absolute z-0 w-56 h-56 md:w-80 md:h-80 bg-yellow/20 rounded-full blur-3xl animate-pulse -top-10 left-1/2 -translate-x-1/2"></div>
                     
                {/* Video demo z kalkulatorem */}
                <div className="relative z-10 shadow-2xl rounded-xl overflow-hidden border-4 border-white opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.playbackRate = 2.1;
                    }}
                  >
                    <source src="/recordingnew.mov" type="video/quicktime" />
                    <source src="/recordingnew.mov" type="video/mp4" />
                    Twoja przeglądarka nie wspiera odtwarzania wideo.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
>>>>>>> Stashed changes

						{/* Prawa część: obrazy z kalkulatorem */}
						<div className='w-full md:w-[60%] relative flex justify-center items-center mt-12 md:mt-0'>
							<div className='relative w-full max-w-xl h-[300px] md:h-[450px]'>
								{/* Efekt tła - koło */}
								<div
									className='absolute z-0 w-56 h-56 md:w-80 md:h-80 bg-yellow/20 rounded-full blur-3xl animate-pulse'
									style={{ left: '30%', top: '25%' }}></div>

								{/* Symulacja (teraz z tyłu) */}
								<div
									className='absolute z-10 shadow-xl rounded-xl overflow-hidden border-4 border-white transition-all duration-1000 hover:-translate-y-2 opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]'
									style={{ width: '85%', left: '5%', top: '20%' }}>
									<Image
										src='/symulacja_emerytalna_demo.png'
										alt='Symulacja emerytalna'
										width={500}
										height={300}
										className='w-full h-auto'
										priority
									/>
								</div>

								{/* Kalkulator (teraz z przodu) */}
								<div
									className='absolute z-20 shadow-xl rounded-xl overflow-hidden border-4 border-white transition-all duration-1000 hover:translate-y-2 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]'
									style={{ width: '80%', right: '5%', top: '50%' }}>
									<Image
										src='/kalkulator_emerytalny_demo.png'
										alt='Kalkulator emerytalny'
										width={500}
										height={300}
										className='w-full h-auto'
										priority
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Reality Check Section */}
			<section
				id='reality-check'
				className='pt-24 pb-20 px-4 bg-[var(--zus-green-primary)] text-white scroll-mt-12'
				ref={realityCheckRef}
				data-section='reality'>
				<div className='container mx-auto max-w-5xl'>
					<div
						className={`text-center mb-12 transition-all duration-700 ${visibleSections.has('reality') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<h3 className='text-3xl md:text-4xl font-bold mb-4'>Oczekiwania vs. Rzeczywistość</h3>
						<p className='text-xl text-white/90'>
							Większość ludzi nie zdaje sobie sprawy, jak duża jest różnica między ich oczekiwaniami a rzeczywistością
						</p>
					</div>

					<div className='grid md:grid-cols-2 gap-8'>
						<Card
							className={`p-8 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-700 delay-150 ${visibleSections.has('reality') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
							<div className='flex items-center gap-3 mb-6'>
								<Target className='w-8 h-8 text-yellow flex-shrink-0' />
								<label htmlFor='desired-pension-input' className='text-xl font-bold text-white'>
									Chciałbym otrzymać:
								</label>
							</div>
							<div className='flex items-baseline gap-4 mb-6'>
								<input
									id='desired-pension-input'
									type='text'
									inputMode='numeric'
									value={desiredPensionDisplay}
									onChange={e => {
										// Remove all non-digit characters and spaces
										const rawValue = e.target.value.replace(/\D/g, '')

										if (rawValue === '') {
											setDesiredPension('')
											setDesiredPensionDisplay('')
											return
										}

										const numValue = parseInt(rawValue)

										// Apply limits
										if (numValue > 100000) {
											setDesiredPension('100000')
											setDesiredPensionDisplay(formatNumber(100000))
										} else {
											setDesiredPension(rawValue)
											// Format with spaces for thousands
											setDesiredPensionDisplay(formatNumber(numValue))
										}
									}}
									onKeyDown={e => {
										if (
											e.key === 'ArrowUp' ||
											e.key === 'ArrowDown' ||
											e.key === 'e' ||
											e.key === 'E' ||
											e.key === '+' ||
											e.key === '-'
										) {
											e.preventDefault()
										}
									}}
									onWheel={e => e.currentTarget.blur()}
									className='text-5xl font-bold bg-transparent border-b-2 border-white/40 pb-2 text-white placeholder-white/50 focus:outline-none focus:border-yellow transition-all w-full leading-tight'
									placeholder='5 000'
									aria-label='Oczekiwana kwota emerytury w złotych'
								/>
								<span className='text-5xl font-bold text-white/80 whitespace-nowrap leading-tight' aria-hidden='true'>
									zł
								</span>
							</div>
							<p className='text-base text-white/70 leading-relaxed'>
								Wprowadź kwotę emerytury, którą chciałbyś otrzymywać miesięcznie (max. 100 000 zł).
							</p>
						</Card>

						<Card
							className={`p-8 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-700 delay-300 ${visibleSections.has('reality') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
							<div className='flex items-center gap-3 mb-6'>
								<AlertCircle className='w-8 h-8 text-yellow flex-shrink-0' />
								<h4 className='text-xl font-bold text-white'>Rzeczywiście otrzymam:</h4>
							</div>
							<div className='flex items-baseline gap-4 mb-6'>
								<div className='text-5xl font-bold text-white w-full pb-2 border-b-2 border-white/40 leading-tight'>
									~{formatNumber(calculateRealPension())}
								</div>
								<span className='text-5xl font-bold text-white/80 whitespace-nowrap leading-tight'>zł</span>
							</div>
							<p className='text-base text-white/70 leading-relaxed'>
								Przy stopie zastąpienia 40% - przeciętna emerytura w Polsce wynosi około 40-45% ostatniego wynagrodzenia
							</p>
						</Card>
					</div>

					<div
						className={`mt-12 text-center transition-all duration-700 delay-500 ${visibleSections.has('reality') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<Link href='/form'>
							<Button
								size='lg'
								className='bg-yellow hover:bg-white text-yellow-foreground hover:text-blue-dark text-base md:text-xl px-6 md:px-12 py-4 md:py-7 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out cursor-pointer'>
								Przejdź do kalkulatora emerytury
								<Calculator className='ml-2 w-6 h-6' />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* How it Works Section */}
			<section className='py-40 px-4' ref={howItWorksRef} data-section='howItWorks'>
				<div className='container mx-auto max-w-6xl'>
					<div
						className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('howItWorks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<h3 className='text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance'>Jak to działa?</h3>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
							Trzy proste kroki do poznania swojej przyszłej emerytury
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-10 md:gap-14'>
						{[
							{
								step: '01',
								title: 'Wprowadź dane do formularza',
								description:
									'Podaj podstawowe informacje: wiek, płeć, wynagrodzenie, planowany wiek emerytury oraz opcjonalnie dane z konta ZUS',
							},
							{
								step: '02',
								title: 'Dostosuj parametry',
								description:
									'Uwzględnij zwolnienia lekarskie, różne scenariusze wynagrodzeń i zobacz wpływ odroczenia emerytury',
							},
							{
								step: '03',
								title: 'Poznaj wynik',
								description:
									'Otrzymaj szczegółową prognozę: emeryturę rzeczywistą, urealnioną, stopę zastąpienia i porównanie ze średnią',
							},
						].map((item, index) => (
							<div
								key={index}
								className={`relative transition-all duration-700 ${visibleSections.has('howItWorks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
								style={{ transitionDelay: `${200 + index * 150}ms` }}>
								<div className='text-6xl font-medium text-[#c4e8d8] mb-5'>{item.step}</div>
								<h4 className='text-2xl font-bold text-foreground mb-3'>{item.title}</h4>
								<p className='text-muted-foreground leading-relaxed'>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 px-4 bg-muted' ref={featuresRef} data-section='features'>
				<div className='container mx-auto max-w-6xl'>
					<div
						className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<h3 className='text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance'>
							Wszystko, czego potrzebujesz w jednym miejscu
						</h3>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
							Zaawansowany kalkulator, który pomoże Ci zrozumieć i zaplanować Twoją emeryturę
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[
							{
								icon: Calculator,
								title: 'Wysokość emerytury',
								description:
									'Oblicz przewidywaną wysokość świadczenia emerytalnego w wartości rzeczywistej i urealnionej',
							},
							{
								icon: LineChart,
								title: 'Stopa zastąpienia',
								description: 'Zobacz, jaki procent Twojego wynagrodzenia będzie stanowić Twoja emerytura',
							},
							{
								icon: Calendar,
								title: 'Scenariusze przejścia',
								description:
									'Symuluj różne warianty wieku przejścia na emeryturę i zobacz wpływ na wysokość świadczenia',
							},
							{
								icon: TrendingUp,
								title: 'Wzrost kapitału',
								description: 'Śledź, jak zwiększa się kwota zgromadzona na Twoim koncie i subkoncie w ZUS',
							},
							{
								icon: Users,
								title: 'Wpływ zwolnień lekarskich',
								description: 'Uwzględnij średnią długość zwolnień i zobacz, jak wpływają na wysokość emerytury',
							},
							{
								icon: Target,
								title: 'Porównanie ze średnią',
								description: 'Porównaj swoją prognozowaną emeryturę ze średnim świadczeniem w roku przejścia',
							},
						].map((feature, index) => (
							<Card
								key={index}
								className={`p-6 hover:scale-[1.02] bg-card border ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
								style={{
									transitionDelay: visibleSections.has('features') ? `${200 + index * 100}ms` : '0ms',
									transition: 'opacity 700ms, transform 700ms, scale 250ms ease-out',
								}}>
								<div className='w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4'>
									<feature.icon className='w-6 h-6 text-primary' />
								</div>
								<h4 className='text-xl font-bold text-foreground mb-2'>{feature.title}</h4>
								<p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Pension Groups Comparison Section */}
			<section className='py-40 px-4' ref={chartSectionRef} data-section='charts'>
				<div className='container mx-auto max-w-6xl'>
					{/* Pension Groups Comparison - Interactive Section */}
					<div
						className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('charts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<h3 className='text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance'>
							ZUS w liczbach i ciekawostkach
						</h3>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
							Sprawdź, co naprawdę kryje się za emeryturą
						</p>
					</div>
					<div
						className={`transition-all duration-700 delay-200 ${visibleSections.has('charts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<Card className='p-5 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2'>
							<div className='text-center mb-6'>
								<h3 className='text-xl md:text-2xl font-bold text-foreground mb-1.5'>
									Jak kształtują się emerytury w Polsce
								</h3>
								<p className='text-xs md:text-sm text-muted-foreground mb-3'>Najedź na pasek, aby zobaczyć szczegóły</p>

								{/* Chart type toggle */}
								<div className='flex items-center justify-center gap-2'>
									<button
										onClick={() => setChartType('pie')}
										className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
											chartType === 'pie'
												? 'bg-primary text-primary-foreground shadow-sm'
												: 'bg-muted text-muted-foreground hover:bg-muted/80'
										}`}>
										<PiggyBank className='w-3 h-3 inline mr-1' />
										Kołowy
									</button>
									<button
										onClick={() => setChartType('bar')}
										className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
											chartType === 'bar'
												? 'bg-primary text-primary-foreground shadow-sm'
												: 'bg-muted text-muted-foreground hover:bg-muted/80'
										}`}>
										<BarChart3 className='w-3 h-3 inline mr-1' />
										Słupkowy
									</button>
								</div>
							</div>

							{/* Horizontal Bar Chart */}
							{chartType === 'bar' && (
								<div
									key={`bar-${chartKey}`}
									className='mb-6 space-y-3 h-[320px]'
									onMouseMove={handleMouseMove}
									onMouseLeave={() => setSelectedPensionAmount(null)}>
									{pensionGroups.map((group, index) => {
										const percentage = parseInt(group.percentage)
										// Using only ZUS brand colors - each bar different color
										const colors = [
											'bg-[var(--zus-blue-dark)]',
											'bg-[var(--zus-green-primary)]',
											'bg-[var(--zus-yellow)]',
											'bg-[var(--zus-blue)]',
										]

										return (
											<div
												key={index}
												className='group cursor-pointer'
												onMouseEnter={() => setSelectedPensionAmount(index)}>
												{/* Label and value row */}
												<div className='flex items-center justify-between mb-1.5'>
													<div className='flex items-baseline gap-2'>
														<span className='text-sm font-bold text-foreground'>{group.range}</span>
														<span className='text-xs text-muted-foreground'>(śr. {group.average})</span>
													</div>
													<div className='flex items-center gap-2'>
														<span className='text-xl font-bold text-[var(--zus-green-primary)] transition-all duration-300 group-hover:scale-110'>
															{group.percentage}
														</span>
														<span className='text-xs text-muted-foreground'>emerytów</span>
													</div>
												</div>

												{/* Progress bar container */}
												<div className='relative h-7 bg-[var(--zus-gray-light)] rounded-lg overflow-hidden border border-border/50 group-hover:border-border transition-all duration-300 group-hover:shadow-md'>
													{/* Grid lines - showing 0 to 50% */}
													<div className='absolute inset-0 flex pointer-events-none'>
														{[0, 10, 20, 30, 40, 50].map(mark => (
															<div
																key={mark}
																className='absolute h-full border-l border-border/20'
																style={{ left: `${(mark / 50) * 100}%` }}>
																{mark > 0 && mark % 10 === 0 && (
																	<span className='absolute -top-4 -translate-x-1/2 text-[10px] text-muted-foreground/40 font-medium'>
																		{mark}%
																	</span>
																)}
															</div>
														))}
													</div>

													{/* Animated bar - scale to 50% max */}
													<div
														className={`h-full ${colors[index]} transition-all duration-1000 ease-out group-hover:brightness-110 relative shadow-sm`}
														style={{
															width: isChartVisible ? `${(percentage / 50) * 100}%` : '0%',
															transitionDelay: `${index * 200}ms`,
														}}>
														{/* Shine effect on hover */}
														<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>

														{/* Percentage label inside bar */}
														<div className='absolute inset-0 flex items-center justify-end pr-2'>
															<span className='text-white font-bold text-sm drop-shadow-lg'>{percentage}%</span>
														</div>
													</div>
												</div>
											</div>
										)
									})}
								</div>
							)}

							{/* Pie Chart */}
							{chartType === 'pie' && (
								<div
									key={`pie-${chartKey}`}
									className='mb-6 h-[320px] flex items-center justify-center'
									onMouseMove={handleMouseMove}
									onMouseLeave={() => setSelectedPensionAmount(null)}>
									{/* Pie chart SVG with labels */}
									<div className='relative w-full h-full mx-auto'>
										<svg
											viewBox='0 0 600 340'
											className='w-full h-full'
											preserveAspectRatio='xMidYMid meet'
											suppressHydrationWarning>
											<g transform='translate(300, 180)'>
												{/* Draw pie segments */}
												{pensionGroups.map((group, index) => {
													const percentage = parseInt(group.percentage)
													const colors = [
														'var(--zus-blue-dark)',
														'var(--zus-green-primary)',
														'var(--zus-yellow)',
														'var(--zus-blue)',
													]

													// Calculate cumulative percentage for positioning
													const prevPercentages = pensionGroups
														.slice(0, index)
														.reduce((sum, g) => sum + parseInt(g.percentage), 0)

													const startAngle = (prevPercentages / 100) * 360 - 90
													const endAngle = ((prevPercentages + percentage) / 100) * 360 - 90
													const midAngle = (startAngle + endAngle) / 2
													const largeArc = percentage > 50 ? 1 : 0

													// Convert to radians
													const startRad = (startAngle * Math.PI) / 180
													const endRad = (endAngle * Math.PI) / 180
													const midRad = (midAngle * Math.PI) / 180

													// Calculate path for donut - larger size
													const outerRadius = 140
													const innerRadius = 80
													const x1 = outerRadius * Math.cos(startRad)
													const y1 = outerRadius * Math.sin(startRad)
													const x2 = outerRadius * Math.cos(endRad)
													const y2 = outerRadius * Math.sin(endRad)
													const x3 = innerRadius * Math.cos(endRad)
													const y3 = innerRadius * Math.sin(endRad)
													const x4 = innerRadius * Math.cos(startRad)
													const y4 = innerRadius * Math.sin(startRad)

													const pathData = `
                              M ${x1} ${y1}
                              A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
                              L ${x3} ${y3}
                              A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                              Z
                            `

													// Line starts from outer edge of donut (exactly at the edge)
													const lineStartRadius = 140
													const lineStartX = lineStartRadius * Math.cos(midRad)
													const lineStartY = lineStartRadius * Math.sin(midRad)

													// Line middle point (further out)
													const lineMidRadius = 155
													const lineMidX = lineMidRadius * Math.cos(midRad)
													const lineMidY = lineMidRadius * Math.sin(midRad)

													// Horizontal line end position
													const horizontalLength = 40
													const lineEndX = lineMidX + (lineMidX > 0 ? horizontalLength : -horizontalLength)
													const lineEndY = lineMidY

													// Text position
													const textOffset = lineMidX > 0 ? 5 : -5
													const textAnchor = lineMidX > 0 ? 'start' : 'end'

													return (
														<g key={index}>
															{/* Pie segment */}
															<g
																style={{
																	opacity: isChartVisible ? 1 : 0,
																	transform: isChartVisible ? 'scale(1)' : 'scale(0.3)',
																	transformOrigin: '0 0',
																	transition: `all 0.8s ease-out ${index * 150}ms`,
																}}>
																<path
																	d={pathData}
																	fill={colors[index]}
																	className='cursor-pointer transition-all duration-300 hover:opacity-80'
																	onMouseEnter={() => setSelectedPensionAmount(index)}
																/>
															</g>

															{/* Label line - matching segment color */}
															<g
																style={{
																	opacity: isChartVisible ? 1 : 0,
																	transition: `opacity 0.8s ease-out ${0.8 + index * 0.15}s`,
																}}>
																{/* Diagonal line from donut edge */}
																<line
																	x1={lineStartX}
																	y1={lineStartY}
																	x2={lineMidX}
																	y2={lineMidY}
																	stroke={colors[index]}
																	strokeWidth='2'
																/>
																{/* Horizontal line */}
																<line
																	x1={lineMidX}
																	y1={lineMidY}
																	x2={lineEndX}
																	y2={lineEndY}
																	stroke={colors[index]}
																	strokeWidth='2'
																/>

																{/* Label text */}
																<text
																	x={lineEndX + textOffset}
																	y={lineEndY - 10}
																	textAnchor={textAnchor}
																	className='text-sm font-bold'
																	fill={colors[index]}>
																	{group.range}
																</text>
																<text
																	x={lineEndX + textOffset}
																	y={lineEndY + 8}
																	textAnchor={textAnchor}
																	className='text-base font-bold'
																	fill='var(--foreground)'>
																	{group.percentage}
																</text>
															</g>
														</g>
													)
												})}

												{/* Center white circle */}
												<circle cx='0' cy='0' r='80' fill='white' />

												{/* Center text */}
												<text x='0' y='-10' textAnchor='middle' className='text-base font-bold fill-muted-foreground'>
													Rozkład
												</text>
												<text x='0' y='15' textAnchor='middle' className='text-base font-bold fill-muted-foreground'>
													emerytur
												</text>
											</g>
										</svg>
									</div>
								</div>
							)}

							{/* Tooltip */}
							{selectedPensionAmount !== null &&
								(() => {
									const tooltipColors = [
										'var(--zus-blue-dark)',
										'var(--zus-green-primary)',
										'var(--zus-yellow)',
										'var(--zus-blue)',
									]
									const currentColor = tooltipColors[selectedPensionAmount]

									return (
										<div
											className='fixed z-50 pointer-events-none'
											style={{
												left: `${tooltipPosition.x - 150}px`,
												top: `${tooltipPosition.y - 70}px`,
												maxWidth: '280px',
											}}>
											<div
												className='bg-white rounded-lg shadow-2xl p-3'
												style={{
													borderWidth: '2px',
													borderColor: currentColor,
												}}>
												<div className='flex items-start gap-2 mb-2'>
													<div
														className='w-3 h-3 rounded-full mt-1 flex-shrink-0'
														style={{ backgroundColor: currentColor }}></div>
													<h4 className='text-sm font-bold leading-tight' style={{ color: currentColor }}>
														{pensionGroups[selectedPensionAmount].range}
													</h4>
												</div>
												<p className='text-xs text-muted-foreground leading-relaxed pl-5'>
													{pensionGroups[selectedPensionAmount].description}
												</p>
											</div>
										</div>
									)
								})()}
						</Card>
					</div>

					{/* Fun Fact Section */}
					{currentFact && (
						<div
							className={`mt-24 px-4 md:px-20 transition-all duration-700 delay-500 ${visibleSections.has('charts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
							<div className='flex flex-col md:flex-row items-center gap-8 md:gap-10'>
								{/* Left side - Large spinning wheel */}
								<div className='flex-shrink-0'>
									<button
										onClick={randomizeFact}
										disabled={isSpinning}
										className='group relative focus:outline-none cursor-pointer'
										aria-label='Wylosuj ciekawostkę'>
										<span className='sr-only'>Wylosuj ciekawostkę</span>
										{/* Main spinning circle */}
										<div
											className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-yellow transition-all duration-300 flex items-center justify-center ${isSpinning ? 'animate-spin' : 'hover:scale-105'}`}>
											{/* Inner white circle */}
											<div className='w-36 h-36 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center'>
												<Lightbulb className='w-24 h-24 md:w-32 md:h-32 text-yellow' />
											</div>
										</div>
									</button>
								</div>

								{/* Right side - Fun fact content */}
								<div className='flex-1 md:min-h-[256px] flex items-center'>
									<div className='text-center md:text-left'>
										<h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3'>
											Ciekawostki emerytalne
										</h3>
										<p className='text-xs md:text-sm text-muted-foreground mb-4 md:mb-6'>
											Kliknij koło, aby wylosować nową ciekawostkę
										</p>
										<p
											className={`text-base md:text-lg text-muted-foreground leading-relaxed transition-opacity duration-300 ${isSpinning ? 'opacity-30' : 'opacity-100'}`}>
											{currentFact}
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			{/* Stats Section */}
			{/*       <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "100%", label: "Darmowe narzędzie" },
              { value: "2080", label: "Prognozy do roku" },
              { value: "WCAG 2.0", label: "Standard dostępności" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-primary-foreground/90 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

			{/* CTA Section */}
			<section className='py-20 px-4 bg-[var(--zus-green-primary)] text-white' ref={ctaRef} data-section='cta'>
				<div className='container mx-auto max-w-4xl text-center'>
					<h3
						className={`text-3xl md:text-5xl font-bold text-white mb-6 text-balance transition-all duration-700 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						Sprawdź swoją przyszłą emeryturę - zanim zrobi to czas
					</h3>

					<p
						className={`text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty transition-all duration-700 delay-150 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						Poznaj prognozę i dowiedz się, jak możesz poprawić swoją finansową przyszłość.
					</p>
					<div
						className={`transition-all duration-700 delay-300 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<Link href='/form'>
							<Button
								size='lg'
								className='bg-yellow hover:bg-white text-yellow-foreground hover:text-blue-dark text-base md:text-xl px-6 md:px-12 py-4 md:py-7 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out cursor-pointer'>
								Przejdź do kalkulatora emerytury
								<Calculator className='ml-2 w-6 h-6' />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='py-12 px-4 bg-muted'>
				<div className='container mx-auto max-w-6xl'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
						<Link href='/' className='flex items-center self-start'>
							<Image src='/logozus.svg' alt='ZUS Logo' width={100} height={28} className='h-7 w-auto' />
						</Link>
						<p className='text-sm text-muted-foreground text-left'>
							Narzędzie edukacyjne Zakładu Ubezpieczeń Społecznych do prognozowania wysokości emerytury
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
