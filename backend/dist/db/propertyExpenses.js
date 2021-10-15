"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertPropertyExpenses = exports.getPropertyExpenses = void 0;
const connection_1 = require("./connection");
const PROPERTY_EXPENSES_TABLE = 'public.property_expenses';
async function getPropertyExpenses(userId) {
    console.log('getPropertyExpenses');
    return await connection_1.client
        .query(`SELECT * FROM ${PROPERTY_EXPENSES_TABLE}
      WHERE user_id = $1`, [userId])
        .then(res => res.rows);
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
    return await connection_1.client
        .query(`UPDATE ${PROPERTY_EXPENSES_TABLE}
      SET mortgage_expense = $3
      WHERE user_id = $1 AND property_id = $2`, [userId, propertyId, /* oneTimeExpenses, monthlyExpenses, */ mortgageExpenses])
        .then(res => res.rowCount);
}
async function insertPropertyExpenses(propertyExpenses) {
    console.log('insertPropertyExpenses');
    const { userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpenses } = propertyExpenses;
    await connection_1.client
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