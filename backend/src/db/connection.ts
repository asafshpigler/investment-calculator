import { Client } from 'pg';

// move to env file
export const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'invest-calc',
  password: '987321456',
  port: 5432,
})

export async function connect() {
  await client.connect();
}