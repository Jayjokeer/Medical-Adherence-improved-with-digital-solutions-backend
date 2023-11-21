"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthProviderModel = void 0;
const mongoose_1 = require("mongoose");
const healthProviderSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    patients: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Patient'
        }],
});
exports.healthProviderModel = (0, mongoose_1.model)('HealthProvider', healthProviderSchema);
