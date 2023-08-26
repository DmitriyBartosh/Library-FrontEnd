import axiosClient from "../services/axiosClient";
import { navigate } from "gatsby";

export const getUsers = () => {
  return axiosClient
    .get("admin/users")
    .then(({ data }) => data)
    .catch(({ response }) => {
      const statusResponse = response.status;

      if (statusResponse === 403) {
        navigate("/profile");
      }
    });
};

export const getExpert = async (idExpert) => {
  try {
    const { data } = await axiosClient
      .get(`admin/expert/${idExpert}`);
    return data;
  } catch (err) {
    return err;
  }
}

export const addAdmin = (data) => {
  return axiosClient.post("admin/expert/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((data) => data)
    .catch((err) => console.log(err))
}

export const editAdmin = (data) => {
  return axiosClient.post("admin/expert/edit", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((data) => data)
    .catch((err) => console.log(err))
}

export const deleteAdmin = (id) => {
  return axiosClient.post("admin/expert/delete", {
    id: id
  })
    .then((data) => data)
    .catch((err) => console.log(err))
}