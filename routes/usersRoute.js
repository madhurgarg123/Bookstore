const router = require("express").Router();
const Controller = require("../Controllers");
const Auth = require("../common/authentication");


router.post("/login", Controller.user.login);
router.post("/addnewbook",Auth.verify("user"),Controller.user.addNewBook);
router.get("/getallbooks" ,Auth.verify("user"),Controller.user.getAllBooks);
router.get("/deletebook/:id" ,Auth.verify("user"),Controller.user.deleteBookById );
router.post("/updateBook/:id", Auth.verify("user"),Controller.user.updateBookById)
router.post("/filteredBook", Auth.verify("user"),Controller.user.filteredBooks)

module.exports = router;
