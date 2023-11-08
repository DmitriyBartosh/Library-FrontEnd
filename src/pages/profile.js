import React from "react";
import { navigate } from "gatsby";
import { useEffectOnce } from "react-use";
import cx from "classname";
import { useStateContext } from "../context/ContextProvider";
import Topnavigate from "../components/navigation/topnavigate";
import User from "../components/profile/user";
import Subscribes from "../components/profile/subscribes";
import Footer from "../components/footer";

import * as global from "../styles/base/global.module.scss";
import Transactions from "../components/profile/transactions";

function Profile() {
  const { isLoggedIn } = useStateContext();

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  });

  return (
    <>
      <Topnavigate />
      <section className={cx(global.container, global.top)}>
        <User />
        <Subscribes />
        <Transactions />
      </section>
      <Footer />
    </>
  );
}

export default Profile;
