const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contact');
const careerRoutes = require('./routes/career');
const serviceRoutes = require('./routes/service');

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/service', serviceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === 'Only .pdf, .doc, and .docx formats allowed!') {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File size cannot exceed 1MB.' });
  }
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
