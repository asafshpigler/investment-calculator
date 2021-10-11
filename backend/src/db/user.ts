import { UserDBO } from './models/User';
import { client } from './connection';

const USER_TABLE = 'public.user';

export async function getUser(userName: string): Promise<UserDBO> {
  return await client
    .query(
      `SELECT * FROM ${USER_TABLE}
      WHERE name = '${userName}'`
    )
    .then(res => res.rows[0])
}

export async function insertUser(userName: string): Promise<UserDBO> {
  return await client
    .query(
      `INSERT INTO ${USER_TABLE}(name)
      VALUES('${userName}')
      RETURNING *`
    )
    .then(res => res.rows[0]);
}