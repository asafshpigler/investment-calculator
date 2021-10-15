"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPropertyPeriods = void 0;
const connection_1 = require("./connection");
const PROPERTY_PERIOD_TABLE = 'public.property_period';
async function getAllPropertyPeriods() {
    console.log('getAllPropertyPeriods');
    return await connection_1.client
        .query(`SELECT * FROM ${PROPERTY_PERIOD_TABLE}`)
        .then(res => res.rows);
}
exports.getAllPropertyPeriods = getAllPropertyPeriods;
//# sourceMappingURL=paymentPeriod.js.map