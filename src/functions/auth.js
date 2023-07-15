import axiosClient from "../services/axiosClient";

// Ссылки на авторизацию

export const vkAuth = () => {
  return axiosClient
    .get("/auth/vk")
    .then(({ data }) => data.url)
    .catch((error) => error);
};

export const yandexAuth = () => {
  return axiosClient
    .get("/auth/yandex")
    .then(({ data }) => data.url)
    .catch((error) => error);
};

export const googleAuth = () => {
  return axiosClient
    .get("/auth/google")
    .then(({ data }) => data.url)
    .catch((error) => error);
};