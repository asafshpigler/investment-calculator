export type PropertyMap = Map<number ,PropertyMonthlyFigures[]>;

export interface PropertyMonthlyFigures {
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