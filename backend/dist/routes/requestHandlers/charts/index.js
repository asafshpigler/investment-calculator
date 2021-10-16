"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChart = exports.getCharts = exports.handleGetCharts = void 0;
const db = __importStar(require("../../../db"));
const transformToChartFormat_1 = require("./transformToChartFormat");
const getPropertyMap_1 = require("./getPropertyMap");
async function handleGetCharts(req, res, next) {
    console.log('handleGetCharts');
    try {
        validateGetChartsInput(req);
        const charts = await getCharts(req);
        res.json(charts);
    }
    catch (error) {
        next(error);
    }
}
exports.handleGetCharts = handleGetCharts;
function validateGetChartsInput(req) {
    if (!req.session.user) {
        throw new Error('invalid get charts input');
    }
}
async function getCharts(req) {
    // query: get properties income
    const periods = await getAllPropertyPeriods(req);
    // query: get properties expenses
    const userId = req.session.user.id;
    const expenses = await db.getPropertiesExpenses(userId);
    // group: incomes & expenses by property id
    const propertyMap = (0, getPropertyMap_1.getPropertyMap)(periods, expenses);
    // transform: property data to chart friendly format
    const charts = [];
    for (const [propertyId, monthlyFigures] of propertyMap) {
        const chart = (0, transformToChartFormat_1.transformToChartFormat)(propertyId, monthlyFigures);
        charts.push(chart);
    }
    return charts;
}
exports.getCharts = getCharts;
async function getChart(req, propertyId) {
    // query: get property income
    const periods = getSinglePropertyPeriods(req, propertyId);
    // query: get a single property expenses
    const userId = req.session.user.id;
    const expenses = await db.getPropertyExpenses(userId, propertyId);
    // group: incomes & expenses by property id
    // TODO: consider solving ugly reuse of getPropertyMap
    const propertyMap = (0, getPropertyMap_1.getPropertyMap)(periods, [expenses]);
    // transform: property data to chart friendly format
    const chart = (0, transformToChartFormat_1.transformToChartFormat)(propertyId, propertyMap.get(propertyId));
    return chart;
}
exports.getChart = getChart;
async function getAllPropertyPeriods(req) {
    // retrieve from session
    if (req.session.propertyPeriods) {
        return req.session.propertyPeriods;
    }
    // cache for additional requests
    else {
        const propertyPeriods = await db.getAllPropertyPeriods();
        req.session.propertyPeriods = propertyPeriods;
        return propertyPeriods;
    }
}
function getSinglePropertyPeriods(req, propertyId) {
    const propertyPeriods = req.session.propertyPeriods;
    return propertyPeriods.filter(p => p.property_id === propertyId);
}
//# sourceMappingURL=index.js.map