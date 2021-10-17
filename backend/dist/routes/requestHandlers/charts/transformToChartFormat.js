"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToChartFormat = void 0;
const moment_1 = __importDefault(require("moment"));
const helpers_1 = require("./helpers");
const data_transfer_models_1 = require("../../../data-transfer-models");
const helpers_2 = require("./helpers");
// prepare data for chart display, for a single property
function transformToChartFormat(propertyId, propertyAttributes) {
    // sort months in chronological order
    propertyAttributes.months.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        else {
            return a.month - b.month;
        }
    });
    // transform data
    const labels = [];
    const incomes = [];
    const oneTimeExpenses = [];
    const monthlyExpenses = [];
    const mortgageExpenses = [];
    const netRevenues = [];
    // for each month of a property, push data for incomes, expenses, net revenue
    propertyAttributes.months.forEach(attrs => {
        const mortgageExpense = attrs.mortgageExpense ? +(attrs.mortgageExpense).toFixed(2) : attrs.mortgageExpense;
        const label = (0, moment_1.default)({ year: attrs.year, month: attrs.month - 1 }).format("MMM YY");
        const numOfDays = (0, helpers_1.daysInMonth)(attrs.year, attrs.month);
        const income = Math.trunc(numOfDays * attrs.occupancyRate * attrs.nightlyPrice);
        const oneTimeSum = (0, helpers_2.sum)(attrs.oneTimeExpenses);
        const monthlySum = (0, helpers_2.sum)(attrs.monthlyExpenses);
        const netRevenue = income - oneTimeSum - monthlySum - mortgageExpense;
        // note: expenses are turned to negative numbers
        labels.push(label);
        incomes.push(income);
        oneTimeExpenses.push(-oneTimeSum);
        monthlyExpenses.push(-monthlySum);
        mortgageExpenses.push(-mortgageExpense);
        netRevenues.push(netRevenue);
    });
    const amountOfMonths = propertyAttributes.months.length;
    const totalIncome = (0, helpers_2.sum)(incomes);
    const avgMonthlyIncome = Math.trunc(totalIncome / amountOfMonths);
    const avgAnnualIncome = avgMonthlyIncome * 12;
    const allExpenses = [oneTimeExpenses, monthlyExpenses, mortgageExpenses].flat();
    const totalExpense = (0, helpers_2.sum)(allExpenses);
    const avgMonthlyExpense = Math.trunc(totalExpense / amountOfMonths);
    const avgAnnualExpense = avgMonthlyExpense * 12;
    // note: addition is used because all of the expenses are negative
    const avgAnnualProfit = avgAnnualIncome + avgAnnualExpense;
    const { userInputOneTime, userInputMonthly, userInputMortgage } = propertyAttributes;
    if (userInputMortgage && userInputMortgage.type === data_transfer_models_1.SPITZER_LOAN) {
        userInputMortgage.loanRate = +(userInputMortgage.loanRate * 100).toFixed(1);
    }
    const chart = {
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
    };
    return chart;
}
exports.transformToChartFormat = transformToChartFormat;
//# sourceMappingURL=transformToChartFormat.js.map