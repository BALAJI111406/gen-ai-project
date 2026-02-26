const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Student = require('../models/Student');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const students = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        students.push({
          registerNumber: row.registerNumber || row.RegisterNumber,
          name: row.name || row.Name,
          department: row.department || row.Department,
          subject: row.subject || row.Subject
        });
      })
      .on('end', async () => {
        await Student.deleteMany({});
        await Student.insertMany(students);
        fs.unlinkSync(req.file.path);
        res.json({ message: 'Students uploaded successfully', count: students.length });
      });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;
