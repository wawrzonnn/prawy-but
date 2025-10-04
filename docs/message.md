Prognoza wpływów i wydatków Funduszu Emerytalnego do 2080 roku
DEPARTAMENT STATYSTYKI I PROGNOZ AKTUARIALNYCH
Warszawa, październik 2022 r.
ZUS ZAKŁAD UBEZPIECZEŃ SPOŁECZNYCH

***

**Akceptowała:**
Hanna Zalewska, Dyrektor Departamentu Statystyki i Prognoz Aktuarialnych

**Opracowanie modelu prognostycznego FUS20:**
Mirosław Szlasa - Naczelnik Wydziału Aktuarialnego
Adrian Kilichowski - Główny Specjalista, Wydział Aktuarialny
Justyna Prasuła - Starszy Specjalista, Wydział Aktuarialny
Grażyna Mrugała - Starszy Specjalista, Wydział Aktuarialny
Marta Glezman – Starszy Specjalista, Wieloosobowe Stanowisko ds. Modeli Mikrosymulacyjnych

***

### Spis treści

*   **WSTĘP** 4
*   **NAJWAŻNIEJSZE INFORMACJE O MODELU FUS20** 5
*   **NAJWAŻNIEJSZE ZMIANY W PORÓWNANIU DO POPRZEDNIEJ EDYCJI PROGNOZY** 6
*   **NAJWAŻNIEJSZE ZAŁOŻENIA** 7
    *   PROGNOZA DEMOGRAFICZNA 7
    *   ZAŁOŻENIA MODELOWE 7
    *   PARAMETRY 8
*   **WYNIKI PROGNOZY** 12
    *   ZASTRZEŻENIE 12
    *   ZMIANY SYTUACJI DEMOGRAFICZNEJ W POLSCE. STARZENIE SIĘ SPOŁECZEŃSTWA 12
    *   UWAGI DO WYNIKÓW PROGNOZY 17
    *   OPIS WYNIKÓW PROGNOZY WPŁYWÓW I WYDATKÓW FUNDUSZU EMERYTALNEGO DO 2080 R. 18
    *   WYNIKI – SPIS TABEL I WYKRESÓW 20
    *   WYNIKI – TABELE I WYKRESY 21
*   **DODATEK A – PROGNOZA DEMOGRAFICZNA MINISTERSTWA FINANSÓW Z 2019 R.** 53
*   **DODATEK B – ANALIZA WRAŻLIWOŚCI** 54
*   **DODATEK C – WPŁYW WSPÓŁCZYNNIKÓW ŚMIERTELNOŚCI NA WYNIKI PROGNOZY** 57

***

### Wstęp

Zakład Ubezpieczeń Społecznych oprócz szerokiego spektrum zadań realizowanych z zakresu pozarolniczych ubezpieczeń społecznych jest także instytucją opracowującą prognozy z tego obszaru. Na mocy ustawy z dnia 13 października 1998 r. o systemie ubezpieczeń społecznych Zakład Ubezpieczeń Społecznych jest zobowiązany do sporządzania co trzy lata długoterminowej prognozy wpływów i wydatków funduszu emerytalnego. Prognoza ta stanowić ma podstawę gospodarki finansowej Funduszu Rezerwy Demograficznej (FRD). Dotychczas w Departamencie Statystyki i Prognoz Aktuarialnych sporządziliśmy osiem długoterminowych prognoz wpływów i wydatków funduszu emerytalnego. Prognozy te uzyskujemy w efekcie przeliczeń aktuarialnych modeli wpływów i wydatków Funduszu Ubezpieczeń Społecznych. W kolejnych edycjach modeli uwzględniamy najnowsze dane oraz zmiany przepisów. Udoskonalamy również stosowane metody matematyczne oraz implementacyjne.

Prognozy, o których mowa powyżej, uzyskujemy w efekcie przeliczeń aktuarialnych modeli wpływów i wydatków Funduszu Ubezpieczeń Społecznych. Dotychczas w Departamencie Statystyki i Prognoz Aktuarialnych Zakładu Ubezpieczeń Społecznych stworzyliśmy dwadzieścia takich modeli. Pierwszy z nich, zbudowany w latach 2000-2001, obejmował horyzont czasowy do 2006 r., kolejnych sześć modeli obejmowało okres do 2050 r., a kolejnych osiem – obejmowało okres do 2060 r. Kolejne modele obejmują horyzont czasowy do 2080 r., w tym najnowszy model FUS20 zbudowany w 2022 roku.

Z uwagi na spójność z założeniami makroekonomicznymi Ministerstwa Finansów w obecnej edycji prognozy wykorzystaliśmy prognozę demograficzną przygotowaną w 2022 r. przez Ministerstwo Finansów dla potrzeb długoterminowych założeń makroekonomicznych. W poprzedniej prognozie wpływów i wydatków funduszu emerytalnego (z maja 2019 r.) wykorzystaliśmy prognozę demograficzną przygotowaną w 2019 r. przez Ministerstwo Finansów. Z uwagi na zmianę prognozy demograficznej w analizie wrażliwości (dodatek B) przedstawiliśmy wpływ zastosowania prognozy demograficznej Ministerstwa Finansów z 2019 r. na prognozowane wydatki i wpływy funduszu emerytalnego. W dodatku A zamieściliśmy krótki opis tej prognozy demograficznej.

Prezentowane wyniki dotyczą funduszu emerytalnego i obejmują okres od roku 2023 do roku 2080 i są efektem przeliczeń modelu FUS20. Prognozę sporządziliśmy w trzech wariantach: wariant nr 1 – pośredni, wariant nr 2 – pesymistyczny i wariant nr 3 – optymistyczny.

W prognozie uwzględniliśmy zmiany przepisów wprowadzone od czasu poprzedniej edycji, które mają wpływ na sytuację finansową funduszu emerytalnego.

***

Prognoza jest adekwatna do stanu prawnego obowiązującego na moment zakończenia budowy modelu prognostycznego (wrzesień 2022 r.).

Podstawowe dane z przeszłych lat o funduszu emerytalnym oraz o Funduszu Rezerwy Demograficznej dostępne są w sprawozdaniach z wykonania planu finansowego Funduszu Ubezpieczeń Społecznych oraz z wykonania planu finansowego Funduszu Rezerwy Demograficznej. Powyższe sprawozdania zamieszczone są w Biuletynie Informacji Publicznej na stronie internetowej ZUS.

### Najważniejsze informacje o modelu FUS20

Model FUS20 sporządziliśmy zgodnie z zasadami nauk aktuarialnych. Jest to model prognostyczny o charakterze długoterminowym – w oparciu o dane historyczne i parametry wejściowe prognozuje do 2080 roku wpływy i wydatki czterech funduszy wchodzących w skład Funduszu Ubezpieczeń Społecznych:
*   funduszu emerytalnego,
*   funduszu rentowego,
*   funduszu wypadkowego,
*   funduszu chorobowego.

Zastosowane w modelu FUS20 metody obliczeniowe szacują osobno wydatki na poszczególne świadczenia wypłacane z funduszy: emerytalnego, rentowego, wypadkowego i chorobowego. Wpływy również prognozujemy w podziale na poszczególne fundusze. Uwzględniamy przy tym różne liczby osób objętych ubezpieczeniami: emerytalnym i rentowymi, wypadkowym oraz chorobowym. W metodzie prognozowania wpływów do funduszu emerytalnego uwzględniamy między innymi:
*   odpływ części składek do Funduszu Rezerwy Demograficznej¹,
*   odpływ części składek do otwartych funduszy emerytalnych,
*   ograniczenie rocznej podstawy wymiaru składek na ubezpieczenia emerytalne i rentowe do trzydziestokrotności przeciętnego miesięcznego wynagrodzenia.

W prognozie po stronie wpływów uwzględniliśmy również wpływy ze środków przenoszonych z otwartych funduszy emerytalnych do funduszu emerytalnego z tytułu osiągnięcia wieku o 10 lat niższego od wieku emerytalnego (środki przenoszone w ramach tzw. „suwaka bezpieczeństwa”). Uwzględniliśmy także dobrowolność w przekazywaniu składek do otwartych funduszy emerytalnych.

¹ Zgodnie z ustawą o systemie ubezpieczeń społecznych środki przekazywane do FRD stanowią jednocześnie przychód i koszt FUS. W niniejszej prognozie środki te nie są uwzględniane ani po stronie wpływów ani po stronie wydatków.

***

W modelu uwzględniliśmy pełne dane statystyczne z 2021 r. oraz dostępne dane do sierpnia 2022 r. Dane, które dotyczą ubezpieczonych i świadczeniobiorców pochodzą z systemów informatycznych Zakładu Ubezpieczeń Społecznych. Uwzględniliśmy również dane o stanie środków w otwartych funduszach emerytalnych w podziale na kohorty wiekowo-płciowe według stanu na koniec grudnia 2021 r. (dane z Urzędu Komisji Nadzoru Finansowego).

Model wykonuje większość obliczeń w podziale na kohorty wiekowo-płciowe stosując klasyczne metody aktuarialne. Przy szacowaniu liczby emerytów i rencistów zastosowaliśmy model szkodowości wielorakiej (ang. multiple decrement model), który uwzględnia różne możliwości utraty statusu pobierającego dane świadczenie.

### Najważniejsze zmiany w porównaniu do poprzedniej edycji prognozy

Od czasu opublikowania poprzedniej edycji prognozy wpływów i wydatków funduszu emerytalnego wprowadzone zostały liczne zmiany w przepisach dotyczących ubezpieczeń społecznych, które mają istotny wpływ na sytuację finansową funduszu emerytalnego.

Poniżej wypunktowaliśmy zmiany przepisów, które mają wpływ na sytuację finansową funduszu emerytalnego, wprowadzone od czasu poprzedniej publikacji i które uwzględniliśmy w bieżącej edycji modelu:
*   ustawa z dnia 12 grudnia 2019 r. o zmianie ustawy o systemie ubezpieczeń społecznych oraz ustawy o Krajowej Administracji Skarbowej (Dz.U. z 2019 r. poz. 2550),
*   ustawa z dnia 9 stycznia 2020 r. o zmianie ustawy o emeryturach i rentach z Funduszu Ubezpieczeń Społecznych oraz niektórych innych ustaw (Dz.U. z 2020 r. poz. 252),
*   art. 53 ustawy z dnia 14 maja 2020 r. o zmianie niektórych ustaw w zakresie działań osłonowych w związku z rozprzestrzenianiem się wirusa SARS-CoV-2 (Dz.U. z 2020 r. poz. 875, 1086, 2255),
*   ustawa z dnia 19 czerwca 2020 r. o zmianie ustawy o emeryturach i rentach z Funduszu Ubezpieczeń Społecznych (Dz.U. z 2020 r. poz. 1222),
*   ustawa z dnia 21 stycznia 2021 r. o zmianie ustawy o emeryturach i rentach z Funduszu Ubezpieczeń Społecznych oraz niektórych innych ustaw (Dz.U. z 2021 r. poz. 353),
*   ustawa z dnia 24 czerwca 2021 r. o zmianie ustawy o systemie ubezpieczeń społecznych oraz niektórych innych ustaw (Dz.U. z 2021 r. poz. 1621).

***

### Najważniejsze założenia

#### Prognoza demograficzna

Z uwagi na spójność z założeniami makroekonomicznymi Ministerstwa Finansów w prognozie wpływów i wydatków funduszu emerytalnego wykorzystaliśmy prognozę demograficzną przygotowaną w 2022 r. przez Ministerstwo Finansów dla potrzeb długoterminowych założeń makroekonomicznych. Prognoza demograficzna zakłada wzrost współczynnika dzietności z 1,33 w 2022 r. do 1,56 w 2080 r.

#### Założenia modelowe

Najważniejsze założenia modelowe:
1.  Fundusz emerytalny zasilany jest wyłącznie wpływami składkowymi oraz wpływami z „suwaka bezpieczeństwa”.
2.  Dla każdego rodzaju świadczenia emerytalno-rentowego: jednostajne rozkłady prawdopodobieństwa utraty w ciągu roku statusu uprawnionego do tego świadczenia z powodu: dokonania zamiany, utraty uprawnień i śmierci, pod warunkiem, że dane zdarzenie nastąpi.
3.  Rozłączność zdarzeń, o których mowa w punkcie 2.
4.  Prawdopodobieństwo, że osoba w wieku 110 lat przeżyje jeszcze rok wynosi zero.
5.  Dla każdego rodzaju świadczenia emerytalno-rentowego: jednostajne rozkłady prawdopodobieństwa przejścia na to świadczenie w ciągu roku pod warunkiem, że przejście w danym roku nastąpi.
6.  Jednostajny rozkład urodzeń w ciągu roku.
7.  Osoba, której świadczenie przyznano w danym roku (niezależnie od tego czy jest ona nowym świadczeniobiorcą czy też dokonała zamiany świadczenia) może – w roku przyznania – utracić status uprawnionego do tego świadczenia wyłącznie z powodu zgonu.
8.  Kwotę środków przenoszonych w danym roku z otwartych funduszy emerytalnych do funduszu emerytalnego FUS w ramach „suwaka bezpieczeństwa” obliczaliśmy poprzez przemnożenie przeciętnej kwoty przenoszonych środków oraz liczby ubezpieczonych będących członkami otwartych funduszy emerytalnych. Przy czym w modelu przeciętną kwotę przenoszonych środków obliczaliśmy dla osób, które byłyby członkami otwartych funduszy emerytalnych w warunkach przed zmianami wprowadzonymi ustawą z dnia 6 grudnia 2013 r. o zmianie niektórych ustaw w związku z określeniem zasad wypłaty emerytur ze środków zgromadzonych w otwartych funduszach emerytalnych.
9.  Na podstawie dostępnych danych o ubezpieczonych, którzy odprowadzają nadal składki do otwartych funduszy emerytalnych oszacowaliśmy i uwzględniliśmy w modelu proporcje średnich podstaw wymiaru składek dla tych osób w stosunku do średnich

