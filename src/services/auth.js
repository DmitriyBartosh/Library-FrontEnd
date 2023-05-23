const isBrowser = () => typeof window !== "undefined";

const getToken = () =>
  isBrowser() && window.localStorage.getItem("tokenAccess")
    ? window.localStorage.getItem("tokenAccess")
    : null;

const getUser = () =>
  isBrowser() && window.localStorage.getItem("userInfo")
    ? window.localStorage.getItem("userInfo")
    : null;

export const isLoggedIn = () => {
  const token = getToken();
  const user = getUser();

  return !!token && !!user;
};

const setToken = (token) =>
  window.localStorage.setItem("tokenAccess", JSON.stringify(token));

export const logout = (callback) => {
  setToken(null);
  callback();
};
