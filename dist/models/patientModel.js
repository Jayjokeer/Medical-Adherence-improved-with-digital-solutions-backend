"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientModel = void 0;
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
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
    age: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    medications: [{
            drug: {
                type: String,
            },
            dosage: {
                type: String,
            },
        }],
    healthProvider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'HealthProvider',
    },
    reminderPreferences: {
        enableReminders: {
            type: Boolean
        },
        reminderTime: {
            type: Date
        },
    },
});
exports.patientModel = (0, mongoose_1.model)('Patient', patientSchema);
