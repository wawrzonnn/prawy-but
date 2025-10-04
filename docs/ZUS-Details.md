# Szczegóły zadania: Symulator emerytalny

_HackYeah 2025 Hackathon Task_

---

## Wstęp

**Cel zadania:** Stworzenie narzędzia edukacyjnego do prognozowania wysokości emerytury, które w sposób wizualny i prosty przedstawi użytkownikom przyszłe zarobki, siłę nabywczą wynagrodzenia oraz wysokość emerytury.

**Kontekst:** Jednym z zadań ZUS jest prowadzenie działalności edukacyjnej z zakresu ubezpieczeń społecznych, mającej zwiększyć świadomość społeczeństwa na temat ryzyka starości.

---

## Źródła danych

**Główne źródło:**

- Prognoza wpływów i wydatków Funduszu Emerytalnego do 2080 roku (Departament Statystyki i Prognoz Aktuarialnych ZUS)

**Dodatkowe źródła:**

- Główny Urząd Statystyczny (GUS)
- Narodowy Bank Polski (NBP)
- Ministerstwo Finansów
- Inne dane w posiadaniu ZUS

---

## Wymagania podstawowe

**Platforma:** Aplikacja webowa dostępna dla wszystkich chętnych z poziomu strony ZUS

**Dostępność:** Spełnianie standardu WCAG 2.0

**Kolorystyka:** Zgodna z Księgą Znaku ZUS:

- RGB(255,179,79) - Pomarańczowy
- RGB(0,153,63) - Zielony
- RGB(190,195,206) - Szary
- RGB(63,132,210) - Niebieski
- RGB(0,65,110) - Ciemny niebieski
- RGB(240,94,94) - Czerwony
- RGB(0,0,0) - Czarny

---

## Wymagania zaawansowane

### 1.1 Pulpit podstawowy

**Ekran początkowy:** Zapytanie użytkownika o oczekiwaną wysokość emerytury w przyszłości

**Funkcjonalności:**

- Porównanie z obecną średnią wysokością świadczenia
- Interaktywny wykres z średnią wysokością dla danej grupy
- Tooltipy po najechaniu na grupę (np. charakterystyka grupy emerytur poniżej minimalnych)
- Losowa ciekawostka typu "Czy wiesz, że..."

### 1.2 Symulacja emerytury

**Dane obowiązkowe:**

- Wiek
- Płeć
- Wysokość wynagrodzenia brutto
- Rok rozpoczęcia pracy
- Planowany rok zakończenia aktywności zawodowej (domyślnie wiek emerytalny)

**Dane fakultatywne:**

- Wysokość zgromadzonych środków na koncie i subkoncie w ZUS

**Funkcje dodatkowe:**

- Opcja uwzględnienia zwolnień lekarskich (średnia długość wg płci)
- Informacje o średniej długości zwolnień w Polsce
- Odwrócenie indeksacji wynagrodzeń wg średniego wzrostu wynagrodzeń (NBP/GUS)
- Rok rozpoczęcia/zakończenia pracy zawsze odnosi się do stycznia

### 1.3 Wynik

**Dwa rodzaje kwot:**

- Wysokość rzeczywista
- Wysokość urealniona (z uwzględnieniem inflacji)

**Dodatkowe informacje:**

- Porównanie z prognozowaną średnią emeryturą w roku przejścia na emeryturę
- Stopa zastąpienia (wynagrodzenie zindeksowane vs prognozowane świadczenie)
- Wpływ okresów chorobowych na wysokość świadczenia
- Zwiększenie świadczenia przy odłożeniu decyzji o emeryturze (o 1, 2, 5 lat)
- Jeśli prognozowane < oczekiwane: o ile dłużej pracować

### 1.4 Dashboard symulatora emerytalnego

**Zaawansowane opcje:**

- Wprowadzanie innych kwot wynagrodzeń (historyczne lub przyszłe)
- Modyfikacja wskaźnika indeksacji
- Wprowadzanie określonych okresów choroby w przeszłości/przyszłości
- Podgląd wzrostu zgromadzonych środków w czasie

### 1.5 Pobieranie raportu

**Raport zawiera:**

- Wykresy i tabele
- Wprowadzone parametry początkowe
- Wyniki prognozy

### 1.6 Kod pocztowy

- Pole nieobowiązkowe na końcu formularza

### 1.7 Raportowanie zainteresowania

**Eksport XLS dla administratora z nagłówkami:**

- Data użycia
- Godzina użycia
- Emerytura oczekiwana
- Wiek
- Płeć
- Wysokość wynagrodzenia
- Czy uwzględniono okresy choroby
- Wysokość zgromadzonych środków na koncie i Subkoncie
- Emerytura rzeczywista
- Emerytura urealniona
- Kod pocztowy

---

## Retirement Simulator

_Educational tool for forecasting pension amounts_

### Introduction

One of the tasks of the Social Insurance Institution (ZUS) is to conduct educational activities in the field of social insurance, which is intended to raise public awareness of risks—particularly the risk of old age.

### Data Sources

The primary data source for the simulator should be the Forecast of revenues and expenditures of the Pension Fund up to 2080 prepared by the Department of Statistics and Actuarial Forecasts of the Social Insurance Institution, but also data from the Central Statistical Office (GUS), the National Bank of Poland (NBP), the Ministry of Finance, and other data held by the Social Insurance Institution.

### Basic Requirements

The simulator (application) should be a web-based tool, available to all interested users from the Social Insurance Institution's website. Colors should be consistent with (or close to) the ZUS Brand Book. The simulator should comply with WCAG 2.0.

### Advanced Requirements

#### 1.1 Basic Dashboard

On the first page, the simulator should ask the user what pension they would like to have in the future. It must not be presented out of context. The pension amount should also be compared to the current average benefit amount. An object (e.g., a chart) should appear containing the average pension for a given group, and when hovering over a given group, a brief description of that group should appear.

#### 1.2 Pension Simulation

At the pension-forecasting stage, the following data should be required: Age, Sex, Gross salary amount, Year of starting work, Planned year of ending professional activity (by default this should be the year of reaching retirement age).

#### 1.3 Result

The result should be presented in two amounts: Actual amount and Real (inflation-adjusted) amount. Information should also be presented showing how the forecast benefit compares to the forecast average benefit in the year of retirement and what the replacement rate will be.

#### 1.4 Pension Simulator Dashboard

Completing all steps should allow access to the Dashboard, where broader changes to forecasting can be made. It should be possible to enter other amounts (e.g., specific historical salary amounts from several years ago) or enter different amounts for the future (or a different indexation rate).

#### 1.5 Report Download

The user should be able to download a report on their forecast pension, with charts, tables, and the initial parameters entered.

#### 1.6 Postal Code

At the end, there should be a (non-mandatory) request to provide a postal code.

#### 1.7 Interest Reporting

From the tool administrator's side, it should be possible to download a usage report in .xls format with specified headers.
