import axiosClient from "../services/axiosClient";

export const getAllUserLinks = async () => {
  try {
    const { data } = await axiosClient
      .get("admin/design/works");
    return data;
  } catch (err) {
    return err;
  }
};

export const getAdminSettings = async () => {
  try {
    const { data } = await axiosClient
      .get("admin/design/settings");
    return data;
  } catch (err) {
    return err;
  }
};