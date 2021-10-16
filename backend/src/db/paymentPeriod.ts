import { PropertyPeriodDBO } from './models/PropertyPeriod';
import * as db from './connection';

const PROPERTY_PERIOD_TABLE = 'public.property_period';

export async function getAllPropertyPeriods(): Promise<PropertyPeriodDBO[]> {
  console.log('getAllPropertyPeriods');

  return await db.client
    .query(`SELECT * FROM ${PROPERTY_PERIOD_TABLE}`)
    .then(res => res.rows)
}