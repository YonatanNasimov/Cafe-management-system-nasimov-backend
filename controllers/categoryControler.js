const db = require("../db/connectDB")

exports.categoryCtrl = {
    createNewCat: (req, res) => {
        const category = req.body;
        const q = "INSERT INTO `cafemanger`.`categories` (`categoryName`) VALUES (?); ";
        db.query(q, [category.categoryName], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json({ msg: "Category Successfully Added" })
        })
    },
    getAllCategories: (req, res) => {
        const q = "SELECT * FROM categories ORDER BY categoryName ;"
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    updateCategory: (req, res) => {
        const catId = req.params.id;
        const category = req.body;
        const q = "UPDATE `cafemanger`.`categories` SET `categoryName` = ? WHERE (`categoryId` = ?);";
        db.query(q, [category.categoryName, catId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ msg: "Category Updated Successfully" });
        })
    },
};