const streakService =
require("./streak.service");

const contentService =
require("./content.service");

const claimDaily = async (userId) => {

    /* process streak */
    const streakResult =
      await streakService
        .claimStreak(userId);

    /* obtain content */
    const content =
      await contentService
        .obtainDailyContents(userId)

    /* combine response */
    return {

        message:
          streakResult.message,

        streak:
          streakResult.streak,

        content
    };
};

module.exports = {
    claimDaily
};
