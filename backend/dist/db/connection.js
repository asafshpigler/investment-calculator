"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = exports.client = void 0;
const pg_1 = require("pg");
exports.client = new pg_1.Client({ connectionString: process.env.DB_URI });
async function connect() {
    return exports.client.connect();
}
exports.connect = connect;
async function disconnect() {
    return exports.client.end();
}
exports.disconnect = disconnect;
//# sourceMappingURL=connection.js.map