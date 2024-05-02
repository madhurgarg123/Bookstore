const router = require("express").Router();
const UsersRoutes = require("./usersRoute");


router.use("/users", UsersRoutes);



module.exports = router;
