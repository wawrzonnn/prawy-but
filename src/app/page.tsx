import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, PiggyBank, Calendar, Target, Wallet, LineChart, Users, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ZUS</h1>
          </div>
          <Button
            size="lg"
            className="bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
          >
            Rozpocznij grę
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-[0.25rem] text-sm font-bold mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Edukacyjna gra symulacyjna
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
              Symuluj swoje życie finansowe
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Naucz się, jak rezygnować dziś z części dochodu na rzecz uprawnień w przyszłości. Odkryj sposoby
              finansowania przyszłej konsumpcji w interaktywnej grze.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                size="lg"
                className="bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow text-lg px-8 py-6 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
              >
                Rozpocznij grę
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2 bg-transparent border-primary text-primary hover:bg-primary/10 font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
              >
                Dowiedz się więcej
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/10 blur-3xl opacity-30"></div>
            <Card className="relative overflow-hidden bg-card border shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary via-secondary to-primary/80 flex items-center justify-center p-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 max-w-md w-full shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold text-muted-foreground">Twój portfel</span>
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-foreground">45 250 zł</div>
                      <div className="text-sm text-primary flex items-center gap-1 mt-1 font-bold">
                        <TrendingUp className="w-4 h-4" />
                        +12.5% w tym miesiącu
                      </div>
                    </div>
                    <div className="h-32 bg-muted rounded flex items-end gap-2 p-4">
                      {[40, 55, 45, 70, 60, 85, 75].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Czego się nauczysz?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Gra symulacyjna, która przygotuje Cię do podejmowania mądrych decyzji finansowych
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: PiggyBank,
                title: "Oszczędzanie na przyszłość",
                description: "Naucz się, jak odkładać część dochodu na emeryturę i inne cele długoterminowe",
              },
              {
                icon: Calendar,
                title: "Planowanie życiowe",
                description: "Symuluj różne scenariusze życiowe i zobacz ich wpływ na Twoje finanse",
              },
              {
                icon: Target,
                title: "Cele finansowe",
                description: "Ustal cele i śledź postępy w ich realizacji przez całe życie",
              },
              {
                icon: LineChart,
                title: "Inwestowanie",
                description: "Poznaj podstawy inwestowania i budowania kapitału na przyszłość",
              },
              {
                icon: Users,
                title: "System emerytalny",
                description: "Zrozum, jak działa system ubezpieczeń społecznych i ZUS",
              },
              {
                icon: Award,
                title: "Mądre decyzje",
                description: "Podejmuj świadome decyzje finansowe i zobacz ich długoterminowe skutki",
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
              Prosta ścieżka do lepszego zrozumienia finansów osobistych
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Rozpocznij swoją podróż",
                description: "Stwórz swoją postać i rozpocznij symulację życia od młodości",
              },
              {
                step: "02",
                title: "Podejmuj decyzje",
                description: "Wybieraj między wydatkami dziś a oszczędnościami na jutro",
              },
              {
                step: "03",
                title: "Zobacz rezultaty",
                description: "Obserwuj, jak Twoje decyzje wpływają na jakość życia w przyszłości",
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
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "50+", label: "Scenariuszy życiowych" },
              { value: "100%", label: "Darmowa gra" },
              { value: "∞", label: "Możliwości rozwoju" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-primary-foreground/90 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-blue border rounded-[0.25rem]">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">Gotowy na bieg przez życie?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
              Rozpocznij swoją przygodę z finansami i naucz się podejmować mądre decyzje o swojej przyszłości
            </p>
            <Button
              size="lg"
              className="bg-yellow hover:bg-blue-dark text-yellow-foreground hover:text-yellow text-xl px-12 py-7 h-auto font-bold rounded-[0.25rem] transition-all duration-150 ease-in-out"
            >
              Rozpocznij grę teraz
              <TrendingUp className="ml-2 w-6 h-6" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">ZUS</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Projekt edukacyjny o finansach i systemie ubezpieczeń społecznych
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}