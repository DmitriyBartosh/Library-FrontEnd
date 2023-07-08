import axiosClient from "../services/axiosClient";
import { navigate } from "gatsby";

// Показать или скрыть направление
export const changeDesign = (updateStatus, statusDirection, setStatusDirection, setIsLoading) => {
  setIsLoading(true);
  const boolean = statusDirection.design;
  const localDirections = JSON.parse(window.localStorage.getItem('directions'));

  axiosClient
    .put('direction/change/design', {
      design: !boolean
    })
    .then(() => {
      localDirections.design = !boolean;
      window.localStorage.setItem('directions', JSON.stringify(localDirections));

      setStatusDirection({ ...statusDirection, design: !boolean })

      updateStatus();
      setIsLoading(false);
      navigate('/profile');
    })
    .catch((err) => console.log(err));
};

export const changeFrontend = (updateStatus, statusDirection, setStatusDirection, setIsLoading) => {
  setIsLoading(true);
  const boolean = statusDirection.frontend;
  const localDirections = JSON.parse(window.localStorage.getItem('directions'));



  axiosClient
    .put('direction/change/frontend', {
      frontend: !boolean
    })
    .then(() => {
      localDirections.frontend = !boolean;
      window.localStorage.setItem('directions', JSON.stringify(localDirections));

      setStatusDirection({ ...statusDirection, frontend: !boolean })

      updateStatus();
      setIsLoading(false);
      navigate('/profile');
    })
    .catch((err) => console.log(err));
};

export const changePhoto = (updateStatus, statusDirection, setStatusDirection, setIsLoading) => {
  setIsLoading(true);
  const boolean = statusDirection.photo;
  const localDirections = JSON.parse(window.localStorage.getItem('directions'));



  axiosClient
    .put('direction/change/photo', {
      photo: !boolean
    })
    .then(() => {
      localDirections.photo = !boolean;
      window.localStorage.setItem('directions', JSON.stringify(localDirections));

      setStatusDirection({ ...statusDirection, photo: !boolean })

      updateStatus();
      setIsLoading(false);
      navigate('/profile');
    })
    .catch((err) => console.log(err));
};