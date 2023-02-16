const router = require("express").Router();
const { billCtrl } = require("../controllers/billControler");
const { auth, authAdmin } = require("../middlewares/auth");

router.get("/getAllBills", authAdmin, billCtrl.getAllBills);

router.post("/generateReport", authAdmin, billCtrl.generateReport);

router.post("/getPdf", authAdmin, billCtrl.getPdf);

router.delete("/DeleteBillById/:id", authAdmin, billCtrl.DeleteBillById);

module.exports = router;