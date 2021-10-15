"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyMap = void 0;
const helpers_1 = require("./helpers");
const data_transfer_models_1 = require("../../../data-transfer-models");
function getPropertyMap(periods, expenses) {
    const map = new Map();
    mapPeriods(map, periods);
    mapExpenses(map, expenses);
    return map;
}
exports.getPropertyMap = getPropertyMap;
function mapPeriods(map, periods) {
    periods.forEach(pr => {
        const { property_id, year, month, nightly_price, occupancy_rate } = pr;
        let propertyMonthlyFigures = map.get(property_id);
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
        const newMonth = (0, helpers_1.createMonthlyFigures)({
            year,
            month,
            nightlyPrice: nightly_price,
            occupancyRate: occupancy_rate
        });
        propertyMonthlyFigures.push(newMonth);
    });
}
function mapExpenses(map, expenses) {
    // expense - all of user's expenses for a specific property
    expenses.forEach((expense) => {
        const { property_id, one_time_expenses, monthly_expenses, mortgage_expense } = expense;
        const propertyMonthlyFigures = map.get(property_id);
        // attach expenses into their respective months
        attachOneTimeExpenses(propertyMonthlyFigures, one_time_expenses);
        attachMonthlyExpenses(propertyMonthlyFigures, monthly_expenses);
        attachMortgageExpense(propertyMonthlyFigures, mortgage_expense);
    });
}
/*
  one_time_expenses - all of the property one time expenses, across various months
  for each expense, detect at which month it's due, and attach it to previously created months
*/
function attachOneTimeExpenses(propertyMonthlyFigures, one_time_expenses) {
    one_time_expenses.forEach(({ paymentDate, amount }) => {
        const monthId = (0, helpers_1.extractMonthId)(paymentDate);
        attachAmount(monthId, propertyMonthlyFigures, "oneTimeExpenses", true, amount);
    });
}
function attachMonthlyExpenses(propertyMonthlyFigures, monthly_expenses) {
    monthly_expenses.forEach(expense => {
        const monthId = (0, helpers_1.extractMonthId)(expense.startDate);
        attachSingleMonthlyExpense(propertyMonthlyFigures, monthId, "monthlyExpenses", true, expense.duration, expense.amount);
    });
}
function attachMortgageExpense(propertyMonthlyFigures, mortgage_expense) {
    const { type: loanType } = mortgage_expense;
    switch (loanType) {
        case data_transfer_models_1.SPITZER_LOAN:
            attachSpitzerLoanExpense(propertyMonthlyFigures, mortgage_expense);
            break;
        case data_transfer_models_1.NORMAL_LOAN:
            attachNormalLoanExpense(propertyMonthlyFigures, mortgage_expense);
            break;
        default:
            throw new Error(`invalid loan type: ${loanType}`);
    }
}
function attachSpitzerLoanExpense(propertyMonthlyFigures, mortgage_expense) {
    const { startDate, loanAmount, duration, loanRate } = mortgage_expense;
    const monthId = (0, helpers_1.extractMonthId)(startDate);
    const monthlyPayment = loanAmount * loanRate;
    attachSingleMonthlyExpense(propertyMonthlyFigures, monthId, "mortgageExpense", false, duration, monthlyPayment);
}
function attachNormalLoanExpense(propertyMonthlyFigures, mortgage_expense) {
    const { startDate, paymentPeriods } = mortgage_expense;
    const initialMonth = (0, helpers_1.extractMonthId)(startDate);
    let periodStartMonth = initialMonth;
    paymentPeriods.forEach(({ duration, amount }) => {
        // decimal digits irrelevant for chart display
        const monthlyPayment = Math.trunc(amount / duration);
        const lastModifiedMonth = attachSingleMonthlyExpense(propertyMonthlyFigures, periodStartMonth, "mortgageExpense", false, duration, monthlyPayment);
        periodStartMonth = (0, helpers_1.incrementMonth)(lastModifiedMonth.year, lastModifiedMonth.month);
    });
}
function attachSingleMonthlyExpense(propertyMonthlyFigures, monthId, expenseField, isFieldArray, duration, amount) {
    /*
      in contrast to a one time expense, a monthly expense affects many months of a single property
      a month is uniquely identified by it's year & month
    */
    const monthIds = (0, helpers_1.generateMonthIds)(monthId, duration);
    monthIds.forEach(monthId => {
        attachAmount(monthId, propertyMonthlyFigures, expenseField, isFieldArray, amount);
    });
    const lastMonth = monthIds[monthIds.length - 1];
    return lastMonth;
}
function attachAmount(monthId, monthlyFigures, expenseField, isFieldArray, amount) {
    /*
      if monthly figures doesn't exist - create one
      could happen when there is only expenses for this month, no income
    */
    // is monthly figures a singular entity or nah?
    // if I want to push a new monthly figures where do i push it to
    // and howcome they both have the same name
    const targetMonth = (0, helpers_1.findPropertyFigures)(monthlyFigures, monthId);
    if (!targetMonth) {
        const newMonth = (0, helpers_1.createMonthlyFigures)({
            year: monthId.year,
            month: monthId.month,
            [expenseField]: isFieldArray ? [amount] : amount
        });
        monthlyFigures.push(newMonth);
        return;
    }
    // else, simply attach amount
    if (isFieldArray) {
        const arrayField = targetMonth[expenseField];
        arrayField.push(amount);
    }
    else {
        // @ts-ignore
        targetMonth[expenseField] = amount;
    }
}
//# sourceMappingURL=getPropertyMap.js.map