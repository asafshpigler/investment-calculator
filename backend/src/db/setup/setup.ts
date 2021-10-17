import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import * as db from "..";
import { loadPropertyIncomeData } from "./loadPropertyIncomeData";

const recreateTablesSQL = fs.readFileSync(`${__dirname}/recreateTables.sql`).toString();
const insertDataSQL = fs.readFileSync(`${__dirname}/insertData.sql`).toString();

try {
  (async () => {
    await db.connect();
  
    await db.client.query(recreateTablesSQL);
    await db.client.query(insertDataSQL);

    // insert data from csv into payment periods
    await loadPropertyIncomeData();
  
    db.disconnect();
  })();
} catch (err) {
  console.error(err);
}
