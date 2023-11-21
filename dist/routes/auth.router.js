"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.Router)();
authRouter.post("/create-user", authController_1.createPatientController);
authRouter.post("/login-user", authController_1.loginPatientController);
exports.default = authRouter;
