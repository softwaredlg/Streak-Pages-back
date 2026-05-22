const router = require("express").Router();

const {
    registerUser,
    getAllUsers
} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.get("/get_users", getAllUsers);

module.exports = router;
