import React from "react";
import cx from "classname";
import { navigate } from "gatsby";
import { useEffectOnce } from "react-use";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";
import { useStateContext } from "../context/ContextProvider";

import Review from "../components/reviewing/status/reviewstatus";
import Direction from "../components/portfolio/withsubcribe/direction";
import AddReview from "../components/reviewing/adding/review";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import Footer from "../components/footer";
import Entryreview from "../components/entryreview/preview";
import MetaTag from "../components/metaTag";

import Choisesubscribe from "../components/portfolio/withoutsubscribe/direction";

import * as global from "../styles/base/global.module.scss";

function Profile() {
  const { subscribes, isLoggedIn } = useStateContext();

  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  const isActiveSubscribe =
    Array.isArray(subscribes) && subscribes.some((item) => item.active);

  useEffectOnce(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  });

  const renderNavigation = () => {
    if (isDesktop) return <Topnavigate />;
    if (isTablet) return <Topmobilenavigate />;
    return null;
  };

  return (
    <>
      {renderNavigation()}
      <section className={cx(global.container, global.top)}>
        <Entryreview />
        {isActiveSubscribe && <Review />}
        {!isActiveSubscribe && <Choisesubscribe />}
        <Direction />
      </section>
      <AddReview />
      <Footer />
    </>
  );
}

export const Head = () => {
  const title = "Мое портфолио";
  const description =
    "Портфолио с работами и рецензиями от экспретов площадки Графикси";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/portfolio`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} />;
};

export default Profile;
