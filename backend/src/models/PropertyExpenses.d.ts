import { MonthlyExpenseDTO, MortgageExpenseDTO, OneTimeExpenseDTO } from "../data-transfer-models";

export interface PropertyExpensesDBO {
  id: number;
  user_id: number;
  property_id: number;
  one_time_expenses: OneTimeExpenseDTO[],
  monthly_expenses: MonthlyExpenseDTO[],
  mortgage_expenses: MortgageExpenseDTO,
}