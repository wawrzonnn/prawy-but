Z uwagi na skomplikowanie **prognoz aktuarialnych ZUS FUS20**, stworzenie kalkulatora "z bomby" wymaga dostarczenia generatorowi AI/Modelowi **dokładnych parametrów wejściowych i założeń makroekonomicznych**.

Poniżej przedstawiam zestawienie kluczowych danych, które muszą być wczytane do Twojego narzędzia, aby mogło ono przeprowadzić projekcję zgodnie z logiką stosowaną w modelach ZUS:

---

## 1. Wymagane Dane Wejściowe Indywidualne (Micro-Inputs)

Te dane są niezbędne do określenia **zgromadzonego kapitału (sumy składek)**:

| Kategoria Danych | Konkretny Wymóg | Źródło / Uzasadnienie |
| :--- | :--- | :--- |
| **Identyfikacja ubezpieczonego** | Płeć (Kobieta/Mężczyzna) i obecny wiek. | Krytyczne dla wyznaczenia kapitału początkowego i oczekiwanej długości życia na emeryturze. |
| **Historia Składek do 1998 r.** | Łączny staż składkowy i nieskładkowy na 31 XII 1998 r. (np. 10 lat, 20 lat). | Wymagane do oszacowania **Kapitału Początkowego**. |
| **Status Zawodowy (ostatni)** | **Ostatni kod tytułu ubezpieczenia** (np. Pracownicy, JDG, Członek RSP). | Wpływa na przeciętną wysokość przyznanej emerytury i podstawę składki. |
| **Podstawa Składek** | Bieżąca przeciętna miesięczna podstawa składki na ubezpieczenia emerytalne i rentowe. | Jeśli JDG, uwzględnij wysokość składek w okresie preferencyjnym (np. 176,27 zł lub 204,37 zł na emerytalne) i po preferencyjnym (np. 812,23 zł). |
| **Absencja Chorobowa (opcjonalnie)** | Średnia długość absencji chorobowej (w dniach) dla danego powiatu i płci. | Parametr techniczny, który wpływa na ciągłość opłacania składek. |
| **Wiek Emerytalny** | Faktyczny wiek planowanego przejścia na emeryturę (np. dokładnie w wieku emerytalnym, lub opóźnienie o 2 lata i więcej). | Kluczowe, ponieważ moment przejścia ma duży wpływ na wysokość świadczenia. |

---

## 2. Wymagane Założenia Makroekonomiczne (Macro-Parameters)

Prognozowanie przyszłej emerytury wymaga wybrania jednego ze scenariuszy prognostycznych modelu FUS20. Wystarczy wskazać jeden z poniższych wariantów (lub ich kluczowe parametry) dla horyzontu czasowego prognozy (do 2080 r.):

| Kluczowe Założenia | Wariant nr 1 (Pośredni) | Wariant nr 2 (Pesymistyczny) | Wariant nr 3 (Optymistyczny) |
| :--- | :--- | :--- | :--- |
| **Stopa bezrobocia** (2080 r.) | 5,00% | 6,00% | 4,20% |
| **Wskaźnik realnego wzrostu przeciętnego wynagrodzenia** (2080 r.) | 102,00% | 101,20% | 102,80% |
| **Średnioroczny wskaźnik cen konsumpcyjnych (Inflacja)** (2080 r.) | 102,50% | 102,50% | 102,50% |
| **Ściągalność składek** (2080 r.) | 99,00% | 98,00% | 99,50% |
| **Stopa zwrotu z OFE** | Przyjęta równa nominalnemu wzrostowi PKB. | Przyjęta równa nominalnemu wzrostowi PKB. | Przyjęta równa nominalnemu wzrostowi PKB. |

---

## 3. Definicje Wyników (Output Definitions)

Aby kalkulator był "rzeczywisty", musi dostarczać wyniki w obu wymaganych formatach:

### Wysokość Rzeczywista (Kwota Nominalna)

*   **Definicja:** Jest to prognozowana kwota świadczenia emerytalnego **wartości pieniądza w danym przyszłym roku**.
*   **Wymagane do obliczenia:** Nagromadzone składki *waloryzowane* zgodnie z przyjętymi wskaźnikami makroekonomicznymi (w tym wzrostem wynagrodzeń i inflacją).

### Wysokość Urealniona (Kwota Zdyskontowana)

*   **Definicja:** Jest to prognozowana kwota świadczenia, której wartość została **zdyskontowana (sprowadzona do stałej siły nabywczej)**, np. do poziomu z roku 2021.
*   **Wymagane do obliczenia:** Użycie **stopy inflacji** jako stopy dyskontowej w celu porównania realnej siły nabywczej w czasie.
