const router = require("express").Router();

const { getDailyContent, postSaveContent } = require("../controllers/content.controller");

router.get("/:userId", getDailyContent);
router.post("/savecontent", postSaveContent);

module.exports = router;