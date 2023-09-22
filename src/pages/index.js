import React from "react";

import Preview from "../components/mainpage/preview";
import Offer from "../components/mainpage/offer";
import Start from "../components/mainpage/start";
import Next from "../components/mainpage/next";
import Footer from "../components/footer";
import Topnavigate from "../components/navigation/topnavigate";
import Audience from "../components/mainpage/audience";
import Experts from "../components/mainpage/experts";
import Callback from "../components/mainpage/callback";

function IndexPage() {
  return (
    <>
      <Topnavigate />
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

export default IndexPage;
