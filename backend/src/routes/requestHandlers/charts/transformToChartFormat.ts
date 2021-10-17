import moment from "moment";
import { daysInMonth } from "./helpers";
import { ChartDTO, SPITZER_LOAN } from "../../../data-transfer-models";
import { sum } from "./helpers";
import { PropertyAttributes } from "./charts";

// prepare data for chart display, for a single property
export function transformToChartFormat(propertyId: number, propertyAttributes: PropertyAttributes): ChartDTO {
  // sort months in chronological order
  propertyAttributes.months.sort((a, b) => {
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
  propertyAttributes.months.forEach(attrs => {
    const mortgageExpense: number = attrs.mortgageExpense ? +(attrs.mortgageExpense).toFixed(2) : attrs.mortgageExpense;
    const label: string = moment({ year: attrs.year, month: attrs.month - 1 }).format("MMM YY");
    const numOfDays: number = daysInMonth(attrs.year, attrs.month);
    const income: number = Math.trunc(numOfDays * attrs.occupancyRate * attrs.nightlyPrice);
    const oneTimeSum: number = sum(attrs.oneTimeExpenses);
    const monthlySum: number = sum(attrs.monthlyExpenses);
    const netRevenue: number = income - oneTimeSum - monthlySum - mortgageExpense;
    
    // note: expenses are turned to negative numbers
    labels.push(label);
    incomes.push(income);
    oneTimeExpenses.push(-oneTimeSum);
    monthlyExpenses.push(-monthlySum);
    mortgageExpenses.push(-mortgageExpense)
    netRevenues.push(netRevenue);
  })

  const amountOfMonths = propertyAttributes.months.length;

  const totalIncome = sum(incomes);
  const avgMonthlyIncome = Math.trunc(totalIncome / amountOfMonths);
  const avgAnnualIncome = avgMonthlyIncome * 12;

  const allExpenses = [oneTimeExpenses, monthlyExpenses, mortgageExpenses].flat();
  const totalExpense = sum(allExpenses);
  const avgMonthlyExpense = Math.trunc(totalExpense / amountOfMonths);
  const avgAnnualExpense = avgMonthlyExpense * 12;

  // note: addition is used because all of the expenses are negative
  const avgAnnualProfit = avgAnnualIncome + avgAnnualExpense;

  const {userInputOneTime, userInputMonthly, userInputMortgage} = propertyAttributes;

  if (userInputMortgage && userInputMortgage.type === SPITZER_LOAN) {
    userInputMortgage.loanRate = +(userInputMortgage.loanRate * 100).toFixed(1);
  }

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
    avgAnnualProfit,
    userInputOneTime,
    userInputMonthly,
    userInputMortgage,
  }

  return chart;
}