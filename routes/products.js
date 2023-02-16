const router = require("express").Router();
const { productCtrl } = require("../controllers/productControler");
const { auth, authAdmin } = require("../middlewares/auth");

router.get("/", authAdmin, productCtrl.getAllProducts);

router.get("/getProductsBycategoryId", authAdmin, productCtrl.getProductsWithCategoryId);

router.get("/:id", authAdmin, productCtrl.getProductById);

router.post("/", authAdmin, productCtrl.createNewProduct);

router.delete("/:id", authAdmin, productCtrl.deleteProduct);

router.patch("/:id", authAdmin, productCtrl.updateProduct);

router.patch("/status/:id", authAdmin, productCtrl.updateProductStatus);

module.exports = router;