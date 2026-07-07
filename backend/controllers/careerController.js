const nodemailer = require('nodemailer');
const { companyCareerTemplate, customerCareerAutoReplyTemplate } = require('../utils/emailTemplates');

const handleCareerApplication = async (req, res) => {
  try {
    const { jobTitle, fullName, email, phone, experience } = req.body || {};
    const resumeFile = req.file;

    // Basic Validation
    if (!jobTitle || !fullName || !email || !phone || !resumeFile) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields and upload your resume.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    // 1. Send Application to specific department
    const mailOptionsCompany = {
      from: `"Wattstrons Careers" <${process.env.EMAIL}>`,
      to: targetEmail,
      subject: `New Job Application: ${jobTitle} - ${fullName}`,
      html: companyCareerTemplate(jobTitle, fullName, email, phone, experience),
      replyTo: email,
      attachments: [
        {
          filename: resumeFile.originalname,
          content: resumeFile.buffer
        }
      ]
    };

    // 2. Send Auto-reply to candidate
    const mailOptionsCandidate = {
      from: `"Wattstrons Careers" <${process.env.EMAIL}>`,
      to: email,
      subject: `Application Received: ${jobTitle} at Wattstrons`,
      html: customerCareerAutoReplyTemplate(fullName, jobTitle),
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(mailOptionsCompany),
      transporter.sendMail(mailOptionsCandidate)
    ]);

    return res.status(200).json({ success: true, message: 'Application submitted successfully.' });

  } catch (error) {
    console.error('Error sending application email:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit application. Please try again later.' });
  }
};

module.exports = {
  handleCareerApplication
};
