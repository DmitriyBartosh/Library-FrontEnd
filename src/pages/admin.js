import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { useEffectOnce } from "react-use";
import { navigate } from "gatsby";
import cx from "classname";
import { useQuery } from "@tanstack/react-query";
import { getExpert } from "../functions/expert";

import Expert from "../components/admin/expert/expert";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";

import * as global from "../styles/base/global.module.scss";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";

function Admin() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const { user, isLoggedIn } = useStateContext();

  useEffectOnce(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  });

  const getExpertQuery = useQuery({
    queryKey: ["getexpertforexpert"],
    queryFn: getExpert,
    enabled: !!user,
  });

  const { data, isLoading } = getExpertQuery;

  if (isLoading) {
    return (
      <>
        {isDesktop && <Topnavigate />}
        {isTablet && <Topmobilenavigate />}
        <section className={cx(global.container, global.top)}>
          <p>Загрузка данных...</p>
        </section>
        ;
      </>
    );
  }

  return (
    data && (
      <>
        {isDesktop && <Topnavigate />}
        {isTablet && <Topmobilenavigate />}
        <Expert data={data.expert} />;
      </>
    )
  );
}

export default Admin;
