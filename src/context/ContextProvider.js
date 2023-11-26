import { navigate } from "gatsby";
import { useLocalStorage } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getUser, checkAdmin } from "../functions/user";
import axiosClient from "../services/axiosClient";
import { getAllSubscribes } from "../functions/subscribe";
import { getAllWorksOnReview } from "../functions/review";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllWorks } from "../functions/works";

const StateContext = createContext({
  user: null,
  token: null,
  works: null,
  reviews: null,
  subscribes: null,
  showReview: false,
  checkAdminQuery: null,
  setShowReview: () => {},
  setLinks: () => {},
  setUser: () => {},
  onLogout: () => {},
  isLoggedIn: () => {},
  isSubscribe: () => {},
});

export const ContextProvider = ({ children }) => {
  const [showReview, setShowReview] = useState(false);
  const [user, setUser, removeUser] = useLocalStorage("user");
  const [works, setWorks, removeWorks] = useLocalStorage("works");
  const [subscribes, setSubscribes, removeSubscribes] =
    useLocalStorage("subscribes");
  const [reviews, setReviews, removeReviews] = useLocalStorage("reviews");

  const checkAdminQuery = useQuery({
    queryKey: ["checkAdmin"],
    queryFn: checkAdmin,
    enabled: !!user,
  });

  // Получаем информацию о пользователе и записывает в локальную переменную для быстрого доступа
  useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    enabled: !!user,
    onSuccess: (data) => {
      // Обновляем пользователя
      setUser((prevUser) => ({
        ...prevUser,
        ...data,
        access_token: prevUser.access_token,
      }));
    },
    onError: (err) => {
      console.log(err);

      checkAdminQuery.remove();
      removeUser();
      removeSubscribes();
      removeWorks();
      navigate("/");
    },
  });

  // Получаем список выполненных и прикрепленных работ пользователя и записывает в локальное хранилище
  useQuery({
    queryKey: ["getAllWorks"],
    queryFn: getAllWorks,
    enabled: !!user,
    onSuccess: (data) => {
      setWorks(data);
    },
  });

  // Список работ отправленных на рецензию
  useQuery({
    queryKey: ["getAllWorksOnReview"],
    queryFn: getAllWorksOnReview,
    enabled: !!user,
    onSuccess: (data) => {
      setReviews(data);
    },
  });

  // Список подписок
  useQuery({
    queryKey: ["getAllSubscribes"],
    queryFn: getAllSubscribes,
    enabled: !!user,
    onSuccess: (data) => {
      setSubscribes(data.subscribes);
    },
  });

  // Авторизирован ли пользователь
  const isLoggedIn = () => {
    return !!user;
  };

  // Активна ли подписка по направлению
  const isSubscribe = (direction) => {
    const isActive = subscribes
      ?.filter((item) => item.plan === direction)
      .some((item) => item.active);

    return isActive;
  };

  // Выйти из системы
  const onLogout = (event, isLoading, setIsLoading) => {
    event.preventDefault();
    setIsLoading({ ...isLoading, save: true });

    axiosClient.post("auth/logout").then(() => {
      checkAdminQuery.remove();
      removeUser();
      removeWorks();
      removeSubscribes();
      removeReviews();

      navigate("/");
      setIsLoading(false);
    });
  };

  // Отчищаем если нет токена
  useEffect(() => {
    if (!user?.access_token) {
      checkAdminQuery.remove();
      removeUser();
      removeWorks();
      removeSubscribes();
      removeReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <StateContext.Provider
      value={{
        user,
        works,
        reviews,
        subscribes,
        showReview,
        checkAdminQuery,
        setShowReview,
        setUser,
        setWorks,
        onLogout,
        isLoggedIn,
        isSubscribe,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
