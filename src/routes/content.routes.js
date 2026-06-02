const router = require("express").Router();

const { postSaveContent, getSaveContent, getDailyContents } = require("../controllers/content.controller");

router.get("/:userId/favorites", getSaveContent);
router.get("/:userId", getDailyContents);
router.post("/savecontent", postSaveContent);

module.exports = router;
