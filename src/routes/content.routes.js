const router = require("express").Router();

const { getDailyContent,
        postSaveContent, getSaveContent } = require("../controllers/content.controller");

router.get("/:userId/favorites", getSaveContent)
router.get("/:userId", getDailyContent);
router.post("/savecontent", postSaveContent);

module.exports = router;