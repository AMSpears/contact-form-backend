const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('./config/config');



const transport = {
    host: 'mail.youremaildomain.com', //enter your email domain 
    port: 587,
    secure: false,
    auth: {
        user: creds.USER,
        pass: creds.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/send', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const message = req.body.message
    const content =
        `<p> You have a new message from <strong>Provide Services</strong> contact form</p>    
     <h3> Contact Details</h3>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone Number: ${phone}</li>
        </ul>
        <p>${message}</p>`

    const mail = {
        //enter domain email
        from: "<test1@angiespears.com>",
        // Enter the email you want to recieves messages at below
        to: 'Email@email.com',
        subject: 'New Message for Provide Services',
        html: content
    }

    transporter.sendMail(mail, (err) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
})

module.exports = router;