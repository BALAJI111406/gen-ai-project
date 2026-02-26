require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const hallRoutes = require('./routes/halls');
const seatingRoutes = require('./routes/seating');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/seating', seatingRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'AI Exam Seating API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
