"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
const connection_1 = require("../connection");
const loadPropertyIncomeData_1 = require("./loadPropertyIncomeData");
// loading env variable since it's a standalone script
const recreateDbsSQL = fs_1.default.readFileSync(`${__dirname}/recreateDbs.sql`).toString();
const insertDataSQL = fs_1.default.readFileSync(`${__dirname}/insertData.sql`).toString();
try {
    (async () => {
        await (0, connection_1.connect)();
        await connection_1.client.query(recreateDbsSQL);
        await connection_1.client.query(insertDataSQL);
        // insert data from csv into payment periods
        await (0, loadPropertyIncomeData_1.loadPropertyIncomeData)();
        (0, connection_1.disconnect)();
    })();
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=setup.js.map