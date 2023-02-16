const db = require("../db/connectDB")


exports.dashboardCtrl = {
    getDetails: (req, res) => {
        let categoryCount;
        let productCount;
        let billCount;
        const qC = "SELECT  COUNT(categoryId) AS categoryCount FROM categories;";
        db.query(qC, (err, data) => {
            if (err) return res.status(500).json(err);
            categoryCount = data[0].categoryCount;
        })
        const qP = "SELECT  COUNT(productId) AS productCount FROM products;";
        db.query(qP, (err, data) => {
            if (err) return res.status(500).json(err);
            productCount = data[0].productCount;
        })
        const qB = "SELECT  COUNT(billId) AS billCount FROM bills;";
        db.query(qB, (err, data) => {
            if (err) return res.status(500).json(err);
            billCount = data[0].billCount;
            const result = {
                categories: categoryCount,
                products: productCount,
                bills: billCount,
            }
            return res.status(200).json(result);
        })

    }
};