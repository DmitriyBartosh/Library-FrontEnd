import React from "react";
import { navigate } from "gatsby";
import { useStateContext } from "../context/ContextProvider";
import { useEffectOnce } from "react-use";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { token, user } = useStateContext();

  useEffectOnce(() => {
    if (!token || !user && location.pathname !== `/`) {
      navigate("/");
    }
  })

  return <Component {...rest} />;
};

export default PrivateRoute;
