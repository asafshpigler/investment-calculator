export interface PropertyExpansesDTO {
  id: number;
  userId: number;
  propertyId: number;
  oneTimeExpenses: oneTimeExpenseDTO[],
  monthlyExpenses: MonthlyExpenseDTO[],
  mortgageExpense: NormalLoanDTO | SpitzerLoanDTO,
}

interface oneTimeExpenseDTO {
  paymentDate: Date;
  amount: Date;
}

interface MonthlyExpenseDTO {
  startDate: Date;
  amount: number;
  duration: number;
}

interface NormalLoanDTO {
  startDate: Date;
  amount: number;
  paymentPeriods: PaymentPeriodDTO[]
}

interface PaymentPeriodDTO {
  duration: number;
  loanRate: number;
}

interface SpitzerLoanDTO {
  startDate: Date;
  amount: number;
  duration :number;
  loanRate: number;
}