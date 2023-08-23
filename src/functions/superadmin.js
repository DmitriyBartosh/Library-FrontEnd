import axiosClient from "../services/axiosClient";

export const getUsers = async () => {
  try {
    const { data } = await axiosClient
      .get("admin/users");
    return data;
  } catch (err) {
    return err;
  }
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

export const removeAdmin = (id) => {
  axiosClient.put("admin/design/remove", {
    id: id
  })
    .then(({ data }) => data.success)
    .catch((err) => console.log(err))
}