const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    medicalRecords: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);