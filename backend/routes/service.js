const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { handleServiceInquiry } = require('../controllers/serviceController');

const serviceLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', serviceLimiter, handleServiceInquiry);

module.exports = router;
