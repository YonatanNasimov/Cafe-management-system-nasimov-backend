const router = require("express").Router();
const { dashboardCtrl } = require("../controllers/dashboardControler");
const { auth, authAdmin } = require("../middlewares/auth");

router.get("/details", authAdmin, dashboardCtrl.getDetails);

module.exports = router;