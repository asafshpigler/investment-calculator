"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdatePropertyExpenses = exports.handleGetPropertyExpenses = void 0;
const propertyExpenses_1 = require("../../db/propertyExpenses");
async function handleGetPropertyExpenses(req, res, next) {
    console.log('handleGetPropertyExpenses');
    // TO REMOVE AFTER: handling user authentication, cookies
    // ITS OK: this request handler will become deprecated later eitherway. we can get expenses and charts
    //    and numbers separately, but since we don't have a caching service (yet!), and it's additional network requests
    //    that redunandt and ineffecit
    // SOON DEPRECATED anyways
    const { id: userId } = req.session.user || {};
    try {
        const propertyExpenses = await (0, propertyExpenses_1.getPropertyExpenses)(userId);
        res.json(propertyExpenses);
    }
    catch (error) {
        next(error);
    }
}
exports.handleGetPropertyExpenses = handleGetPropertyExpenses;
async function handleUpdatePropertyExpenses(req, res, next) {
    console.log('handleUpdatePropertyExpenses');
    const propertyExpenses = req.body;
    // TO REMOVE AFTER: handling user authentication, cookies
    propertyExpenses.userId = req.session.user;
    try {
        await (0, propertyExpenses_1.upsertPropertyExpenses)(propertyExpenses);
        res.end();
    }
    catch (error) {
        next(error);
    }
}
exports.handleUpdatePropertyExpenses = handleUpdatePropertyExpenses;
//# sourceMappingURL=expenses.js.map