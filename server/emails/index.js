const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Thanks for signing up.',
    text: `Hi ${name}! Welcome to your task manager api.`
    // html: exampleHTMLEmail
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Sorry to see you go.',
    text: `Bye ${name}. If you change your mind let us know.`
  });
};

const forgotPasswordEmail = (email, token, password) => {
  const exampleHTMLEmail = `
  <a target="_blank" rel="noopener noreferrer" href="${process.env.APP_URL}/users/password/reset?email=${email}&token=${token}&password=${password}">Reset Password</a>
  `;

  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Password Reset.',
    // text: `Hi ${name}! Please click the link below to reset your password.`
    html: exampleHTMLEmail
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
  forgotPasswordEmail
};
