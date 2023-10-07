import axiosClient from "../services/axiosClient";

export const getAllPromoCodes = async () => {
  try {
    const { data } = await axiosClient.get("/promo/all");
    return data;
  } catch (err) {
    return err;
  }
};

export const addPromoCodes = (data) => {
  return axiosClient
    .post("promo/add", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const activatePromoCode = (data) => {
  return axiosClient
    .post("promo/activate", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};
