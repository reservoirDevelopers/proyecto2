const nodemailer = require("nodemailer");

let transporter= nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
})

module.exports = transporter;