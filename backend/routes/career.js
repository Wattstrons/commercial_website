const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { handleCareerApplication } = require('../controllers/careerController');

const careerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many applications from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const multer = require('multer');

// Configure multer for memory storage (max 1MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, and .docx formats allowed!'));
    }
  }
});

router.post('/', careerLimiter, upload.single('resume'), handleCareerApplication);

module.exports = router;
