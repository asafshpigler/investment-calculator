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
exports.handleLogoutRequest = exports.handleLoginRequest = exports.handleSignupRequest = void 0;
const db = __importStar(require("../../db"));
async function handleSignupRequest(req, res, next) {
    console.log('handleSignupRequest');
    try {
        validateSignupInput(req);
        const user = await signUp(req.body.userName);
        req.session.user = user;
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}
exports.handleSignupRequest = handleSignupRequest;
function validateSignupInput(req) {
    if (!req.body.userName) {
        throw new Error('invalid signup input');
    }
}
// TODO: this should respond in user, and charts, and avg numbers, and expenses
// TODO NOW: for now, just respond with the user itself, (which is saved on session, not just user id)
//    in case it already exists, before querying to SQL
async function handleLoginRequest(req, res, next) {
    console.log('handleLoginRequest');
    try {
        if (!req.body.userName && !req.session.user) {
            console.log('no existing session to resume');
            res.end();
            return;
        }
        const { userName } = req.body;
        const { user: sessionUser } = req.session;
        let user = null;
        // user login
        if (userName) {
            const userFromDB = await login(userName);
            user = userFromDB;
            req.session.user = userFromDB;
        }
        // application login, resume usage of website
        else {
            user = sessionUser;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}
exports.handleLoginRequest = handleLoginRequest;
function handleLogoutRequest(req, res, next) {
    console.log('handleLogoutRequest');
    req.session.destroy(function () {
        res.end();
    });
}
exports.handleLogoutRequest = handleLogoutRequest;
// REMOVE ON POLISH: actual logic
async function signUp(userName) {
    const isUserExists = !!await db.getUser(userName);
    if (isUserExists) {
        throw new Error('User already exists');
    }
    const newUser = await db.insertUser(userName);
    return newUser;
}
async function login(userName) {
    const user = await db.getUser(userName);
    if (!user) {
        throw new Error('User doesn\'t exist');
    }
    return user;
}
//# sourceMappingURL=user.js.map