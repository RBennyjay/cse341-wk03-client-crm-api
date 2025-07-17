const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String },
    phone: { type: String },
    notes: { type: String },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