***

podstaw wymiaru składek dla członków otwartych funduszy emerytalnych przed zmianami wprowadzonymi ustawą z dnia 6 grudnia 2013 r. o zmianie niektórych ustaw w związku z określeniem zasad wypłaty emerytur ze środków zgromadzonych w otwartych funduszach emerytalnych.
10. Przyjęliśmy, że w przypadku śmierci ubezpieczonego oraz w przypadku śmierci osoby pobierającej okresową emeryturę kapitałową 50% kwoty zewidencjonowanej na subkoncie osoby zmarłej ewidencjonowane jest na subkoncie osoby płci przeciwnej w tym samym wieku co osoba zmarła, a 50% wypłacane jest jednorazowo.
11. W przypadku jednorazowych wypłat po zmarłym ubezpieczonym oraz po zmarłej osobie, która pobierała okresową emeryturę kapitałową przyjęliśmy, że kwota jednorazowych wypłat w roku t+1 stanowi iloczyn liczby osób, które posiadają subkonta na koniec roku t, prawdopodobieństwa śmierci w roku t+1, przeciętnej kwoty składek zewidencjonowanych na subkoncie na koniec roku t i 50%.

**Ważne!**

Wyniki uzyskane w efekcie przeliczenia modelu FUS20 zależą w sposób zasadniczy od prognozy demograficznej zasilającej model oraz od parametrów scenariusza takich jak:
*   stopa bezrobocia,
*   wskaźnik realnego wzrostu przeciętnego wynagrodzenia,
*   średnioroczny wskaźnik cen towarów i usług konsumpcyjnych ogółem (inflacja) oraz dla gospodarstw domowych emerytów i rencistów,
*   realny wzrost produktu krajowego brutto,
*   ściągalność składek,
*   stopa zwrotu z otwartych funduszy emerytalnych.

Oprócz wymienionych powyżej, model zasilany jest przez szereg parametrów o charakterze technicznym.

#### Parametry

Ministerstwo Finansów jest instytucją, która przygotowuje założenia makroekonomiczne do projektu ustawy budżetowej oraz wytyczne dotyczące stosowania jednolitych wskaźników makroekonomicznych będących podstawą oszacowania skutków finansowych projektowanych ustaw. Dlatego we wszystkich wariantach prognozy posłużyliśmy się założeniami makroekonomicznymi przygotowanymi przez Departament Polityki Makroekonomicznej Ministerstwa Finansów we wrześniu 2022 r. Szczegółowe informacje zawierają tabele od 1.1 do 1.3.

Przyjęliśmy, że nominalna stopa zwrotu uzyskiwana przez otwarte fundusze emerytalne będzie równa stopie nominalnego wzrostu PKB. Powyższe założenie zastosowaliśmy począwszy od stóp zwrotu za 2023 r.

***

We wszystkich wariantach wskaźniki waloryzacji świadczeń przyjęliśmy na najniższym poziomie, który wynika z przepisów (tzn. na poziomie wskaźników cen towarów i usług konsumpcyjnych zwiększonych o 20% realnego wzrostu przeciętnego wynagrodzenia). Przy czym przy obliczaniu wskaźników waloryzacji świadczeń przyjęliśmy, że sformułowanie „zwiększenie o co najmniej 20% realnego wzrostu przeciętnego wynagrodzenia” oznacza działanie dodania składnika wynoszącego co najmniej 20% stopy realnego wzrostu przeciętnego wynagrodzenia.

W wariancie nr 1 założyliśmy utrzymanie częstości przyznawania emerytur (w tym emerytur górniczych) na średnim poziomie zaobserwowanym w roku 2021. W wariantach nr 2 i 3 założyliśmy odpowiednio zwiększenie lub zmniejszenie – w porównaniu z wariantem nr 1 – częstości przyznawania emerytur. Ponadto w wariancie nr 1 założyliśmy utrzymanie częstości przyznawania rent z tytułu niezdolności do pracy finansowanych z funduszu rentowego na średnim poziomie zaobserwowanym w latach 2019-2021. W wariantach nr 2 i 3 odpowiednio zwiększyliśmy lub zmniejszyliśmy estymator prawdopodobieństwa przyznania tych rent. Renty z tytułu niezdolności do pracy finansowane z funduszu rentowego są z urzędu zamieniane na emerytury finansowane z funduszu emerytalnego w momencie ukończenia powszechnego wieku emerytalnego przez osoby je pobierające.

W wariantach nr 2 i 3 uwzględniliśmy dodatkowy wskaźnik zmniejszenia lub zwiększenia liczby ubezpieczonych w porównaniu do wariantu nr 1. Wskaźnik ten przyjęliśmy na poziomie odpowiednich stosunków liczb osób aktywnych zawodowo z wariantów nr 2 i 3 do liczb osób aktywnych zawodowo w wariancie nr 1. Liczby osób aktywnych zawodowo obliczyliśmy na podstawie prognoz dotyczących liczb osób pracujących oraz stóp bezrobocia dostarczonych przez Departament Polityki Makroekonomicznej Ministerstwa Finansów.

W poniższych tabelach zestawiliśmy najważniejsze parametry poszczególnych wariantów: założenia makroekonomiczne i ściągalność składek.

***

**Tabela 1.1. Wybrane parametry - wariant nr 1**
wersja prognozy demograficznej: Prognoza Ministerstwa Finansów z 2022 r.

| rok | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1. stopa bezrobocia (stan na koniec roku) | 5,00% | 5,40% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% | 5,00% |
| 2. średnioroczny wskaźnik cen towarów i usług konsumpcyjnych ogółem | 113,50% | 109,80% | 104,80% | 103,10% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% |
| 3. średnioroczny wskaźnik cen towarów i usług konsumpcyjnych dla gospodarstw domowych emerytów i rencistów | 113,80% | 110,10% | 105,10% | 103,40% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% |
| 4. wskaźnik realnego wzrostu przeciętnego wynagrodzenia | 98,00% | 100,30% | 103,40% | 103,70% | 103,50% | 103,00% | 102,90% | 102,90% | 102,90% | 102,90% | 102,90% | 102,80% | 102,70% | 102,60% | 102,50% | 102,40% | 102,40% | 102,30% | 102,20% | 102,10% | 102,00% |
| 5. wskaźnik realnego wzrostu PKB | 104,60% | 101,70% | 103,10% | 103,10% | 102,90% | 102,90% | 102,90% | 102,80% | 102,70% | 102,70% | 102,60% | 102,40% | 102,00% | 101,60% | 101,40% | 101,40% | 101,60% | 101,70% | 101,50% | 101,30% | 101,20% |
| 6. ściągalność składek | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% | 99,00% |

**Tabela 1.2. Wybrane parametry - wariant nr 2**
wersja prognozy demograficznej: Prognoza Ministerstwa Finansów z 2022 r.

| rok | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1. stopa bezrobocia (stan na koniec roku) | 5,50% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% | 6,00% |
| 2. średnioroczny wskaźnik cen towarów i usług konsumpcyjnych ogółem | 113,50% | 109,80% | 104,80% | 103,10% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% |
| 3. średnioroczny wskaźnik cen towarów i usług konsumpcyjnych dla gospodarstw domowych emerytów i rencistów | 113,80% | 110,10% | 105,10% | 103,40% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% |
| 4. wskaźnik realnego wzrostu przeciętnego wynagrodzenia | 97,50% | 99,80% | 102,90% | 103,00% | 102,80% | 102,50% | 102,40% | 102,40% | 102,40% | 102,40% | 102,40% | 102,30% | 102,20% | 102,10% | 101,90% | 101,80% | 101,70% | 101,60% | 101,50% | 101,40% | 101,20% |
| 5. wskaźnik realnego wzrostu PKB | 104,20% | 101,40% | 102,80% | 102,80% | 102,60% | 102,50% | 102,50% | 102,50% | 102,40% | 102,40% | 102,30% | 102,00% | 101,60% | 101,20% | 101,00% | 101,00% | 101,20% | 101,30% | 101,10% | 100,80% | 100,70% |
| 6. ściągalność składek | 99,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% | 98,00% |

***

**Tabela 1.3. Wybrane parametry - wariant nr 3**
wersja prognozy demograficznej: Prognoza Ministerstwa Finansów z 2022 r.

| rok | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1. stopa bezrobocia (stan na koniec roku) | 4,80% | 5,00% | 4,70% | 4,60% | 4,40% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% | 4,20% |
| 2. średnioroczny wskaźnik cen towarów i usług konsumpcyjnych ogółem | 113,50% | 109,80% | 104,80% | 103,10% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% | 102,50% |
| 3. średnioroczny wskaźnik cen towarów i usług konsumpcyjnych dla gospodarstw domowych emerytów i rencistów | 113,80% | 110,10% | 105,10% | 103,40% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% | 102,80% |
| 4. wskaźnik realnego wzrostu przeciętnego wynagrodzenia | 98,50% | 100,80% | 103,70% | 104,00% | 103,80% | 103,40% | 103,40% | 103,40% | 103,40% | 103,40% | 103,30% | 103,30% | 103,20% | 103,20% | 103,10% | 103,10% | 103,00% | 102,90% | 102,90% | 102,80% | 102,80% |
| 5. wskaźnik realnego wzrostu PKB | 105,00% | 102,10% | 103,30% | 103,30% | 103,20% | 103,20% | 103,20% | 103,20% | 103,10% | 103,10% | 103,00% | 102,80% | 102,40% | 102,10% | 101,90% | 101,80% | 102,00% | 102,20% | 102,00% | 101,80% | 101,60% |
| 6. ściągalność składek | 99,00% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% | 99,50% |

***

### Wyniki prognozy

#### Zastrzeżenie

Model prognostyczny opracowaliśmy zgodnie z metodami matematyki aktuarialnej. Generowane przez niego wyniki zależą od przyjętych założeń, w tym od prognoz makroekonomicznych i demograficznych. Odchylenia przyszłych realizacji od prognozy będą konsekwencją przyjętych założeń oraz będą wynikały z istoty zjawisk losowych.

#### Zmiany sytuacji demograficznej w Polsce. Starzenie się społeczeństwa

Poniższy opis dotyczy prognozy demograficznej przygotowanej przez Ministerstwo Finansów w 2022 r. dla celów długoterminowych założeń makroekonomicznych.

Procesy demograficzne, poprzez swój silny, bezpośredni wpływ na liczby emerytów i ubezpieczonych, oddziałują istotnie na sytuację finansową funduszu emerytalnego. Wyniki prognozy demograficznej należy w tym kontekście uznać za co najmniej niepokojące. Zgodnie z prognozą demograficzną liczebność całej populacji Polski spada z 37,9 mln w 2022 r. do 32,5 mln w 2060 r. i do 28,2 mln w 2080 r. Oznacza to, że populacja Polski w 2080 r. będzie mniejsza niż obecnie o 9,7 mln, tzn. o 25,5%.

Liczba osób w wieku przedprodukcyjnym (0-17 lat) maleje do 2042 r. W latach 2043-2054 liczba ta utrzymuje się na podobnym poziomie (5,2-5,3 mln osób), po czym spada, osiągając w 2080 r. poziom o 2,7 mln mniejszy niż w 2022 r. Populacja w wieku produkcyjnym (mężczyźni w wieku 18-64 lata i kobiety w wieku 18-59 lat) cały czas maleje, osiągając w 2060 r. poziom o 7,0 mln osób niższy niż w 2022 r., a w 2080 r. już o ponad 9,2 mln niższy niż w 2022 r., tzn. o 41,4% mniej niż w 2022 r. Populacja osób w wieku poprodukcyjnym (mężczyźni w wieku 65 lat i więcej oraz kobiety w wieku 60 lat i więcej) rośnie do 2058 r., osiągając poziom 12,4 mln, tzn. o 3,7 mln osób wyższy niż w 2022 r. (wzrost o 42,3%). Od 2059 r. populacja osób w wieku poprodukcyjnym spada i osiąga 11,0 mln w 2080 r. Spadek populacji w wieku poprodukcyjnym po 2058 r. związany jest z jednej strony z wymieraniem wyżu demograficznego lat osiemdziesiątych XX wieku, a z drugiej strony z wchodzeniem w wiek poprodukcyjny osób z niżu demograficznego przełomu XX i XXI wieku.

