"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogoutRequest = exports.handleLoginRequest = exports.handleSignupRequest = void 0;
const user_1 = require("../../db/user");
async function handleSignupRequest(req, res, next) {
    const { userName } = req.body;
    try {
        const user = await signUp(userName);
        req.session.user = user;
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}
exports.handleSignupRequest = handleSignupRequest;
// TODO: this should respond in user, and charts, and avg numbers, and expenses
// TODO NOW: for now, just respond with the user itself, (which is saved on session, not just user id)
//    in case it already exists, before querying to SQL
async function handleLoginRequest(req, res, next) {
    const { userName } = req.body;
    const { user: sessionUser } = req.session;
    // this handler is used for the cases right now, might be split later. handle and throw errors to make sense in your mind. might be removed later
    // INPUT VALIDATION
    if (userName && sessionUser) {
        console.warn('redundant user information, we already have a session');
        res.end();
        return;
    }
    if (!userName && !sessionUser) {
        console.warn('initial login attempt, using site cookie. though there is no session user, so it failed');
        res.end();
        return;
        // throw new Error('have not sent user name. it is crucial to enable authentication, that has not happened yet based on lack of req.session.user inii')
    }
    try {
        console.log('attempting login', { userName, session: req.session });
        let user = null;
        // when user name is sent, and we don't have a session user yet, we'll attempt login
        if (userName) {
            console.log('userName was sent');
            const userFromDB = await login(userName);
            console.log('after login');
            // after successful login, save user info in the session, it'll be used for other queries to DB
            user = userFromDB;
            req.session.user = userFromDB;
        }
        // otherwise, session user should exist, simply return it
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
    req.session.destroy(function (err) {
        res.end();
    });
}
exports.handleLogoutRequest = handleLogoutRequest;
// REMOVE ON POLISH: actual logic
async function signUp(userName) {
    const isUserExists = !!await (0, user_1.getUser)(userName);
    if (isUserExists) {
        throw new Error('User already exists');
    }
    const newUser = await (0, user_1.insertUser)(userName);
    return newUser;
}
async function login(userName) {
    const user = await (0, user_1.getUser)(userName);
    if (!user) {
        throw new Error('User doesn\'t exist');
    }
    return user;
}
//# sourceMappingURL=user.js.map