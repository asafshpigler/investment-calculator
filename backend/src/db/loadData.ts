import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { client, connect } from './connection';
import { PropertyPeriodDTO } from '../models/PropertyPeriods.table';

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

(async () => {
  await connect();

  fs.createReadStream(FILE_PATH)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', (csvRow: PropertyPeriodCsvRow) => {
        const dbRow: PropertyPeriodDTO = {
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
  
        client.query(query);
      })
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
})();