"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUser = void 0;
const connection_1 = require("./connection");
const USER_TABLE = 'public.user';
async function getUser(userName) {
    return await connection_1.client
        .query(`SELECT * FROM ${USER_TABLE}
      WHERE name = '${userName}'`)
        .then(res => res.rows[0]);
}
exports.getUser = getUser;
async function insertUser(userName) {
    return await connection_1.client
        .query(`INSERT INTO ${USER_TABLE}(name)
      VALUES('${userName}')
      RETURNING *`)
        .then(res => res.rows[0]);
}
exports.insertUser = insertUser;
//# sourceMappingURL=user.js.map