Istotnie zmieniają się także udziały ekonomicznych grup wieku w całej populacji. Udział populacji w wieku przedprodukcyjnym spada z 18,2% w 2022 r. do 14,8% w 2040 r., po czym rośnie do 2053 r. (15,5%), by ponownie spaść do minimalnego poziomu 14,2% w 2069 r. W 2080 r. udział populacji w wieku przedprodukcyjnym wynosi 15,0%. Udział ludności w wieku produkcyjnym maleje z 58,8% w 2022 r. do 58,3% w 2025 r., po czym wzrasta do 58,5% w 2028 r. Od 2029 r. do 2059 r. ponownie następuje spadek tego

***

udziału do poziomu 47,1%. Następnie udział populacji w wieku produkcyjnym rośnie do 2067 r. do poziomu 47,6% i po kolejnym spadku w 2080 r. osiąga minimalny poziom 46,2%. Udział populacji w wieku poprodukcyjnym cały czas rośnie z 23,0% w 2022 r. do 38,8% w 2080 r.

Bardziej szczegółowe informacje zawierają tabele 2 i 3. W tabeli 2 oraz na wykresie 1.1 przedstawiliśmy prognozę ludności Polski w podziale na ekonomiczne grupy wieku: przedprodukcyjny, produkcyjny i poprodukcyjny. Tabela 3 ukazuje udziały grup ekonomicznych w całej populacji.

**Tabela 2. Populacja w podziale na ekonomiczne grupy wieku (w tysiącach) - stan na koniec roku**

| | 2022 | 2025 | 2030 | 2040 | 2050 | 2060 | 2070 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Populacja ogółem** | 37 915 | 37 419 | 36 604 | 35 273 | 34 121 | 32 543 | 30 575 | 28 249 |
| z tego: | | | | | | | | |
| - w wieku przedprodukcyjnym | 6 905 | 6 673 | 6 035 | 5 221 | 5 255 | 4 853 | 4 339 | 4 229 |
| - w wieku produkcyjnym | 22 307 | 21 817 | 21 386 | 19 694 | 16 886 | 15 345 | 14 523 | 13 061 |
| - w wieku poprodukcyjnym | 8 703 | 8 929 | 9 184 | 10 358 | 11 981 | 12 345 | 11 713 | 10 960 |

**Źródło:** Prognoza demograficzna przygotowana przez Ministerstwo Finansów w 2022 r. dla potrzeb długoterminowych założeń makroekonomicznych.

**Tabela 3. Udziały poszczególnych grup ekonomicznych w całej populacji; - stan na koniec roku**

| Populacja: | 2022 | 2025 | 2030 | 2040 | 2050 | 2060 | 2070 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - w wieku przedprodukcyjnym | 18,2% | 17,8% | 16,5% | 14,8% | 15,4% | 14,9% | 14,2% | 15,0% |
| - w wieku produkcyjnym | 58,8% | 58,3% | 58,4% | 55,8% | 49,5% | 47,2% | 47,5% | 46,2% |
| - w wieku poprodukcyjnym | 23,0% | 23,9% | 25,1% | 29,4% | 35,1% | 37,9% | 38,3% | 38,8% |

**Źródło:** Obliczenia własne na podstawie prognozy demograficznej przygotowanej przez Ministerstwo Finansów w 2022 r. dla potrzeb długoterminowych założeń makroekonomicznych.

***

**Wykres 1.1. Populacja w podziale na ekonomiczne grupy wieku - wykres dla wybranych lat**



**Źródło:** Prognoza demograficzna przygotowana przez Ministerstwo Finansów w 2022 r. dla potrzeb długoterminowych założeń makroekonomicznych.

Niekorzystne zmiany w strukturze populacji dobrze obrazuje stosunek liczby osób w wieku poprodukcyjnym do liczby osób w wieku produkcyjnym. Zgodnie z prognozą demograficzną iloraz ten rośnie do 2061 r., po czym nieznacznie spada do 2067 r. i znów rośnie do 2080 r. W 2022 r. na 1000 osób w wieku produkcyjnym przypada 390 osób w wieku poprodukcyjnym, w 2061 r. - 806 osób, a w 2080 r. - 839 osób. Wzrost proporcji liczby osób w wieku poprodukcyjnym do liczby osób w wieku produkcyjnym jest wyraźnie większy od połowy lat trzydziestych do połowy lat pięćdziesiątych XXI wieku. Jest to spowodowane przechodzeniem z wieku produkcyjnego do wieku poprodukcyjnego wyżu demograficznego z przełomu lat siedemdziesiątych i osiemdziesiątych XX wieku. Spadek współczynnika obciążenia demograficznego od 2062 r. wynika z jednej strony z osiągania wieku poprodukcyjnego przez osoby z niżu demograficznego przełomu XX i XXI wieku, a z drugiej strony z wymierania osób z wyżu demograficznego z przełomu lat siedemdziesiątych i lat osiemdziesiątych XX wieku.
Iloraz liczby osób w wieku nieprodukcyjnym do liczby osób w wieku produkcyjnym początkowo rośnie do 2025 r., po czym nieznacznie spada do 2028 r. i znów rośnie do 2059 r. Od 2060 do 2067 r. obserwujemy kolejny spadek tego ilorazu, po czym do 2080 r. znów następuje wzrost. W 2022 r. na 1000 osób w wieku produkcyjnym przypada 700 osób w wieku nieprodukcyjnym, w 2059 r. jest to 1 121 osób, a w 2080 r. liczba ta wynosi 1 163.

***

**Wykres 1.2. Liczba osób w wieku poprodukcyjnym i nieprodukcyjnym na 1000 osób w wieku produkcyjnym**



**Źródło:** obliczenia własne na podstawie prognozy demograficznej przygotowanej przez Ministerstwo Finansów w 2022 r. dla potrzeb długoterminowych założeń makroekonomicznych.

Starzenie się społeczeństwa Polski oznacza, że Polacy będą średnio coraz starsi. Mediana wieku (wyznaczająca granicę wieku, którą połowa populacji już przekroczyła, a druga połowa jeszcze nie osiągnęła) rośnie osiągając w 2073 r. ponad 53,5 roku, tzn. poziom o 11,2 roku wyższy niż w 2022 r. Po 2073 r. mediana wieku maleje i w 2080 r. osiąga poziom 53,0 lat.

Zmiany w strukturze populacji dobrze obrazują piramidy wieku. Na poniższym wykresie przedstawiliśmy piramidy wieku dla 2023 r., 2050 r. oraz 2080 r.

***

**Wykres 1.3. Piramidy wieku**

**Rok 2023**


**Rok 2050**


**Rok 2080**


**Źródło:** prognoza demograficzna przygotowana przez Ministerstwa Finansów w 2022 r. dla potrzeb długoterminowych założeń makroekonomicznych.

***

### Uwagi do wyników prognozy

1.  Saldo roczne jest różnicą wpływów i wydatków funduszu emerytalnego w danym roku, jest to zatem wynik finansowy wyłącznie z rocznej działalności funduszu.
2.  W wynikach prognozy po stronie wpływów uwzględniliśmy wpływy składkowe oraz środki przenoszone z otwartych funduszy emerytalnych do funduszu emerytalnego (wyodrębnionego w Funduszu Ubezpieczeń Społecznych) w ramach tzw. „suwaka bezpieczeństwa”.
3.  We wpływach uwzględniliśmy przekazywanie z budżetu państwa składek za osoby: przebywające na urlopach wychowawczych, pobierające zasiłki macierzyńskie oraz sprawujące osobistą opiekę nad dziećmi.
4.  W wydatkach funduszu emerytalnego uwzględniliśmy wydatki na wszystkie emerytury wypłacane z funduszu emerytalnego wyodrębnionego w ramach Funduszu Ubezpieczeń Społecznych (łącznie z emeryturami ze środków zewidencjonowanych na subkontach oraz łącznie z emeryturami przyznanymi z urzędu zamiast renty z tytułu niezdolności do pracy wypłacanymi z funduszu emerytalnego ale bez emerytur przyznanych z urzędu zamiast renty z tytułu niezdolności do pracy osobom urodzonym przed 1949 r., które nie mają okresu składkowego i nieskładkowego wynoszącego co najmniej 20 lat dla kobiet i co najmniej 25 lat dla mężczyzn, gdyż te ostatnie finansowane są z funduszu rentowego). Obok wydatków na emerytury z funduszu emerytalnego uwzględniliśmy część odpisu na działalność Zakładu Ubezpieczeń Społecznych.
5.  Liczba emerytów obejmuje wszystkie osoby, które pobierają emerytury finansowane z funduszu emerytalnego wyodrębnionego w ramach Funduszu Ubezpieczeń Społecznych (także osoby, które pobierają emerytury w zbiegu z rentami z tytułu niezdolności do pracy).
6.  Przez współczynnik obciążenia systemowego należy rozumieć iloraz liczby emerytów (o której mowa w pkt 5) i liczby osób objętych ubezpieczeniem emerytalnym.
7.  Wydolność funduszu emerytalnego zdefiniowaliśmy jako iloraz wpływów i wydatków funduszu. Kategoria ta ma charakter jakościowy, w czytelny sposób opisuje w jakim stopniu bieżące potrzeby systemu emerytalnego są zaspokajane bieżącymi składkami oraz wpływami z „suwaka bezpieczeństwa”.
8.  Przy obliczaniu wydolności dla funduszu emerytalnego uwzględniliśmy również środki przekazywane z otwartych funduszy emerytalnych do funduszu emerytalnego (wyodrębnionego w Funduszu Ubezpieczeń Społecznych) w ramach „suwaka bezpieczeństwa”.
9.  Wpływy do funduszu emerytalnego prezentowane jako procent sumy rocznych podstaw wymiaru składek na ubezpieczenie emerytalne uwzględniają również środki przekazywane z otwartych funduszy emerytalnych do funduszu emerytalnego

***

(wyodrębnionego w Funduszu Ubezpieczeń Społecznych) w ramach „suwaka bezpieczeństwa”.
10. Jako stopę dyskontową przyjęliśmy stopę inflacji (wyniki w kwotach zdyskontowanych na 2021 r.) Wyniki w kwotach zdyskontowanych umożliwiają porównywanie kwot między poszczególnymi latami.

**Ważne!**

W rzeczywistości przychody funduszu emerytalnego pochodzą nie tylko ze składek oraz z wpływów z tzw. „suwaka bezpieczeństwa”, ale także między innymi z refundacji z tytułu przekazania składek do otwartych funduszy emerytalnych oraz z dotacji z budżetu państwa. Fundusz emerytalny może być również zasilany środkami z Funduszu Rezerwy Demograficznej. Tymczasem w wynikach prognozy po stronie wpływów uwzględniliśmy wyłącznie wpływy składkowe oraz wpływy z tzw. „suwaka bezpieczeństwa”. Dzięki takiemu ujęciu prognoza daje niezakłócony obraz wyniku rocznej działalności funduszu emerytalnego dla każdego kolejnego prognozowanego roku. Dlatego też prezentowane w prognozie kwoty deficytów rocznych funduszu emerytalnego (ujemnych sald rocznych funduszu emerytalnego) nie będą w całości pokrywane z dotacji z budżetu państwa.

### Opis wyników prognozy wpływów i wydatków funduszu emerytalnego do 2080 r.

W wariantach nr 1 i 2 przez wszystkie lata aż do końca horyzontu prognozy fundusz emerytalny osiąga ujemne saldo roczne. Oznacza to, że bieżące wpływy składkowe do funduszu emerytalnego oraz wpływy z tzw. „suwaka bezpieczeństwa” nie pokrywają wydatków na emerytury finansowane z tego funduszu oraz części odpisu na ZUS. W wariancie nr 3 deficyt funduszu emerytalnego obserwujemy do 2066 r., a od 2067 r. fundusz emerytalny osiąga nadwyżki roczne.

W wariantach nr 1 i 2 odnotowujemy podobny co do kształtu przebieg zdyskontowanego² salda rocznego. Po okresie pogłębiającego się deficytu rocznego, który osiąga swoją największą wartość w 2030 r. dla wariantu nr 1 i w 2031 r. dla wariantu nr 2, następuje wzrost salda rocznego (co oznacza spadek deficytu) do 2040 r. w wariancie nr 1 i do 2039 r. w wariancie nr 2. Następnie ponownie obserwujemy spadek salda rocznego do 2052 r. w wariantach nr 1 i nr 2. W obu tych wariantach w latach 2053-2073 saldo roczne funduszu emerytalnego rośnie, a następnie maleje do 2080 r. W przypadku wariantu nr 3 spadek salda rocznego funduszu emerytalnego odnotowujemy w latach 2023-2030. Potem następuje wzrost salda rocznego do 2044 r., a potem do 2050 r. saldo utrzymuje się na zbliżonym poziomie i od roku 2051 saldo ponownie rośnie do końca horyzontu prognozy. Największy deficyt roczny w kwotach zdyskontowanych inflacją na 2021 r. w prognozowanym okresie w poszczególnych wariantach wynosi: 93,1 mld zł w 2052 r. w wariancie nr 1, 118,6 mld zł

