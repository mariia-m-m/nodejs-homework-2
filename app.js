const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const nodemailer = require('nodemailer');
require("dotenv").config();

const authRouter=require("./routes/api/auth-routes")

const contactsRouter = require('./routes/api/contacts-routes')

const app = express();//app-це веб-сервер

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status=500, message="Server error" } = err;
  res.status(status).json({ message,})
})

const { KEY_NODEMAILER } = process.env;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mashamak175@gmail.com',
      pass: { KEY_NODEMAILER }
    }
});


let mailOptions = {
    from: 'mashamak175@gmail.com',
    to: 'piloge7795@gam1fy.com',
    subject: 'Test Email',
    html: '<p>Hello World!</p>'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

module.exports = app;
