const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailTo = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
      from: 'amirsouaf1212@gmail.com', // Set your email address
      to,
      subject,
      html : text,
    });

    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email' };
  }
};

module.exports = {
  sendEmailTo,
};
