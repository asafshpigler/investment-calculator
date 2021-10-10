export interface PropertyExpansesDBO {
  id: number;
  userId: number;
  propertyId: number;
  oneTimeExpenses: oneTimeExpenseDBO[],
  monthlyExpenses: MonthlyExpenseDBO[],
  mortgageExpense: NormalLoanDBO | SpitzerLoanDBO,
}

interface oneTimeExpenseDBO {
  paymentDate: Date;
  amount: Date;
}

interface MonthlyExpenseDBO {
  startDate: Date;
  amount: number;
  duration: number;
}

interface NormalLoanDBO {
  startDate: Date;
  amount: number;
  paymentPeriods: PaymentPeriodDBO[]
}

interface PaymentPeriodDBO {
  duration: number;
  loanRate: number;
}

interface SpitzerLoanDBO {
  startDate: Date;
  amount: number;
  duration :number;
  loanRate: number;
}