const db = require("../db/connectDB");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/creatToken");

exports.authCtrl = {
    signup: (req, res) => {
        const user = req.body
        // first check if the email are unique
        const q = "SELECT * FROM `cafemanger`.`users` WHERE email = ?";

        db.query(q, [user.email], (err, data) => {
            if (err) return res.json(err);
            if (data.length) return res.status(409).json({ msg: "Email Alredy Exists." });

            // hash the password and create user
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);

            const q = "INSERT INTO `cafemanger`.`users` (`fullName`, `phoneNumber`, `email`, `password`, `status`, `role`)  VALUES (?,'false','user');";
            const values = [user.fullName, user.phoneNumber, user.email, hash];

            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json({ msg: "User Has Been Created" });
            });
        })
    },
    login: (req, res) => {
        // check user
        const user = req.body
        const q = "SELECT * FROM `cafemanger`.`users` WHERE email = ?"
        db.query(q, [user.email], (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) return res.status(404).json({ msg: "User Not Found" });

            // check password
            const isPasswordCorrect = bcrypt.compareSync(user.password, data[0].password);
            if (!isPasswordCorrect) return res.status(400).json({ msg: "Wrong Email OR Password" });

            if(data[0].status === "false"){
                return res.status(401).json({msg:"Wait For Admin Approval"})
            }

            const token = createToken(data[0].id, data[0].role);
            const { password, ...other } = data[0];

            // res.status(200).json({ ...other, token });
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...other, token });
        })
    },
    logout: (req, res) => {
        res.clearCookie("access_token", {
            sameSite: "none",
            secure: true
        }).status(200).json({ msg: "User Has Been Logged Out" })
    },
};