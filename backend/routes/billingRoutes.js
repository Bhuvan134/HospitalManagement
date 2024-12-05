const express = require('express');
const router = express.Router();
const Billing = require('../models/billingModel');

// Create a bill
router.post('/', async (req, res) => {
    try {
        const newBill = new Billing(req.body);
        await newBill.save();
        res.status(201).json({ message: 'Bill created successfully', bill: newBill });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get bill by email
router.get('/:email', async (req, res) => {
    try {
        const bill = await Billing.findOne({ patientEmail: req.params.email });
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.json(bill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update bill by email
router.put('/:email', async (req, res) => {
    try {
        const updatedBill = await Billing.findOneAndUpdate(
            { patientEmail: req.params.email },
            req.body,
            { new: true }
        );
        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
        res.json({ message: 'Bill updated successfully', bill: updatedBill });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete bill by email
router.delete('/:email', async (req, res) => {
    try {
        const deletedBill = await Billing.findOneAndDelete({ patientEmail: req.params.email });
        if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });
        res.json({ message: 'Bill deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
