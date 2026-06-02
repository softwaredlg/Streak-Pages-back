const router = require("express").Router();
const rateLimit =
    require("express-rate-limit")
const {
    registerUser,
    getAllUsers
} = require("../controllers/user.controller");

/*Crear middleware para esta funcion*/
const registerLimiter =
    rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 5,

        message: {
            error: "Demasidos solicitudes, intente mas tarde"
        },
        standardHeaders: true,
        legacyHeaders: false
    })

router.post("/register", registerUser,registerLimiter);
router.get("/get_users", getAllUsers);

module.exports = router;
