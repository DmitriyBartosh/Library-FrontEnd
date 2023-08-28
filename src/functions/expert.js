import axiosClient from "../services/axiosClient";
import { navigate } from "gatsby";

export const getAllUserWorks = async (direction) => {
  try {
    const { data } = await axiosClient
      .get(`admin/allworks/${direction}`);
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

export const getExpert = () => {
  return axiosClient
    .get("/expert/get")
    .then(({ data }) => data)
    .catch(({ response }) => {
      const statusResponse = response.status;

      if (statusResponse === 403) {
        navigate("/profile");
      }
    });
};

export const editExpert = ({ expert }) => {
  return axiosClient
    .post("expert/edit", expert)
    .then(({ data }) => data)
    .catch((error) => error);
}

export const getAllWorksOnReviewForAdmin = async () => {
  try {
    const { data } = await axiosClient
      .get("expert/allworks");
    return data.works;
  } catch (err) {
    return err;
  }
}