² Wartości zdyskontowane na 2021 r. Jako stopę dyskontową przyjęliśmy założoną uprzednio stopę inflacji.

***

w 2052 r. w wariancie nr 2 i 80,0 mld zł w 2030 r. w wariancie nr 3. Najmniejszy deficyt roczny w kwotach zdyskontowanych inflacją na 2021 r. osiągany jest w wariancie nr 1 w 2073 r. (45,7 mld zł), a w wariancie nr 2 w 2023 r. (64,6 mld zł). W wariancie nr 3 w 2080 r. osiągana jest największa nadwyżka roczna (30,4 mld zł).

Pogłębianie się deficytu rocznego funduszu emerytalnego w pierwszym okresie prognozy związane jest w dużej mierze z pobieraniem emerytur przez osoby z wyżu demograficznego lat powojennych. Na spadek deficytu rocznego funduszu emerytalnego w latach trzydziestych XXI wieku wpływ ma przechodzenie na emerytury osób z niżu demograficznego lat sześćdziesiątych ubiegłego wieku. Pogłębianie się deficytu rocznego funduszu emerytalnego w przypadku wariantów nr 1 i 2 oraz utrzymywanie się na zbliżonym poziomie deficytu w wariancie 3 w latach czterdziestych XXI wieku związane jest między innymi z przechodzeniem na emerytury osób z wyżu demograficznego lat osiemdziesiątych XX wieku. Na spadek deficytu od lat pięćdziesiątych XXI wieku wpływa z jednej strony przechodzenie na emerytury osób z niżu demograficznego przełomu XX i XXI wieku, a z drugiej strony wymieranie wyżu demograficznego lat osiemdziesiątych XX wieku.

Inaczej zachowuje się saldo roczne funduszu emerytalnego wyrażone w procencie PKB. Po okresie spadku salda rocznego funduszu emerytalnego w procencie PKB do 2027 r. w wariancie nr 1, do 2028 r. w wariancie nr 2 i do 2026 r. w wariancie nr 3, następuje wzrost salda do 2080 r. (z wyjątkiem lat 2077-2080 w wariancie nr 1). Inne zachowanie salda rocznego funduszu emerytalnego w procencie PKB niż w cenach stałych wynika z tego, że produkt krajowy brutto rośnie szybciej niż deficyt wyrażony w zł.

Miarą efektywności systemu emerytalnego jest jego wydolność. W wariantach nr 1 i 2 wydolność funduszu emerytalnego nie osiąga pułapu 100%. W wariancie nr 3 wydolność jest większa od 100% w latach 2067-2080. We wszystkich wariantach wydolność funduszu emerytalnego w ostatnim roku prognozy jest wyższa niż w 2023 r. Przy czym w wariancie nr 1 wzrost wydolności w 2080 r. w porównaniu do 2023 r. wynosi 16,8 punktu procentowego, w wariancie nr 2 3,5 punktu procentowego, a w wariancie nr 3 32,6 punktu procentowego.

We wszystkich wariantach współczynnik obciążenia systemowego rośnie do 2063 r. oraz w latach 2068-2080. Tempo tego wzrostu w latach 2035-2057 jest znacznie większe niż w innych latach. W latach 2063-2068 współczynnik obciążenia systemowego maleje. Zmiany współczynnika wynikają w dużej mierze z opisanych powyżej zmian demograficznych.

Szczegółowe wyniki prognozy zestawiliśmy w tabelach oraz zilustrowaliśmy na wykresach.

***

### Wyniki - Spis tabel i wykresów

*   **Tabela 4.** Saldo roczne funduszu emerytalnego
*   **Tabela 5.** Wpływy do funduszu emerytalnego
*   **Tabela 6.** Wydatki funduszu emerytalnego
*   **Tabela 7.** Saldo roczne funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny
*   **Wykres 2.** Saldo roczne funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny
*   **Tabela 8.** Wpływy do funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny
*   **Tabela 9.** Wydatki funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny
*   **Wykres 3.** Wpływy i wydatki roczne funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny
*   **Tabela 10.** Saldo roczne funduszu emerytalnego zdyskontowane inflacją na 2021 r.
*   **Wykres 4.** Saldo roczne funduszu emerytalnego zdyskontowane inflacją na 2021 r.
*   **Tabela 11.** Wpływy do funduszu emerytalnego zdyskontowane inflacją na 2021 r.
*   **Tabela 12.** Wydatki funduszu emerytalnego zdyskontowane inflacją na 2021 r.
*   **Wykres 5.** Wpływy i wydatki roczne funduszu emerytalnego zdyskontowane inflacją na 2021 r.
*   **Tabela 13.** Saldo roczne funduszu emerytalnego w procencie PKB
*   **Wykres 6.** Saldo roczne funduszu emerytalnego w procencie PKB
*   **Tabela 14.** Wpływy do funduszu emerytalnego w procencie PKB
*   **Tabela 15.** Wydatki funduszu emerytalnego w procencie PKB
*   **Wykres 7.** Wpływy i wydatki roczne funduszu emerytalnego w procencie PKB
*   **Tabela 16.** Wydolność funduszu emerytalnego
*   **Wykres 8.** Wydolność funduszu emerytalnego
*   **Tabela 17.** Liczba ubezpieczonych (ubezpieczenie emerytalne) – stan na koniec roku
*   **Tabela 18.** Liczba emerytów, których świadczenie wypłacane jest z funduszu emerytalnego – stan na koniec roku
*   **Wykres 9.** Liczby ubezpieczonych i emerytów, których świadczenie wypłacane jest z funduszu emerytalnego
*   **Tabela 19.** Współczynnik obciążenia systemowego
*   **Wykres 10.** Współczynnik obciążenia systemowego
*   **Tabele 20.1-3, Wykresy 11.1-3** wyniki dla poszczególnych wariantów wraz z wykresami

***

### Wyniki – tabele i wykresy

***

**Tabela 4. Saldo roczne funduszu emerytalnego [mln zł]**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | -74 244 | -80 552 | -68 871 |
| 2024 | -95 409 | -105 603 | -87 844 |
| 2025 | -108 900 | -122 239 | -99 458 |
| 2026 | -118 049 | -133 890 | -106 453 |
| 2027 | -125 365 | -143 176 | -111 279 |
| 2028 | -131 593 | -151 223 | -115 250 |
| 2029 | -136 815 | -158 079 | -118 697 |
| 2030 | -141 843 | -164 766 | -121 898 |
| 2031 | -144 842 | -169 498 | -122 859 |
| 2032 | -146 984 | -173 484 | -123 035 |
| 2035 | -153 997 | -186 478 | -122 649 |
| 2040 | -165 625 | -209 107 | -120 173 |
| 2045 | -194 829 | -249 044 | -131 352 |
| 2050 | -231 366 | -294 406 | -151 619 |
| 2055 | -258 254 | -331 741 | -158 427 |
| 2060 | -261 766 | -352 716 | -128 913 |
| 2065 | -230 572 | -351 552 | -40 161 |
| 2070 | -200 597 | -358 462 | 64 459 |
| 2075 | -214 704 | -403 983 | 130 709 |
| 2080 | -272 925 | -484 371 | 159 058 |

***

**Tabela 5. Wpływy do funduszu emerytalnego [mln zł]**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 180 724 | 175 203 | 185 707 |
| 2024 | 195 369 | 187 052 | 202 142 |
| 2025 | 208 538 | 197 468 | 217 067 |
| 2026 | 220 675 | 207 085 | 231 344 |
| 2027 | 232 259 | 216 443 | 245 525 |
| 2028 | 244 064 | 225 901 | 260 103 |
| 2029 | 256 595 | 235 933 | 275 376 |
| 2030 | 269 697 | 246 379 | 291 427 |
| 2031 | 283 752 | 257 566 | 308 787 |
| 2032 | 298 876 | 269 583 | 327 304 |
| 2035 | 346 992 | 306 971 | 388 098 |
| 2040 | 435 020 | 371 856 | 503 960 |
| 2045 | 526 695 | 433 849 | 635 479 |
| 2050 | 626 206 | 497 489 | 783 623 |
| 2055 | 747 785 | 573 564 | 967 366 |
| 2060 | 905 968 | 671 471 | 1 211 174 |
| 2065 | 1 111 477 | 795 441 | 1 539 638 |
| 2070 | 1 357 832 | 936 447 | 1 950 545 |
| 2075 | 1 637 427 | 1 085 709 | 2 444 481 |
| 2080 | 1 950 324 | 1 242 874 | 3 032 273 |

***

**Tabela 6. Wydatki funduszu emerytalnego [mln zł]**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 254 968 | 255 755 | 254 578 |
| 2024 | 290 778 | 292 655 | 289 986 |
| 2025 | 317 438 | 319 707 | 316 525 |
| 2026 | 338 724 | 340 975 | 337 797 |
| 2027 | 357 625 | 359 619 | 356 804 |
| 2028 | 375 657 | 377 124 | 375 353 |
| 2029 | 393 410 | 394 012 | 394 073 |
| 2030 | 411 540 | 411 146 | 413 325 |
| 2031 | 428 594 | 427 064 | 431 646 |
| 2032 | 445 860 | 443 067 | 450 339 |
| 2035 | 500 990 | 493 449 | 510 746 |
| 2040 | 600 645 | 580 963 | 624 133 |
| 2045 | 721 523 | 682 893 | 766 831 |
| 2050 | 857 572 | 791 896 | 935 242 |
| 2055 | 1 006 039 | 905 306 | 1 125 793 |
| 2060 | 1 167 734 | 1 024 187 | 1 340 087 |
| 2065 | 1 342 049 | 1 146 993 | 1 579 799 |
| 2070 | 1 558 429 | 1 294 909 | 1 886 086 |
| 2075 | 1 852 131 | 1 489 692 | 2 313 772 |
| 2080 | 2 223 250 | 1 727 245 | 2 873 215 |

***

**Tabela 7. Saldo roczne funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | -7,90% | -8,75% | -7,16% |
| 2024 | -9,39% | -10,76% | -8,40% |
| 2025 | -10,05% | -11,81% | -8,86% |
| 2026 | -10,32% | -12,35% | -8,92% |
| 2027 | -10,43% | -12,67% | -8,80% |
| 2028 | -10,45% | -12,86% | -8,63% |
| 2029 | -10,36% | -12,91% | -8,41% |
| 2030 | -10,25% | -12,92% | -8,18% |
| 2031 | -9,97% | -12,74% | -7,80% |
| 2032 | -9,63% | -12,49% | -7,39% |
| 2035 | -8,73% | -11,85% | -6,24% |
| 2040 | -7,48% | -10,95% | -4,70% |
| 2045 | -7,17% | -11,03% | -4,03% |
| 2050 | -7,06% | -11,20% | -3,72% |
| 2055 | -6,56% | -10,87% | -3,13% |
| 2060 | -5,48% | -9,86% | -2,03% |
| 2065 | -3,94% | -8,30% | -0,50% |
| 2070 | -2,80% | -7,19% | 0,63% |
| 2075 | -2,49% | -6,99% | 1,02% |
| 2080 | -2,65% | -7,32% | 1,00% |

***

**Wykres 2. Saldo roczne funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**



***

**Tabela 8. Wpływy składkowe do funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 19,23% | 19,04% | 19,32% |
| 2024 | 19,24% | 19,05% | 19,33% |
| 2025 | 19,25% | 19,07% | 19,34% |
| 2026 | 19,29% | 19,11% | 19,38% |
| 2027 | 19,33% | 19,15% | 19,42% |
| 2028 | 19,38% | 19,21% | 19,47% |
| 2029 | 19,43% | 19,26% | 19,52% |
| 2030 | 19,48% | 19,31% | 19,57% |
| 2031 | 19,53% | 19,36% | 19,61% |
| 2032 | 19,57% | 19,41% | 19,66% |
| 2035 | 19,67% | 19,51% | 19,75% |
| 2040 | 19,64% | 19,47% | 19,72% |
| 2045 | 19,40% | 19,22% | 19,48% |
| 2050 | 19,12% | 18,93% | 19,21% |
| 2055 | 18,99% | 18,80% | 19,09% |
| 2060 | 18,97% | 18,78% | 19,07% |
| 2065 | 18,97% | 18,78% | 19,07% |
| 2070 | 18,97% | 18,78% | 19,07% |
| 2075 | 18,97% | 18,78% | 19,07% |
| 2080 | 18,97% | 18,78% | 19,07% |

