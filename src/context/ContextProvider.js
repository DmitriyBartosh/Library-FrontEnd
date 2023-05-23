import { navigate } from "gatsby";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";
import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  isAdmin: null,
  setUser: () => { },
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(window.localStorage.getItem("userInfo"));
  const [token, setToken] = useState(
    window.localStorage.getItem("tokenAccess")
  );

  const userQuery = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    enabled: !!token,
  });

  // обнулить пользователя
  const setUser = (token, user) => {
    setToken(token);
    _setUser(user);
    if (token) {
      window.localStorage.setItem("userInfo", user);
      window.localStorage.setItem("tokenAccess", token);
    } else {
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("tokenAccess");
    }
  };

  useEffect(() => {
    if (userQuery.isError) {
      setUser(null, null);
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("tokenAccess");
      navigate("/");
    }
    // При успешном получании пользователя обновляем объект в локальном хранилище
    if (userQuery.isSuccess && token) {
      const user = JSON.stringify(userQuery.data);

      window.localStorage.setItem("userInfo", user);
      _setUser(user);
    }
  }, [userQuery, token]);

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
