const streakService =
require("./streak.service");

const contentService =
require("./content.service");

const claimDaily = async (userId, selectedType) => {

    /* process streak */
    const streakResult =
      await streakService
        .claimStreak(userId);

    /* obtain content */
    const content =
      await contentService
        .getDailyContent(userId, selectedType);

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