***

**Tabela 9. Wydatki funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 27,12% | 27,79% | 26,48% |
| 2024 | 28,63% | 29,81% | 27,72% |
| 2025 | 29,31% | 30,88% | 28,21% |
| 2026 | 29,60% | 31,46% | 28,29% |
| 2027 | 29,76% | 31,82% | 28,22% |
| 2028 | 29,83% | 32,07% | 28,09% |
| 2029 | 29,80% | 32,17% | 27,93% |
| 2030 | 29,73% | 32,23% | 27,75% |
| 2031 | 29,50% | 32,11% | 27,42% |
| 2032 | 29,20% | 31,90% | 27,04% |
| 2035 | 28,40% | 31,36% | 25,99% |
| 2040 | 27,12% | 30,43% | 24,42% |
| 2045 | 26,57% | 30,25% | 23,51% |
| 2050 | 26,19% | 30,14% | 22,93% |
| 2055 | 25,55% | 29,67% | 22,21% |
| 2060 | 24,45% | 28,64% | 21,10% |
| 2065 | 22,91% | 27,08% | 19,57% |
| 2070 | 21,78% | 25,97% | 18,44% |
| 2075 | 21,46% | 25,77% | 18,05% |
| 2080 | 21,63% | 26,10% | 18,07% |

***

**Wykres 3. Wpływy i wydatki roczne funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**



***

**Tabela 10. Saldo roczne funduszu emerytalnego zdyskontowane inflacją na 2021 r. [mln zł]**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | -59 575 | -64 637 | -55 263 |
| 2024 | -73 052 | -80 857 | -67 260 |
| 2025 | -80 874 | -90 780 | -73 862 |
| 2026 | -85 530 | -97 008 | -77 129 |
| 2027 | -88 616 | -101 206 | -78 659 |
| 2028 | -90 749 | -104 287 | -79 479 |
| 2029 | -92 049 | -106 356 | -79 859 |
| 2030 | -93 104 | -108 151 | -80 013 |
| 2031 | -92 754 | -108 544 | -78 677 |
| 2032 | -91 830 | -108 386 | -76 867 |
| 2035 | -89 342 | -108 186 | -71 155 |
| 2040 | -84 928 | -107 224 | -61 621 |
| 2045 | -88 299 | -112 871 | -59 531 |
| 2050 | -92 680 | -117 932 | -60 735 |
| 2055 | -91 435 | -117 453 | -56 091 |
| 2060 | -81 914 | -110 375 | -40 341 |
| 2065 | -63 773 | -97 234 | -11 108 |
| 2070 | -49 038 | -87 630 | 15 758 |
| 2075 | -46 391 | -87 287 | 28 242 |
| 2080 | -52 121 | -92 501 | 30 376 |

***

**Wykres 4. Saldo roczne funduszu emerytalnego zdyskontowane inflacją na 2021 r.**



***

**Tabela 11. Wpływy do funduszu emerytalnego zdyskontowane inflacją na 2021 r. [mln zł]**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 145 016 | 140 586 | 149 015 |
| 2024 | 149 587 | 143 220 | 154 773 |
| 2025 | 154 870 | 146 649 | 161 204 |
| 2026 | 159 886 | 150 040 | 167 616 |
| 2027 | 164 175 | 152 995 | 173 552 |
| 2028 | 168 311 | 155 786 | 179 373 |
| 2029 | 172 637 | 158 736 | 185 273 |
| 2030 | 177 027 | 161 721 | 191 290 |
| 2031 | 181 710 | 164 940 | 197 741 |
| 2032 | 186 727 | 168 425 | 204 487 |
| 2035 | 201 309 | 178 090 | 225 157 |
| 2040 | 223 066 | 190 677 | 258 416 |
| 2045 | 238 706 | 196 627 | 288 009 |
| 2050 | 250 843 | 199 282 | 313 901 |
| 2055 | 264 754 | 203 071 | 342 497 |
| 2060 | 283 504 | 210 123 | 379 012 |
| 2065 | 307 417 | 220 006 | 425 840 |
| 2070 | 331 936 | 228 924 | 476 830 |
| 2075 | 353 794 | 234 586 | 528 172 |
| 2080 | 372 457 | 237 354 | 579 079 |

***

**Tabela 12. Wydatki funduszu emerytalnego zdyskontowane inflacją na 2021 r. [mln zł]**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 204 591 | 205 223 | 204 278 |
| 2024 | 222 639 | 224 077 | 222 033 |
| 2025 | 235 744 | 237 429 | 235 066 |
| 2026 | 245 416 | 247 048 | 244 745 |
| 2027 | 252 791 | 254 201 | 252 211 |
| 2028 | 259 061 | 260 073 | 258 851 |
| 2029 | 264 686 | 265 092 | 265 133 |
| 2030 | 270 131 | 269 872 | 271 303 |
| 2031 | 274 463 | 273 484 | 276 418 |
| 2032 | 278 557 | 276 811 | 281 355 |
| 2035 | 290 651 | 286 276 | 296 312 |
| 2040 | 307 993 | 297 901 | 320 037 |
| 2045 | 327 005 | 309 498 | 347 539 |
| 2050 | 343 523 | 317 215 | 374 636 |
| 2055 | 356 189 | 320 524 | 398 588 |
| 2060 | 365 418 | 320 498 | 419 353 |
| 2065 | 371 190 | 317 240 | 436 947 |
| 2070 | 380 974 | 316 553 | 461 073 |
| 2075 | 400 185 | 321 873 | 499 930 |
| 2080 | 424 578 | 329 855 | 548 703 |

***

**Wykres 5. Wpływy i wydatki roczne funduszu emerytalnego zdyskontowane inflacją na 2021 r.**



***

**Tabela 13. Saldo roczne funduszu emerytalnego w procencie PKB**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | -2,2% | -2,4% | -2,1% |
| 2024 | -2,7% | -3,0% | -2,4% |
| 2025 | -2,9% | -3,2% | -2,6% |
| 2026 | -2,9% | -3,4% | -2,6% |
| 2027 | -2,9% | -3,4% | -2,6% |
| 2028 | -2,9% | -3,5% | -2,5% |
| 2029 | -2,9% | -3,4% | -2,5% |
| 2030 | -2,9% | -3,4% | -2,4% |
| 2031 | -2,8% | -3,3% | -2,3% |
| 2032 | -2,7% | -3,3% | -2,2% |
| 2035 | -2,4% | -3,1% | -1,8% |
| 2040 | -2,1% | -2,8% | -1,4% |
| 2045 | -2,0% | -2,7% | -1,2% |
| 2050 | -1,9% | -2,7% | -1,1% |
| 2055 | -1,8% | -2,6% | -0,9% |
| 2060 | -1,5% | -2,3% | -0,6% |
| 2065 | -1,1% | -1,9% | -0,2% |
| 2070 | -0,7% | -1,6% | 0,2% |
| 2075 | -0,7% | -1,5% | 0,3% |
| 2080 | -0,7% | -1,6% | 0,3% |

***

**Wykres 6. Saldo roczne funduszu emerytalnego w procencie PKB**



***

**Tabela 14. Wpływy do funduszu emerytalnego w procencie PKB**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 5,4% | 5,3% | 5,6% |
| 2024 | 5,5% | 5,3% | 5,6% |
| 2025 | 5,5% | 5,2% | 5,6% |
| 2026 | 5,5% | 5,2% | 5,7% |
| 2027 | 5,5% | 5,2% | 5,7% |
| 2028 | 5,4% | 5,2% | 5,7% |
| 2029 | 5,4% | 5,1% | 5,7% |
| 2030 | 5,4% | 5,1% | 5,7% |
| 2031 | 5,4% | 5,1% | 5,7% |
| 2032 | 5,4% | 5,1% | 5,7% |
| 2035 | 5,4% | 5,0% | 5,8% |
| 2040 | 5,4% | 4,9% | 5,9% |
| 2045 | 5,3% | 4,8% | 5,8% |
| 2050 | 5,2% | 4,6% | 5,8% |
| 2055 | 5,1% | 4,4% | 5,8% |
| 2060 | 5,1% | 4,3% | 5,8% |
| 2065 | 5,1% | 4,3% | 5,9% |
| 2070 | 5,1% | 4,2% | 5,9% |
| 2075 | 5,0% | 4,1% | 6,0% |
| 2080 | 5,0% | 4,0% | 6,0% |

***

**Tabela 15. Wydatki funduszu emerytalnego w procencie PKB**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 7,7% | 7,8% | 7,6% |
| 2024 | 8,1% | 8,3% | 8,0% |
| 2025 | 8,3% | 8,5% | 8,2% |
| 2026 | 8,4% | 8,6% | 8,3% |
| 2027 | 8,4% | 8,6% | 8,2% |
| 2028 | 8,4% | 8,6% | 8,2% |
| 2029 | 8,3% | 8,6% | 8,1% |
| 2030 | 8,3% | 8,5% | 8,1% |
| 2031 | 8,2% | 8,4% | 8,0% |
| 2032 | 8,1% | 8,3% | 7,9% |
| 2035 | 7,8% | 8,1% | 7,6% |
| 2040 | 7,5% | 7,7% | 7,3% |
| 2045 | 7,3% | 7,5% | 7,1% |
| 2050 | 7,1% | 7,3% | 6,9% |
| 2055 | 6,9% | 7,0% | 6,7% |
| 2060 | 6,5% | 6,6% | 6,4% |
| 2065 | 6,1% | 6,2% | 6,0% |
| 2070 | 5,8% | 5,8% | 5,7% |
| 2075 | 5,7% | 5,6% | 5,7% |
| 2080 | 5,7% | 5,6% | 5,7% |

***

**Wykres 7. Wpływy i wydatki roczne funduszu emerytalnego w procencie PKB**



***

**Tabela 16. Wydolność funduszu emerytalnego**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 71% | 69% | 73% |
| 2024 | 67% | 64% | 70% |
| 2025 | 66% | 62% | 69% |
| 2026 | 65% | 61% | 68% |
| 2027 | 65% | 60% | 69% |
| 2028 | 65% | 60% | 69% |
| 2029 | 65% | 60% | 70% |
| 2030 | 66% | 60% | 71% |
| 2031 | 66% | 60% | 72% |
| 2032 | 67% | 61% | 73% |
| 2035 | 69% | 62% | 76% |
| 2040 | 72% | 64% | 81% |
| 2045 | 73% | 64% | 83% |
| 2050 | 73% | 63% | 84% |
| 2055 | 74% | 63% | 86% |
| 2060 | 78% | 66% | 90% |
| 2065 | 83% | 69% | 97% |
| 2070 | 87% | 72% | 103% |
| 2075 | 88% | 73% | 106% |
| 2080 | 88% | 72% | 106% |

***

**Wykres 8. Wydolność systemu emerytalnego**



***

**Tabela 17. Liczba ubezpieczonych (ubezpieczenie emerytalne) [tys.] - stan na koniec roku**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 16 296 | 16 054 | 16 535 |
| 2024 | 16 283 | 15 947 | 16 552 |
| 2025 | 16 212 | 15 845 | 16 537 |
| 2026 | 16 147 | 15 753 | 16 537 |
| 2027 | 16 039 | 15 623 | 16 493 |
| 2028 | 15 942 | 15 506 | 16 422 |
| 2029 | 15 851 | 15 398 | 16 356 |
| 2030 | 15 751 | 15 282 | 16 278 |
| 2031 | 15 696 | 15 211 | 16 253 |
| 2032 | 15 640 | 15 141 | 16 225 |
| 2035 | 15 435 | 14 889 | 16 093 |
| 2040 | 14 926 | 14 323 | 15 675 |
| 2045 | 14 155 | 13 495 | 15 040 |
| 2050 | 13 277 | 12 614 | 14 175 |
| 2055 | 12 493 | 11 851 | 13 341 |
| 2060 | 11 917 | 11 312 | 12 727 |
| 2065 | 11 544 | 10 955 | 12 327 |
| 2070 | 11 171 | 10 588 | 11 926 |
| 2075 | 10 710 | 10 137 | 11 433 |
| 2080 | 10 201 | 9 649 | 10 890 |

***

