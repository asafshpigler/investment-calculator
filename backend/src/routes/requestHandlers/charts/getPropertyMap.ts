import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import { createMonthlyFigures, extractDateParts, findPropertyFigures } from "./helpers";
import { PropertyMap, PropertyMonthlyFigures } from "./charts";
import { OneTimeExpenseDTO, MonthlyExpenseDTO, PgDate } from "../../../data-transfer-models";


export function getPropertyMap(periods: PropertyPeriodDBO[], expenses: PropertyExpensesDBO[]): PropertyMap {
  const map: PropertyMap = new Map();

  mapPeriods(map, periods);
  mapExpenses(map, expenses);

  return map;
}

function mapPeriods(map: PropertyMap, periods: PropertyPeriodDBO[]) {
  periods.forEach(pr => {
    const { property_id, year, month, nightly_price, occupancy_rate } = pr;

    let propertyMonthlyFigures: PropertyMonthlyFigures[] = map.get(property_id);

    /*
      group properties by creating arraies of months, each with it's own figures
      should be empty & initialized once per property
    */
    if (propertyMonthlyFigures === undefined) {
      propertyMonthlyFigures = [];
      map.set(property_id, propertyMonthlyFigures);
    }

    /*
      add the newly extracted monthly figures (nightly_price & occupancy_rate)*
      to the accumulation of many monthly figures of the current property

      *each period is unique, identified by year & month, enforced by DB
    */
    const newMonth: PropertyMonthlyFigures = createMonthlyFigures({
      year,
      month,
      nightlyPrice: nightly_price,
      occupancyRate: occupancy_rate
    });

    propertyMonthlyFigures.push(newMonth);
  })
}

function mapExpenses(map: PropertyMap, expenses: PropertyExpensesDBO[]) {
  // expenses - all of the user's expenses, one per property

  expenses.forEach((expense) => {
    const { property_id, one_time_expenses, monthly_expenses, mortgage_expenses } = expense;

    /*
      for each expense (meaning each property)
      get all of it's previously created months (containing income data)
    */
    const propertyMonthlyFigures: PropertyMonthlyFigures[] = map.get(property_id);

    // attach expenses into the months they're due
    attachOneTimeExpenses(propertyMonthlyFigures, one_time_expenses);
    attachMonthlyExpenses(propertyMonthlyFigures, monthly_expenses);

  })
}

/*
  one_time_expenses - all of the property one time expenses, across various months
  for each expense, detect at which month it's due, and attach it to previously created months
*/
function attachOneTimeExpenses(propertyMonthlyFigures: PropertyMonthlyFigures[], one_time_expenses: OneTimeExpenseDTO[]) {
  one_time_expenses.forEach(({ paymentDate, amount }) => {
    const { year, month } = extractDateParts(paymentDate);

    const monthPaymentDue: PropertyMonthlyFigures = findPropertyFigures(propertyMonthlyFigures, year, month);

    if (monthPaymentDue) {
      // accumulate expenses in correct month, alongside income data for easy access per month
      monthPaymentDue.oneTimeExpenses.push(amount);
    }
    else {
      // in case expense is due when there is no income data, and no previously created month, it's initialized here
      const newMonth: PropertyMonthlyFigures = createMonthlyFigures({
        year,
        month,
        oneTimeExpenses: [amount]
      });
      propertyMonthlyFigures.push(newMonth);
    }
  })
}

function attachMonthlyExpenses(propertyMonthlyFigures: PropertyMonthlyFigures[], monthly_expenses: MonthlyExpenseDTO[]) {
  monthly_expenses.forEach(({ startDate, duration, amount }) => {
    const { year, month } = extractDateParts(startDate);

    /*
      in contrast to one_time_expense, monthly_expense describes a payment to be made every month
      hence, can result in attaching a single payment amount to many months (monthly figures)

      determine all months to add a payment to
      a month is uniquely identified by it's year & month
    */
    const monthIds: MonthId[] = generateMonthIds(startDate, duration);

    monthIds.forEach(monthId => {
      // find it's repsective figures
      const monthPaymentDue: PropertyMonthlyFigures = findPropertyFigures(propertyMonthlyFigures, monthId.year, monthId.month);

      // attach the monthly payment amount
      if (monthPaymentDue) {
        // accumulate expenses in correct month, alongside income data for easy access per month
        monthPaymentDue.monthlyExpenses.push(amount);
      }
      else {
        // in case expense is due when there is no income data, and no previously created month, it's initialized here
        const newMonth: PropertyMonthlyFigures = createMonthlyFigures({
          year,
          month,
          monthlyExpenses: [amount]
        });

        propertyMonthlyFigures.push(newMonth);
      }
    });
  })
}

interface MonthId {
  year: number;
  month: number;
}

function generateMonthIds(startDate: PgDate, duration: number): MonthId[] {
  const monthIds: MonthId[] = [];
  
  const {year, month} = extractDateParts(startDate);
  let currMonth = month;
  let currYear = year;

  for (let i = 0; i < duration; i++) {
    // push first month without modification
    if (i === 0) {
      monthIds.push({year: currYear, month: currMonth});
      continue
    }

    else {
      // increment the following months. if you've reach 12 (Dec), go to Jan next year
      if (currMonth === 12) {
        currMonth = 1;
        currYear++;
      }
      else {
        currMonth++;
      }
    }

    monthIds.push({year: currYear, month: currMonth});
  }

  return monthIds;
}