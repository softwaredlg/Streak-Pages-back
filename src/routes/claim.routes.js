const { claimDaily } = require("../controllers/claim.controller");

const router = require("express").Router();

router.post("/:userId", claimDaily);
module.exports = router;