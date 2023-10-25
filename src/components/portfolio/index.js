import React from "react";

import Topnavigate from "../navigation/topnavigate";
import Review from "../reviewing/status/reviewstatus";
import AddReview from "../reviewing/adding/review";
import Direction from "./direction";
import Works from "./works";
import { useStateContext } from "../../context/ContextProvider";

function Index() {
  const { works } = useStateContext();

  return (
    <>
      <Topnavigate />
      <section>
        {works?.length > 0 && <Review />}
        {works?.length > 0 && <Works />}
        <Direction />
      </section>
      <AddReview />
    </>
  );
}

export default Index;
