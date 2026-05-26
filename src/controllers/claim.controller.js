const claimService =
    require("../service/claim.service");
const {
   verifyType
} = require(
   "../helpers/verification.service"
);

const claimDaily =
    async (req, res) => {

        try {

            const { userId } =
                req.params;

            const { type } =
                req.body;

            if (!verifyType(type)) {
                return res.status(400).json({
                    error: "el tipo de contenido es requerido"
                });
            }

            const result =
                await claimService
                    .claimDaily(
                        userId,
                        type
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