"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPatientController = exports.createPatientController = void 0;
const encryption_1 = require("../utils/helpers/encryption");
const services_1 = require("../services/services");
const jwt_1 = require("../middlewares/jwt");
const services_2 = require("../services/services");
const createPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, email, age } = req.body;
    const { healthProviderId } = req.params;
    try {
        const healthProvider = yield (0, services_2.findByHealthProviderById)(healthProviderId);
        if (!healthProvider) {
            res.status(404).json({ Error: 'Healthcare provider not found' });
            return;
        }
        const findEmail = yield (0, services_1.findPatientByEmail)(email);
        if (findEmail) {
            return res.status(404).json({
                Error: "User already exists",
            });
        }
        ;
        const hashedPwd = yield (0, encryption_1.encryptPassword)(password);
        const patient = {
            firstName,
            lastName,
            password: hashedPwd,
            email,
            age,
            healthProvider: healthProviderId
        };
        const createdPatient = yield (0, services_1.createPatient)(patient);
        return res.status(201).json({
            message: "Patient created successfully",
            createdPatient
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ Error: "Internal Server error" });
    }
    ;
});
exports.createPatientController = createPatientController;
const loginPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const findEmail = yield (0, services_1.findPatientByEmail)(email);
        if (!findEmail) {
            return res.status(403).json({
                Error: "Email or password is incorrect"
            });
        }
        ;
        const isVerifiedPassword = yield (0, encryption_1.verifyPassword)(password, findEmail.password);
        if (!isVerifiedPassword) {
            return res.status(403).json({
                Error: "Email or password is incorrect"
            });
        }
        ;
        const payload = {
            firstName: findEmail.firstName,
            lastName: findEmail.lastName,
            email: findEmail.email
        };
        const token = yield (0, jwt_1.signedUser)(payload);
        return res.status(200).json({
            message: "Patient logged in successfully",
            token
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ Error: "Internal Server error" });
    }
    ;
});
exports.loginPatientController = loginPatientController;
