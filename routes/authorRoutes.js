const router = require("express").Router();
const Controller = require("../Controllers");
const Auth = require("../common/authentication");

router.post("/login", Controller.Author.login);
router.get("/purchasehistory",Auth.verify("author"),Controller.Author.purchaseHistory);
router.get("/sellcount/:id",Auth.verify("author"),Controller.Author.sellcount);
router.post("/addnewbook",Auth.verify("author"),Controller.Author.addNewBook);

module.exports = router;
