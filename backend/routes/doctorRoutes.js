const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');

// Create Doctor
router.post('/', async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Doctor by Email
router.get('/:email', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ email: req.params.email });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Doctor by Email
router.put('/:email', async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );
        if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Doctor by Email
router.delete('/:email', async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findOneAndDelete({ email: req.params.email });
        if (!deletedDoctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;