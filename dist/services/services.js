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
exports.findByHealthProviderById = exports.findPatientByEmail = exports.createPatient = void 0;
const patientModel_1 = require("../models/patientModel");
const healthProviderModel_1 = require("../models/healthProviderModel");
const createPatient = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield patientModel_1.patientModel.create(user);
});
exports.createPatient = createPatient;
const findPatientByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield patientModel_1.patientModel.findOne({ email: email });
});
exports.findPatientByEmail = findPatientByEmail;
const findByHealthProviderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield healthProviderModel_1.healthProviderModel.findById(id);
});
exports.findByHealthProviderById = findByHealthProviderById;
