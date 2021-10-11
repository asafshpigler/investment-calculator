export interface ChartDTO {
  propertyId: number;
  labels: string[];
  incomes: number[];
  monthlyExpenses: number[];
  oneTimeExpenses: number[];
  mortgageExpenses: number[];
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
  paymentDate: Date;
  amount: Date;
}

export interface MonthlyExpenseDTO {
  startDate: Date;
  amount: number;
  duration: number;
}

export type MortgageExpenseDTO = NormalLoanDTO | SpitzerLoanDTO

interface NormalLoanDTO {
  startDate: Date;
  amount: number;
  paymentPeriods: PaymentPeriodDBO[]
}

interface PaymentPeriodDBO {
  duration: number;
  loanRate: number;
}

interface SpitzerLoanDTO {
  startDate: Date;
  amount: number;
  duration :number;
  loanRate: number;
}