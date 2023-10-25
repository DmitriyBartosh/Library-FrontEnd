import { navigate } from "gatsby";
import { useLocalStorage } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../functions/user";
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

  const userQuery = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    enabled: !!user,
  });

  const allWorksQuery = useQuery({
    queryKey: ["getAllWorks"],
    queryFn: getAllWorks,
    enabled: !!user,
  });

  const allWorkOnReviewQuery = useQuery({
    queryKey: ["getAllWorksOnReview"],
    queryFn: getAllWorksOnReview,
    enabled: !!user,
  });

  const allSubscribesQuery = useQuery({
    queryKey: ["getAllSubscribes"],
    queryFn: getAllSubscribes,
    enabled: !!user,
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
  const onLogout = (event, setIsLoading) => {
    event.preventDefault();
    setIsLoading(true);

    axiosClient.post("auth/logout").then(() => {
      removeUser();
      removeWorks();
      removeSubscribes();
      removeReviews();

      navigate("/");
      setIsLoading(false);
    });
  };

  // Обновление информации о пользовтеле (имя, почта)
  useEffect(() => {
    if (userQuery.isError) {
      removeUser();
      removeSubscribes();
      removeWorks();
      navigate("/");
    }

    if (userQuery.isSuccess) {
      // Обновляем пользователя
      setUser((prevUser) => ({
        ...prevUser,
        ...userQuery.data,
        access_token: prevUser.access_token,
      }));
    }
  }, [userQuery.isStale]);

  // Обновление информации о ссылках
  useEffect(() => {
    if (allWorksQuery.isSuccess && !allWorksQuery.isFetching) {
      setWorks(allWorksQuery.data);
    }
  }, [allWorksQuery.isStale]);

  // Обновление информации о подписках
  useEffect(() => {
    if (allSubscribesQuery.isSuccess && !allSubscribesQuery.isFetching) {
      setSubscribes(allSubscribesQuery.data.subscribes);
    }
  }, [allSubscribesQuery.isStale]);

  // Обновление информации о работах на проверке
  useEffect(() => {
    if (allWorkOnReviewQuery.isSuccess && !allWorkOnReviewQuery.isFetching) {
      setReviews(allWorkOnReviewQuery.data);
    }
  }, [allWorkOnReviewQuery.isStale]);

  useEffect(() => {
    if (!user?.access_token) {
      removeUser();
      removeWorks();
      removeSubscribes();
      removeReviews();
    }
  }, [user]);

  return (
    <StateContext.Provider
      value={{
        user,
        works,
        reviews,
        subscribes,
        showReview,
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
