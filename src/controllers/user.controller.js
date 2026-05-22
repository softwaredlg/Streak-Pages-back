const userService = require("../service/user.service.js");

const registerUser = async (req, res) => {

    const { timezone } = req.body;

    try{
        const user = await userService.createUser(timezone);

        res.status(200).json(user);
    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Error creando usuario"
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error obteniendo usuarios"
        });
    }
}

module.exports = {
    registerUser,
    getAllUsers
};