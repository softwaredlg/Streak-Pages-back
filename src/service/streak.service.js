const { differenceInCalendarDays } = require("date-fns");
const { toZonedTime } = require("date-fns-tz");
const prisma = require("../config/db");

const getUserStreak = async (userId) => {
    /*obtain the current streak */
    const streak = await prisma.streaks.findUnique({
        where: {
            id_user: userId
        }
    });

    if (!streak) {
        throw new Error("Racha de usuario no encontrada");
    }

    return streak;
};

const claimStreak = async (userId) => {

    /* obtain user */
    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const streak = await prisma.streaks.findUnique({
        where: {
            id_user: userId
        }
    });

    if (!streak) {
        throw new Error("Racha de usuario no encontrada");
    }

    /* set timezone */
    const timezone =
        user.timezone || "UTC";

    /* current date user timezone */
    const now = toZonedTime(
        new Date(),
        timezone
    );

    /* first claim */
    if (!streak.last_claim_at) {

        const updated =
            await prisma.streaks.update({
                where: {
                    id_user: userId
                },
                data: {
                    current_streak: 1,
                    last_claim_at: new Date()
                }
            });

        return {
            message: "Racha iniciada",
            streak: updated
        }; 
    }

    /* convert last claim */
    const lastClaim = toZonedTime(
        streak.last_claim_at,
        timezone
    );

    /* diff days */
    const diffDays =
        differenceInCalendarDays(
            now,
            lastClaim
        );

    /* same day */
    if (diffDays === 0) {

        return {
            message:
              "Ya se reclamo hoy la racha",
            streak
        };
    }

    /* calculate streak */
    let newStreak = 1;
    let message = "";

    if (diffDays === 1) {

        newStreak =
            streak.current_streak + 1;

        message =
          `Actualizando racha`;

    } else {

        message =
          "Has perdido la racha";
    }

    /* update db */
    const updated =
        await prisma.streaks.update({
            where: {
                id_user: userId
            },
            data: {
                current_streak: newStreak,
                last_claim_at: new Date()
            }
        });

    return {
        message,
        streak: updated
    };
};

module.exports = {
    getUserStreak,
    claimStreak
}