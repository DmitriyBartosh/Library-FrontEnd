import React from "react";
import cx from "classname";

import Review from "../components/reviewing/status/reviewstatus";
import Direction from "../components/portfolio/direction";
import AddReview from "../components/reviewing/adding/review";
import Topnavigate from "../components/navigation/topnavigate";
import Footer from "../components/footer";

import * as global from "../styles/base/global.module.scss";

function Profile() {
  return (
    <>
      <Topnavigate />
      <section className={cx(global.container, global.top)}>
        <Review />
        <Direction />
      </section>
      <AddReview />
      <Footer />
    </>
  );
}

export default Profile;
