import React from "react";
import { navigate } from "gatsby";
import { useStateContext } from "../context/ContextProvider";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { token, user } = useStateContext();

  if ((!token || !user) && location.pathname !== `/`) {
    navigate("/");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
