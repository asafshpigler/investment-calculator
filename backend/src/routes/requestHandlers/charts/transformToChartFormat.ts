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
  const netRevenues = [];

  // for each month of a property, push data for incomes, expenses, net revenue
  propertyMonthlyFigures.forEach(pm => {
    const label: string = moment({ year: pm.year, month: pm.month - 1 }).format("MMM YY");
    const numOfDays: number = daysInMonth(pm.year, pm.month);
    const income: number = Math.trunc(numOfDays * pm.occupancyRate * pm.nightlyPrice);
    const oneTimeSum: number = sum(pm.oneTimeExpenses);
    const monthlySum: number = sum(pm.monthlyExpenses);
    const netRevenue: number = income - oneTimeSum - monthlySum;
    
    labels.push(label);
    incomes.push(income);
    oneTimeExpenses.push(-oneTimeSum); // note: turned to negative number
    monthlyExpenses.push(-monthlySum); // note: turned to negative number
    netRevenues.push(netRevenue);
  })

  const chart: ChartDTO = {
    propertyId,
    labels,
    incomes,
    netRevenues,
    oneTimeExpenses: oneTimeExpenses,
    monthlyExpenses: monthlyExpenses,
    mortgageExpenses: null,
  }

  return chart;
}