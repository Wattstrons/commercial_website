const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { handleContactForm } = require('../controllers/contactController');

// Rate limiting to prevent spam (max 5 requests per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, handleContactForm);

module.exports = router;
