const streakService = require("../service/streak.service");

const getStreak = async (req, res) => {
    try {

        const { userId } = req.params;

        const streak = await streakService.getUserStreak(userId);

        if (!streak) {
            return res.status(404).json({
                error: "Racha no encontrada en DB"
            });
        }

        res.status(200).json(streak);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

const updateStreak = async (req, res) =>{
    try {
        const { userId } = req.body;

        const result = await streakService.claimStreak(userId);

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getStreak,
    updateStreak
};