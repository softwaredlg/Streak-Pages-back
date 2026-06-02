const claimService =
    require("../service/claim.service");

const claimDaily =
    async (req, res) => {

        try {

            const { userId } =
                req.params;

            const result =
                await claimService
                    .claimDaily(
                        userId
                    );

            res.status(200).json(result);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    };

module.exports = {
    claimDaily
};