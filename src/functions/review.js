import axiosClient from "../services/axiosClient";

export const getAllExperts = async (direction) => {
  try {
    const { data } = await axiosClient.get(`review/${direction}/allexperts`);
    return data;
  } catch (err) {
    return err;
  }
};

export const getAllWorksOnReview = async () => {
  try {
    const { data } = await axiosClient.get("review/works");
    return data.works;
  } catch (err) {
    return err;
  }
};

export const addWorkToReview = (data) => {
  return axiosClient
    .post("review/add", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteReview = (id) => {
  return axiosClient
    .delete(`review/delete/${id}`)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Внести коррективы в работу или исправить ссылку на работу
export const fixWorkToReview = (data) => {
  return axiosClient
    .post("review/fix", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Дополнить работу после первой проверки и отправить эксперту
export const revisionReview = (data) => {
  return axiosClient
    .post("review/revision", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Ссылка на оплату за ревью работы
export const getPayment = async (data) => {
  return axiosClient
    .post("review/payment/get", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Проверить статус оплаты, если создавалась платежка
export const checkPayment = async (id) => {
  try {
    const { data } = await axiosClient.get(`review/payment/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
