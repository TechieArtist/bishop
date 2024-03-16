const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    // This is where you will handle form data and send an email.
    console.log(req.body); // Log form data to see if it's being received correctly.
    res.send('Email sent successfully!'); // Placeholder response
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const nodemailer = require('nodemailer');

// Inside your app.post('/send-email', ...) handler
let transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider', // e.g., 'gmail'
    auth: {
        user: 'your-email@example.com',
        pass: 'yourpassword'
    }
});

let mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient-email@example.com',
    subject: 'New Contact Form Submission',
    text: `You have a new submission with the following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`
    // You can format the email content here based on the form data
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
