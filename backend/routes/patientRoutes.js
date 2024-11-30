const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');

// Create Patient
router.post('/', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Patient by Email
router.get('/:email', async (req, res) => {
    try {
        const patient = await Patient.findOne({ email: req.params.email });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Patient by Email
router.put('/:email', async (req, res) => {
    try {
        const updatedPatient = await Patient.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );
        if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient updated successfully', patient: updatedPatient });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Patient by Email
router.delete('/:email', async (req, res) => {
    try {
        const deletedPatient = await Patient.findOneAndDelete({ email: req.params.email });
        if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;