'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calculator, TrendingUp, PiggyBank, Calendar, Target, Wallet, LineChart, Users, Award, AlertCircle, Lightbulb, BarChart3 } from "lucide-react"

const funFacts = [
  "Czy wiesz, że najwyższa emerytura w Polsce wynosi ponad 48 000 zł miesięcznie? Otrzymuje ją emerytowany górnik z województwa śląskiego, który przepracował 42 lata.",
  "Średni wiek przejścia na emeryturę w Polsce to 61 lat dla kobiet i 63 lata dla mężczyzn, choć ustawowy wiek emerytalny to 60/65 lat.",
  "Każdy rok dłuższej pracy zwiększa wysokość emerytury średnio o 5-7%. Odroczenie emerytury o 5 lat może zwiększyć świadczenie nawet o 30-35%!",
  "W Polsce jest ponad 9 milionów emerytów, a przeciętna emerytura wynosi około 3 500 zł brutto."
]

export default function Home() {
  const [selectedPensionAmount, setSelectedPensionAmount] = useState<number | null>(null)
  const [desiredPension, setDesiredPension] = useState<string>("5000")

  const pensionGroups = [
    {
      range: "Poniżej 2 000 zł",
      average: "1 650 zł",
      percentage: "18%",
      description: "Świadczeniobiorcy otrzymujący emeryturę poniżej minimalnej wykazywali się niską aktywnością zawodową. Nie przepracowali minimum 25 lat dla mężczyzn i 20 lat dla kobiet, w związku z tym nie nabyli prawa do gwarancji minimalnej emerytury."
    },
    {
      range: "2 000 - 3 000 zł",
      average: "2 550 zł",
      percentage: "35%",
      description: "Największa grupa emerytów w Polsce. Osoby te przepracowały wymagany okres, ale ich wynagrodzenia były na poziomie zbliżonym do średniej krajowej lub niższym."
    },
    {
      range: "3 000 - 4 500 zł",
      average: "3 700 zł",
      percentage: "28%",
      description: "Emeryci z tej grupy pracowali przez długi okres i zarabiali powyżej średniej krajowej. Regularnie odprowadzali składki emerytalne przez co najmniej 30-35 lat."
    },
    {
      range: "Powyżej 4 500 zł",
      average: "5 800 zł",
      percentage: "19%",
      description: "Najwyższe emerytury otrzymują osoby, które przez całe życie zawodowe zarabiały znacznie powyżej średniej krajowej, pracowały przez 35-40 lat bez przerw i nie korzystały często ze zwolnień lekarskich."
    }
  ]

  const [currentFact, setCurrentFact] = useState("")

  useEffect(() => {
    setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)])
  }, [])

  // Oblicz rzeczywistą emeryturę (stopa zastąpienia ~50%)
  const calculateRealPension = () => {
    const desired = parseFloat(desiredPension)
    if (!desired || desired <= 0) return 0
    const replacementRate = 0.5 // 50% stopa zastąpienia
    return Math.round(desired * replacementRate)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logozus.svg" 
              alt="ZUS Logo" 
              width={120} 
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <Link href="/form">
            <Button
              size="lg"
              className="bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
            >
              Sprawdź swoją emeryturę
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Question about expected pension */}
      <section className="pt-44 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
{/*             <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-[0.25rem] text-sm font-bold mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Narzędzie edukacyjne ZUS
            </div> */}

            <h2 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
              Jaką chcesz mieć emeryturę?
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Większość osób wkraczających na rynek pracy nie ma świadomości, jaką będzie mieć emeryturę. 
              Poznaj rzeczywistość i zaplanuj swoją przyszłość finansową.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/form">
                <Button
                  size="lg"
                  className="bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow text-lg px-8 py-6 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
                >
                  Oblicz swoją emeryturę
                  <Calculator className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="py-20 px-4 bg-[var(--zus-green-primary)] text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Oczekiwania vs. Rzeczywistość</h3>
            <p className="text-xl text-white/90">
              Większość ludzi nie zdaje sobie sprawy, jak duża jest różnica między ich oczekiwaniami a rzeczywistością
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-yellow flex-shrink-0" />
                <label htmlFor="desired-pension-input" className="text-xl font-bold">Chciałbym otrzymać:</label>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <input
                  id="desired-pension-input"
                  type="number"
                  value={desiredPension}
                  onChange={(e) => setDesiredPension(e.target.value)}
                  className="text-5xl font-bold bg-transparent border-b-2 border-white/40 pb-2 text-white placeholder-white/50 focus:outline-none focus:border-yellow transition-all w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="5000"
                  min="0"
                  step="100"
                  aria-label="Oczekiwana kwota emerytury w złotych"
                />
                <span className="text-4xl font-bold text-white/80 whitespace-nowrap" aria-hidden="true">zł</span>
              </div>
              <p className="text-base text-white/70 leading-relaxed">
                Wprowadź kwotę emerytury, którą chciałbyś otrzymywać miesięcznie
              </p>
            </Card>

            <Card className="p-8 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-yellow flex-shrink-0" />
                <h4 className="text-xl font-bold">Rzeczywiście otrzymam:</h4>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-bold text-white w-full pb-2 border-b-2 border-white/40">
                  ~{calculateRealPension().toLocaleString('pl-PL')}
                </div>
                <span className="text-4xl font-bold text-white/80 whitespace-nowrap">zł</span>
              </div>
              <p className="text-base text-white/70 leading-relaxed">
                Przy stopie zastąpienia 50% - przeciętna emerytura w Polsce wynosi około 40-50% ostatniego wynagrodzenia
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link href="/form">
              <Button
                size="lg"
                className="bg-yellow hover:bg-white text-yellow-foreground hover:text-blue-dark text-xl px-12 py-7 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
              >
                Sprawdź, ile faktycznie dostaniesz
                <Calculator className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pension Groups Comparison Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Pension Groups Comparison - Interactive Section */}
          <div>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Porównaj do rzeczywistości - Średnie emerytury w Polsce
                </h3>
                <p className="text-lg text-muted-foreground">
                  Najedź na grupę, aby zobaczyć szczegóły i charakterystykę emerytów
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {pensionGroups.map((group, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-primary bg-white"
                    onMouseEnter={() => setSelectedPensionAmount(index)}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold text-muted-foreground mb-2">{group.range}</div>
                      <div className="text-3xl font-bold text-primary mb-1">{group.average}</div>
                      <div className="text-sm text-muted-foreground font-medium">
                        <BarChart3 className="w-4 h-4 inline mr-1" />
                        {group.percentage} emerytów
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedPensionAmount !== null && (
                <Card className="p-6 bg-blue/10 border-2 border-blue">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        {pensionGroups[selectedPensionAmount].range}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {pensionGroups[selectedPensionAmount].description}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </Card>
          </div>

          {/* Fun Fact Section */}
          {currentFact && (
            <div className="mt-8">
              <Card className="p-6 bg-yellow/10 border-2 border-yellow">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-yellow flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Ciekawostka</h4>
                    <p className="text-lg text-foreground leading-relaxed">
                      {currentFact}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Co zasymulujesz?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Kompleksowe narzędzie do prognozowania Twojej przyszłej emerytury
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calculator,
                title: "Wysokość emerytury",
                description: "Oblicz przewidywaną wysokość świadczenia emerytalnego w wartości rzeczywistej i urealnionej",
              },
              {
                icon: LineChart,
                title: "Stopa zastąpienia",
                description: "Zobacz, jaki procent Twojego wynagrodzenia będzie stanowić Twoja emerytura",
              },
              {
                icon: Calendar,
                title: "Scenariusze przejścia",
                description: "Symuluj różne warianty wieku przejścia na emeryturę i zobacz wpływ na wysokość świadczenia",
              },
              {
                icon: TrendingUp,
                title: "Wzrost kapitału",
                description: "Śledź, jak zwiększa się kwota zgromadzona na Twoim koncie i subkoncie w ZUS",
              },
              {
                icon: Users,
                title: "Wpływ zwolnień lekarskich",
                description: "Uwzględnij średnią długość zwolnień i zobacz, jak wpływają na wysokość emerytury",
              },
              {
                icon: Target,
                title: "Porównanie ze średnią",
                description: "Porównaj swoją prognozowaną emeryturę ze średnim świadczeniem w roku przejścia",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card border">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Jak to działa?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Trzy proste kroki do poznania swojej przyszłej emerytury
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Wprowadź dane",
                description: "Podaj podstawowe informacje: wiek, płeć, wynagrodzenie, planowany wiek emerytury oraz opcjonalnie dane z konta ZUS",
              },
              {
                step: "02",
                title: "Dostosuj parametry",
                description: "Uwzględnij zwolnienia lekarskie, różne scenariusze wynagrodzeń i zobacz wpływ odroczenia emerytury",
              },
              {
                step: "03",
                title: "Poznaj wynik",
                description: "Otrzymaj szczegółową prognozę: emeryturę rzeczywistą, urealnioną, stopę zastąpienia i porównanie ze średnią",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h4 className="text-2xl font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                {index < 2 && <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-primary/30"></div>}
              </div>
            ))}
          </div>
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-blue border rounded-[0.25rem]">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
              Nie czekaj - sprawdź swoją przyszłą emeryturę już dziś
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
              Im wcześniej poznasz prawdę o swojej przyszłej emeryturze, tym więcej czasu będziesz miał 
              na podjęcie działań, które poprawią Twoją sytuację finansową na emeryturze
            </p>
            <Link href="/form">
              <Button
                size="lg"
                className="bg-yellow hover:bg-white text-yellow-foreground hover:text-blue-dark text-xl px-12 py-7 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
              >
                Zaprognozuj moją przyszłą emeryturę
                <Calculator className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logozus.svg" 
                alt="ZUS Logo" 
                width={100} 
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              Narzędzie edukacyjne Zakładu Ubezpieczeń Społecznych do prognozowania wysokości emerytury
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}