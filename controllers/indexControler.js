const db = require("../db/connectDB")

// check if express Work
exports.indexCtrl = {
    getIndexMsg: (req, res) => {
        res.status(200).json({ msg: "Express Work..." });
    }
};