"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const connection_1 = require("./db/connection");
const attachRoutes_1 = __importDefault(require("./routes/attachRoutes"));
const app = (0, express_1.default)();
const PORT = 3080;
app.use(express_1.default.static('../frontend/build'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: false,
    httpOnly: true,
    secure: true, // TODO: improve description phrasing | cookie will be sent only if site is served over https, to prevent easy access to your cookie (and user session) from man in the middle attacks
}));
(0, attachRoutes_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
    (0, connection_1.connect)();
});
//# sourceMappingURL=server.js.map