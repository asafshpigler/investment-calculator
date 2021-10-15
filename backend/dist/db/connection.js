"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.client = void 0;
const pg_1 = require("pg");
// move to env file
exports.client = new pg_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'invest-calc',
    password: '987321456',
    port: 5432,
});
async function connect() {
    await exports.client.connect();
}
exports.connect = connect;
//# sourceMappingURL=connection.js.map