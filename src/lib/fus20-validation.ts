/**
 * FUS20 Input Data Validation
 */

import {
  IndividualInputData,
  ValidationResult,
  ValidationError,
  ValidationWarning
} from '@/types/fus20-types'

import { ZUS_SYSTEM_PARAMETERS } from '@/config/zus-constants'

/**
 * Validate individual input data according to FUS20 specification
 */
export function validateIndividualInputData(data: IndividualInputData): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []
  
  // Validate gender
  if (!data.gender || !['male', 'female'].includes(data.gender)) {
    errors.push({
      field: 'gender',
      code: 'INVALID_GENDER',
      message: 'Gender must be "male" or "female"'
    })
  }
  
  // Validate age
  if (!data.currentAge || data.currentAge < 18 || data.currentAge > 80) {
    errors.push({
      field: 'currentAge',
      code: 'INVALID_AGE',
      message: 'Age must be between 18 and 80 years'
    })
  }
  
  // Validate contribution base
  if (!data.contributionBase?.currentMonthlyAmount || data.contributionBase.currentMonthlyAmount <= 0) {
    errors.push({
      field: 'contributionBase.currentMonthlyAmount',
      code: 'INVALID_CONTRIBUTION_BASE',
      message: 'Contribution base must be greater than 0'
    })
  }
  
  // Validate planned retirement age
  if (data.plannedRetirementAge) {
    const standardRetirementAge = data.gender === 'female' 
      ? ZUS_SYSTEM_PARAMETERS.RETIREMENT_AGE.FEMALE 
      : ZUS_SYSTEM_PARAMETERS.RETIREMENT_AGE.MALE
    
    if (data.plannedRetirementAge < standardRetirementAge) {
      errors.push({
        field: 'plannedRetirementAge',
        code: 'RETIREMENT_AGE_TOO_LOW',
        message: `Planned retirement age cannot be lower than standard retirement age (${standardRetirementAge})`
      })
    }
    
    if (data.plannedRetirementAge < data.currentAge) {
      errors.push({
        field: 'plannedRetirementAge',
        code: 'RETIREMENT_AGE_BEFORE_CURRENT',
        message: 'Planned retirement age cannot be earlier than current age'
      })
    }
    
    if (data.plannedRetirementAge > data.currentAge + 50) {
      warnings.push({
        field: 'plannedRetirementAge',
        code: 'RETIREMENT_AGE_TOO_FAR',
        message: 'Planned retirement age is very far in the future',
        suggestion: 'Consider a more realistic retirement age for accurate projections'
      })
    }
  }
  
  // Validate initial capital (for people who started working before 1999)
  if (data.initialCapital && data.initialCapital < 0) {
    errors.push({
      field: 'initialCapital',
      code: 'INVALID_INITIAL_CAPITAL',
      message: 'Initial capital cannot be negative'
    })
  }
  
  if (data.initialCapital && data.initialCapital > 1000000) {
    warnings.push({
      field: 'initialCapital',
      code: 'HIGH_INITIAL_CAPITAL',
      message: 'Initial capital seems unusually high',
      suggestion: 'Please verify the valorized initial capital from ZUS'
    })
  }
  
  // Validate contribution base amount
  if (data.contributionBase?.currentMonthlyAmount) {
    const minSalary = 3000 // Approximate minimum wage
    const maxReasonable = 50000 // Reasonable upper limit
    
    if (data.contributionBase.currentMonthlyAmount < minSalary) {
      warnings.push({
        field: 'contributionBase.currentMonthlyAmount',
        code: 'LOW_CONTRIBUTION_BASE',
        message: 'Contribution base is below minimum wage',
        suggestion: 'This may result in very low pension'
      })
    }
    
    if (data.contributionBase.currentMonthlyAmount > maxReasonable) {
      warnings.push({
        field: 'contributionBase.currentMonthlyAmount',
        code: 'HIGH_CONTRIBUTION_BASE',
        message: 'Contribution base is unusually high',
        suggestion: 'Please verify the amount'
      })
    }
  }
  
  // Validate JDG preferential period
  if (data.insuranceTitle?.type === 'jdg' && data.contributionBase?.isJdgPreferential) {
    if (data.contributionBase.jdgPreferentialMonths && data.contributionBase.jdgPreferentialMonths > 24) {
      warnings.push({
        field: 'contributionBase.jdgPreferentialMonths',
        code: 'PREFERENTIAL_PERIOD_TOO_LONG',
        message: 'JDG preferential period is typically up to 24 months',
        suggestion: 'Please verify the preferential period duration'
      })
    }
  }
  
  // Validate accumulated capital
  if (data.accumulatedCapital) {
    if (data.accumulatedCapital.zusAccount < 0 || data.accumulatedCapital.zusSubaccount < 0) {
      errors.push({
        field: 'accumulatedCapital',
        code: 'INVALID_ACCUMULATED_CAPITAL',
        message: 'Accumulated capital cannot be negative'
      })
    }
    
    const totalAccumulated = data.accumulatedCapital.zusAccount + data.accumulatedCapital.zusSubaccount
    const yearsWorked = data.currentAge - 18 // Rough estimate
    const expectedCapital = data.contributionBase.currentMonthlyAmount * 0.1952 * 12 * yearsWorked * 0.7
    
    if (totalAccumulated > expectedCapital * 3) {
      warnings.push({
        field: 'accumulatedCapital',
        code: 'UNUSUALLY_HIGH_CAPITAL',
        message: 'Accumulated capital seems unusually high for your age and salary',
        suggestion: 'Please verify the amounts from your ZUS account'
      })
    }
  }
  
  // Validate sick leave data
  if (data.sickLeave?.includeInCalculation && data.sickLeave.averageDaysPerYear) {
    if (data.sickLeave.averageDaysPerYear > 100) {
      warnings.push({
        field: 'sickLeave.averageDaysPerYear',
        code: 'EXCESSIVE_SICK_LEAVE',
        message: 'Average sick leave days per year seems very high',
        suggestion: 'Typical average is 9-12 days per year'
      })
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Quick validation for required fields only
 */
export function validateRequiredFields(data: Partial<IndividualInputData>): boolean {
  return !!(
    data.gender &&
    data.currentAge &&
    data.contributionBase?.currentMonthlyAmount
  )
}