**Tabela 18. Liczba emerytów, których świadczenie wypłacane jest z funduszu emerytalnego [tys.] - stan na koniec roku**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 6 580 | 6 628 | 6 550 |
| 2024 | 6 681 | 6 755 | 6 635 |
| 2025 | 6 775 | 6 871 | 6 713 |
| 2026 | 6 859 | 6 976 | 6 782 |
| 2027 | 6 937 | 7 073 | 6 846 |
| 2028 | 6 983 | 7 125 | 6 889 |
| 2029 | 7 027 | 7 174 | 6 931 |
| 2030 | 7 071 | 7 224 | 6 973 |
| 2031 | 7 114 | 7 273 | 7 014 |
| 2032 | 7 163 | 7 328 | 7 061 |
| 2035 | 7 369 | 7 554 | 7 260 |
| 2040 | 7 939 | 8 159 | 7 815 |
| 2045 | 8 686 | 8 940 | 8 546 |
| 2050 | 9 287 | 9 560 | 9 137 |
| 2055 | 9 601 | 9 879 | 9 447 |
| 2060 | 9 609 | 9 882 | 9 456 |
| 2065 | 9 354 | 9 617 | 9 205 |
| 2070 | 9 068 | 9 327 | 8 923 |
| 2075 | 8 816 | 9 068 | 8 674 |
| 2080 | 8 556 | 8 802 | 8 418 |

***

**Wykres 9. Liczby ubezpieczonych i emerytów, których świadczenie wypłacane jest z funduszu emerytalnego**



***

**Tabela 19. Współczynnik obciążenia systemowego**

| rok | wariant nr 1 | wariant nr 2 | wariant nr 3 |
| :--- | :--- | :--- | :--- |
| 2023 | 0,40 | 0,41 | 0,40 |
| 2024 | 0,41 | 0,42 | 0,40 |
| 2025 | 0,42 | 0,43 | 0,41 |
| 2026 | 0,42 | 0,44 | 0,41 |
| 2027 | 0,43 | 0,45 | 0,42 |
| 2028 | 0,44 | 0,46 | 0,42 |
| 2029 | 0,44 | 0,47 | 0,42 |
| 2030 | 0,45 | 0,47 | 0,43 |
| 2031 | 0,45 | 0,48 | 0,43 |
| 2032 | 0,46 | 0,48 | 0,44 |
| 2035 | 0,48 | 0,51 | 0,45 |
| 2040 | 0,53 | 0,57 | 0,50 |
| 2045 | 0,61 | 0,66 | 0,57 |
| 2050 | 0,70 | 0,76 | 0,64 |
| 2055 | 0,77 | 0,83 | 0,71 |
| 2060 | 0,81 | 0,87 | 0,74 |
| 2065 | 0,81 | 0,88 | 0,75 |
| 2070 | 0,81 | 0,88 | 0,75 |
| 2075 | 0,82 | 0,89 | 0,76 |
| 2080 | 0,84 | 0,91 | 0,77 |

***

**Wykres 10. Współczynnik obciążenia systemowego**



***

**Tabela 20.1 Zbiorcze zestawienie wyników dla wariantu nr 1**

| | 2023 | 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Kwoty nominalne** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne [mln zł] | -74 244 | -95 409 | -108 900 | -118 049 | -125 365 | -131 593 | -136 815 | -141 843 | -144 842 | -146 984 | -153 997 | -165 625 | -194 829 | -231 366 | -258 254 | -261 766 | -230 572 | -200 597 | -214 704 | -272 925 |
| Wpływy składkowe [mln zł] | 180 724 | 195 369 | 208 538 | 220 675 | 232 259 | 244 064 | 256 595 | 269 697 | 283 752 | 298 876 | 346 992 | 435 020 | 526 695 | 626 206 | 747 785 | 905 968 | 1 111 477 | 1 357 832 | 1 637 427 | 1 950 324 |
| Wydatki [mln zł] | 254 968 | 290 778 | 317 438 | 338 724 | 357 625 | 375 657 | 393 410 | 411 540 | 428 594 | 445 860 | 500 990 | 600 645 | 721 523 | 857 572 | 1 006 039 | 1 167 734 | 1 342 049 | 1 558 429 | 1 852 131 | 2 223 250 |
| Wydolność systemu emerytalnego | 71% | 67% | 66% | 65% | 65% | 65% | 65% | 66% | 66% | 67% | 69% | 72% | 73% | 73% | 74% | 78% | 83% | 87% | 88% | 88% |
| **Kwoty wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne | -7,90% | -9,39% | -10,05% | -10,32% | -10,43% | -10,45% | -10,36% | -10,25% | -9,97% | -9,63% | -8,73% | -7,48% | -7,17% | -7,06% | -6,56% | -5,48% | -3,94% | -2,80% | -2,49% | -2,65% |
| Wpływy składkowe | 19,23% | 19,24% | 19,25% | 19,29% | 19,33% | 19,38% | 19,43% | 19,48% | 19,53% | 19,57% | 19,67% | 19,64% | 19,40% | 19,12% | 18,99% | 18,97% | 18,97% | 18,97% | 18,97% | 18,97% |
| Wydatki | 27,12% | 28,63% | 29,31% | 29,60% | 29,76% | 29,83% | 29,80% | 29,73% | 29,50% | 29,20% | 28,40% | 27,12% | 26,57% | 26,19% | 25,55% | 24,45% | 22,91% | 21,78% | 21,46% | 21,63% |
| **Kwoty zdyskontowane inflacją na 2021 r.** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne [mln zł] | -59 575 | -73 052 | -80 874 | -85 530 | -88 616 | -90 749 | -92 049 | -93 104 | -92 754 | -91 830 | -89 342 | -84 928 | -88 299 | -92 680 | -91 435 | -81 914 | -63 773 | -49 038 | -46 391 | -52 121 |
| Wpływy składkowe [mln zł] | 145 016 | 149 587 | 154 870 | 159 886 | 164 175 | 168 311 | 172 637 | 177 027 | 181 710 | 186 727 | 201 309 | 223 066 | 238 706 | 250 843 | 264 754 | 283 504 | 307 417 | 331 936 | 353 794 | 372 457 |
| Wydatki [mln zł] | 204 591 | 222 639 | 235 744 | 245 416 | 252 791 | 259 061 | 264 686 | 270 131 | 274 463 | 278 557 | 290 651 | 307 993 | 327 005 | 343 523 | 356 189 | 365 418 | 371 190 | 380 974 | 400 185 | 424 578 |
| **Kwoty wyrażone w procencie PKB** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne | -2,2% | -2,7% | -2,9% | -2,9% | -2,9% | -2,9% | -2,9% | -2,9% | -2,8% | -2,7% | -2,4% | -2,1% | -2,0% | -1,9% | -1,8% | -1,5% | -1,1% | -0,7% | -0,7% | -0,7% |
| Wpływy składkowe | 5,4% | 5,5% | 5,5% | 5,5% | 5,5% | 5,4% | 5,4% | 5,4% | 5,4% | 5,4% | 5,4% | 5,4% | 5,3% | 5,2% | 5,1% | 5,1% | 5,1% | 5,1% | 5,0% | 5,0% |
| Wydatki | 7,7% | 8,1% | 8,3% | 8,4% | 8,4% | 8,4% | 8,3% | 8,3% | 8,2% | 8,1% | 7,8% | 7,5% | 7,3% | 7,1% | 6,9% | 6,5% | 6,1% | 5,8% | 5,7% | 5,7% |
| **Liczby - stan na koniec roku** | | | | | | | | | | | | | | | | | | | | |
| Ubezpieczeni [tys.] | 16 296 | 16 283 | 16 212 | 16 147 | 16 039 | 15 942 | 15 851 | 15 751 | 15 696 | 15 640 | 15 435 | 14 926 | 14 155 | 13 277 | 12 493 | 11 917 | 11 544 | 11 171 | 10 710 | 10 201 |
| Emeryci - fundusz emerytalny [tys.] | 6 580 | 6 681 | 6 775 | 6 859 | 6 937 | 6 983 | 7 027 | 7 071 | 7 114 | 7 163 | 7 369 | 7 939 | 8 686 | 9 287 | 9 601 | 9 609 | 9 354 | 9 068 | 8 816 | 8 556 |
| Współczynnik obciążenia systemowego | 0,40 | 0,41 | 0,42 | 0,42 | 0,43 | 0,44 | 0,44 | 0,45 | 0,45 | 0,46 | 0,48 | 0,53 | 0,61 | 0,70 | 0,77 | 0,81 | 0,81 | 0,81 | 0,82 | 0,84 |

***

**Wykres 11.1 Wykresy dla wariantu nr 1**

**Saldo roczne, wpływy i wydatki funduszu emerytalnego zdyskontowane inflacją na 2021 r.**


**Saldo roczne, wpływy i wydatki funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**

**Liczby ubezpieczonych i emerytów (fundusz emerytalny)**


**Wydolność systemu emerytalnego i współczynnik obciążenia systemowego**


***

**Tabela 20.2 Zbiorcze zestawienie wyników dla wariantu nr 2**

| | 2023 | 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Kwoty nominalne** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne [mln zł] | -80 552 | -105 603 | -122 239 | -133 890 | -143 176 | -151 223 | -158 079 | -164 766 | -169 498 | -173 484 | -186 478 | -209 107 | -249 044 | -294 406 | -331 741 | -352 716 | -351 552 | -358 462 | -403 983 | -484 371 |
| Wpływy składkowe [mln zł] | 175 203 | 187 052 | 197 468 | 207 085 | 216 443 | 225 901 | 235 933 | 246 379 | 257 566 | 269 583 | 306 971 | 371 856 | 433 849 | 497 489 | 573 564 | 671 471 | 795 441 | 936 447 | 1 085 709 | 1 242 874 |
| Wydatki [mln zł] | 255 755 | 292 655 | 319 707 | 340 975 | 359 619 | 377 124 | 394 012 | 411 146 | 427 064 | 443 067 | 493 449 | 580 963 | 682 893 | 791 896 | 905 306 | 1 024 187 | 1 146 993 | 1 294 909 | 1 489 692 | 1 727 245 |
| Wydolność systemu emerytalnego | 69% | 64% | 62% | 61% | 60% | 60% | 60% | 60% | 60% | 61% | 62% | 64% | 64% | 63% | 63% | 66% | 69% | 72% | 73% | 72% |
| **Kwoty wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne | -8,75% | -10,76% | -11,81% | -12,35% | -12,67% | -12,86% | -12,91% | -12,92% | -12,74% | -12,49% | -11,85% | -10,95% | -11,03% | -11,20% | -10,87% | -9,86% | -8,30% | -7,19% | -6,99% | -7,32% |
| Wpływy składkowe | 19,04% | 19,05% | 19,07% | 19,11% | 19,15% | 19,21% | 19,26% | 19,31% | 19,36% | 19,41% | 19,51% | 19,47% | 19,22% | 18,93% | 18,80% | 18,78% | 18,78% | 18,78% | 18,78% | 18,78% |
| Wydatki | 27,79% | 29,81% | 30,88% | 31,46% | 31,82% | 32,07% | 32,17% | 32,23% | 32,11% | 31,90% | 31,36% | 30,43% | 30,25% | 30,14% | 29,67% | 28,64% | 27,08% | 25,97% | 25,77% | 26,10% |
| **Kwoty zdyskontowane inflacją na 2021 r.** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne [mln zł] | -64 637 | -80 857 | -90 780 | -97 008 | -101 206 | -104 287 | -106 356 | -108 151 | -108 544 | -108 386 | -108 186 | -107 224 | -112 871 | -117 932 | -117 453 | -110 375 | -97 234 | -87 630 | -87 287 | -92 501 |
| Wpływy składkowe [mln zł] | 140 586 | 143 220 | 146 649 | 150 040 | 152 995 | 155 786 | 158 736 | 161 721 | 164 940 | 168 425 | 178 090 | 190 677 | 196 627 | 199 282 | 203 071 | 210 123 | 220 006 | 228 924 | 234 586 | 237 354 |
| Wydatki [mln zł] | 205 223 | 224 077 | 237 429 | 247 048 | 254 201 | 260 073 | 265 092 | 269 872 | 273 484 | 276 811 | 286 276 | 297 901 | 309 498 | 317 215 | 320 524 | 320 498 | 317 240 | 316 553 | 321 873 | 329 855 |
| **Kwoty wyrażone w procencie PKB** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne | -2,4% | -3,0% | -3,2% | -3,4% | -3,4% | -3,5% | -3,4% | -3,4% | -3,3% | -3,3% | -3,1% | -2,8% | -2,7% | -2,7% | -2,6% | -2,3% | -1,9% | -1,6% | -1,5% | -1,6% |
| Wpływy składkowe | 5,3% | 5,3% | 5,2% | 5,2% | 5,2% | 5,2% | 5,1% | 5,1% | 5,1% | 5,1% | 5,0% | 4,9% | 4,8% | 4,6% | 4,4% | 4,3% | 4,3% | 4,2% | 4,1% | 4,0% |
| Wydatki | 7,8% | 8,3% | 8,5% | 8,6% | 8,6% | 8,6% | 8,6% | 8,5% | 8,4% | 8,3% | 8,1% | 7,7% | 7,5% | 7,3% | 7,0% | 6,6% | 6,2% | 5,8% | 5,6% | 5,6% |
| **Liczby - stan na koniec roku** | | | | | | | | | | | | | | | | | | | | |
| Ubezpieczeni [tys.] | 16 054 | 15 947 | 15 845 | 15 753 | 15 623 | 15 506 | 15 398 | 15 282 | 15 211 | 15 141 | 14 889 | 14 323 | 13 495 | 12 614 | 11 851 | 11 312 | 10 955 | 10 588 | 10 137 | 9 649 |
| Emeryci - fundusz emerytalny [tys.] | 6 628 | 6 755 | 6 871 | 6 976 | 7 073 | 7 125 | 7 174 | 7 224 | 7 273 | 7 328 | 7 554 | 8 159 | 8 940 | 9 560 | 9 879 | 9 882 | 9 617 | 9 327 | 9 068 | 8 802 |
| Współczynnik obciążenia systemowego | 0,41 | 0,42 | 0,43 | 0,44 | 0,45 | 0,46 | 0,47 | 0,47 | 0,48 | 0,48 | 0,51 | 0,57 | 0,66 | 0,76 | 0,83 | 0,87 | 0,88 | 0,88 | 0,89 | 0,91 |

