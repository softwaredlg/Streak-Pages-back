const prisma = require("../config/db");

const createUser = async (timezone = "UTC") => {

    const result = await prisma.$transaction(
        async(tx) => {
            /*Create user */
            const user = await tx.users.create({
                data: {
                    timezone
                }
            });

            /*Create streak at same time */
            const streak = await tx.streaks.create({
                data:{
                    id_user:user.id
                }
            });

            return {
                user,
                streak
            };
        }   
    )

    return {
        message:"Creando usuario y racha",
        result
    };
};

const getUsers = async () => {
    const users = await prisma.users.findMany();

    return users;
}

module.exports = {
    createUser,
    getUsers
};