const mongoose = require('mongoose');

const seatingPlanSchema = new mongoose.Schema({
  examDate: { type: Date, required: true },
  subject: { type: String, required: true },
  seatingArrangement: [{
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamHall' },
    hallName: String,
    seats: [{
      row: Number,
      column: Number,
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      registerNumber: String,
      name: String,
      department: String
    }]
  }],
  totalStudents: { type: Number, required: true },
  generatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'finalized'], default: 'draft' }
});

module.exports = mongoose.model('SeatingPlan', seatingPlanSchema);
