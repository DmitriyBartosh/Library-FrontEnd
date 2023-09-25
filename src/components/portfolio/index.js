import React from "react";

import Topnavigate from "../navigation/topnavigate";
import Review from "../reviewing/status/reviewstatus";
import Direction from "./direction";
import Works from "./works";
import { useStateContext } from "../../context/ContextProvider";

function Index() {
  const { works, reviews } = useStateContext();

  return (
    <>
      <Topnavigate />
      <section class="portfolio-section">
        {reviews?.length > 0 && <Review />}
        {works?.length > 0 && <Works />}
        <Direction />
      </section>
    </>
  );
}

export default Index;
