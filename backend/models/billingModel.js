const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    billingDate: { type: Date, required: true },
});

module.exports = mongoose.model('Billing', billingSchema);
