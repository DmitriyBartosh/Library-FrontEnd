import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { useEffectOnce } from "react-use";
import { navigate } from "gatsby";
import cx from "classname";
import { useStaticQuery, graphql } from "gatsby";
import { useQuery } from "@tanstack/react-query";
import { getExpert } from "../functions/expert";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";

import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import Profile from "../components/admin/expert/profile";
import Review from "../components/admin/expert/review";
import Theme from "../components/admin/expert/theme";

import * as global from "../styles/base/global.module.scss";
import Entryreview from "../components/admin/expert/entryreview";

function Admin() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const slugQuery = useStaticQuery(graphql`
    query {
      allDirectionsJson {
        edges {
          node {
            slug
            title
            works {
              title
              slug
            }
          }
        }
      }
    }
  `);

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

  const slug = slugQuery.allDirectionsJson.edges.find(
    (item) => item.node.slug === data.expert.direction
  ).node;

  return (
    data && (
      <>
        {isDesktop && <Topnavigate />}
        {isTablet && <Topmobilenavigate />}

        <section className={cx(global.container, global.top)}>
          <Profile data={data.expert} slug={slug} />
          <Review />
          <Entryreview />
          <Theme slug={slug} />
        </section>
      </>
    )
  );
}

export default Admin;
