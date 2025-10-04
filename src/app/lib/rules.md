Symulator emerytalny
Narzędzie edukacyjne do
prognozowania wysokości emerytury
Zadanie na Hackathon 2025
Gabinet Prezesa
2
Spis treści
1. Wstęp .................................................................................................................... 3
2. Źródła danych ........................................................................................................ 3
3. Wymagania podstawowe ...................................................................................... 3
4. Wymagania zaawansowane .................................................................................. 4
1.1. Pulpit podstawowy ........................................................................................... 4
1.2. Symulacja emerytury ........................................................................................ 4
1.3. Wynik ................................................................................................................ 5
1.4. Dashboard symulatora emerytalnego .............................................................. 5
1.5. Pobieranie raportu ........................................................................................... 6
1.6. Kod pocztowy ................................................................................................... 6
1.7. Raportowanie zainteresowania ........................................................................ 6
3
1. Wstęp
Jednym z zadań Zakładu Ubezpieczeń Społecznych jest prowadzenie działalności edukacyjnej
z zakresu ubezpieczeń społecznych, co w założeniu ma zwiększyć świadomość społeczeństwa
na temat ryzyk, szczególnie ryzyka starości. Obecnie, ludzie wkraczający na rynek pracy nie
mają świadomości tego jaką będą mieli zdolność do utrzymania swojego poziomu życia, nie
wiedzą w jakiej wysokości będzie ich świadczenie emerytalne. Aby nieco przybliżyć im tę
perspektywę, należy wprowadzić narzędzie edukacyjne, które w sposób wizualny i prosty,
przedstawi im, jak wyglądać będą w przyszłości zarobki, jaką realną siłę nabywczą będzie miało
nasze wynagrodzenie oraz sama emerytura.
2. Źródła danych
Podstawowym źródłem danych dla symulatora powinna być Prognoza wpływów i wydatków
Funduszu Emerytalnego do 2080 roku przygotowana przez Departament Statystyki i Prognoz
Aktuarialnych Zakładu Ubezpieczeń Społecznych, ale również dane Głównego Urzędu
Statystycznego, Narodowego Banku Polskiego, Ministerstwa Finansów oraz innych danych
będących w posiadaniu Zakładu Ubezpieczeń Społecznych.
3. Wymagania podstawowe
Symulator (aplikacja) powinna być narzędziem tzn. webowym, dostępnym dla wszystkich
chętnych z poziomu witryny Zakładu Ubezpieczeń Społecznych.
Kolory powinny być zgodne z Księgą Znaku ZUS (lub zbliżone):
1. R: 255; G:179; B:79
2. R: 0; G: 153; B: 63
3. R: 190; G: 195; B: 206
4. R: 63; G: 132; B: 210
5. R: 0: G: 65; B: 110
6. R: 240; G: 94; B: 94
7. R: 0; G: 0; B: 0
Symulator powinien spełniać standard WCAG 2.0
4
4. Wymagania zaawansowane
1.1. Pulpit podstawowy
Symulator, na pierwszej stronie powinien zapytać użytkownika o to, jaką chciałby mieć
emeryturę w przyszłości. Nie może być ona osadzona bez kontekstu. Wysokość emerytury
powinna być również porównana do obecnej, średniej wysokości świadczenia. Powinien
pojawić się obiekt (np. wykres) który powinien zawierać średnią wysokość emerytury dla danej
grupy, a po najechaniu na dana grupę powinna pojawiać się krótka charakterystyka danej
grupy np.: emerytury poniżej minimalnej: świadczeniobiorcy otrzymujący emeryturę w
wysokości poniżej minimalnej wykazywali się niską aktywnością zawodową, nie przepracowali
minimum 25 lat dla mężczyzn i 20 lat dla kobiet, w związku z tym nie nabyli prawa do gwarancji
minimalnej emerytury.
Dodatkowo powinna pojawiać się losowa ciekawostka np. „Czy wiesz, że najwyższą emeryturę
w Polsce otrzymuje mieszkaniec województwa śląskiego, wysokość jego emerytury to x zł,
pracował przez x lat, nie był nigdy na zwolnieniu lekarskim.”
Obraz podstawowy, będzie początkiem do głębszej analizy, czyli jakiej oczekuję emerytury, a
jaką w rzeczywistości otrzymam.
1.2. Symulacja emerytury
Na etapie symulacji przyszłej emerytury, powinny być wymagane takie dane jak:
OBOWIĄZKOWO
• Wiek
• Płeć
• Wysokość wynagrodzenia brutto
• Rok rozpoczęcia pracy
• Planowany rok zakończenia aktywności zawodowej (przy czym, z automatu powinien
być to rok osiągnięcia wieku emerytalnego)
FAKULTATYWNIE
• Wysokość zgromadzonych środków na koncie i na subkoncie w ZUS
Dodatkowo, powinna być umiejscowiona opcja „uwzględniaj możliwość zwolnień lekarskich”
– chodzi o to, że symulacja ma uwzględniać średnią długość zwolnień lekarskich w ciągu życia
5
oddzielnie dla kobiet i mężczyzn. Ma pojawiać się informacja o tym, ile średnio pracujący w
Polsce przebywa na zwolnieniach lekarskich i jak to średnio obniża świadczenie.
Wysokość zgromadzonych środków na koncie i subkoncie w ZUS powinna być fakutatywna, bo
oszacowanie wysokości środków powinno być również możliwe z poziomu wynagrodzenia.
Symulator powinien odwrócić indeksację wynagrodzeń o następujące w kolejnych latach od
rozpoczęcia pracy średni wzrost wynagrodzeń w Polsce podawany przez NBP lub GUS.
Po wypełnieniu wszystkich danych powinna pojawić się opcja „zaprognozuj moją przyszłą
emeryturę”.
UWAGA! Rok rozpoczęcia pracy i zakończenia pracy powinny zawsze odnosić się do stycznia.
1.3. Wynik
Wynik powinien być podawany w dwóch kwotach:
• Wysokość rzeczywista
• Wysokość urealniona
Powinna również pojawiać się informacja dotycząca tego, jak zaprognozowane świadczenie
odnosi się do prognozowanego średniego świadczenia w roku przejścia na emeryturę oraz jaki
będzie stopa zastąpienia (wynagrodzenie zindeksowane w odniesieniu do prognozowanego
świadczenia).
Powinna być również informacja o tym, jaka jest wysokość wynagrodzenia bez uwzględniania
okresów chorobowych (i z uwzględnianiem) oraz o ile wzrosłoby świadczenie, gdyby odłożył
decyzję o przejściu na emeryturę o x lat. (np. rok, dwa i pięć).
Wysokość prognozowanego świadczenia powinna również odnosić się do oczekiwanego
świadczenia wprowadzonego na początku. Jeżeli prognozowane świadczenie jest niższe niż
oczekiwane, powinna pojawić się informacja o tym, o ile musi dłużej pracować, żeby
świadczenie dostać.
1.4. Dashboard symulatora emerytalnego
Przejście wszystkich kroków powinno umożliwić przejście do Dashboardu, gdzie powinna być
możliwość szerszych zmian w zakresie prognozowania. Będzie można wprowadzić inne kwoty
(np. konkretne kwoty wynagrodzeń sprzed kilku lat) lub wprowadzenie innych kwot w
przyszłości (lub innego wskaźnika indeksacji). Powinna być możliwość wprowadzenia
określonych okresów choroby w przeszłości oraz w przyszłości.
Powinna być również opcja podglądu, jak wraz z upływem lat zwiększa się kwota zgromadzona
na koncie i subkoncie w ZUS.
6
1.5. Pobieranie raportu
Użytkownik powinien móc pobrać raport dotyczący swojej prognozowanej emerytury, z
wykresami, tabelami oraz wprowadzonymi parametrami początkowymi.
1.6. Kod pocztowy
Na końcu powinna pojawiać się prośba o podanie kodu pocztowego (nieobligatoryjna).
1.7. Raportowanie zainteresowania
Powinna istnieć, z poziomu administratora narzędzia, możliwość pobrania raportu z używania
symulatora w formacie xls. Nagłówki:
• Data użycia
• Godzina użycia
• Emerytura oczekiwana
• Wiek
• Płeć
• Wysokość wynagrodzenia
• Czy uwzględniał okresy choroby
• Wysokość zgromadzonych środków na koncie i Subkoncie
• Emerytura rzeczywista
• Emerytura urealniona
• Kod pocztowy
Retirement Simulator
Educational tool for forecasting
pension amounts
Task for Hackathon 2025
2
Table of Contents
1. Introduction .......................................................................................................... 3
2. Data sources .......................................................................................................... 3
3. Basic requirements ............................................................................................... 3
4. Advanced requirements ........................................................................................ 4
1.1. Basic dashboard ................................................................................................ 4
1.2. Pension simulation ........................................................................................... 4
1.3. Result ................................................................................................................ 5
1.4. Pension simulator dashboard ........................................................................... 5
1.5. Report download .............................................................................................. 5
1.6. Postal code........................................................................................................ 5
1.7. Interest reporting ............................................................................................. 6
3
1. Introduction
One of the tasks of the Social Insurance Institution (ZUS) is to conduct educational activities in
the field of social insurance, which is intended to raise public awareness of risks—particularly
the risk of old age. Currently, people entering the labor market are unaware of their ability to
maintain their standard of living and do not know what the amount of their pension benefit
will be. To bring this perspective closer to them, an educational tool should be introduced
that, in a visual and simple way, presents what future earnings will look like, what real
purchasing power our salary will have, and what the pension itself will be.
2. Data sources
The primary data source for the simulator should be the Forecast of revenues and expenditures
of the Pension Fund up to 2080 prepared by the Department of Statistics and Actuarial
Forecasts of the Social Insurance Institution, but also data from the Central Statistical Office
(GUS), the National Bank of Poland (NBP), the Ministry of Finance, and other data held by the
Social Insurance Institution.
3. Basic requirements
The simulator (application) should be a web-based tool, available to all interested users from
the Social Insurance Institution’s website.
Colors should be consistent with (or close to) the ZUS Brand Book:
1. R: 255; G: 179; B: 79
2. R: 0; G: 153; B: 63
3. R: 190; G: 195; B: 206
4. R: 63; G: 132; B: 210
5. R: 0; G: 65; B: 110
6. R: 240; G: 94; B: 94
7. R: 0; G: 0; B: 0
The simulator should comply with WCAG 2.0.
4
4. Advanced requirements
1.1. Basic dashboard
On the first page, the simulator should ask the user what pension they would like to have in
the future. It must not be presented out of context. The pension amount should also be
compared to the current average benefit amount. An object (e.g., a chart) should appear
containing the average pension for a given group, and when hovering over a given group, a
brief description of that group should appear, e.g.: pensions below the minimum: beneficiaries
receiving a pension below the minimum showed low employment activity, did not work at least
25 years for men and 20 years for women, and therefore did not acquire the right to a
guaranteed minimum pension.
Additionally, a random “did you know?” fact should appear, e.g., “Did you know that the
highest pension in Poland is received by a resident of the Silesian Voivodeship; their pension
amounts to x PLN; they worked for x years and were never on sick leave.”
The basic image will be the starting point for deeper analysis—namely, what pension I expect
versus what I will actually receive.
1.2. Pension simulation
At the pension-forecasting stage, the following data should be required:
MANDATORY
• Age
• Sex
• Gross salary amount
• Year of starting work
• Planned year of ending professional activity (by default this should be the year of
reaching retirement age)
OPTIONAL
• Amount of funds accumulated in the ZUS account and sub-account
Additionally, there should be an option “include the possibility of sick leave”—meaning the
simulation should account for the average length of sick leaves over a lifetime separately for
women and men. Information should appear indicating how long, on average, an employed
person in Poland spends on sick leave and how this reduces the benefit on average.
5
The amount of funds accumulated in the ZUS account and sub-account should be optional,
because the amount can also be estimated based on salary. The simulator should reverse-
index wages by the average wage growth in Poland (as published by NBP or GUS) occurring in
subsequent years from the start of work.
After completing all data, an option “forecast my future pension” should appear.
NOTE! The start year of work and the end year of work should always refer to January.
1.3. Result
The result should be presented in two amounts:
• Actual amount
• Real (inflation-adjusted) amount
Information should also be presented showing how the forecast benefit compares to the
forecast average benefit in the year of retirement and what the replacement rate will be
(indexed wage relative to the forecast benefit).
There should also be information showing the wage amount excluding periods of illness (and
including them), and by how much the benefit would increase if the user postponed
retirement by x years (e.g., one, two, and five years).
The amount of the forecast benefit should also be related to the expected benefit entered at
the beginning. If the forecast benefit is lower than expected, information should appear
indicating how much longer one must work to obtain the expected benefit
1.4. Pension simulator dashboard
Completing all steps should allow access to the Dashboard, where broader changes to
forecasting can be made. It should be possible to enter other amounts (e.g., specific historical
salary amounts from several years ago) or enter different amounts for the future (or a
different indexation rate). It should be possible to enter specified periods of illness in the past
and in the future.
There should also be an option to view how, over the years, the amount accumulated in the
ZUS account and sub-account increases.
1.5. Report download
The user should be able to download a report on their forecast pension, with charts, tables,
and the initial parameters entered.
1.6. Postal code
At the end, there should be a (non-mandatory) request to provide a postal code.
6
1.7. Interest reporting
From the tool administrator’s side, it should be possible to download a usage report in .xls
format. Headers:
• Date of use
• Time of use
• Expected pension
• Age
• Sex
• Salary amount
• Whether periods of illness were included
• Amount of funds accumulated in the account and Sub-account
• Actual pension
• Real (inflation-adjusted) pension
• Postal code
•