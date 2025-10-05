/**
 * Przykładowy skrypt do testowania API kalkulatora emerytalnego
 * 
 * Uruchom: node test-api-example.js
 * 
 * Wymaga: Node.js 18+ (fetch jest wbudowany)
 */

const API_URL = 'http://localhost:3000/api/calculate-pension';

async function calculatePension(data) {
  try {
    console.log('\n📊 Wysyłam request:', JSON.stringify(data, null, 2));
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      console.log('\n✅ Sukces! Wyniki:');
      console.log('─────────────────────────────────────────');
      console.log(`💰 Miesięczna emerytura: ${result.data.monthlyPension.toLocaleString('pl-PL')} zł`);
      console.log(`💵 W dzisiejszej sile nabywczej: ${result.data.realMonthlyPension.toLocaleString('pl-PL')} zł`);
      console.log(`📈 Stopa zastąpienia: ${result.data.replacementRate}%`);
      console.log(`🏦 Zgromadzony kapitał: ${result.data.totalCapital.toLocaleString('pl-PL')} zł`);
      console.log(`💼 Wynagrodzenie przy emeryturze: ${result.data.futureGrossSalary.toLocaleString('pl-PL')} zł`);
      console.log(`📅 Lat do emerytury: ${result.data.yearsToRetirement}`);
      console.log(`\n🎯 Scenariusz: ${result.scenario.name}`);
      console.log(`   ${result.scenario.description}`);
      console.log('─────────────────────────────────────────\n');
    } else {
      console.error('\n❌ Błąd:', result.error);
      if (result.details) {
        console.error('   Szczegóły:', result.details);
      }
    }

    return result;
  } catch (error) {
    console.error('\n❌ Błąd połączenia:', error.message);
    throw error;
  }
}

// Test 1: Podstawowy scenariusz
async function test1() {
  console.log('\n═══════════════════════════════════════════');
  console.log('TEST 1: Podstawowy scenariusz (30 lat, mężczyzna)');
  console.log('═══════════════════════════════════════════');
  
  await calculatePension({
    age: 30,
    gender: 'male',
    grossSalary: 7500,
    plannedRetirementYear: 2060
  });
}

// Test 2: Z kapitałem początkowym
async function test2() {
  console.log('\n═══════════════════════════════════════════');
  console.log('TEST 2: Z kapitałem początkowym na koncie ZUS');
  console.log('═══════════════════════════════════════════');
  
  await calculatePension({
    age: 30,
    gender: 'male',
    grossSalary: 7500,
    plannedRetirementYear: 2060,
    zusAccountBalance: 50000,
    zusSubaccountBalance: 12000
  });
}

// Test 3: Porównanie scenariuszy
async function test3() {
  console.log('\n═══════════════════════════════════════════');
  console.log('TEST 3: Porównanie scenariuszy ekonomicznych');
  console.log('═══════════════════════════════════════════');
  
  const baseData = {
    age: 30,
    gender: 'male',
    grossSalary: 7500,
    plannedRetirementYear: 2060
  };

  console.log('\n🔴 Scenariusz PESYMISTYCZNY:');
  const pessimistic = await calculatePension({
    ...baseData,
    scenarioId: 'pessimistic'
  });

  console.log('\n🟡 Scenariusz UMIARKOWANY:');
  const moderate = await calculatePension({
    ...baseData,
    scenarioId: 'moderate'
  });

  console.log('\n🟢 Scenariusz OPTYMISTYCZNY:');
  const optimistic = await calculatePension({
    ...baseData,
    scenarioId: 'optimistic'
  });

  // Porównanie
  if (pessimistic.success && moderate.success && optimistic.success) {
    console.log('\n📊 PORÓWNANIE SCENARIUSZY:');
    console.log('─────────────────────────────────────────');
    console.log(`Pesymistyczny: ${pessimistic.data.realMonthlyPension.toLocaleString('pl-PL')} zł`);
    console.log(`Umiarkowany:   ${moderate.data.realMonthlyPension.toLocaleString('pl-PL')} zł`);
    console.log(`Optymistyczny: ${optimistic.data.realMonthlyPension.toLocaleString('pl-PL')} zł`);
    
    const diff = optimistic.data.realMonthlyPension - pessimistic.data.realMonthlyPension;
    const diffPercent = ((diff / pessimistic.data.realMonthlyPension) * 100).toFixed(1);
    console.log(`\nRóżnica: ${diff.toLocaleString('pl-PL')} zł (${diffPercent}%)`);
    console.log('─────────────────────────────────────────\n');
  }
}

// Test 4: Kobieta z niższym wiekiem emerytalnym
async function test4() {
  console.log('\n═══════════════════════════════════════════');
  console.log('TEST 4: Kobieta (wiek emerytalny 60 lat)');
  console.log('═══════════════════════════════════════════');
  
  await calculatePension({
    age: 25,
    gender: 'female',
    grossSalary: 6000,
    plannedRetirementYear: 2055,
    includeSickLeave: true
  });
}

// Test 5: Błąd walidacji
async function test5() {
  console.log('\n═══════════════════════════════════════════');
  console.log('TEST 5: Test walidacji (nieprawidłowy wiek)');
  console.log('═══════════════════════════════════════════');
  
  await calculatePension({
    age: 70,
    gender: 'male',
    grossSalary: 7500,
    plannedRetirementYear: 2030
  });
}

// Uruchom wszystkie testy
async function runAllTests() {
  console.log('\n🚀 Rozpoczynam testy API kalkulatora emerytalnego...\n');
  
  try {
    await test1();
    await test2();
    await test3();
    await test4();
    await test5();
    
    console.log('\n✅ Wszystkie testy zakończone!\n');
  } catch (error) {
    console.error('\n❌ Wystąpił błąd podczas testów:', error.message);
    console.error('\n💡 Upewnij się, że serwer działa na http://localhost:3000\n');
  }
}

// Uruchom testy
runAllTests();
