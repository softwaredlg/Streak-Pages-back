const router = require("express").Router();

const { getDailyContent, 
        postSaveContent, 
        getSaveContent } = require("../controllers/content.controller");

router.get("/:userId", getDailyContent);
router.get("/:userId/favorites", getSaveContent)
router.post("/savecontent", postSaveContent);

module.exports = router;