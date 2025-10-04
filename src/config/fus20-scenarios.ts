/**
 * FUS20 Macroeconomic Scenarios
 * Based on ZUS actuarial model projections to 2080
 */

import { MacroeconomicScenario } from '@/types/fus20-types'

export const FUS20_SCENARIOS = {
  PESSIMISTIC: {
    id: 'pessimistic',
    name: 'Pessimistic Scenario',
    description: 'Lower economic growth, higher unemployment',
    parameters: {
      unemploymentRate2080: 0.06, // 6.00%
      realWageGrowthIndex2080: 1.012, // 101.20% (1.2% real growth)
      inflationIndex2080: 1.025, // 102.50% (2.5% inflation)
      contributionCollectionRate2080: 0.98 // 98.00%
    }
  },
  
  MODERATE: {
    id: 'moderate',
    name: 'Moderate Scenario (Base)',
    description: 'Average economic growth, standard assumptions',
    parameters: {
      unemploymentRate2080: 0.05, // 5.00%
      realWageGrowthIndex2080: 1.02, // 102.00% (2.0% real growth)
      inflationIndex2080: 1.025, // 102.50% (2.5% inflation)
      contributionCollectionRate2080: 0.99 // 99.00%
    }
  },
  
  OPTIMISTIC: {
    id: 'optimistic',
    name: 'Optimistic Scenario',
    description: 'Higher economic growth, lower unemployment',
    parameters: {
      unemploymentRate2080: 0.042, // 4.20%
      realWageGrowthIndex2080: 1.028, // 102.80% (2.8% real growth)
      inflationIndex2080: 1.025, // 102.50% (2.5% inflation)
      contributionCollectionRate2080: 0.995 // 99.50%
    }
  }
} as const satisfies Record<string, MacroeconomicScenario>

// Default scenario for calculations
export const DEFAULT_SCENARIO = FUS20_SCENARIOS.MODERATE

// Helper function to get scenario by id
export function getScenarioById(id: string): MacroeconomicScenario {
  const scenarioKey = id.toUpperCase() as keyof typeof FUS20_SCENARIOS
  return FUS20_SCENARIOS[scenarioKey] || DEFAULT_SCENARIO
}
