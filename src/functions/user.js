import axiosClient from "../services/axiosClient";

export const getUser = async () => {
  try {
    const { data } = await axiosClient.get("user");
    return data;
  } catch (err) {
    return err;
  }
};
