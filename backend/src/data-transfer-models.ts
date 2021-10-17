export interface ChartDTO {
  propertyId: number;
  labels: string[];
  incomes: number[];
  netRevenues: number[]
  monthlyExpenses: number[];
  oneTimeExpenses: number[];
  mortgageExpenses: number[];
  
  avgAnnualIncome: number;
  avgAnnualExpense: number;
  avgAnnualProfit: number;

  userInputOneTime: OneTimeExpenseDTO[];
  userInputMonthly: MonthlyExpenseDTO[];
  userInputMortgage: MortgageExpenseDTO;
}

export interface PropertyExpensesDTO {
  id: number;
  userId: number;
  propertyId: number;
  oneTimeExpenses: OneTimeExpenseDTO[],
  monthlyExpenses: MonthlyExpenseDTO[],
  mortgageExpenses: MortgageExpenseDTO,
}

export interface OneTimeExpenseDTO {
  paymentDate: PgDate;
  amount: number;
}

export interface MonthlyExpenseDTO {
  startDate: PgDate;
  amount: number;
  duration: number;
}

export type MortgageExpenseDTO = NormalLoanDTO | SpitzerLoanDTO

export interface NormalLoanDTO {
  type: 'NORMAL'
  startDate: PgDate;
  loanAmount: number;
  paymentPeriods: PaymentPeriodDBO[]
}

interface PaymentPeriodDBO {
  duration: number;
  amount: number;
}

export interface SpitzerLoanDTO {
  type: 'SPITZER'
  startDate: PgDate;
  loanAmount: number;
  duration :number;
  loanRate: number;
}

// postgres works with dates in the format of year-month-day, when the column type is Date
// in this codebase, the dates are saved inside jsonb columns. the format in which the dates will be saved
// inside jsonb will conform as well.
export type PgDate = string // 'yyyy-mm-dd';

export const SPITZER_LOAN = 'SPITZER';
export const NORMAL_LOAN = 'NORMAL';