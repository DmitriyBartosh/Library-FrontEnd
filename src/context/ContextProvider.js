import { navigate } from "gatsby";
import { useLocalStorage } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getUser, getDirections, getLinksDesign } from "../functions/user";
import React, { createContext, useContext, useEffect } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  links: null,
  statusDirection: null,
  fontSize: "small",
  setStatusDirection: () => { },
  setFontSize: () => { },
  setLinks: () => { },
  updateStatus: () => { },
  updateLinkDesign: () => { },
  setUser: () => { },
  isLoggedIn: () => { },
});

export const ContextProvider = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage('token')
  const [user, _setUser, removeUser] = useLocalStorage('user');
  const [links, setLinks, removeLinks] = useLocalStorage('links');
  const [statusDirection, setStatusDirection, removeStatusDirection] = useLocalStorage('directions');
  const [fontSize, setFontSize] = useLocalStorage('font-size', "small")

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

  const linksDesignQuery = useQuery({
    queryKey: ["getLinksDesign"],
    queryFn: getLinksDesign,
    enabled: statusDirection?.design || false,
  })

  // Обновить пользователя
  const updateStatus = () => {
    directionQuery.refetch();
  }

  // Обновить ссылки
  const updateLinkDesign = (newlinks) => {
    setLinks(newlinks);
    linksDesignQuery.refetch();
  }

  // обнулить пользователя
  const setUser = (token, user, directions) => {
    setToken(token);
    _setUser(user);
    setStatusDirection(directions);
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
      removeLinks();

      navigate("/");
    }

    if (userQuery.isSuccess) {
      _setUser(userQuery.data);
    }
  }, [userQuery.isStale]);


  // // Обновление информации о статусе направлений
  useEffect(() => {
    if (directionQuery.isSuccess) {
      const data = directionQuery.data;
      const dataBoolean = {
        design: data?.design === 1 ? true : false,
        frontend: data?.frontend === 1 ? true : false,
        photo: data?.photo === 1 ? true : false
      }

      setStatusDirection(dataBoolean);
    }
  }, [directionQuery.isStale]);

  // Обновление информации о ссылках
  useEffect(() => {
    if (linksDesignQuery.isSuccess) {
      setLinks(linksDesignQuery.data);
    }
  }, [linksDesignQuery.isStale])

  useEffect(() => {
    if (!token) {
      removeToken();
      removeUser();
      removeStatusDirection();
      removeLinks();
    }
  }, [token])

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        links,
        statusDirection,
        fontSize,
        setStatusDirection,
        setFontSize,
        setUser,
        setLinks,
        updateStatus,
        updateLinkDesign,
        isLoggedIn
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
