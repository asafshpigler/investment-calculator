export type PropertyMap = Map<number ,PropertyMonthlyFigures[]>;

export interface PropertyMonthlyFigures {
  year: number;
  month: number;
  occupancyRate: number;
  nightlyPrice: number;
  oneTimeExpenses: number[];
}

  // propertyId: number;
  // monthlyExpenses: number[];
  // mortgageExpenses: number[];