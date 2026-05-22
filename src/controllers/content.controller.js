const { saveContent } = require("../service/content.service");


const getDailyContent = async (req, res) => {

    try {

        const { userId } =
            req.params;

        const { type } =
            req.body;

        const content =
            await contentService
                .getDailyContent(
                    userId,
                    type
                );

        res.status(200).json(content);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const postSaveContent = async (req, res) => {
    try {
        const { userId, contentId } = req.body;

        const content =
            await saveContent(userId, contentId);

        res.status(201).json({
            message: `contenido guardado`,
            content
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    postSaveContent,
    getDailyContent
}