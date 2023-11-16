import React from "react";
import { useIsDesktop, useIsTablet } from "../hooks/mediaQuery";

import Preview from "../components/mainpage/preview";
import Offer from "../components/mainpage/offer";
import Start from "../components/mainpage/start";
import Next from "../components/mainpage/next";
import Footer from "../components/footer";
import Topnavigate from "../components/navigation/topnavigate";
import Audience from "../components/mainpage/audience";
import Experts from "../components/mainpage/experts";
import Callback from "../components/mainpage/callback";
import MetaTag from "../components/metaTag";
import Topmobilenavigate from "../components/navigation/topmobilenavigate";

function IndexPage() {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  return (
    <>
      {isDesktop && <Topnavigate />}
      {isTablet && <Topmobilenavigate />}

      <section>
        <Preview />
        <Offer />
        <Audience />
        <Start />
        <Next />
        <Experts />
        <Callback />
        <Footer />
      </section>
    </>
  );
}

export const Head = () => {
  const title = "Онлайн практикум";
  const description =
    "Сервис, который помогает улучшить портфолио и получить консультации от экспертов на любом этапе твоей карьеры";

  const data = {
    title: `Графикси | ${title}`,
    description: description,
    slug: `/`,
    preview: "/preview.png",
  };

  return <MetaTag data={data} themeColor="#f3eee1" />;
};

export default IndexPage;
