const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    problem: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
