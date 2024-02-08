const router = require("express").Router();
const Controller = require("../Controllers");
const Auth = require("../common/authentication");

router.post("/login", Controller.Admin.login);


module.exports = router;
