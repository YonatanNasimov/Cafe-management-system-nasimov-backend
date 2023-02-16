const router = require("express").Router();
const { categoryCtrl } = require("../controllers/categoryControler");
const { auth, authAdmin } = require("../middlewares/auth");

router.get("/", authAdmin, categoryCtrl.getAllCategories);

router.post("/", authAdmin, categoryCtrl.createNewCat);

router.patch("/:id", authAdmin, categoryCtrl.updateCategory);

module.exports = router;