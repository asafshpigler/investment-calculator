export type PropertyMap = Map<number ,PropertyMonth[]>;

export interface PropertyMonth {
  year: number;
  month: number;
  occupancyRate: number;
  nightlyPrice: number;
  oneTimeExpenses: number[];

  // propertyId: number;
  // monthlyExpenses: number[];
  // mortgageExpenses: number[];
}