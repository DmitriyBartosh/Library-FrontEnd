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

export const addDesignAdmin = (id) => {
  axiosClient.put("admin/design/add", {
    id: id
  })
    .then(({ data }) => data.success)
    .catch((err) => console.log(err))
}

export const removeDesignAdmin = (id) => {
  axiosClient.put("admin/design/remove", {
    id: id
  })
    .then(({ data }) => data.success)
    .catch((err) => console.log(err))
}