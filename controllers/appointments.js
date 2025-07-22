const Appointment = require('../models/appointment');

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    let { clientName, clientEmail, date, duration, location, status, notes } = req.body;

    if (!clientName || !clientEmail || !date || !duration || !location) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Format date to ISO string without milliseconds
      date = new Date(date).toISOString().slice(0, 19) + 'Z';
    

    const newAppointment = new Appointment({
      clientName,
      clientEmail,
      date,
      duration,
      location,
      status,
      notes
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If date is being updated, reformat it
    if (updateData.date) {
      updateData.date = new Date(updateData.date).toISOString().slice(0, 19) + 'Z';
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: 'Appointment not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
