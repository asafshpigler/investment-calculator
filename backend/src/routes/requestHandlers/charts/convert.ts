import moment from "moment";
import { daysInMonth } from "./helpers";
import { ChartDTO } from "../../../data-transfer-models";
import { sum } from "./helpers";
import { PropertyMonthlyFigures } from "./models";

export function convert(propertyId: number, propertyMonthlyFigures: PropertyMonthlyFigures[]): ChartDTO {
  // sort months in chronological order
  propertyMonthlyFigures.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    else {
      return a.month - b.month;
    }
  })

  // convert to chart friendly data
  const labels = [];
  const incomes = [];
  const oneTimeExpensesForChart = [];
  const netRevenues = [];

  propertyMonthlyFigures.forEach(pm => {
    const {year, month, occupancyRate, nightlyPrice, oneTimeExpenses} = pm;

    const label: string = moment({ year, month: month - 1 }).format("MMM YY");
    
    const numOfDays: number = daysInMonth(year, month);
    const income: number = Math.trunc(numOfDays * occupancyRate * nightlyPrice);

    const oneTimeSum: number = sum(oneTimeExpenses);
    
    const netRevenue: number = income - oneTimeSum;
    
    labels.push(label);
    incomes.push(income);
  
    // note: turn into a negative number, for visualization sake
    oneTimeExpensesForChart.push(-oneTimeSum);
    netRevenues.push(netRevenue);
  })

  // // push income, calc by multiplying
  // chart.incomes.push(periodIncome);
  const chart: ChartDTO = {
    propertyId,
    labels,
    incomes,
    netRevenues,
    monthlyExpenses: null,
    oneTimeExpenses: oneTimeExpensesForChart,
    mortgageExpenses: null,
  }

  return chart;
}