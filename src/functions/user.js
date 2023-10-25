import axiosClient from "../services/axiosClient";

export const getUser = async () => {
  try {
    const { data } = await axiosClient.get("user");
    return data;
  } catch (err) {
    return err;
  }
};

export const setName = (data) => {
  return axiosClient
    .post("user/setname", data)
    .then(({ data }) => data)
    .catch((error) => error);
};

export const addTelegramId = (data) => {
  return axiosClient
    .post("telegram/add", data)
    .then(({ data }) => data)
    .catch((error) => error);
};
