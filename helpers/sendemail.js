const nodemailer = require('nodemailer');
require("dotenv").config();

const { KEY_NODEMAILER } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
       user: 'mashamak175@meta.ua',
      pass: KEY_NODEMAILER 
  }
}

let transporter = nodemailer.createTransport(nodemailerConfig);


let mailOptions = {
    from: 'mashamak175@meta.ua',
    to: 'piloge7795@gam1fy.com',
    subject: 'Test Email',
    html: '<p>Hello World!</p>'
};

transporter.sendMail(mailOptions)
.then(() => console.log("Email sent success"))
.catch(error=>console.log(error.message))
