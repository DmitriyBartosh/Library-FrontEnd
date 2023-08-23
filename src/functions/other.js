export function checkBooleanObjectKeys(obj) {
  for (let key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
}


