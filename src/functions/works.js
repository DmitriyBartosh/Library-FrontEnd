import axiosClient from "../services/axiosClient";

// Все добавленные работы
export const getAllWorks = async () => {
  try {
    const { data } = await axiosClient
      .get("works/all");
    return data.works;
  } catch (err) {
    return err;
  }
}

export const addWork = (data) => {
  return axiosClient.post("works/add", data)
    .then((data) => data)
    .catch((err) => console.log(err))
}

export const editWork = (data) => {
  return axiosClient.post("works/edit", data)
    .then((data) => data)
    .catch((err) => console.log(err))
}