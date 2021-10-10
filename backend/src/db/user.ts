import { UserDTO } from '../models/User.table';
import { client } from './connection';

const USER_TABLE = 'public.user';

/* 
  add professional SQL escaping
  build queries for all your CRUD on each table

  User table
  C - signup
  R - signup, login
*/

export async function getUser(userName: string): Promise<UserDTO> {
  return await client
    .query(
      `SELECT * FROM ${USER_TABLE}
      WHERE name = '${userName}'`
    )
    .then(res => res.rows[0])
}

export async function insertUser(userName: string): Promise<UserDTO> {
  return await client
    .query(
      `INSERT INTO ${USER_TABLE}(name)
      VALUES('${userName}')
      RETURNING *`
    )
    .then(res => res.rows[0]);
}