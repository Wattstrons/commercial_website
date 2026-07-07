const nodemailer = require('nodemailer');
const { serviceInquiryTemplate } = require('../utils/emailTemplates');

const handleServiceInquiry = async (req, res) => {
  try {
    const { userName, userEmail, userMessage, serviceName } = req.body || {};

    if (!userName || !userEmail || !userMessage) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const targetEmail = process.env.EMAIL;

    // Configure Nodemailer transporter using GoDaddy configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const safeServiceName = serviceName || 'General Service';

    // Send Inquiry to specific department (No Auto-Reply)
    const mailOptionsCompany = {
      from: `"Wattstrons Services" <${process.env.EMAIL}>`,
      to: targetEmail,
      subject: `${safeServiceName} Inquiry - ${userName}`,
      html: serviceInquiryTemplate(safeServiceName, userName, userEmail, userMessage),
      replyTo: userEmail
    };

    await transporter.sendMail(mailOptionsCompany);

    return res.status(200).json({ success: true, message: 'Inquiry submitted successfully.' });

  } catch (error) {
    console.error('Error sending service inquiry email:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again later.' });
  }
};

module.exports = {
  handleServiceInquiry
};
