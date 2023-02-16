const db = require("../db/connectDB");
const { transporter, textPass } = require("../helpers/sendEmail");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.userCtrl = {
    getAllUsers: (req, res) => {
        const q = "SELECT * FROM users;"
        db.query(q, (err, data) => {
            if (err) {
                return res.status(500).json("err: ", err)
            } else {
                return res.status(200).json(data);
            }
        })
    },
    getRegularsUsers: (req, res) => {
        const q = "SELECT * FROM users WHERE role = 'user';"
        db.query(q, (err, data) => {
            if (err) {
                return res.status(500).json(data)
            } else {
                return res.status(200).json(data);
            }
        })
    },
    changeStatus: (req, res) => {
        const userId = req.params.id;
        const user = req.body;
        const q = "UPDATE users SET `status` = ? WHERE (`userId` = ?);";
        db.query(q, [user.status, userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    changePassword: (req, res) => {
        let user = req.body
        const q = "SELECT * FROM `cafemanger`.`users` WHERE email = ?"
        db.query(q, [user.email], (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) return res.status(404).json({ msg: "User Not Found" });

            // check password
            const isPasswordCorrect = bcrypt.compareSync(user.password, data[0].password);
            if (!isPasswordCorrect) return res.status(400).json({ msg: "Wrong Email OR Password" });

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.newPassword, salt);
            const q = "UPDATE users SET `password` = ? WHERE (`email` = ?);";
            db.query(q, [hash, user.email], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json({ msg: "The Password Has Been Changed Successfully" });
            })
        })
    },
    checkToken: (req, res) => {
        return res.status(200).json({ msg: "true" })
    },
    forgetPassword: (req, res) => {
        const user = req.body;
        const q = "SELECT * FROM users WHERE email = ?;"
        db.query(q, [user.email], (err, bigData) => {
            if (err) return res.status(200).json(err);
            if (bigData.length === 0) return res.status(404).json({ msg: "Email Not Found" });
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(textPass, salt);

            const q = `UPDATE users SET password = '${hash}' WHERE email = ?;`
            db.query(q, [user.email], (err, data) => {
                if (err) return res.status(200).json(err);
                const mailOptions = {
                    from: process.env.FROM_EMAIL,
                    to: bigData[0].email,
                    subject: 'Forget The Password Cafe Mangement System',
                    html: `<h4>Hello ${bigData[0].fullName}</h4>
                            <p>Your New Password Is: <b>${textPass}</b></br>
                            <a href="http://localhost:3002">LOGIN</a></p>`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.status(500).json(error);
                    } else {
                        res.status(200).json('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json({ data, msg: "New Password Was Sent To Your Email" })
            })

        })
    },
};