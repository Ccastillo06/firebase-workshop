const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

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
    const mailOptions = {
      from: `Split&Share <${gmailEmail}>`,
      to: user.email,
      subject: 'Welcome to Split&Share!',
      html: `
      <h3>We are really happy to have you on board!</h3>
      <p>Hope you will enjoy using our service 🔥.</p>`,
    };

    await mailTransport.sendMail(mailOptions);

    return null;
  });

  