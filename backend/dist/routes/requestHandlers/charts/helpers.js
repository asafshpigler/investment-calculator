"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementMonth = exports.generateMonthIds = exports.createMonthlyFigures = exports.daysInMonth = exports.sum = exports.extractMonthId = exports.findPropertyFigures = void 0;
function findPropertyFigures(propertyMonthlyFigures, monthId) {
    return propertyMonthlyFigures.find(pm => pm.year === monthId.year && pm.month === monthId.month);
}
exports.findPropertyFigures = findPropertyFigures;
function extractMonthId(date) {
    const [year, month] = date.split('-');
    return {
        year: +year,
        month: +month
    };
}
exports.extractMonthId = extractMonthId;
function sum(nums) {
    return nums.reduce((a, b) => a + b, 0);
}
exports.sum = sum;
/*
  Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
  using 0 as the day it will give us the last day of the prior month.
  So passing in 1 as the month will return the last day of January, not February
*/
function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
exports.daysInMonth = daysInMonth;
function createMonthlyFigures(monthlyFigures) {
    const { year, month, nightlyPrice, occupancyRate, oneTimeExpenses, monthlyExpenses, mortgageExpense } = monthlyFigures || {};
    return {
        year: year || null,
        month: month || null,
        nightlyPrice: nightlyPrice || null,
        occupancyRate: occupancyRate || null,
        oneTimeExpenses: oneTimeExpenses || [],
        monthlyExpenses: monthlyExpenses || [],
        mortgageExpense: mortgageExpense || null,
    };
}
exports.createMonthlyFigures = createMonthlyFigures;
function generateMonthIds(monthId, duration) {
    const monthIds = [];
    const { year: initialYear, month: initialMonth } = monthId;
    // insert the 1st month before incrementing
    monthIds.push({ year: initialYear, month: initialMonth });
    let currYear = initialYear;
    let currMonth = initialMonth;
    // we've already inserted 1 month so we iterate one time less than usual
    for (let i = 0; i < duration - 1; i++) {
        const nextMonth = incrementMonth(currYear, currMonth);
        currYear = nextMonth.year;
        currMonth = nextMonth.month;
        monthIds.push({ year: currYear, month: currMonth });
    }
    return monthIds;
}
exports.generateMonthIds = generateMonthIds;
// increment the following months. if you've reach 12 (Dec), go to Jan next year
function incrementMonth(year, month) {
    let nextMonth = month;
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
    };
}
exports.incrementMonth = incrementMonth;
//# sourceMappingURL=helpers.js.map