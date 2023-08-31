import { navigate } from "gatsby";
import { useLocalStorage } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getUser, getDirections } from "../functions/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllWorks } from "../functions/works";

const StateContext = createContext({
  user: null,
  token: null,
  works: null,
  statusDirection: null,
  fontSize: "small",
  showReview: false,
  setShowReview: () => { },
  setStatusDirection: () => { },
  setFontSize: () => { },
  setLinks: () => { },
  setUser: () => { },
  isLoggedIn: () => { },
});

export const ContextProvider = ({ children }) => {
  const [showReview, setShowReview] = useState(false);
  const [token, setToken, removeToken] = useLocalStorage('token')
  const [user, _setUser, removeUser] = useLocalStorage('user');
  const [works, setWorks, removeWorks] = useLocalStorage('works');
  const [statusDirection, setStatusDirection, removeStatusDirection] = useLocalStorage('directions');

  const userQuery = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    enabled: !!token,
  });

  const directionQuery = useQuery({
    queryKey: ["getDirections"],
    queryFn: getDirections,
    enabled: !!token
  })

  const allWorksQuery = useQuery({
    queryKey: ["getAllWorks"],
    queryFn: getAllWorks,
    enabled: !!token,
  })

  // обнулить пользователя
  const setUser = (token, user) => {
    setToken(token);
    _setUser(user);
  };

  // Авторизирован ли пользователь
  const isLoggedIn = () => {
    return !!token && !!user;
  };

  // Обновление информации о пользовтеле (имя, почта)
  useEffect(() => {
    if (userQuery.isError) {
      removeToken();
      removeUser();
      removeStatusDirection();
      removeWorks();

      navigate("/");
    }

    if (userQuery.isSuccess) {
      _setUser(userQuery.data);
    }
  }, [userQuery.isStale]);


  // // Обновление информации о статусе направлений
  useEffect(() => {
    if (directionQuery.isSuccess && !directionQuery.isFetching) {
      const dataJSON = JSON.parse(directionQuery.data.direction);
      setStatusDirection(dataJSON);
    }
  }, [directionQuery.isStale]);

  // Обновление информации о ссылках
  useEffect(() => {
    if (allWorksQuery.isSuccess && !allWorksQuery.isFetching) {
      setWorks(allWorksQuery.data);
    }
  }, [allWorksQuery.isStale])

  useEffect(() => {
    if (!token) {
      removeToken();
      removeUser();
      removeStatusDirection();
      removeWorks();
    }
  }, [token])

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        works,
        statusDirection,
        showReview,
        setShowReview,
        setStatusDirection,
        setUser,
        setWorks,
        isLoggedIn
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
