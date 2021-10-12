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
}

export interface PropertyExpensesDTO {
  id: number;
  userId: number;
  propertyId: number;
  oneTimeExpenses: OneTimeExpenseDTO[],
  monthlyExpenses: MonthlyExpenseDTO[],
  mortgageExpense: MortgageExpenseDTO,
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
  type: 'normal'
  startDate: PgDate;
  loanAmount: number;
  
  paymentPeriods: PaymentPeriodDBO[]
}

interface PaymentPeriodDBO {
  duration: number;
  amount: number;
}

export interface SpitzerLoanDTO {
  type: 'spitzer'
  startDate: PgDate;
  loanAmount: number;

  duration :number;
  loanRate: number;
}

// postgres works with dates in the format of year-month-day, when the column type is Date
// in this codebase, the dates are saved inside jsonb columns. the format in which the dates will be saved
// inside jsonb will conform as well.
export type PgDate = `${number}-${number}-${number}`;