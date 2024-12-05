const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel'); // Appointment model

// Create Appointment
router.post('/', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Appointment by Email
router.get('/:email', async (req, res) => {
    try {
        const appointment = await Appointment.findOne({ email: req.params.email });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Appointment by Email
router.put('/:email', async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );
        if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Appointment by Email
router.delete('/:email', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findOneAndDelete({ email: req.params.email });
        if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
