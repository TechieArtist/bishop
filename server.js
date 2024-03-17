const express = require('express');
// const bodyParser = require('body-parser'); // Not needed for newer versions of Express
const app = express();
const port = 3000;

// Middleware for body parsing
// For Express 4.16.0 and later, bodyParser has been re-added under the methods express.json() and express.urlencoded().
app.use(express.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    console.log(req.body); // Log form data to see if it's being received correctly.

    // Move Nodemailer setup here
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'YourEmailServiceProvider', // e.g., 'gmail'
        auth: {
            user: 'your-email@example.com',
            pass: 'yourpassword'
        }
    });

    let mailOptions = {
        from: 'your-email@example.com',
        to: 'bishopb429@gmail.com',
        subject: 'New Contact Form Submission',
        text: `You have a new submission with the following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Failed to send email.'); // Provide feedback in case of failure
            return;
        }
        console.log('Message sent: %s', info.messageId);
        res.send('Email sent successfully!'); // Confirm email was sent
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
