const nodemailer = require('nodemailer');
require("dotenv").config();

exports.transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASS
    }
});

const randomPassword = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// random number between 100000 - 999999
let rndInt = randomPassword(100000, 999999);
// Convert a number to a string, using base 16, Hexadecimal
exports.textPass = rndInt.toString(16);
