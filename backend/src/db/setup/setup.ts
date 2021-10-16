import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import { client, connect, disconnect } from "../connection";
import { loadPropertyIncomeData } from "./loadPropertyIncomeData";

// loading env variable since it's a standalone script

const recreateDbsSQL = fs.readFileSync(`${__dirname}/recreateDbs.sql`).toString();
const insertDataSQL = fs.readFileSync(`${__dirname}/insertData.sql`).toString();

try {
  (async () => {
    await connect();
  
    await client.query(recreateDbsSQL);
    await client.query(insertDataSQL);

    // insert data from csv into payment periods
    await loadPropertyIncomeData();
  
    disconnect();
  })();
} catch (err) {
  console.error(err);
}
