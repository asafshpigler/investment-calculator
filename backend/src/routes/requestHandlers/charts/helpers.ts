import { PgDate } from "../../../data-transfer-models";
import { PropertyMonthlyFigures } from "./charts";

export function findPropertyFigures(propertyMonthlyFigures: PropertyMonthlyFigures[], year: number, month: number): PropertyMonthlyFigures {
  return propertyMonthlyFigures.find(pm => pm.year === year && pm.month === month);
}

export function extractDateParts(date: PgDate) {
  const [year, month, day] = date.split('-');

  return {
    year: +year,
    month: +month,
    day: +day,
  }
}

export function sum(nums): number {
  return nums.reduce((a, b) => a + b, 0)
}

/*
  Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
  using 0 as the day it will give us the last day of the prior month.
  So passing in 1 as the month will return the last day of January, not February
*/

export function daysInMonth (year, month): number {
  return new Date(year, month, 0).getDate();
}

export function createMonthlyFigures(monthlyFigures: Partial<PropertyMonthlyFigures>): PropertyMonthlyFigures  {
  const {year, month, nightlyPrice, occupancyRate, oneTimeExpenses, monthlyExpenses, mortgageExpense} = monthlyFigures || {};

  return {
    year: year || null,
    month: month || null,
    nightlyPrice: nightlyPrice ||null,
    occupancyRate: occupancyRate || null,
    oneTimeExpenses: oneTimeExpenses || [],
    monthlyExpenses: monthlyExpenses || [],
    mortgageExpense: mortgageExpense || null,
  }
}