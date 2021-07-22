const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// When using Gmail, enable these options:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

module.exports = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (user) => {
    // Get user data
    const { email } = user;

    const mailOptions = {
      from: `Split&Share <${gmailEmail}>`,
      to: email,
    };

    mailOptions.subject = `Welcome to Split&Share!`;
    mailOptions.html = `
    <h3>We are really happy to have you on board!</h3>
    <p>Hope you will enjoy using our service 🔥.</p>
    `;

    await mailTransport.sendMail(mailOptions);

    functions.logger.log('Sent a welcome email to:', email);
    return null;
  });
