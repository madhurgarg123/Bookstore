const router = require("express").Router();
const AdminRoutes = require("./adminRoutes");
const UsersRoutes = require("./usersRoute");
const AuthorRoutes = require("./authorRoutes");


router.use("/admin", AdminRoutes);
router.use("/users", UsersRoutes);
router.use("/author", AuthorRoutes);



module.exports = router;
