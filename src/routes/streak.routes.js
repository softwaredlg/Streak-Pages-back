const router = require("express").Router();

const {
    getStreak,
    updateStreak
} = require("../controllers/streak.controller");

router.get("/:userId", getStreak);
router.post("/claim", updateStreak);

module.exports = router;