***

**Wykres 11.2 Wykresy dla wariantu nr 2**

**Saldo roczne, wpływy i wydatki funduszu emerytalnego zdyskontowane inflacją na 2021 r.**


**Saldo roczne, wpływy i wydatki funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**


**Liczby ubezpieczonych i emerytów (fundusz emerytalny)**


**Wydolność systemu emerytalnego i współczynnik obciążenia systemowego**


***

**Tabela 20.3 Zbiorcze zestawienie wyników dla wariantu nr 3**

| | 2023 | 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Kwoty nominalne** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne [mln zł] | -68 871 | -87 844 | -99 458 | -106 453 | -111 279 | -115 250 | -118 697 | -121 898 | -122 859 | -123 035 | -122 649 | -120 173 | -131 352 | -151 619 | -158 427 | -128 913 | -40 161 | 64 459 | 130 709 | 159 058 |
| Wpływy składkowe [mln zł] | 185 707 | 202 142 | 217 067 | 231 344 | 245 525 | 260 103 | 275 376 | 291 427 | 308 787 | 327 304 | 388 098 | 503 960 | 635 479 | 783 623 | 967 366 | 1 211 174 | 1 539 638 | 1 950 545 | 2 444 481 | 3 032 273 |
| Wydatki [mln zł] | 254 578 | 289 986 | 316 525 | 337 797 | 356 804 | 375 353 | 394 073 | 413 325 | 431 646 | 450 339 | 510 746 | 624 133 | 766 831 | 935 242 | 1 125 793 | 1 340 087 | 1 579 799 | 1 886 086 | 2 313 772 | 2 873 215 |
| Wydolność systemu emerytalnego | 73% | 70% | 69% | 68% | 69% | 69% | 70% | 71% | 72% | 73% | 76% | 81% | 83% | 84% | 86% | 90% | 97% | 103% | 106% | 106% |
| **Kwoty wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne | -7,16% | -8,40% | -8,86% | -8,92% | -8,80% | -8,63% | -8,41% | -8,18% | -7,80% | -7,39% | -6,24% | -4,70% | -4,03% | -3,72% | -3,13% | -2,03% | -0,50% | 0,63% | 1,02% | 1,00% |
| Wpływy składkowe | 19,32% | 19,33% | 19,34% | 19,38% | 19,42% | 19,47% | 19,52% | 19,57% | 19,61% | 19,66% | 19,75% | 19,72% | 19,48% | 19,21% | 19,09% | 19,07% | 19,07% | 19,07% | 19,07% | 19,07% |
| Wydatki | 26,48% | 27,72% | 28,21% | 28,29% | 28,22% | 28,09% | 27,93% | 27,75% | 27,42% | 27,04% | 25,99% | 24,42% | 23,51% | 22,93% | 22,21% | 21,10% | 19,57% | 18,44% | 18,05% | 18,07% |
| **Kwoty zdyskontowane inflacją na 2021 r.** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne [mln zł] | -55 263 | -67 260 | -73 862 | -77 129 | -78 659 | -79 479 | -79 859 | -80 013 | -78 677 | -76 867 | -71 155 | -61 621 | -59 531 | -60 735 | -56 091 | -40 341 | -11 108 | 15 758 | 28 242 | 30 376 |
| Wpływy składkowe [mln zł] | 149 015 | 154 773 | 161 204 | 167 616 | 173 552 | 179 373 | 185 273 | 191 290 | 197 741 | 204 487 | 225 157 | 258 416 | 288 009 | 313 901 | 342 497 | 379 012 | 425 840 | 476 830 | 528 172 | 579 079 |
| Wydatki [mln zł] | 204 278 | 222 033 | 235 066 | 244 745 | 252 211 | 258 851 | 265 133 | 271 303 | 276 418 | 281 355 | 296 312 | 320 037 | 347 539 | 374 636 | 398 588 | 419 353 | 436 947 | 461 073 | 499 930 | 548 703 |
| **Kwoty wyrażone w procencie PKB** | | | | | | | | | | | | | | | | | | | | |
| Saldo roczne | -2,1% | -2,4% | -2,6% | -2,6% | -2,6% | -2,5% | -2,5% | -2,4% | -2,3% | -2,2% | -1,8% | -1,4% | -1,2% | -1,1% | -0,9% | -0,6% | -0,2% | 0,2% | 0,3% | 0,3% |
| Wpływy składkowe | 5,6% | 5,6% | 5,6% | 5,7% | 5,7% | 5,7% | 5,7% | 5,7% | 5,7% | 5,7% | 5,8% | 5,9% | 5,8% | 5,8% | 5,8% | 5,8% | 5,9% | 5,9% | 6,0% | 6,0% |
| Wydatki | 7,6% | 8,0% | 8,2% | 8,3% | 8,2% | 8,2% | 8,1% | 8,1% | 8,0% | 7,9% | 7,6% | 7,3% | 7,1% | 6,9% | 6,7% | 6,4% | 6,0% | 5,7% | 5,7% | 5,7% |
| **Liczby - stan na koniec roku** | | | | | | | | | | | | | | | | | | | | |
| Ubezpieczeni [tys.] | 16 535 | 16 552 | 16 537 | 16 537 | 16 493 | 16 422 | 16 356 | 16 278 | 16 253 | 16 225 | 16 093 | 15 675 | 15 040 | 14 175 | 13 341 | 12 727 | 12 327 | 11 926 | 11 433 | 10 890 |
| Emeryci - fundusz emerytalny [tys.] | 6 550 | 6 635 | 6 713 | 6 782 | 6 846 | 6 889 | 6 931 | 6 973 | 7 014 | 7 061 | 7 260 | 7 815 | 8 546 | 9 137 | 9 447 | 9 456 | 9 205 | 8 923 | 8 674 | 8 418 |
| Współczynnik obciążenia systemowego | 0,40 | 0,40 | 0,41 | 0,41 | 0,42 | 0,42 | 0,42 | 0,43 | 0,43 | 0,44 | 0,45 | 0,50 | 0,57 | 0,64 | 0,71 | 0,74 | 0,75 | 0,75 | 0,76 | 0,77 |

***

**Wykres 11.3 Wykresy dla wariantu nr 3**

**Saldo roczne, wpływy i wydatki funduszu emerytalnego zdyskontowane inflacją na 2021 r.**


**Saldo roczne, wpływy i wydatki funduszu emerytalnego wyrażone jako procent sumy rocznych podstaw wymiaru składek na fundusz emerytalny**


**Liczby ubezpieczonych i emerytów (fundusz emerytalny)**


**Wydolność systemu emerytalnego i współczynnik obciążenia systemowego**

***

### Dodatek A – prognoza demograficzna Ministerstwa Finansów z 2019 r.

W celu umożliwienia porównania z poprzednią edycją prognozy wpływów i wydatków funduszu emerytalnego (z maja 2019 r.) w modelu FUS20 pozostawiliśmy możliwość wykonania obliczeń przy wykorzystaniu prognozy demograficznej przygotowanej w 2019 r. przez Ministerstwo Finansów. W poniższej tabeli przedstawiliśmy wyniki tej prognozy demograficznej.

**Tabela A. Populacja w podziale na ekonomiczne grupy wieku (w tysiącach); stan na koniec roku**

| | 2022 | 2025 | 2030 | 2040 | 2050 | 2060 | 2070 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Populacja ogółem** | 38 303 | 38 132 | 37 712 | 36 505 | 35 243 | 33 926 | 32 213 | 30 333 |
| z tego: | | | | | | | | |
| - w wieku przedprodukcyjnym | 6 994 | 6 918 | 6 554 | 6 010 | 5 906 | 5 793 | 5 444 | 5 341 |
| - w wieku produkcyjnym | 22 345 | 21 849 | 21 384 | 19 662 | 17 261 | 15 989 | 15 552 | 14 825 |
| - w wieku poprodukcyjnym | 8 964 | 9 366 | 9 774 | 10 834 | 12 075 | 12 144 | 11 217 | 10 167 |

**Źródło:** Prognoza demograficzna przygotowana przez Ministerstwo Finansów w 2019 r. dla potrzeb długoterminowych założeń makroekonomicznych

Porównując prognozy Ministerstwa Finansów z 2019 r. i z 2022 r. obserwujemy wyraźny spadek populacji. Populacja w prognozie demograficznej Ministerstwa Finansów z 2019 r. jest większa niż w prognozie z 2022 r. o 1,1 mln w 2030 r., o 1,4 mln w 2060 r. i o ponad 2 mln w 2080 r. Prognoza z 2019 r. zakładała, że populacja w 2021 r. osiągnie poziom 38,3 mln. Z danych za 2021 r. wynika jednak, że ten poziom jest niższy o 260 tys. Dotyczy to wszystkich ekonomicznych grup wieku, a w szczególności populacji osób w wieku poprodukcyjnym, która w 2021 r. jest niższa o 190 tys. niż prognozowana na ten rok w 2019 r. Jest to efekt pandemii COVID-19, trwającej od marca 2020 r., która była przyczyną dużej liczby zgonów – szczególnie w grupie osób starszych. Populacja osób w wieku poprodukcyjnym jest mniejsza w prognozie demograficznej Ministerstwa Finansów z 2022 r. niż w prognozie z 2019 r. do 2053 r. Po tym następuje odwrócenie sytuacji i w 2080 r. populacja osób w wieku poprodukcyjnym w prognozie z 2022 r. jest wyższa o prawie 800 tys. niż w prognozie z 2019 r. Liczba osób w wieku przedprodukcyjnym jest przez cały okres niższa w prognozie Ministerstwa Finansów z 2022 r. niż w prognozie z 2019 r., co wynika z zastosowania niższych współczynników dzietności w prognozie z 2022 r. Liczba osób w wieku produkcyjnym jest wyższa w prognozie Ministerstwa Finansów z 2022 r. niż w prognozie z 2019 r. tylko w latach 30 XXI wieku.

***

### Dodatek B – Analiza wrażliwości

Przeprowadzona analiza wrażliwości wykazała silne zróżnicowanie wpływu, jaki na wyniki modelu wywierają zmiany poszczególnych parametrów. Obok parametrów, których nawet bardzo małe odchylenia powodują istotne zmiany wyników (na przykład wskaźnik realnego wzrostu przeciętnego wynagrodzenia), istnieją parametry o marginalnym wpływie na ostateczny wynik generowanej prognozy. Na podstawie zamieszczonych poniżej tabel B.1, B.2 i B.3 można prześledzić fluktuacje wpływów, wydatków oraz salda rocznego funduszu emerytalnego w zależności od zmian wartości najważniejszych parametrów o charakterze ekonomicznym. Liczby umieszczone w tabelach B.1 i B.2 należy rozumieć jako procentowe odchylenia zdyskontowanych inflacją na 2021 r. wpływów i wydatków od odpowiednich wartości uzyskanych dla wariantu nr 1. Zdecydowaliśmy się na wartości zdyskontowane a nie nominalne, aby zapewnić porównywalność z wariantami, w których analizie podlegał wskaźnik cen towarów i usług konsumpcyjnych. Natomiast w tabeli B.3 zamieściliśmy kwoty zdyskontowane inflacją na 2021 r. stanowiące łączny skutek (w mld zł) wpływu analizowanych zmian parametrów na saldo roczne funduszu emerytalnego w porównaniu do wariantu nr 1. W tabelach zamieściliśmy również porównanie z wariantem nr 1 scenariusza przeliczonego dla prognozy demograficznej Ministerstwa Finansów z 2019 r., a więc prognozy demograficznej przy wykorzystaniu której sporządziliśmy poprzednią długoterminową prognozę wpływów i wydatków funduszu emerytalnego.

Ponieważ po stronie wpływów do funduszu emerytalnego uwzględniliśmy również środki przekazywane z otwartych funduszy emerytalnych do funduszu emerytalnego w ramach „suwaka bezpieczeństwa”, zamieściliśmy dodatkowo tabelę B.1a. Tabela B.1a umożliwia analizę wrażliwości wpływów bez „suwaka bezpieczeństwa”. Tabela ta dotyczy wyłącznie wpływów składkowych do funduszu emerytalnego.

