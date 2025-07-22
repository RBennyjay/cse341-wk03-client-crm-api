const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    get: (val) => val.toISOString().slice(0, 19) + 'Z',
    set: (value) => {
      const parsed = new Date(value);
      parsed.setMilliseconds(0); // Remove milliseconds
      return parsed; // Return Date object, not ISO string
    }
  },
  duration: { type: Number, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  notes: String
}, { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } });

module.exports = mongoose.model('Appointment', appointmentSchema);
