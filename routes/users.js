const router = require("express").Router();
const { userCtrl } = require("../controllers/usersControler")
const { auth, authAdmin } = require("../middlewares/auth");

router.get("/userslist", authAdmin, userCtrl.getAllUsers);

router.get("/getRegularsUsers", authAdmin, userCtrl.getRegularsUsers);

router.get("/checkToken", auth, userCtrl.checkToken);

router.post("/forgetpassword", userCtrl.forgetPassword);

router.patch("/changestatus/:id", authAdmin, userCtrl.changeStatus);

router.patch("/changepassword", auth, userCtrl.changePassword);

module.exports = router;