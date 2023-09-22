import React from "react";

import Topnavigate from "../navigation/topnavigate";
import Head from "./head";
import Review from "../reviewing/status/reviewstatus";
import Direction from "./direction";

function Index() {
  return (
    <>
      <Topnavigate />
      <section>
        <Head />
        <Review />
        <Direction />
      </section>
    </>
  );
}

export default Index;
