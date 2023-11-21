"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./db");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const PORT = process.env.Port;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
//routes
app.use('/api/v1/auth', auth_router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
