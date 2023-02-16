const router = require("express").Router();
const { indexCtrl } = require("../controllers/indexControler");

router.get("/", indexCtrl.getIndexMsg);

module.exports = router;