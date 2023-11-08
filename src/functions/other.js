import axiosClient from "../services/axiosClient";

export function checkBooleanObjectKeys(obj) {
  for (let key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
}

// Находим изображение с максимальным разрешением из Вконтакте
export function findMaxResolutionPoster(photos) {
  let maxResolution = 0;
  let maxResolutionPhoto = null;

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const resolution = photo.width * photo.height;

    if (resolution > maxResolution) {
      maxResolution = resolution;
      maxResolutionPhoto = photo;
    }
  }

  return maxResolutionPhoto;
}

export function dayTitle(number) {
  if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return "дней";
  const last_num = number % 10;
  if (last_num === 1) return "день";
  if ([2, 3, 4].includes(last_num)) return "дня";
  if ([5, 6, 7, 8, 9, 0].includes(last_num)) return "дней";
}

export function convertDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const month = monthNames[date.getMonth()];
  const formatted = `${date.getDate()} ${month}`;

  return formatted;
}

export function convertDateJson(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const month = monthNames[date.getMonth()];

  return {
    day: date.getDate(),
    month: month,
    year: date.getFullYear(),
  };
}

// Все статьи
export const getAllWall = async () => {
  try {
    const { data } = await axiosClient.post("vk/wall");
    return data;
  } catch (err) {
    return err;
  }
};
