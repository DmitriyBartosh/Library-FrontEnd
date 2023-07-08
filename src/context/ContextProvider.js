import { navigate } from "gatsby";
import { useQuery } from "@tanstack/react-query";
import { getUser, getDirections } from "../api/user";
import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  statusDirection: null,
  setStatusDirection: () => { },
  updateStatus: () => { },
  setUser: () => { },
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(window.localStorage.getItem("user"));
  const [token, setToken] = useState(window.localStorage.getItem("tokenAccess"));

  // Определить состояния для статуса направления
  const [statusDirection, setStatusDirection] = useState(JSON.parse(window.localStorage.getItem("directions")));

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

  // Обновить пользователя
  const updateStatus = () => {
    directionQuery.refetch();
  }

  // обнулить пользователя
  const setUser = (token, user, directions) => {
    setToken(token);
    _setUser(user);
    setStatusDirection(directions)

    if (token) {
      window.localStorage.setItem("user", user);
      window.localStorage.setItem("tokenAccess", token);
      window.localStorage.setItem("directions", JSON.stringify(directions))
    } else {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("tokenAccess");
      window.localStorage.removeItem("directions");
    }
  };

  // Обновление информации о пользовтеле (имя, почта)
  useEffect(() => {
    if (userQuery.isError) {
      setUser(null, null);
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("tokenAccess");
      window.localStorage.removeItem("directions");
      navigate("/");
    }

    if (userQuery.isSuccess && token) {
      const user = JSON.stringify(userQuery.data);

      window.localStorage.setItem("user", user);
      _setUser(user);
    }
  }, [token, userQuery.isStale]);


  // // Обновление информации о статусе направлений
  useEffect(() => {
    if (directionQuery.isError) {
      setUser(null, null);
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("tokenAccess");
      window.localStorage.removeItem("directions");
      navigate("/");
    }

    if (directionQuery.isSuccess && token) {
      const data = directionQuery.data;
      const dataBoolean = {
        design: data?.design === 1 ? true : false,
        frontend: data?.frontend === 1 ? true : false,
        photo: data?.photo === 1 ? true : false
      }

      const directions = JSON.stringify(dataBoolean);

      window.localStorage.setItem("directions", directions);
      setStatusDirection(dataBoolean);
    }
  }, [token, directionQuery.isStale])

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        statusDirection,
        setStatusDirection,
        setUser,
        updateStatus
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
