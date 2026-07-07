const companyNotificationTemplate = (name, email, message) => {
  const date = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'short'
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="color: #00EDC2; border-bottom: 2px solid #00EDC2; padding-bottom: 10px;">New Contact Form Submission</h2>
      
      <p style="margin-top: 20px;"><strong>Name:</strong><br/> ${name}</p>
      
      <p><strong>Email:</strong><br/> <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a></p>
      
      <p><strong>Message:</strong><br/> ${message.replace(/\n/g, '<br/>')}</p>
      
      <p style="margin-top: 30px; font-size: 0.9em; color: #777;">
        <strong>Submitted:</strong><br/> ${date}
      </p>
    </div>
  `;
};

const customerAutoReplyTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #eaeaea; padding: 30px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #00EDC2; margin: 0;">Wattstrons</h1>
      </div>
      
      <p>Hi ${name},</p>
      
      <p>Thank you for contacting Wattstrons! This is an automated email to confirm that we have received your message.</p>
      
      <p>Our team is currently reviewing your inquiry, and we will get back to you within <strong>24–48 business hours</strong>.</p>
      
      <p>If you have any additional information to share in the meantime, feel free to reply directly to this email.</p>
      
      <p style="margin-top: 40px;">Best regards,<br/><strong>Wattstrons Support Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      <p style="font-size: 0.85em; color: #888; text-align: center;">
        This email was sent from an unmonitored mailbox for confirmation purposes, but you can reply to it to reach our support team.
      </p>
    </div>
  `;
};

const companyCareerTemplate = (jobTitle, fullName, email, phone, experience) => {
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short' });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="color: #00EDC2; border-bottom: 2px solid #00EDC2; padding-bottom: 10px;">New Job Application: ${jobTitle}</h2>
      
      <p style="margin-top: 20px;"><strong>Candidate Name:</strong><br/> ${fullName}</p>
      <p><strong>Email:</strong><br/> <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a></p>
      <p><strong>Phone:</strong><br/> ${phone}</p>
      <p><strong>Experience:</strong><br/> ${experience || 'Not specified'}</p>
      <p style="color: #28a745; font-weight: bold; margin-top: 15px;">📎 Resume is attached to this email.</p>
      
      <p style="margin-top: 30px; font-size: 0.9em; color: #777;">
        <strong>Applied on:</strong><br/> ${date}
      </p>
    </div>
  `;
};

const customerCareerAutoReplyTemplate = (fullName, jobTitle) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #eaeaea; padding: 30px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #00EDC2; margin: 0;">Wattstrons</h1>
      </div>
      
      <p>Hi ${fullName},</p>
      
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Wattstrons!</p>
      
      <p>We have successfully received your application. Our recruitment team is currently reviewing your profile and will contact you if your qualifications match our requirements for this role.</p>
      
      <p>Due to the high volume of applications, we may not be able to provide individual feedback to every candidate. However, we sincerely appreciate your interest in joining our team.</p>
      
      <p style="margin-top: 40px;">Best regards,<br/><strong>Wattstrons Recruitment Team</strong></p>
    </div>
  `;
};

const serviceInquiryTemplate = (serviceName, userName, userEmail, userMessage) => {
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short' });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="color: #00EDC2; border-bottom: 2px solid #00EDC2; padding-bottom: 10px;">New Service Inquiry</h2>
      
      <p style="margin-top: 20px;"><strong>Service:</strong><br/> ${serviceName}</p>
      <p><strong>Name:</strong><br/> ${userName}</p>
      <p><strong>Mail ID:</strong><br/> <a href="mailto:${userEmail}" style="color: #007BFF; text-decoration: none;">${userEmail}</a></p>
      
      <p><strong>Reason:</strong></p>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00EDC2; white-space: pre-wrap;">
        ${userMessage}
      </div>
    </div>
  `;
};

module.exports = {
  companyNotificationTemplate,
  customerAutoReplyTemplate,
  companyCareerTemplate,
  customerCareerAutoReplyTemplate,
  serviceInquiryTemplate
};
