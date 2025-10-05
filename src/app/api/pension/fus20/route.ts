import { NextRequest, NextResponse } from 'next/server'
import { calculatePensionFUS20 } from '@/lib/fus20-calculator'
import { validateIndividualInputData } from '@/lib/fus20-validation'
import { FUS20_SCENARIOS, getScenarioById } from '@/config/fus20-scenarios'
import { ZUS_SYSTEM_PARAMETERS, INSURANCE_TITLE_CODES } from '@/config/zus-constants'
import { IndividualInputData, FUS20ApiResponse } from '@/types/fus20-types'

/**
 * POST /api/pension/fus20
 * Calculate pension according to FUS20 model
 */
export async function POST(request: NextRequest): Promise<NextResponse<FUS20ApiResponse>> {
  try {
    const body = await request.json()
    const { inputData, scenarioId = 'moderate' }: { 
      inputData: Partial<IndividualInputData>
      scenarioId?: string 
    } = body

    // Validate required fields
    if (!inputData.gender || !inputData.currentAge || !inputData.contributionBase?.currentMonthlyAmount) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'Missing required fields',
          details: [
            'Required: gender, currentAge, contributionBase.currentMonthlyAmount'
          ]
        }
      }, { status: 400 })
    }

    // Complete input data with defaults
    const completeInputData: IndividualInputData = {
      gender: inputData.gender,
      currentAge: inputData.currentAge,
      initialCapital: inputData.initialCapital || 0,
      insuranceTitle: inputData.insuranceTitle || INSURANCE_TITLE_CODES.EMPLOYEE,
      contributionBase: {
        currentMonthlyAmount: inputData.contributionBase.currentMonthlyAmount,
        isJdgPreferential: inputData.contributionBase.isJdgPreferential || false,
        jdgPreferentialMonths: inputData.contributionBase.jdgPreferentialMonths
      },
      plannedRetirementAge: inputData.plannedRetirementAge || 
        (inputData.gender === 'female' 
          ? ZUS_SYSTEM_PARAMETERS.RETIREMENT_AGE.FEMALE 
          : ZUS_SYSTEM_PARAMETERS.RETIREMENT_AGE.MALE),
      sickLeave: inputData.sickLeave || {
        includeInCalculation: false
      },
      accumulatedCapital: inputData.accumulatedCapital
    }

    // Validate complete input data
    const validation = validateIndividualInputData(completeInputData)
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Input data validation failed',
          details: validation.errors.map(e => `${e.field}: ${e.message}`)
        }
      }, { status: 400 })
    }

    // Get scenario
    const scenario = getScenarioById(scenarioId)

    // Calculate pension
    const result = calculatePensionFUS20(completeInputData, scenario)

    // Prepare warnings
    const warnings: string[] = []
    
    if (validation.warnings.length > 0) {
      warnings.push(...validation.warnings.map(w => w.message))
    }
    
    if (completeInputData.currentAge > 50 && !completeInputData.accumulatedCapital) {
      warnings.push('For more accurate results, consider providing your current ZUS account balance')
    }
    
    if (result.pensionAmounts.replacementRate < 40) {
      warnings.push('Low replacement rate - consider additional retirement savings (III pillar: PPK, IKE, IKZE)')
    }

    return NextResponse.json({
      success: true,
      data: result,
      warnings: warnings.length > 0 ? warnings : undefined
    })

  } catch (error) {
    console.error('FUS20 calculation error:', error)
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: 'An error occurred during pension calculation',
        details: error instanceof Error ? [error.message] : ['Unknown error']
      }
    }, { status: 500 })
  }
}

/**
 * GET /api/pension/fus20
 * Get API documentation and available scenarios
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'ZUS FUS20 Pension Calculator API',
    version: '2.0.0',
    description: 'Professional pension calculator compliant with ZUS FUS20 actuarial model',
    
    scenarios: Object.values(FUS20_SCENARIOS).map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      parameters: s.parameters
    })),
    
    insuranceTitles: Object.values(INSURANCE_TITLE_CODES),
    
    requiredFields: [
      {
        field: 'gender',
        type: 'string',
        values: ['male', 'female'],
        description: 'Gender of the insured person'
      },
      {
        field: 'currentAge',
        type: 'number',
        range: '18-80',
        description: 'Current age in years'
      },
      {
        field: 'contributionBase.currentMonthlyAmount',
        type: 'number',
        description: 'Current monthly contribution base (gross salary for employees)'
      }
    ],
    
    optionalFields: [
      {
        field: 'initialCapital',
        type: 'number',
        description: 'Initial capital for people who started working before 1999 (valorized amount from ZUS)'
      },
      {
        field: 'insuranceTitle',
        type: 'object',
        description: 'Insurance title code (employee, JDG, farmer, RSP member)'
      },
      {
        field: 'plannedRetirementAge',
        type: 'number',
        description: 'Planned retirement age (defaults to standard: 60/65)'
      },
      {
        field: 'accumulatedCapital',
        type: 'object',
        description: 'Current ZUS account balance (for more accurate calculations)'
      },
      {
        field: 'sickLeave',
        type: 'object',
        description: 'Sick leave data (optional, affects contribution continuity)'
      }
    ],
    
    exampleRequest: {
      inputData: {
        gender: 'male',
        currentAge: 35,
        initialCapital: 0,
        insuranceTitle: {
          code: '05',
          type: 'employee',
          description: 'Employees'
        },
        contributionBase: {
          currentMonthlyAmount: 8000,
          isJdgPreferential: false
        },
        plannedRetirementAge: 65,
        sickLeave: {
          includeInCalculation: false
        }
      },
      scenarioId: 'moderate'
    },
    
    endpoints: {
      'POST /api/pension/fus20': 'Calculate pension according to FUS20 model',
      'GET /api/pension/fus20': 'Get API documentation'
    }
  })
}
