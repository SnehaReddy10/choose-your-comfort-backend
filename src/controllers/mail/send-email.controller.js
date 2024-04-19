const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '',
    pass: '',
  },
});

const SendEmail = async (req, res) => {
  const mailOptions = {
    from: '', // Sender address
    to: req.user.email, // List of recipients
    subject: 'sub', // Subject line
    text: 'text', // Plain text body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
};

module.exports = SendEmail;
