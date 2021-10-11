import { PropertyExpensesDBO } from "../../../models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../models/PropertyPeriod";
import { extractDateParts, findPropertyMonth } from "./helpers";
import { PropertyMap, PropertyMonth } from "./models";

export function getPropertyMap(periods: PropertyPeriodDBO[], expenses: PropertyExpensesDBO[]): PropertyMap {
  const map: PropertyMap = new Map();

  mapPeriods(map, periods);
  mapExpenses(map, expenses);

  return map;
}

function mapPeriods(map: PropertyMap, periods: PropertyPeriodDBO[]) {
  periods.forEach(p => {
    const {property_id, year, month, nightly_price, occupancy_rate} = p;

    // get existing property months (prop id). if it's empty, return a new array
    const propertyMonths: PropertyMonth[] = map.get(property_id) || [];

    // sanity check: if the same year and month exist, throw an error, which one should I use
    const isMonthExists: boolean = !!findPropertyMonth(propertyMonths, year, month);
    if (isMonthExists) {
      throw new Error(`suspicious data: property_periods table contains more than one row with the same month and year
        which is the correct income data for year: ${year} and month: ${month}`);
    }

    // insert an object (year, m, price, rate) into the array
    const newMonth: PropertyMonth = {
      year,
      month,
      nightlyPrice: nightly_price,
      occupancyRate: occupancy_rate,
      oneTimeExpenses: [],
    };

    propertyMonths.push(newMonth);

    // save array in map
    map.set(property_id, propertyMonths);
  })
}

function mapExpenses(map: PropertyMap, expenses: PropertyExpensesDBO[]) {
  expenses.forEach(({property_id, one_time_expenses}) => {
    // in property expanses table, there is a singular line per user per property id for all of
    // that charts expenses

    // using the current expense property id,
    // we find the relevant property in map
    // get it's months

    // and push into the releant month the expense amount
    // if that month doesn't exist, initialize it

    // for each is intended to cover all of that user expenses
    const propertyMonths: PropertyMonth[] = map.get(property_id);
    
    one_time_expenses.forEach(({paymentDate, amount}) => {
      // payment date is a string in a speicifc format. can i use typescript to specift this format?
      const {year, month} = extractDateParts(paymentDate);

      const monthToAddExpensesTo = findPropertyMonth(propertyMonths, year, month);

      if (monthToAddExpensesTo) {
        monthToAddExpensesTo.oneTimeExpenses.push(amount);
      }
      else {
        // can a user insert expenses on a month where he has no income to? perhaps.
        // that is an edge case I would not advise. I can 
        // what if that month doesn't exist yet?
        // add it to the map, along with all other empty fields
        const newMonth: PropertyMonth = {
          year,
          month,
          nightlyPrice: null,
          occupancyRate: null,
          oneTimeExpenses: [amount],
        };
        propertyMonths.push(newMonth);
      }
    })
  })
}
