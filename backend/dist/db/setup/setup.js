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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
const db = __importStar(require(".."));
const loadPropertyIncomeData_1 = require("./loadPropertyIncomeData");
// loading env variable since it's a standalone script
const recreateDbsSQL = fs_1.default.readFileSync(`${__dirname}/recreateDbs.sql`).toString();
const insertDataSQL = fs_1.default.readFileSync(`${__dirname}/insertData.sql`).toString();
try {
    (async () => {
        await db.connect();
        await db.client.query(recreateDbsSQL);
        await db.client.query(insertDataSQL);
        // insert data from csv into payment periods
        await (0, loadPropertyIncomeData_1.loadPropertyIncomeData)();
        db.disconnect();
    })();
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=setup.js.map