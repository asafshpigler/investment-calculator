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
exports.handleUpdatePropertyExpenses = void 0;
const db = __importStar(require("../../db"));
const data_transfer_models_1 = require("../../data-transfer-models");
const _1 = require(".");
const DATE_STRING_REGEX = /\d{4}-\d{2}-\d{2}/;
async function handleUpdatePropertyExpenses(req, res, next) {
    console.log('handleUpdatePropertyExpenses');
    try {
        const propertyExpenses = req.body;
        const userId = req.session.user.id;
        propertyExpenses.userId = userId;
        validateUpdatePropertyExpenses(req);
        await db.upsertPropertyExpenses(req.body);
        const chart = await (0, _1.getChart)(req, propertyExpenses.propertyId);
        res.json(chart);
    }
    catch (error) {
        next(error);
    }
}
exports.handleUpdatePropertyExpenses = handleUpdatePropertyExpenses;
function validateUpdatePropertyExpenses(req) {
    const { userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpenses } = req.body;
    if (!userId || !propertyId) {
        throw new Error(`invalid update property expenses input,
      can\'t tell which row to update, userId: ${userId}, propertyId: ${propertyId}`);
    }
    validateOneTimeExpenses(oneTimeExpenses);
    validateMonthlyExpenses(monthlyExpenses);
    validateMortgageExpenses(mortgageExpenses);
    function validateOneTimeExpenses(oneTimeExpenses) {
        const isValid = oneTimeExpenses.every(({ paymentDate, amount }) => (DATE_STRING_REGEX.test(paymentDate) &&
            typeof amount === 'number'));
        if (!isValid) {
            throw new Error(`invalid update property expenses input, invalid one time expenes, json: ${JSON.stringify(oneTimeExpenses)}`);
        }
    }
    function validateMonthlyExpenses(monthlyExpenses) {
        const isValid = monthlyExpenses.every(({ startDate, amount, duration }) => (DATE_STRING_REGEX.test(startDate) &&
            typeof amount === 'number' &&
            typeof duration === 'number'));
        if (!isValid) {
            throw new Error(`invalid update property expenses input, invalid monthly expenes, json: ${JSON.stringify(monthlyExpenses)}`);
        }
    }
    function validateMortgageExpenses(mortgageExpenses) {
        const { type } = mortgageExpenses;
        const { startDate, loanAmount } = mortgageExpenses;
        const isCommonValid = (DATE_STRING_REGEX.test(startDate) &&
            typeof loanAmount === 'number');
        let isCustomValid = null;
        switch (type) {
            case data_transfer_models_1.SPITZER_LOAN:
                const { duration, loanRate } = mortgageExpenses;
                isCustomValid = (typeof duration === 'number' &&
                    typeof loanRate === 'number');
                break;
            case data_transfer_models_1.NORMAL_LOAN:
                const { paymentPeriods } = mortgageExpenses;
                isCustomValid = (paymentPeriods.every(({ duration, amount }) => (typeof duration === 'number' &&
                    typeof amount === 'number')));
                break;
            default:
                throw new Error(`invalid update property expenses input, invalid type: ${type}`);
        }
        const isValid = isCommonValid && isCustomValid;
        if (!isValid) {
            throw new Error(`invalid update property expenses input, json: ${JSON.stringify(mortgageExpenses)}`);
        }
    }
}
//# sourceMappingURL=expenses.js.map