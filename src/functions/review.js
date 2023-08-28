import axiosClient from "../services/axiosClient";

export const getAllExperts = async (direction) => {
  try {
    const { data } = await axiosClient
      .get(`review/${direction}/allexperts`);
    return data;
  } catch (err) {
    return err;
  }
};

export const getAllWorksOnReview = async () => {
  try {
    const { data } = await axiosClient
      .get("review/works");
    return data.works;
  } catch (err) {
    return err;
  }
}

export const addWorkToReview = (data) => {
  return axiosClient.post("review/add", data)
    .then((data) => data)
    .catch((err) => console.log(err))
}
