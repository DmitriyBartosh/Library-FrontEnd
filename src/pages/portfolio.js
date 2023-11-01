import React from "react";
import { useStateContext } from "../context/ContextProvider";
import cx from "classname";

import Review from "../components/reviewing/status/reviewstatus";
import Direction from "../components/portfolio/direction";
import AddReview from "../components/reviewing/adding/review";
import Topnavigate from "../components/navigation/topnavigate";
import Footer from "../components/footer";

import * as global from "../styles/base/global.module.scss";

function Profile() {
  const { works } = useStateContext();

  return (
    <>
      <Topnavigate />
      <section className={cx(global.container, global.top)}>
        {works?.length > 0 && <Review />}
        <Direction />
      </section>
      <AddReview />
      <Footer />
    </>
  );
}

export default Profile;
