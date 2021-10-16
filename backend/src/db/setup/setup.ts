import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import * as db from "..";
import { loadPropertyIncomeData } from "./loadPropertyIncomeData";

// loading env variable since it's a standalone script

const recreateDbsSQL = fs.readFileSync(`${__dirname}/recreateDbs.sql`).toString();
const insertDataSQL = fs.readFileSync(`${__dirname}/insertData.sql`).toString();

try {
  (async () => {
    await db.connect();
  
    await db.client.query(recreateDbsSQL);
    await db.client.query(insertDataSQL);

    // insert data from csv into payment periods
    await loadPropertyIncomeData();
  
    db.disconnect();
  })();
} catch (err) {
  console.error(err);
}
