"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHandlers_1 = require("./requestHandlers");
function attachRoutes(app) {
    app.post('/signup', requestHandlers_1.handleSignupRequest);
    app.post('/login', requestHandlers_1.handleLoginRequest);
    app.post('/logout', requestHandlers_1.handleLogoutRequest);
    app.get('/charts', requestHandlers_1.handleGetCharts);
    app.post('/property-expenses', requestHandlers_1.handleUpdatePropertyExpenses);
}
exports.default = attachRoutes;
//# sourceMappingURL=attachRoutes.js.map