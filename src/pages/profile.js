import React from "react";
import { navigate } from "gatsby";
import { useEffectOnce } from "react-use";
import cx from "classname";
import { useStateContext } from "../context/ContextProvider";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import User from "../components/profile/user";
import Subscribes from "../components/profile/subscribes";
import Transactions from "../components/profile/transactions";
import Footer from "../components/footer";
import MetaTag from "../components/metaTag";

import * as global from "../styles/base/global.module.scss";

function Profile() {
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const { isLoggedIn } = useStateContext();

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  });

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <User />
        <Subscribes />
        <Transactions />
      </section>
      <Footer />
    </>
  );
}

export const Head = () => {
  const title = "Мой профиль";
  const description =
    "Мой профиль с информацией о подписках, платежах и привязке телеграма";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/profile`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Profile;
