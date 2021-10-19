import { MonthlyExpenseDTO, MortgageExpenseDTO, OneTimeExpenseDTO } from "../../../dataTransferModels";

export type PropertyMap = Map<number ,PropertyAttributes>;

export interface PropertyAttributes {
  months: PropertyMonth[]

  userInputOneTime: OneTimeExpenseDTO[];
  userInputMonthly: MonthlyExpenseDTO[];
  userInputMortgage: MortgageExpenseDTO;
}

interface PropertyMonth {
  year: number;
  month: number;
  occupancyRate: number;
  nightlyPrice: number;
  oneTimeExpenses: number[];
  monthlyExpenses: number[];
  mortgageExpense: number;
}

export interface MonthId {
  year: number;
  month: number;
}