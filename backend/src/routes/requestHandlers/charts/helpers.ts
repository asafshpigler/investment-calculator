import { PgDate } from "../../../dataTransferModels";
import { MonthId, PropertyAttributes, PropertyMonth } from "./charts";

export function findPropertyFigures(propertyAttributes: PropertyMonth[], monthId: MonthId): PropertyMonth {
  return propertyAttributes.find(pm => pm.year === monthId.year && pm.month === monthId.month);
}

export function extractMonthId(date: PgDate) {
  const [year, month] = date.split('-');

  return {
    year: +year,
    month: +month
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

export function createPropertyMonth(monthlyFigures: Partial<PropertyMonth>): PropertyMonth  {
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

export function generateMonthIds(monthId: MonthId, duration: number): MonthId[] {
  const monthIds: MonthId[] = [];
  const {year: initialYear, month: initialMonth} = monthId;
  
  // insert the 1st month before incrementing
  monthIds.push({year: initialYear, month: initialMonth});
  
  let currYear = initialYear;
  let currMonth =  initialMonth;
  
  // note: one less iteration, already done
  for (let i = 0; i < duration-1; i++) {
      const nextMonth: MonthId = incrementMonth(currYear, currMonth);
      currYear = nextMonth.year;
      currMonth = nextMonth.month;

      monthIds.push({year: currYear, month: currMonth});
    }

  return monthIds;
}

// increment the following months. if you've reach 12 (Dec), go to Jan next year
export function incrementMonth(year: number, month: number): MonthId {
  let nextMonth = month 
  let nextYear = year;

  if (month === 12) {
    nextMonth = 1;
    nextYear++;
  }
  else {
    nextMonth++;
  }

  return {
    month: nextMonth,
    year: nextYear
  }
}