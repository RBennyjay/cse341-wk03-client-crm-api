const Contact = require('../models/contact');
const { validationResult } = require('express-validator');

// GET all contacts

const getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.company) filter.company = req.query.company;
    if (req.query.tags) filter.tags = { $in: req.query.tags.split(',') };

    const contacts = await Contact.find(filter);
    const clean = contacts.map(doc => {
      const obj = doc.toObject();
      delete obj.id;
      return obj;
    });
    res.status(200).json(clean);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    const result = contact.toObject();
    delete result.id;
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const contact = new Contact(req.body);
    const result = (await contact.save()).toObject();
    delete result.id;
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    const result = updated.toObject();
    delete result.id;
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
