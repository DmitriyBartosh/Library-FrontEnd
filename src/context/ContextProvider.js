import { navigate } from "gatsby";
import { useLocalStorage } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../functions/user";
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
  isLoggedIn: () => {},
  isSubscribe: () => {},
});

export const ContextProvider = ({ children }) => {
  const [showReview, setShowReview] = useState(false);
  const [token, setToken, removeToken] = useLocalStorage("token");
  const [user, _setUser, removeUser] = useLocalStorage("user");
  const [works, setWorks, removeWorks] = useLocalStorage("works");
  const [subscribes, setSubscribes, removeSubscribes] =
    useLocalStorage("subscribes");
  const [reviews, setReviews, removeReviews] = useLocalStorage("reviews");

  const userQuery = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    enabled: !!token,
  });

  const allWorksQuery = useQuery({
    queryKey: ["getAllWorks"],
    queryFn: getAllWorks,
    enabled: !!token,
  });

  const allWorkOnReviewQuery = useQuery({
    queryKey: ["getAllWorksOnReview"],
    queryFn: getAllWorksOnReview,
    enabled: !!token,
  });

  const allSubscribesQuery = useQuery({
    queryKey: ["getAllSubscribes"],
    queryFn: getAllSubscribes,
    enabled: !!token,
  });

  // обнулить пользователя
  const setUser = (token, user) => {
    setToken(token);
    _setUser(user);
  };

  // Авторизирован ли пользователь
  const isLoggedIn = () => {
    return !!token && !!user;
  };

  // Активна ли подписка по направлению
  const isSubscribe = (direction) => {
    const isActive = subscribes
      ?.filter((item) => item.plan === direction)
      .some((item) => item.active && item.transaction_status === "succeeded");

    return isActive;
  };

  // Обновление информации о пользовтеле (имя, почта)
  useEffect(() => {
    if (userQuery.isError) {
      removeToken();
      removeUser();
      removeSubscribes();
      removeWorks();

      navigate("/");
    }

    if (userQuery.isSuccess) {
      _setUser(userQuery.data);
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
    if (!token) {
      removeToken();
      removeUser();
      removeWorks();
      removeSubscribes();
      removeReviews();
    }
  }, [token]);

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        works,
        reviews,
        subscribes,
        showReview,
        setShowReview,
        setUser,
        setWorks,
        isLoggedIn,
        isSubscribe,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
