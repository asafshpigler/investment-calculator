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
    attachAmount(monthId, propertyMonthlyFigures, "oneTimeExpenses", true, amount);
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
  expenseField: ExpenseField,
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
    attachAmount(monthId, propertyMonthlyFigures, expenseField, isFieldArray, amount);
  })

  const lastMonth: MonthId = monthIds[monthIds.length - 1];
  return lastMonth;
}

function attachAmount(
  monthId: MonthId,
  monthlyFigures: PropertyMonthlyFigures[],
  expenseField: ExpenseField,
  isFieldArray: boolean,
  amount: number
) {
  /*
    if monthly figures doesn't exist - create one
    could happen when there is only expenses for this month, no income
  */

  // is monthly figures a singular entity or nah?
  // if I want to push a new monthly figures where do i push it to
  // and howcome they both have the same name

  const targetMonth: PropertyMonthlyFigures = findPropertyFigures(monthlyFigures, monthId);

  if (!targetMonth) {
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
    const arrayField = <number[]>targetMonth[expenseField]
    arrayField.push(amount);
  }
  else {
    // @ts-ignore
    targetMonth[expenseField] = amount;
  }
}

type ExpenseField = "oneTimeExpenses" | "mortgageExpense" | "monthlyExpenses"