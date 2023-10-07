import axiosClient from "../services/axiosClient";
import { navigate } from "gatsby";

export const getAllUserWorks = async (direction) => {
  try {
    const { data } = await axiosClient.get(`expert/allworks/${direction}`);
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
};

export const getAllWorksOnReviewForAdmin = async () => {
  try {
    const { data } = await axiosClient.get("expert/reviews");
    return data.works;
  } catch (err) {
    return err;
  }
};

// Проверка пройдена
export const workVerified = (data) => {
  return axiosClient
    .post("expert/work/verified", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Отправить сообщение об ошибке
export const workFailed = (data) => {
  return axiosClient
    .post("expert/work/fail", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Рецензия принята с первой попытки
export const workReview = (data) => {
  return axiosClient
    .post("expert/work/review", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Рецензия отрпавлена на доработку
export const workRevision = (data) => {
  return axiosClient
    .post("expert/work/revision", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Рецензия отрпавлена на доработку
export const workNotCounted = (data) => {
  return axiosClient
    .post("expert/work/notcounted", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};

// Рецензия отрпавлена на доработку
export const extendDeadline = (data) => {
  return axiosClient
    .post("expert/work/extend", data)
    .then((data) => data)
    .catch((err) => console.log(err));
};
