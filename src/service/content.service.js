const { toZonedTime } = require("date-fns-tz");

const { format } = require("date-fns");

const prisma = require("../config/db");

/*Funcion v2.1 */
const obtainDailyContents = async (userId) => {

  const user =
    await prisma.users.findUnique({
      where: {
        id: userId
      }
    });

  if (!user) {
    throw new Error(
      "Usuario no encontrado"
    );
  }

  const timezone =
    user.timezone || "UTC";

  /*Get date to validate if content exist in that date */
  const now =
    toZonedTime(
      new Date(),
      timezone
    );

  const today =
    format(now, "yyyy-MM-dd");


  /*Validate if content exist alreday */
  const existing =
    await prisma.user_daily_content.findUnique({
      where: {
        id_user_date: {
          id_user: userId,
          date: new Date(today)
        }
      },
      include: {
        day_phrase_content: true,
        day_tip_content: true,
        night_phrase_content: true,
        night_tip_content: true
      }
    });


  /*If exist return that content */
  if (existing) {
    return {
      day: {
        phrase: existing.day_phrase_content,
        tip: existing.day_tip_content,
      },
      night: {
        phrase: existing.night_phrase_content,
        tip: existing.night_tip_content,
      }
    };
  }

  /*If not exist obtain content for both turns (night and day) */

  /*DAY*/
  const availableDayPhrase =
    await prisma.contents.findMany({
      where: {
        is_night_content: false,
        type: "PHRASE"
      }
    });

  const availableDayTip =
    await prisma.contents.findMany({
      where: {
        is_night_content: false,
        type: "TIP"
      }
    });

  /*Night */
  const availableNightPhrase =
    await prisma.contents.findMany({
      where: {
        is_night_content: true,
        type: "PHRASE"
      }
    });

  const availableNightTip =
    await prisma.contents.findMany({
      where: {
        is_night_content: true,
        type: "TIP"
      }
    });

  /*Validation the 4 contents are OK */
  if (
    !availableDayPhrase.length || !availableDayTip.length ||
    !availableNightPhrase.length || !availableNightTip.length
  ) {
    throw new Error(
      "No hay contenido disponible"
    );
  }

  /*obtain a random phrase and tip for both turns */

  /*Day*/
  const randomDayPhrase =
    availableDayPhrase[
    Math.floor(
      Math.random() *
      availableDayPhrase.length
    )
    ];

  const randomDayTip =
    availableDayTip[
    Math.floor(
      Math.random() *
      availableDayTip.length
    )
    ];

  /*Night */
  const randomNightPhrase =
    availableNightPhrase[
    Math.floor(
      Math.random() *
      availableNightPhrase.length
    )
    ];

  const randomNightTip =
    availableNightTip[
    Math.floor(
      Math.random() *
      availableNightTip.length
    )
    ];

    /*If content no exist, create content for that day */
  await prisma.user_daily_content.create({
    data: {
      id_user: userId,
      day_phrase_content_id: 
        randomDayPhrase.id,

      day_tip_content_id: 
        randomDayTip.id,

      night_phrase_content_id: 
        randomNightPhrase.id,

      night_tip_content_id: 
        randomNightTip.id,

      date: new Date(today)
    }
  });

  return {
    day: {
      phrase: randomDayPhrase,
      tip: randomDayTip,
    },
    night: {
      phrase: randomNightPhrase,
      tip: randomNightTip,
    }
  };
};

const saveContent = async (userId, contentId) => {

  const existing = await prisma.user_favorites.findUnique({
    where: {
      id_user_content_id: {
        id_user: userId,
        content_id: contentId
      }
    }
  });

  if (existing) {
    throw new Error("Contenido ya guardado");
  }

  const saveContent = await prisma.user_favorites.create({
    data: {
      id_user: userId,
      content_id: contentId
    }
  });

  return saveContent;
};

const viewSaveContent = async (userId) => {

  const content = await prisma.user_favorites.findMany({
    where: {
      id_user: userId
    },
    include: {
      contents: true
    }
  });

  return content;

}

module.exports = {
  viewSaveContent,
  obtainDailyContents,
  saveContent
};