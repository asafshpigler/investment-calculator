import { Client } from 'pg';

export const client = new Client({ connectionString: process.env.DB_URI });

export async function connect(): Promise<void> {
  return client.connect();
}
export async function disconnect(): Promise<void> {
  return client.end();
}