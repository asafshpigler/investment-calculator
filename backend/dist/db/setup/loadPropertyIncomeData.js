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
exports.loadPropertyIncomeData = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv = __importStar(require("fast-csv"));
const connection_1 = require("../connection");
const FILE_PATH = path.resolve(__dirname, 'property_data.csv');
/*
  parsing & inserting rows one at a time
  since a real world csv might contain too much data for the memory to hold
*/
function loadPropertyIncomeData() {
    return new Promise((resolve, reject) => {
        const queryPrms = [];
        fs.createReadStream(FILE_PATH)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
            console.error(error);
            reject(error);
        })
            .on('data', (csvRow) => {
            const dbRow = {
                id: null,
                property_id: +csvRow[''],
                year: +csvRow.year,
                month: +csvRow.month,
                nightly_price: +csvRow.nightly_price,
                occupancy_rate: +csvRow.occupancy_rate,
            };
            console.log(dbRow);
            const query = `INSERT INTO property_period (property_id, year, month, nightly_price, occupancy_rate)
            VALUES (${dbRow.property_id}, ${dbRow.year}, ${dbRow.month}, ${dbRow.nightly_price}, ${dbRow.occupancy_rate})`;
            const prm = connection_1.client.query(query);
            queryPrms.push(prm);
        })
            .on('end', (rowCount) => {
            console.log(`Parsed ${rowCount} rows`);
            // wait for all queries to be completed
            Promise.all(queryPrms).then(() => {
                resolve();
            });
        });
    });
}
exports.loadPropertyIncomeData = loadPropertyIncomeData;
//# sourceMappingURL=loadPropertyIncomeData.js.map