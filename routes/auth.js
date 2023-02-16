const router = require("express").Router();
const { authCtrl } = require("../controllers/authConrtroler");
const { auth, authAdmin } = require("../middlewares/auth");

router.post("/signup", authCtrl.signup);

router.post("/login", authCtrl.login);

router.post("/logout", auth, authCtrl.logout);

module.exports = router;