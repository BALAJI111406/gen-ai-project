const mongoose = require('mongoose');

const examHallSchema = new mongoose.Schema({
  hallName: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamHall', examHallSchema);
