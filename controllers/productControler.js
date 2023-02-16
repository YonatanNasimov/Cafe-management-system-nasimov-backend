const db = require("../db/connectDB")

// What’s the difference between req.params and req.query?
// req.params=> http://localhost:3002/products/2
//req.query=> http://localhost:3002/products?categoryId=2

exports.productCtrl = {
    getAllProducts: (req, res) => {
        const q = req.body.categoryId
            ? "SELECT * FROM products WHERE categoryId = ? and status = 'true';"
            : "SELECT * FROM products WHERE status = 'true'"
        db.query(q, [req.query.categoryId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    getProductsWithCategoryId: (req, res) => {
        const q = "SELECT p.productId, p.productName, p.desc, p.price, p.status, c.categoryId as categoryId, c.categoryName as categoryName FROM products as p INNER JOIN categories as c WHERE P.categoryId = c.categoryId ;"
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    getProductById: (req, res) => {
        const q = "SELECT * FROM products WHERE productId = ?;"
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    createNewProduct: (req, res) => {
        const product = req.body;
        const q = "INSERT INTO `cafemanger`.`products` (`productName`, `categoryId`, `desc`, `price`, `status`) VALUES (?, 'true'); ";
        const values = [
            product.productName,
            product.categoryId,
            product.desc,
            product.price
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json(data)
        })
    },
    deleteProduct: (req, res) => {
        const q = "DELETE FROM products WHERE productId = ?;"
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows == 0){
                return res.status(404).json({msg:"Product Id Not Found"});
            }
            return res.status(200).json({msg:"Product Deleted Successfully"});
        })
    },
    updateProduct: (req, res) => {
        const prodId = req.params.id;
        const q = "UPDATE `products` SET `productName` = ?, `categoryId` = ?, `desc` = ?, `price` = ? WHERE (`productId` = ?);";
        const values = [
            req.body.productName,
            req.body.categoryId,
            req.body.desc,
            req.body.price,
        ];
        db.query(q, [...values, prodId], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows == 0){
                return res.status(404).json({msg:"Product Id Not Found"});
            }
            return res.status(200).json({msg:"Product Updated Successfully"});
        })
    },
    updateProductStatus: (req, res) => {
        const prodId = req.params.id;
        const q = "UPDATE `products` SET `status` = ? WHERE (`productId` = ?);";
        db.query(q, [req.body.status, prodId], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows == 0){
                return res.status(404).json({msg:"Product Id Not Found"});
            }
            return res.status(200).json({msg:"Product Updated Successfully"});
        })
    },
};