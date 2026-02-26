const express = require('express');
const axios = require('axios');
const Student = require('../models/Student');
const ExamHall = require('../models/ExamHall');
const SeatingPlan = require('../models/SeatingPlan');
const authMiddleware = require('../middleware/auth');
const { generatePDF } = require('../utils/pdfGenerator');
const router = express.Router();

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { examDate, subject } = req.body;
    const subj = (subject || '').trim();
    // case-insensitive exact match for subject (accepts 'maths' or 'Mathematics')
    const students = await Student.find({ subject: { $regex: `^${subj}$`, $options: 'i' } });
    const halls = await ExamHall.find({ isActive: true });

    if (students.length === 0) return res.status(400).json({ message: 'No students found' });
    if (halls.length === 0) return res.status(400).json({ message: 'No halls available' });

    const response = await axios.post(`${process.env.AI_ENGINE_URL}/allocate`, {
      students: students.map(s => ({
        id: s._id.toString(),
        registerNumber: s.registerNumber,
        name: s.name,
        department: s.department
      })),
      halls: halls.map(h => ({
        id: h._id.toString(),
        hallName: h.hallName,
        rows: h.rows,
        columns: h.columns,
        capacity: h.capacity
      }))
    });

    const seatingPlan = new SeatingPlan({
      examDate,
      subject,
      seatingArrangement: response.data.allocation,
      totalStudents: students.length
    });
    await seatingPlan.save();

    res.json({ message: 'Seating plan generated', plan: seatingPlan });
  } catch (error) {
    res.status(500).json({ message: 'Generation failed', error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const plans = await SeatingPlan.find().sort({ generatedAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plans', error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const plan = await SeatingPlan.findById(req.params.id);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plan', error: error.message });
  }
});

router.get('/:id/pdf', authMiddleware, async (req, res) => {
  try {
    const plan = await SeatingPlan.findById(req.params.id);
    const pdfBuffer = await generatePDF(plan);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=seating-plan-${plan._id}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'PDF generation failed', error: error.message });
  }
});

router.put('/:id/override', authMiddleware, async (req, res) => {
  try {
    const { seatingArrangement } = req.body;
    const plan = await SeatingPlan.findByIdAndUpdate(
      req.params.id,
      { seatingArrangement },
      { new: true }
    );
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Override failed', error: error.message });
  }
});

router.get('/stats/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalHalls = await ExamHall.countDocuments();
    const totalPlans = await SeatingPlan.countDocuments();
    res.json({ totalStudents, totalHalls, totalPlans });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

module.exports = router;
