import axiosClient from "../services/axiosClient";

export const getUser = async () => {
  try {
    const { data } = await axiosClient
      .get("user");
    return data;
  } catch (err) {
    return err;
  }
};

// Статус всех направлений (скрыт/показан)
export const getDirections = async () => {
  try {
    const { data } = await axiosClient
      .get("direction/status");
    return data;
  } catch (err) {
    return err;
  }
};

// Изменить статус направления
export const changeDirection = (data) => {
  return axiosClient
    .post('direction/change', data)
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};