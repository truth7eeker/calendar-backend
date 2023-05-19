const moment = require('moment');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_KEY,
   },
});

const sendClientEmail = (date, form, slot) => {
   const { day, month, year } = date;
   const { email } = form;
   const dateString = moment([year.toString(), month.toString(), day.toString()]).format(
      'dddd, MMMM DD, YYYY',
   );

   const mailOptions = {
      from: `Lesson confirmed <${process.env.GMAIL_USERNAME}>`,
      to: email,
      subject: 'Welcome',
      html: `Hi! Your lesson is scheduled for ${dateString}, at ${slot.time}.</br> See you there! :)`,
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });
};

const sendSelfEmail = (date, form, slot) => {
   const { day, month, year } = date;
   const { name, email, tg, message } = form;
   const dateString = moment([year.toString(), month.toString(), day.toString()]).format(
      'dddd, MMMM DD, YYYY',
   );

   const mailOptions = {
      from: `Lesson confirmed <${process.env.GMAIL_USERNAME}>`,
      to: process.env.MAILRU_USERNAME,
      subject: 'New lesson',
      html: `Hi! You have a student ${name}, who scheduled a lesson for ${dateString} at ${slot.time}.
      Their email is ${email}, tg: ${tg}.
      Message for you: ${message}`,
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });
};

module.exports = { sendClientEmail, sendSelfEmail };
