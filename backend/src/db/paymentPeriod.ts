import { PropertyPeriodDBO } from '../models/PropertyPeriod';
import { client } from './connection';

const PROPERTY_PERIOD_TABLE = 'public.property_period';

export async function getAllPropertyPeriods(): Promise<PropertyPeriodDBO[]> {
  console.log('getAllPropertyPeriods');

  return await client
    .query(`SELECT * FROM ${PROPERTY_PERIOD_TABLE}`)
    .then(res => res.rows)
}