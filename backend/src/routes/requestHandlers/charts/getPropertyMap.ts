import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import { createMonthlyFigures, extractMonthId, findPropertyFigures, generateMonthIds, incrementMonth } from "./helpers";
import { MonthId, PropertyMap, PropertyMonthlyFigures } from "./charts";
import { OneTimeExpenseDTO, MonthlyExpenseDTO, PgDate, MortgageExpenseDTO, SpitzerLoanDTO, NormalLoanDTO } from "../../../data-transfer-models";

const SPITZER_LOAN = 'spitzer';
const NORMAL_LOAN = 'normal';

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
  // expense - all of user's expenses for a specific property
  expenses.forEach((expense) => {
    const { property_id, one_time_expenses, monthly_expenses, mortgage_expense } = expense;

    const propertyMonthlyFigures: PropertyMonthlyFigures[] = map.get(property_id);

    // attach expenses into their respective months
    attachOneTimeExpenses(propertyMonthlyFigures, one_time_expenses);
    attachMonthlyExpenses(propertyMonthlyFigures, monthly_expenses);
    attachMortgageExpense(propertyMonthlyFigures, mortgage_expense);
  })
}

/*
  one_time_expenses - all of the property one time expenses, across various months
  for each expense, detect at which month it's due, and attach it to previously created months
*/
function attachOneTimeExpenses(propertyMonthlyFigures: PropertyMonthlyFigures[], one_time_expenses: OneTimeExpenseDTO[]) {
  one_time_expenses.forEach(({ paymentDate, amount }) => {
    const monthId: MonthId = extractMonthId(paymentDate);
    const monthlyFigures: PropertyMonthlyFigures = findPropertyFigures(propertyMonthlyFigures, monthId);
    
    attachAmount(monthId, monthlyFigures, "oneTimeExpense", false, amount);
  })
}

function attachMonthlyExpenses(propertyMonthlyFigures: PropertyMonthlyFigures[], monthly_expenses: MonthlyExpenseDTO[]) {
  monthly_expenses.forEach(expense => {
    const monthId: MonthId = extractMonthId(expense.startDate);
    
    attachSingleMonthlyExpense(
      propertyMonthlyFigures,
      monthId,
      "monthlyExpenses",
      true,
      expense.duration,
      expense.amount
    )
  });
}

function attachMortgageExpense(propertyMonthlyFigures: PropertyMonthlyFigures[], mortgage_expense: MortgageExpenseDTO) {
  const { type: loanType } = mortgage_expense;

  switch (loanType) {
    case SPITZER_LOAN:
      attachSpitzerLoanExpense(propertyMonthlyFigures, <SpitzerLoanDTO>mortgage_expense);
      break;

    case NORMAL_LOAN:
      attachNormalLoanExpense(propertyMonthlyFigures, <NormalLoanDTO>mortgage_expense);
      break;

    default:
      throw new Error(`invalid loan type: ${loanType}`);
  }
}

function attachSpitzerLoanExpense(propertyMonthlyFigures: PropertyMonthlyFigures[], mortgage_expense: SpitzerLoanDTO) {
  const { startDate, loanAmount, duration, loanRate } = mortgage_expense;

  const monthId: MonthId = extractMonthId(startDate);
  const monthlyPayment = loanAmount * loanRate;

  attachSingleMonthlyExpense(
    propertyMonthlyFigures,
    monthId,
    "mortgageExpense",
    false,
    duration,
    monthlyPayment)
  ;
}

function attachNormalLoanExpense(propertyMonthlyFigures: PropertyMonthlyFigures[], mortgage_expense: NormalLoanDTO) {
  const { startDate, paymentPeriods } = mortgage_expense;

  const initialMonth: MonthId = extractMonthId(startDate);
  let periodStartMonth: MonthId = initialMonth;

  paymentPeriods.forEach(({ duration, amount }) => {
    // decimal digits irrelevant for chart display
    const monthlyPayment = Math.trunc(amount / duration);
    
    const lastModifiedMonth: MonthId = attachSingleMonthlyExpense(
      propertyMonthlyFigures,
      periodStartMonth,
      "mortgageExpense",
      false,
      duration,
      monthlyPayment
    );

    periodStartMonth = incrementMonth(lastModifiedMonth.year, lastModifiedMonth.month);
  })

}

function attachSingleMonthlyExpense(
  propertyMonthlyFigures: PropertyMonthlyFigures[],
  monthId: MonthId,
  expenseField: "monthlyExpenses" | "mortgageExpense",
  isFieldArray: boolean,
  duration: number,
  amount: number
): MonthId {
  /*
    in contrast to a one time expense, a monthly expense affects many months of a single property
    a month is uniquely identified by it's year & month
  */

  const monthIds: MonthId[] = generateMonthIds(monthId, duration);

  monthIds.forEach(monthId => {
    const monthlyFigures: PropertyMonthlyFigures = findPropertyFigures(propertyMonthlyFigures, monthId);
    attachAmount(monthId, monthlyFigures, expenseField, isFieldArray, amount);
  })

  const lastMonth: MonthId = monthIds[monthIds.length - 1];
  return lastMonth;
}

function attachAmount(monthId, monthlyFigures, expenseField, isFieldArray, amount) {
      /*
        if monthly figures doesn't exist - create one
        could happen when there is only expenses for this month, no income
      */
      if (!monthlyFigures) {
        const newMonth: PropertyMonthlyFigures = createMonthlyFigures({
          year: monthId.year,
          month: monthId.month,
          [expenseField]: isFieldArray ? [amount] : amount
        });
  
        monthlyFigures.push(newMonth);
        return;
      }
  
      // else, simply attach amount
      if (isFieldArray) {
        monthlyFigures[expenseField].push(amount);
      }
      else {
        monthlyFigures[expenseField] = amount;
      }
}