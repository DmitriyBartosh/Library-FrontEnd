import React from "react";
import { navigate } from "gatsby";
import { useStateContext } from "../context/ContextProvider";
import { useEffectOnce } from "react-use";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isLoggedIn } = useStateContext();

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  });

  return <Component {...rest} />;
};

export default PrivateRoute;
