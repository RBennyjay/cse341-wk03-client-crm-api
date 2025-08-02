const Appointment = require('../models/appointment');

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    const clean = appointments.map(doc => {
      const obj = doc.toObject();
      delete obj.id;
      return obj;
    });
    res.status(200).json(clean);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    const result = appointment.toObject();
    delete result.id;
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    // ... same as before
    const saved = await newAppointment.save();
    const result = saved.toObject();
    delete result.id;
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    // ... same as before
    if (!updated) return res.status(404).json({ message: 'Appointment not found' });
    const result = updated.toObject();
    delete result.id;
    res.status(200).json(result);
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
