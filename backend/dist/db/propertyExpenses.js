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
exports.upsertPropertyExpenses = exports.getPropertyExpenses = exports.getPropertiesExpenses = void 0;
const db = __importStar(require("."));
const PROPERTY_EXPENSES_TABLE = 'public.property_expenses';
async function getPropertiesExpenses(userId) {
    console.log('getPropertiesExpenses');
    return await db.client
        .query(`SELECT * FROM ${PROPERTY_EXPENSES_TABLE}
      WHERE user_id = $1`, [userId])
        .then(res => res.rows);
}
exports.getPropertiesExpenses = getPropertiesExpenses;
async function getPropertyExpenses(userId, propertyId) {
    console.log('getPropertiesExpenses');
    return await db.client
        .query(`SELECT * FROM ${PROPERTY_EXPENSES_TABLE}
      WHERE user_id = $1 AND property_id = $2`, [userId, propertyId])
        .then(res => res.rows[0]);
}
exports.getPropertyExpenses = getPropertyExpenses;
async function upsertPropertyExpenses(propertyExpenses) {
    console.log('upsertPropertyExpenses');
    const rowsAffected = await updatePropertyExpenses(propertyExpenses);
    if (rowsAffected === 0) {
        console.log('no rows updated. row does not exist. insert it instead');
        await insertPropertyExpenses(propertyExpenses);
    }
}
exports.upsertPropertyExpenses = upsertPropertyExpenses;
async function updatePropertyExpenses(propertyExpenses) {
    console.log('updatePropertyExpenses');
    const { userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpenses } = propertyExpenses;
    return await db.client
        .query(`UPDATE ${PROPERTY_EXPENSES_TABLE}
      SET one_time_expenses = $3, monthly_expenses = $4, mortgage_expense = $5
      WHERE user_id = $1 AND property_id = $2`, [userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpenses])
        .then(res => res.rowCount);
}
async function insertPropertyExpenses(propertyExpenses) {
    console.log('insertPropertyExpenses');
    const { userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpenses } = propertyExpenses;
    await db.client
        .query(`INSERT INTO ${PROPERTY_EXPENSES_TABLE}
      (user_id, property_id, one_time_expenses, monthly_expenses, mortgage_expense)
      VALUES ($1, $2, $3, $4, $5)`, [userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpenses])
        .then(res => {
        if (res.rowCount !== 1) {
            throw new Error('failed insertion');
        }
    });
}
//# sourceMappingURL=propertyExpenses.js.map