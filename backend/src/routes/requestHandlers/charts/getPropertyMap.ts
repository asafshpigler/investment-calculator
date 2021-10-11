import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import { extractDateParts, findPropertyFigures } from "./helpers";
import { PropertyMap, PropertyMonthlyFigures } from "./charts";

export function getPropertyMap(periods: PropertyPeriodDBO[], expenses: PropertyExpensesDBO[]): PropertyMap {
  const map: PropertyMap = new Map();

  mapPeriods(map, periods);
  mapExpenses(map, expenses);

  return map;
}

function mapPeriods(map: PropertyMap, periods: PropertyPeriodDBO[]) {
  periods.forEach(pr => {
    const {property_id, year, month, nightly_price, occupancy_rate} = pr;

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
    const newMonth: PropertyMonthlyFigures = {
      year,
      month,
      nightlyPrice: nightly_price,
      occupancyRate: occupancy_rate,
      oneTimeExpenses: [],
    };

    propertyMonthlyFigures.push(newMonth);
  })
}

function mapExpenses(map: PropertyMap, expenses: PropertyExpensesDBO[]) {
  // expenses - all of the user's expenses, one per property

  expenses.forEach(({property_id, one_time_expenses}) => {
    /*
      for each expense (meaning each property)
      get all of it's previously created months (containing income data)
    */
    const propertyMonthlyFigures: PropertyMonthlyFigures[] = map.get(property_id);

    /*
      one_time_expenses - all of the property one time expenses, across various months
      for each expense, detect at which month it's due, and attach it to previously created months
    */
    one_time_expenses.forEach(({paymentDate, amount}) => {
      const {year, month} = extractDateParts(paymentDate);

      const monthPaymentDue: PropertyMonthlyFigures = findPropertyFigures(propertyMonthlyFigures, year, month);

      if (monthPaymentDue) {
        // accumulate expenses in correct month, alongside income data for easy access per month
        monthPaymentDue.oneTimeExpenses.push(amount);
      }
      else {
        // in case expense is due when there is no income data, and no previously created month, it's initialized here
        const newMonth: PropertyMonthlyFigures = {
          year,
          month,
          nightlyPrice: null,
          occupancyRate: null,
          oneTimeExpenses: [amount],
        };
        propertyMonthlyFigures.push(newMonth);
      }
    })
  })
}
