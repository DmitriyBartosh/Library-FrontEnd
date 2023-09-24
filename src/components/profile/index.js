import React from "react";

import Topnavigate from "../navigation/topnavigate";
import Head from "./head";
import Review from "../reviewing/status/reviewstatus";
import Direction from "./direction";
import Portfolio from "./portfolio";

function Index() {
  return (
    <>
      <Topnavigate />
      <section>
        <Head />
        <Review />
        <Portfolio />
        <Direction />
      </section>
    </>
  );
}

export default Index;
