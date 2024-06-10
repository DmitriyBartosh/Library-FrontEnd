import axiosClient from "../services/axiosClient";

export const getAllQuestions = async (direction) => {
  try {
    const { data } = await axiosClient.get(
      `entryreview/getquestions/${direction}`
    );
    return data;
  } catch (err) {
    return err;
  }
};

export const getAllAnswers = async (direction) => {
  try {
    const { data } = await axiosClient.get(`entryreview/answers/${direction}`);
    return data;
  } catch (err) {
    return err;
  }
};

export const getEntryReview = async () => {
  try {
    const { data } = await axiosClient.get(`entryreview/get`);
    return data;
  } catch (err) {
    return err;
  }
};

export const addQuestions = (data) => {
  return axiosClient
    .post("entryreview/addquestions", data)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export const addEntryReview = async (data) => {
  console.log(data);
  return axiosClient
    .post("entryreview/add", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const addFeetback = async (data) => {
  console.log(data);
  return axiosClient
    .post("entryreview/feetback", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};
