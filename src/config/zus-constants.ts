/**
 * ZUS System Constants
 * Official parameters from Polish social insurance system
 */

export const ZUS_SYSTEM_PARAMETERS = {
  // Retirement ages
  RETIREMENT_AGE: {
    MALE: 65,
    FEMALE: 60
  },
  
  // Contribution rates
  CONTRIBUTION_RATES: {
    TOTAL: 0.1952, // 19.52% total pension contribution
    EMPLOYEE: 0.0976, // 9.76% employee part
    EMPLOYER: 0.0976, // 9.76% employer part
    
    // JDG (sole proprietorship) rates
    JDG_PREFERENTIAL: {
      PENSION: 176.27, // PLN monthly (preferential period)
      DISABILITY: 204.37 // PLN monthly
    },
    JDG_STANDARD: {
      PENSION: 812.23 // PLN monthly (after preferential period)
    }
  },
  
  // Initial capital (for those born before 1949)
  INITIAL_CAPITAL: {
    BASE_AMOUNT: 24000, // PLN
    MULTIPLIER_PER_YEAR: 0.013 // 1.3% per year of service
  },
  
  // Current averages (2024)
  CURRENT_AVERAGES: {
    PENSION: 3500, // PLN average pension
    MINIMUM_PENSION: 1780, // PLN minimum pension
    AVERAGE_SALARY: 7500 // PLN average salary
  }
} as const

// Insurance title codes
export const INSURANCE_TITLE_CODES = {
  EMPLOYEE: {
    code: '05',
    type: 'employee' as const,
    description: 'Employees (umowa o pracę)'
  },
  JDG: {
    code: '05',
    type: 'jdg' as const,
    description: 'Sole proprietorship (JDG)'
  },
  FARMER: {
    code: '06',
    type: 'farmer' as const,
    description: 'Farmers (KRUS)'
  },
  RSP_MEMBER: {
    code: '08',
    type: 'rsp_member' as const,
    description: 'Social participation council members'
  }
} as const
