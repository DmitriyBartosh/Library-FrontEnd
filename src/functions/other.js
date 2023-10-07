export function checkBooleanObjectKeys(obj) {
  for (let key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
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
