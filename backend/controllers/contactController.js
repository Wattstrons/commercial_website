const nodemailer = require('nodemailer');
const { companyNotificationTemplate, customerAutoReplyTemplate } = require('../utils/emailTemplates');

const handleContactForm = async (req, res) => {
  try {
    // Default to empty object if undefined to prevent destructuring crash
    const { name, email, message } = req.body || {};

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (name, email, message).' });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    // Configure Nodemailer transporter using GoDaddy Microsoft 365 credentials
  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

    // 1. Send email to company
    const mailOptionsCompany = {
      from: `"Wattstrons Support" <${process.env.EMAIL}>`,
      to: process.env.EMAIL, // Sending to yourself
      subject: 'New Contact Form Submission',
      html: companyNotificationTemplate(name, email, message),
      replyTo: email
    };

    // 2. Send auto-reply to customer
    const mailOptionsCustomer = {
      from: `"Wattstrons Support" <${process.env.EMAIL}>`,
      to: email, // Sending to the customer
      subject: 'Thank You for Contacting Wattstrons',
      html: customerAutoReplyTemplate(name),
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(mailOptionsCompany),
      transporter.sendMail(mailOptionsCustomer)
    ]);

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
};

module.exports = {
  handleContactForm
};
