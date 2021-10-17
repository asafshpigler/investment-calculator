"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUser = void 0;
const db = __importStar(require("."));
const USER_TABLE = 'public.user';
async function getUser(userName) {
    await db.connect();
    return await db.client
        .query(`SELECT * FROM ${USER_TABLE}
      WHERE name = '${userName}'`)
        .then(res => res.rows[0]);
}
exports.getUser = getUser;
async function insertUser(userName) {
    return await db.client
        .query(`INSERT INTO ${USER_TABLE}(name)
      VALUES('${userName}')
      RETURNING *`)
        .then(res => res.rows[0]);
}
exports.insertUser = insertUser;
//# sourceMappingURL=user.js.map