import moment from "moment";
import { daysInMonth } from "./helpers";
import { ChartDTO } from "../../../data-transfer-models";
import { sum } from "./helpers";
import { PropertyMonthlyFigures } from "./charts";

// prepare data for chart display, for a single property
export function transformToChartFormat(propertyId: number, propertyMonthlyFigures: PropertyMonthlyFigures[]): ChartDTO {
  // sort months in chronological order
  propertyMonthlyFigures.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    else {
      return a.month - b.month;
    }
  })

  // transform data
  const labels = [];
  const incomes = [];
  const oneTimeExpenses = [];
  const monthlyExpenses = [];
  const mortgageExpenses = [];
  const netRevenues = [];

  // for each month of a property, push data for incomes, expenses, net revenue
  propertyMonthlyFigures.forEach(pm => {
    const mortgageExpense: number = pm.mortgageExpense ? +(pm.mortgageExpense).toFixed(2) : pm.mortgageExpense;
    const label: string = moment({ year: pm.year, month: pm.month - 1 }).format("MMM YY");
    const numOfDays: number = daysInMonth(pm.year, pm.month);
    const income: number = Math.trunc(numOfDays * pm.occupancyRate * pm.nightlyPrice);
    const oneTimeSum: number = sum(pm.oneTimeExpenses);
    const monthlySum: number = sum(pm.monthlyExpenses);
    const netRevenue: number = income - oneTimeSum - monthlySum - mortgageExpense;
    
    // note: expenses are turned to negative numbers
    labels.push(label);
    incomes.push(income);
    oneTimeExpenses.push(-oneTimeSum);
    monthlyExpenses.push(-monthlySum);
    mortgageExpenses.push(-mortgageExpense)
    netRevenues.push(netRevenue);
  })

  const amountOfMonths = propertyMonthlyFigures.length;

  const totalIncome = sum(incomes);
  const avgMonthlyIncome = Math.trunc(totalIncome / amountOfMonths);
  const avgAnnualIncome = avgMonthlyIncome * 12;

  const allExpenses = [oneTimeExpenses, monthlyExpenses, mortgageExpenses].flat();
  const totalExpense = sum(allExpenses);
  const avgMonthlyExpense = Math.trunc(totalExpense / amountOfMonths);
  const avgAnnualExpense = avgMonthlyExpense * 12;

  // note: addition is used because all of the expenses are negative
  const avgAnnualProfit = avgAnnualIncome + avgAnnualExpense;

  const chart: ChartDTO = {
    propertyId,
    labels,
    incomes,
    netRevenues,
    oneTimeExpenses,
    monthlyExpenses,
    mortgageExpenses,
    avgAnnualIncome,
    avgAnnualExpense,
    avgAnnualProfit
  }

  return chart;
}