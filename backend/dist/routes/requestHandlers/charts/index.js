"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetCharts = void 0;
const paymentPeriod_1 = require("../../../db/paymentPeriod");
const propertyExpenses_1 = require("../../../db/propertyExpenses");
const transformToChartFormat_1 = require("./transformToChartFormat");
const getPropertyMap_1 = require("./getPropertyMap");
async function handleGetCharts(req, res, next) {
    console.log('handleGetCharts');
    const { id: userId } = req.session.user || {};
    try {
        // query: get property incomes & expenses
        const periods = await (0, paymentPeriod_1.getAllPropertyPeriods)();
        const expenses = await (0, propertyExpenses_1.getPropertyExpenses)(userId);
        // group: incomes & expenses by property id
        const propertyMap = (0, getPropertyMap_1.getPropertyMap)(periods, expenses);
        // transform: property data to chart friendly format
        const charts = [];
        for (const [propertyId, monthlyFigures] of propertyMap) {
            const chart = (0, transformToChartFormat_1.transformToChartFormat)(propertyId, monthlyFigures);
            charts.push(chart);
        }
        res.json(charts);
    }
    catch (error) {
        next(error);
    }
}
exports.handleGetCharts = handleGetCharts;
//# sourceMappingURL=index.js.map