***

**Tabela B.1. Analiza wrażliwości - wpływy (z wpływami z tytułu "suwaka bezpieczeństwa")**

| zmiana względem wariantu nr 1 | 2023 | 2025 | 2030 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| stopa inflacji większa o 1 p.p. | 0,0% | 0,0% | -0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| stopa inflacji mniejsza o 1 p.p. | 0,0% | 0,0% | 0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| stopa bezrobocia większa o 1 p.p. | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% |
| stopa bezrobocia mniejsza o 1 p.p. | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% |
| realny wzrost wynagrodzeń większy o 1 p.p. | 2,0% | 3,9% | 8,8% | 14,0% | 19,6% | 25,7% | 32,3% | 39,0% | 46,0% | 53,3% | 60,9% | 69,0% | 77,4% |
| realny wzrost wynagrodzeń mniejszy o 1 p.p. | -1,9% | -3,8% | -8,1% | -12,3% | -16,5% | -20,6% | -24,6% | -28,3% | -31,8% | -35,0% | -38,1% | -41,1% | -43,9% |
| ściągalność składek większa o 1 p.p. | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% |
| ściągalność składek mniejsza o 1 p.p. | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% |
| realna stopa zwrotu z OFE większa o 1 p.p. | 0,1% | 0,1% | 0,4% | 0,6% | 0,6% | 0,5% | 0,2% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| realna stopa zwrotu z OFE mniejsza o 1 p.p. | -0,1% | -0,1% | -0,3% | -0,5% | -0,5% | -0,4% | -0,2% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| wskaźniki waloryzacji świadczeń większe o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| wskaźniki waloryzacji świadczeń mniejsze o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| prognoza demograficzna MF z 2019 r. | 0,2% | 0,2% | 0,2% | -0,2% | -0,6% | -0,2% | 0,9% | 2,2% | 3,2% | 4,1% | 5,5% | 7,7% | 10,5% |

**Tabela B.1a Analiza wrażliwości - wpływy (bez wpływów z tytułu "suwaka bezpieczeństwa")**

| zmiana względem wariantu nr 1 | 2023 | 2025 | 2030 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| stopa inflacji większa o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| stopa inflacji mniejsza o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| stopa bezrobocia większa o 1 p.p. | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% |
| stopa bezrobocia mniejsza o 1 p.p. | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% |
| realny wzrost wynagrodzeń większy o 1 p.p. | 2,0% | 4,0% | 9,2% | 14,6% | 20,2% | 26,2% | 32,5% | 39,1% | 46,0% | 53,3% | 60,9% | 69,0% | 77,4% |
| realny wzrost wynagrodzeń mniejszy o 1 p.p. | -2,0% | -3,9% | -8,5% | -12,8% | -17,0% | -21,0% | -24,7% | -28,3% | -31,8% | -35,0% | -38,2% | -41,1% | -44,0% |
| ściągalność składek większa o 1 p.p. | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% | 1,0% |
| ściągalność składek mniejsza o 1 p.p. | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% |
| realna stopa zwrotu z OFE większa o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| realna stopa zwrotu z OFE mniejsza o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| wskaźniki waloryzacji świadczeń większe o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| wskaźniki waloryzacji świadczeń mniejsze o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| prognoza demograficzna MF z 2019 r. | 0,2% | 0,2% | 0,2% | -0,3% | -0,7% | -0,3% | 0,9% | 2,2% | 3,2% | 4,1% | 5,5% | 7,7% | 10,5% |

***

**Tabela B.2. Analiza wrażliwości - wydatki**

| zmiana względem wariantu nr 1 | 2023 | 2025 | 2030 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| stopa inflacji większa o 1 p.p. | -1,0% | -1,0% | -1,0% | -1,0% | -1,0% | -0,9% | -0,9% | -0,9% | -0,9% | -0,8% | -0,8% | -0,8% | -0,7% |
| stopa inflacji mniejsza o 1 p.p. | 1,0% | 1,1% | 1,0% | 1,0% | 1,0% | 1,0% | 0,9% | 0,9% | 0,9% | 0,9% | 0,8% | 0,8% | 0,7% |
| stopa bezrobocia większa o 1 p.p. | 0,0% | -0,1% | -0,1% | -0,2% | -0,3% | -0,4% | -0,4% | -0,5% | -0,5% | -0,6% | -0,6% | -0,7% | -0,8% |
| stopa bezrobocia mniejsza o 1 p.p. | 0,0% | 0,1% | 0,1% | 0,2% | 0,3% | 0,4% | 0,4% | 0,5% | 0,5% | 0,6% | 0,7% | 0,7% | 0,8% |
| realny wzrost wynagrodzeń większy o 1 p.p. | 0,0% | 0,5% | 2,3% | 4,6% | 7,4% | 10,8% | 14,8% | 19,2% | 23,8% | 28,9% | 34,7% | 41,6% | 49,0% |
| realny wzrost wynagrodzeń mniejszy o 1 p.p. | 0,0% | -0,4% | -2,1% | -4,2% | -6,6% | -9,4% | -12,4% | -15,5% | -18,5% | -21,6% | -24,9% | -28,4% | -32,0% |
| ściągalność składek większa o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| ściągalność składek mniejsza o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% |
| realna stopa zwrotu z OFE większa o 1 p.p. | 0,0% | 0,0% | 0,0% | 0,1% | 0,2% | 0,3% | 0,4% | 0,4% | 0,4% | 0,3% | 0,2% | 0,1% | 0,1% |
| realna stopa zwrotu z OFE mniejsza o 1 p.p. | 0,0% | 0,0% | 0,0% | -0,1% | -0,1% | -0,2% | -0,3% | -0,3% | -0,3% | -0,3% | -0,2% | -0,1% | -0,1% |
| wskaźniki waloryzacji świadczeń większe o 1 p.p. | 0,7% | 2,4% | 6,2% | 9,5% | 11,8% | 13,4% | 14,3% | 15,0% | 15,8% | 16,7% | 17,1% | 16,9% | 16,6% |
| wskaźniki waloryzacji świadczeń mniejsze o 1 p.p. | -0,7% | -2,3% | -5,9% | -8,6% | -10,4% | -11,4% | -12,0% | -12,4% | -13,0% | -13,6% | -13,9% | -13,7% | -13,4% |
| prognoza demograficzna MF z 2019 r. | -0,8% | -0,6% | -0,1% | 0,0% | -0,6% | -1,6% | -2,0% | -2,0% | -1,9% | -1,9% | -2,0% | -1,9% | -1,7% |

**Tabela B.3. Analiza wrażliwości - zmiana salda rocznego [w mld zł] (z wpływami z tytułu "suwaka bezpieczeństwa")**

| zmiana względem wariantu nr 1 | 2023 | 2025 | 2030 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| stopa inflacji większa o 1 p.p. | 2,0 | 2,4 | 2,6 | 2,8 | 2,9 | 3,0 | 3,1 | 3,1 | 3,1 | 3,1 | 3,1 | 3,1 | 3,1 |
| stopa inflacji mniejsza o 1 p.p. | -2,0 | -2,4 | -2,7 | -2,8 | -3,0 | -3,1 | -3,2 | -3,3 | -3,2 | -3,2 | -3,1 | -3,1 | -3,1 |
| stopa bezrobocia większa o 1 p.p. | -1,4 | -1,4 | -1,3 | -1,3 | -1,3 | -1,2 | -1,0 | -0,9 | -0,8 | -0,8 | -0,8 | -0,6 | -0,4 |
| stopa bezrobocia mniejsza o 1 p.p. | 1,4 | 1,4 | 1,3 | 1,3 | 1,3 | 1,1 | 1,0 | 0,8 | 0,8 | 0,8 | 0,8 | 0,6 | 0,4 |
| realny wzrost wynagrodzeń większy o 1 p.p. | 2,8 | 4,8 | 9,3 | 14,9 | 20,9 | 26,0 | 30,1 | 35,0 | 43,3 | 56,6 | 69,9 | 77,6 | 80,2 |
| realny wzrost wynagrodzeń mniejszy o 1 p.p. | -2,8 | -4,9 | -8,7 | -12,6 | -16,3 | -18,4 | -19,0 | -19,7 | -22,3 | -27,6 | -31,8 | -31,7 | -27,9 |
| ściągalność składek większa o 1 p.p. | 1,4 | 1,5 | 1,7 | 2,0 | 2,2 | 2,4 | 2,6 | 2,7 | 2,9 | 3,2 | 3,4 | 3,6 | 3,8 |
| ściągalność składek mniejsza o 1 p.p. | -1,4 | -1,5 | -1,7 | -2,0 | -2,2 | -2,4 | -2,6 | -2,7 | -2,9 | -3,2 | -3,4 | -3,6 | -3,8 |
| realna stopa zwrotu z OFE większa o 1 p.p. | 0,1 | 0,2 | 0,6 | 1,0 | 1,0 | 0,3 | -0,7 | -1,2 | -1,3 | -1,1 | -0,8 | -0,5 | -0,3 |
| realna stopa zwrotu z OFE mniejsza o 1 p.p. | -0,1 | -0,2 | -0,6 | -0,9 | -0,8 | -0,2 | 0,7 | 1,1 | 1,1 | 0,9 | 0,7 | 0,4 | 0,2 |
| wskaźniki waloryzacji świadczeń większe o 1 p.p. | -1,4 | -5,6 | -16,8 | -27,5 | -36,4 | -43,7 | -49,0 | -53,4 | -57,8 | -61,9 | -65,2 | -67,8 | -70,4 |
| wskaźniki waloryzacji świadczeń mniejsze o 1 p.p. | 1,4 | 5,5 | 15,8 | 24,9 | 31,9 | 37,3 | 41,1 | 44,3 | 47,6 | 50,6 | 52,9 | 54,7 | 56,8 |
| prognoza demograficzna MF z 2019 r. | 1,8 | 1,7 | 0,6 | -0,6 | 0,4 | 4,6 | 9,2 | 13,0 | 15,9 | 19,7 | 25,9 | 34,8 | 46,1 |

***

### Dodatek C – wpływ współczynników śmiertelności na wyniki prognozy

Oprócz analizy wpływu parametrów ekonomicznych na wyniki modelu, przeprowadziliśmy również analizę wpływu parametru demograficznego – współczynników śmiertelności. Poniżej przedstawiamy tabelę obrazującą wpływ procentowej zmiany (plus/minus 5%) współczynników śmiertelności (prawdopodobieństw zgonu) na wyniki. Liczby dotyczące wpływów i wydatków należy rozumieć jako procentowe odchylenia zdyskontowanych inflacją na 2021 r. wpływów i wydatków od odpowiednich wartości uzyskanych dla wariantu nr 1. Natomiast zamieszczone w tabeli kwoty zdyskontowane inflacją na 2021 r. stanowią łączny skutek (w mld zł) wpływu zmienionych współczynników śmiertelności na saldo roczne funduszu emerytalnego w porównaniu do wariantu nr 1.

***

**Tabela C. Analiza wrażliwości - zmiana procentowa współczynników śmiertelności**

| zmiana względem wariantu nr 1 | wyszczególnienie | 2023 | 2025 | 2030 | 2035 | 2040 | 2045 | 2050 | 2055 | 2060 | 2065 | 2070 | 2075 | 2080 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **wzrost współczynników śmiertelności o 5%** | wpływy* (w %) | 0,0% | -0,1% | -0,2% | -0,2% | -0,2% | -0,2% | -0,2% | -0,2% | -0,2% | -0,2% | -0,2% | -0,2% | -0,1% |
| | wydatki (w %) | -0,1% | -0,2% | -0,5% | -0,7% | -0,8% | -0,9% | -0,8% | -0,7% | -0,7% | -0,7% | -0,7% | -0,7% | -0,6% |
| | saldo roczne (w mld zł) | 0,1 | 0,4 | 1,0 | 1,6 | 2,0 | 2,2 | 2,2 | 2,1 | 2,0 | 2,0 | 2,1 | 2,1 | 1,9 |
| **spadek współczynników śmiertelności o 5%** | wpływy* (w %) | 0,0% | 0,1% | 0,2% | 0,2% | 0,2% | 0,2% | 0,2% | 0,2% | 0,2% | 0,2% | 0,2% | 0,2% | 0,1% |
| | wydatki (w %) | 0,1% | 0,2% | 0,5% | 0,7% | 0,9% | 0,9% | 0,9% | 0,8% | 0,7% | 0,7% | 0,7% | 0,7% | 0,6% |
| | saldo roczne (w mld zł) | -0,1 | -0,4 | -1,0 | -1,7 | -2,1 | -2,4 | -2,4 | -2,2 | -2,1 | -2,1 | -2,2 | -2,2 | -1,9 |

*łącznie z wpływami z tytułu "suwaka bezpieczeństwa"