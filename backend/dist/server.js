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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const db = __importStar(require("./db"));
const attachRoutes_1 = __importDefault(require("./routes/attachRoutes"));
const app = (0, express_1.default)();
const PORT = 3080;
app.use(express_1.default.static('../frontend/build'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
}));
(0, attachRoutes_1.default)(app);
db.connect().then(() => {
    console.log('connected to db');
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on the port::${PORT}`);
    });
});
//# sourceMappingURL=server.js.map