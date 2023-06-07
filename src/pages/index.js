import React from "react";
import MetaTag from "../components/metaTag";
import { indexSEO } from "../data/seo";


import Preview from "../components/mainpage/preview";
import Practice from "../components/mainpage/practice";
import Projects from "../components/mainpage/projects";
import Start from "../components/mainpage/start";
import Next from "../components/mainpage/next";
import Designreview from "../components/mainpage/designreview";

function IndexPage() {

  return (
    <section>
      <Preview />
      <Practice />
      <Projects />
      <Start />
      <Next />
      <Designreview />
    </section>
  );
}

export default IndexPage;

export const Head = () => {
  return <MetaTag data={indexSEO} />;
};
