const express = require('express');
const ExamHall = require('../models/ExamHall');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { hallName, capacity, rows, columns } = req.body;
    const hall = new ExamHall({ hallName, capacity, rows, columns });
    await hall.save();
    res.status(201).json(hall);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create hall', error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const halls = await ExamHall.find();
    res.json(halls);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch halls', error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const hall = await ExamHall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hall);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update hall', error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await ExamHall.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;
