const router = require("express").Router();
const Controller = require("../Controllers");
const Auth = require("../common/authentication");


router.post("/login", Controller.User.login);
router.get("/getallbooks" ,Auth.verify("user"),Controller.User.showAllBooks);
router.post("/buynow/:id" ,Auth.verify("user"),Controller.User.buyNow);
router.get("/purchasehistory" ,Auth.verify("user"),Controller.User.purchaseHistory);

module.exports = router;
