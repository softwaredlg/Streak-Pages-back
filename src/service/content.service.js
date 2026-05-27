const { toZonedTime } = require("date-fns-tz");

const { format } = require("date-fns");

const prisma = require("../config/db");

const getDailyContent = async (userId, selectedType) => {

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

  const now =
    toZonedTime(
      new Date(),
      timezone
    );

  const hour =
    now.getHours();

  const isNight =
    hour >= 18 || hour < 6;

  const today =
    format(now, "yyyy-MM-dd");

  const existing =
    await prisma.user_daily_content.findUnique({
      where: {
        id_user_date: {
          id_user: userId,
          date: new Date(today)
        }
      },
      include: {
        contents: true
      }
    });

  if (existing) {
    return existing.contents;
  }

  const validTypes = [
    "PHRASE",
    "TIP"
  ];

  if (!validTypes.includes(selectedType)) {
    throw new Error(
      "Tipo de contendio invalido"
    );
  }

  const availableContent =
    await prisma.contents.findMany({
      where: {
        is_night_content: isNight,
        type: selectedType
      }
    });

  if (!availableContent.length) {

    throw new Error(
      "No hay contenido disponible"
    );
  }

  const randomIndex =
    Math.floor(
      Math.random() *
      availableContent.length
    );

  const selectedContent =
    availableContent[randomIndex];

  await prisma.user_daily_content.create({
    data: {
      id_user: userId,
      content_id: selectedContent.id,
      date: new Date(today)
    }
  });

  return selectedContent;
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
  getDailyContent,
  saveContent
};