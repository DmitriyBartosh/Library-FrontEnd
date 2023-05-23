import axiosClient from "../services/axiosClient";

export const getUser = () => {
  return axiosClient
    .get("/user")
    .then(({ data }) => data)
    .catch((err) => err);
};
