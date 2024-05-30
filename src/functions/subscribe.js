import axiosClient from "../services/axiosClient";

// Ссылка на оплату за ревью работы
export const addSubscribe = async (data) => {
  console.log(data);
  return axiosClient
    .post("subscribe/add", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Проверить статус оплаты, если создавалась платежка
export const checkPayment = async (id) => {
  try {
    const { data } = await axiosClient.get(`subscribe/payment/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

// Все подписки
export const getAllSubscribes = async () => {
  try {
    const { data } = await axiosClient.get("subscribe/all");
    return data;
  } catch (err) {
    return err;
  }
};
