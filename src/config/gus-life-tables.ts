/**
 * GUS Life Expectancy Tables (2020-2022)
 * Source: Central Statistical Office of Poland (GUS)
 * Expected further life duration at retirement age
 */

export const LIFE_EXPECTANCY_GUS_2022 = {
  MALE: {
    AGE_60: 19.8,
    AGE_61: 19.0,
    AGE_62: 18.2,
    AGE_63: 17.4,
    AGE_64: 16.6,
    AGE_65: 15.8, // Standard retirement age
    AGE_66: 15.1,
    AGE_67: 14.3,
    AGE_68: 13.6,
    AGE_69: 12.9,
    AGE_70: 12.2
  },
  FEMALE: {
    AGE_55: 26.8,
    AGE_56: 25.9,
    AGE_57: 25.0,
    AGE_58: 24.1,
    AGE_59: 23.2,
    AGE_60: 22.3, // Standard retirement age
    AGE_61: 21.4,
    AGE_62: 20.5,
    AGE_63: 19.6,
    AGE_64: 18.7,
    AGE_65: 17.8,
    AGE_66: 16.9,
    AGE_67: 16.0,
    AGE_68: 15.2,
    AGE_69: 14.3,
    AGE_70: 13.5
  }
} as const

/**
 * Get life expectancy at retirement age
 * Uses GUS tables with linear interpolation for ages not in table
 */
export function getLifeExpectancyAtRetirement(
  gender: 'male' | 'female',
  retirementAge: number
): number {
  const tables = LIFE_EXPECTANCY_GUS_2022[gender.toUpperCase() as keyof typeof LIFE_EXPECTANCY_GUS_2022]
  const ageKey = `AGE_${retirementAge}` as keyof typeof tables
  
  // If exact age exists in table, return it
  if (tables[ageKey] !== undefined) {
    return tables[ageKey] as number
  }
  
  // Otherwise, interpolate between closest ages
  return interpolateLifeExpectancy(gender, retirementAge)
}

/**
 * Linear interpolation for ages not in GUS tables
 */
function interpolateLifeExpectancy(
  gender: 'male' | 'female',
  retirementAge: number
): number {
  const tables = LIFE_EXPECTANCY_GUS_2022[gender.toUpperCase() as keyof typeof LIFE_EXPECTANCY_GUS_2022]
  
  // Get all ages from table
  const ages = Object.keys(tables)
    .map(key => parseInt(key.replace('AGE_', '')))
    .sort((a, b) => a - b)
  
  // Find closest ages for interpolation
  let lowerAge = ages[0]
  let upperAge = ages[ages.length - 1]
  
  for (let i = 0; i < ages.length - 1; i++) {
    if (ages[i] <= retirementAge && ages[i + 1] >= retirementAge) {
      lowerAge = ages[i]
      upperAge = ages[i + 1]
      break
    }
  }
  
  // Get life expectancy values for interpolation
  const lowerKey = `AGE_${lowerAge}` as keyof typeof tables
  const upperKey = `AGE_${upperAge}` as keyof typeof tables
  const lowerValue = tables[lowerKey] as number
  const upperValue = tables[upperKey] as number
  
  // Linear interpolation
  if (lowerAge === upperAge) return lowerValue
  
  const ratio = (retirementAge - lowerAge) / (upperAge - lowerAge)
  return lowerValue + (upperValue - lowerValue) * ratio
}
