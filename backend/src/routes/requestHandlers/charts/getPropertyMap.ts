import { MonthlyExpenseDTO, MortgageExpenseDTO, NormalLoanDTO, NORMAL_LOAN, OneTimeExpenseDTO, SpitzerLoanDTO, SPITZER_LOAN } from "../../../data-transfer-models";
import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import { MonthId, PropertyAttributes, PropertyMap, PropertyMonth } from "./charts";
import { createPropertyMonth, extractMonthId, findPropertyFigures, generateMonthIds, incrementMonth } from "./helpers";

export function getPropertyMap(periods: PropertyPeriodDBO[], expenses: PropertyExpensesDBO[]): PropertyMap {
  const map: PropertyMap = new Map();

  mapPeriods(map, periods);
  mapExpenses(map, expenses);

  return map;
}

function mapPeriods(map: PropertyMap, periods: PropertyPeriodDBO[]) {
  periods.forEach(pr => {
    const { property_id, year, month, nightly_price, occupancy_rate } = pr;

    let propertyAttributes: PropertyAttributes = map.get(property_id);

    /*
      group properties by creating arraies of months, each with it's own figures
      should be empty & initialized once per property
    */
    if (propertyAttributes === undefined) {
      propertyAttributes = {
        months: [],
        userInputOneTime: [],
        userInputMonthly: [],
        userInputMortgage: <MortgageExpenseDTO>{},
      };
      map.set(property_id, propertyAttributes);
    }

    /*
      add the newly extracted monthly figures (nightly_price & occupancy_rate)*
      to the accumulation of many monthly figures of the current property

      *each period is unique, identified by year & month, enforced by DB
    */
    const newMonth: PropertyMonth = createPropertyMonth({
      year,
      month,
      nightlyPrice: nightly_price,
      occupancyRate: occupancy_rate
    });

    propertyAttributes.months.push(newMonth);
  })
}

function mapExpenses(map: PropertyMap, expenses: PropertyExpensesDBO[]) {
  // expense - all of user's expenses for a specific property
  expenses.forEach((expense) => {
    const { property_id, one_time_expenses, monthly_expenses, mortgage_expense } = expense;

    const propertyAttributes: PropertyAttributes = map.get(property_id);

    // attach raw user input, to showcase in form
    propertyAttributes.userInputOneTime = one_time_expenses;
    propertyAttributes.userInputMonthly = monthly_expenses;
    propertyAttributes.userInputMortgage = mortgage_expense;

    // attach expenses amount into their respective months
    const { months } = propertyAttributes;
    attachOneTimeExpenses(months, one_time_expenses);
    attachMonthlyExpenses(months, monthly_expenses);
    attachMortgageExpense(months, mortgage_expense);
  })
}

/*
  one_time_expenses - all of the property one time expenses, across various months
  for each expense, detect at which month it's due, and attach it to previously created months
*/
function attachOneTimeExpenses(propertyMonths: PropertyMonth[], one_time_expenses: OneTimeExpenseDTO[]) {
  one_time_expenses.forEach(({ paymentDate, amount }) => {
    const monthId: MonthId = extractMonthId(paymentDate);
    attachAmount(monthId, propertyMonths, "oneTimeExpenses", true, amount);
  })
}

function attachMonthlyExpenses(propertyMonths: PropertyMonth[], monthly_expenses: MonthlyExpenseDTO[]) {
  monthly_expenses.forEach(expense => {
    const monthId: MonthId = extractMonthId(expense.startDate);

    attachSingleMonthlyExpense(
      propertyMonths,
      monthId,
      "monthlyExpenses",
      true,
      expense.duration,
      expense.amount
    )
  });
}

function attachMortgageExpense(propertyMonths: PropertyMonth[], mortgage_expense: MortgageExpenseDTO) {
  const { type: loanType } = mortgage_expense;

  switch (loanType) {
    case SPITZER_LOAN:
      attachSpitzerLoanExpense(propertyMonths, <SpitzerLoanDTO>mortgage_expense);
      break;

    case NORMAL_LOAN:
      attachNormalLoanExpense(propertyMonths, <NormalLoanDTO>mortgage_expense);
      break;

    default:
      throw new Error(`invalid loan type: ${loanType}`);
  }
}

function attachSpitzerLoanExpense(propertyMonths: PropertyMonth[], mortgage_expense: SpitzerLoanDTO) {
  const { startDate, loanAmount, duration, loanRate } = mortgage_expense;

  const monthId: MonthId = extractMonthId(startDate);
  const monthlyPayment = loanAmount * loanRate;

  attachSingleMonthlyExpense(
    propertyMonths,
    monthId,
    "mortgageExpense",
    false,
    duration,
    monthlyPayment)
    ;
}

function attachNormalLoanExpense(propertyMonths: PropertyMonth[], mortgage_expense: NormalLoanDTO) {
  const { startDate, paymentPeriods } = mortgage_expense;

  const initialMonth: MonthId = extractMonthId(startDate);
  let periodStartMonth: MonthId = initialMonth;

  paymentPeriods.forEach(({ duration, amount }) => {
    // decimal digits irrelevant for chart display
    const monthlyPayment = Math.trunc(amount / duration);

    const lastModifiedMonth: MonthId = attachSingleMonthlyExpense(
      propertyMonths,
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
  propertyMonths: PropertyMonth[],
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
    attachAmount(monthId, propertyMonths, expenseField, isFieldArray, amount);
  })

  const lastMonth: MonthId = monthIds[monthIds.length - 1];
  return lastMonth;
}

function attachAmount(
  monthId: MonthId,
  propertyMonths: PropertyMonth[],
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

  const targetMonth: PropertyMonth = findPropertyFigures(propertyMonths, monthId);

  if (!targetMonth) {
    const newMonth: PropertyMonth = createPropertyMonth({
      year: monthId.year,
      month: monthId.month,
      [expenseField]: isFieldArray ? [amount] : amount
    });

    propertyMonths.push(newMonth);
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