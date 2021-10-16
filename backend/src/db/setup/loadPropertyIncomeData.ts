import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import * as db from '..';
import { PropertyPeriodDBO } from '../models/PropertyPeriod';
import { QueryResult } from 'pg';

const FILE_PATH = path.resolve(__dirname, 'property_data.csv');

interface PropertyPeriodCsvRow {
  '': string;
  year: string;
  month: string;
  nightly_price: string;
  occupancy_rate: string;
}

/*
  parsing & inserting rows one at a time
  since a real world csv might contain too much data for the memory to hold
*/

export function loadPropertyIncomeData(): Promise<void> {
  return new Promise((resolve, reject) => {
    const queryPrms: Promise<QueryResult<any>>[] = [];

    fs.createReadStream(FILE_PATH)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
          console.error(error)
          reject(error);
        })

        .on('data', (csvRow: PropertyPeriodCsvRow) => {
          const dbRow: PropertyPeriodDBO = {
            id: null,
            property_id: +csvRow[''],
            year: +csvRow.year,
            month: +csvRow.month,
            nightly_price: +csvRow.nightly_price,
            occupancy_rate: +csvRow.occupancy_rate,
          }
  
          console.log(dbRow);
  
          const query =
            `INSERT INTO property_period (property_id, year, month, nightly_price, occupancy_rate)
            VALUES (${dbRow.property_id}, ${dbRow.year}, ${dbRow.month}, ${dbRow.nightly_price}, ${dbRow.occupancy_rate})`;
    
          const prm: Promise<QueryResult<any>> = db.client.query(query);
          queryPrms.push(prm);
        })

        .on('end', (rowCount: number) => {
          console.log(`Parsed ${rowCount} rows`);

          // wait for all queries to be completed
          Promise.all(queryPrms).then(() => {
            resolve();
          })
        });
  })
}