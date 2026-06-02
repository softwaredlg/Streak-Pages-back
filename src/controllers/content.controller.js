const contentService =
    require("../service/content.service");


/*Funcion v2 */
const getDailyContents = async (req, res) => {
    try {
        const { userId } = req.params;

        const content =
            await contentService
                .obtainDailyContents(
                    userId
                );
        
        res.status(200).json(content)
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    }
}


const postSaveContent = async (req, res) => {
    try {
        const { userId, contentId } = req.body;

        const content =
            await contentService
                .saveContent(
                    userId,
                    contentId
                );

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


const getSaveContent = async (req, res) => {
    try {
        const { userId } = req.params;

        const content =
            await contentService
                .viewSaveContent(
                    userId
                );

        res.status(200).json({
            message: "Exito trayendo contenido del usuario",
            content
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error);
    }
}



module.exports = {
    getDailyContents,
    getSaveContent,
    postSaveContent,
}