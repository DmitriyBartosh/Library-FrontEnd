import React from "react";
import cx from "classname";

import Review from "../components/reviewing/status/reviewstatus";
import Direction from "../components/portfolio/direction";
import AddReview from "../components/reviewing/adding/review";
import Topnavigate from "../components/navigation/topnavigate";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";
import Footer from "../components/footer";
import MetaTag from "../components/metaTag";

import * as global from "../styles/base/global.module.scss";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";

function Profile() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}
      <section className={cx(global.container, global.top)}>
        <Review />
        <iframe
          src="https://roadmap.sh/r/embed?id=6655e891b998f3b3c79fcdc1"
          width="100%"
          height="1000px"
          frameBorder="0"
        />
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
