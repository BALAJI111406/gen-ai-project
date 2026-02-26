const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
